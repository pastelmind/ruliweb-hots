/**
 * Initialization script for Chrome extension.
 * This script should be used only as a background script.
 */

'use strict';

/* global decorateHotsData */

// Global constants
const ALARM_UPDATE_DATA = 'UPDATE_HOTS_DATA';


// -------- main script -------- //

// Things that should be called only once (when installed)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    'id': 'ruli-context-menu',
    'title': '히오스 공략툴 열기',
    'contexts': [
      // Firefox does not recognize Ruliweb's WYSIWYG editor as a frame.
      // Therefore, create context menus on all editables instead
      typeof browser === 'undefined' ? 'frame' : 'editable',
    ],
    // Use the same patterns used for injecting content scripts
    'documentUrlPatterns':
      chrome.runtime.getManifest().content_scripts[0].matches,
  });

  // Load pre-packaged hero data
  updateDataFromUrl(chrome.runtime.getURL('data/hots.json'))
    .catch((e) => console.error(e)) // Report and consume error
    .then(updateDataFromApi); // Immediately attempt an update from API

  // Clear and setup an alarm to update the ID.
  chrome.alarms.clear(ALARM_UPDATE_DATA, (wasCleared) => {
    console.debug(
      'Previous alarm has ' + (wasCleared ? '' : 'not ') + 'been cleared.',
    );
    chrome.alarms.create(ALARM_UPDATE_DATA, {
      delayInMinutes: 180, // 3 hours = 180 minutes
      periodInMinutes: 180, // 3 hours = 180 minutes
    });
  });
});


// Things that should be done whenever the background page loads
// See quotes from:
//  https://bugs.chromium.org/p/chromium/issues/detail?id=316315#c3
//  https://stackoverflow.com/a/19915752/
//
//  Because the listeners themselves only exist in the context of the event
//  page, you must use addListener each time the event page loads; only doing so
//  at runtime.onInstalled by itself is insufficient.

// Register an event listener for the right-click menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.pageUrl && info.pageUrl.includes('.ruliweb.com/')) {
    chrome.tabs.executeScript({code: 'HotsDialog.launchDialog();'});
  } else alert('루리웹에서만 실행할 수 있습니다.');
});

// Register an event listener for the alarm.
chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmDate = new Date();
  alarmDate.setTime(alarm.scheduledTime);
  console.debug(
    'Received alarm:', alarm.name,
    'scheduled at', alarmDate,
    'with period =', alarm.periodInMinutes,
  );
  if (alarm.name === ALARM_UPDATE_DATA) updateDataFromApi();
});


// -------- Support functions -------- //

/**
 * Asynchronously retrieves HotS data from the given URL to local storage
 * @param {string} url URL to load from
 */
async function updateDataFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const {status, statusText} = response;
    throw new Error(`fetch() for ${url} failed with ${status} ${statusText}`);
  }
  const hotsData = await response.json();
  console.debug('Retrieved data from', url);

  decorateHotsData(hotsData);

  await new Promise((resolve) =>
    chrome.storage.local.set(hotsData, () => {
      if (chrome.runtime.lastError) throw chrome.runtime.lastError;

      console.debug('Loaded data from', url, 'to local storage');
      resolve();
    }),
  );
}

/**
 * Asynchronously retrieves HotS data from the "API server" to local storage.
 */
async function updateDataFromApi() {
  await updateDataFromUrl('https://pastelmind.github.io/ruliweb-hots/hots.json');
}
