#!/usr/bin/env node
import assert from "assert";
import { inspect } from "util";

import { KoEnString } from "./ko-en-string.js";
import { popTag, pushTag, warn } from "./logger.js";

/**
 * @typedef {import('./hots-data').HotsData} HotsData
 * @typedef {import('./hero').Hero} Hero
 * @typedef {import('./hero-stats').HeroStats} HeroStats
 * @typedef {import('./scaling-stat').ScalingStat} ScalingStat
 * @typedef {import('./skill').Skill} Skill
 * @typedef {import('./talent').Talent} Talent
 */

/**
 * Merges the source dataset into the target dataset.
 * @param {HotsData} target Dataset to merge into
 * @param {Partial<HotsData>} source Dataset to import from
 * @param {boolean=} usePtr If truthy, merge heroes into the PTR section
 *    whenever possible.
 */
export function mergeHotsData(target, source, usePtr = false) {
  for (const sourceHero of Object.values(source.heroes || {})) {
    assert(
      sourceHero.id,
      `Source hero has no ID (raw value: ${inspect(sourceHero.id)})\n`
    );

    let targetHero = null;
    if (usePtr) targetHero = target.ptrHeroes[sourceHero.id];
    if (!targetHero) targetHero = target.heroes[sourceHero.id];

    // Cannot find hero with same ID
    if (!targetHero) {
      // Attempt to find a hero with a matching name
      targetHero = Object.values(target.heroes).find((hero) =>
        isEqualInOneLocale(hero.name, sourceHero.name)
      );
      if (targetHero) {
        warn(
          `Hero ID mismatch: Expected to find ${sourceHero.id},`,
          `but matched with ${targetHero.id}`
        );
      }
    }

    if (targetHero) {
      pushTag(sourceHero.id);
      mergeHero(targetHero, sourceHero);
      popTag();
    } else if (usePtr) {
      console.log("Added new hero to PTR:", sourceHero.name);
      target.ptrHeroes[sourceHero.id] = sourceHero;
    } else {
      console.log("Added new hero:", sourceHero.name);
      target.heroes[sourceHero.id] = sourceHero;
    }
  }
}

/**
 * Merges data from source Hero object into the target Hero object.
 * @param {Hero} target Hero data to merge into
 * @param {Hero} source Hero data to merge from
 */
function mergeHero(target, source) {
  // Merge properties
  mergeProperties(target, source, {
    id: 0,
    name: 0,
    title: 0,
    icon: 0,
    universe: 0,
  });

  // Merge hero stats
  if (Array.isArray(source.stats)) {
    target.stats = source.stats.map((sourceUnitStats, sourceUnitIndex) =>
      mergeHeroStats(
        Array.isArray(target.stats)
          ? target.stats[sourceUnitIndex] || target.stats[0]
          : target.stats,
        sourceUnitStats
      )
    );
  } else if (source.stats) {
    target.stats = mergeHeroStats(
      Array.isArray(target.stats) ? target.stats[0] : target.stats,
      source.stats
    );
  }

  // Merge skills
  source.skills.forEach((sourceSkill) => {
    // Find matching skill by ID
    let targetSkill = target.skills.find(
      (skill) => skill.id === sourceSkill.id
    );

    // If there is no skill matching the ID, search using the skill name.
    if (!targetSkill) {
      targetSkill = target.skills.find((skill) =>
        isEqualInOneLocale(skill.name, sourceSkill.name)
      );

      if (targetSkill && !targetSkill.id) {
        warn(
          `Target skill (${targetSkill.name}) has no ID,`,
          `matched by name with ${sourceSkill.name}`
        );
      } else {
        warn(`Skill not found: ${sourceSkill.id} (${sourceSkill.name})`);
        return;
      }
    }

    mergeSkill(targetSkill, sourceSkill);
  });

  // Merge talents
  const sourceTalentEntries = Object.entries(source.talents);
  if (sourceTalentEntries.length) {
    const oldTalents = target.talents;
    /** @type {typeof oldTalents} */
    const newTalents = (target.talents = {});

    for (const [sourceLevelStr, sourceTalentArray] of sourceTalentEntries) {
      const sourceLevel = Number(sourceLevelStr);
      /** @type {typeof oldTalents[number]} */
      const newTalentArray = (newTalents[sourceLevel] = []);

      sourceTalentArray.forEach((sourceTalent, sourceTalentIndex) => {
        // Find matching talent by level and index
        /** @type {Talent | null} */
        let targetTalent = (oldTalents[sourceLevel] || [])[sourceTalentIndex];

        if (targetTalent) {
          // Compare using talent ID only if the target talent has one
          if (targetTalent.id) {
            // If the target talent does not match the ID, force a manual search
            if (targetTalent.id !== sourceTalent.id) targetTalent = null;
          } else if (isEqualInOneLocale(targetTalent.name, sourceTalent.name)) {
            warn(
              `Target talent (${targetTalent.name}) has no ID,`,
              `matched by position with ${sourceTalent.name}`
            );
          } else targetTalent = null; // Force a manual search
        }

        if (!targetTalent) {
          let targetTalentIndex = -1;
          let targetLevel;
          let targetTalentArray;
          for ([targetLevel, targetTalentArray] of Object.entries(oldTalents)) {
            targetTalentIndex = targetTalentArray.findIndex((talent) => {
              if (talent.id) return talent.id === sourceTalent.id;
              return isEqualInOneLocale(talent.name, sourceTalent.name);
            });

            if (targetTalentIndex !== -1) break;
          }

          if (targetTalentIndex !== -1) {
            warn(
              `Talent position mismatch: ${sourceTalent.name}`,
              `was expected in [${sourceLevel}][${sourceTalentIndex}],`,
              `but found in [${targetLevel}][${targetTalentIndex}]`
            );
            targetTalent = (targetTalentArray || [])[targetTalentIndex];
          } else {
            warn(
              `Talent not found: ${sourceTalent.name} in`,
              `[${sourceLevel}][${sourceTalentIndex}], creating new talent...`
            );
          }
        }

        if (targetTalent) mergeTalent(targetTalent, sourceTalent);
        else targetTalent = sourceTalent;

        // Move talent to new position specified by source
        newTalentArray[sourceTalentIndex] = targetTalent;
      });
    }
  }
}

