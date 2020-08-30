/**
 * @file Helpers for tests
 * Note: Having custom assertion functions outside the test scripts allows the
 * IDE (VS Code + Mocha Test Explorer in my case) to correctly locate the source
 * of the exception in a test script.
 */

import should from "should";

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Assertion that also acts as a type guard.
 * Asserts that `value !== expected`.
 * @template T, U
 * @param {T} value
 * @param {U} expected
 * @return {asserts value is Exclude<T, U>}
 */
export function shouldNotEqual(value, expected) {
  should(value).not.equal(expected);
}

/**
 * Creates a matcher function that checks whether a string contains the
 * substring `substr`.
 *
 * This is intended for use with Testing Library's query functions, e.g.
 * `getByRole()`.
 *
 * @example const img = getByRole("img", { name: matcher("Foo bar") });
 *
 * @param {string} substr
 * @return {function (string): boolean} A callback that accepts a string, and
 *    checks if the string contains `substr`.
 */
export function matcher(substr) {
  return (text) => text.includes(substr);
}
