'use strict';

let theTags = [];

module.exports = {
  /**
   * Pushes one or more tags onto the logging tag stack. Subsequent log messages
   * are prepended with all tags on the stack.
   * @param {...string} tags Tags to push
   */
  pushTag(...tags) {
    theTags.push(...tags);
  },

  /**
   * Pop the topmost tag from the logging tag stack.
   * @return {string?} The popped tag, or `undefined` if the stack was empty.
   */
  popTag() {
    return theTags.pop();
  },

  /**
   * Empties the logging tag stack.
   * @return {string[]} Array of all tags removed.
   */
  popAllTags() {
    const oldTags = theTags;
    theTags = [];
    return oldTags;
  },

  /**
   * Wrapper for `console.warn()` that prepends the message with all tags on the
   * tag stack.
   * @param {string} message The primary message
   * @param {...any} args Additional arguments
   */
  warn(message, ...args) {
    if (theTags.length) message = `[${theTags.join('][')}] ${message}`;
    console.warn(message, ...args);
  },
};
