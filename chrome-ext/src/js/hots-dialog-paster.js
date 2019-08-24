/**
 * @file Provides a class that pastes HTML into a frame.
 */

'use strict';

(root => {
  const HotsDialog = (typeof require == 'function') ?
    require('./hots-dialog') : root.HotsDialog;

  /** Class that pastes HTML into a frame. */
  class HtmlPaster {
    /**
     * Creates a HtmlPaster bound to the active frame.
     */
    constructor() {
      this._frame = HotsDialog.util.getSelectedChildWindow();
      if (!this._frame) {
        throw new Error('선택된 프레임을 찾을 수 없습니다.');
      }
    }

    /**
     * Pastes raw HTML into the frame bound to this object.
     * This replaces any content currently selected by the user.
     * @param {string} html Raw HTML to paste
     * @return {HTMLElement[]} Array of pasted top-level elements
     */
    paste(html) {
      const range = getSelectedRange(this._frame);
      if (!range.collapsed) range.deleteContents();

      // Add padding to help editing
      html += '&nbsp;';

      // Build DOM nodes from HTML string
      const docFragment = HotsDialog.util.createDocumentFragmentFromHtml(
        this._frame.document, html
      );
      const pastedElements = [...docFragment.children];

      // Paste HTML into page
      range.insertNode(docFragment);

      // Deselect inserted HTML
      this._frame.getSelection()
        .collapse(range.endContainer, range.endOffset);

      return pastedElements;
    }
  }

  /**
   * Retrieves the currently selected range in a frame.
   * @package
   * @param {Window} frame
   * @return {Range}
   */
  function getSelectedRange(frame) {
    const selection = frame.getSelection();
    let range = null;

    if (selection.rangeCount) {
      range = selection.getRangeAt(0);
      // Weird edge case
      if ('HTML' !== range.startContainer.nodeName) return range;
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

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = HtmlPaster;
  } else {
    // Browser globals
    root.HotsDialog.HtmlPaster = HtmlPaster;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
