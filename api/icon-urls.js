#!/usr/bin/env node
'use strict';

/**
 * Import/export icon URLs fro HTML listfiles and hots.json
 */

const fs = require('fs');
const path = require('path');
const util = require('util');

const program = require('commander');

const HotsData = require('./src/hots-data');


/**
 * Intermediate format for exporting icon URLs. Icons are grouped by portraits, hero-specific skill/talent icons, shared
 * and unused icons.
 * @typedef {Object} IconUrlGroups
 * @prop {Map<string, string>} portraits
 * Hero portrait icons, mapped by icon ID => URL and sorted by hero name.
 * @prop {Map<string, Map<string, string>>} skillsAndTalents
 * Skill/talent icons specific to each hero, mapped by hero ID => icon ID => URL and sorted by hero name / icon ID.
 * @prop {Map<string, string>} shared
 * Skill/talent icons shared by multiple heroes, mapped by icon ID => URL and sorted by ID.
 * @prop {Map<string, string>} unused
 * Unused icons, mapped by icon ID => URL and sorted by ID.
 */


//-------- Main code --------//


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const DEFAULT_JSON_PATH = path.join(__dirname, '../docs/hots.json');


program.command('import <listfiles...>')
  .description('Import icon URLs from <img> tags in one or more HTML listfiles')
  .option('-i, --input-json [jsonfile]', 'Source HotS JSON file to read from', DEFAULT_JSON_PATH)
  .option('-o, --output-json [jsonfile]', 'Target HotS JSON file to write to (default: same file specified by -i)')
  .option('-f, --force', 'Overwrite icon IDs whose URLs have changed')
  .option('-k, --skip-same-url', 'Don\'t add new icons whose URLs are already used by existing icons')
  .action(importListfiles);

program.command('export <listfile>')
  .description('Export icon URLs as <img> tags to a HTML listfile')
  .option('-i, --input-json [jsonfile]', 'Source HotS JSON file to read from', DEFAULT_JSON_PATH)
  .action(exportListfile);

program.command('clean')
  .description('Remove unused icon URLs in the HotS JSON file')
  .option('-i, --input-json [jsonfile]', 'Source HotS JSON file to read from', DEFAULT_JSON_PATH)
  .option('-o, --output-json [jsonfile]', 'Target HotS JSON file to write to (default: same file specified by -i)')
  .action(cleanUnusedIcons);

program.on('command:*', () => program.help());

program.parse(process.argv);

if (process.argv.length <= 2)
  program.help();


/**
 * Import icons from one or more HTML listfiles into HotS JSON.
 * @param {string[]} listfiles One or more paths to listfiles
 * @param {{ inputJson: string, outputJson?: string, force?: boolean }} options Options object
 */
async function importListfiles(listfiles, options) {
  console.log('Reading HotS JSON from', options.inputJson);
  const hotsData = new HotsData(await readFileAsync(options.inputJson, 'utf8'));

  for (const listfile of listfiles) {
    console.log('Importing', listfile);
    const listfileHtml = await readFileAsync(listfile, 'utf8');
    const iconUrls = extractIconUrlsFromHtml(listfileHtml);

    importIconUrls(hotsData, iconUrls.icons, options.force, options.skipSameUrl);
    importUnidentifiedIconUrls(hotsData, iconUrls.unknownIcons);
  }

  const outputJsonPath = options.outputJson || options.inputJson;
  await writeFileAsync(outputJsonPath, hotsData.stringify());
  console.log('HotS JSON saved to', outputJsonPath);
}


/**
 * Export icons from HotS JSON to HTML listfile.
 * @param {string} listfile Path to listfile
 * @param {{ inputJson: string }} options Options object
 */
async function exportListfile(listfile, options) {
  console.log('Reading HotS JSON from', options.inputJson);
  const hotsData = new HotsData(await readFileAsync(options.inputJson, 'utf8'));

  const iconUrlGroups = exportIconUrls(hotsData);
  const listfileHtml = generateIconListfileHtml(iconUrlGroups, hotsData, 300);

  await writeFileAsync(listfile, listfileHtml);
  console.log('Listfile saved to', listfile);
}


/**
 * Removes unused icons in the HotS JSON file.
 * @param {{ inputJson: string }} options Options object
 */
async function cleanUnusedIcons(options) {
  console.log('Reading HotS JSON from', options.inputJson);
  const hotsData = new HotsData(await readFileAsync(options.inputJson, 'utf8'));

  const iconUrlGroups = exportIconUrls(hotsData);
  for (const iconId of iconUrlGroups.unused.keys())
    delete hotsData.iconUrls[iconId];

  console.log('Deleted', iconUrlGroups.unused.size, 'unused icon(s)');

  const outputJsonPath = options.outputJson || options.inputJson;
  await writeFileAsync(outputJsonPath, hotsData.stringify());
  console.log('HotS JSON saved to', outputJsonPath);
}


