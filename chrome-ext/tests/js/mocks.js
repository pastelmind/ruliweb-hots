/**
 * Mocks and stubs for testing HotsDialog in node.js and in the browser.
 */

let mockChrome;
if (typeof chrome === "undefined") {
  // Since the environment does not have 'chrome', create a new object
  globalThis.chrome = mockChrome = /** @type {chrome} */ ({});
} else {
  // Assign the existing chrome object to our variable, so we can patch it
  mockChrome = globalThis.chrome;
}

mockChrome.runtime = mockChrome.runtime || {};
mockChrome.runtime.getURL = (/** @type {string} */ url) => "../src/" + url;
mockChrome.runtime.getManifest = () =>
  /** @type {chrome.runtime.Manifest} */ ({ version: "app version string" });

// Imports from Node.js; not used in browser contexts

/** @type {import('fs')['readFile']['__promisify__']} */
let readFileAsync;
/** @type {string} */
let templateJsonPath;

// Execute this only in non-browser contexts (i.e. Node.js)
if (typeof window === "undefined") {
  (async () => {
    try {
      const { readFile } = await import("fs");
      const path = await import("path");
      const { fileURLToPath } = await import("url");
      const { promisify } = await import("util");

      readFileAsync = promisify(readFile);

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      templateJsonPath = path.join(__dirname, "../../src/templates.json");
    } catch (e) {
      console.error("Failed to import Node.js native modules.");
      console.error(e);
    }
  })();
}

/**
 * Retrieves the renderering templates for testing in Node.js.
 * This does NOT work in browser contexts!
 * @return {Promise<Object<string, string>>} Object mapping template names
 *    to template strings
 */
export async function loadTemplates() {
  const templateFile = await readFileAsync(templateJsonPath, "utf8");
  return JSON.parse(templateFile);
}
