/** @file Provides a self-contained Dialog class. */

'use strict';

/**
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../api/src/hots-data')} HotsData
 */

(root => {
  /** @type {import('./hots-dialog-content')} */
  let DialogContent;
  /** @type {import('./hots-dialog-paster')} */
  let HtmlPaster;
  /** @type {import('./hots-dialog-renderer')} */
  let Renderer;
  /** @type {import('./tingle')} */
  let tingle;
  /** @type {import('./hots-dialog-util')} */
  let util;
  if (typeof require === 'function') {
    DialogContent = require('./hots-dialog-content');
    HtmlPaster = require('./hots-dialog-paster');
    Renderer = require('./hots-dialog-renderer');
    tingle = require('./tingle');
    util = require('./hots-dialog-util');
  } else {
    tingle = root.tingle;
    ({ DialogContent, HtmlPaster, Renderer, util } = root.HotsDialog);
  }

  const {
    getSelectedChildWindow,
  } = util;

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
      this._paster = new HtmlPaster;

      this._dialog = new tingle.modal({ // eslint-disable-line new-cap
        cssClass: ['hots-dialog-container'],
        onOpen() {
          // Temporarily deactivate PToDivReplacer in editor-iframe.js
          const frameWindow = getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.deactivate();
          }
        },
        onClose() {
          // Reactivate PToDivReplacer in editor-iframe.js
          const frameWindow = getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.activate();
          }
        },
      });

      const renderer = new Renderer(templates);
      const content = new DialogContent(
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
