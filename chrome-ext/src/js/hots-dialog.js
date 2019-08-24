/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

/**
 * A callback that injects the given HTML string into a desired position.
 * @callback HtmlStringInjector
 * @param {string} html HTML string to inject
 * @return {Element[]} Elements injected by the callback
 */

/**
 * Collection of HotS data loaded from hots.json
 * @typedef {import("../../../api/src/hots-data")} HotsData
 */

/**
 * @typedef {import("../../../api/src/hero")} Hero
 */


const HotsDialog = {
  /**
   * Set by `openHotsDialog()`
   * @type {HotsData}
   */
  data: null,

  /** @type {HtmlStringInjector} */
  injectHtml: null,

  /** @type {Hero} */
  selectedHero: null,

  heroFilters: {
    universe: {
      name: '세계관',
      filters: {
        'warcraft': '워크래프트',
        'starcraft': '스타크래프트',
        'diablo': '디아블로',
        'classic': '블리자드 고전',
        'overwatch': '오버워치',
      },
    },
    newRole: {
      name: '역할',
      filters: {
        tank: '전사',
        bruiser: '투사',
        ranged_assassin: '원거리 암살자',
        melee_assassin: '근접 암살자',
        healer: '치유사',
        support: '지원가',
      },
    },
  },

  /**
   * Launch the hero/skill/talent selection dialog
   * @param {HtmlStringInjector} injector Callback that injects the given HTML
   *    fragment into the appropriate position
   */
  launchDialog(injector) {
    // Snapshot currently selected area
    this.injectHtml = injector;

    if (!this.dialog) {
      this.dialog = new tingle.modal({
        cssClass: ['hots-dialog-container'],
        onOpen() {
          // Temporarily deactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.deactivate();
          }
        },
        onClose() {
          // Reactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer) {
            frameWindow.pToDivReplacer.activate();
          }
        },
      });

      this.dialog.setContent(this.buildDialogContent(this.data));
    }

    this.dialog.open();
  },

  /**
   * Generates the dialog content and attaches event handlers.
   * @param {HotsData} hotsData
   * @return {DocumentFragment} A collection of generated DOM elements
   */
  buildDialogContent(hotsData) {
    // Generate dialog
    const dialogFragment = this.util.createDocumentFragmentFromHtml(
      document,
      this.renderers.renderDialogContent(
        this.heroFilters, hotsData.heroes, hotsData.ptrHeroes
      )
    );

    // Retrieve each dialog section
    const optionsSection = dialogFragment.querySelector('.hots-dialog-options');
    const heroFilterSection =
      dialogFragment.querySelector('.hots-hero-filters');
    const heroIconsSection = dialogFragment.querySelector('.hots-hero-icons');
    const skillsetSection = dialogFragment.querySelector('.hots-skillset');
    const talentsetSection = dialogFragment.querySelector('.hots-talentset');

    // Retrieve individual elements and element groups
    /** @type {HTMLInputElement} */
    const addVersionCheckbox =
      optionsSection.querySelector('#hots-dialog-option-add-version');
    /** @type {HTMLInputElement} */
    const usePtrCheckbox =
      optionsSection.querySelector('#hots-dialog-option-use-ptr');
    /** @type {HTMLInputElement} */
    const useSimpleHeroTableCheckbox =
      optionsSection.querySelector('#hots-dialog-option-simple-hero-table');
    /** @type {HTMLInputElement} */
    const iconSizeRange =
      optionsSection.querySelector('#hots-dialog-option-icon-size');
    /** @type {HTMLOutputElement} */
    const iconSizeOutput =
      optionsSection.querySelector(`output[for=${iconSizeRange.id}]`);

    const heroIconElems = heroIconsSection.querySelectorAll('.hots-hero-icon');
    /** @type {NodeListOf<HTMLInputElement>} */
    const heroFilterCheckboxes =
      heroFilterSection.querySelectorAll('.hero-filter input[type=checkbox]');

    // Add click handler for hero filters
    for (const checkbox of heroFilterCheckboxes) {
      checkbox.addEventListener('change', () =>
        this.updateHeroIcons(
          heroIconElems,
          heroFilterCheckboxes,
          hotsData.heroes,
          hotsData.ptrHeroes,
          usePtrCheckbox.checked
        ));
    }

    // Add change handler for icon size input
    iconSizeRange.addEventListener('input', event => {
      const iconSize = event.target.value;
      iconSizeOutput.textContent = `${iconSize}\xD7${iconSize}px`;
    });
    iconSizeRange.dispatchEvent(new Event('input'));

    // Add click handler for hero icons
    heroIconsSection.addEventListener('click', event => {
      if (
        !(event.target && event.target.classList.contains('hots-hero-icon'))
      ) return;
      const heroId = event.target.dataset.heroId; // data-hero-id

      const hero = this.selectedHero =
        this.getHeroDataById(heroId, usePtrCheckbox.checked);
      console.assert(hero, `Cannot find hero with ID: ${heroId}`);

      skillsetSection.innerHTML = this.renderers.renderSkillIcons(hero);
      talentsetSection.innerHTML = this.renderers.renderTalentList(hero);
    });

    // Check if PTR data is available
    if (hotsData.ptrHeroes && Object.keys(hotsData.ptrHeroes).length) {
      // Add click handler for "Use PTR" checkbox
      usePtrCheckbox.addEventListener('change', event => {
        this.updateHeroIcons(
          heroIconElems,
          heroFilterCheckboxes,
          hotsData.heroes,
          hotsData.ptrHeroes,
          usePtrCheckbox.checked
        );

        if (!this.selectedHero) return;

        const heroId = this.selectedHero.id;
        const hero = this.selectedHero =
          this.getHeroDataById(heroId, usePtrCheckbox.checked);
        console.assert(hero, `Cannot find hero with ID: ${heroId}`);

        skillsetSection.innerHTML = this.renderers.renderSkillIcons(hero);
        talentsetSection.innerHTML = this.renderers.renderTalentList(hero);
      });
    } else {
      // Disable "Use PTR" checkbox
      usePtrCheckbox.checked = false;
      usePtrCheckbox.disabled = true;
      usePtrCheckbox.closest('.hots-dialog-option')
        .setAttribute('aria-label', 'PTR 서버 패치 정보가 없습니다');
    }

    // Add event handlers for selected hero icon and skill icons
    skillsetSection.addEventListener('click', event => {
      if (!(event.target)) return;

      const isHeroIcon =
        event.target.classList.contains('hots-current-hero-icon');
      const isSkillIcon = event.target.classList.contains('hots-skill-icon');

      if (isHeroIcon || isSkillIcon) {
        // data-hero-id, data-is-ptr, data-skill-index
        const { heroId, isPtr, skillIndex } = event.target.dataset;
        const version =
          addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        const hero = this.getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        let html;
        if (isHeroIcon) {
          html = this.renderers.renderHeroInfoTable(
            hero, iconSize, iconSize, version,
            useSimpleHeroTableCheckbox.checked
          );
        } else { // isSkillIcon
          html = this.renderers.renderSkillInfoTable(
            hero.skills[skillIndex], iconSize, version
          );
        }
        this.injectHtmlInEditor(html, event.target);
      }
    });

    // Add event handlers for talent icons
    talentsetSection.addEventListener('click', event => {
      if (!(event.target)) return;

      const isTalentIcon = event.target.classList.contains('hots-talent-icon');
      const isTalentGroupButton =
        event.target.classList.contains('hots-talentset__group-add-all');

      if (isTalentIcon || isTalentGroupButton) {
        // data-hero-id, data-is-ptr, data-talent-level, data-talent-index
        const { heroId, isPtr, talentLevel, talentIndex } =
          event.target.dataset;
        const version =
          addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        const hero = this.getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        const talentGroup = hero.talents[talentLevel];

        // TODO De-duplicate code
        let html;
        if (isTalentIcon) {
          html = this.renderers.renderTalentInfoTable(
            talentGroup[talentIndex], iconSize, version
          );
        } else { // isTalentGroupButton
          html = this.renderers.renderTalentGroupInfoTable(
            talentGroup, iconSize, version
          );
        }
        this.injectHtmlInEditor(html, event.target);
      }
    });

    return dialogFragment;
  },

  /**
   * Updates the hero icons, filtered by `heroFilterCheckboxes`.
   * @param {Iterable<Element>} heroIconElems Array of hero icon elements
   * @param {Iterable<HTMLInputElement>} heroFilterCheckboxes Array of checkbox
   *    <input> elements
   * @param {{ [heroId: string]: Hero }} heroes All heroes in the live server
   * @param {{ [heroId: string]: Hero }} ptrHeroes New or changed heroes in the
   *    PTR
   * @param {boolean} selectPtrOnly If truthy, only highlight heroes that are
   *    new or changed in the PTR
   */
  updateHeroIcons(
    heroIconElems, heroFilterCheckboxes, heroes, ptrHeroes, selectPtrOnly
  ) {
    // Generate a collection of active filters
    const activeFilters = {};

    for (const filterType in this.heroFilters) {
      activeFilters[filterType] = new Set;
    }

    for (const checkbox of heroFilterCheckboxes) {
      if (checkbox.checked) {
        // data-filter-type
        activeFilters[checkbox.dataset.filterType].add(checkbox.value);
      }
    }
    // Toggle CSS class of each hero icon
    for (const heroIconElem of heroIconElems) {
      // data-hero-id, data-is-ptr
      const { heroId, isPtr } = heroIconElem.dataset;
      const hero = (isPtr ? ptrHeroes : heroes)[heroId];
      heroIconElem.classList.toggle(
        'hots-hero-icon--excluded',
        !canBeHighlighted(hero, activeFilters, selectPtrOnly)
      );
    }

    /**
     * Tests if a hero icon should be highlighted.
     * @private
     * @param {Hero} hero Hero object to test
     * @param {Object<string, Set<string>>} activeFilters Mapping of
     *    filter type (string) => set of active filter tags
     * @param {boolean} selectPtrOnly If truthy, highlight only if hero is added
     *    or has changes in PTR.
     * @return {boolean}
     */
    function canBeHighlighted(hero, activeFilters, selectPtrOnly) {
      if (selectPtrOnly && !(hero.hasPtrChanges || hero.isPtr)) return false;

      for (const filterType in activeFilters) {
        const filterSet = activeFilters[filterType];
        const heroAttribute = hero[filterType];

        // Keep this hero if the filterSet is empty
        if (!filterSet.size) continue;

        let isMatched = false;

        // Keep this hero if there is a filter that matches him/her/it/them.
        for (const filter of activeFilters[filterType]) {
          // Hardcoded workaround for Orphea
          // TODO remove if Blizzard ever adds a stylized Nexus universe icon
          if (
            heroAttribute.includes(filter) ||
            (heroAttribute === 'nexus' && filter === 'classic')
          ) isMatched = true;
        }

        if (!isMatched) return false;
      }

      return true;
    }
  },

  /**
   * Get the hero data from the hero's ID. Searches for the hero ID first in the
   * live data, then in the PTR data.
   * @param {string} heroId Hero ID string
   * @param {boolean} preferPtr If truthy, use the PTR data first.
   * @return {Hero} Selected hero object
   */
  getHeroDataById(heroId, preferPtr = false) {
    const data = this.data;
    if (preferPtr) return data.ptrHeroes[heroId] || data.heroes[heroId];
    return data.heroes[heroId] || data.ptrHeroes[heroId];
  },

  /**
   * Retrieve the Heroes of the Storm version string for the dataset.
   * @param {boolean} isPtr If truthy, return the PTR version string instead.
   * @return {string} HotS version string
   */
  getHotsVersion(isPtr = false) {
    return isPtr ? this.data.hotsPtrVersion : this.data.hotsVersion;
  },

  /**
   * Injects the given HTML string into the WYSIWYG editor, at the selection
   * which was saved when the dialog was launched.
   * @param {string} html HTML string
   * @param {Element} eventTarget Element that was triggered by the user
   */
  injectHtmlInEditor(html, eventTarget) {
    const injectedElements = this.injectHtml(html);
    const { left: endX, top: endY } =
      this.util.getOffsetToViewport(injectedElements[0]);

    this.util.animateFlyingBox(eventTarget, endX, endY);
  },

  /**
   * Collection of methods that generate HTML source strings.
   * See hots-dialog-renderers.js
   */
  renderers: (typeof require !== 'undefined') ?
    require('./hots-dialog-renderers') : null,

  /** Collection of utility functions */
  util: {
    /**
     * Returns the window object of the currently selected child frame. If none
     * can be found, returns `undefined`.
     * @return {Window} Window object of the currently selected child frame.
     */
    getSelectedChildWindow() {
      return Array.from(window)
        .find(childWindow => childWindow.getSelection().rangeCount);
    },

    /**
     * Captures the currently selected position in a child frame of the current
     * window, and returns a callback that can inject HTML to it
     * @return {HtmlStringInjector} A callback that injects a valid HTML string
     * into the currently selected frame.
     */
    getHtmlInjectorAtSelectedPosition() {
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
          this.createDocumentFragmentFromHtml(selectedWindow.document, html);
        const injectedElements = [...docFragment.children];

        // Inject HTML into page
        range.insertNode(docFragment);

        // Deselect inserted HTML
        selectedWindow.getSelection()
          .collapse(range.endContainer, range.endOffset);

        return injectedElements;
      };

      /**
       * Helper function that retrieves the currently selected range
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
    },

    /**
     * Creates a DocumentFragment filled with the given HTML.
     * @param {Document} document Base document
     * @param {string} html HTML source
     * @return {DocumentFragment} DocumentFragment object
     */
    createDocumentFragmentFromHtml(document, html) {
      const templateElement = document.createElement('template');
      templateElement.innerHTML = html;
      return templateElement.content;
    },


    /**
     * Creates an animated flying box that initially covers an element, and
     * flies to the target coordinates while minimizing to a single point.
     * @param {Element} startElem Element that the flying box starts at
     * @param {number} endX Final X position of the flying box, relative to the
     *    viewport
     * @param {number} endY Final Y position of the flying box, relative to the
     *    viewport
     */
    animateFlyingBox(startElem, endX, endY) {
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
    },


    /**
     * Computes the given element's offset relative to the viewport, taking into
     * account offsets of containing <iframe> elements.
     * @param {Element} element DOM element
     * @return {{ left: number, top: number }} Offset of `element` relative to
     *    the viewport, measured in pixels
     */
    getOffsetToViewport(element) {
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
    },
  },
};


/**
 * Load HotS data on first run and launch the Hots dialog.
 * This function is called when the right-click menu is selected.
 */
function openHotsDialog() {
  if (!HotsDialog.data) {
    chrome.storage.local.get(
      ['heroes', 'hotsVersion', 'ptrHeroes', 'hotsPtrVersion'],
      data => {
        if (chrome.runtime.lastError) throw chrome.runtime.lastError;

        HotsDialog.data = data; // Cache the data for subsequent calls
        openHotsDialog();
      }
    );
  } else {
    HotsDialog.launchDialog(
      HotsDialog.util.getHtmlInjectorAtSelectedPosition()
    );
  }
}


if (typeof module !== 'undefined' && module.exports) {
  // For testing in Node.js
  module.exports = exports = HotsDialog;
} else {
  // For binding modules
  (typeof self !== 'undefined' ? self : this).HotsDialog = HotsDialog;
}
