#!/usr/bin/env node

/**
 * @file Validates hots.json using a JSON schema, plus some sanity checks.
 */

import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { loadHotsSchema } from "../scripts/schemas.js";

import { assert } from "./src/lazy-assert.js";
import { ValidatorFactory } from "./src/validators.js";

/**
 * @typedef {import("../generated-types/hots").Hero} Hero
 * @typedef {import("../generated-types/hots").Unit} Unit
 * @typedef {import("../generated-types/hots").ScalingDecimalStat} ScalingDecimalStat
 */

/**
 * @template T
 * @typedef {import("../scripts/type-util.js").KnownKeys<T>} KnownKeys<T>
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { readFile } = fsPromises;

// -------- Main code -------- //

(async () => {
  // Guard variable for aborting promises
  let isAborted = false;

  /**
   * @param {string} filePath
   * @return {Promise<{ value: any } | undefined>} Promise that resolves to an
   *    object with `value` success, or `undefined` on failure
   */
  async function loadJson(filePath) {
    const content = await readFile(filePath, "utf8");
    if (isAborted) return undefined;
    return { value: JSON.parse(content) };
  }

  try {
    const hotsDataPath = path.join(__dirname, "../docs/hots.json");
    const hotsDataTestPath = path.join(
      __dirname,
      "../chrome-ext/tests/data/hots.json"
    );

    const [hotsSchema, hotsDataJson, hotsDataTestJson] = await Promise.all([
      loadHotsSchema(),
      loadJson(hotsDataPath),
      loadJson(hotsDataTestPath),
    ]);

    if (!(hotsDataJson && hotsDataTestJson)) return;

    const vf = new ValidatorFactory();
    const validator = vf.createHotsValidator(hotsSchema);

    validateHotsData(
      hotsDataJson.value,
      validator,
      path.relative("", hotsDataPath)
    );
    validateHotsData(
      hotsDataTestJson.value,
      validator,
      path.relative("", hotsDataTestPath)
    );
  } catch (e) {
    isAborted = true;
    console.error(e);
    process.exitCode = 1;
  }
})();

// -------- Support functions -------- //

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Validates the contents of a `hots.json` file.
 * @param {any} hotsData Data loaded using `JSON.parse()`
 * @param {ReturnType<ValidatorFactory["createHotsValidator"]>} validator
 *    JSON schema validator object to use
 * @param {string} fileName File name to show in error messages
 */
function validateHotsData(hotsData, validator, fileName) {
  console.group(`Validating ${fileName}`);

  // JSON schema validation
  if (!validator.validate(hotsData)) {
    console.error("Invalid hots.json format: %s", fileName);
    throw validator.errors();
  }

  assertIsObjectKeySortedByOrder(
    hotsData,
    { hotsVersion: 0, hotsPtrVersion: 0, heroes: 0, ptrHeroes: 0, iconUrls: 0 },
    `[${fileName}] $`
  );

  assertIsHeroCollectionSorted(hotsData.heroes, `[${fileName}] $.heroes`);
  if (hotsData.ptrHeroes) {
    assertIsHeroCollectionSorted(hotsData.heroes, `[${fileName}] $.ptrHeroes`);
  }
  assertIsObjectKeySorted(hotsData.iconUrls, `[${fileName}] $.iconUrls`);

  // Check if no two icon IDs point to the same URL
  /** @type {Map<string, string>} */
  const iconUrlsToIds = new Map();
  for (const [iconId, url] of Object.entries(hotsData.iconUrls)) {
    const existingIconId = iconUrlsToIds.get(url);
    if (existingIconId) {
      console.warn(
        `Duplicate icon URL: Both ${existingIconId} and ${iconId}`,
        `point to ${url}`
      );
    } else {
      iconUrlsToIds.set(url, iconId);
    }
  }

  // Check if no hero, skill, or talent is missing an icon
  // Also check if any icons are unused
  const unusedIcons = new Set(Object.keys(hotsData.iconUrls));

  const allHeroes = [
    ...Object.values(hotsData.heroes),
    ...Object.values(hotsData.ptrHeroes || {}),
  ];
  for (const hero of allHeroes) {
    if (hero.icon in hotsData.iconUrls) {
      unusedIcons.delete(hero.icon);
    } else {
      console.warn(`Warning: Missing hero icon for ${hero.name}: ${hero.icon}`);
    }

    for (const skill of hero.skills) {
      if (skill.icon in hotsData.iconUrls) {
        unusedIcons.delete(skill.icon);
      } else {
        console.warn(
          `Warning: Missing icon for skill ${skill.id} in ${hero.name}: ${skill.icon}`
        );
      }
    }

    for (const talent of Object.values(hero.talents).flat()) {
      if (talent.icon in hotsData.iconUrls) {
        unusedIcons.delete(talent.icon);
      } else {
        console.warn(
          `Warning: Missing icon for talent ${talent.id} in ${hero.name}: ${talent.icon}`
        );
      }
    }
  }

  if (unusedIcons.size) {
    console.warn(`Warning: ${unusedIcons.size} unused icon(s) found:`);
    for (const icon of unusedIcons) {
      console.warn(`  ${icon}`);
    }
  }

  console.log(`${fileName} has been validated`);
  console.groupEnd();
}

