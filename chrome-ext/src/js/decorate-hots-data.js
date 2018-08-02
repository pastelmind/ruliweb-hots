/**
 * Provides tools for manipulating HotS data after retrieving the JSON file.
 * This script can be used both in Node.js and in the browser.
 */

'use strict';


/**
 * A raw object that represents a hero's stat
 * @typedef {Object} RawStat
 * @prop {number} value Base stat value. If `levelScaling` is present, this represents a level 0-value; otherwise, a level 1-value.
 * @prop {number=} levelScaling Multiplicative modifier applied to RawStat.value on each level up
 * @prop {number=} levelAdd Additive modifier applied to RawStat.value on each level up
 */

/**
 * A decorated object that represents a hero's stat
 * @typedef {Object} DecoratedStat
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {number | string =} value Base stat value. If `levelScaling` is present, this represents a level 0-value; otherwise, a level 1-value.
 * @prop {number=} levelScaling Multiplicative modifier applied to RawStat.value on each level up
 * @prop {number=} levelAdd Additive modifier applied to RawStat.value on each level up
 * @prop {number=} percentScaling Value of `levelScaling` represented as a percentage. This property is omitted if `levelScaling` is not present.
 * @prop {number | string =} level1 The stat's value at level 1. This property is omitted for constant stats.
 * @prop {number | string =} level20 The stat's value at level 20. This property is omitted for constant stats.
 */

/**
 * A preset description for a hero's stat.
 * @typedef {Object} StatPreset
 * @prop {string} id Stat ID
 * @prop {string} name
 * @prop {string} iconUrl
 * @prop {boolean=} isDisabled
 */

0;  //Circumvent a VSCode intellisense bug by capturing JSDoc typedef comments


//For use in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = decorateHotsData;
}


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
  for (const [heroId, hero] of Object.entries(hotsData.heroes)) {
    hero.id = heroId;

    //Add hero universe names
    hero.universeName = {
      'warcraft': '워크래프트',
      'starcraft': '스타크래프트',
      'diablo': '디아블로',
      'classic': '블리자드 고전',
      'overwatch': '오버워치'
    }[hero.universe];

    //Apply default icon URL to heroes
    if (!hero.iconUrl)
      hero.iconUrl = missingIconUrl;

    //Decorate skills and talents
    decorateSkillTalentArray(hero.skills);
    for (const talentLevel in hero.talents)
      decorateSkillTalentArray(hero.talents[talentLevel], parseInt(talentLevel));

    //Decorate units (i.e. collection of unit stats)
    if (Array.isArray(hero.stats))
      hero.units = hero.stats.map(unit => createDecoratedUnit(unit));
    else
      hero.units = createDecoratedUnit(hero.stats);
  }

  return hotsData;

  /**
   * Decorates the given skill or talent.
   * @param {Skill[]|Talent[]} skillsOrTalents Array of skills or talents
   * @param {number=} level Talent level
   */
  function decorateSkillTalentArray(skillsOrTalents, level) {
    skillsOrTalents.forEach((skill, index) => {
      //Apply default icon URL to skills
      if (!skill.iconUrl)
        skill.iconUrl = 'http://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png';

      //Apply skill/talent type name
      skill.typeName = (skill.type === 'D' ? '고유 능력' : skill.type);

      //Assign skill/talent index
      skill.index = index;

      //Assign talent level
      if (level)
        skill.level = level;
    });
  }


  /**
   * Creates a decorated unit (i.e. array of decorated unit stats) from a
   * collection of raw unit stats.
   * @param {Object<string, number | number[] | RawStat | RawStat[]>} unit Mapping of stat ID => raw stat value
   * @return { (DecoratedStat | DecoratedStat[])[] }
   */
  function createDecoratedUnit(stats) {
    const unit = { unitName: stats.unitName, stats: [] };

    for (const preset of hotsData.statPresets) {
      const stat = createDecoratedStat(stats[preset.id === 'attackSpeed' ? 'period' : preset.id], preset);

      if (!stat)
        continue;
      else if (Array.isArray(stat))
        unit.stats.push(...stat.filter(stat => stat));
      else
        unit.stats.push(stat);
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
    if (!stat || preset.isDisabled)
      return undefined;

    if (Array.isArray(stat))
      return stat.map(s => createDecoratedStat(s, preset));

    const decoratedStat = decorateStatValue(stat);

    decoratedStat.iconUrl = preset.iconUrl;
    if (!decoratedStat.name)
      decoratedStat.name = preset.name;

    if (decoratedStat.level1 && decoratedStat.level20) {
      decoratedStat.level1 = prettifyStatValue(decoratedStat.level1, preset.id);
      decoratedStat.level20 = prettifyStatValue(decoratedStat.level20, preset.id);
    }
    else if (decoratedStat.value)
      decoratedStat.value = prettifyStatValue(decoratedStat.value, preset.id);

    return decoratedStat;
  }

  /**
   * Decorates the given stat, based on its value.
   * @param {number | RawStat} stat
   * @return {DecoratedStat} Decorated stat object
   */
  function decorateStatValue(stat) {
    if (typeof stat !== 'object')
      return { value: stat };

    if (stat.levelScaling) {
      stat.level1 = stat.value * (1 + stat.levelScaling);
      stat.level20 = stat.value * Math.pow(1 + stat.levelScaling, 20);
      stat.percentScaling = stat.levelScaling * 100;
    }
    else if (stat.levelAdd) {
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
        value = 1 / value;  //attackSpeed is derived from (attack) period
      //Intentional fall-through

      case 'hpRegen':
        value = +(value.toFixed(3));
      //Intentional fall-through

      case 'range':
        if (Number.isInteger(value))
          return value.toFixed(1);  //Append trailing '.0'
    }

    return value;
  }
}