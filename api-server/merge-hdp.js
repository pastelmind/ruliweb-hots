#!/usr/bin/env node
'use strict';

/**
 * Merge data from JSON files generated by [HeroesDataParser](https://github.com/koliva8245/HeroesDataParser)
 * into ruliweb-hots' own JSON file.
 * Note: To use HeroesDataParser, you should use the `-l koKR` option.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const program = require('commander');

const HotsData = require('./src/hots-data');
const Hero = require('./src/hero');
const Skill = require('./src/skill');
const Talent = require('./src/talent');
const KoEnString = require('./src/ko-en-string');
const mergeHotsData = require('./src/merge-hots-data');

/**
 * @typedef {import('./src/skill')} Skill
 */

/**
 * @typedef {import('./src/talent')} Talent
 */


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//Compatibility code for Node v8
require('./src/console-assert-no-throw');


const DEFAULT_JSON_PATH = path.join(__dirname, '../docs/hots.json');


program
  .arguments('<json_kr> <json_en>')
  .on('--help', () => {
    console.log('\n  Arguments:\n');
    console.log('    <json_kr>'.padEnd(32) + '  JSON file (koKR) generated by HeroesDataParser');
    console.log('    <json_en>'.padEnd(32) + '  JSON file (enUS) generated by HeroesDataParser');
  })
  .option('-m, --merge-json [jsonfile]', 'hots.json file to merge with', DEFAULT_JSON_PATH)
  .option('-o, --output-json [jsonfile]', 'hots.json file to write to', DEFAULT_JSON_PATH)
  .action((jsonKr, jsonEn) => {
    if (jsonKr)
      program.jsonKr = path.resolve(jsonKr);
    if (jsonEn)
      program.jsonEn = path.resolve(jsonEn);
  })
  .parse(process.argv);


if (process.argv.length <= 2 || !program.jsonKr) {
  console.error('Must specify HeroesDataParser output JSON file (koKR)');
  program.help();
}

if (!program.jsonEn) {
  console.error('Must specify HeroesDataParser output JSON file (enUS)');
  program.help();
}


(async () => {
  console.log('Reading HeroesDataParser JSON (koKR) from', program.jsonKr);
  const jsonKr = JSON.parse(await readFileAsync(program.jsonKr, 'utf8'));

  console.log('Reading HeroesDataParser JSON (enUS) from', program.jsonEn);
  const jsonEn = JSON.parse(await readFileAsync(program.jsonEn, 'utf8'));

  console.log('Merging English skill and talent names...');
  mergeHdpLocale(jsonKr, jsonEn);

  const heroes = {};
  for (const heroDataName in jsonKr) {
    console.log('Parsing entry:', heroDataName);
    heroes[heroDataName] = parseHeroData(jsonKr[heroDataName]);
  }

  program.mergeJson = path.resolve(program.mergeJson);
  console.log('Reading input JSON from', program.jsonKr);
  const hotsData = new HotsData(await readFileAsync(program.mergeJson, 'utf8'));

  console.log('Merging data...')
  mergeHotsData(hotsData, { heroes });
  // hotsData.heroes = heroes;

  program.outputJson = path.resolve(program.outputJson);
  await writeFileAsync(program.outputJson, hotsData.stringify());
  console.log('HotS data saved to', program.outputJson);
})();


//-------- Support functions --------//

/**
 * Extract hero data from a hero JSON object.
 * @param {*} heroData JSON object that represents hero data
 * @return {Hero} Hero object containing the extracted data
 */
function parseHeroData(heroData) {
  const hero = new Hero({
    id: heroData.cHeroId,
    name: heroData.name
  });

  hero.stats = undefined;
  hero.skills = parseAllSkillsData(heroData);
  hero.talents = parseAllTalentsData(heroData);

  //Fixes for heroic abilities that have sub-abilities
  //TODO: Move these abilities into properties of the parent abilities

  switch (heroData.cHeroId) {
    case 'LostVikings': //Longboat Raid! => Mortar
      relocateSubAbilitiesAfterTalent(hero, '바이킹의 습격!', '박격포');
      break;
    case 'Firebat':     //Bunker Drop => Flamethrower
      relocateSubAbilitiesAfterTalent(hero, '벙커 투하', '화염방사기');
      break;
    case 'Junkrat':     //RIP-Tire => Jump!
      relocateSubAbilitiesAfterTalent(hero, '죽이는 타이어', '점프!');
      break;
    case 'Chen':        //Storm, Earth, Fire => Storm / Earth / Fire
      relocateSubAbilitiesAfterTalent(hero, '폭풍, 대지, 불', '폭풍', '대지', '불');
      break;
    case 'Tychus':      //Commandeer Odin => Annihilate / Ragnarok Missiles / Thrusters
      relocateSubAbilitiesAfterTalent(hero, '오딘 출격', '몰살', '라그나로크 미사일', '추진기 가동');
      break;
  }

  return hero;
}


