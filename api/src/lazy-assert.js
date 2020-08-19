/**
 * @file Lazy assertion functions with message formatting.
 */

import {
  deepStrictEqual as assertDeepStrictEqual,
  fail as assertFail,
  notDeepStrictEqual as assertNotDeepStrictEqual,
  notStrictEqual as assertNotStrictEqual,
  ok as assertOk,
  strictEqual as assertStrictEqual,
  throws as assertThrows,
} from "assert";
import { format, isDeepStrictEqual } from "util";

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Lazy version of `assert.ok()`.
 * @param {*} value
 * @param {string} [message]
 * @param  {...any} param
 * @return {asserts value}
 */
export function ok(value, message, ...param) {
  if (!value) {
    assertOk(value, format(message, ...param));
  }
}

export { ok as assert };

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Lazy version of `assert.strictEqual()`.
 * @template T
 * @param {*} actual
 * @param {T} expected
 * @param {string} [message]
 * @param  {...any} param
 * @return {asserts actual is T}
 */
export function equal(actual, expected, message, ...param) {
  if (!Object.is(actual, expected)) {
    assertStrictEqual(actual, expected, format(message, ...param));
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Lazy version of `assert.notStrictEqual()`.
 * @template T
 * @param {*} actual
 * @param {T} expected
 * @param {string} [message]
 * @param  {...any} param
 * @return {void}
 */
export function notEqual(actual, expected, message, ...param) {
  if (Object.is(actual, expected)) {
    assertNotStrictEqual(actual, expected, format(message, ...param));
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Lazy version of `assert.deepStrictEqual()`.
 * @template T
 * @param {*} actual
 * @param {T} expected
 * @param {string} [message]
 * @param  {...any} param
 * @return {asserts actual is T}
 */
export function deepEqual(actual, expected, message, ...param) {
  if (!isDeepStrictEqual(actual, expected)) {
    // This runs the deep-strict-equality check twice in order to avoid
    // generating a format string when the assertion succeeds.
    // This is fine, since the common case (assertion passes) should be faster.
    assertDeepStrictEqual(actual, expected, format(message, ...param));
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Lazy version of `assert.notDeepStrictEqual()`.
 * @template T
 * @param {*} actual
 * @param {T} expected
 * @param {string} [message]
 * @param  {...any} param
 * @return {void}
 */
export function notDeepEqual(actual, expected, message, ...param) {
  if (isDeepStrictEqual(actual, expected)) {
    // This runs the deep-strict-equality check twice in order to avoid
    // generating a format string when the assertion succeeds.
    // This is fine, since the common case (assertion passes) should be faster.
    assertNotDeepStrictEqual(actual, expected, format(message, ...param));
  }
}

/**
 * Calls `assert.fail()` with the formatted message.
 * This is not actually lazy, but is provided for completeness.
 * @param {string} [message]
 * @param  {...any} param
 * @return {never}
 */
export function fail(message, ...param) {
  // "return" is needed to make ESLint happy
  return assertFail(format(message, ...param));
}

/**
 * Lazy version of `assert.throws()`.
 * @param {Function} block
 * @param {string} [message]
 * @param {...any} param
 */
export function throws(block, message, ...param) {
  try {
    block();
  } catch {
    return;
  }
  assertThrows(() => {}, format(message, ...param));
}

/**
 * Throws an exception. Also acts as type guard for exhaustive type checks.
 * @param {never} value
 * @param {string} [message]
 * @param {...any} param
 */
export function assertNever(value, message, ...param) {
  if (message === undefined) fail("Unexpected value: %o", value);
  fail(message, ...param);
}