/**
 * Merges data from the source HeroStats into the target HeroStats.
 * @param {HeroStats} target HeroStats object to merge stat data into
 * @param {HeroStats} source HeroStats object to merge stat data from
 * @return {HeroStats} Merged HeroStats object
 */
function mergeHeroStats(target, source) {
  const scalingStatProperties = {
    hp: 0,
    hpRegen: 0,
    mp: 0,
    mpRegen: 0,
    healEnergy: 0,
    shields: 0,
  };

  for (const _propertyName of Object.keys(scalingStatProperties)) {
    const propertyName = /** @type {keyof scalingStatProperties} */ (_propertyName);
    mergeScalingStat(target[propertyName], source[propertyName]);
  }

  // HeroStats.prototype.damage can be either a ScalingStat or an array of
  // ScalingStats
  if (Array.isArray(source.damage)) {
    target.damage = source.damage.map((d, index) =>
      mergeScalingStat(
        Array.isArray(target.damage)
          ? target.damage[index] || target.damage[0]
          : target.damage,
        d
      )
    );
  } else {
    target.damage = mergeScalingStat(
      Array.isArray(target.damage) ? target.damage[0] : target.damage,
      source.damage
    );
  }

  return mergeProperties(target, source, {
    unitName: 0,
    charge: 0,
    chargeRegen: 0,
    energy: 0,
    fury: 0,
    zaryaEnergy: 0,
    ammo: 0,
    brew: 0,
    radius: 0,
    speed: 0,
    damage: 0,
    range: 0,
    period: 0,
  });
}

/**
 * Merges data from the source Skill object into the target Skill object.
 * @template {Skill} T
 * @param {T} target Skill object to merge into
 * @param {T} source Skill object to merge from
 * @return {T} Merged Skill object
 */
function mergeSkill(target, source) {
  // Merge skill and talent names
  mergeProperties(target.name, source.name, { ko: 0, en: 0 });

  // Merge extras
  mergeProperties(target.extras, source.extras, source.extras);

  if (!source.shortDescription) {
    warn(`${source.name} is missing a short tooltip`);
  }

  return mergeProperties(target, source, {
    id: 0,
    type: 0,
    icon: 0,
    description: 0,
    shortDescription: 0,
    cooldown: 0,
    rechargeCooldown: 0,
    manaCost: 0,
    manaCostPerSecond: 0,
  });
}

/**
 * Merges data from the source Talent into the target Talent.
 * @param {Talent} target Talent object to merge into
 * @param {Talent} source Talent object to merge from
 * @return {Talent} Merged Talent object
 */
function mergeTalent(target, source) {
  return mergeProperties(mergeSkill(target, source), source, {
    upgradeFor: 0,
  });
}

/**
 * Merges data from the source ScalingStat into the target ScalingStat.
 * @param {ScalingStat} target ScalingStat object to merge into
 * @param {ScalingStat} source ScalingStat object to merge from
 * @return {ScalingStat} Merged ScalingStat object
 */
function mergeScalingStat(target, source) {
  return mergeProperties(target, source, {
    value: 0,
    levelAdd: 0,
    levelScaling: 0,
    altName: 0,
  });
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Copies properties specified in `propertyNames` from the source object to the
 * target object. If a property's value is a non-null falsy value, it is not
 * copied.
 * @template T
 * @param {T} target Target object to copy properties into
 * @param {T} source Source object to copy properties from
 * @param {Partial<Record<keyof T, *>>} propertyNames Object whose keys are
 *    property names to copy. Values are ignored.
 * @return {T} The merged target object.
 */
function mergeProperties(target, source, propertyNames) {
  for (const _property of Object.keys(propertyNames)) {
    const property = /** @type {keyof T} */ (_property);
    if (source[property] || source[property] === null) {
      target[property] = source[property];
    }
  }

  return target;
}

/**
 * Checks if two KoEnStrings have either equal Korean or equal English values.
 * Empty strings (`''`) are treated as non-equal.
 * @param {string | KoEnString} str1
 * @param {string | KoEnString} str2
 * @return {boolean}
 */
function isEqualInOneLocale(str1, str2) {
  const name1 = typeof str1 === "string" ? new KoEnString(str1) : str1;
  const name2 = typeof str2 === "string" ? new KoEnString(str2) : str2;
  return (
    (Boolean(name1.ko) && name1.ko === name2.ko) ||
    (Boolean(name1.en) && name1.en === name2.en)
  );
}