/**
 * Parses all skill data from a hero JSON object.
 * @param {*} heroData JSON object that represents hero data
 * @return {Skill[]} Array of Skills
 */
function parseAllSkillsData(heroData) {
  const skillDataArray = [];

  const {
    trait: traitArray,
    heroic: heroicArray,
    mount: mountArray = [],
    ...abilities
  } = heroData.abilities;

  //Always place traits at the front
  skillDataArray.push(...traitArray);

  for (const abilityArray of Object.values(abilities))
    skillDataArray.push(...abilityArray);

  //Exclude heroic abilities unless the hero is Tracer
  if (heroData.cHeroId === 'Tracer')
    skillDataArray.push(...heroicArray);

  //Exclude mount abilities that share the same name with the trait
  for (const mountAbility of mountArray)
    if (!skillDataArray.find(skillData => skillData.name.equals(mountAbility.name)))
      skillDataArray.push(mountAbility);

  for (const subAbilitySuperGroup of heroData.subAbilities || []) {
    for (const subAbilityGroup of Object.values(subAbilitySuperGroup))
      for (const abilityArray of Object.values(subAbilityGroup))
        skillDataArray.push(...abilityArray);
  }

  for (const heroUnitData of heroData.HeroUnits || []) {
    for (const heroUnit of Object.values(heroUnitData))
      for (const abilityArray of Object.values(heroUnit.abilities || {}))
        skillDataArray.push(...abilityArray);
  }

  return skillDataArray.map(parseSkillData);
}


/**
 * Parses all talent data from a hero JSON object.
 * @param {*} heroData JSON object that represents hero data
 * @return {{ [talentLevel: number]: Talent[] }} Collection of Talents, keyed by talent level
 */
function parseAllTalentsData(heroData) {
  const talents = {};

  for (const talentLevelPropertyName in heroData.talents) {
    let talentLevel = +(talentLevelPropertyName.replace('level', ''));

    //Fix for Chromie's trait
    if (heroData.cHeroId === 'Chromie')
      talentLevel = Math.max(1, talentLevel - 2);

    talents[talentLevel] = heroData.talents[talentLevelPropertyName].map(parseTalentData);
  }

  return talents;
}


/**
 * Finds a talent by `talentName` in `hero`, and inserts the given subabilities
 * after it as talents.
 * @param {Hero} hero Hero
 * @param {string} talentName Name of talent to search for
 * @param  {...string} subAbilityNames Names of subabilities to insert
 */
function relocateSubAbilitiesAfterTalent(hero, talentName, ...subAbilityNames) {
  for (const talentArray of Object.values(hero.talents)) {
    const talentIndex = talentArray.findIndex(talent => talent.name.ko === talentName);
    if (talentIndex !== -1) {
      const subAbilities = subAbilityNames.map(name => {
        for (const [skillIndex, skill] of hero.skills.entries()) {
          if (skill.name.ko === name) {
            //If a skill is found, remove it from the array of skills
            hero.skills.splice(skillIndex, 1);
            return skill;
          }
        }
        return new Talent({ name: { ko: name } });
      });

      talentArray.splice(talentIndex + 1, 0, ...subAbilities);
      return;
    }
  }
}


/**
 * Parses skill data from a skill JSON object.
 * @param {*} skillData JSON object that represents skill data
 * @return {Skill} Skill object containing the extracted data
 */
function parseSkillData(skillData) {
  return new Skill(extractSkillTalentInfo(skillData));
}


/**
 * Parses talent data from a talent JSON object.
 * @param {*} skillData JSON object that represents talent data
 * @return {Talent} Talent object containing the extracted data
 */
function parseTalentData(talentData) {
  return new Talent(extractSkillTalentInfo(talentData));
}


/**
 * Extracts skill/talent information from a skill or talent JSON object.
 * @param {*} skillTalentData JSON object that represents skill or talent data.
 * @return {Object} Object containing the extracted skill or talent information.
 */
function extractSkillTalentInfo(skillTalentData) {
  const skillTalentInfo = {};

  //Extract name
  if (skillTalentData.name)
    skillTalentInfo.name = new KoEnString(skillTalentData.name);
  else
    console.warn(`${skillTalentData.nameId} is missing a name`);

  //Extract description
  if (skillTalentData.fullTooltip)
    skillTalentInfo.description = parseTooltip(skillTalentData.fullTooltip);
  else
    console.warn(`${skillTalentData.name} is missing a full tooltip`);

  //Extract short description
  if (skillTalentData.shortTooltip)
    skillTalentInfo.shortDescription = parseShortDescription(skillTalentData.shortTooltip);
  else
    console.warn(`${skillTalentData.name} is missing a short tooltip`);

  return skillTalentInfo;
}


