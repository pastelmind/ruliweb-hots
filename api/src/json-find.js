#!/usr/bin/env node

/**
 * Recursively searches through the given JSON object, and returns the first
 * value for which `callback` evaluates to true.
 * JSON equivalent (not really) of Array.prototype.find()
 * @param {*} json
 * @param {function (*, (number|string)): *} callback
 * @param {(number|string)=} key
 * @return {*} Matched object or `undefined`
 */
export function jsonFind(json, callback, key = undefined) {
  if (callback(json, key)) return json;

  let result;
  if (json && typeof json === "object") {
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; ++i) {
        if ((result = jsonFind(json[i], callback, i))) return result;
      }
    } else {
      for (const objKey in json) {
        if ((result = jsonFind(json[objKey], callback, objKey))) return result;
      }
    }
  }

  return undefined;
}
