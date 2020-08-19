/**
 * @file Tools for parsing hero stats in HeroesDataParser-generated data.
 */

import { findAbilityById } from "./hdp-find.js";
import {
  assert,
  assertNever,
  deepEqual,
  equal,
  notEqual,
} from "./lazy-assert.js";
import { isNullish } from "./type-util.js";

/**
 * @typedef {import("../../generated-types/hdp-herodata-ko").HeroKo} HdpHeroKo
 * @typedef {import("../../generated-types/hdp-herodata-ko").HeroUnitKo} HdpHeroUnitKo
 * @typedef {import("../../generated-types/hdp-herodata").Hero} HdpHeroEn
 * @typedef {import("../../generated-types/hdp-herodata").HeroUnit} HdpHeroUnitEn
 * @typedef {import("../../generated-types/hots").ScalingDecimalStat} ScalingDecimalStat
 * @typedef {import("../../generated-types/hots").ScalingIntegerStat} ScalingIntegerStat
 * @typedef {import("../../generated-types/hots").Unit} Unit
 */

/** Hero unit IDs to ignore when extracting hero stats. */
const HERO_UNITS_IGNORED = new Set([
  "AbathurSymbiote",
  "HeroChenStorm",
  "HeroChenEarth",
  "HeroChenFire",
  "RagnarosBigRag",
]);

/**
 * Parses the stats of a hero and its hero units (if any).
 * @param {string} heroId
 * @param {HdpHeroEn} heroEn
 * @param {HdpHeroKo} heroKo
 * @return {Unit | Unit[]}
 */
export function parseHeroStats(heroId, heroEn, heroKo) {
  let primaryUnit = parseSingleUnit(heroId, heroEn, heroKo);
  const additionalHeroUnits = extractHeroUnits(heroId, heroEn, heroKo)
    .filter((unitPack) => !HERO_UNITS_IGNORED.has(unitPack.en.hyperlinkId))
    .map(({ en: heroUnitEn, ko: heroUnitKo }) =>
      parseSingleUnit(heroUnitEn.hyperlinkId, heroUnitEn, heroUnitKo, true)
    );

  if (additionalHeroUnits.length > 0) {
    const hero = { id: heroId, en: heroEn, ko: heroKo };

    // Apply hero-specific fixes
    // Most of these assign custom names to hero units
    if (heroId === "Alexstrasza") {
      primaryUnit = { unitName: heroKo.name, ...primaryUnit };
      additionalHeroUnits[0].unitName = findAbilityById(
        hero,
        "AlexstraszaDragonqueen"
      ).ko.name;
      // Note: The regen value is from HotS Gamepedia. However, it appears that
      // this may be out of date, since Blizzard has fixed the bug that made
      // Dragonqueen's HP higher than intended. See:
      // https://heroespatchnotes.com/hero/alexstrasza.html#patch2020-04-14
      // TODO: Find out the actual HP and regen value
      additionalHeroUnits[0].hp.value += 500;
      additionalHeroUnits[0].hpRegen.value = 3.7226;
    } else if (heroId === "DVa") {
      primaryUnit = {
        unitName: findAbilityById(hero, "DVaMechMechMode").ko.name,
        ...primaryUnit,
      };
      additionalHeroUnits[0].unitName = findAbilityById(
        hero,
        "DVaPilotPilotMode"
      ).ko.name;
    } else if (heroId === "LostVikings") {
      // If the hero is the Lost Vikings, do not include the "dummy" unit data
      // parsed from the HdpHero object itself.
      // Also, the vikings should be sorted by base HP in reverse order.
      return additionalHeroUnits.sort(
        (unitA, unitB) => unitB.hp.value - unitA.hp.value
      );
    } else if (heroId === "Rexxar") {
      primaryUnit = { unitName: heroKo.name, ...primaryUnit };
      // TODO: Get Misha's speed increase from tooltip
      additionalHeroUnits[0].speed = roundToDigits(
        additionalHeroUnits[0].speed * 1.15,
        4
      );
    }

    return [primaryUnit, ...additionalHeroUnits];
  } else if (heroId === "Varian") {
    primaryUnit = { unitName: "기본", ...primaryUnit };
    const tauntUnit = { ...primaryUnit };
    const colossusSmashUnit = { ...primaryUnit };
    const twinBladesUnit = { ...primaryUnit };
    tauntUnit.unitName = "도발";
    colossusSmashUnit.unitName = "거인의 강타";
    twinBladesUnit.unitName = "분노의 쌍검";

    const {
      hp: baseHp,
      hpRegen: baseHpRegen,
      damage: baseDamage,
    } = primaryUnit;
    assert(
      !Array.isArray(baseDamage),
      "Varian has too many damage objects: %o",
      baseDamage
    );
    assert(baseDamage, "Varian is missing a damage object: %o", baseDamage);
    assert(
      typeof primaryUnit.period === "number",
      "Varian's attack period is not a number"
    );

    // TODO: Retrieve actual numbers from ability tooltips.
    // On second thought, maybe we should ditch these fake units instead.
    tauntUnit.hp = {
      value: roundToDigits(baseHp.value * 1.4, 4),
      levelScaling: baseHp.levelScaling,
    };
    tauntUnit.hpRegen = {
      value: roundToDigits(baseHpRegen.value * 1.4, 4),
      levelScaling: baseHpRegen.levelScaling,
    };
    colossusSmashUnit.hp = {
      value: roundToDigits(baseHp.value * 0.9, 4),
      levelScaling: baseHp.levelScaling,
    };
    colossusSmashUnit.hpRegen = {
      value: roundToDigits(baseHpRegen.value * 0.9, 4),
      levelScaling: baseHpRegen.levelScaling,
    };
    colossusSmashUnit.damage = {
      value: baseDamage.value * 2,
      levelScaling: baseDamage.levelScaling,
    };
    twinBladesUnit.period = primaryUnit.period / 2;
    twinBladesUnit.damage = {
      value: roundToDigits(baseDamage.value * 0.75, 4),
      levelScaling: baseDamage.levelScaling,
    };

    return [primaryUnit, tauntUnit, colossusSmashUnit, twinBladesUnit];
  }

  return primaryUnit;
}

