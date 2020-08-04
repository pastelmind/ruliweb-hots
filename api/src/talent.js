#!/usr/bin/env node
import { Skill } from "./skill.js";

/**
 * Represents a hero's talent in Heroes of the Storm.
 */
export class Talent extends Skill {
  /**
   * Create a new Talent object.
   * @param {Partial<Talent>} o
   */
  constructor(o = {}) {
    super(o);

    /** @type {string} */
    this.upgradeFor = o.upgradeFor || "";
  }

  /**
   * Produce a compact, minimal JSON representation
   * @return {object} A JSON-compatible representation of this object.
   */
  toJSON(...args) {
    return Object.assign(super.toJSON(...args), {
      upgradeFor: this.upgradeFor || undefined,
    });
  }
}
