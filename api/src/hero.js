#!/usr/bin/env node
'use strict';

const HeroStats = require('./hero-stats');
const Skill = require('./skill');
const Talent = require('./talent');

/**
 * Represents a Heroes of the Storm hero.
 */
const Hero = module.exports = class Hero {
  /**
   * Create a new Hero object.
   * @param {Object} o
   * @param {string=} o.name
   * @param {string=} o.title
   * @param {string=} o.icon
   * @param {string=} o.iconUrl
   * @param {string=} o.id
   * @param {string=} o.newRole
   * @param {string=} o.universe
   * @param {HeroStats | HeroStats[]} o.stats
   * @param {Skill[]} o.skills
   * @param {Object<number, Talent[]>=} o.talents
   * @param {Object<string, string|number>} o.extras
   */
  constructor(o = {}) {
    this.name = o.name || '';
    this.title = o.title || '';
    this.icon = o.icon || '';
    this.iconUrl = o.iconUrl || '';
    this.id = o.id || '';
    this.newRole = o.newRole || '';
    this.universe = o.universe || '';

    this.stats = Array.isArray(o.stats) ?
      o.stats.map((unitStats) => new HeroStats(unitStats)) :
      new HeroStats(o.stats);

    this.skills = (o.skills || []).map((skill) => new Skill(skill));

    /** @type {{ [talentLevel: number]: Talent[] }} */
    this.talents = {};
    for (const talentLevel in o.talents) {
      this.talents[talentLevel] = o.talents[talentLevel].map((talent) => {
        talent = new Talent(talent);
        talent.level = talentLevel;
        return talent;
      });
    }
  }

  /**
   * Returns the role name of this hero.
   * @return {string} Role name defined in `Hero.roles`, or '' if unknown.
   */
  getRoleName() {
    return Hero.roles[this.newRole] || '';
  }

  /**
   * Returns the universe name of this hero.
   * @return {string} Universe name in `Hero.universes`, or '' if unknown
   */
  getUniverseName() {
    return Hero.universes[this.universe] || '';
  }

  /**
   * Iterate through each skill and talent of this hero.
   * @yield {IterableIterator<Skill | Talent>}
   */
  * allSkillsAndTalents() {
    yield* this.skills;
    yield* this.allTalents();
  }

  /**
   * Iterate through each talent of this hero, ordered by level.
   * @yield {IterableIterator<Talent>}
   */
  * allTalents() {
    for (const talentLevel in this.talents) {
      yield* this.talents[talentLevel];
    }
  }

  /**
   * Produce a compact, minimal JSON representation
   * @return {object} A JSON-compatible representation of this object.
   */
  toJSON() {
    const o = {
      name: this.name,
      title: this.title,
      icon: this.icon || undefined,
      iconUrl: this.iconUrl || undefined,
      id: this.id,
      newRole: this.newRole,
      universe: this.universe,
      stats: this.stats,
      skills: this.skills,
      talents: {},
    };

    // Ensure that talents are ordered by level
    // (may not be necessary in V8, see https://stackoverflow.com/a/280861/9943202)
    for (const talentLevel of Object.keys(this.talents).sort((a, b) => a - b)) {
      o.talents[talentLevel] = this.talents[talentLevel];
    }

    return o;
  }

  /**
   * Parse a universe name from the given string and return the universe ID.
   * @param {string} universeString String containing the universe name
   * @return {string} A universe ID in `Hero.universes`, or '' if unknown.
   */
  static parseUniverse(universeString) {
    for (const universeId in Hero.universes) {
      if (universeString.includes(Hero.universes[universeId])) {
        return universeId;
      }
    }

    return '';
  }
};


Hero.roles = {
  tank: '전사',
  bruiser: '투사',
  ranged_assassin: '원거리 암살자',
  melee_assassin: '근접 암살자',
  healer: '치유사',
  support: '지원가',
};

Hero.universes = {
  'warcraft': '워크래프트',
  'starcraft': '스타크래프트',
  'diablo': '디아블로',
  'classic': '고전',
  'overwatch': '오버워치',
};