/**
 * Parses a single Unit object from a hero or hero unit.
 * @param {string} heroUnitId
 * @param {HdpHeroEn | HdpHeroUnitEn} heroUnitEn
 * @param {HdpHeroKo | HdpHeroUnitKo} heroUnitKo
 * @param {boolean} [isUnit]
 * @return {Unit}
 */
function parseSingleUnit(heroUnitId, heroUnitEn, heroUnitKo, isUnit) {
  let { radius, speed } = heroUnitEn;
  if (isNullish(radius)) {
    console.warn(
      `${isUnit ? "Unit" : "Hero"} %o has radius == %o, using %o instead`,
      heroUnitId,
      radius,
      0
    );
    radius = 0;
  }

  if (heroUnitId === "DVa") {
    // TODO: Read this from the skill tooltips
    speed = roundToDigits(speed * 0.85, 4);
  }

  let shieldFragment;
  if ("shield" in heroUnitEn && heroUnitEn.shield) {
    equal(
      heroUnitEn.shield.type,
      "Shields",
      "Hero %o: Unknown shield type %o",
      heroUnitId,
      heroUnitEn.shield.type
    );
    shieldFragment = {
      shields: {
        value: heroUnitEn.shield.amount,
        levelScaling: heroUnitEn.shield.scale,
      },
    };
  }

  // Do not rearrange rows: order is important!
  return {
    ...(isUnit ? { unitName: heroUnitKo.name } : {}),
    hp: {
      value: heroUnitEn.life.amount,
      levelScaling: heroUnitEn.life.scale,
    },
    radius,
    speed,
    hpRegen: {
      value: heroUnitEn.life.regenRate,
      levelScaling: heroUnitEn.life.regenScale,
    },
    ...shieldFragment,
    ...parseResourceFragment(heroUnitId, heroUnitEn),
    ...parseWeaponFragment(heroUnitId, heroUnitEn, isUnit),
  };
}

/**
 * Extracts an array of hero units from a hero, packed into an object.
 * If the hero has no hero units, returns an empty array.
 * @param {string} heroId
 * @param {HdpHeroEn} heroEn
 * @param {HdpHeroKo} heroKo
 * @return {{ en: HdpHeroUnitEn, ko: HdpHeroUnitKo }[]}
 */
function extractHeroUnits(heroId, heroEn, heroKo) {
  if (Array.isArray(heroEn.heroUnits)) {
    assert(
      Array.isArray(heroKo.heroUnits),
      "%o.heroUnits is an array in the English version, but not in the Korean version",
      heroId
    );

    const heroUnitEnArray = heroEn.heroUnits
      .flatMap((o) => Object.entries(o))
      .map(([heroUnitId, heroUnit]) => {
        equal(
          heroUnitId,
          heroUnit.hyperlinkId,
          "Hero unit ID does not match its hyperlinkId"
        );
        return heroUnit;
      });
    const heroUnitKoArray = heroKo.heroUnits
      .flatMap((o) => Object.entries(o))
      .map(([heroUnitId, heroUnit]) => {
        equal(
          heroUnitId,
          heroUnit.hyperlinkId,
          "Hero unit ID does not match its hyperlinkId"
        );
        return heroUnit;
      });

    equal(
      heroUnitEnArray.length,
      heroUnitKoArray.length,
      "%o.heroUnits has mismatched items between English and Korean versions",
      heroId
    );

    return heroUnitEnArray.map((heroUnitEn, index) => {
      const heroUnitKo = heroUnitKoArray[index];
      equal(
        heroUnitEn.hyperlinkId,
        heroUnitKo.hyperlinkId,
        "Hero unit ID mismatch between English and Korean versions"
      );
      return { en: heroUnitEn, ko: heroUnitKo };
    });
  } else {
    assert(
      isNullish(heroEn.heroUnits),
      "Unexpected value: %o.heroUnits == %o",
      heroId,
      heroEn.heroUnits
    );

    return [];
  }
}

