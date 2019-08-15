/**
 * Provides tools for manipulating HotS data after retrieving the JSON file.
 * This script can be used both in Node.js and in the browser.
 */

'use strict';


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
 * @typedef {Object} DecoratedStat
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {number | string =} value Base stat value. If `levelScaling` is
 *    present, this represents a level 0-value; otherwise, a level 1-value.
 * @prop {number=} levelScaling Multiplicative modifier applied to RawStat.value
 *    on each level up
 * @prop {number=} levelAdd Additive modifier applied to RawStat.value on each
 *    level up
 * @prop {number=} percentScaling Value of `levelScaling` represented as a
 *    percentage. This property is omitted if `levelScaling` is not present.
 * @prop {number | string =} level1 The stat's value at level 1. This property
 *    is omitted for constant stats.
 * @prop {number | string =} level20 The stat's value at level 20. This property
 *    is omitted for constant stats.
 */

/**
 * A preset description for a hero's stat.
 * @typedef {Object} StatPreset
 * @prop {string} id Stat ID
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {boolean=} isDisabled
 */

0; // Circumvent a VSCode intellisense bug by capturing JSDoc typedef comments


// For use in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = decorateHotsData;
}


/**
 * Collection of stat presets
 * @type {{ [id: string]: StatPreset }}
 */
