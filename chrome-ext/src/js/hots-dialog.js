/**
 * Constructs the HotS hero/skill/talent selection dialog.
 */

'use strict';

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
  _templates: null,

  /**
   * Launch the hero/skill/talent selection dialog
   * @param {Object} heroes Key-value mappings of the form: hero ID => hero data
   * @param {Object} templates Key-value mappings of the form: template name => template string
   * @param {function} injector Callback that injects the given HTML fragment into the appropriate position
   */
  launchDialog(heroes, templates, injector) {
    //Snapshot currently selected area
    this._injector = injector;
    this._templates = templates;
    this._heroFilters = { universes: new Set, roles: new Set };

    //Generate skill description
    const $hotsDialog = this.buildDialog(templates['dialog'], heroes);

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
   * @param {string} templateHtml 선택창을 만들기 위한 HTML 템플릿
   * @param {object} heroes Key-value mappings of the form: hero ID => hero data
   * @return {jQuery} 생성된 DIV
   */
  buildDialog(templateHtml, heroes) {
    let $hotsDialog = $('#hots_dialog');
    if ($hotsDialog.length) return $hotsDialog;  //Dialog already exists

    //Generate dialog
    const html = Mustache.render(templateHtml, {
      baseUrl: chrome.runtime.getURL('/')
    });
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

    //Prepare checkboxes
    //$hotsDialog.find('input[type=checkbox]').checkboxradio({ icon: false });

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
        this._injector(Mustache.render(this._templates['insert-skill'], { skill, hots_version: '34.1' }));
      }
      else if (dataset.talentLevel in hero.talents                      //data-talent-level
        && dataset.talentIndex in hero.talents[dataset.talentLevel]) {  //data-talent-index
        //Is talent icon
        const talent = hero.talents[dataset.talentLevel][dataset.talentIndex];
        console.log('Talent clicked:', talent.name);
        this._injector(Mustache.render(this._templates['insert-talent'], { talent, hots_version: '34.1' }));
      }
      else console.error('Unknown icon');
    });

    return $hotsDialog;
  },

  _setSelectedHero($dialog, hero) {
    //Generate skills
    hero.skills.forEach((skill, index) => skill.index = index);
    $dialog.children('.hots_dialog__skills').empty()
      .append(Mustache.render(this._templates['dialog-skills'], hero));

    //Generate talents
    const talents = [];
    for (const talentLevel in hero.talents) {
      hero.talents[talentLevel].forEach((talent, index) => talent.index = index);
      talents.push({
        talentLevel,
        talentGroup: hero.talents[talentLevel]
      });
    }
    $dialog.children('.hots_dialog__talents').empty()
      .append(Mustache.render(this._templates['dialog-talents'], { talents, id: hero.id }));
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

    const html = Mustache.render(this._templates['dialog-heroes'], { heroes: filteredHeroes });
    $hotsDialog.find('.hots_dialog__hero-icons').html(html);
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