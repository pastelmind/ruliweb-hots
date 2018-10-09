#!/usr/bin/env node

/**
 * Test script for models
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { unpackHeroes } = require('../src/hots-data');
const Skill = require('../src/skill');
const Talent = require('../src/talent');


describe('Hero', () => {
  let heroJsonCompact;
  /** @type {{ [heroId: string]: import("../src/hero") }} */
  let heroes;

  before('Loading test data files', () => {
    heroJsonCompact = JSON.parse(fs.readFileSync(path.join(__dirname, 'input/heroes.json'), 'utf8'));
  });

  it('should load JSON correctly', () => {
    heroes = unpackHeroes(heroJsonCompact);
  });

  it('should provide an iterator for each skill/talent', () => {
    for (const hero of Object.values(heroes)) {
      const skillCount = hero.skills.length;
      const talentCount = [...hero.allTalents()].length;

      const rawHeroData = heroJsonCompact[hero.id];
      assert.equal(skillCount, rawHeroData.skills.length, hero.id + ': # of parsed skills is different');

      const expectedTalentCount = Object.values(rawHeroData.talents).map(arr => arr.length).reduce((a, b) => a + b);
      assert.equal(talentCount, expectedTalentCount, hero.id + ': # of parsed talents is different');
    }
  });
});