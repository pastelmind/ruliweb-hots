/**
 * Injects event listeners in the WYSIWYG editor's iframe.
 * This file is injected into Ruliweb's "create/edit article" pages, as well as
 * any <iframe>s on such pages.
 */

if (isInIframe()) {
  //Delete hero/skill/talent tables when Ctrl + clicked
  //Note: The editor normally prevents click events from going through,
  //      but clicks made on the pseudo-elements register just fine. Yay!
  //Add the event listener to the <html> element, because Cheditor will replace
  //the <body> element when switching between editor modes
  document.body.parentNode.addEventListener('click', event => {
    if (!(event.target && event.ctrlKey)) return;

    const rootElem = event.target.parentNode;
    if (rootElem.classList.contains('ruliweb-hots-hero-table')
      || rootElem.classList.contains('ruliweb-hots-skill-table')
      || rootElem.classList.contains('ruliweb-hots-talent-table')
    ) {
      rootElem.style.transition = 'transform .2s';
      rootElem.style.transform = 'scale(0, 0)';
      setTimeout(() => rootElem.parentNode.removeChild(rootElem), 200);
    }
  });
}


/**
 * Check if this script is running in an iframe.
 * Credits to Greg at https://stackoverflow.com/a/326076/9943202
 * @return {boolean}
 */
function isInIframe() {
  try {
    return window.self !== window.top;
  }
  catch (e) {
    return true;
  }
}