#!/usr/bin/env node
import { HeroStats } from "./hero-stats.js";
import { Skill } from "./skill.js";
import { Talent } from "./talent.js";

/**
 * @typedef {import("./ko-en-string.js").KoEnString} KoEnString
 */

/**
 * Represents a Heroes of the Storm hero.
 */
export class Hero {
  /**
   * Create a new Hero object.
   * @param {Object} o
   * @param {string | KoEnString=} o.name
   * @param {string=} o.title
   * @param {string=} o.icon
   * @param {string=} o.iconUrl
   * @param {string=} o.id
   * @param {string=} o.newRole
   * @param {string=} o.universe
   * @param {HeroStats | HeroStats[]=} o.stats
   * @param {Skill[]=} o.skills
   * @param {Object<number, Talent[]>=} o.talents
   * @param {Object<string, string|number>=} o.extras
   */
  constructor(o = {}) {
    this.name = o.name || "";
    this.title = o.title || "";
    this.icon = o.icon || "";
    this.iconUrl = o.iconUrl || "";
    this.id = o.id || "";
    /** @type {HeroRoleId | ""} */
    this.newRole = isRoleId(o.newRole) ? o.newRole : "";
    /** @type {HeroUniverseId | ""} */
    this.universe = isUniverseId(o.universe) ? o.universe : "";

    this.stats = Array.isArray(o.stats)
      ? o.stats.map((unitStats) => new HeroStats(unitStats))
      : new HeroStats(o.stats);

    this.skills = (o.skills || []).map((skill) => new Skill(skill));

    /** @type {{ [talentLevel: number]: Talent[] }} */
    this.talents = {};
    if (o.talents) {
      for (const talentLevelStr of Object.keys(o.talents)) {
        const talentLevel = Number(talentLevelStr);
        this.talents[talentLevel] = o.talents[talentLevel].map((talent) => {
          talent = new Talent(talent);
          talent.level = talentLevel;
          return talent;
        });
      }
    }
  }

  /**
   * Returns the role name of this hero.
   * @return {string} Role name defined in `Hero.roles`, or '' if unknown.
   */
  getRoleName() {
    // @ts-expect-error Because we are allowing "" as a value
    return roles[this.newRole] || "";
  }

  /**
   * Returns the universe name of this hero.
   * @return {string} Universe name in `Hero.universes`, or '' if unknown
   */
  getUniverseName() {
    // @ts-expect-error Because we are allowing "" as a value
    return universes[this.universe] || "";
  }

  /**
   * Iterate through each skill and talent of this hero.
   * @yield {IterableIterator<Skill | Talent>}
   */
  *allSkillsAndTalents() {
    yield* this.skills;
    yield* this.allTalents();
  }

  /**
   * Iterate through each talent of this hero, ordered by level.
   * @yield {IterableIterator<Talent>}
   */
  *allTalents() {
    for (const talentGroup of Object.values(this.talents)) {
      yield* talentGroup;
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
      /** @type {Object<string, Talent[]>} */
      talents: {},
    };

    // Ensure that talents are ordered by level
    // (may not be necessary in V8, see https://stackoverflow.com/a/280861/9943202)
    for (const talentLevel of Object.keys(this.talents).sort(
      (a, b) => Number(a) - Number(b)
    )) {
      o.talents[talentLevel] = this.talents[Number(talentLevel)];
    }

    return o;
  }

  /**
   * Parse a universe name from the given string and return the universe ID.
   * @param {string} universeString String containing the universe name
   * @return {HeroUniverseId | ""} A universe ID in `Hero.universes`, or '' if unknown.
   */
  static parseUniverse(universeString) {
    for (const [universeId, universeName] of Object.entries(universes)) {
      if (universeString.includes(universeName)) {
        return /** @type {HeroUniverseId} */ (universeId);
      }
    }

    return "";
  }
}

export const roles = {
  tank: "전사",
  bruiser: "투사",
  ranged_assassin: "원거리 암살자",
  melee_assassin: "근접 암살자",
  healer: "치유사",
  support: "지원가",
};

export const universes = {
  warcraft: "워크래프트",
  starcraft: "스타크래프트",
  diablo: "디아블로",
  classic: "고전",
  overwatch: "오버워치",
  nexus: "시공의 폭풍",
};

/**
 * @typedef {keyof roles} HeroRoleId
 * @typedef {keyof universes} HeroUniverseId
 */

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @param {*} role
 * @return {role is HeroRoleId}
 */
function isRoleId(role) {
  return (
    typeof role === "string" &&
    Object.prototype.hasOwnProperty.call(roles, role)
  );
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @param {*} universe
 * @return {universe is HeroUniverseId}
 */
function isUniverseId(universe) {
  return (
    typeof universe === "string" &&
    Object.prototype.hasOwnProperty.call(universes, universe)
  );
}
