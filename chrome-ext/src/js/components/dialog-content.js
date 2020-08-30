/** @file Component representing the dialog content. */

/**
 * @typedef {import('../hots-dialog-paster').HtmlPaster} HtmlPaster
 * @typedef {import('../hots-dialog-renderer').Renderer} Renderer
 * @typedef {import("../decorate-hots-data.js").DecoratedHero} DecoratedHero
 * @typedef {import("../decorate-hots-data.js").DecoratedHotsData} DecoratedHotsData
 * @typedef {import("../decorate-hots-data.js").DecoratedSkill} DecoratedSkill
 * @typedef {import("../decorate-hots-data.js").DecoratedTalent} DecoratedTalent
 * @typedef {import("../hots-dialog.js").ActiveFilters} ActiveFilters
 * @typedef {import("../hots-dialog.js").HeroFilterPresets} HeroFilterPresets
 * @typedef {import("../hots-dialog.js").HeroFilterType} HeroFilterType
 * @typedef {import("../hots-dialog.js").HeroFilterValues} HeroFilterValues
 */

import htm from "../vendor/htm.js";
import { Component, createElement } from "../vendor/preact.js";

import { HeroMenu } from "./hero-menu.js";
import { HotsBoxMenu } from "./hots-box-menu.js";
import { MultiSelectIcons } from "./multi-select-icons.js";

const html = htm.bind(createElement);

/**
 * @typedef {object} Props
 * @property {DecoratedHotsData} data HotS data object
 * @property {HeroFilterPresets} heroFilters Mapping of hero filter IDs
 *    to hero filters
 * @property {Renderer} renderer Renderer for generating HotsBoxes
 * @property {HtmlPaster} paster Paster for pasting HotsBoxes
 */

/**
 * @typedef {object} State
 * @property {ActiveFilters} activeFilters
 * @property {DecoratedHero | null} currentHero
 * @property {boolean} shouldAddHotsVersion
 * @property {boolean} shouldUsePtr
 * @property {boolean} shouldUseSimpleHeroBox
 * @property {number} iconSize
 */

/**
 * Dialog content component.
 * @extends {preact.Component<Props, State>}
 */
export class DialogContent extends Component {
  /** @param {Props} props */
  constructor(props) {
    super(props);

    /** @type {State} */
    this.state = {
      activeFilters: { universe: [], newRole: [] },
      currentHero: null,
      shouldAddHotsVersion: true,
      shouldUsePtr: false,
      shouldUseSimpleHeroBox: false,
      iconSize: 48,
    };
  }

  // eslint-disable-next-line valid-jsdoc -- TypeScript syntax
  /**
   * Sets a boolean state based on an event originating from a checkbox.
   * @param {keyof State} stateId Name of the state variable
   * @param {Event} event originating from a checkbox
   */
  setCheckboxState(stateId, event) {
    if (event.target) {
      this.setState({
        [stateId]: /** @type {HTMLInputElement} */ (event.target).checked,
      });
    }
  }

  /**
   * Sets the `shouldUsePtr` state.
   * @param {boolean} shouldUsePtr New value of `shouldUsePtr`
   */
  setShouldUsePtr(shouldUsePtr) {
    let { currentHero } = this.state;
    if (currentHero) {
      const { heroes, ptrHeroes } = this.props.data;
      const liveHero = heroes[currentHero.id];
      const ptrHero = ptrHeroes[currentHero.id];
      currentHero = shouldUsePtr ? ptrHero || liveHero : liveHero || ptrHero;
    }
    this.setState({ currentHero, shouldUsePtr });
  }

  /**
   * Sets a boolean state based on an event originating from a checkbox.
   * @param {number | string} iconSize Icon size
   */
  setIconSize(iconSize) {
    this.setState({ iconSize: +iconSize });
  }

  // eslint-disable-next-line valid-jsdoc -- TypeScript syntax
  /**
   * Sets a boolean state based on an event originating from a checkbox.
   * @template {HeroFilterType} T
   * @param {T} filterType Filter type
   * @param {HeroFilterValues[T][]} selectedFilters Selected filter IDs
   */
  setActiveFilter(filterType, selectedFilters) {
    this.setState((state) => ({
      ...state,
      activeFilters: {
        ...state.activeFilters,
        [filterType]: selectedFilters,
      },
    }));
  }

