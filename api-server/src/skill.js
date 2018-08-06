#!/usr/bin/env node
'use strict';

/**
 * Represents a hero's skill in Heroes of the Storm.
 */
module.exports = class Skill {
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
    if (this.manaCostPerSecond)
      o.manaCostPerSecond = this.manaCostPerSecond;
    o.extras = this.extras;
    return o;
  }
};