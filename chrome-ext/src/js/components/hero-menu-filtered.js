/** @file Component for a menu of clickable hero icons with filters. */

import htm from "../vendor/htm.js";
import { Component, createElement } from "../vendor/preact.js";

import { HeroMenu } from "./hero-menu.js";
import { MultiSelectIcons } from "./multi-select-icons.js";

const html = htm.bind(createElement);

/**
 * @typedef {import("../decorate-hots-data.js").DecoratedHero} DecoratedHero
 */

/**
 * @template T
 * @typedef {T[keyof T]} ValueOf
 */

/**
 * @template T
 * @typedef {T extends any
  ? keyof T : never
} KeysOfUnion
*/

/**
 * @template T
 * @typedef {T extends any
  ? ValueOf<T> : never
} ValuesOfUnion
*/

const HERO_FILTERS = Object.freeze({
  universe: Object.freeze({
    name: "세계관",
    filters: Object.freeze({
      warcraft: "워크래프트",
      starcraft: "스타크래프트",
      diablo: "디아블로",
      classic: "블리자드 고전",
      overwatch: "오버워치",
    }),
  }),
  newRole: Object.freeze({
    name: "역할",
    filters: Object.freeze({
      tank: "전사",
      bruiser: "투사",
      ranged_assassin: "원거리 암살자",
      melee_assassin: "근접 암살자",
      healer: "치유사",
      support: "지원가",
    }),
  }),
});

/**
 * @typedef {DecoratedHero["newRole"]} RoleType
 * @typedef {DecoratedHero["universe"]} UniverseType
 */

/**
 * @typedef {object} Heroish Hero-ish object
 * @property {string} iconUrl
 * @property {string} name
 * @property {string} roleName
 * @property {RoleType} newRole
 * @property {UniverseType} universe
 */

/**
 * @typedef {object} Props
 * @property {{ [id: string]: Heroish }} heroes
 * @property {{ [id: string]: Heroish }} ptrHeroes
 * @property {boolean} shouldUsePtr If truthy, only heroes in the PTR are
 *    highlighted, and icon URLs, titles, roles, and universes are taken from
 *    PTR data first.
 * @property {(id: string) => void} onClickHero Called when the user clicks on a
 *    hero icon.
 * @property {string=} class Additional CSS classes to apply on the root
 *    component.
 */

/**
 * @typedef {object} State
 * @property {Record<RoleType, boolean>} newRole
 * @property {Record<UniverseType, boolean>} universe
 */

/**
 * A menu of clickable, filterable hero icons.
 * @extends {Component<Props, State>}
 */
export class HeroMenuFiltered extends Component {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);

    /** @type {State} */
    this.state = {
      newRole: /** @type {State["newRole"]} */ ({}),
      universe: /** @type {State["universe"]} */ ({}),
    };

    // Initially, all filters are active
    for (const type of objectKeys(HERO_FILTERS.newRole.filters)) {
      this.state.newRole[type] = true;
    }
    for (const type of objectKeys(HERO_FILTERS.universe.filters)) {
      this.state.universe[type] = true;
    }
  }

  // eslint-disable-next-line valid-jsdoc -- TypeScript syntax
  /**
   * @param {keyof State} filterId Filter type
   * @param {ValueOf<State>} activeFilters Selected filter IDs
   */
  setActiveFilter(filterId, activeFilters) {
    this.setState((state) => ({ ...state, [filterId]: activeFilters }));
  }

  /**
   * @return {preact.VNode<Props>}
   */
  render() {
    const { heroes, ptrHeroes } = this.props;

    /** @type {preact.ComponentProps<typeof HeroMenu>} */
    const heroMenuProps = {
      icons: Array.from(
        new Set([...Object.keys(heroes), ...Object.keys(ptrHeroes)]),
        (heroId) => {
          const liveHero = heroes[heroId];
          const ptrHero = ptrHeroes[heroId];
          const hero = this.props.shouldUsePtr
            ? ptrHero || liveHero
            : liveHero || ptrHero;

          return {
            id: heroId,
            url: hero.iconUrl,
            title: `${hero.name} (${hero.roleName})`,
            // If a filter set is empty, don't check it
            // Nexus-original heroes do not have a separate filter icon.
            // Instead, they are selected when "classic" is active
            isHighlighted:
              !(this.props.shouldUsePtr && !ptrHero) &&
              this.state.newRole[hero.newRole] &&
              (this.state.universe[hero.universe] ||
                (hero.universe === "nexus" && this.state.universe["classic"])),
            ptrStatus: ptrHero
              ? liveHero
                ? _c("changed")
                : _c("new")
              : undefined,
            // For sorting only; not used by HeroMenu.
            _sortBy: hero.name,
          };
        }
      ).sort((a, b) => a._sortBy.localeCompare(b._sortBy, "en")),
      onClickHero: this.props.onClickHero,
    };

    return /** @type {preact.VNode<Props>} */ (html`
      <div class="hots-dialog-hero-menu-filtered ${this.props.class}">
        <div class="hots-hero-filters">
          ${objectEntries(HERO_FILTERS).map(([filterId, filterInfo]) => {
            const filterStates = this.state[filterId];

            return html`
              <div class="hots-hero-filter-group">
                <div class="hots-hero-filter-group__description">
                  ${filterInfo.name}:
                </div>
                <${MultiSelectIcons}
                  options=${objectEntries(filterInfo.filters).map(
                    ([id, name]) => ({
                      id,
                      name,
                      url: chrome.runtime.getURL(
                        `/images/${filterId}-${id}.png`
                      ),
                      isSelected:
                        filterStates[/** @type {keyof filterStates} */ (id)],
                    })
                  )}
                  onSelectChange=${this.setActiveFilter.bind(this, filterId)}
                />
              </div>
            `;
          })}
        </div>
        <${HeroMenu} class="hots-dialog__section" ...${heroMenuProps} />
      </div>
    `);
  }
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @template T
 * @param {T} o
 * @return {KeysOfUnion<T>[]}
 */
function objectKeys(o) {
  return /** @type {KeysOfUnion<T>[]} */ (Object.keys(o));
}

/**
 * Returns `Object.entries(o)` coerced to an array of tuples of
 * `[KeyType, ValueType]`.
 *
 * Note: This is slightly different from the "type-util.js" version.
 * @template T
 * @param {T} o
 * @return {[KeysOfUnion<T>, ValuesOfUnion<T>][]}
 */
export function objectEntries(o) {
  return /** @type {[KeysOfUnion<T>, ValuesOfUnion<T>][]} */ (Object.entries(
    o
  ));
}

/**
 * Helper function that coerces string/number literals to literal types.
 *
 * Note: Duplicated here from "type-util.js" because I don't want to import it.
 * @template {string | number} T
 * @param {T} v
 * @return {T}
 */
function _c(v) {
  return v;
}
