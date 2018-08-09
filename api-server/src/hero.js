#!/usr/bin/env node
'use strict';

const Skill = require('./skill');
const Talent = require('./talent');

/**
 * Represents a Heroes of the Storm hero.
 */
module.exports = class Hero {
  constructor(o = {}) {
    this.name = o.name || '';
    this.title = o.title || '';
    this.iconUrl = o.iconUrl || '';
    this.id = o.id || '';
    this.type = o.type || '';
    this.role = o.role || '';
    this.universe = o.universe || '';

    this.stats = Array.isArray(o.stats) ? o.stats.map(cloneUnit) : cloneUnit(o.stats);

    this.skills = (o.skills || []).map(skill => new Skill(skill));

    this.talents = {};
    for (const talentLevel in o.talents) {
      this.talents[talentLevel] = o.talents[talentLevel].map(talent => {
        talent = new Talent(talent);
        talent.level = talentLevel;
        return talent;
      });
    }

    /**
     * Helper function that clones a unit (i.e. collection of stats)
     * @param {Object<string, number|Object>} unit Collection of stat ID => stat value or object
     * @return {Object<string, number|Object>} Cloned unit
     */
    function cloneUnit(unit) {
      const unitClone = {};
      for (const statId in unit) {
        const stat = unit[statId];
        unitClone[statId] = Array.isArray(stat) ? stat.map(cloneStat) : cloneStat(stat);
      }
      return unitClone;
    }

    /**
     * Helper function that clones a stat
     * @param {number | Object<string, number>} stat
     * @return {number | Object<string, number>} Cloned stat
     */
    function cloneStat(stat) {
      return typeof stat === 'object' && stat ? Object.assign({}, stat) : stat;
    }
  }

  /**
   * Returns the role name of this hero.
   * @return {string} Role name defined in `Hero.roles`, or '' if unknown. Multiple roles are separated by a comma(,).
   */
  getRoleName() {
    let roleNames = ''

    for (const roleId in Hero.roles)
      if (this.role.includes(roleId))
        roleNames += (roleNames ? ',' : '') + Hero.roles[roleId];

    return roleNames;
  }

  /**
   * Returns the universe name of this hero.
   * @return {string} Universe name defined in `Hero.universes`, or '' if unknown
   */
  getUniverseName() {
    return Hero.universes[this.universe] || '';
  }

  /**
   * Iterate through each skill and talent of this hero.
   * @return {IterableIterator<Skill | Talent>}
   */
  *allSkillsAndTalents() {
    yield* this.skills;
    yield* this.allTalents();
  }

  /**
   * Iterate through each talent of this hero, ordered by level.
   * @return {IterableIterator<Talent>}
   */
  *allTalents() {
    for (const talentLevel in this.talents)
      yield* this.talents[talentLevel];
  }

  /**
   * Produce a compact, minimal JSON representation
   */
  toJSON() {
    const o = {
      name: this.name,
      title: this.title,
      iconUrl: this.iconUrl || undefined,
      id: this.id,
      type: this.type,
      role: this.role,
      universe: this.universe,
      stats: this.stats,
      skills: this.skills.map(skill => skill.toJSON()),
      talents: {}
    };

    //Ensure that talents are ordered by level
    //(may not be necessary in V8, see https://stackoverflow.com/a/280861/9943202)
    for (const talentLevel of Object.keys(this.talents).sort((a, b) => a - b))
      o.talents[talentLevel] = this.talents[talentLevel].map(talent => talent.toJSON());

    return o;
  }

  /**
   * Parse one or more role names from the given string and return an array of role IDs.
   * @param {string} roleString String containing the role name
   * @return {string[]} An array of role IDs, or an empty Array if unknown.
   */
  static parseRoles(roleString) {
    const roles = new Set;

    for (const roleId in Hero.roles)
      if (roleString.includes(Hero.roles[roleId]))
        roles.add(roleId);

    return [...roles];
  }

  /**
   * Parse a universe name from the given string and return the universe ID.
   * @param {string} universeString String containing the universe name
   * @return {string} A universe ID defined in `Hero.universes`, or '' if unknown.
   */
  static parseUniverse(universeString) {
    for (const universeId in Hero.universes)
      if (universeString.includes(Hero.universes[universeId]))
        return universeId;

    return '';
  }
};


const Hero = module.exports;

Hero.roles = Object.freeze({
  'warrior': '전사',
  'assassin': '암살자',
  'support': '지원가',
  'specialist': '전문가'
});

Hero.universes = Object.freeze({
  'warcraft': '워크래프트',
  'starcraft': '스타크래프트',
  'diablo': '디아블로',
  'classic': '고전',
  'overwatch': '오버워치'
});