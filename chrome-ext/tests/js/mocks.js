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
