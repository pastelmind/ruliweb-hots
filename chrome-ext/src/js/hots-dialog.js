/**
 * Constructs the HotS hero/skill/talent selection dialog.
 */

'use strict';

/**
 * A collection of data that represents a skill.
 * @typedef {Object<string, *>} Skill
 */

/**
 * A collection of data that represents a talent.
 * @typedef {Object<string, *>} Talent
 */

/**
 * A collection of data that represents a hero.
 * @typedef {{skills: Skill[], talents: Object<number, Talent[]>}} Hero
 */

/**
 * 현재 선택된 위치에 HTML을 주입할 수 있는 콜백 함수를 생성한다.
 * @return {function} 현재 선택된 위치에 HTML을 주입할 수 있는 콜백 함수 (인자로 Element를 넘길 것)
 */
function getElementInjectorAtSelectedArea() {
  let selectedWindow = null;
  for (let i = 0; i < window.length; ++i) {
    if (window[i].getSelection().rangeCount) {
      selectedWindow = window[i];
      break;
    }
  }

  if (!selectedWindow)
    throw new Error('선택된 프레임을 찾을 수 없습니다.');

  const range = selectedWindow.getSelection().getRangeAt(0);

  return htmlFragment => {
    const rootElement = $(htmlFragment)[0];
    if (range.startContainer.nodeName == 'HTML') { //Weird edge case
      console.debug('<html> tag is selected, using <body> instead...');
      selectedWindow.document.body.appendChild(rootElement);
    }
    else
      range.insertNode(rootElement);

    selectedWindow.getSelection().collapse(null); //Deselect inserted HTML
  };
}

