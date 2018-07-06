#!/usr/bin/env node

/**
 * Defines the model classes (Hero, Skill, Talent) for use in other scripts
 */

'use strict';

class Hero {
  constructor(o = {}) {
    this.name = o.name || '';
    this.iconUrl = o.iconUrl || '';
    this.id = o.id || '';
    this.type = o.type || '';
    this.role = o.role || '';
    this.universe = o.universe || '';
    this.skills = (o.skills || []).map(skill => new Skill(skill));
    this.talents = {};
    for (const talentLevel in o.talents)
      this.talents[talentLevel] = o.talents[talentLevel].map(talent => new Talent(talent));
  }

  /**
   * Returns the role name of this hero.
   * @return {string} Role name defined in `Hero.roles`, or '' if unknown
   */
  getRoleName() {
    return Hero.roles[this.role] || '';
  }

  /**
   * Returns the universe name of this hero.
   * @return {string} Universe name defined in `Hero.universes`, or '' if unknown
   */
  getUniverseName() {
    return Hero.universes[this.universe] || '';
  }

  /**
   * Produce a compact, minimal JSON
   */
  compact() {
    const o = {};
    o.name = this.name;
    if (this.iconUrl)
      o.iconUrl = this.iconUrl;
    // o.id = this.id; // ID string is assumed to be available from the parent object's key.
    o.type = this.type;
    o.role = this.role;
    o.universe = this.universe;
    o.skills = this.skills.map(skill => skill.compact());
    o.talents = {};
    Object.keys(this.talents).sort().forEach(talentLevel => {
      o.talents[talentLevel] = this.talents[talentLevel].map(talent => talent.compact());
    });
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
   * Parse a role name from the given string and return the role ID.
   * @param {string} roleString String containing the role name
   * @return {string} A role ID defined in `Hero.roles`, or '' if unknown.
   */
  static parseRole(roleString) {
    for (const roleId in Hero.roles)
      if (roleString.includes(Hero.roles[roleId]))
        return roleId;

    return '';
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
}

Hero.roles = {
  'warrior': '전사',
  'assassin': '암살자',
  'support': '지원가',
  'specialist': '전문가'
};

Hero.universes = {
  'warcraft': '워크래프트',
  'starcraft': '스타크래프트',
  'diablo': '디아블로',
  'classic': '고전',
  'overwatch': '오버워치'
};

Object.freeze(Hero.roles);
Object.freeze(Hero.universes);

class Skill {
  constructor(o = {}) {
    this.name = o.name || '';
    this.iconUrl = o.iconUrl || '';
    this.type = o.type || '';
    this.level = o.level || 0;
    this.description = o.description || '';
    this.cooldown = o.cooldown || 0;
    this.rechargeCooldown = o.rechargeCooldown || 0;
    this.manaCost = o.manaCost || 0;
    this.extras = o.extras || {};
  }

  /**
   * Produce a compact, minimal JSON
   */
  compact() {
    const o = {};
    o.name = this.name;
    o.type = this.type;
    if (this.iconUrl)
      o.iconUrl = this.iconUrl;
    if (this.level)
      o.level = this.level;
    o.description = this.description;
    if (this.cooldown)
      o.cooldown = this.cooldown;
    if (this.rechargeCooldown)
      o.rechargeCooldown = this.rechargeCooldown;
    if (this.manaCost)
      o.manaCost = this.manaCost;
    o.extras = this.extras;
    return o;
  }
}

class Talent extends Skill {
  /**
   * Produce a compact, minimal JSON
   */
  compact() {
    const o = super.compact();
    // Talent level information is assumed to be present in the Hero class.
    delete o.level;
    return o;
  }
}


if (typeof module === 'object') {
  module.exports = { Hero, Skill, Talent };
}