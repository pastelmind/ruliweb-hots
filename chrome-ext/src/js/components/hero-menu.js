/** @file Component for a menu of clickable hero icons. */
'use strict';

/**
 * @typedef {import("../../../../api/src/hero")} Hero
 */

((root, require) => {
  const isNodeJs = typeof require === 'function';
  /** @type {import('htm')} */
  const htm = isNodeJs ? require('htm') : root.htm;
  /** @type {import('preact')} */
  const preact = isNodeJs ? require('preact') : root.preact;

  const html = htm.bind(preact.createElement);

  /**
   * A menu of clickable hero icons.
   * @param {Object} props
   * @param {Object<string, Hero>} props.heroes Mapping of hero IDs to Hero
   *    objects, for live server data
   * @param {Object<string, Hero>} props.ptrHeroes Mapping of hero IDs to Hero
   *    objects, for PTR server data
   * @param {Object<string, string[]>} props.activeFilters Maps filter types to
   *    arrays of active filter IDs
   * @param {boolean} props.ptrMode If truthy, only heroes added or changed in
   *    PTR are highlighted, and their PTR data is passed to `onClickHero`.
   * @param {function (Hero): undefined} props.onClickHero Called when the
   *    user clicks on a hero. Argument is the clicked Hero object.
   * @return {Object} DOM content to render
   */
  function HeroMenu(props) {
    const { heroes, ptrHeroes, activeFilters, ptrMode, onClickHero } = props;

    const activeFilterSets = {};
    for (const [filterType, filters] of Object.entries(activeFilters)) {
      const filterSet = activeFilterSets[filterType] = new Set(filters);
      // Workaround for Nexus-original heroes
      if (filterSet.has('classic')) filterSet.add('nexus');
    }

    const icons = Object.values(Object.assign({}, heroes, ptrHeroes))
      .sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, 'en'))
      .map(({ id: heroId }) => {
        const liveHero = heroes[heroId];
        const ptrHero = ptrHeroes[heroId];
        const hero = ptrMode ? (ptrHero || liveHero) : (liveHero || ptrHero);

        let tooltip = `${hero.name} (${hero.roleName})`;
        if (ptrHero) {
          if (liveHero) tooltip += '\n이 영웅은 PTR에서 변경되었습니다';
          else tooltip += '\n이 영웅은 PTR에 추가되었습니다';
        }

        let isHighlighted = true;
        if (ptrMode && !ptrHero) isHighlighted = false;
        else isHighlighted = canHeroPassFilters(hero, activeFilterSets);

        return html`
          <div class="hots-hero-icon-wrapper" aria-label="${tooltip}"
            data-microtip-position="top" role="tooltip">
            <img class="hots-hero-icon
              ${!isHighlighted && 'hots-hero-icon--excluded'}"
              src="${hero.iconUrl}" alt="${`${hero.name} (${hero.roleName})`}"
              onClick="${() => onClickHero(hero)}"/>
            ${ptrHero && html`
              <span class="hots-hero-icon-badge
                hots-hero-icon-badge--${liveHero ? 'ptr-changes' : 'new'}">
                ${liveHero ? 'PTR' : 'NEW'}
              </span>
            `}
          </div>
        `;
      });

    return html`
      <div class="hots-dialog__section hots-hero-icons">${icons}</div>
    `;
  }

  /**
   * Tests a hero against a set of active filters.
   * @param {Hero} hero Hero object to test
   * @param {Object<string, Set<string>>} activeFilters Mapping of filter types
   *    to set of active filter IDs
   * @return {boolean}
   */
  function canHeroPassFilters(hero, activeFilters) {
    for (const [filterType, filterSet] of Object.entries(activeFilters)) {
      if (!filterSet.size) continue; // Skip filterSet if empty

      const heroAttribute = hero[filterType];
      if (!filterSet.has(heroAttribute)) return false;
    }
    return true;
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = HeroMenu;
  } else {
    // Browser globals
    const HotsDialog = (root.HotsDialog = root.HotsDialog || {});
    const components = (HotsDialog.components = HotsDialog.components || {});
    components.HeroMenu = HeroMenu;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
