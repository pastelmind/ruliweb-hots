/** @file Tests for HeroesDataParser HeroData Merge script */

import { strict as assert } from "assert";

import { parseHero, parseSkillTalent, parseTalent } from "../src/hdp-parser.js";

/**
 * @typedef {import("../../generated-types/hdp-herodata-ko").AbilityKo} HdpAbilityKo
 * @typedef {import("../../generated-types/hdp-herodata-ko").HeroKo} HdpHeroKo
 * @typedef {import("../../generated-types/hdp-herodata-ko").TalentKo} HdpTalentKo
 * @typedef {import("../../generated-types/hdp-herodata").Ability} HdpAbilityEn
 * @typedef {import("../../generated-types/hdp-herodata").Hero} HdpHeroEn
 * @typedef {import("../../generated-types/hdp-herodata").Talent} HdpTalentEn
 * @typedef {import("../../generated-types/hots").Hero} Hero
 * @typedef {import("../../generated-types/hots").Skill} Skill
 * @typedef {import("../../generated-types/hots").Talent} Talent
 */

describe("parseSkillTalent()", () => {
  /** @type {HdpAbilityEn} */
  const hdpAbilityEn = {
    nameId: "FooBarAbilityId",
    buttonId: "FooBarAbilityButtonId",
    name: "Foo Bar Ability English Name",
    icon: "foo_bar_ability_icon.png",
    shortTooltip: 'Foo Bar ability <c val="456789">short</c> tooltip (English)',
    fullTooltip: 'Foo Bar ability <c val="abcdef">long</c> tooltip (English)',
    abilityType: "Trait",
  };
  /** @type {HdpAbilityKo} */
  const hdpAbilityKo = {
    ...hdpAbilityEn,
    name: "Foo Bar Ability Korean Name",
    shortTooltip: 'Foo Bar ability <c val="456789">short</c> tooltip (Korean)',
    fullTooltip: 'Foo Bar ability <c val="abcdef">long</c> tooltip (Korean)',
  };
  /** @type {Skill} */
  const expectedSkill = {
    id: "FooBarAbilityId",
    name: {
      en: "Foo Bar Ability English Name",
      ko: "Foo Bar Ability Korean Name",
    },
    type: "D",
    icon: "foo_bar_ability_icon",
    description:
      'Foo Bar ability <span style="color:#abcdef">long</span> tooltip (Korean)',
    shortDescription: "Foo Bar ability short tooltip (Korean)",
  };

  it("should parse abilities correctly", () => {
    assert.deepStrictEqual(
      parseSkillTalent(hdpAbilityEn, hdpAbilityKo),
      expectedSkill
    );
  });

  it("should trim ability names", () => {
    /** @type {HdpAbilityEn} */
    const hdpAbilityWithUntrimmedNameEn = {
      ...hdpAbilityEn,
      name: "    Ability English Name   ",
    };
    /** @type {HdpAbilityKo} */
    const hdpAbilityWithUntrimmedNameKo = {
      ...hdpAbilityKo,
      name: "    Ability Korean Name   ",
    };
    /** @type {Skill} */
    const expectedSkillWithCooldown = {
      ...expectedSkill,
      name: {
        en: "Ability English Name",
        ko: "Ability Korean Name",
      },
    };

    assert.deepStrictEqual(
      parseSkillTalent(
        hdpAbilityWithUntrimmedNameEn,
        hdpAbilityWithUntrimmedNameKo
      ),
      expectedSkillWithCooldown
    );
  });

  it("should extract cooldown information correctly", () => {
    /** @type {HdpAbilityEn} */
    const hdpAbilityWithCooldownEn = {
      ...hdpAbilityEn,
      cooldownTooltip: "Cooldown: 12 seconds",
    };
    /** @type {HdpAbilityKo} */
    const hdpAbilityWithCooldownKo = {
      ...hdpAbilityKo,
      cooldownTooltip: "재사용 대기시간: 12초",
    };
    /** @type {Skill} */
    const expectedSkillWithCooldown = {
      ...expectedSkill,
      cooldown: 12,
    };

    assert.deepStrictEqual(
      parseSkillTalent(hdpAbilityWithCooldownEn, hdpAbilityWithCooldownKo),
      expectedSkillWithCooldown
    );

    /** @type {HdpAbilityEn} */
    const hdpAbilityWithChargeCooldownEn = {
      ...hdpAbilityEn,
      cooldownTooltip: "Charge Cooldown: 12.34 seconds",
    };
    /** @type {HdpAbilityKo} */
    const hdpAbilityWithChargeCooldownKo = {
      ...hdpAbilityKo,
      cooldownTooltip: "충전 대기시간: 12.34초",
    };
    /** @type {Skill} */
    const expectedSkillWithChargeCooldown = {
      ...expectedSkill,
      rechargeCooldown: 12.34,
    };

    assert.deepStrictEqual(
      parseSkillTalent(
        hdpAbilityWithChargeCooldownEn,
        hdpAbilityWithChargeCooldownKo
      ),
      expectedSkillWithChargeCooldown
    );
  });
});

describe("parseTalent()", () => {
  it("should parse talents correctly", () => {
    /** @type {HdpTalentEn} */
    const hdpTalentEn = {
      nameId: "MyTalentId",
      buttonId: "MyTalentButtonId",
      name: "My Talent English Name",
      icon: "my_talent_icon.png",
      shortTooltip:
        'Short description of <c val="123456">My Talent</c> (English)',
      fullTooltip: 'Description of <c val="789abc">My Talent</c> (English)',
      abilityType: "Passive",
      sort: 1,
    };
    /** @type {HdpTalentKo} */
    const hdpTalentKo = {
      ...hdpTalentEn,
      name: "My Talent Korean Name",
      shortTooltip:
        'Short description of <c val="123456">My Talent</c> (Korean)',
      fullTooltip: 'Description of <c val="789abc">My Talent</c> (Korean)',
    };
    /** @type {Talent} */
    const expectedTalent = {
      id: "MyTalentId",
      name: {
        en: "My Talent English Name",
        ko: "My Talent Korean Name",
      },
      type: "passive",
      icon: "my_talent_icon",
      description:
        'Description of <span style="color:#789abc">My Talent</span> (Korean)',
      shortDescription: "Short description of My Talent (Korean)",
    };

    assert.deepStrictEqual(
      parseTalent(hdpTalentEn, hdpTalentKo),
      expectedTalent
    );
  });
});

describe("parseHero()", () => {
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
    ratings: {
      complexity: 9,
      damage: 7,
      survivability: 5,
      utility: 3,
    },
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
  /** @type {Hero} */
  const expectedHero = {
    name: "Test Hero Korean Name",
    title: "Test Hero Fancy Title",
    icon: "test_hero_icon_target",
    newRole: "melee_assassin",
    universe: "starcraft",
    stats: {
      hp: { value: 123, levelScaling: 0.045 },
      hpRegen: { value: 6.7, levelScaling: 0.089 },
      radius: 9.8,
      speed: 42,
    },
    skills: [],
    talents: {
      1: [],
      4: [],
      7: [],
      10: [],
      13: [],
      16: [],
      20: [],
    },
  };

  it("should parse hero with no abilities, weapons, resources, or units", () => {
    assert.deepStrictEqual(
      parseHero("TestHeroId", hdpHeroEn, hdpHeroKo),
      expectedHero
    );
  });
});
