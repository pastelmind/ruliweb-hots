/**
 * Injects event listeners in the WYSIWYG editor's iframe.
 * This file is injected into Ruliweb's "create/edit article" pages, as well as
 * any <iframe>s on such pages.
 */

const pToDivReplacer = {
  /**
   * When a user injects a <details> inside a <p>, replace <p> with a <div> to
   * allow aligning <details> tags.
   */
  ancestorPofDetailsObserver: new MutationObserver(replaceAncestorPsWithDivs),

  /**
   * Boolean that indicates whether the PToDivReplacer is active.
   * @private
   */
  isActive: false,

  /**
   * Activates the PToDivReplacer, watching for DOM changes and performing
   * <p>-to-<div> replacement for <p>s containing <details>.
   */
  activate() {
    if (this.isActive) {
      console.debug("PToDivReplacer is already active");
      return;
    }

    replaceAncestorPsWithDivs();

    this.ancestorPofDetailsObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    this.isActive = true;
  },

  /**
   * Deactivates PToDivReplacer so that DOM changes won't trigger a <p>-to-<div>
   * replacement.
   */
  deactivate() {
    if (!this.isActive) {
      console.debug("PToDivReplacer is already inactive");
      return;
    }

    this.ancestorPofDetailsObserver.disconnect();

    this.isActive = false;
  },
};

if (isInIframe()) {
  // Delete hero/skill/talent tables when Ctrl + clicked
  // Note: The editor normally prevents click events from going through,
  //      but clicks made on the pseudo-elements register just fine. Yay!
  // Add the event listener to the <html> element, because Cheditor will replace
  // the <body> element when switching between editor modes
  document.documentElement.addEventListener("click", (event) => {
    if (!(event.target && event.ctrlKey)) return;

    if (!isHTMLElement(event.target)) {
      console.debug(event.target, "was clicked, but not a HTML element");
      return;
    }

    const rootElem = event.target.parentNode;
    if (!isHTMLElement(rootElem)) {
      console.debug(rootElem, "is not a HTML element");
      return;
    }

    if (
      rootElem.classList.contains("ruliweb-hots-hero-table") ||
      rootElem.classList.contains("ruliweb-hots-skill-table") ||
      rootElem.classList.contains("ruliweb-hots-talent-table")
    ) {
      rootElem.style.transition = "transform .2s";
      rootElem.style.transform = "scale(0, 0)";
      setTimeout(() => rootElem.remove(), 200);
    }

    // eslint-disable-next-line valid-jsdoc -- TypeScript syntax
    /**
     * Type guard. Checks if a value is an object.
     * @param {*} o
     * @return {o is HTMLElement}
     */
    function isHTMLElement(o) {
      return (
        o instanceof HTMLElement ||
        (typeof o === "object" && "tagName" in o && "style" in o)
      );
    }
  });

  // Prevent user from inadvertently setting "text-align: center" on the <body>
  // element. This should prevent the illusory center-alignment of <details>
  // elements inserted by HotsDialog
  const bodyStyleRemover = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style" &&
        mutation.target.nodeName === "BODY"
      ) {
        const body = /** @type {HTMLBodyElement} */ (mutation.target);
        body.style.textAlign = "";
        return; // Mission accomplished, don't process any more mutations
      }
    }
  });

  // Observe mutations on <html> and its descendants (see comments above)
  bodyStyleRemover.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
    subtree: true,
  });

  pToDivReplacer.activate();

  // Attach to window so as to allow access from hots-dialog.js
  // Use Object.assign() to avoid TypeScript complaining
  Object.assign(window, { pToDivReplacer });
}

/**
 * Check if this script is running in an iframe.
 * Credits to Greg at https://stackoverflow.com/a/326076/9943202
 * @return {boolean}
 */
function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * Find all cases where a <details> is inside a <p>, and replace the <p> with a
 * <div>.
 */
function replaceAncestorPsWithDivs() {
  let detailsTag;
  while ((detailsTag = document.querySelector("p details:first-of-type"))) {
    // Find ancestor <p> of <details>
    let ancestorP = detailsTag.parentElement;
    while (ancestorP && ancestorP.tagName !== "P") {
      ancestorP = ancestorP.parentElement;
    }

    if (!ancestorP) {
      console.error("Cannot find ancestor <p> of", detailsTag);
      continue;
    }

    // Remember the position of <p>, so that we can insert <div> later
    const parentOfP = ancestorP.parentNode;
    const nextSiblingOfP = ancestorP.nextSibling;

    // Remove <p> to prevent triggering a reflow for each child node transfer
    ancestorP.remove();

    // Create <div> to replace <p>
    const div = document.createElement("div");

    // Copy all attributes of <p> to <div>
    for (const attribute of ancestorP.attributes) {
      div.setAttribute(attribute.name, attribute.value);
    }

    // Move all child nodes of <p> to <div>
    while (ancestorP.firstChild) div.appendChild(ancestorP.firstChild);

    // Insert <div> into the former position of <p>
    if (parentOfP) parentOfP.insertBefore(div, nextSiblingOfP);
  }
}
