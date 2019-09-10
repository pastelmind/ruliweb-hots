/**
 * Mocks and stubs for testing HotsDialog in node.js and in the browser.
 */

'use strict';


if (typeof chrome === 'undefined') {
  var chrome = {};

  // For testing in Node.js
  if (typeof module !== 'undefined' && module.exports) global.chrome = chrome;
}

chrome.runtime = chrome.runtime || {};
chrome.runtime.getURL = url => '../src/' + url;
chrome.runtime.getManifest = () => ({ version: 'app version string' });


if (typeof module === 'object' && module.exports) {
  const path = require('path');
  const { promisify } = require('util');
  const readFileAsync = promisify(require('fs').readFile);

  const templateJsonPath = path.join(__dirname, '../../src/templates.json');

  module.exports = {
    /**
     * Retrieves the renderering templates for testing in Node.js.
     * @return {Promise<Object<string, string>>} Object mapping template names
     *    to template strings
     */
    async loadTemplates() {
      const templateFile = await readFileAsync(templateJsonPath, 'utf8');
      return JSON.parse(templateFile);
    },
  };
}
