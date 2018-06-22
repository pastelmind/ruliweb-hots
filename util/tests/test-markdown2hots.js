#!/usr/bin/env node

/**
 * Test script for markdown2hots, intended to be called from the command line.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const markdown2hots = require('../src/markdown2hots');
const { Hero } = require('../src/models');


describe('markdown2hots', () => {
  const ref = {};

  before('Loading test data files', () => {
    ref.heroMarkdown = fs.readFileSync('./util/tests/input/heroes.md', 'utf8');
    ref.heroJsonCompact = JSON.parse(
      fs.readFileSync('./util/tests/input/heroes-compact.json', 'utf8'));
      
    Object.freeze(ref);
  });

  it('should convert markdown to hero correctly', () => {
    const heroes = markdown2hots.parseHeroMarkdown(ref.heroMarkdown);
    const heroJsonCompact = {};
    for (const heroId in heroes)
      heroJsonCompact[heroId] = heroes[heroId].compact();

    assert.deepStrictEqual(heroJsonCompact, ref.heroJsonCompact);
  });
  
  it('should convert hero to markdown correctly', () => {
    let markdown = '';
    for (const heroId in ref.heroJsonCompact) {
      const hero = new Hero(ref.heroJsonCompact[heroId]);
      hero.id = heroId;
      markdown += markdown2hots.heroToMarkdown(hero);
    }

    assert.deepStrictEqual(markdown, ref.heroMarkdown);
  });
});