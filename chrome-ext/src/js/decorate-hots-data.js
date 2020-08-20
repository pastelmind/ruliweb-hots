/**
 * Provides tools for manipulating HotS data after retrieving the JSON file.
 * This script can be used both in Node.js and in the browser.
 */

/**
 * @template T
 * @typedef {import("../../../scripts/type-util.js").KnownKeys<T>} KnownKeys
 */

/**
 * Merge `U` into `T`, overwriting matching property names in `T` with those
 * from `U`.
 * @template T, U
 * @typedef {Pick<T, Exclude<KnownKeys<T>, keyof U>> & U} Override
 */

/**
 * @typedef {import("../../../generated-types/hots").RuliwebHotSDataset} RuliwebHotSDataset
 * @typedef {import("../../../generated-types/hots").Hero} Hero
 * @typedef {import("../../../generated-types/hots").Unit} Unit
 * @typedef {import("../../../generated-types/hots").Skill} Skill
 * @typedef {import("../../../generated-types/hots").Talent} Talent
 */

/**
 * @typedef {object} DecoratedHotsData
 * @property {string} hotsVersion
 * @property {string=} hotsPtrVersion
 * @property {Object<string, DecoratedHero>} heroes
 * @property {Object<string, DecoratedHero>} ptrHeroes
 */

/**
 * @typedef {object} _DecoratedHero
 * @property {string} id Hero ID
 * @property {string} iconUrl
 * @property {string} roleName
 * @property {string} universeName
 * @property {DecoratedUnit | DecoratedUnit[]} units
 * @property {DecoratedSkill[]} skills
 * @property {Object<string, DecoratedTalent[]>} talents
 * @property {boolean=} isPtr
 */

// NOTE: Always use `string` as the key type of Object<K, V>, unless there is a
// very good reason not to!
// Otherwise, TypeScript cannot infer the return types of Object.values() and
// Object.entries().

/**
 * @typedef {object} DecoratedUnit
 * @property {string=} unitName
 * @property {DecoratedStat[]} stats
 */

/**
 * @typedef {object} _DecoratedSkill
 * @property {number} index
 * @property {string} name
 * @property {string} heroName
 * @property {string} heroId
 * @property {string} iconUrl
 * @property {string} typeName
 * @property {string} typeNameLong
 * @property {string} tooltipDescription
 * @property {boolean=} isTypeClassHeroic
 * @property {boolean=} isTypeClassPassive
 * @property {boolean=} isTypeClassActive
 * @property {boolean=} isTypeClassBasic
 */

/**
 * @typedef {object} _DecoratedTalent
 * @property {number} level Talent level
 */

/**
 * @typedef {Override<Hero, _DecoratedHero>} DecoratedHero
 * @typedef {Override<Skill, _DecoratedSkill>} DecoratedSkill
 * @typedef {Override<Talent, _DecoratedSkill & _DecoratedTalent>} DecoratedTalent
 */

/**
 * A raw object that represents a hero's stat
 * @typedef {Object} RawStat
 * @prop {number} value Base stat value. If `levelScaling` is present, this
 *    represents a level 0-value; otherwise, a level 1-value.
 * @prop {number=} levelScaling Multiplicative modifier applied to RawStat.value
 *    on each level up
 * @prop {number=} levelAdd Additive modifier applied to RawStat.value on each
 *    level up
 */

/**
 * A decorated object that represents a hero's stat
 * @typedef {
    | DecoratedConstantStat
    | DecoratedLinearStat
    | DecoratedScalingStat
  } DecoratedStat
 */

/**
 * @typedef {Object} DecoratedConstantStat
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {string} value Prettified stat value
 */

/**
 * @typedef {Object} DecoratedLinearStat
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {string} value Prettified base stat value at level 0
 * @prop {number} levelAdd Additive modifier applied on each level up
 * @prop {string} level20 Prettified stat value at level 20
 */

/**
 * @typedef {Object} DecoratedScalingStat
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {string} value Base stat value at level 0
 * @prop {number} levelScaling Multiplicative modifier applied on each level up
 * @prop {number} percentScaling `levelScaling` represented as a percentage
 * @prop {string} level20 Stat value at level 20
 */

/**
 * A preset description for a hero's stat.
 * @typedef {Object} StatPreset
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {boolean=} isDisabled
 */

/**
 * @typedef {keyof STAT_PRESETS} StatId
 */

/**
 * Collection of stat presets
 */
