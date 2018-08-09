#!/usr/bin/env node
'use strict';

const Hero = require('./hero');


/**
 * Helper class for loading from and saving to `hots.json`.
 */
module.exports = class HotsData {
  /**
   * Parse data from `hots.json`
   * @param {Object|string} hotsData Contents of `hots.json` (JSON string or parsed object)
   */
  constructor(hotsData) {
    if (typeof hotsData === 'string')
      hotsData = JSON.parse(hotsData);

    /** @type {string} */
    this.hotsVersion = hotsData.hotsVersion;
    /** @type {string} */
    this.hotsPtrVersion = hotsData.hotsPtrVersion;
    this.statPresets = hotsData.statPresets;
    this.heroes = HotsData.unpackHeroes(hotsData.heroes);
    this.ptrHeroes = HotsData.unpackHeroes(hotsData.ptrHeroes);
  }

  /**
   * Produce a compact, minimal JSON representation
   */
  toJSON() {
    return {
      hotsVersion: this.hotsVersion,
      hotsPtrVersion: this.hotsPtrVersion,
      statPresets: this.statPresets,
      heroes: packHeroes(this.heroes),
      ptrHeroes: packHeroes(this.ptrHeroes)
    };

    /**
     * (Helper function) Pack a collection of Hero objects.
     * @param {Object<string, Hero>} heroes Mapping of hero ID => Hero object
     * @return {Object<string, *>} Mapping of hero ID => packed Hero object
     */
    function packHeroes(heroes) {
      /** @type {Hero[]} */
      const heroesArray = Object.values(heroes);

      if (!heroesArray.length)
        return undefined;

      //Sort by hero name in ascending order
      heroesArray.sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, 'en'));

      const packedHeroes = {};

      for (const hero of heroesArray) {
        const heroJson = packedHeroes[hero.id] = hero.toJSON();

        //hero.id is unnecessary; hero ID can be retrieved from keys of hero collection
        delete heroJson.id;

        //talent.level is unnecessary; talent level can be retrieved from keys of hero.talents
        for (const talentLevel in heroJson.talents)
          for (const talent of heroJson.talents[talentLevel])
            delete talent.level;
      }

      return packedHeroes;
    }
  }

  /**
   * Alias for `JSON.stringify(this, null, 2)`
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
   * Unpack a collection of Hero objects
   * @param {Object<string, *>} source Mapping of hero ID => (packed/unpacked) hero object
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
};