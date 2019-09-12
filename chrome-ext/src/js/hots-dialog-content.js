/** @file Provides a class that generates and manages the dialog content. */

'use strict';

/**
 * @typedef {import("../../../api/src/hero")} Hero
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../api/src/hots-data')} HotsData
 * @typedef {import('./hots-dialog-renderer')} Renderer
 * @typedef {import('./hots-dialog-paster')} HtmlPaster
 */

(root => {
  const isNodeJs = typeof require === 'function';
  /** @type {import('htm')} */
  const htm = isNodeJs ? require('htm') : root.htm;
  /** @type {import('preact')} */
  const preact = isNodeJs ? require('preact') : root.preact;
  /** @type {import('./hots-dialog')} */
  const HotsDialog = isNodeJs ?
    require('./hots-dialog') : (root.HotsDialog = root.HotsDialog || {});

  const html = htm.bind(preact.createElement);

  /** Class for the dialog content. */
  class DialogContent {
    /**
     * Creates a dialog instance and attaches event handlers.
     *
     * @param {HotsData} data
     * @param {Object<string, HeroFilter>} heroFilters
     * @param {Renderer} renderer
     * @param {HtmlPaster} paster
     */
    constructor(data, heroFilters, renderer, paster) {
      this._data = data;
      this._selectedHero = null;
      this._renderer = renderer;
      this._paster = paster;

      this._activeFilters = {};
      for (const filterId in heroFilters) {
        this._activeFilters[filterId] = [];
      }

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
      const heroFilterSelects =
        heroFilterSection.querySelectorAll('.hots-hero-filter-group__icons');

      // Render Preact components
      for (const heroFilterSelect of heroFilterSelects) {
        const { filterType } = heroFilterSelect.dataset;
        const options = Object.entries(heroFilters[filterType].filters)
          .map(([id, name]) => ({
            id, name,
            iconUrl: chrome.runtime.getURL(`/images/${filterType}-${id}.png`),
          }));
        const onSelectChange = selectedIds => {
          this._activeFilters[filterType] = selectedIds;
          this.updateHeroIcons(
            heroIconElems,
            this._activeFilters,
            this._data.heroes,
            this._data.ptrHeroes,
            usePtrCheckbox.checked
          );
        };
        preact.render(
          html`
            <${HotsDialog.components.MultiSelectIcons}
              options=${options}
              onSelectChange=${onSelectChange} />
          `,
          heroFilterSection,
          heroFilterSelect
        );
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
            this._activeFilters,
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
     * @param {Object<string, string[]>} activeFilterLists Maps filter types to
     *    array of active filter IDs
     * @param {Object<string, Hero>} heroes All heroes in the live server
     * @param {Object<string, Hero>} ptrHeroes New or changed heroes in the PTR
     * @param {boolean} selectPtrOnly If truthy, only highlight heroes that are
     *    new or changed in the PTR
     */
    updateHeroIcons(
      heroIconElems, activeFilterLists, heroes, ptrHeroes, selectPtrOnly
    ) {
      // Generate a collection of active filters
      const activeFilters = {};
      for (const [filterType, filters] of Object.entries(activeFilterLists)) {
        activeFilters[filterType] = new Set(filters);
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

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = DialogContent;
  } else {
    // Browser globals
    (root.HotsDialog = root.HotsDialog || {}).DialogContent = DialogContent;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
