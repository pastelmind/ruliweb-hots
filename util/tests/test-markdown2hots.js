#!/usr/bin/env node

/**
 * Test script for markdown2hots, intended to be called from the command line.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const util = require('util');
const markdown2hots = require('../src/markdown2hots');


describe('markdown2hots', () => {
  const ref = {};

  before('Loading test data files', () => {
    const readFile = util.promisify(fs.readFile);

    return Promise.resolve().then(
      () => readFile('./util/tests/input/heroes.md', 'utf8')
    ).then(
      markdown => ref.heroMarkdown = markdown
    ).then(
      () => readFile('./util/tests/input/heroes-compact.json', 'utf8')
    ).then(
      heroJsonCompactStr => ref.heroJsonCompact = JSON.parse(heroJsonCompactStr)
    ).then(
      () => {
        assert(ref.heroMarkdown);
        assert(ref.heroJsonCompact);
        Object.freeze(ref);
      }
    );
  });

  it('should convert markdown to hero correctly', () => {
    const heroes = markdown2hots.parseHeroMarkdown(ref.heroMarkdown);
    const heroJsonCompact = {};
    for (const heroId in heroes)
      heroJsonCompact[heroId] = heroes[heroId].compact();

    assert.deepStrictEqual(heroJsonCompact, ref.heroJsonCompact);
  });
});