//-------- Support functions --------//


/**
 * Merges the given icon URL list into the HotsData object.
 * @param {HotsData} hotsData HotsData object to merge the icon URLs
 * @param {Map<string, string>} iconUrls List of icon URLs mapped by ID
 * @param {boolean} overwrite If truthy, overwrite conflicting URLs with new ones. Default is `false`.
 * @param {boolean} skipSameUrl If truthy, do not add new icons if an existing icon already has the same URL. Default is `false`.
 */
function importIconUrls(hotsData, iconUrls, overwrite = false, skipSameUrl = false) {
  const iconUrlToId = {};
  if (skipSameUrl) {
    for (const [iconId, url] of Object.entries(hotsData.iconUrls))
      if (!(url in iconUrlToId))
        iconUrlToId[url] = iconId;
  }

  for (const [iconId, url] of iconUrls) {
    if (url in iconUrlToId) {
      console.log(`Ignore icon ${iconId}: ${url} is already used by ID = ${iconUrlToId[url]}`);
      continue;
    }

    const oldIconUrl = hotsData.iconUrls[iconId];
    if (oldIconUrl) {
      if (oldIconUrl === url)
        continue;
      else if (overwrite) {
        console.log(`Overwrite icon URL for ${iconId}: ${oldIconUrl} => ${url}`);
        delete iconUrlToId[oldIconUrl];
      }
      else {
        console.warn(`Ignore icon ${iconId}: URL already set to ${oldIconUrl}, ignoring ${url}`);
        continue;
      }
    }

    hotsData.iconUrls[iconId] = url;
    if (skipSameUrl)
      iconUrlToId[url] = iconId;
  }
}


/**
 * Merges a list of icon URLs, whose IDs are unknown, into the HotsData object.
 * If a URL is not already in the HotsData object, it is assigned a unique ID.
 * @param {HotsData} hotsData HotsData object to merge the icon URLs
 * @param {Iterable<string>} unidentifiedIconUrls List of icon URLs whose IDs are unknown
 */
function importUnidentifiedIconUrls(hotsData, unidentifiedIconUrls) {
  const knownIconUrls = new Set(Object.values(hotsData.iconUrls));

  let unusedIdIndex = 0, unusedId;
  for (const url of unidentifiedIconUrls) {
    if (!(knownIconUrls.has(url))) {
      do {
        unusedId = 'unused' + (unusedIdIndex++);
      } while (unusedId in hotsData.iconUrls);

      hotsData.iconUrls[unusedId] = url;
    }
  }
}


/**
 * Extracts all icon URLs, grouped by hero.
 * @param {HotsData} hotsData Contents of hots.json
 * @return {IconUrlGroups} Icon URLs grouped
 */
function exportIconUrls(hotsData) {
  /** @type {IconUrlGroups} */
  const iconUrlGroups = { portraits: new Map, skillsAndTalents: new Map, shared: new Map, unused: new Map, };
  const unusedIconUrls = Object.assign({}, hotsData.iconUrls);
  /** @type {Map<string, Set<string>} */
  const heroesUsingSkillIcons = new Map;

  //Sort icons by hero name
  for (const hero of hotsData.allHeroes().sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, 'en'))) {
    if (hero.icon in hotsData.iconUrls) {
      iconUrlGroups.portraits.set(hero.icon, hotsData.iconUrls[hero.icon]);
      delete unusedIconUrls[hero.icon];
    }

    const skillTalentIconUrls = iconUrlGroups.skillsAndTalents.get(hero.id) || new Map;
    iconUrlGroups.skillsAndTalents.set(hero.id, skillTalentIconUrls);
    for (const skillOrTalent of hero.allSkillsAndTalents()) {
      if (skillOrTalent.icon in hotsData.iconUrls) {
        if (!heroesUsingSkillIcons.has(skillOrTalent.icon))
          heroesUsingSkillIcons.set(skillOrTalent.icon, new Set);

        heroesUsingSkillIcons.get(skillOrTalent.icon).add(hero.id);

        skillTalentIconUrls.set(skillOrTalent.icon, hotsData.iconUrls[skillOrTalent.icon]);
        delete unusedIconUrls[skillOrTalent.icon];
      }
    }
  }

  //Extract shared skill/talent icons to their own group
  const sharedIconUrls = {};
  for (const [iconId, heroesUsingIcon] of heroesUsingSkillIcons) {
    if (heroesUsingIcon.size > 1) {
      sharedIconUrls[iconId] = hotsData.iconUrls[iconId];
      for (const heroId of heroesUsingIcon)
        iconUrlGroups.skillsAndTalents.get(heroId).delete(iconId);
    }
  }

  //Sort shared icons by ID
  for (const iconId of Object.keys(sharedIconUrls).sort())
    iconUrlGroups.shared.set(iconId, sharedIconUrls[iconId]);

  //Sort unused icons by ID
  for (const iconId of Object.keys(unusedIconUrls).sort())
    iconUrlGroups.unused.set(iconId, unusedIconUrls[iconId]);

  return iconUrlGroups;
}


