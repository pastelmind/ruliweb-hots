#!/usr/bin/env node

/**
 * Test script for namu2hots, intended to be called from the command line.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const util = require('util');
const namu2hots = require('../src/namu2hots');


describe('namu2hots', () => {
  const ref = {};

  before('Loading test data files', () => {
    const readFile = util.promisify(fs.readFile);

    return Promise.resolve().then(
      () => readFile('./util/tests/input/malthael-namu.txt', 'utf8')
    ).then(
      namuMarkup => ref.namuHeroArticle = namuMarkup
    ).then(
      () => readFile('./util/tests/input/malthael-compact.json', 'utf8')
    ).then(
      heroJsonCompactStr => ref.heroJsonCompact = JSON.parse(heroJsonCompactStr)
    ).then(
      () => {
        assert(ref.namuHeroArticle);
        assert(ref.heroJsonCompact);
        Object.freeze(ref);
      }
    );
  });

  it('should convert namu markup to hero correctly', () => {
    const hero = namu2hots.parseHeroPage(ref.namuHeroArticle);
    hero.name = '말티엘';
    hero.id = 'malthael';
    hero.iconUrl = 'http://i1.ruliweb.com/img/18/06/14/163fc22db7e19dc2c.png';

    assert.deepStrictEqual(hero.compact(), ref.heroJsonCompact);
  });
});