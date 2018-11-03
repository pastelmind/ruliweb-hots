#!/usr/bin/env node
'use strict';

const Skill = require('./skill');

/**
 * Represents a hero's talent in Heroes of the Storm.
 */
module.exports = class Talent extends Skill {
  /**
   * Create a new Talent object.
   * @param {Talent} o
   */
  constructor(o = {}) {
    super(o);

    /** @type {string} */
    this.upgradeFor = o.upgradeFor || '';
  }

  /**
   * Produce a compact, minimal JSON representation
   */
  toJSON(...args) {
    return Object.assign(super.toJSON(...args), {
      upgradeFor: this.upgradeFor || undefined
    });
  }
};