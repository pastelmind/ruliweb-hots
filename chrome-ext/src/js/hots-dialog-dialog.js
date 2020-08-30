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

const html = htm.bind(createElement);

/**
 * @typedef {import("./decorate-hots-data.js").DecoratedHotsData} DecoratedHotsData
 */

/** Represents a Dialog for selecting and pasting HotS Boxes. */
export class Dialog {
  /**
   * Creates a new Dialog instance.
   * @param {Object<string, string>} templates Rendering templates
   * @param {DecoratedHotsData} data
   */
  constructor(templates, data) {
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
    const dialogContentProps = { data, renderer, paster };
    render(
      html`<${DialogContent} ...${dialogContentProps} />`,
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

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @param {Window} frame
 * @return {frame is Window & { pToDivReplacer: typeof pToDivReplacer }}
 */
function hasPToDivReplacer(frame) {
  return "pToDivReplacer" in frame;
}
