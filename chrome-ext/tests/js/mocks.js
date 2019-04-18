/**
 * Mocks and stubs for testing HotsDialog in node.js and in the browser.
 */

'use strict';


if (typeof chrome === 'undefined') {
  var chrome = {};

  //For testing in Node.js
  if (typeof module !== 'undefined' && module.exports)
    global.chrome = chrome;
}

chrome.runtime = chrome.runtime || {};
chrome.runtime.getURL = url => '../src/' + url;
chrome.runtime.getManifest = () => ({ version: "app version string" });


/**
 * For use in browser tests.
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
    'insert-skill-stats',
    'insert-skill',
  ]);

  await Promise.all(
    templateNames.map(
      templateName => (async () => {
        const templatePath = `../templates/${templateName}.mustache`
        const response = await fetch(templatePath);
        if (!response.ok)
          throw new Error(`Cannot retrieve ${templatePath}: ${response.status} ${response.statusText}`);
        templates[templateName] = await response.text();
      })()
    )
  );

  return templates;
}