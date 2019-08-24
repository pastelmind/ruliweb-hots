/**
 * @file Provides a factory function for the dialog.
 */

'use strict';

/**
 * @typedef {import("../../../api/src/hero")} Hero
 */

(root => {
  const HotsDialog = (typeof require == 'function') ?
    require('./hots-dialog') : root.HotsDialog;

  /**
   * Generates the dialog content and attaches event handlers.
   * @param {HotsData} hotsData
   * @return {DocumentFragment} A collection of generated DOM elements
   */
  function buildDialogContent(hotsData) {
    // Generate dialog
    const dialogFragment = HotsDialog.util.createDocumentFragmentFromHtml(
      document,
      HotsDialog.renderers.renderDialogContent(
        HotsDialog.heroFilters, hotsData.heroes, hotsData.ptrHeroes
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
        updateHeroIcons(
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

      const hero = HotsDialog.selectedHero =
        getHeroDataById(heroId, usePtrCheckbox.checked);
      console.assert(hero, `Cannot find hero with ID: ${heroId}`);

      skillsetSection.innerHTML = HotsDialog.renderers.renderSkillIcons(hero);
      talentsetSection.innerHTML = HotsDialog.renderers.renderTalentList(hero);
    });

    // Check if PTR data is available
    if (hotsData.ptrHeroes && Object.keys(hotsData.ptrHeroes).length) {
      // Add click handler for "Use PTR" checkbox
      usePtrCheckbox.addEventListener('change', event => {
        updateHeroIcons(
          heroIconElems,
          heroFilterCheckboxes,
          hotsData.heroes,
          hotsData.ptrHeroes,
          usePtrCheckbox.checked
        );

        if (!HotsDialog.selectedHero) return;

        const heroId = HotsDialog.selectedHero.id;
        const hero = HotsDialog.selectedHero =
          getHeroDataById(heroId, usePtrCheckbox.checked);
        console.assert(hero, `Cannot find hero with ID: ${heroId}`);

        skillsetSection.innerHTML =
          HotsDialog.renderers.renderSkillIcons(hero);
        talentsetSection.innerHTML =
          HotsDialog.renderers.renderTalentList(hero);
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
          addVersionCheckbox.checked ? getHotsVersion(isPtr) : '';

        const hero = getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        let html;
        if (isHeroIcon) {
          html = HotsDialog.renderers.renderHeroInfoTable(
            hero, iconSize, iconSize, version,
            useSimpleHeroTableCheckbox.checked
          );
        } else { // isSkillIcon
          html = HotsDialog.renderers.renderSkillInfoTable(
            hero.skills[skillIndex], iconSize, version
          );
        }
        injectHtmlInEditor(html, event.target);
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
        const version = addVersionCheckbox.checked ? getHotsVersion(isPtr) : '';

        const hero = getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        const talentGroup = hero.talents[talentLevel];

        // TODO De-duplicate code
        let html;
        if (isTalentIcon) {
          html = HotsDialog.renderers.renderTalentInfoTable(
            talentGroup[talentIndex], iconSize, version
          );
        } else { // isTalentGroupButton
          html = HotsDialog.renderers.renderTalentGroupInfoTable(
            talentGroup, iconSize, version
          );
        }
        injectHtmlInEditor(html, event.target);
      }
    });

    return dialogFragment;
  }

  /**
   * Get the hero data from the hero's ID. Searches for the hero ID first in the
   * live data, then in the PTR data.
   * @param {string} heroId Hero ID string
   * @param {boolean} preferPtr If truthy, use the PTR data first.
   * @return {Hero} Selected hero object
   */
  function getHeroDataById(heroId, preferPtr = false) {
    const data = HotsDialog.data;
    if (preferPtr) return data.ptrHeroes[heroId] || data.heroes[heroId];
    return data.heroes[heroId] || data.ptrHeroes[heroId];
  }

  /**
   * Updates the hero icons, filtered by `heroFilterCheckboxes`.
   * @param {Iterable<Element>} heroIconElems Array of hero icon elements
   * @param {Iterable<HTMLInputElement>} heroFilterCheckboxes Array of checkbox
   *    <input> elements
   * @param {Object<string, Hero>} heroes All heroes in the live server
   * @param {Object<string, Hero>} ptrHeroes New or changed heroes in the PTR
   * @param {boolean} selectPtrOnly If truthy, only highlight heroes that are
   *    new or changed in the PTR
   */
  function updateHeroIcons(
    heroIconElems, heroFilterCheckboxes, heroes, ptrHeroes, selectPtrOnly
  ) {
    // Generate a collection of active filters
    const activeFilters = {};

    for (const filterType in HotsDialog.heroFilters) {
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

  /**
   * Retrieve the Heroes of the Storm version string for the dataset.
   * @param {boolean} isPtr If truthy, return the PTR version string instead.
   * @return {string} HotS version string
   */
  function getHotsVersion(isPtr = false) {
    return isPtr ? HotsDialog.data.hotsPtrVersion : HotsDialog.data.hotsVersion;
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = buildDialogContent;
  } else {
    // Browser globals
    root.HotsDialog.buildDialogContent = buildDialogContent;
  }

  /**
   * Injects the given HTML string into the WYSIWYG editor, at the selection
   * which was saved when the dialog was launched.
   * @param {string} html HTML string
   * @param {Element} eventTarget Element that was triggered by the user
   */
  function injectHtmlInEditor(html, eventTarget) {
    const injectedElements = HotsDialog.paster.paste(html);
    const { left: endX, top: endY } =
    HotsDialog.util.getOffsetToViewport(injectedElements[0]);

    HotsDialog.util.animateFlyingBox(eventTarget, endX, endY);
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
