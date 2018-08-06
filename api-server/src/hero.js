#!/usr/bin/env node
'use strict';

const Skill = require('./skill');
const Talent = require('./talent');

/***/ //TODO Remove this once VS Code fixes [issue #55877](https://github.com/Microsoft/vscode/issues/55877)
/**
 * Represents a Heroes of the Storm hero.
 * This class can be iterated with `for...of` to retrieve each skill and talent.
 * @implements {Iterable<Skill|Talent>}
 */
const Hero = module.exports = class Hero {
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
    for (const talentLevel in o.talents)
      this.talents[talentLevel] = o.talents[talentLevel].map(talent => new Talent(talent));

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
   */
  *[Symbol.iterator]() {
    for (const skill of this.skills)
      yield skill;

    for (const talentLevel in this.talents)
      for (const talent of this.talents[talentLevel])
        yield talent;
  }

  /**
   * Produce a compact, minimal JSON
   */
  compact() {
    const o = {};
    o.name = this.name;
    o.title = this.title;
    if (this.iconUrl)
      o.iconUrl = this.iconUrl;
    // o.id = this.id; // ID string is assumed to be available from the parent object's key.
    o.type = this.type;
    o.role = this.role;
    o.universe = this.universe;
    o.stats = this.stats;
    o.skills = this.skills.map(skill => skill.compact());
    o.talents = {};
    for (const talentLevel of Object.keys(this.talents).sort())
      o.talents[talentLevel] = this.talents[talentLevel].map(talent => talent.compact());

    return o;
  }

  /**
   * Produces a compacted version from a collection of Heroes.
   * @param {Object.<string, Hero>} heroes Assumed to be hero ID => Hero mapping
   * @return {Object.<string, Object>} Compacted JSON
   */
  static compact(heroes) {
    const heroesCompact = {};

    //Sort by hero name in ascending order
    Object.values(heroes)
      .sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, 'en'))
      .forEach(hero => heroesCompact[hero.id] = hero.compact());

    return heroesCompact;
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