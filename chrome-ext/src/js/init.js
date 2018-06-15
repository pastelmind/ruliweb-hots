/**
 * Initialization script for Chrome extension
 */

'use strict';

/**
 * Parses hero object, fixing missing values so that content scripts can use them
 * @param {object} heroData Key-value pairs of hero ID => hero data
 * @returns {object} Fixed hero data
 */
function prepareHeroData(heroData) {
  //Default URL for missing icons
  const missingIconUrl = 'http://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png';

  for (const heroId in heroData) {
    const hero = heroData[heroId];

    hero.id = heroId;
    if (!hero.iconUrl) hero.iconUrl = missingIconUrl;

    hero.skills.forEach(skill => {
      if (!skill.iconUrl) skill.iconUrl = missingIconUrl;
    });

    for (const talentLevel in hero.talents) {
      hero.talents[talentLevel].forEach(talent => {
        if (!talent.iconUrl) talent.iconUrl = missingIconUrl;
      });
    }
  }

  return heroData;
}


//Ensure that this script is running in a Chrome extension context
if (typeof chrome !== 'undefined' && chrome.contextMenus) {
  chrome.contextMenus.create({
    "id": "ruli-context-menu",
    "title": "히오스 공략툴 열기",
    "contexts": ["frame"],
    "documentUrlPatterns": ["about:blank"]
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.pageUrl && info.pageUrl.includes('.ruliweb.com/')) {
      chrome.tabs.executeScript({ file: "js/hots-dialog.js" });
    }
    else
      alert('루리웹에서만 실행할 수 있습니다.');
  });

  //Load hero data
  $.get(chrome.runtime.getURL('heroes.json'), heroes => {
    prepareHeroData(heroes);
    chrome.storage.local.set({ heroes }, () => {
      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;
    });
  }, 'json');
}