  /** @return {{iconSize: number, version: string}} */
  getPasteParams() {
    const { iconSize, shouldAddHotsVersion, shouldUsePtr } = this.state;
    let version = "";
    if (shouldAddHotsVersion) {
      const { data } = this.props;
      version = (shouldUsePtr ? data.hotsPtrVersion : data.hotsVersion) || "";
    }
    return { iconSize, version };
  }

  /**
   * @param {DecoratedHero} hero
   * @return {Element[]}
   */
  pasteHero(hero) {
    const { iconSize, version } = this.getPasteParams();
    const { paster, renderer } = this.props;
    const html = renderer.renderHeroInfoTable(
      hero,
      iconSize,
      iconSize,
      version,
      this.state.shouldUseSimpleHeroBox
    );
    return paster.paste(html);
  }

  /**
   * @param {DecoratedSkill} skill
   * @return {Element[]}
   */
  pasteSkill(skill) {
    const { iconSize, version } = this.getPasteParams();
    const { paster, renderer } = this.props;
    const html = renderer.renderSkillInfoTable(skill, iconSize, version);
    return paster.paste(html);
  }

  /**
   * @param {DecoratedTalent} talent
   * @return {Element[]}
   */
  pasteTalent(talent) {
    const { iconSize, version } = this.getPasteParams();
    const { paster, renderer } = this.props;
    const html = renderer.renderTalentInfoTable(talent, iconSize, version);
    return paster.paste(html);
  }

  /**
   * @param {DecoratedTalent[]} talentGroup
   * @return {Element[]}
   */
  pasteTalentGroup(talentGroup) {
    const { iconSize, version } = this.getPasteParams();
    const { paster, renderer } = this.props;
    const html = renderer.renderTalentGroupInfoTable(
      talentGroup,
      iconSize,
      version
    );
    return paster.paste(html);
  }

