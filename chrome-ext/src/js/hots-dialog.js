/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

/**
 * A callback that injects the given HTML string into a desired position.
 * @callback HtmlStringInjector
 * @param {string} html HTML string to inject
 * @return {Element[]} Elements injected by the callback
 */

/**
 * Collection of HotS data loaded from hots.json
 * @typedef {import("../../../api/src/hots-data")} HotsData
 */

/**
 * @typedef {import("../../../api/src/hero")} Hero
 */


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
  launchDialog() {
    // Snapshot currently selected area
    this.paster = new this.HtmlPaster;

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

      this.dialog.setContent(
        this.buildDialogContent(this.data, this.heroFilters)
      );
    }

    this.dialog.open();
  },

  buildDialogContent: (typeof require !== 'undefined') ?
    require('./hots-dialog-builder') : null,
  HtmlPaster: (typeof require !== 'undefined') ?
    require('./hots-dialog-paster') : null,

  /**
   * Collection of methods that generate HTML source strings.
   * See hots-dialog-renderers.js
   */
  renderers: (typeof require !== 'undefined') ?
    require('./hots-dialog-renderers') : null,

  /** Collection of utility functions */
  util: (typeof require !== 'undefined') ? require('./hots-dialog-util') : null,
};


/**
 * Load HotS data on first run and launch the Hots dialog.
 * This function is called when the right-click menu is selected.
 */
function openHotsDialog() {
  if (!HotsDialog.data) {
    chrome.storage.local.get(
      ['heroes', 'hotsVersion', 'ptrHeroes', 'hotsPtrVersion'],
      data => {
        if (chrome.runtime.lastError) throw chrome.runtime.lastError;

        HotsDialog.data = data; // Cache the data for subsequent calls
        openHotsDialog();
      }
    );
  } else {
    HotsDialog.launchDialog();
  }
}


if (typeof module !== 'undefined' && module.exports) {
  // For testing in Node.js
  module.exports = exports = HotsDialog;
} else {
  // For binding modules
  (typeof self !== 'undefined' ? self : this).HotsDialog = HotsDialog;
}
