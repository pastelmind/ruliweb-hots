/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

import { Dialog } from "./hots-dialog-dialog.js";

/**
 * Retrieves the renderering templates.
 * @return {Promise<Object<string, string>>} Object mapping template names
 *    to template strings
 * @throws {Error} Template cannot be loaded.
 */
async function loadTemplates() {
  const templateJsonPath = chrome.runtime.getURL("templates.json");
  const response = await fetch(templateJsonPath);
  if (response.ok) return response.json();
  throw new Error(
    `Cannot retrieve ${templateJsonPath}, ` +
      `got ${response.status} ${response.statusText}`
  );
}

export const HotsDialog = {
  loadTemplates,
  /** @type {Dialog | null} */
  dialog: null,

  /**
   * Launch the hero/skill/talent selection dialog.
   */
  async launchDialog() {
    if (!this.dialog) {
      const templates = await this.loadTemplates();
      const data = await new Promise((resolve, reject) => {
        chrome.storage.local.get(
          ["heroes", "hotsVersion", "ptrHeroes", "hotsPtrVersion"],
          (data) => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            resolve(data);
          }
        );
      });

      this.dialog = new Dialog(templates, data);
    }

    this.dialog.open();
  },
};