/**
 * Converts icon URL groups into listfile HTML. Skill and talent icons are split
 * into subgroups, while each of portraits, shared and unused icons are put in a
 * subgroup of their own.
 * @param {IconUrlGroups} iconUrlGroups Icon URL group object generated by `extractIconUrls()`
 * @param {HotsData} hotsData HotsData object used to generate the icon URL groups
 * @param {number} iconSubgroupMaxSize Max number of skill/talent icons per subgroup. Default is 200.
 * @return {string} HTML source of listfile
 */
function generateIconListfileHtml(iconUrlGroups, hotsData, iconSubgroupMaxSize = 200) {
  let listfileHtml = '';

  listfileHtml += `<!-- Hero portrait(s): ${iconUrlGroups.portraits.size} -->\n\n`
    + [...iconUrlGroups.portraits].map(iconUrlToImg).join('\n');

  //Generate skill/talent icon subgroups
  const skillTalentIconSubgroups = [];
  let currentSubgroup;
  let iconSubgroupSize = iconSubgroupMaxSize;   //Force subgroup creation for the first hero
  for (const [heroId, iconUrls] of iconUrlGroups.skillsAndTalents) {
    iconSubgroupSize += iconUrls.size;

    if (iconSubgroupSize > iconSubgroupMaxSize) {
      iconSubgroupSize = iconUrls.size;
      skillTalentIconSubgroups.push(currentSubgroup = new Map);
    }

    currentSubgroup.set(heroId, iconUrls);
  }

  //Generate HTML from each subgroup
  let cumulativeIconCount = 0;
  for (const [subgroupIndex, currentSubgroup] of skillTalentIconSubgroups.entries()) {
    const heroIconGroups = [...currentSubgroup.entries()];
    const iconCount = heroIconGroups.reduce((iconCount, [, iconUrls]) => iconCount + iconUrls.size, 0);

    listfileHtml += `\n\n\n<!-- Section ${subgroupIndex + 1}: ${heroIconGroups.length} hero(es), ${iconCount} icon(s) (${cumulativeIconCount + 1} ~ ${cumulativeIconCount += iconCount}) -->\n\n`
      + heroIconGroups.map(([heroId, iconUrls]) => {
        const hero = hotsData.heroes[heroId] || hotsData.ptrHeroes[heroId];
        return `<p>${hero.name}</p>\n` + [...iconUrls].map(iconUrlToImg).join('\n') + '\n\n';
      }).join('');
  }

  listfileHtml += `\n\n\n<!-- Shared icon(s): ${iconUrlGroups.shared.size} -->\n\n`
    + [...iconUrlGroups.shared.entries()].map(iconUrlToImg).join('\n');

  listfileHtml += `\n\n\n<!-- Unused icon(s): ${iconUrlGroups.unused.size} -->\n\n`
    + [...iconUrlGroups.unused.entries()].map(iconUrlToImg).join('\n');

  return listfileHtml;

  /**
   * Helper function: Create an HTML <img> tag from an icon's ID and URL.
   * @param {string} iconId Icon ID
   * @param {string} url Icon URL
   * @return HTML of <img> tag
   */
  function iconUrlToImg([iconId, url]) {
    return `<img src="${url}" alt="${iconId}.png" title="${iconId}.png">`;
  }
}


/**
 * Extracts icon URLs from `<img>` tags in the given HTML. If an icon does not
 * have a unique, non-empty ID, it is placed in the `unknownIcons` set.
 * @param {string} html HTML string
 * @return {{ icons: Map<string, string>, unknownIcons: Set<string> }} `icons` is a mapping of icon ID => URL
 */
function extractIconUrlsFromHtml(html) {
  const iconUrls = { icons: new Map, unknownIcons: new Set };

  for (const img of html.match(/<img.*?>/gi)) {
    const srcMatch = img.match(/src="(.*?)"/i);
    const altMatch = img.match(/alt="(.*?)(?:\.\w+)?"/i);

    if (!srcMatch) {
      console.warn('No src attribute in', img);
      continue;
    }

    const url = srcMatch[1];

    if (!altMatch) {
      console.warn('No alt text for', url);
      iconUrls.unknownIcons.add(url);
    }
    else {
      const iconId = altMatch[1];

      if (iconUrls.icons.has(iconId)) {
        if (iconUrls.icons.get(iconId) !== url)
          console.warn(`Icon URL conflict in listfile: ID = ${iconId} already has URL = ${iconUrls.icons.get(iconId)}, ignoring ${url}`);
      }
      else
        iconUrls.icons.set(iconId, url);
    }
  }

  return iconUrls;
};