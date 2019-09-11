/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

const HotsDialog = {
  heroFilters: {
    universe: {
      name: '세계관',
      filters: {
        'warcraft': '워크래프트',
        'starcraft': '스타크래프트',
        'diablo': '디아블로',
        'classic': '블리자드 고전',
        'overwatch': '오버워치',
      },
    },
    newRole: {
      name: '역할',
      filters: {
        tank: '전사',
        bruiser: '투사',
        ranged_assassin: '원거리 암살자',
        melee_assassin: '근접 암살자',
        healer: '치유사',
        support: '지원가',
      },
    },
  },

  /**
   * Launch the hero/skill/talent selection dialog
   */
  async launchDialog() {
    // Snapshot currently selected area
    if (this.paster) this.paster.bind();
    else this.paster = new this.HtmlPaster;

    if (!this.dialog) {
      this.dialog = new tingle.modal({
        cssClass: ['hots-dialog-container'],
        onOpen() {
          // Temporarily deactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.deactivate();
          }
        },
        onClose() {
          // Reactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.activate();
          }
        },
      });

      const templates = await HotsDialog.loadTemplates();
      const renderer = new HotsDialog.Renderer(templates);

      const dialogContent = new this.DialogContent(
        this.data, this.heroFilters, renderer, this.paster
      );
      this.dialog.setContent(dialogContent.getFragment());
    }

    this.dialog.open();
  },

  /**
   * Retrieves the renderering templates.
   * @return {Promise<Object<string, string>>} Object mapping template names to
   *    template strings
   * @throws {Error} Template cannot be loaded.
   */
  async loadTemplates() {
    const templateJsonPath = chrome.runtime.getURL('templates.json');
    const response = await fetch(templateJsonPath);
    if (response.ok) return response.json();
    throw new Error(
      `Cannot retrieve ${templateJsonPath}, ` +
      `got ${response.status} ${response.statusText}`
    );
  },

  DialogContent: (typeof require !== 'undefined') ?
    require('./hots-dialog-content') : null,
  HtmlPaster: (typeof require !== 'undefined') ?
    require('./hots-dialog-paster') : null,
  Renderer: (typeof require !== 'undefined') ?
    require('./hots-dialog-renderer') : null,

  /** Collection of utility functions */
  util: (typeof require !== 'undefined') ? require('./hots-dialog-util') : null,
};


/**
 * Load HotS data on first run and launch the Hots dialog.
 * This function is called when the right-click menu is selected.
 */
async function openHotsDialog() {
  if (!HotsDialog.data) {
    // Cache the data for subsequent calls
    HotsDialog.data = await new Promise((resolve, reject) => {
      chrome.storage.local.get(
        ['heroes', 'hotsVersion', 'ptrHeroes', 'hotsPtrVersion'],
        data => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          resolve(data);
        }
      );
    });
  }

  await HotsDialog.launchDialog();
}


if (typeof module !== 'undefined' && module.exports) {
  // For testing in Node.js
  module.exports = exports = HotsDialog;
} else {
  // For binding modules
  (typeof self !== 'undefined' ? self : this).HotsDialog = HotsDialog;
}
