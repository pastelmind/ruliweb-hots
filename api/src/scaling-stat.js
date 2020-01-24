#!/usr/bin/env node
'use strict';

/**
 * Represents a hero stat which scales with level.
 */
module.exports = class ScalingStat {
  /**
   * Creates a new ScalingStat object.
   * @param {Partial<ScalingStat> | number} o A number or an object that can be
   *    converted to a ScalingStat
   */
  constructor(o) {
    if (typeof o !== 'object') o = {value: o};

    /**
     * Base value of the stat (at level 0).
     * @type {number}
     */
    this.value = +o.value || 0;
    /**
     * Amount of stat added per each level.
     * @type {number}
     */
    this.levelAdd = +o.levelAdd || 0;
    /**
     * Bonus multiplier applied to base value per each level.
     * @type {number}
     */
    this.levelScaling = +o.levelScaling || 0;
    /**
     * Name of the alternate hero aspect that uses this stat.
     * @type {string}
     */
    this.altName = '' + (o.altName || '');
  }

  /**
   * Produce a compact, minimal JSON representation that has fixed key order.
   * @return {object} A JSON-compatible representation of this object.
   */
  toJSON() {
    if (this.levelAdd || this.levelScaling || this.altName) {
      return {
        value: this.value || 0,
        levelAdd: this.levelAdd || undefined,
        levelScaling: this.levelScaling || undefined,
        altName: this.altName || undefined,
      };
    } else return this.value || undefined;
  }

  /**
   * If `o.value` is truthy, return a new ScalingStat object created from `o`.
   * Otherwise, return `null`.
   * @param {Object} o Value to convert into a new ScalingStat object
   * @param {number} o.value Base value. Must be truthy.
   * @return {ScalingStat | null} ScalingStat object or `null`
   */
  static create(o) {
    return o && o.value ? new ScalingStat(o) : null;
  }
};