/**
 * Tests if an object's keys are sorted.
 * @param {Object<string, any>} obj Object to test
 * @param {string} objName "Name" of the object to show in error messages
 * @throws If the object has a pair of unsorted keys
 */
function assertIsObjectKeySorted(obj, objName) {
  let prevKey = null;

  for (const key of Object.keys(obj)) {
    if (prevKey !== null) {
      assert(
        prevKey < key,
        "%s has unsorted keys: %o should come after %o",
        objName,
        prevKey,
        key
      );
    }

    prevKey = key;
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Tests if an object's keys are sorted according to a predefined order.
 * @template T
 * @param {T} obj Object to test
 * @param {{ [P in KnownKeys<T>]: 0 }} referenceObj
 *    An object literal that contains all possible keys in T.
 *    This object is only used to check the property order of T.
 *    All values are ignored.
 * @param {string} objName "Name" of the object to show in error messages
 * @throws If the object has unexpected or unsorted keys
 */
function assertIsObjectKeySortedByOrder(obj, referenceObj, objName) {
  assert(
    obj && typeof obj === "object" && !Array.isArray(obj),
    "%s is not an object: %o",
    objName,
    obj
  );

  const knownKeyOrder = new Map(
    Object.keys(referenceObj).map((key, index) => [key, index])
  );
  let prevKey;
  let prevKeyOrder = -1;

  for (const key of Object.keys(obj)) {
    const keyOrder = knownKeyOrder.get(key);
    assert(keyOrder !== undefined, "%s has unexpected key: %o", objName, key);

    if (prevKey !== undefined) {
      assert(
        prevKeyOrder < keyOrder,
        "%s has unsorted keys: %o should come after %o",
        objName,
        prevKey,
        key
      );
    }

    prevKey = key;
    prevKeyOrder = keyOrder;
  }
}

/**
 * Tests if the keys of a collection of Hero objects (and all their children)
 * are sorted.
 * @param {Record<string, Hero>} heroes
 * @param {string} path "Path" of the object to show in error messages
 * @throws If the object has unexpected or unsorted keys
 */
function assertIsHeroCollectionSorted(heroes, path) {
  assertIsObjectKeySorted(heroes, path);

  for (const [heroId, hero] of Object.entries(heroes)) {
    const heroPath = `${path}.${heroId}`;
    assertIsObjectKeySortedByOrder(
      hero,
      {
        name: 0,
        title: 0,
        icon: 0,
        newRole: 0,
        universe: 0,
        stats: 0,
        skills: 0,
        talents: 0,
      },
      heroPath
    );

    if (Array.isArray(hero.stats)) {
      for (const [index, unit] of hero.stats.entries()) {
        assertIsHeroUnitSorted(unit, `${heroPath}.stats[${index}]`);
      }
    } else {
      assertIsHeroUnitSorted(hero.stats, `${heroPath}.stats`);
    }

    for (const [index, skill] of hero.skills.entries()) {
      const skillPath = `${heroPath}.skills[${index}]`;
      assertIsObjectKeySortedByOrder(
        skill,
        {
          id: 0,
          name: 0,
          type: 0,
          icon: 0,
          description: 0,
          shortDescription: 0,
          cooldown: 0,
          cooldownPerAlly: 0,
          rechargeCooldown: 0,
          manaCost: 0,
          manaCostPerSecond: 0,
          extras: 0,
        },
        skillPath
      );
      assertIsObjectKeySortedByOrder(
        skill.name,
        { en: 0, ko: 0 },
        `${skillPath}.name`
      );
    }

    const talentsPath = `${heroPath}.talents`;
    let prevTierName;
    for (const [tierName, talentArray] of Object.entries(hero.talents)) {
      if (prevTierName !== undefined) {
        assert(
          Number(prevTierName) < Number(tierName),
          "%s has unsorted talent tiers: %o should come after %o",
          talentsPath,
          prevTierName,
          tierName
        );
      }

      const talentTierPath = `${talentsPath}[${tierName}]`;
      for (const [index, talent] of talentArray.entries()) {
        const talentPath = `${talentTierPath}[${index}]`;
        assertIsObjectKeySortedByOrder(
          talent,
          {
            id: 0,
            name: 0,
            type: 0,
            icon: 0,
            description: 0,
            shortDescription: 0,
            cooldown: 0,
            cooldownPerAlly: 0,
            rechargeCooldown: 0,
            manaCost: 0,
            manaCostPerSecond: 0,
            extras: 0,
            upgradeFor: 0,
          },
          talentPath
        );
        assertIsObjectKeySortedByOrder(
          talent.name,
          { en: 0, ko: 0 },
          `${talentPath}.name`
        );
      }
    }
  }
}

/**
 * Tests if the keys of Unit object (and all its children) are sorted.
 * @param {Unit} unit
 * @param {string} unitPath "Path" of the object to show in error messages
 * @throws If the object has unexpected or unsorted keys
 */
function assertIsHeroUnitSorted(unit, unitPath) {
  assertIsObjectKeySortedByOrder(
    unit,
    {
      unitName: 0,
      hp: 0,
      radius: 0,
      speed: 0,
      hpRegen: 0,
      shields: 0,
      mp: 0,
      mpRegen: 0,
      ammo: 0,
      brew: 0,
      charge: 0,
      chargeRegen: 0,
      energy: 0,
      energyRegen: 0,
      fury: 0,
      healEnergy: 0,
      zaryaEnergy: 0,
      range: 0,
      period: 0,
      damage: 0,
    },
    unitPath
  );

  assertIsScalingDecimalStatSorted(unit.hp, `${unitPath}.hp`);

  assertIsObjectKeySortedByOrder(
    unit.hpRegen,
    { value: 0, levelScaling: 0 },
    `${unitPath}.name`
  );

  if (unit.mp && typeof unit.mp === "object") {
    assertIsObjectKeySortedByOrder(
      unit.mp,
      { value: 0, levelAdd: 0 },
      `${unitPath}.mp`
    );
  }

  if (unit.mpRegen) {
    assertIsObjectKeySortedByOrder(
      unit.mpRegen,
      { value: 0, levelAdd: 0 },
      `${unitPath}.mpRegen`
    );
  }

  if (Array.isArray(unit.range)) {
    for (const [index, stat] of unit.range.entries()) {
      assertIsObjectKeySortedByOrder(
        stat,
        { value: 0, altName: 0 },
        `${unitPath}.range[${index}]`
      );
    }
  }

  if (Array.isArray(unit.period)) {
    for (const [index, stat] of unit.period.entries()) {
      assertIsObjectKeySortedByOrder(
        stat,
        { value: 0, altName: 0 },
        `${unitPath}.period[${index}]`
      );
    }
  }

  if (unit.damage) {
    if (Array.isArray(unit.damage)) {
      for (const [index, damageStat] of unit.damage.entries()) {
        assertIsScalingDecimalStatSorted(
          damageStat,
          `${unitPath}.damage[${index}]`
        );
      }
    } else {
      assertIsScalingDecimalStatSorted(unit.damage, `${unitPath}.damage`);
    }
  }

  if (unit.shields) {
    assertIsObjectKeySortedByOrder(
      unit.shields,
      { value: 0, levelScaling: 0 },
      `${unitPath}.shields`
    );
  }

  if (unit.healEnergy) {
    assertIsObjectKeySortedByOrder(
      unit.healEnergy,
      { value: 0, levelScaling: 0 },
      `${unitPath}.healEnergy`
    );
  }
}

/**
 * Tests if the keys of Unit object (and all its children) are sorted.
 * @param {ScalingDecimalStat} stat
 * @param {string} path "Path" of the object to show in error messages
 * @throws If the object has unexpected or unsorted keys
 */
function assertIsScalingDecimalStatSorted(stat, path) {
  assertIsObjectKeySortedByOrder(
    stat,
    { value: 0, levelScaling: 0, altName: 0 },
    path
  );
}
