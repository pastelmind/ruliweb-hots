#!/usr/bin/env node
'use strict';

const Skill = require('./skill');

/**
 * Represents a hero's talent in Heroes of the Storm.
 */
module.exports = class Talent extends Skill {};