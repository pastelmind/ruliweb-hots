#!/usr/bin/env node
'use strict';

/**
 * Represents a hero's skill in Heroes of the Storm.
 */
module.exports = class Skill {
  /**
   * Create a new Skill object.
   * @param {Object} o
   * @param {string=} o.name
   * @param {string=} o.iconUrl
   * @param {string=} o.type
   * @param {number=} o.level
   * @param {string=} o.description
   * @param {number=} o.cooldown
   * @param {number=} o.rechargeCooldown
   * @param {number=} o.manaCost
   * @param {number=} o.manaCostPerSecond
   * @param {Object<string, string|number>} o.extras
   */
  constructor(o = {}) {
    this.name = o.name || '';
    this.iconUrl = o.iconUrl || '';
    this.type = o.type || '';
    this.level = o.level || 0;
    this.description = o.description || '';
    this.cooldown = o.cooldown || 0;
    this.rechargeCooldown = o.rechargeCooldown || 0;
    this.manaCost = o.manaCost || 0;
    this.manaCostPerSecond = o.manaCostPerSecond || 0;
    this.extras = Object.assign({}, o.extras);
  }

  /**
   * Produce a compact, minimal JSON representation
   */
  toJSON() {
    return {
      name: this.name,
      type: this.type,
      iconUrl: this.iconUrl || undefined,
      level: this.level || undefined,
      description: this.description,
      cooldown: this.cooldown || undefined,
      rechargeCooldown: this.rechargeCooldown || undefined,
      manaCost: this.manaCost || undefined,
      manaCostPerSecond: this.manaCostPerSecond || undefined,
      extras: this.extras
    };
  }
};