const STAT_PRESETS = {
  hp: {
    name: "생명력",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png",
  },
  hpRegen: {
    name: "생명력 재생",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png",
  },
  shields: {
    name: "보호막",
    iconUrl: "https://i2.ruliweb.com/img/18/07/21/164bb97668719dc2c.png",
  },
  mp: {
    name: "마나",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png",
  },
  mpRegen: {
    name: "마나 재생",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png",
  },
  energy: {
    name: "기력",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  energyRegen: {
    name: "기력 재생",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  fury: {
    name: "분노",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  brew: {
    name: "취기",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  ammo: {
    name: "탄환",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  healEnergy: {
    name: "치유 에너지",
    iconUrl: "https://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png",
  },
  charge: {
    name: "충전",
    iconUrl: "https://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png",
    isDisabled: true,
  },
  chargeRegen: {
    name: "충전 재생",
    iconUrl: "https://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png",
    isDisabled: true,
  },
  zaryaEnergy: {
    name: "에너지",
    iconUrl: "https://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png",
  },
  zaryaEnergyRegen: {
    name: "에너지 재생",
    iconUrl: "https://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png",
  },
  damage: {
    name: "공격력",
    iconUrl: "https://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png",
  },
  attackSpeed: {
    name: "공격 속도",
    iconUrl: "https://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png",
  },
  range: {
    name: "사거리",
    iconUrl: "https://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png",
  },
  speed: {
    name: "이동 속도",
    iconUrl: "https://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png",
  },
};

/**
 * Decorates the HotsData object in-place for the extension to use.
 *
 * Actions:
 *  * Set default icon URL to heroes, skills, and talents with missing icons
 *  * Assign an index number to each skill.
 *  * Assign a talent level to each talent.
 *  * Creates a decorated unit (or an array of decorated units) for each hero.
 * @param {RuliwebHotSDataset} hotsData Unmodified HotS data object parsed from hots.json
 * @return {DecoratedHotsData} Decorated HotS data object
 */
export function decorateHotsData(hotsData) {
  hotsData.ptrHeroes = hotsData.ptrHeroes || {};
  const { hotsPtrVersion, heroes, ptrHeroes = {} } = hotsData;

  // Set PTR version string
  hotsData.hotsPtrVersion = hotsPtrVersion && hotsPtrVersion + " (PTR)";

  for (const [heroId, hero] of Object.entries(heroes)) {
    decorateHero(hero, heroId, hotsData.iconUrls);
  }
  for (const [heroId, hero] of Object.entries(ptrHeroes)) {
    decorateHero(hero, heroId, hotsData.iconUrls);
  }

  // Trick to mutate the hotsData object in-place without TypeScript complaining
  return /** @type {DecoratedHotsData} */ (/** @type {any} */ (hotsData));
}

const ROLE_NAMES = {
  tank: "전사",
  bruiser: "투사",
  ranged_assassin: "원거리 암살자",
  melee_assassin: "근접 암살자",
  healer: "치유사",
  support: "지원가",
};

const UNIVERSE_NAMES = {
  warcraft: "워크래프트",
  starcraft: "스타크래프트",
  diablo: "디아블로",
  classic: "블리자드 고전",
  overwatch: "오버워치",
  nexus: "시공의 폭풍",
};

const MISSING_ICON_URL =
  "https://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png";

/**
 * Decorats a hero object in-place.
 * @param {Hero} hero Object to decorate
 * @param {string} heroId
 * @param {Object<string, string>} iconUrls
 * @param {boolean=} isPtr
 * @return {DecoratedHero}
 */
function decorateHero(hero, heroId, iconUrls, isPtr) {
  const decoratedUnits = Array.isArray(hero.stats)
    ? hero.stats.map(createDecoratedUnit)
    : createDecoratedUnit(hero.stats);

  const decoratedSkills = hero.skills.map((skill, index) =>
    decorateSkillOrTalent(skill, index, hero, heroId, iconUrls)
  );

  const decoratedTalents = Object.fromEntries(
    Object.entries(hero.talents).map(([talentLevelStr, talentArray]) => [
      talentLevelStr,
      talentArray.map((talent, index) =>
        decorateTalent(
          talent,
          Number(talentLevelStr),
          index,
          hero,
          heroId,
          iconUrls
        )
      ),
    ])
  );

  return Object.assign(hero, {
    id: heroId,
    iconUrl: iconUrls[hero.icon] || MISSING_ICON_URL,
    roleName: ROLE_NAMES[hero.newRole] || "잘못된 역할군입니다",
    universeName: UNIVERSE_NAMES[hero.universe],
    units: decoratedUnits,
    skills: decoratedSkills,
    talents: decoratedTalents,
    isPtr,
  });
}

/**
 * Creates a decorated unit object. Does NOT modify the original Unit object.
 * @param {Unit} unit
 * @return {DecoratedUnit}
 */
function createDecoratedUnit(unit) {
  const decoratedStats = Object.keys(STAT_PRESETS)
    .map((_presetId) => {
      const presetId = /** @type {StatId} */ (_presetId);
      const statsKey = presetId === "attackSpeed" ? "period" : presetId;
      if (!isKeyOf(statsKey, unit)) return;

      const value = unit[statsKey];
      if (value == undefined) return;

      if (Array.isArray(value)) {
        return Array.from(value, (v) => createDecoratedStat(v, presetId));
      } else {
        return createDecoratedStat(value, presetId);
      }
    })
    .flat()
    .filter(isNotUndefined);

  return {
    unitName: unit.unitName,
    stats: decoratedStats,
  };
}

/**
 * Create a decorated stat from a raw stat, using the given preset.
 * Does NOT modify the original stat object.
 * @param {number | RawStat} stat
 * @param {StatId} presetId
 * @return {DecoratedStat | undefined}
 */
function createDecoratedStat(stat, presetId) {
  /** @type {StatPreset} */
  const preset = STAT_PRESETS[presetId];
  if (preset.isDisabled) return;

  if (typeof stat !== "object") stat = { value: stat };

  const { value, levelScaling, levelAdd } = stat;
  const prettyValue = prettifyStatValue(stat.value, presetId);

  if (levelScaling) {
    const level20 = value * Math.pow(1 + levelScaling, 20);
    const percentScaling = levelScaling * 100;

    /** @type {DecoratedScalingStat} */
    const decoratedStat = {
      ...preset,
      value: prettyValue,
      levelScaling,
      percentScaling,
      level20: prettifyStatValue(level20, presetId),
    };

    return decoratedStat;
  } else if (levelAdd) {
    const level20 = value + levelAdd * 19;

    /** @type {DecoratedLinearStat} */
    const decoratedStat = {
      ...preset,
      value: prettyValue,
      levelAdd,
      level20: prettifyStatValue(level20, presetId),
    };

    return decoratedStat;
  } else {
    /** @type {DecoratedConstantStat} */
    const decoratedStat = { ...preset, value: prettyValue };

    return decoratedStat;
  }
}

/**
 * Prettify the given stat value, selecting a method appropriate for the given
 * stat ID.
 * @param {number} value
 * @param {StatId} statId
 * @return {string}
 */
function prettifyStatValue(value, statId) {
  /* eslint-disable no-fallthrough */
  switch (statId) {
    case "hp":
    case "shields":
    case "damage":
    case "healEnergy":
      return value.toFixed(0);

    case "attackSpeed":
      value = 1 / value; // attackSpeed is derived from (attack) period
    // Intentional fall-through
    case "hpRegen":
      return String(Number(value.toFixed(3)));

    case "range":
      // Append trailing '.0'
      if (Number.isInteger(value)) return value.toFixed(1);
  }
  /* eslint-enable no-fallthrough */

  return String(value);
}

/**
 * Decorates a skill in-place.
 * @param {Skill | Talent} skill Object to decorate
 * @param {number} index Skill index
 * @param {Hero} hero
 * @param {string} heroId
 * @param {Object<string, string>} iconUrls
 * @return {DecoratedSkill}
 */
function decorateSkillOrTalent(skill, index, hero, heroId, iconUrls) {
  const { type } = skill;
  const upgradeFor = "upgradeFor" in skill ? skill.upgradeFor : undefined;

  let typeName;
  let typeNameLong;
  if (upgradeFor) {
    typeName = generateSkillTypeName(upgradeFor);
    typeNameLong = `능력 강화 (${typeName})`;
  } else {
    typeNameLong = typeName = generateSkillTypeName(type);
  }

  /** @type {DecoratedSkill} */
  const decoratedSkill = Object.assign(skill, {
    index,
    name: skill.name.ko,
    heroName: hero.name,
    heroId,
    iconUrl: iconUrls[skill.icon] || MISSING_ICON_URL,
    typeName,
    typeNameLong,
    // Convert short description text to tooltip-attr & HTML format
    tooltipDescription: skill.shortDescription,
    shortDescription: skill.shortDescription.replace(/\r?\n/g, "<br>"),
  });

  // Set flags for skill/talent type classes
  if (type === "R" || upgradeFor === "R") {
    decoratedSkill.isTypeClassHeroic = true;
  } else if ((type === "passive" && !upgradeFor) || upgradeFor === "passive") {
    decoratedSkill.isTypeClassPassive = true;
  } else if ((type === "active" && !upgradeFor) || upgradeFor === "active") {
    decoratedSkill.isTypeClassActive = true;
  } else {
    decoratedSkill.isTypeClassBasic = true;
  }

  return decoratedSkill;
}

/**
 * Decorates a talent in-place.
 * @param {Talent} talent Object to decorate
 * @param {number} level Talent level
 * @param {number} index Talent index
 * @param {Hero} hero
 * @param {string} heroId
 * @param {Object<string, string>} iconUrls
 * @return {DecoratedTalent}
 */
function decorateTalent(talent, level, index, hero, heroId, iconUrls) {
  return Object.assign(
    decorateSkillOrTalent(talent, index, hero, heroId, iconUrls),
    {
      level,
    }
  );
}

/**
 * Converts a skill type string to a human-readable version.
 * @private
 * @param {string} skillType Machine-readable
 * @return {string}
 */
function generateSkillTypeName(skillType) {
  return skillType
    .replace(/passive/g, "지속 효과")
    .replace(/active/g, "사용 효과")
    .replace(/D/g, "고유 능력");
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @template {string | number | symbol} T
 * @template U
 * @param {T} key
 * @param {U} obj
 * @return {key is T & keyof U}
 */
function isKeyOf(key, obj) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @template T
 * @param {T | undefined} v
 * @return {v is T}
 */
function isNotUndefined(v) {
  return v !== undefined;
}
