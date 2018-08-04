#!/usr/bin/env node

/**
 * Organizes all hero, skill, and talent images in `hots.json`.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const program = require('commander');

const { Hero } = require('./src/models');
const extractImageUrlsFromHtml = require('./src/extract-img-from-html');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//Compatibility code for Node v8
require('./src/console-assert-no-throw');


const DEFAULT_JSON_PATH = path.join(__dirname, '../docs/hots.json');


program
  .option('-i, --input-list <listfile>', 'HTML file containing <img> tags whose URLs point to hero, skill, and talent icons')
  .option('-o, --output-list [listfile]', 'Target JSON file to write to (default: same as --input-list)')
  .option('-d, --hots-data [jsonfile]', 'Source JSON file containing Heroes of the Storm data', DEFAULT_JSON_PATH)
  .parse(process.argv);


if (process.argv.length <= 2 || !program.inputList) {
  console.error('Must specify input listfile');
  program.help();
}


//-------- Main code --------//

(async () => {
  const hotsDataInput = await readFileAsync(program.hotsData, 'utf8');
  const hotsData = JSON.parse(hotsDataInput);
  const skillIconSources = compileSkillIconUsage(hotsData.heroes);

  const inputListFileContent = await readFileAsync(program.inputList, 'utf8');
  const currentIconUrlsToAltText = extractImageUrlsFromHtml(inputListFileContent);
  const currentIconUrls = Object.keys(currentIconUrlsToAltText);

  //Find unused icons in listfile
  const unusedIconUrls = currentIconUrls.filter(iconUrl => !skillIconSources.has(iconUrl));

  //Group hero-specific icons by hero name
  const { heroIcons, sharedIcons } = groupIconsByHero(skillIconSources);

  //Sort hero icons to respect order in input listfile
  for (const iconUrls of Object.values(heroIcons))
    iconUrls.sort((urlA, urlB) => currentIconUrls.indexOf(urlA) - currentIconUrls.indexOf(urlB));

  console.log(`Total: ${skillIconSources.size} skill/talent icons in ${program.hotsData}`);
  console.log(` - Shared icons: ${Object.keys(sharedIcons).length}`);

  console.log(`${currentIconUrls.length} icons in ${program.inputList}`);
  console.log(` - ${unusedIconUrls.length} unused`);

  //Generate output listfile
  const heroIconGroups = splitHeroIconGroups(heroIcons);
  const html = generateHtmlImgList(heroIconGroups, sharedIcons, unusedIconUrls, currentIconUrlsToAltText);

  const outputListFile = program.outputList || program.inputList;
  await writeFileAsync(outputListFile, html);
  console.log('Saved listfile to', outputListFile);
})();


//-------- Support functions --------//

/**
 * Extracts skill and talent icons used by each hero.
 * @param {Object<string, Hero>} heroes Mapping of hero ID => hero data
 * @return {Map<string, Set<string>} Mapping of icon URL => Names of heroes that use the icon
 */
function compileSkillIconUsage(heroes) {
  const skillIconSources = new Map;

  for (const [heroId, heroData] of Object.entries(heroes)) {
    heroData.id = heroId;
    const hero = new Hero(heroData);

    for (const skill of hero) {
      const iconUrl = skill.iconUrl;
      console.assert(iconUrl, `Missing icon URL for ${hero.id}`);

      if (!skillIconSources.has(iconUrl))
        skillIconSources.set(iconUrl, new Set());

      skillIconSources.get(iconUrl).add(hero.name);
    }
  }

  return skillIconSources;
}


/**
 * Group icons by hero name. Shared icons are put under a special array.
 * @param {Map<string, Set<String>} iconToHero Mapping of icon URL => Names of heroes that use the icon
 * @return {{ heroIcons: Object<string, string[]>, sharedIcons: Object<string, string[]> }}
 *  `heroIcons` is a mapping of hero name => icon URLs,
 *  `sharedIcons` is a mapping of icon URLs => hero names that share the icon
 */
