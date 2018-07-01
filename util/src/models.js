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
    Object.keys(heroes).sort((heroId1, heroId2) => {
      const heroName1 = heroes[heroId1].name;
      const heroName2 = heroes[heroId2].name;
      return heroName1 < heroName2 ? -1 : (heroName1 === heroName2 ? 0 : 1);
    }).forEach(heroId => {
      heroesCompact[heroId] = heroes[heroId].compact();
    });

    return heroesCompact;
  }
}

class Skill {
  constructor(o = {}) {
    this.name = o.name || '';
    this.iconUrl = o.iconUrl || '';
    this.type = o.type || '';
    this.level = o.level || 0;
    this.description = o.description || '';
    this.cooldown = o.cooldown || 0;
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