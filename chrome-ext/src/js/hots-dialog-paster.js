/**
 * @file Provides a class that pastes HTML into a frame.
 */

import {
  createDocumentFragmentFromHtml,
  getSelectedChildWindow,
} from "./hots-dialog-util.js";

/** Class that pastes HTML into a frame. */
export class HtmlPaster {
  /**
   * Creates a HtmlPaster bound to the active frame.
   */
  constructor() {
    this.bind();
  }

  /**
   * Attempt to bind to the currently active frame.
   */
  bind() {
    this._frame = getSelectedChildWindow();
    if (!this._frame) {
      console.error("선택된 프레임을 찾을 수 없습니다.");
    }
  }

  /**
   * Pastes raw HTML into the frame bound to this object.
   * This replaces any content currently selected by the user.
   * @param {string} html Raw HTML to paste
   * @return {Element[]} Array of pasted top-level elements
   * @throws {Error} If the HTML cannot be pasted for whatever reason
   */
  paste(html) {
    if (!this._frame) {
      throw new Error("HTML paste failed: No bound frame window");
    }

    const range = getSelectedRange(this._frame);
    if (!range.collapsed) range.deleteContents();

    // Add padding to help editing
    html += "&nbsp;";

    // Build DOM nodes from HTML string
    const docFragment = createDocumentFragmentFromHtml(
      this._frame.document,
      html
    );
    const pastedElements = [...docFragment.children];

    // Paste HTML into page
    range.insertNode(docFragment);

    // Deselect inserted HTML
    getSelectionOf(this._frame).collapse(range.endContainer, range.endOffset);

    return pastedElements;
  }
}

/**
 * Retrieves the currently selected range in a frame.
 * @package
 * @param {Window} frame
 * @return {Range}
 * @throws {Error} If the selection cannot be obtained
 */
function getSelectedRange(frame) {
  const selection = getSelectionOf(frame);
  let range = null;

  if (selection.rangeCount) {
    range = selection.getRangeAt(0);
    // Weird edge case
    if ("HTML" !== range.startContainer.nodeName) return range;
  }

  const document = frame.document;

  if (!range) {
    range = document.createRange();
    selection.addRange(range);
  }

  range.setStart(document.body, document.body.childNodes.length);
  range.setEnd(document.body, document.body.childNodes.length);
  return range;
}

/**
 * Retrieves the selection object in a frame.
 * @package
 * @param {Window} frame
 * @return {Selection}
 * @throws {Error} If the selection cannot be obtained
 */
function getSelectionOf(frame) {
  // According to MDN, getSelection() can _potentially_ return null in Firefox
  const selection = frame.getSelection();
  if (!selection) {
    throw new Error("HTML paste failed: Cannot retrieve selection in frame");
  }
  return selection;
}
