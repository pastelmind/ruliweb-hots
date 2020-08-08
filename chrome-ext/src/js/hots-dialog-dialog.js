/** @file Provides a self-contained Dialog class. */
// eslint-disable-next-line spaced-comment
/// <reference path="./vendor/tingle-global.d.ts" />

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

/**
 * @typedef {import("./hots-dialog.js").HeroFilterPresets} HeroFilterPresets
 */

/** Represents a Dialog for selecting and pasting HotS Boxes. */
export class Dialog {
  /**
   * Creates a new Dialog instance.
   * @param {Object<string, string>} templates Rendering templates
   * @param {HotsData} data HotS data
   * @param {HeroFilterPresets} heroFilters Mapping of hero filter IDs to hero
   *    filters
   */
  constructor(templates, data, heroFilters) {
    this._paster = new HtmlPaster();

    // eslint-disable-next-line new-cap
    this._dialog = new tingle.modal({
      cssClass: ["hots-dialog-container"],
      onOpen() {
        // Temporarily deactivate PToDivReplacer in editor-iframe.js
        const frameWindow = getSelectedChildWindow();
        if (frameWindow && hasPToDivReplacer(frameWindow)) {
          frameWindow.pToDivReplacer.deactivate();
        }
      },
      onClose() {
        // Reactivate PToDivReplacer in editor-iframe.js
        const frameWindow = getSelectedChildWindow();
        if (frameWindow && hasPToDivReplacer(frameWindow)) {
          frameWindow.pToDivReplacer.activate();
        }
      },
    });

    const renderer = new Renderer(templates);
    const paster = this._paster;
    const contentFragment = document.createDocumentFragment();

    /** @type {preact.ComponentProps<typeof DialogContent>} */
    const dialogContentProps = { data, heroFilters, renderer, paster };
    render(
      html`<${DialogContent} ...${dialogContentProps} />`,
      contentFragment
    );
    // TODO: Remove this when @types/tingle.js is updated
    // @ts-expect-error Parameter type of setContent() is too narrow
    this._dialog.setContent(contentFragment);
  }

  /** Opens the dialog. */
  open() {
    this._paster.bind();
    this._dialog.open();
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @param {Window} frame
 * @return {frame is Window & { pToDivReplacer: typeof pToDivReplacer }}
 */
function hasPToDivReplacer(frame) {
  return "pToDivReplacer" in frame;
}