var HotsDialog = {
  _injector: null,

  /**
   * Launch the hero/skill/talent selection dialog
   * @param {Object} heroes Key-value mappings of the form: hero ID => hero data
   * @param {Object} templates Key-value mappings of the form: template name => template string
   * @param {function} injector Callback that injects the given HTML fragment into the appropriate position
   */
  launchDialog(heroes, templates, injector) {
    //Snapshot currently selected area
    this._injector = injector;
    this._heroFilters = { universes: new Set, roles: new Set };

    //Generate skill description
    const $hotsDialog = this.buildDialog(templates, heroes);

    //Because jQuery UI stores the UI state using jQuery.data(), the dialog's
    //state is corrupted when this content script finishes execution.
    //Thus, the dialog must be created from scratch every time.
    $hotsDialog.dialog({
      modal: true,
      resizable: false,
      title: '입력할 내용을 선택하세요',
      width: 600,
      close: function () {
        //Destroy the dialog upon closing to clean up UI state
        $(this).dialog('destroy').hide();
      }
    }).dialog('open');
  },

  /**
   * 영웅 선택창을 만들기 위한 DIV를 생성하여 현재 문서에 추가한다.
   * 이미 DIV가 존재할 경우 가져오기만 하고 생성하지 않는다.
   * @param {Object<string, string>} templates Template name => template string
   * @param {object} heroes Key-value mappings of the form: hero ID => hero data
   * @return {jQuery} 생성된 DIV
   */
  buildDialog(templates, heroes) {
    let $hotsDialog = $('#hots_dialog');
    if ($hotsDialog.length) return $hotsDialog;  //Dialog already exists

    this.htmlGenerators.templates = templates;

    //Generate dialog
    const html = this.htmlGenerators.generateDialogContent();
    $hotsDialog = $(html).appendTo(document.body);

    //Add click handler for hero filters
    $hotsDialog.find('.hero-filter input[type=checkbox]').on('change', event => {
      let filterPool = null;
      switch (event.target.dataset.filterType) {
        case 'role': filterPool = this._heroFilters.roles; break;
        case 'universe': filterPool = this._heroFilters.universes; break;
        default:
          console.error(event.target.dataset.filterType, 'is an unknown filter type');
          return;
      }

      if (event.target.checked)
        filterPool.add(event.target.value);
      else
        filterPool.delete(event.target.value);

      this.updateHeroIcons($hotsDialog, heroes);
    });

    //Generate hero icons
    this.updateHeroIcons($hotsDialog, heroes);

    //Add click handler for hero icons
    $hotsDialog.find('.hots_dialog__hero-icons').on('click', event => {
      if (!(event.target && event.target.nodeName === 'IMG')) return;
      const hero = heroes[event.target.dataset.heroId];
      console.log('Hero clicked:', hero.name);
      this._setSelectedHero($hotsDialog, hero);
    });

    //Clear the skill and talent sections
    $hotsDialog.find('.hots_dialog__skills,.hots_dialog__talents').empty();

    //Add event handlers for skill and talents
    $hotsDialog.find('.hots_dialog__skills,.hots_dialog__talents').on('click', event => {
      if (!(event.target && event.target.nodeName === 'IMG')) return;

      const dataset = event.target.dataset; //Read data-* attributes

      if (!(dataset.heroId in heroes)) return;  //data-hero-id
      const hero = heroes[dataset.heroId];

      if (dataset.skillIndex in hero.skills) {  //data-skill-index
        //Is skill icon
        const skill = hero.skills[dataset.skillIndex];
        console.log('Skill clicked:', skill.name);
        this._injector(this.htmlGenerators.generateSkillInfoTable(skill, '34.1'));
      }
      else if (dataset.talentLevel in hero.talents                      //data-talent-level
        && dataset.talentIndex in hero.talents[dataset.talentLevel]) {  //data-talent-index
        //Is talent icon
        const talent = hero.talents[dataset.talentLevel][dataset.talentIndex];
        console.log('Talent clicked:', talent.name);
        this._injector(this.htmlGenerators.generateTalentInfoTable(talent, '34.1'));
      }
      else console.error('Unknown icon');
    });

    return $hotsDialog;
  },

  _setSelectedHero($dialog, hero) {
    //Generate skills
    hero.skills.forEach((skill, index) => skill.index = index);
    $dialog.children('.hots_dialog__skills').empty()
      .append(this.htmlGenerators.generateSkillIcons(hero));

    //Generate talents
    $dialog.children('.hots_dialog__talents').empty()
      .append(this.htmlGenerators.generateTalentList(hero));
  },

  /**
   * Updates the hero icons, filtered by `HotsDialog._heroFilters`.
   * @param {jQuery} $hotsDialog HotsDialog <div> element
   * @param {Object.<string, Object>} heroes key => value pairs of hero ID => hero data
   */
  updateHeroIcons($hotsDialog, heroes) {
    const filteredHeroes = [], filters = this._heroFilters;

    for (const heroId in heroes) {
      const hero = heroes[heroId];

      //Discard this hero if the universe filter is non-empty and does not match this hero
      if (filters.universes.size && !filters.universes.has(hero.universe))
        continue;

      //Discard this hero if the role filter is non-empty and does not match this hero
      if (filters.roles.size && !filters.roles.has(hero.role))
        continue;

      filteredHeroes.push(hero);
    }

    const html = this.htmlGenerators.generateHeroIcons(filteredHeroes);
    $hotsDialog.find('.hots_dialog__hero-icons').html(html);
  },

  /** Collection of methods that generate HTML source strings from templates */
  htmlGenerators: {
    /** @type {Object<string, string>} Template name => template string */
    templates: null,

    /**
     * Generates the HTML source of the main dialog.
     * @return {string} HTML source
     */
    generateDialogContent() {
      return Mustache.render(this.templates['dialog'], { baseUrl: chrome.runtime.getURL('/') });
    },

    /**
     * Generates a group of hero icons.
     * @param {Hero[]} heroes Array of hero data
     * @return {string} HTML source
     */
    generateHeroIcons(heroes) {
      return Mustache.render(this.templates['dialog-heroes'], { heroes });
    },

    /**
     * Generate a group of skill icons for the hero.
     * @param {Hero} hero Hero data
     * @return {string} HTML source
     */
    generateSkillIcons(hero) {
      return Mustache.render(this.templates['dialog-skills'], hero);
    },

    /**
     * Generate a list of talent icons for the hero, grouped by talent level.
     * @param {Hero} hero Hero data
     * @return {string} HTML source
     */
    generateTalentList(hero) {
      const talents = [];

      //Convert talent groups into nested arrays of objects
      for (const talentLevel in hero.talents) {
        talents.push({
          talentLevel,
          talentGroup: hero.talents[talentLevel].map((talent, index) => {
            talent.index = index;
            return talent;
          })
        });
      }

      return Mustache.render(this.templates['dialog-talents'], { talents, id: hero.id });
    },

    /**
     * Generates a table of skill information to be injected into a page.
     * @param {Skill} skill Skill data
     * @param {string=} hotsVersion (optional) HotS version string to display
     */
    generateSkillInfoTable(skill, hotsVersion) {
      return Mustache.render(this.templates['insert-skill'], { skill, hots_version: hotsVersion });
    },

    /**
     * Generates a table of talent information to be injected into a page.
     * @param {Talent} talent Talent data
     * @param {string=} hotsVersion (optional) HotS version string to display
     */
    generateTalentInfoTable(talent, hotsVersion) {
      return Mustache.render(this.templates['insert-talent'], { talent, hots_version: hotsVersion });
    }
  }
};

let hotsData = null;

/**
 * Load HotS data on first run and launch the Hots dialog.
 * This function is called when the right-click menu is selected.
 */
function openHotsDialog() {
  if (!hotsData) {
    chrome.storage.local.get(['heroes', 'templates'], (data) => {
      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;

      hotsData = data;  //Cache the data for subsequent calls
      openHotsDialog();
    });
  }
  else
    HotsDialog.launchDialog(hotsData.heroes, hotsData.templates, getElementInjectorAtSelectedArea());
}