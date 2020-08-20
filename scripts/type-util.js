/**
 * @file Provides typedefs and utility methods for writing type-safe JavaScript
 * code.
 */

/**
 * Extract all _known_ keys of `T` as a union
 * Source: https://github.com/microsoft/TypeScript/issues/25987#issuecomment-441224690
 * @template T
 * @typedef {
    { [K in keyof T]: string extends K
      ? never : number extends K
      ? never : K
    } extends {[_ in keyof T]: infer U}
    ? ({} extends U
      ? never : U) : never
  } KnownKeys
*/

/**
 * Helper function that coerces string/number literals to literal types.
 * @template {string | number} T
 * @param {T} v
 * @return {T}
 */
export function _c(v) {
  return v;
}

/**
 * Helper function for creating tuple literal types.
 * @template {any[]} T
 * @param {T} values
 * @return {T}
 */
export function _t(...values) {
  return values;
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Type assertion: `key` is a key type of `U`.
 * @template {string | number | symbol} T
 * @template U
 * @param {T} key
 * @param {U} obj
 * @return {key is T & keyof U}
 */
export function isKeyOf(key, obj) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Returns `Object.entries(o)` coerced to an array of tuples of
 * `[KeyType, ValueType]`.
 * @template {string} KeyType
 * @template ValueType
 * @param {Record<KeyType, ValueType>} o
 * @return {[KeyType, ValueType][]}
 */
export function objectEntries(o) {
  return /** @type {[KeyType, ValueType][]} */ (Object.entries(o));
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Type assertion: `o` is either `null` nor `undefined`.
 * @template T
 * @param {T | null | undefined} o
 * @return {o is null | undefined}
 */
export function isNullish(o) {
  return o == null;
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Type assertion: `o` is neither `null` nor `undefined`.
 * @template T
 * @param {T | null | undefined} o
 * @return {o is T}
 */
export function isNotNullish(o) {
  return o != null;
}
