#!/usr/bin/env node
'use strict';

/**
 * Represents a multilingual string that can be either Korean or English.
 */
module.exports = class KoEnString {
  /**
   * Create a new KoEnString object.
   * @param {string | Partial<KoEnString>} o
   */
  constructor(o = '') {
    if (o && typeof o === 'object' && ('en' in o || 'ko' in o)) {
      /** @type {string} */
      this.en = o.en || '';
      /** @type {string} */
      this.ko = o.ko || '';
    } else {
      o += '';
      const [, koMatch, enMatch = ''] = /^(.*?)(?:\(([^)]*)\))?\s*$/.exec(o);
      this.en = enMatch.trim();
      this.ko = koMatch.trim();
    }
  }

  /**
   * Return the value matching the given localization, or the full string.
   * @param {string=} lang If `"en"` or `"ko"`, returns the English or Korean
   *    string. Otherwise, returns "KoString (EnString)".
   * @return {string}
   */
  toString(lang) {
    if (lang === 'en') return this.en;
    if (lang === 'ko') return this.ko;
    return `${this.ko} (${this.en})`;
  }

  /**
   * Tests if `str` is equal to this value.
   * @param {KoEnString | string} str String to compare
   * @return {boolean}
   */
  equals(str) {
    if (!(str instanceof KoEnString)) str = new KoEnString(str);
    return this.ko === str.ko && this.en === str.en;
  }
};
