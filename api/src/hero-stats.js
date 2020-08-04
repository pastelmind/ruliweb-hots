#!/usr/bin/env node
import { ScalingStat } from "./scaling-stat.js";

/**
 * Represents a collection of a stats for a hero or a hero unit.
 */
export class HeroStats {
  /**
   * Create a new HeroStats object.
   * @param {Partial<HeroStats>} o Object to copy hero stats from
   */
  constructor(o = {}) {
    /**
     * Alternate name of the heroic unit
     * @type {string}
     */
    this.unitName = o.unitName || "";
    /**
     * Maximum HP
     * @type {ScalingStat}
     */
    this.hp = new ScalingStat(o.hp);
    /**
     * HP Regeneration Rate of the hero.
     * @type {ScalingStat}
     */
    this.hpRegen = new ScalingStat(o.hpRegen);
    /**
     * Maximum Mana of the hero.
     * @type {ScalingStat}
     */
    this.mp = new ScalingStat(o.mp);
    /**
     * Mana Regeneration Rate of the hero.
     * @type {ScalingStat}
     */
    this.mpRegen = new ScalingStat(o.mpRegen);
    /**
     * (D.Va) Maximum Charge of the hero.
     * @type {number}
     */
    this.charge = o.charge || 0;
    /**
     * (D.Va) Charge Regeneration Rate of the hero.
     * @type {number}
     */
    this.chargeRegen = o.chargeRegen || 0;
    /**
     * (Lt. Morales, Valeera) Maximum Energy of the hero.
     * @type {number}
     */
    this.energy = o.energy || 0;
    /**
     * (Valeera) Base Energy Regeneration of the hero.
     * @type {number}
     */
    this.energyRegen = o.energyRegen || 0;
    /**
     * (Sonya) Maximum Fury of the hero.
     * @type {number}
     */
    this.fury = o.fury || 0;
    /**
     * (Auriel) Maximum Heal Energy of the hero.
     * @type {ScalingStat}
     */
    this.healEnergy = new ScalingStat(o.healEnergy);
    /**
     * (Zarya) Maximum (pink) Energy of the hero.
     * @type {number}
     */
    this.zaryaEnergy = o.zaryaEnergy || 0;
    /**
     * (Tracer, Junkrat) Maximum Ammo of the hero.
     * @type {number}
     */
    this.ammo = o.ammo || 0;
    /**
     * (Chen) Maximum Brew of the hero.
     * @type {number}
     */
    this.brew = o.brew || 0;
    /**
     * (Fenix) Maximum amount of Shields of the hero.
     * @type {ScalingStat}
     */
    this.shields = new ScalingStat(o.shields);
    /**
     * Collision radius of the hero.
     * @type {number}
     */
    this.radius = o.radius || 0;
    /**
     * Base movement speed of the hero.
     * @type {number}
     */
    this.speed = o.speed || 0;
    /**
     * Basic attack damage of the hero.
     * This property is an array if the hero has multiple attack modes.
     * @type {ScalingStat | ScalingStat[]}
     */
    this.damage = Array.isArray(o.damage)
      ? o.damage.map((s) => new ScalingStat(s))
      : new ScalingStat(o.damage);
    /**
     * Basic attack range of the hero.
     * This property is an array if the hero has multiple attack modes.
     * @type {ScalingStat | ScalingStat[]}
     */
    this.range = Array.isArray(o.range)
      ? o.range.map((s) => new ScalingStat(s))
      : new ScalingStat(o.range);
    /**
     * Basic attack period (time between basic attacks) of the hero
     * This property is an array if the hero has multiple attack modes.
     * @type {ScalingStat | ScalingStat[]}
     */
    this.period = Array.isArray(o.period)
      ? o.period.map((s) => new ScalingStat(s))
      : new ScalingStat(o.period);
  }

  /**
   * Produce a compact, minimal JSON representation that has fixed key order.
   * @return {object} A JSON-compatible representation of this object.
   */
  toJSON() {
    return {
      unitName: this.unitName || undefined,
      hp: this.hp,
      radius: this.radius || undefined,
      speed: this.speed || undefined,
      hpRegen: this.hpRegen,
      mp: this.mp || undefined,
      mpRegen: this.mpRegen || undefined,
      charge: this.charge || undefined,
      chargeRegen: this.chargeRegen || undefined,
      energy: this.energy || undefined,
      energyRegen: this.energyRegen || undefined,
      fury: this.fury || undefined,
      healEnergy: this.healEnergy || undefined,
      zaryaEnergy: this.zaryaEnergy || undefined,
      ammo: this.ammo || undefined,
      brew: this.brew || undefined,
      shields: this.shields || undefined,
      range: this.range || undefined,
      period: this.period || undefined,
      damage: this.damage || undefined,
    };
  }
}