  /** @return {preact.VNode<Props>} */
  render() {
    // Check if PTR data is available
    const { data, heroFilters } = this.props;
    const isPtrAvailable = !!(
      data.ptrHeroes && Object.keys(data.ptrHeroes).length
    );

    const activeRoleFilters = new Set(this.state.activeFilters.newRole);
    /** @type {Set<DecoratedHero["universe"]>} */
    const activeUniverseFilters = new Set(this.state.activeFilters.universe);

    // Nexus-original heroes do not have a separate filter icon. Instead, they
    // are selected when "classic" heroes are selected
    if (activeUniverseFilters.has("classic")) {
      activeUniverseFilters.add("nexus");
    }

    /** @type {preact.ComponentProps<typeof HeroMenu>} */
    const heroMenuProps = {
      icons: Array.from(
        new Set([...Object.keys(data.heroes), ...Object.keys(data.ptrHeroes)]),
        (heroId) => {
          const liveHero = data.heroes[heroId];
          const ptrHero = data.ptrHeroes[heroId];
          const hero = this.state.shouldUsePtr
            ? ptrHero || liveHero
            : liveHero || ptrHero;

          return {
            id: heroId,
            url: hero.iconUrl,
            title: `${hero.name} (${hero.roleName})`,
            // If a filter set is empty, don't check it
            isHighlighted:
              (activeRoleFilters.size === 0 ||
                activeRoleFilters.has(hero.newRole)) &&
              (activeUniverseFilters.size === 0 ||
                activeUniverseFilters.has(hero.universe)),
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
      onClickHero: (heroId) =>
        this.setState((state, { data }) => ({
          currentHero: state.shouldUsePtr
            ? data.ptrHeroes[heroId] || data.heroes[heroId]
            : data.heroes[heroId] || data.ptrHeroes[heroId],
        })),
    };

    /** @type {preact.ComponentProps<typeof HotsBoxMenu>} */
    const hotsBoxMenuProps = {
      hero: this.state.currentHero,
      onPasteHero: (hero) => this.pasteHero(hero),
      onPasteSkill: (skill) => this.pasteSkill(skill),
      onPasteTalent: (talent) => this.pasteTalent(talent),
      onPasteTalentGroup: (talents) => this.pasteTalentGroup(talents),
    };

    return /** @type {preact.VNode<Props>} */ (html`
      <div class="hots-dialog">
        <div class="hots-dialog__section hots-dialog-options">
          <label class="hots-dialog-option hots-dialog-option--checkbox">
            <input
              type="checkbox"
              checked=${this.state.shouldAddHotsVersion}
              onInput=${this.setCheckboxState.bind(
                this,
                "shouldAddHotsVersion"
              )}
            />
            <span class="hots-dialog-option__description">
              히오스 패치 버전 포함
            </span>
          </label>
          <label
            class="hots-dialog-option hots-dialog-option--checkbox"
            aria-label="${isPtrAvailable
              ? "PTR 서버 패치 정보를 사용합니다"
              : "PTR 서버 패치 정보가 없습니다"}"
            data-microtip-position="top"
            role="tooltip"
          >
            <input
              type="checkbox"
              disabled=${!isPtrAvailable}
              checked=${this.state.shouldUsePtr}
              onInput=${(/** @type {MouseEvent} */ e) =>
                e.target &&
                this.setShouldUsePtr(
                  /** @type {HTMLInputElement} */ (e.target).checked
                )}
            />
            <span class="hots-dialog-option__description">PTR 적용</span>
          </label>
          <label
            class="hots-dialog-option hots-dialog-option--checkbox"
            data-microtip-position="top"
            role="tooltip"
            aria-label="${"영웅의 기술을 간략하게 표시하고 능력치를 생략합니다.\n" +
            "여러 개의 영웅 표를 넣을 때 용량을 아낄 수 있습니다."}"
          >
            <input
              type="checkbox"
              checked=${this.state.shouldUseSimpleHeroBox}
              onInput=${this.setCheckboxState.bind(
                this,
                "shouldUseSimpleHeroBox"
              )}
            />
            <span class="hots-dialog-option__description">
              간단한 영웅 표 생성
            </span>
          </label>
          <div class="hots-dialog-option-group">
            <label class="hots-dialog-option">
              <span class="hots-dialog-option__description">
                입력할 아이콘 크기
              </span>
              <input
                type="range"
                min="32"
                max="64"
                step="8"
                value=${this.state.iconSize}
                onInput=${(/** @type {Event} */ e) =>
                  e.target &&
                  this.setIconSize(
                    /** @type {HTMLInputElement} */ (e.target).value
                  )}
              />
              <output class="hots-dialog-option__description">
                ${this.state.iconSize} × ${this.state.iconSize}px
              </output>
            </label>
          </div>
        </div>

        <div class="hots-dialog__section hots-hero-filters">
          ${Object.keys(heroFilters).map((_filterType) => {
            const filterType = /** @type {HeroFilterType} */ (_filterType);

            /** @type {MultiSelectIcons<HeroFilterValues[filterType]>["props"]} */
            const multiSelectIconsProps = {
              options: Object.entries(heroFilters[filterType].filters).map(
                ([id, name]) => ({
                  id: /** @type {HeroFilterValues[filterType]} */ (id),
                  name,
                  iconUrl: chrome.runtime.getURL(
                    `/images/${filterType}-${id}.png`
                  ),
                })
              ),
              onSelectChange: (sel) => this.setActiveFilter(filterType, sel),
            };

            return html`
              <div class="hots-hero-filter-group">
                <div class="hots-hero-filter-group__description">
                  ${heroFilters[filterType].name}:
                </div>
                <${MultiSelectIcons} ...${multiSelectIconsProps} />
              </div>
            `;
          })}
        </div>

        <${HeroMenu} ...${heroMenuProps} />
        <${HotsBoxMenu} ...${hotsBoxMenuProps} />
        <div class="hots-dialog__section hots-dialog-version">
          루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}
        </div>
      </div>
    `);
  }
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
