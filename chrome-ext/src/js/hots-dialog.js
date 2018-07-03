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
   */
  launchDialog(heroes, templates) {
    //Snapshot currently selected area
    this._injector = getElementInjectorAtSelectedArea();
    this._templates = templates;

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

    const html = Mustache.render(templateHtml, {
      heroArray: Object.values(heroes),
      baseUrl: chrome.runtime.getURL('/')
    });
    $hotsDialog = $(html).appendTo(document.body);

    //Add click handler for hero icons
    $hotsDialog.find('img.hots_dialog__hero-icon').on('click', event => {
      const hero = heroes[event.target.dataset.heroId];
      console.log('Hero clicked:', hero.name);
      this._setSelectedHero($hotsDialog, hero);
    })

    //Prepare checkboxes
    $hotsDialog.find('input[type=checkbox]').checkboxradio({ icon: false });

    //Clear the skill and talent sections
    $hotsDialog.find('.hots_dialog__skills,.hots_dialog__talents').empty();

    //Add event handlers for skill and talents
    $hotsDialog.find('.hots_dialog__skills,.hots_dialog__talents').on('click', event => {
      if (!event.target || event.target.nodeName !== 'IMG') return;

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

  _createSkillImg(skill, heroId, skillIndex) {
    return $(Mustache.render(
      '<img class="hots_dialog__skill-icon" src="{{skill.iconUrl}}" alt="{{skill.type}} - {{skill.name}}" title="{{skill.type}} - {{skill.name}}" data-hero-id="{{heroId}}" data-skill-index="{{skillIndex}}">',
      { skill, heroId, skillIndex }
    ));
  },

  _createTalentImg(talent, heroId, talentLevel, talentIndex) {
    return $(Mustache.render(
      '<img class="hots_dialog__talent-icon" src="{{talent.iconUrl}}" alt="{{talent.name}} ({{talent.type}} - 레벨 {{talent.level}})" title="{{talent.name}} ({{talent.type}} - 레벨 {{talent.level}})" data-hero-id="{{heroId}}" data-talent-level="{{talentLevel}}" data-talent-index="{{talentIndex}}">',
      { talent, heroId, talentLevel, talentIndex }
    ));
  },

  _setSelectedHero($dialog, hero) {
    //Generate skills
    $dialog.children('.hots_dialog__skills').empty()
      .append(hero.skills.map((skill, index) => this._createSkillImg(skill, hero.id, index)));

    //Generate talents
    const $talents = $dialog.children('.hots_dialog__talents').empty();

    for (const talentLevel in hero.talents) {
      $(`<li class="hots_dialog__talent-group"><span class="hots_dialog__talent-group-description">${talentLevel}레벨</span></li>`)
        .append(hero.talents[talentLevel].map((talent, index) => this._createTalentImg(talent, hero.id, talentLevel, index)))
        .appendTo($talents);
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
    HotsDialog.launchDialog(hotsData.heroes, hotsData.templates);
}