/**
 * Mapping of color names in `<c val="">` tags to their colors.
 */
const COLOR_CODES = {
  TooltipNumbers: 'bfd4fd',
  StandardTooltipHeader: 'ffffff',
  TooltipQuest: 'e4b800',
  AbilityPassive: '00ff90',
  ColorViolet: 'd65cff',
  ColorCreamYellow: 'ffff80',
  MalthaelTrait: '00dfdf',
  GlowColorRed: 'ff5858',
  WhitemaneDesperation: 'ff8b8b',
  WhitemaneZeal: 'fff5c2',
};


/**
 * Parse tooltip text, removing game data tags.
 * @param {string} tooltip
 */
function parseTooltip(tooltip) {
  return tooltip
    .replace(/(\d+)~~(.+?)~~/gi, (match, base, levelScaling) =>
      `${Math.round(base * (1 + (+levelScaling)))}(+${levelScaling * 100}%)`  //Set scaling numbers to level 1-values
    )
    .replace(/<c val="#(?:TooltipNumbers|TooltipQuest)">(.*?)<\/c>/gi, '$1')   //Remove #TooltipNumbers styling
    .replace(/<c val="#AbilityPassive">(지속 효과:)<\/c>/gi, '$1')             //Remove #AbilityPassive for generic passive descriptions
    .replace(/<[cs] val="(.*?)">/gi, (match, colorName) =>
      `<span style="color:#${COLOR_CODES[colorName.replace(/#/gi, '')] || colorName.toLowerCase()}">`
    )
    .replace(/<\/[cs]>/gi, '</span>')
    .replace(/(\d(?:\(\+.*?%\))?)<lang rule="jongsung">(.*?),(.*?)<\/lang>/gi, (match, digitPart, eul, rul) =>
      digitPart + ('2459'.includes(digitPart.charAt(0)) ? rul : eul)
    )
    .replace(/\s*<\/?n\/?>\s*/gi, '\n')
    .replace(/<img.*?\/>/gi, '')
    .replace(/\n+(\n보상:)/gi, '$1') //Fix Blizzard's newline errors
    .trim();
}


/**
 * Parse short description text, removing game data tags.
 * @param {string} tooltip
 */
function parseShortDescription(tooltip) {
  return parseTooltip(tooltip).replace(/<.*?>/g, '');
}


/**
 * Merges English locale data from `hdpDataEn` into `hdpDataKo`.
 * @param {Object} hdpDataKo JSON data (koKR locale) generated by HeroesDataParser
 * @param {Object} hdpDataEn JSON data (enUS locale) generated by HeroesDataParser
 */
function mergeHdpLocale(hdpDataKo, hdpDataEn) {
  for (const heroId in hdpDataKo) {
    const heroDataKo = hdpDataKo[heroId], heroDataEn = hdpDataEn[heroId];

    mergeAbilityGroupLocale(heroDataKo.abilities, heroDataEn.abilities);

    (heroDataKo.subAbilities || []).forEach((superGroupKo, index) => {
      const superGroupEn = heroDataEn.subAbilities[index];

      for (const subAbilityGroupId in superGroupKo)
        mergeAbilityGroupLocale(superGroupKo[subAbilityGroupId], superGroupEn[subAbilityGroupId]);
    });

    (heroDataKo.HeroUnits || []).forEach((heroUnitGroupKo, index) => {
      const heroUnitGroupEn = heroDataEn.HeroUnits[index];

      for (const heroUnitId in heroUnitGroupKo)
        mergeAbilityGroupLocale(heroUnitGroupKo[heroUnitId].abilities, heroUnitGroupEn[heroUnitId].abilities);
    });

    for (const talentLevelName in heroDataKo.talents) {
      heroDataKo.talents[talentLevelName].forEach((talentKr, index) => {
        talentKr.name = new KoEnString({
          ko: talentKr.name.trim(),
          en: heroDataEn.talents[talentLevelName][index].name.trim(),
        });
      });
    }
  }


  /**
   * Helper function
   * @param {Object} abilityGroupKo
   * @param {Object} abilityGroupEn
   */
  function mergeAbilityGroupLocale(abilityGroupKo, abilityGroupEn) {
    for (const abilityType in abilityGroupKo) {
      abilityGroupKo[abilityType].forEach((abilityKr, index) => {
        abilityKr.name = new KoEnString({
          ko: abilityKr.name.trim(),
          en: abilityGroupEn[abilityType][index].name.trim(),
        });
      });
    }
  }
}