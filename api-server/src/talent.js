#!/usr/bin/env node
'use strict';

const Skill = require('./skill');

/**
 * Represents a hero's talent in Heroes of the Storm.
 */
module.exports = class Talent extends Skill {
  /**
   * Produce a compact, minimal JSON
   */
  compact() {
    const o = super.compact();
    // Talent level information is assumed to be present in the Hero class.
    delete o.level;
    return o;
  }
};