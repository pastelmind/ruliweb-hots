/** @file Provides a self-contained Dialog class. */

'use strict';

/**
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../api/src/hots-data')} HotsData
 */

(root => {
  /** @type {import('./tingle')} */
  const tingle =
    (typeof require === 'function') ? require('./tingle') : root.tingle;
  /** @type {import('./hots-dialog')} */
  const HotsDialog = (typeof require === 'function') ?
    require('./hots-dialog') : (root.HotsDialog = root.HotsDialog || {});

  /** Represents a Dialog for selecting and pasting HotS Boxes. */
  class Dialog {
    /**
     * Creates a new Dialog instance.
     * @param {Object<string, string>} templates Rendering templates
     * @param {HotsData} data HotS data
     * @param {Object<string, HeroFilter>} heroFilters Mapping of hero filter
     *    IDs to hero filters
     */
    constructor(templates, data, heroFilters) {
      this._paster = new HotsDialog.HtmlPaster;

      this._dialog = new tingle.modal({ // eslint-disable-line new-cap
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

      const renderer = new HotsDialog.Renderer(templates);
      const content = new HotsDialog.DialogContent(
        data, heroFilters, renderer, this._paster
      );
      this._dialog.setContent(content.getFragment());
    }

    /** Opens the dialog. */
    open() {
      this._paster.bind();
      this._dialog.open();
    }
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = Dialog;
  } else {
    // Browser globals
    (root.HotsDialog = root.HotsDialog || {}).Dialog = Dialog;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