const StatPresets = {
  hp: {
    name: '생명력',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png',
  },
  hpRegen: {
    name: '생명력 재생',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png',
  },
  shields: {
    name: '보호막',
    iconUrl: 'http://i2.ruliweb.com/img/18/07/21/164bb97668719dc2c.png',
  },
  mp: {
    name: '마나',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png',
  },
  mpRegen: {
    name: '마나 재생',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png',
  },
  energy: {
    name: '기력',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  energyRegen: {
    name: '기력 재생',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  fury: {
    name: '분노',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  brew: {
    name: '취기',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  ammo: {
    name: '탄환',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  healEnergy: {
    name: '치유 에너지',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/19/164b155016b19dc2c.png',
  },
  charge: {
    name: '충전',
    iconUrl: 'http://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png',
    isDisabled: true,
  },
  chargeRegen: {
    name: '충전 재생',
    iconUrl: 'http://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png',
    isDisabled: true,
  },
  zaryaEnergy: {
    name: '에너지',
    iconUrl: 'http://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png',
  },
  zaryaEnergyRegen: {
    name: '에너지 재생',
    iconUrl: 'http://i1.ruliweb.com/img/18/07/19/164b155022c19dc2c.png',
  },
  damage: {
    name: '공격력',
    iconUrl: 'http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png',
  },
  attackSpeed: {
    name: '공격 속도',
    iconUrl: 'http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png',
  },
  range: {
    name: '사거리',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png',
  },
  speed: {
    name: '이동 속도',
    iconUrl: 'http://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png',
  },
};


/**
 * Decorates the raw HotsData object for the extension to use.
 *
 * Actions:
 *  * Set default icon URL to heroes, skills, and talents with missing icons
 *  * Assign an index number to each skill.
 *  * Assign a talent level to each talent.
 *  * Creates a decorated unit (or an array of decorated units) for each hero.
 * @param {HotsData} hotsData Unmodified HotS data object parsed from hots.json
 * @return {HotsData} Decorated HotS data object
 */
function decorateHotsData(hotsData) {
  const MISSING_ICON_URL = 'http://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png';

  // Set PTR version string
  if (hotsData.hotsPtrVersion) hotsData.hotsPtrVersion += ' (PTR)';

  // Mark PTR data
  hotsData.ptrHeroes = hotsData.ptrHeroes || {};
  for (const ptrHeroId in hotsData.ptrHeroes) {
    const ptrHero = hotsData.ptrHeroes[ptrHeroId];
    ptrHero.isPtr = true;

    if (ptrHeroId in hotsData.heroes) {
      hotsData.heroes[ptrHeroId].hasPtrChanges = true;
    }
  }

  const allHeroes = [
    ...Object.entries(hotsData.heroes), ...Object.entries(hotsData.ptrHeroes),
  ];

  for (const [heroId, hero] of allHeroes) {
    hero.id = heroId;

    // Add hero role names
    hero.roleName = {
      'tank': '전사',
      'bruiser': '투사',
      'ranged_assassin': '원거리 암살자',
      'melee_assassin': '근접 암살자',
      'healer': '치유사',
      'support': '지원가',
    }[hero.newRole] || '잘못된 역할군입니다';

    // Add hero universe names
    hero.universeName = {
      'warcraft': '워크래프트',
      'starcraft': '스타크래프트',
      'diablo': '디아블로',
      'classic': '블리자드 고전',
      'overwatch': '오버워치',
    }[hero.universe];

    // Convert hero icon ID to URL
    hero.iconUrl = hotsData.iconUrls[hero.icon] || MISSING_ICON_URL;
    delete hero.icon;

    // Decorate skills and talents
    decorateSkillsAndTalents(hero);

    // Decorate units (i.e. collection of unit stats)
    if (Array.isArray(hero.stats)) {
      hero.units = hero.stats.map(unit => createDecoratedUnit(unit));
    } else hero.units = createDecoratedUnit(hero.stats);
  }

  // Remove iconUrls after assigning them to each hero, skill, and talent.
  delete hotsData.iconUrls;

  return hotsData;

  // TODO improve this (use array spread operators)
  /**
   * Decorates all skills and talents of the given hero.
   * @param {Hero} hero Hero object
   */
  function decorateSkillsAndTalents(hero) {
    const skillsOrTalents = [...hero.skills];

    // Assign skill index
    hero.skills.forEach((skill, index) => skill.index = index);

    for (const talentLevel in hero.talents) {
      hero.talents[talentLevel].forEach((talent, index) => {
        skillsOrTalents.push(talent);

        // Assign talent level and index
        talent.level = talentLevel;
        talent.index = index;
      });
    }

    // Decorate all skills and talents
    for (const skill of skillsOrTalents) {
      // Use Korean name only
      if (skill.name.ko) skill.name = skill.name.ko;

      skill.heroName = hero.name;
      skill.heroId = hero.id;

      // Convert skill/talent ID to URL
      skill.iconUrl = hotsData.iconUrls[skill.icon] || MISSING_ICON_URL;
      delete skill.icon;

      // Apply skill/talent type name
      if (skill.upgradeFor) {
        skill.typeName = generateSkillTypeName(skill.upgradeFor);
        skill.typeNameLong = `능력 강화 (${skill.typeName})`;
      } else {
        skill.typeNameLong = skill.typeName = generateSkillTypeName(skill.type);
      }

      // Set flags for skill/talent type classes
      if (skill.type === 'R' || skill.upgradeFor === 'R') {
        skill.isTypeClassHeroic = true;
      } else if (
        (skill.type === 'passive' && !skill.upgradeFor) ||
        skill.upgradeFor === 'passive'
      ) {
        skill.isTypeClassPassive = true;
      } else if (
        (skill.type === 'active' && !skill.upgradeFor) ||
        skill.upgradeFor === 'active'
      ) {
        skill.isTypeClassActive = true;
      } else {
        skill.isTypeClassBasic = true;
      }

      // Convert short description text to tooltip-attr & HTML format
      skill.tooltipDescription = skill.shortDescription;
      skill.shortDescription = skill.shortDescription.replace(/\r?\n/g, '<br>');
    }


    /**
     * Converts a skill type string to a human-readable version.
     * @private
     * @param {string} skillType Machine-readable
     * @return {string}
     */
    function generateSkillTypeName(skillType) {
      return skillType.replace(/passive/g, '지속 효과')
        .replace(/active/g, '사용 효과')
        .replace(/D/g, '고유 능력');
    }
  }


  /**
   * Creates a decorated unit (i.e. array of decorated unit stats) from a
   * collection of raw unit stats.
   * @param {Object<string, number | number[] | RawStat | RawStat[]>} stats
   *    Mapping of stat ID => raw stat value
   * @return { (DecoratedStat | DecoratedStat[])[] }
   */
  function createDecoratedUnit(stats) {
    const unit = { unitName: stats.unitName, stats: [] };

    for (const [presetId, preset] of Object.entries(StatPresets)) {
      preset.id = presetId;
      const stat = createDecoratedStat(
        stats[preset.id === 'attackSpeed' ? 'period' : preset.id], preset
      );

      if (!stat) continue;
      if (Array.isArray(stat)) {
        unit.stats.push(...stat.filter(stat => stat));
      } else unit.stats.push(stat);
    }

    return unit;
  }

  /**
   * Create a decorated stat from a raw stat, using the given preset.
   * @param {number | number[] | RawStat | RawStat[]} stat
   * @param {StatPreset} preset
   * @return {DecoratedStat | DecoratedStat[]}
   */
  function createDecoratedStat(stat, preset) {
    if (!stat || preset.isDisabled) return undefined;

    if (Array.isArray(stat)) {
      return stat.map(s => createDecoratedStat(s, preset));
    }

    const decoratedStat = decorateStatValue(stat);

    decoratedStat.iconUrl = preset.iconUrl;
    if (!decoratedStat.name) decoratedStat.name = preset.name;

    if (decoratedStat.level1 && decoratedStat.level20) {
      decoratedStat.level1 = prettifyStatValue(decoratedStat.level1, preset.id);
      decoratedStat.level20 =
        prettifyStatValue(decoratedStat.level20, preset.id);
    } else if (decoratedStat.value) {
      decoratedStat.value = prettifyStatValue(decoratedStat.value, preset.id);
    }

    return decoratedStat;
  }

  /**
   * Decorates the given stat, based on its value.
   * @param {number | RawStat} stat
   * @return {DecoratedStat} Decorated stat object
   */
  function decorateStatValue(stat) {
    if (typeof stat !== 'object') return { value: stat };

    if (stat.levelScaling) {
      stat.level1 = stat.value * (1 + stat.levelScaling);
      stat.level20 = stat.value * Math.pow(1 + stat.levelScaling, 20);
      stat.percentScaling = stat.levelScaling * 100;
    } else if (stat.levelAdd) {
      stat.level1 = stat.value;
      stat.level20 = stat.value + stat.levelAdd * 19;
    }

    return stat;
  }

  /**
   * Prettify the given stat value, selecting a method appropriate for the given
   * stat ID.
   * @param {number} value
   * @param {string} statId
   * @return {number|string}
   */
  function prettifyStatValue(value, statId) {
    switch (statId) {
      case 'hp':
      case 'shields':
      case 'damage':
      case 'healEnergy':
        return +(value.toFixed(0));

      case 'attackSpeed':
        value = 1 / value; // attackSpeed is derived from (attack) period
        // Intentional fall-through

      case 'hpRegen':
        value = +(value.toFixed(3));
        // Intentional fall-through

      case 'range':
        // Append trailing '.0'
        if (Number.isInteger(value)) return value.toFixed(1);
    }

    return value;
  }
}
