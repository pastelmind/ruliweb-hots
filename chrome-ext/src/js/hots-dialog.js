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

  return element => {
    if (range.startContainer.nodeName == 'HTML') { //Weird edge case
      console.debug('<html> tag is selected, using <body> instead...');
      selectedWindow.document.body.appendChild(element);
    }
    else
      range.insertNode(element);

    selectedWindow.getSelection().collapse(null); //Deselect inserted HTML
  };
}

var HotsDialog = {
  /**
   * 영웅 선택창을 연다.
   * @param {array} heroes 영웅 데이터
   */
  launchDialog(heroes) {
    //Generate skill description
    //TODO: retrieve template only if dialog has not been generated yet
    //TODO: rename html/ dir to templates/ dir
    $.get(chrome.runtime.getURL('html/dialog.html'), (htmlTemplate) => {
      const $hotsDialog = this.buildDialog(htmlTemplate, heroes);

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
    }, 'text');
  },

  /**
   * 영웅 선택창을 만들기 위한 DIV를 생성하여 현재 문서에 추가한다.
   * 이미 DIV가 존재할 경우 가져오기만 하고 생성하지 않는다.
   * @param {string} templateHtml 선택창을 만들기 위한 HTML 템플릿
   * @param {object} heroes Key-value pairings of the form: hero ID => hero data
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

    return $hotsDialog;
  },

  _createSkillImg(skill) {
    return $(Mustache.render(
      '<img class="hots_dialog__skill-icon" src="{{iconUrl}}" alt="{{type}} - {{name}}" title="{{type}} - {{name}}">',
      skill
    )).on('click', () => {
      console.log('Skill clicked:', skill.name);
    });
  },

  _createTalentImg(talent) {
    return $(Mustache.render(
      '<img class="hots_dialog__talent-icon" src="{{iconUrl}}" alt="{{name}} ({{type}} - 레벨 {{level}})" title="{{name}} ({{type}} - 레벨 {{level}})">',
      talent
    )).on('click', () => {
      console.log('Talent clicked:', talent.name);
    });
  },

  _setSelectedHero($dialog, hero) {
    //Generate skills
    $dialog.children('.hots_dialog__skills').empty()
      .append(hero.skills.map(this._createSkillImg));

    //Generate talents
    const $talents = $dialog.children('.hots_dialog__talents').empty();

    for (const talentLevel in hero.talents) {
      $(`<li class="hots_dialog__talent-group"><span class="hots_dialog__talent-group-description">${talentLevel}레벨</span></li>`)
        .append(hero.talents[talentLevel].map(this._createTalentImg))
        .appendTo($talents)
    }
  }
};


//실제 실행용 스크립트
//이 스크립트를 브라우저에서도 실행 가능하게 함
if (typeof chrome !== 'undefined' && chrome.storage) {
  const injectHtml = getElementInjectorAtSelectedArea();

  chrome.storage.local.get('heroes', (data) => {
    const heroes = data['heroes'];

    if (chrome.runtime.lastError)
      throw chrome.runtime.lastError;

    HotsDialog.launchDialog(heroes, heroId => {
      $.get(chrome.runtime.getURL('html/template-hero.html'), htmlTemplate => {
        const table = HtmlGenerator.generateHeroHtml(htmlTemplate, heroes[heroId], '34.1');
        injectHtml(table);
      }, 'text');
    });
  });
}