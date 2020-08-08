/** @file Component for a menu of clickable hero icons. */

/**
 * @typedef {import("../../../../api/src/hero").Hero} Hero
 */

import htm from "../vendor/htm.js";
import { createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/**
 * @typedef {import("../hots-dialog.js").HeroFilterType} HeroFilterType
 * @typedef {import("../hots-dialog.js").ActiveFilters} ActiveFilters
 */

/**
 * @typedef {{ [K in HeroFilterType]: Set<Hero[K]> }} ActiveFilterSets
 */

/**
 * @typedef {object} Props
 * @property {Object<string, Hero>} heroes Mapping of hero IDs to Hero objects
 *    for live server data
 * @property {Object<string, Hero>} ptrHeroes Mapping of hero IDs to Hero
 *    objects for PTR server data
 * @property {ActiveFilters} activeFilters Maps filter types to arrays of active
 *    filter IDs
 * @property {boolean} ptrMode If truthy, only heroes added or changed in PTR
 *    are highlighted, and their PTR data is passed to `onClickHero`.
 * @property {(hero: Hero) => void} props.onClickHero Called when the user
 *    clicks on a hero. Argument is the clicked Hero object.
 */

/**
 * A menu of clickable hero icons.
 * @param {Props} props
 * @return {preact.VNode<Props>} DOM content to render
 */
export function HeroMenu(props) {
  const { heroes, ptrHeroes, activeFilters, ptrMode, onClickHero } = props;

  /** @type {ActiveFilterSets} */
  const activeFilterSets = {
    universe: new Set(activeFilters.universe),
    newRole: new Set(activeFilters.newRole),
  };

  // Workaround for Nexus-original heroes
  if (activeFilterSets.universe.has("classic")) {
    activeFilterSets.universe.add("nexus");
  }

  const icons = Object.values(Object.assign({}, heroes, ptrHeroes))
    .sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, "en"))
    .map(({ id: heroId }) => {
      const liveHero = heroes[heroId];
      const ptrHero = ptrHeroes[heroId];
      const hero = ptrMode ? ptrHero || liveHero : liveHero || ptrHero;

      let tooltip = `${hero.name} (${hero.roleName})`;
      if (ptrHero) {
        if (liveHero) tooltip += "\n이 영웅은 PTR에서 변경되었습니다";
        else tooltip += "\n이 영웅은 PTR에 추가되었습니다";
      }

      let isHighlighted = true;
      if (ptrMode && !ptrHero) isHighlighted = false;
      else isHighlighted = canHeroPassFilters(hero, activeFilterSets);

      return html`
        <div
          class="hots-hero-icon-wrapper"
          aria-label="${tooltip}"
          data-microtip-position="top"
          role="tooltip"
        >
          <img
            class="hots-hero-icon
            ${!isHighlighted && "hots-hero-icon--excluded"}"
            src="${hero.iconUrl}"
            alt="${`${hero.name} (${hero.roleName})`}"
            onClick="${() => onClickHero(hero)}"
          />
          ${ptrHero &&
          html`
            <span
              class="hots-hero-icon-badge
              hots-hero-icon-badge--${liveHero ? "ptr-changes" : "new"}"
            >
              ${liveHero ? "PTR" : "NEW"}
            </span>
          `}
        </div>
      `;
    });

  return /** @type {preact.VNode<Props>} */ (html`
    <div class="hots-dialog__section hots-hero-icons">${icons}</div>
  `);
}

/**
 * Tests a hero against a set of active filters.
 * @param {Hero} hero Hero object to test
 * @param {ActiveFilterSets} activeFilters
 * @return {boolean}
 */
function canHeroPassFilters(hero, activeFilters) {
  for (const [_filterType, filterSet] of Object.entries(activeFilters)) {
    const filterType = /** @type {HeroFilterType} */ (_filterType);
    if (!filterSet.size) continue; // Skip filterSet if empty

    const heroAttribute = hero[filterType];
    if (!filterSet.has(heroAttribute)) return false;
  }
  return true;
}
