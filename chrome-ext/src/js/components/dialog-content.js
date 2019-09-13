/** @file Component representing the dialog content. */
'use strict';

/**
 * @typedef {import('../../../../api/src/hero')} Hero
 * @typedef {{name: string, filters: Object<string, string>}} HeroFilter
 * @typedef {import('../../../../api/src/hots-data')} HotsData
 * @typedef {import('../hots-dialog-renderer')} Renderer
 * @typedef {import('../hots-dialog-paster')} HtmlPaster
 */

((root, require) => {
  const isNodeJs = typeof require === 'function';
  /** @type {import('htm')} */
  const htm = isNodeJs ? require('htm') : root.htm;
  /** @type {import('preact')} */
  const preact = isNodeJs ? require('preact') : root.preact;
  /** @type {import('./hots-dialog')} */
  const HotsDialog = isNodeJs ?
    require('./hots-dialog') : (root.HotsDialog = root.HotsDialog || {});

  const html = htm.bind(preact.createElement);
  const { Component } = preact;

  /** Dialog content component. */
  class DialogContent extends Component {
    /**
     * @param {Object} props
     * @param {HotsData} props.data HotS data object
     * @param {Object<string, HeroFilter>} props.heroFilters Mapping of hero
     *    filter IDs to hero filters
     * @param {Renderer} props.renderer Renderer for generating HotsBoxes
     * @param {HtmlPaster} props.paster Paster for pasting HotsBoxes
     */
    constructor(props) {
      super(props);

      const activeFilters = {};
      for (const filterId of Object.keys(this.props.heroFilters)) {
        activeFilters[filterId] = [];
      }
      this.state = {
        activeFilters,
        currentHero: null,
        shouldAddHotsVersion: true,
        shouldUsePtr: false,
        shouldUseSimpleHeroBox: false,
        iconSize: 48,
      };
    }

    /**
     * Sets a boolean state based on an event originating from a checkbox.
     * @param {string} stateId Name of the state variable
     * @param {Event} event originating from a checkbox
     */
    setCheckboxState(stateId, event) {
      this.setState({ [stateId]: event.target.checked });
    }

    /**
     * Sets a boolean state based on an event originating from a checkbox.
     * @param {number | string} iconSize Icon size
     */
    setIconSize(iconSize) {
      this.setState({ iconSize: +iconSize });
    }

    /**
     * Sets a boolean state based on an event originating from a checkbox.
     * @param {string} filterType Filter type
     * @param {string[]} selectedFilters Selected filter IDs
     */
    setActiveFilter(filterType, selectedFilters) {
      this.setState(state => ({
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
      let version = '';
      if (shouldAddHotsVersion) {
        const { data } = this.props;
        version = shouldUsePtr ? data.hotsPtrVersion : data.hotsVersion;
      }
      return { iconSize, version };
    };

    /**
     * @param {Hero} hero
     * @return {Element[]}
     */
    pasteHero(hero) {
      const { iconSize, version } = this.getPasteParams();
      const { paster, renderer } = this.props;
      const html = renderer.renderHeroInfoTable(
        hero, iconSize, iconSize, version, this.state.shouldUseSimpleHeroBox
      );
      return paster.paste(html);
    };

    /**
     * @param {Skill} skill
     * @return {Element[]}
     */
    pasteSkill(skill) {
      const { iconSize, version } = this.getPasteParams();
      const { paster, renderer } = this.props;
      const html = renderer.renderSkillInfoTable(skill, iconSize, version);
      return paster.paste(html);
    };

    /**
     * @param {Talent} talent
     * @return {Element[]}
     */
    pasteTalent(talent) {
      const { iconSize, version } = this.getPasteParams();
      const { paster, renderer } = this.props;
      const html = renderer.renderTalentInfoTable(talent, iconSize, version);
      return paster.paste(html);
    };

    /**
     * @param {Talent[]} talentGroup
     * @return {Element[]}
     */
    pasteTalentGroup(talentGroup) {
      const { iconSize, version } = this.getPasteParams();
      const { paster, renderer } = this.props;
      const html = renderer.renderTalentGroupInfoTable(
        talentGroup, iconSize, version
      );
      return paster.paste(html);
    };

    /** @return {Object} DOM content to render */
    render() {
      // Check if PTR data is available
      const { data } = this.props;
      const isPtrAvailable =
        !!(data.ptrHeroes && Object.keys(data.ptrHeroes).length);

      return html`
        <div class="hots-dialog">
          <div class="hots-dialog__section hots-dialog-options">
            <label class="hots-dialog-option hots-dialog-option--checkbox">
              <input type="checkbox"
                checked=${this.state.shouldAddHotsVersion}
                onInput=${e => this.setCheckboxState('shouldAddHotsVersion', e)}/>
              <span class="hots-dialog-option__description">
                히오스 패치 버전 포함
              </span>
            </label>
            <label class="hots-dialog-option hots-dialog-option--checkbox"
              aria-label="${
                isPtrAvailable ?
                  'PTR 서버 패치 정보를 사용합니다' :
                  'PTR 서버 패치 정보가 없습니다'
              }"
              data-microtip-position="top" role="tooltip">
              <input type="checkbox"
                disabled=${!isPtrAvailable}
                checked=${this.state.shouldUsePtr}
                onInput=${e => this.setCheckboxState('shouldUsePtr', e)}/>
              <span class="hots-dialog-option__description">PTR 적용</span>
            </label>
            <label class="hots-dialog-option hots-dialog-option--checkbox"
              data-microtip-position="top" role="tooltip"
              aria-label="영웅의 기술을 간략하게 표시하고 능력치를 생략합니다.\n여러 개의 영웅 표를 넣을 때 용량을 아낄 수 있습니다.">
              <input type="checkbox"
                checked=${this.state.shouldUseSimpleHeroBox}
                onInput=${e => this.setCheckboxState('shouldUseSimpleHeroBox', e)}/>
              <span class="hots-dialog-option__description">간단한 영웅 표 생성</span>
            </label>
            <div class="hots-dialog-option-group">
              <label class="hots-dialog-option">
                <span class="hots-dialog-option__description">입력할 아이콘 크기</span>
                <input type="range" min="32" max="64" step="8"
                  value=${this.state.iconSize}
                  onInput=${e => this.setIconSize(e.target.value)}/>
                <output class="hots-dialog-option__description">
                  ${this.state.iconSize} \xD7 ${this.state.iconSize}px
                </output>
              </label>
            </div>
          </div>

          <div class="hots-dialog__section hots-hero-filters">
            ${Object.entries(this.props.heroFilters).map(([filterType, filter]) => {
              const options = Object.entries(filter.filters)
                .map(([id, name]) => ({
                  id, name,
                  iconUrl:
                    chrome.runtime.getURL(`/images/${filterType}-${id}.png`),
                }));
              return html`
                <div class="hots-hero-filter-group">
                  <div class="hots-hero-filter-group__description">
                    ${filter.name}:
                </div>
                  <${HotsDialog.components.MultiSelectIcons}
                    options=${options}
                    onSelectChange=${
                      selectedIds =>
                        this.setActiveFilter(filterType, selectedIds)
                    }
                    />
                </div>
              `;
            })}
          </div>

          <${HotsDialog.components.HeroMenu}
            heroes=${this.props.data.heroes}
            ptrHeroes=${this.props.data.ptrHeroes}
            activeFilters=${this.state.activeFilters}
            ptrMode=${this.state.shouldUsePtr}
            onClickHero=${hero => this.setState({ currentHero: hero })}
            />
          <${HotsDialog.components.HotsBoxMenu}
            hero=${this.state.currentHero}
            onPasteHero=${hero => this.pasteHero(hero)}
            onPasteSkill=${skill => this.pasteSkill(skill)}
            onPasteTalent=${talent => this.pasteTalent(talent)}
            onPasteTalentGroup=${talents => this.pasteTalentGroup(talents)}
            />
          <div class="hots-dialog__section hots-dialog-version">
            루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}
          </div>
        </div>
      `;
    }
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = DialogContent;
  } else {
    // Browser globals
    const HotsDialog = (root.HotsDialog = root.HotsDialog || {});
    const components = (HotsDialog.components = HotsDialog.components || {});
    components.DialogContent = DialogContent;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
