/**
 * @file Provides a factory function for the dialog.
 */

'use strict';

/**
 * Collection of HotS data loaded from hots.json
 * @typedef {import("../../../api/src/hots-data")} HotsData
 */

/**
 * @typedef {import("../../../api/src/hero")} Hero
 */

/**
 * @typedef {import("./hots-dialog-paster")} HtmlPaster
 */

(root => {
  const HotsDialog = (typeof require == 'function') ?
    require('./hots-dialog') : root.HotsDialog;

  /** Class for the dialog content. */
  class Dialog {
    /**
     * Creates a dialog instance and attaches event handlers.
     *
     * @param {HotsData} data
     * @param {Object<string, Object<string, *>>} heroFilters
     * @param {import("./hots-dialog-renderer")} renderer
     * @param {HtmlPaster} paster
     */
    constructor(data, heroFilters, renderer, paster) {
      this._data = data;
      this._heroFilters = heroFilters;
      this._selectedHero = null;
      this._renderer = renderer;
      this._paster = paster;

      // Generate document fragment
      this._fragment = HotsDialog.util.createDocumentFragmentFromHtml(
        document,
        this._renderer.renderDialogContent(
          heroFilters, data.heroes, data.ptrHeroes
        )
      );

      // Retrieve each dialog section
      const optionsSection =
        this._fragment.querySelector('.hots-dialog-options');
      const heroFilterSection =
        this._fragment.querySelector('.hots-hero-filters');
      const heroIconsSection = this._fragment.querySelector('.hots-hero-icons');
      const skillsetSection = this._fragment.querySelector('.hots-skillset');
      const talentsetSection = this._fragment.querySelector('.hots-talentset');

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

      const heroIconElems =
        heroIconsSection.querySelectorAll('.hots-hero-icon');
      /** @type {NodeListOf<HTMLInputElement>} */
      const heroFilterCheckboxes =
        heroFilterSection.querySelectorAll('.hero-filter input[type=checkbox]');

      // Add click handler for hero filters
      for (const checkbox of heroFilterCheckboxes) {
        checkbox.addEventListener('change', () =>
          this.updateHeroIcons(
            heroIconElems,
            heroFilterCheckboxes,
            this._data.heroes,
            this._data.ptrHeroes,
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

        const hero = this._selectedHero =
          this.getHeroDataById(heroId, usePtrCheckbox.checked);
        console.assert(hero, `Cannot find hero with ID: ${heroId}`);

        skillsetSection.innerHTML = this._renderer.renderSkillIcons(hero);
        talentsetSection.innerHTML = this._renderer.renderTalentList(hero);
      });

      // Check if PTR data is available
      if (this._data.ptrHeroes && Object.keys(this._data.ptrHeroes).length) {
        // Add click handler for "Use PTR" checkbox
        usePtrCheckbox.addEventListener('change', event => {
          this.updateHeroIcons(
            heroIconElems,
            heroFilterCheckboxes,
            this._data.heroes,
            this._data.ptrHeroes,
            usePtrCheckbox.checked
          );

          if (!this._selectedHero) return;

          const heroId = this._selectedHero.id;
          const hero = this._selectedHero =
            this.getHeroDataById(heroId, usePtrCheckbox.checked);
          console.assert(hero, `Cannot find hero with ID: ${heroId}`);

          skillsetSection.innerHTML = this._renderer.renderSkillIcons(hero);
          talentsetSection.innerHTML = this._renderer.renderTalentList(hero);
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
            html = this._renderer.renderHeroInfoTable(
              hero, iconSize, iconSize, version,
              useSimpleHeroTableCheckbox.checked
            );
          } else { // isSkillIcon
            html = this._renderer.renderSkillInfoTable(
              hero.skills[skillIndex], iconSize, version
            );
          }
          this.pasteWithEffect(html, event.target);
        }
      });

      // Add event handlers for talent icons
      talentsetSection.addEventListener('click', event => {
        if (!(event.target)) return;

        const isTalentIcon =
          event.target.classList.contains('hots-talent-icon');
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
            html = this._renderer.renderTalentInfoTable(
              talentGroup[talentIndex], iconSize, version
            );
          } else { // isTalentGroupButton
            html = this._renderer.renderTalentGroupInfoTable(
              talentGroup, iconSize, version
            );
          }
          this.pasteWithEffect(html, event.target);
        }
      });
    }

    /**
     * Updates the hero icons, filtered by `heroFilterCheckboxes`.
     * @param {Iterable<Element>} heroIconElems Array of hero icon elements
     * @param {Iterable<HTMLInputElement>} heroFilterCheckboxes Array of
     *    checkbox <input> elements
     * @param {Object<string, Hero>} heroes All heroes in the live server
     * @param {Object<string, Hero>} ptrHeroes New or changed heroes in the PTR
     * @param {boolean} selectPtrOnly If truthy, only highlight heroes that are
     *    new or changed in the PTR
     */
    updateHeroIcons(
      heroIconElems, heroFilterCheckboxes, heroes, ptrHeroes, selectPtrOnly
    ) {
      // Generate a collection of active filters
      const activeFilters = {};

      for (const filterType in this._heroFilters) {
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
    }

    /**
     * Retrieves a document fragment containing the generated dialog.
     * @return {DocumentFragment} A collection of generated DOM elements
     */
    getFragment() {
      return this._fragment;
    }

    /**
     * Get the hero data from the hero's ID. Searches for the hero ID first in
     * the live data, then in the PTR data.
     * @param {string} heroId Hero ID string
     * @param {boolean} preferPtr If truthy, use the PTR data first.
     * @return {Hero} Selected hero object
     */
    getHeroDataById(heroId, preferPtr = false) {
      const data = this._data;
      if (preferPtr) return data.ptrHeroes[heroId] || data.heroes[heroId];
      return data.heroes[heroId] || data.ptrHeroes[heroId];
    }

    /**
     * Retrieve the Heroes of the Storm version string for the dataset.
     * @param {boolean} isPtr If truthy, return the PTR version string instead.
     * @return {string} HotS version string
     */
    getHotsVersion(isPtr = false) {
      return isPtr ? this._data.hotsPtrVersion : this._data.hotsVersion;
    }

    /**
     * Pastes a HTML string into the WYSIWYG editor and creates visual effects.
     * @param {string} html HTML string
     * @param {Element} eventTarget Element that was triggered by the user
     */
    pasteWithEffect(html, eventTarget) {
      const injectedElements = this._paster.paste(html);
      const { left: endX, top: endY } =
        HotsDialog.util.getOffsetToViewport(injectedElements[0]);
      HotsDialog.util.animateFlyingBox(eventTarget, endX, endY);
    }
  }

  /**
   * Tests if a hero icon should be highlighted.
   * @package
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

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = Dialog;
  } else {
    // Browser globals
    root.HotsDialog.Dialog = Dialog;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
