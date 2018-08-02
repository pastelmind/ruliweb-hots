/**
 * Mocks and stubs for testing HotsDialog in node.js and in the browser.
 */

'use strict';


//For testing in Node.js
if (typeof module !== 'undefined' && module.exports)
  var chrome = global.chrome = {};


if (typeof chrome !== undefined) {
  chrome.runtime = chrome.runtime || {};
  chrome.runtime.getURL = url => '../src/' + url;
  chrome.runtime.getManifest = () => ({ version: "app version string" });
}


/**
 * For use in browser tests. Requires `axios.js`.
 * Loads all template files (`templates/*.mustache`).
 * @return {Promise<Object<string, string>>} Mapping of template name => template string
 */
async function loadTemplates() {
  const templates = {};
  const templateNames = Object.freeze([
    'dialog-skills',
    'dialog-talents',
    'dialog',
    'insert-hero',
    'insert-hero-skill',
    'insert-skill-stats',
    'insert-skill',
    'insert-talent',
  ]);

  await Promise.all(
    templateNames.map(
      templateName => (async () => {
        const response = await axios.get(`../templates/${templateName}.mustache`, { responseType: 'text' });
        templates[templateName] = response.data;
      })()
    )
  );

  return templates;
}