function groupIconsByHero(iconToHero) {
  const heroIcons = {}, sharedIcons = {};

  for (const [iconUrl, heroSet] of iconToHero) {
    console.assert(heroSet.size >= 1, `${iconUrl} is not used by any hero`);

    if (heroSet.size > 1)
      sharedIcons[iconUrl] = [...heroSet.values()];
    else {
      const heroName = heroSet.values().next().value;
      // console.log(heroName);

      if (!(heroName in heroIcons))
        heroIcons[heroName] = [];

      heroIcons[heroName].push(iconUrl);
    }
  }

  return { heroIcons, sharedIcons };
}


/**
 * Splits the icons into groups, using the given value.
 * @param {Object<string, string[]>} heroIconUrls Mapping of hero name => icon URLs
 * @param {number} groupSizeMax Maximum number of icons in each group
 * @return {Object<string, string[]>[]} Array of hero icon URL groups
 */
function splitHeroIconGroups(heroIconUrls, groupSizeMax = 300) {
  let currentIconGroup = {}, iconCount = 0;
  const heroIconUrlGroups = [currentIconGroup];

  for (const [heroName, iconUrls] of Object.entries(heroIconUrls)) {
    //Create a new icon group
    if (iconCount + iconUrls.length > groupSizeMax) {
      heroIconUrlGroups.push(currentIconGroup = {});
      iconCount = 0;
    }

    currentIconGroup[heroName] = iconUrls;
    iconCount += iconUrls.length;
  }

  return heroIconUrlGroups;
}


/**
 * Generates a HTML listfile of <img>s, divided into sections with divider
 * comment (`<!-- section --->`)
 * @param {Object<string, string[]>[]} heroIconUrlGroups
 * @param {Object<string, string[]>} sharedIconUrls
 * @param {string[]} unusedIconUrls
 * @param {Object<string, string>} urlToAltText Mapping of image URL => alt text
 */
function generateHtmlImgList(heroIconUrlGroups, sharedIconUrls, unusedIconUrls, urlToAltText) {
  let cumulativeIconCount = 0;
  const imgHtml = heroIconUrlGroups.map((iconUrlGroup, index) => {
    const iconUrlGroupArray = Object.values(iconUrlGroup);
    const heroCount = iconUrlGroupArray.length;
    const iconCount = iconUrlGroupArray.reduce((iconCount, iconUrls) => iconCount + iconUrls.length, 0);

    return `<!-- Section ${index + 1}: ${heroCount} hero(es), ${iconCount} icon(s) (${cumulativeIconCount + 1} ~ ${cumulativeIconCount += iconCount}) -->\n`
      + Object.entries(iconUrlGroup).map(([heroName, iconUrls]) =>
        `<p>${heroName}</p>\n` + iconUrlsToImgs(iconUrls)
      ).join('\n\n');
  }).join('\n\n');

  return imgHtml
    + `\n\n<!-- Shared icon(s): ${Object.keys(sharedIconUrls).length} -->\n`
    + iconUrlsToImgs(Object.keys(sharedIconUrls), sharedIconUrls)
    + `\n\n<!-- Unused icon(s): ${unusedIconUrls.length} -->\n`
    + iconUrlsToImgs(unusedIconUrls);

  /**
   * Join an array of URLs into a HTML string containing `<img>` tags.
   * @param {string[]} iconUrls Array of icon URLs
   * @param {Object<string, string>} comments Mapping of icon URL => comment
   * @return {string} HTML string
   */
  function iconUrlsToImgs(iconUrls, comments = {}) {
    return iconUrls.map(iconUrl =>
      `<img src="${iconUrl}"`
      + (iconUrl in urlToAltText ? ` alt="${urlToAltText[iconUrl]}" title="${urlToAltText[iconUrl]}"` : '')
      + '>'
      + (iconUrl in comments ? `<!-- ${comments[iconUrl]} -->` : '')
    ).join('\n');
  }
}