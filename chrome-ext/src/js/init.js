/**
 * Initialization script for Chrome extension
 */

'use strict';

//Global constants
const ALARM_UPDATE_DATA = 'UPDATE_HOTS_DATA';

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
      const level = parseInt(talentLevel);
      hero.talents[talentLevel].forEach(talent => {
        if (!talent.iconUrl) talent.iconUrl = missingIconUrl;
        talent.level = level;
      });
    }
  }

  return heroData;
}

/**
 * Asynchronously retrieves and updates HotS data from the "API server"
 */
function updateDataFromApiServer() {
  $.get("https://pastelmind.github.io/ruliweb-hots/heroes.json", heroes => {
    console.debug('Data download successful');

    prepareHeroData(heroes);
    chrome.storage.local.set({ heroes }, () => {
      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;

      console.debug('Data load successful');
    });
  }, 'json');
}


//Things that should be called only once when installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "ruli-context-menu",
    "title": "히오스 공략툴 열기",
    "contexts": ["frame"],
    "documentUrlPatterns": ["about:blank"]
  });

  //Load pre-packaged hero data
  $.get(chrome.runtime.getURL('data/heroes.json'), heroes => {
    prepareHeroData(heroes);
    chrome.storage.local.set({ heroes }, () => {
      //Attempt an update immediately
      updateDataFromApiServer();

      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;
    });
  }, 'json');

  //Load templates
  const templateNames = ['dialog', 'dialog-skills', 'dialog-talents', 'insert-hero', 'insert-skill', 'insert-talent'];
  const templates = {};

  //Create a resolved Deferred object
  let prom = $.Deferred().resolve();

  //Chain then() calls to sequentially retrieve templates
  while (templateNames.length) {
    const templateName = templateNames.pop();
    prom = prom.then(() => {
      return $.get(chrome.runtime.getURL(`templates/${templateName}.mustache`), null, 'text')
        .then(template => {
          templates[templateName] = template;
        });
    });
  }

  //Finish by loading the templates into local storage
  prom = prom.then(() => {
    chrome.storage.local.set({ templates }, () => {
      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;
    });
  });

  //Clear and setup an alarm to update the ID.
  chrome.alarms.clear(ALARM_UPDATE_DATA, wasCleared => {
    console.debug('Previous alarm has ' + (wasCleared ? '' : 'not ') + 'been cleared.');
    chrome.alarms.create(ALARM_UPDATE_DATA, {
      delayInMinutes: 1,
      periodInMinutes: 360  //6 hours = 360 minutes
    });
  });
});


//Things that should be done whenever the background page loads
//See quotes from:
//  https://bugs.chromium.org/p/chromium/issues/detail?id=316315#c3
//  https://stackoverflow.com/a/19915752/
//
//  Because the listeners themselves only exist in the context of the event
//  page, you must use addListener each time the event page loads; only doing so
//  at runtime.onInstalled by itself is insufficient.

//Register an event listener for the right-click menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.pageUrl && info.pageUrl.includes('.ruliweb.com/')) {
    chrome.tabs.executeScript({ code: "openHotsDialog();" });
  }
  else
    alert('루리웹에서만 실행할 수 있습니다.');
});

//Register an event listener for the alarm.
chrome.alarms.onAlarm.addListener(alarm => {
  const alarmDate = new Date();
  alarmDate.setTime(alarm.scheduledTime)
  console.debug('Received alarm:', alarm.name, 'scheduled at', alarmDate, 'with period =', alarm.periodInMinutes);
  if (alarm.name === ALARM_UPDATE_DATA)
    updateDataFromApiServer();
});