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
        this._renderer.renderDialogContent(heroFilters)
      );

      // Retrieve each dialog section
      const optionsSection =
        this._fragment.querySelector('.hots-dialog-options');
      const heroFilterSection =
        this._fragment.querySelector('.hots-hero-filters');
      const heroIconsSection = this._fragment.querySelector('.hots-hero-menu');
      const hotsBoxMenuSection =
        this._fragment.querySelector('.hots-box-menu-container');

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

      /** @type {NodeListOf<HTMLInputElement>} */
      const heroFilterSelects =
        heroFilterSection.querySelectorAll('.hots-hero-filter-group__icons');

      // Render Preact components

      /** @return {{version: string, iconSize: number}} */
      function getPasteParams() {
        let version = '';
        if (addVersionCheckbox.checked) {
          version = usePtrCheckbox.checked
            ? data.hotsPtrVersion : data.hotsVersion;
        }
        return { version, iconSize: iconSizeRange.value };
      };

      /**
       * @param {Hero} hero
       * @return {Element[]}
       */
      function pasteHero(hero) {
        const { iconSize, version } = getPasteParams();
        const html = renderer.renderHeroInfoTable(
          hero, iconSize, iconSize, version, useSimpleHeroTableCheckbox.checked
        );
        return paster.paste(html);
      };

      /**
       * @param {Skill} skill
       * @return {Element[]}
       */
      function pasteSkill(skill) {
        const { iconSize, version } = getPasteParams();
        const html = renderer.renderSkillInfoTable(skill, iconSize, version);
        return paster.paste(html);
      };

      /**
       * @param {Talent} talent
       * @return {Element[]}
       */
      function pasteTalent(talent) {
        const { iconSize, version } = getPasteParams();
        const html = renderer.renderTalentInfoTable(talent, iconSize, version);
        return paster.paste(html);
      };

      /**
       * @param {Talent[]} talentGroup
       * @return {Element[]}
       */
      function pasteTalentGroup(talentGroup) {
        const { iconSize, version } = getPasteParams();
        const html = renderer.renderTalentGroupInfoTable(
          talentGroup, iconSize, version
        );
        return paster.paste(html);
      };

      /**
       * @param {Hero=} hero Currently selected hero.
       * @return {undefined}
       */
      function renderHotsBoxMenu(hero) {
        preact.render(
          html`
            <${HotsDialog.components.HotsBoxMenu}
              hero=${hero || data.heroes.Dva}
              onPasteHero=${pasteHero}
              onPasteSkill=${pasteSkill}
              onPasteTalent=${pasteTalent}
              onPasteTalentGroup=${pasteTalentGroup}
              />
          `,
          hotsBoxMenuSection
        );
      }
      renderHotsBoxMenu();

      const onSelectHero = hero => {
        // TODO Remove when transition to Preact is complete
        renderHotsBoxMenu(hero);
      };
      const renderHeroMenu = () => {
        preact.render(
          html`
            <${HotsDialog.components.HeroMenu}
              heroes=${this._data.heroes}
              ptrHeroes=${this._data.ptrHeroes}
              activeFilters=${this._activeFilters}
              ptrMode=${usePtrCheckbox.checked}
              onClickHero=${onSelectHero}
              />
          `,
          heroIconsSection
        );
      };
      renderHeroMenu();

      for (const heroFilterSelect of heroFilterSelects) {
        const { filterType } = heroFilterSelect.dataset;
        const options = Object.entries(heroFilters[filterType].filters)
          .map(([id, name]) => ({
            id, name,
            iconUrl: chrome.runtime.getURL(`/images/${filterType}-${id}.png`),
          }));
        const onSelectChange = selectedIds => {
          this._activeFilters = {
            ...this._activeFilters,
            [filterType]: selectedIds,
          };
          // TODO Remove when transition to Preact is complete
          renderHeroMenu();
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

      // Check if PTR data is available
      if (!this._data.ptrHeroes || !Object.keys(this._data.ptrHeroes).length) {
        usePtrCheckbox.checked = false;
        usePtrCheckbox.disabled = true;
        usePtrCheckbox.closest('.hots-dialog-option')
          .setAttribute('aria-label', 'PTR 서버 패치 정보가 없습니다');
      }
    }

    /**
     * Retrieves a document fragment containing the generated dialog.
     * @return {DocumentFragment} A collection of generated DOM elements
     */
    getFragment() {
      return this._fragment;
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
