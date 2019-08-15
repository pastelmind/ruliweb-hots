#!/usr/bin/env node

/**
 * Prevents `console.assert()` from throwing in Node.js version < 10.0
 * TODO Remove this module when upgraded to Node v10
 */

'use strict';


if (parseInt(process.version.match(/\d+/)[0]) < 10) {
  const { AssertionError } = require('assert');

  const oldAssert = console.assert;
  console.assert = (value, message, ...args) => {
    try {
      oldAssert(value, message, ...args);
    } catch (e) {
      if (e instanceof AssertionError) console.error(e.stack);
      else throw e;
    }
  };
}
