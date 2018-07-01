#!/usr/bin/env node

/**
 * Test script for namu2hots, intended to be called from the command line.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const namu2hots = require('../src/namu2hots');


describe('namu2hots', () => {
  const ref = {};

  before('Loading test data files', () => {
    ref.namuHeroArticle = fs.readFileSync('./util/tests/input/루시우.txt', 'utf8');
    ref.namuChoGallArticle = fs.readFileSync('./util/tests/input/초갈.txt', 'utf8');
    ref.heroJsonCompact = JSON.parse(
      fs.readFileSync('./util/tests/input/heroes-compact.json', 'utf8'));

    Object.freeze(ref);
  });

  it('should convert namu markup to hero correctly', () => {
    const hero = namu2hots.parseHeroPage(ref.namuHeroArticle);
    hero.iconUrl = 'http://i3.ruliweb.com/img/18/06/14/163fc22d88119dc2c.png';

    assert.deepStrictEqual(hero.compact(), ref.heroJsonCompact.lucio);
    //Hero ID string is not preserved by Hero.compact(), so it must be tested manually
    assert.strictEqual(hero.id, 'lucio');
  });

  it('should convert Cho\'Gall\'s namu markup to heroes correctly', () => {
    const chogall = namu2hots.parseChoGallPage(ref.namuChoGallArticle);
    chogall.cho.iconUrl = 'http://i3.ruliweb.com/img/18/06/14/163fc22380a19dc2c.png';
    chogall.gall.iconUrl = 'http://i2.ruliweb.com/img/18/06/14/163fc22803219dc2c.png';

    assert.deepStrictEqual(chogall.cho.compact(), ref.heroJsonCompact.cho);
    assert.strictEqual(chogall.cho.id, 'cho');
    assert.deepStrictEqual(chogall.gall.compact(), ref.heroJsonCompact.gall);
    assert.strictEqual(chogall.gall.id, 'gall');
  });
});