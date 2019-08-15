#!/usr/bin/env node
'use strict';


/**
 * Recursively searches through the given JSON object, and returns the first
 * value for which `callback` evaluates to true.
 * JSON equivalent (not really) of Array.prototype.find()
 * @param {*} json
 * @param {(value: *, key: number|string) => *} callback
 * @return {*} Matched object or `undefined`
 */
module.exports = function jsonFind(json, callback, key = undefined) {
  if (callback(json, key)) return json;

  let result;
  if (json && typeof json === 'object') {
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; ++i) {
        if (result = jsonFind(json[i], callback, i)) return result;
      }
    } else {
      for (const objKey in json) {
        if (result = jsonFind(json[objKey], callback, objKey)) return result;
      }
    }
  }

  return undefined;
};
