/**
 * @file Tests for parsing hero stats from HeroesDataParser-generated data.
 */

import { strict as assert } from "assert";

import { parseHeroStats } from "../src/hdp-parser-stats.js";
import { _c } from "../src/type-util.js";

/**
 * @typedef {import("../../generated-types/hdp-herodata-ko").HeroKo} HdpHeroKo
 * @typedef {import("../../generated-types/hdp-herodata-ko").HeroUnitKo} HdpHeroUnitKo
 * @typedef {import("../../generated-types/hdp-herodata").Hero} HdpHeroEn
 * @typedef {import("../../generated-types/hdp-herodata").HeroUnit} HdpHeroUnitEn
 * @typedef {import("../../generated-types/hdp-herodata").UnitEnergy} UnitEnergyEn
 * @typedef {import("../../generated-types/hots").Unit} Unit
 */

describe("parseHeroStats()", () => {
  /** @type {HdpHeroEn} */
  const hdpHeroEn = {
    name: "Test Hero English Name",
    unitId: "TestHeroUnitId",
    hyperlinkId: "TestHeroHyperlinkId",
    attributeId: "TEST",
    difficulty: "Easy",
    franchise: "Starcraft",
    gender: "Neutral",
    title: "Test Hero Fancy Title",
    type: "Melee",
    radius: 9.8,
    releaseDate: "2000-01-23",
    speed: 42,
    rarity: "Rare",
    scalingLinkId: "HeroDummyVeterancy",
    searchText: "Test Hero search text",
    description: "Test Hero description",
    infoText: "Test Hero background & lore blurb",
    portraits: {
      draftScreen: "test_hero_icon_draft_screen.png",
      heroSelect: "test_hero_icon_hero_select.png",
      leaderboard: "test_hero_icon_leaderboard.png",
      loading: "test_hero_icon_loading.png",
      minimap: "test_hero_icon_minimap.png",
      partyFrames: ["test_hero_icon_partyframe_0.png"],
      partyPanel: "test_hero_icon_partypanel.png",
      target: "test_hero_icon_target.png",
    },
    life: {
      amount: 123,
      scale: 0.045,
      type: "Health",
      regenRate: 6.7,
      regenScale: 0.089,
    },
    roles: ["Assassin"],
    expandedRole: "Melee Assassin",
    ratings: { complexity: 9, damage: 7, survivability: 5, utility: 3 },
    abilities: {
      basic: [],
      heroic: [],
      trait: [],
      mount: [],
      spray: [],
      voice: [],
    },
    talents: {
      level1: [],
      level4: [],
      level7: [],
      level10: [],
      level13: [],
      level16: [],
      level20: [],
    },
  };
  /** @type {HdpHeroKo} */
  const hdpHeroKo = {
    ...hdpHeroEn,
    name: "Test Hero Korean Name",
    type: "근접",
    difficulty: "쉬움",
    life: { ...hdpHeroEn.life, type: "생명력" },
    roles: ["암살자"],
    expandedRole: "근접 암살자",
    // Required to prevent TypeScript from complaining about incompatible type
    energy: undefined,
    shield: undefined,
    heroUnits: undefined,
  };
  /** @type {Unit} */
  const expectedStats = {
    hp: { value: 123, levelScaling: 0.045 },
    hpRegen: { value: 6.7, levelScaling: 0.089 },
    radius: 9.8,
    speed: 42,
  };

  it("should parse stats from a hero with no weapons or resources", () => {
    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroEn, hdpHeroKo),
      expectedStats
    );
  });

  it("should parse stats from a hero with a weapon", () => {
    const weapons = [
      {
        nameId: "HeroWeapon",
        range: 9.87,
        period: 6.54,
        damage: 321,
        damageScale: 0.63,
      },
    ];
    /** @type {HdpHeroEn} */
    const hdpHeroWithWeaponEn = { ...hdpHeroEn, weapons };
    /** @type {HdpHeroKo} */
    const hdpHeroWithWeaponKo = { ...hdpHeroKo, weapons };
    /** @type {Unit} */
    const expectedStatsWithWeapon = {
      ...expectedStats,
      damage: {
        value: weapons[0].damage,
        levelScaling: weapons[0].damageScale,
      },
      range: weapons[0].range,
      period: weapons[0].period,
    };

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithWeaponEn, hdpHeroWithWeaponKo),
      expectedStatsWithWeapon
    );
  });

  it("should parse stats from a hero with two weapons", () => {
    const weapons = [
      {
        nameId: "HeroWeapon1",
        range: 2.0,
        period: 10,
        damage: 200,
        damageScale: 0.3,
      },
      {
        nameId: "HeroWeapon2",
        range: 4.0,
        period: 10,
        damage: 200,
        damageScale: 0.3,
      },
    ];
    /** @type {HdpHeroEn} */
    const hdpHeroWithWeaponEn = { ...hdpHeroEn, weapons };
    /** @type {HdpHeroKo} */
    const hdpHeroWithWeaponKo = { ...hdpHeroKo, weapons };
    /** @type {Unit} */
    const expectedStatsWithWeapon = {
      ...expectedStats,
      damage: {
        value: weapons[1].damage,
        levelScaling: weapons[1].damageScale,
      },
      range: weapons[1].range,
      period: weapons[1].period,
    };

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithWeaponEn, hdpHeroWithWeaponKo),
      expectedStatsWithWeapon
    );
  });

  it("should parse stats from a hero that uses mana (growth, regen)", () => {
    /** @type {UnitEnergyEn} */
    const energy = { amount: 123.45, type: "Mana", regenRate: 67.89 };
    /** @type {HdpHeroEn} */
    const hdpHeroWithManaEn = {
      ...hdpHeroEn,
      scalingLinkId: "ExcellentMana",
      energy,
    };
    /** @type {HdpHeroKo} */
    const hdpHeroWithManaKo = {
      ...hdpHeroKo,
      scalingLinkId: "ExcellentMana",
      energy: { ...energy, type: "마나" },
    };
    /** @type {Unit} */
    const expectedStatsWithMana = {
      ...expectedStats,
      mp: { value: energy.amount - 10, levelAdd: 10 },
      mpRegen: { value: energy.regenRate - 0.098, levelAdd: 0.098 },
    };

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithManaEn, hdpHeroWithManaKo),
      expectedStatsWithMana
    );
  });

  it("should parse stats from a hero that uses mana (growth, no regen)", () => {
    /** @type {UnitEnergyEn} */
    const energy = { amount: 345.67, type: "Mana", regenRate: 0 };
    /** @type {HdpHeroEn} */
    const hdpHeroWithManaEn = {
      ...hdpHeroEn,
      scalingLinkId: "GuldanVeterancyMana",
      energy,
    };
    /** @type {HdpHeroKo} */
    const hdpHeroWithManaKo = {
      ...hdpHeroKo,
      scalingLinkId: "GuldanVeterancyMana",
      energy: { ...energy, type: "마나" },
    };
    /** @type {Unit} */
    const expectedStatsWithMana = {
      ...expectedStats,
      mp: { value: energy.amount - 10, levelAdd: 10 },
    };

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithManaEn, hdpHeroWithManaKo),
      expectedStatsWithMana
    );
  });

  it("should parse stats from a hero that uses mana (no growth, no regen)", () => {
    /** @type {UnitEnergyEn} */
    const energy = { amount: 987.65, type: "Mana", regenRate: 0 };
    /** @type {HdpHeroEn} */
    const hdpHeroWithManaEn = {
      ...hdpHeroEn,
      scalingLinkId: "HeroDummyVeterancy",
      energy,
    };
    /** @type {HdpHeroKo} */
    const hdpHeroWithManaKo = {
      ...hdpHeroKo,
      scalingLinkId: "HeroDummyVeterancy",
      energy: { ...energy, type: "마나" },
    };
    /** @type {Unit} */
    const expectedStatsWithMana = { ...expectedStats, mp: energy.amount };

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithManaEn, hdpHeroWithManaKo),
      expectedStatsWithMana
    );
  });

  // Test heroes using other resources
  [
    {
      energy: { amount: 123, type: _c("Ammo"), regenRate: 0 },
      energyTypeKo: _c("탄약"),
      statsFragment: { ammo: 123 },
    },
    {
      energy: { amount: 456, type: _c("Brew"), regenRate: 0 },
      energyTypeKo: _c("취기"),
      statsFragment: { brew: 456 },
    },
    {
      energy: { amount: 789, type: _c("Charge"), regenRate: 0 },
      energyTypeKo: _c("충전"),
      statsFragment: { charge: 789 },
    },
    {
      energy: { amount: 1234, type: _c("Charge"), regenRate: 5.67 },
      energyTypeKo: _c("충전"),
      statsFragment: { charge: 1234, chargeRegen: 5.67 },
    },
    {
      energy: { amount: 98, type: _c("Energy"), regenRate: 0 },
      energyTypeKo: _c("기력"),
      statsFragment: { energy: 98 },
    },
    {
      energy: { amount: 76, type: _c("Energy"), regenRate: 54 },
      energyTypeKo: _c("기력"),
      statsFragment: { energy: 76, energyRegen: 54 },
    },
    {
      energy: { amount: 321, type: _c("Fury"), regenRate: 0 },
      energyTypeKo: _c("분노"),
      statsFragment: { fury: 321 },
    },
    {
      energy: { amount: 494, type: _c("Stored Energy"), regenRate: 0 },
      energyTypeKo: _c("치유 에너지"),
      statsFragment: { healEnergy: { value: 494, levelScaling: 0.04 } },
    },
  ].forEach(({ energy, energyTypeKo, statsFragment }) => {
    it(`should parse stats from a hero that uses ${energy.type} (regenRate: ${energy.regenRate})`, () => {
      /** @type {HdpHeroEn} */
      const hdpHeroWithResourceEn = {
        ...hdpHeroEn,
        scalingLinkId: "HeroDummyVeterancy",
        energy,
      };
      /** @type {HdpHeroKo} */
      const hdpHeroWithResourceKo = {
        ...hdpHeroKo,
        scalingLinkId: "HeroDummyVeterancy",
        energy: { ...energy, type: energyTypeKo },
      };
      /** @type {Unit} */
      const expectedStatsWithResource = { ...expectedStats, ...statsFragment };

      assert.deepStrictEqual(
        parseHeroStats(
          "TestHeroId",
          hdpHeroWithResourceEn,
          hdpHeroWithResourceKo
        ),
        expectedStatsWithResource
      );
    });
  });

  it(`should parse Zarya's max energy amount`, () => {
    const energy = { amount: 219, type: _c("Energy"), regenRate: 0 };

    /** @type {HdpHeroEn} */
    const zaryaEn = {
      ...hdpHeroEn,
      scalingLinkId: "HeroDummyVeterancy",
      energy,
    };
    /** @type {HdpHeroKo} */
    const zaryaKo = {
      ...hdpHeroKo,
      scalingLinkId: "HeroDummyVeterancy",
      energy: { ...energy, type: "에너지" },
    };
    /** @type {Unit} */
    const expectedStatsWithResource = {
      ...expectedStats,
      zaryaEnergy: energy.amount,
    };

    assert.deepStrictEqual(
      parseHeroStats("Zarya", zaryaEn, zaryaKo),
      expectedStatsWithResource
    );
  });

  /** @type {HdpHeroUnitEn} */
  const heroUnitEn = {
    name: "Test Hero Unit English Name",
    hyperlinkId: "TestHeroUnitId",
    radius: 12.3,
    sight: 4.56,
    speed: 7.89,
    portraits: {
      targetInfo: "test_hero_unit_icon_target_info.png",
      minimap: "test_hero_unit_icon_minimap.png",
    },
    life: { amount: 234, scale: 0.56, regenRate: 7.8, regenScale: 0.09 },
    abilities: {},
  };
  /** @type {HdpHeroUnitKo} */
  const heroUnitKo = {
    ...heroUnitEn,
    name: "Test Hero Unit Korean Name",
    life: { ...heroUnitEn.life, type: undefined },
    energy: undefined,
  };

  it("should parse hero with one extra hero unit", () => {
    /** @type {HdpHeroEn} */
    const hdpHeroWithOneUnitEn = {
      ...hdpHeroEn,
      heroUnits: [{ TestHeroUnitId: heroUnitEn }],
    };
    /** @type {HdpHeroKo} */
    const hdpHeroWithOneUnitKo = {
      ...hdpHeroKo,
      heroUnits: [{ TestHeroUnitId: heroUnitKo }],
    };
    /** @type {Unit[]} */
    const expectedStatsWithOneHeroUnit = [
      expectedStats,
      {
        unitName: heroUnitKo.name,
        hp: {
          value: heroUnitEn.life.amount,
          levelScaling: heroUnitEn.life.scale,
        },
        hpRegen: {
          value: heroUnitEn.life.regenRate,
          levelScaling: heroUnitEn.life.regenScale,
        },
        radius: heroUnitEn.radius,
        speed: heroUnitEn.speed,
      },
    ];

    assert.deepStrictEqual(
      parseHeroStats("TestHeroId", hdpHeroWithOneUnitEn, hdpHeroWithOneUnitKo),
      expectedStatsWithOneHeroUnit
    );
  });

  it("should ignore hero units with special IDs", () => {
    const heroUnitIdsToTest = [
      "AbathurSymbiote",
      "HeroChenStorm",
      "HeroChenEarth",
      "HeroChenFire",
      "RagnarosBigRag",
    ];

    /** @type {HdpHeroEn} */
    const hdpHeroWithSpecialUnitsEn = {
      ...hdpHeroEn,
      heroUnits: heroUnitIdsToTest.map((heroUnitId) => ({
        [heroUnitId]: {
          ...heroUnitEn,
          name: `${heroUnitId} English Name`,
          hyperlinkId: heroUnitId,
        },
      })),
    };
    /** @type {HdpHeroKo} */
    const hdpHeroWithSpecialUnitsKo = {
      ...hdpHeroKo,
      heroUnits: heroUnitIdsToTest.map((heroUnitId) => ({
        [heroUnitId]: {
          ...heroUnitKo,
          name: `${heroUnitId} Korean Name`,
          hyperlinkId: heroUnitId,
        },
      })),
    };

    assert.deepStrictEqual(
      parseHeroStats(
        "TestHeroId",
        hdpHeroWithSpecialUnitsEn,
        hdpHeroWithSpecialUnitsKo
      ),
      expectedStats
    );
  });
});