/**
 * @typedef {object} UnitResourceFragment
 * @property {{ value: number, levelAdd: number } | number} [mp]
 * @property {{ value: number, levelAdd: number}} [mpRegen]
 * @property {number} [ammo]
 * @property {number} [brew]
 * @property {number} [charge]
 * @property {number} [chargeRegen]
 * @property {number} [energy]
 * @property {number} [energyRegen]
 * @property {number} [fury]
 * @property {ScalingIntegerStat} [healEnergy]
 * @property {number} [zaryaEnergy]
 */

/**
 * Extract a resource-related fragment of the Unit object from a Hero.
 * If the hero/unit has no resource information, returns `undefined`.
 * @param {string} heroUnitId
 * @param {HdpHeroEn | HdpHeroUnitEn} heroUnit
 * @param {boolean} [isUnit]
 * @return {UnitResourceFragment | undefined}
 */
function parseResourceFragment(heroUnitId, heroUnit, isUnit) {
  const { scalingLinkId, energy } = heroUnit;
  const ASSERT_MSG = `${isUnit ? "Unit" : "Hero"} %o`;

  if (isNullish(energy)) {
    // No-resource heroes should always have "HeroDummyVeterancy" or not at all
    assert(
      scalingLinkId === "HeroDummyVeterancy" || scalingLinkId === undefined,
      `${isUnit ? "Unit" : "Hero"} %o has unexpected scalingLinkId: %o`,
      heroUnitId,
      scalingLinkId
    );
    return undefined;
  }

  if (heroUnitId === "Zarya") {
    equal(energy.type, "Energy", ASSERT_MSG, heroUnitId);
    equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
    return { zaryaEnergy: energy.amount };
  }

  if (energy.type === "Mana") {
    // HeroesDataParser does not extract global mana & mana regen growth
    // Therefore, we have to use hardcoded values.
    const MP_PER_LEVEL = 10;
    const MP_REGEN_PER_LEVEL = 0.098;

    const mp = { value: energy.amount - MP_PER_LEVEL, levelAdd: MP_PER_LEVEL };

    switch (scalingLinkId) {
      case "GuldanVeterancyMana": {
        equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        return { mp };
      }
      case "ExcellentMana": {
        notEqual(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        return {
          mp,
          mpRegen: {
            value: energy.regenRate - MP_REGEN_PER_LEVEL,
            levelAdd: MP_REGEN_PER_LEVEL,
          },
        };
      }
      case "HeroDummyVeterancy":
      case undefined: {
        console.assert(
          energy.regenRate === 0,
          `${
            isUnit ? "Unit" : "Hero"
          } %o has non-zero regen rate of %o, despite not having normal mana scaling`,
          heroUnitId,
          energy
        );
        return { mp: energy.amount };
      }
    }

    assertNever(
      scalingLinkId,
      `${isUnit ? "Unit" : "Hero"} %o has unexpected scalingLinkId: %o`,
      heroUnitId,
      scalingLinkId
    );
  } else {
    // Non-mana heroes should always have "HeroDummyVeterancy"
    equal(scalingLinkId, "HeroDummyVeterancy", ASSERT_MSG, heroUnitId);

    switch (energy.type) {
      case "Ammo": {
        equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        return { ammo: energy.amount };
      }
      case "Brew": {
        equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        return { brew: energy.amount };
      }
      case "Charge": {
        return {
          charge: energy.amount,
          ...(energy.regenRate === 0 ? {} : { chargeRegen: energy.regenRate }),
        };
      }
      case "Energy": {
        return {
          energy: energy.amount,
          ...(energy.regenRate === 0 ? {} : { energyRegen: energy.regenRate }),
        };
      }
      case "Fury": {
        equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        return { fury: energy.amount };
      }
      case "Stored Energy": {
        equal(energy.regenRate, 0, ASSERT_MSG, heroUnitId);
        // TODO: levelScaling should be parsed from the trait tooltip
        return { healEnergy: { value: energy.amount, levelScaling: 0.04 } };
      }
    }

    assertNever(
      energy.type,
      `${isUnit ? "Unit" : "Hero"} %o : Unexpected energy.type = %o`,
      heroUnitId,
      energy.type
    );
  }
}

/**
 * Weapon data fragment, which should be merged into a Unit object.
 * @typedef {object} UnitWeaponFragment
 * @property {number | [StatWithAltName, StatWithAltName]} range
 * @property {number | [StatWithAltName, StatWithAltName]} period
 * @property {ScalingDecimalStat | [ScalingDecimalStat, ScalingDecimalStat]} damage
 */

/**
 * @typedef {object} StatWithAltName
 * @property {number} value
 * @property {string} altName
 */

/**
 * Extract a weapon-related fragment of the Unit object from a hero or unit.
 * If the hero/unit has no weapons, returns `undefined`.
 * @param {string} heroId
 * @param {HdpHeroEn | HdpHeroUnitEn | HdpHeroKo | HdpHeroUnitKo } heroOrUnit
 * @param {boolean} [isUnit]
 * @return {UnitWeaponFragment | undefined}
 */
function parseWeaponFragment(heroId, heroOrUnit, isUnit) {
  if (isNullish(heroOrUnit.weapons)) return undefined;

  assert(heroOrUnit.weapons.length > 0, "%o.weapons is empty array", heroId);
  if (heroOrUnit.weapons.length > 2) {
    console.warn(
      `${isUnit ? "Unit" : "Hero"} %o has %o weapons`,
      heroId,
      heroOrUnit.weapons.length
    );
  }

  // When HeroesDataParser extracts multiple weapons for a hero, they are
  // usually the long & short-range versions of the same weapon.

  const weapon = heroOrUnit.weapons.reduce((bestWeapon, weapon) => {
    const {
      nameId: bestWeaponId,
      range: bestWeaponRange,
      ...bestWeaponMisc
    } = bestWeapon;
    const { nameId: weaponId, range: weaponRange, ...weaponMisc } = weapon;

    notEqual(
      bestWeaponId,
      weaponId,
      `${isUnit ? "Unit" : "Hero"} %o has duplicate weapon nameId: %o`,
      heroId,
      weaponId
    );
    // Assert that all weapon properties except weapon ID and range are same.
    deepEqual(
      bestWeaponMisc,
      weaponMisc,
      `Weapons have different stats: in ${isUnit ? "unit" : "hero"} %o`,
      heroId
    );

    // Pick the weapon with the longest range
    return bestWeaponRange >= weaponRange ? bestWeapon : weapon;
  });

  // HDP does NOT extract different weapons for heroes with multiple attack
  // modes (e.g. Greymane, Fenix). Thus, we have to manually postprocess them.
  if (heroId === "Fenix") {
    // TODO: Extract the modifiers from tooltips
    return {
      range: [
        { value: weapon.range, altName: "연발포" },
        { value: weapon.range + 1.25, altName: "위상 폭탄" },
      ],
      period: [
        { value: weapon.period / 2.5, altName: "연발포" },
        { value: weapon.period, altName: "위상 폭탄" },
      ],
      damage: [
        {
          value: weapon.damage,
          levelScaling: weapon.damageScale,
          altName: "연발포",
        },
        {
          value: weapon.damage * 1.25,
          levelScaling: weapon.damageScale,
          altName: "위상 폭탄",
        },
      ],
    };
  }
  if (heroId === "Greymane") {
    // TODO: Extract the modifiers from tooltips
    return {
      range: [
        { value: weapon.range, altName: "인간" },
        { value: 1.25, altName: "늑대인간" },
      ],
      period: weapon.period,
      damage: [
        {
          value: weapon.damage,
          levelScaling: weapon.damageScale,
          altName: "인간",
        },
        {
          value: weapon.damage * 1.4,
          levelScaling: weapon.damageScale,
          altName: "늑대인간",
        },
      ],
    };
  }
  if (heroId === "SgtHammer") {
    // TODO: Extract the modifiers from tooltips
    return {
      range: [
        { value: weapon.range, altName: "전차" },
        { value: weapon.range * 2, altName: "공성 모드" },
      ],
      period: weapon.period,
      damage: [
        {
          value: weapon.damage,
          levelScaling: weapon.damageScale,
          altName: "전차",
        },
        {
          value: weapon.damage * 1.2,
          levelScaling: weapon.damageScale,
          altName: "공성 모드",
        },
      ],
    };
  }

  return {
    range: weapon.range,
    period: weapon.period,
    damage: { value: weapon.damage, levelScaling: weapon.damageScale },
  };
}

/**
 * Rounds a number to X fractional digits.
 * Warning: May not be successful, due to limitations in floating-point numbers.
 * @param {number} value
 * @param {number} fractionalDigits Must be nonnegative.
 * @return {number}
 */
function roundToDigits(value, fractionalDigits) {
  assert(Number.isInteger(fractionalDigits));
  assert(fractionalDigits >= 0);
  const exp = 10 ** fractionalDigits;
  return Math.round(value * exp) / exp;
}
