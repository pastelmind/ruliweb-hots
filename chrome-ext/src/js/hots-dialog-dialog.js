/** @file Provides a self-contained Dialog class. */

'use strict';

/**
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../api/src/hots-data')} HotsData
 */

(root => {
  const isNodeJs = typeof require === 'function';
  /** @type {import('./tingle')} */
  const tingle =
    (typeof require === 'function') ? require('./tingle') : root.tingle;
  const htm = isNodeJs ? require('htm') : root.htm;
  /** @type {import('preact')} */
  const preact = isNodeJs ? require('preact') : root.preact;
  /** @type {import('./hots-dialog')} */
  /** @type {import('./hots-dialog')} */
  const HotsDialog = isNodeJs ?
    require('./hots-dialog') : (root.HotsDialog = root.HotsDialog || {});

  const html = htm.bind(preact.createElement);

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
      const contentFragment = document.createDocumentFragment();
      preact.render(
        html`
          <${HotsDialog.components.DialogContent}
            data=${data}
            heroFilters=${heroFilters}
            renderer=${renderer}
            paster=${this._paster}
            />
        `,
        contentFragment
      );
      this._dialog.setContent(contentFragment);
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
