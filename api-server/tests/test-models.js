#!/usr/bin/env node

/**
 * Test script for models
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const util = require('util');
const Hero = require('../src/hero');
const Skill = require('../src/skill');
const Talent = require('../src/talent');


describe('Hero', () => {
  let heroJsonCompact;
  let heroes;

  before('Loading test data files', () => {
    heroJsonCompact = JSON.parse(fs.readFileSync(path.join(__dirname, 'input/heroes.json'), 'utf8'));
  });

  it('should load JSON correctly', () => {
    heroes = {};
    for (const heroId in heroJsonCompact)
      heroes[heroId] = new Hero(heroJsonCompact[heroId]);
  });

  it('should provide an iterator for each skill/talent', () => {
    for (const heroId in heroes) {
      let skillCount = 0, talentCount = 0;

      for (const skillOrTalent of heroes[heroId]) {
        if (skillOrTalent instanceof Talent)  //Check this first, since Talent inherits from Skill
          ++talentCount;
        else if (skillOrTalent instanceof Skill)
          ++skillCount;
        else
          assert.fail('Unexpected value returned: ' + util.inspect(skillOrTalent, { colors: true }));
      }

      const rawHeroData = heroJsonCompact[heroId];
      assert.equal(skillCount, rawHeroData.skills.length, heroId + ': # of parsed skills is different');

      let expectedTalentCount = 0;
      for (const talentLevel in rawHeroData.talents)
        expectedTalentCount += rawHeroData.talents[talentLevel].length;

      assert.equal(talentCount, expectedTalentCount, heroId + ': # of parsed talents is different');
    }
  });
});