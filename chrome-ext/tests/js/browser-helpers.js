/**
 * @file Helpers for browser-side tests
 */

/**
 * Creates a fake function that reports all of its arguments to the console.
 * @param {string} name Name of the stubbed callback
 * @return {function(...unknown): void}
 */
export function makeFake(name) {
  return (...args) => {
    console.log(`${name}() called with arguments: %o`, args);
  };
}
