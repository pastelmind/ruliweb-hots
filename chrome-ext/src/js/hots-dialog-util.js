/**
 * @file Provides UI-related utility functions.
 */

'use strict';

(root => {
  /**
   * Returns the window object of the currently selected child frame. If none
   * can be found, returns `undefined`.
   * @return {Window} Window object of the currently selected child frame.
   */
  function getSelectedChildWindow() {
    return Array.from(window)
      .find(childWindow => childWindow.getSelection().rangeCount);
  }

  /**
   * Captures the currently selected position in a child frame of the current
   * window, and returns a callback that can inject HTML to it
   * @return {HtmlStringInjector} A callback that injects a valid HTML string
   * into the currently selected frame.
   */
  function getHtmlInjectorAtSelectedPosition() {
    const selectedWindow = HotsDialog.util.getSelectedChildWindow();

    if (!selectedWindow) throw new Error('선택된 프레임을 찾을 수 없습니다.');

    return html => {
      const range = getSelectedRange(selectedWindow);
      if (!range.collapsed) range.deleteContents();
      // splitAncestorElements(range);

      // Add padding to help editing
      html += '&nbsp;';

      // Build DOM nodes from HTML string
      const docFragment =
        createDocumentFragmentFromHtml(selectedWindow.document, html);
      const injectedElements = [...docFragment.children];

      // Inject HTML into page
      range.insertNode(docFragment);

      // Deselect inserted HTML
      selectedWindow.getSelection()
        .collapse(range.endContainer, range.endOffset);

      return injectedElements;
    };
  }

  /**
   * Helper function that retrieves the currently selected range
   * @package
   * @param {Window} selectedWindow
   * @return {Range}
   */
  function getSelectedRange(selectedWindow) {
    const selection = selectedWindow.getSelection();
    let range = null;

    if (selection.rangeCount) {
      range = selection.getRangeAt(0);
      // Weird edge case
      if ('HTML' !== range.startContainer.nodeName) return range;
    }

    const document = selectedWindow.document;

    if (!range) {
      range = document.createRange();
      selection.addRange(range);
    }

    range.setStart(document.body, document.body.childNodes.length);
    range.setEnd(document.body, document.body.childNodes.length);
    return range;
  }

  /**
   * Creates a DocumentFragment filled with the given HTML.
   * @param {Document} document Base document
   * @param {string} html HTML source
   * @return {DocumentFragment} DocumentFragment object
   */
  function createDocumentFragmentFromHtml(document, html) {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    return templateElement.content;
  }


  /**
   * Creates an animated flying box that initially covers an element, and
   * flies to the target coordinates while minimizing to a single point.
   * @param {Element} startElem Element that the flying box starts at
   * @param {number} endX Final X position of the flying box, relative to the
   *    viewport
   * @param {number} endY Final Y position of the flying box, relative to the
   *    viewport
   */
  function animateFlyingBox(startElem, endX, endY) {
    const startRect = startElem.getBoundingClientRect();
    const flyingBox = document.createElement('div');
    flyingBox.appendChild(startElem.cloneNode());

    Object.assign(flyingBox.style, {
      position: 'fixed',
      width: startRect.width + 'px',
      height: startRect.height + 'px',
      left: startRect.left + 'px',
      top: startRect.top + 'px',
      // Appear over all elements (tingle.js uses z-index === 1000)
      zIndex: 9999,
      // Don't trigger event listeners if flying box is accidentally clicked
      pointerEvents: 'none',
    });

    document.body.appendChild(flyingBox);

    const computedStyle = window.getComputedStyle(flyingBox);
    (function startFlyingAnimation() {
      // Wait until the browser has computed the initial styles
      // (required for Firefox)
      // See https://stackoverflow.com/q/20747591 for more info
      if (computedStyle.position !== flyingBox.style.position) {
        setTimeout(startFlyingAnimation, 5);
      } else {
        Object.assign(flyingBox.style, {
          transition: '1s',
          transform: 'scale(0)',
          left: endX + 'px',
          top: endY + 'px',
        });

        setTimeout(() => flyingBox.remove(), 1000);
      }
    })();
  }

  /**
   * Computes the given element's offset relative to the viewport, taking into
   * account offsets of containing <iframe> elements.
   * @param {Element} element DOM element
   * @return {{ left: number, top: number }} Offset of `element` relative to
   *    the viewport, measured in pixels
   */
  function getOffsetToViewport(element) {
    let { left, top } = element.getBoundingClientRect();

    // Add offset of containing <iframe>s
    let { frameElement } = element.ownerDocument.defaultView;
    while (frameElement) {
      const { left: frameLeft, top: frameTop } =
        frameElement.getBoundingClientRect();
      left += frameLeft;
      top += frameTop;
      ({ frameElement } = frameElement.ownerDocument.defaultView);
    }

    return { left, top };
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = {
      getSelectedChildWindow,
      getHtmlInjectorAtSelectedPosition,
      createDocumentFragmentFromHtml,
      animateFlyingBox,
      getOffsetToViewport,
    };
  } else {
    // Browser globals
    root.HotsDialog.util = {
      getSelectedChildWindow,
      getHtmlInjectorAtSelectedPosition,
      createDocumentFragmentFromHtml,
      animateFlyingBox,
      getOffsetToViewport,
    };
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
