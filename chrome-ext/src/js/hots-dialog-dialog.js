/** @file Provides a self-contained Dialog class. */

/* global tingle */

import { DialogContent } from "./components/dialog-content.js";
import { HtmlPaster } from "./hots-dialog-paster.js";
import { Renderer } from "./hots-dialog-renderer.js";
import { getSelectedChildWindow } from "./hots-dialog-util.js";
import htm from "./vendor/htm.js";
import { createElement, render } from "./vendor/preact.js";

/**
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../api/src/hots-data').HotsData} HotsData
 */

const html = htm.bind(createElement);

/** Represents a Dialog for selecting and pasting HotS Boxes. */
export class Dialog {
  /**
   * Creates a new Dialog instance.
   * @param {Object<string, string>} templates Rendering templates
   * @param {HotsData} data HotS data
   * @param {Object<string, HeroFilter>} heroFilters Mapping of hero filter
   *    IDs to hero filters
   */
  constructor(templates, data, heroFilters) {
    this._paster = new HtmlPaster();

    // eslint-disable-next-line new-cap
    this._dialog = new tingle.modal({
      cssClass: ["hots-dialog-container"],
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
    const contentFragment = document.createDocumentFragment();
    render(
      html`
        <${DialogContent}
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
