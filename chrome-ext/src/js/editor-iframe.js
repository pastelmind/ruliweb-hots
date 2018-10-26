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

  //Prevent user from inadvertently setting "text-align: center" on the <body>
  //element. This should prevent the illusory center-alignment of <details>
  //elements inserted by HotsDialog
  const bodyStyleRemover = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes'
        && mutation.attributeName === 'style'
        && mutation.target.nodeName === 'BODY'
      ) {
        /** @type {HTMLBodyElement} */
        const body = mutation.target;
        body.style.textAlign = '';
        return; //Mission accomplished, don't process any more mutations
      }
    }
  });

  //Observe mutations on <html> element and its descendants (see comments above)
  bodyStyleRemover.observe(document.body.parentNode, {
    attributes: true,
    attributeFilter: ['style'],
    subtree: true,
  });

  //When a user injects a <details> inside a <p>, replace <p> with a <div> to
  //allow aligning <details> tags.
  const pToDivReplacer = new MutationObserver(() => {
    for (const detailsTag of document.querySelectorAll('p details:first-of-type')) {
      //Find ancestor <p> of <details>
      let ancestorP = detailsTag.parentElement;
      while (ancestorP && ancestorP.tagName !== 'P')
        ancestorP = ancestorP.parentElement;

      if (!ancestorP) {
        console.error('Cannot find ancestor <p> of', detailsTag);
        continue;
      }

      //Remember the position of <p>, so that we can insert <div> later
      const parentOfP = ancestorP.parentNode;
      const nextSiblingOfP = ancestorP.nextSibling;

      //Remove <p> to prevent triggering a reflow for each child node transfer
      parentOfP.removeChild(ancestorP);

      //Create <div> to replace <p>
      const div = document.createElement('div');

      //Copy all attributes of <p> to <div>
      for (const attribute of ancestorP.attributes)
        div.setAttribute(attribute.name, attribute.value);

      //Move all child nodes of <p> to <div>
      while (ancestorP.firstChild)
        div.appendChild(ancestorP.firstChild);

      //Insert <div> into the former position of <p>
      parentOfP.insertBefore(div, nextSiblingOfP);
    }
  });

  //Observe mutations on <html> element and its descendants (see comments above)
  pToDivReplacer.observe(document.body.parentNode, {
    childList: true,
    subtree: true,
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