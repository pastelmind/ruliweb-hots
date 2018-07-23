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
    if (rootElem.classList.contains('ruliweb-hots-table')) {
      rootElem.style.transition = 'transform .2s';
      rootElem.style.transform = 'scale(0, 0)';
      setTimeout(() => rootElem.parentNode.removeChild(rootElem), 200);
    }
  });

  //Fix for tables generated in <= v0.5.0
  document.querySelectorAll('.ruliweb-hots-hero-table, .ruliweb-hots-skill-table, .ruliweb-hots-talent-table')
    .forEach(oldTableRoot => {
      const parentElement = oldTableRoot.parentNode;
      if (parentElement && !(parentElement.tagName === 'BUTTON' && parentElement.classList.contains('ruliweb-hots-table'))) {
        //Create the button element to wrap the old table with
        const button = document.createElement('button');
        button.className = 'ruliweb-hots-table';
        button.disabled = true;
        button.style.cssText = 'border:none;margin:0;padding:0;text-align:left;cursor:auto';

        //Wrap the table in a button
        parentElement.insertBefore(button, oldTableRoot)
        button.appendChild(oldTableRoot);
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