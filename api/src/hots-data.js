#!/usr/bin/env node
'use strict';

const Hero = require('./hero');


/**
 * Helper class for loading from and saving to `hots.json`.
 */
module.exports = class HotsData {
  /**
   * Parse data from `hots.json`
   * @param {Object|string} hotsData Contents of `hots.json` (JSON string or
   *    parsed object)
   */
  constructor(hotsData) {
    if (typeof hotsData === 'string') hotsData = JSON.parse(hotsData);

    /** @type {string} */
    this.hotsVersion = hotsData.hotsVersion;
    /** @type {string} */
    this.hotsPtrVersion = hotsData.hotsPtrVersion || undefined;
    this.heroes = HotsData.unpackHeroes(hotsData.heroes);
    this.ptrHeroes = HotsData.unpackHeroes(hotsData.ptrHeroes);
    /** @type {{ [iconId: string]: string }} */
    this.iconUrls = Object.assign({}, hotsData.iconUrls);
  }

  /**
   * Produce a compact, minimal JSON representation
   * @return {object} A JSON-compatible representation of this object.
   */
  toJSON() {
    const o = {
      hotsVersion: this.hotsVersion,
      // Omit PTR version if it is falsy
      hotsPtrVersion: this.hotsPtrVersion || undefined,
      heroes: HotsData.packHeroes(this.heroes),
      ptrHeroes: HotsData.packHeroes(this.ptrHeroes),
      iconUrls: {},
    };

    // Sort icon URLs by key (icon ID)
    for (const icon of Object.keys(this.iconUrls).sort()) {
      o.iconUrls[icon] = this.iconUrls[icon];
    }

    return o;
  }

  /**
   * Alias for `JSON.stringify(this, null, 2)`
   * @return {string}
   */
  stringify() {
    return JSON.stringify(this, null, 2);
  }

  /**
   * Returns an array of all heroes in `this.heroes` and `this.ptrHeroes`.
   * @return {Hero[]} Array of all heroes.
   */
  allHeroes() {
    return [...Object.values(this.heroes), ...Object.values(this.ptrHeroes)];
  }

  /**
   * Unpack a collection of Hero objects from `source`.
   * If `source` does not contain any hero data, returns an empty object.
   * @param {Object<string, *>} source Mapping of hero ID => (packed/unpacked)
   *    hero object
   * @return {Object<string, Hero>} Mapping of hero ID => Hero object
   */
  static unpackHeroes(source) {
    const dest = {};
    for (const heroId in source) {
      const hero = dest[heroId] = new Hero(source[heroId]);
      hero.id = heroId;
    }
    return dest;
  }

  /**
   * Pack a collection of Hero objects into a JSON representation.
   * If `heroes` is empty, returns `undefined`.
   * @param {Object<string, Hero>} heroes Mapping of hero ID => Hero object
   * @return {Object<string, *>} Mapping of hero ID => packed Hero object
   */
  static packHeroes(heroes) {
    // Sort hero by ID in ascending order
    const heroIds = Object.keys(heroes).sort();

    // Collection is empty
    if (!heroIds.length) return undefined;

    const packedHeroes = {};

    for (const heroId of heroIds) {
      const heroJson = packedHeroes[heroId] = heroes[heroId].toJSON();

      // hero.id is unnecessary; hero ID can be retrieved from keys of hero
      // collection
      delete heroJson.id;

      // talent.level is unnecessary; talent level can be retrieved from keys of
      // hero.talents
      for (const talentLevel in heroJson.talents) {
        for (const talent of heroJson.talents[talentLevel]) {
          delete talent.level;
        }
      }
    }

    return packedHeroes;
  }
};
