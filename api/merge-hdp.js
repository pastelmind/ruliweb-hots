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
const jsonFind = require('./src/json-find');

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
  .option('-p, --ptr', 'Prioritize merging into heroes in PTR section')
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
    //Fix for HDP 3.1.0
    if (heroDataName === '_stormhero') continue;

    console.log('Parsing entry:', heroDataName);
    console.group();
    //Fix for HDP >= 4.0.0
    const heroId = jsonKr[heroDataName].cHeroId || heroDataName;
    heroes[heroDataName] = parseHeroData(jsonKr[heroDataName], heroId);
    console.groupEnd();
  }

  program.mergeJson = path.resolve(program.mergeJson);
  console.log('Reading input JSON from', program.mergeJson);
  const hotsData = new HotsData(await readFileAsync(program.mergeJson, 'utf8'));

  console.log('Merging data...');
  mergeHotsData(hotsData, { heroes }, program.ptr);

  program.outputJson = path.resolve(program.outputJson);
  await writeFileAsync(program.outputJson, hotsData.stringify());
  console.log('HotS data saved to', program.outputJson);
})();


//-------- Support functions --------//

/**
 * Extract hero data from a hero JSON object.
 * @param {*} heroData JSON object that represents hero data
 * @param {string} heroId ID of hero entry
 * @return {Hero} Hero object containing the extracted data
 */
function parseHeroData(heroData, heroId) {
  const hero = new Hero({
    id: heroId,
    name: heroData.name,
    icon: extractIconId(heroData.portraits.target),
  });

  hero.stats = undefined;
  hero.skills = parseAllSkillsData(heroData, heroId);
  hero.talents = parseAllTalentsData(heroData, heroId);

  //Fixes for heroic abilities that have sub-abilities
  //TODO: Move these abilities into properties of the parent abilities

  switch (hero.id) {
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
 * @param {string} heroId ID of the hero entry
 * @return {Skill[]} Array of Skills
 */
function parseAllSkillsData(heroData, heroId) {
  const skillDataArray = [];

  const {
    trait: traitArray,
    heroic: heroicArray,
    mount: mountArray = [],
    ...abilities
  } = heroData.abilities;

  //Always place traits at the front
  if (traitArray)
    skillDataArray.push(...traitArray);
  else
    console.warn(`${heroId} has no trait`)

  for (const abilityArray of Object.values(abilities))
    skillDataArray.push(...abilityArray);

  //Exclude heroic abilities unless the hero is Tracer
  if (heroId === 'Tracer')
    skillDataArray.push(...heroicArray);

  //Exclude mount abilities that share the same name with the trait
  for (const mountAbility of mountArray)
    if (!skillDataArray.find(skillData => skillData.name.equals(mountAbility.name)))
      skillDataArray.push(mountAbility);

  for (const subAbilityGroup of heroData.subAbilities || []) {
    for (const [parentAbilityId, subAbilities] of Object.entries(subAbilityGroup)) {
      for (const abilityArray of Object.values(subAbilities)) {
        //Fix for HDP 4.0.0+
        //If the subability is the parent of itself, don't bother
        if (parentAbilityId !== abilityArray[0].nameId) {
          const parentAbility = jsonFind(heroData, o => o && o.nameId === parentAbilityId);
          for (const a of abilityArray)
            a.parentAbility = parentAbility;
        }

        skillDataArray.push(...abilityArray);
      }
    }
  }

  for (const heroUnitData of heroData.HeroUnits || []) {
    for (const [heroUnitId, heroUnit] of Object.entries(heroUnitData)) {
      //Exclude heroics attached to hero units (Alextrasza's Cleansing Flame)
      const { heroic, ...abilities } = heroUnit.abilities || {};

      for (const abilityArray of Object.values(abilities)) {
        for (const ability of abilityArray)
          ability.heroUnitId = heroUnitId;

        skillDataArray.push(...abilityArray);
      }
    }
  }

  return skillDataArray.filter(skillData => {
    switch (skillData.nameId) {
      //Exclude Crossfade, because HDP >= 2.7.0 extracts the in-game tooltips instead of the hero shop tooltips
      case 'LucioCrossfade':
      case 'LucioCrossfadeActivateHealingBoost':
        return false;
    }

    return true;
  }).map(parseSkillData);
}


/**
 * Parses all talent data from a hero JSON object.
 * @param {*} heroData JSON object that represents hero data
 * @param {string} heroId ID of the hero entry
 * @return {{ [talentLevel: number]: Talent[] }} Collection of Talents, keyed by talent level
 */
function parseAllTalentsData(heroData, heroId) {
  const talents = {};

  for (const talentLevelPropertyName in heroData.talents) {
    let talentLevel = +(talentLevelPropertyName.replace('level', ''));

    //Fix for Chromie's trait
    if (heroId === 'Chromie')
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
 * IDs of abilities classified by HDP as subabilities, but should not be treated
 * as such for `hots.json`
 * @const
 */
const NOT_SUB_ABILITIES = new Set([
  'FenixRepeaterCannon',
  'ChenBreathOfFire',
]);


/**
 * Parses skill data from a skill JSON object.
 * @param {*} skillData JSON object that represents skill data
 * @return {Skill} Skill object containing the extracted data
 */
function parseSkillData(skillData) {
  const skill = Object.assign(new Skill(), extractSkillTalentInfo(skillData));

  skill.type = convertAbilityType(skillData.abilityType);

  switch (skillData.nameId) {
    case 'TracerBlink':     //Fix for Blink
      skill.type = 'Q'; break;
  }

  let parentType = undefined;
  switch (skillData.heroUnitId) {
    case 'RagnarosBigRag':
    case 'HeroAlexstraszaDragon':
      parentType = 'D'; break;
    case 'AbathurSymbiote':
      parentType = 'Q'; break;
    case 'HeroChenStorm':
      parentType = 'R'; break;
    default:
      if (skillData.parentAbility)
        parentType = convertAbilityType(skillData.parentAbility.abilityType);
  }

  // Set special type strings for SubAbilities, except those in the blacklist
  if (parentType && !NOT_SUB_ABILITIES.has(skillData.nameId))
    skill.type = parentType + ' - ' + skill.type;

  return skill;
}


/**
 * Parses talent data from a talent JSON object.
 * @param {*} skillData JSON object that represents talent data
 * @return {Talent} Talent object containing the extracted data
 */
function parseTalentData(talentData) {
  return Object.assign(new Talent(), extractSkillTalentInfo(talentData));
}


/**
 * Extracts skill/talent information from a skill or talent JSON object.
 * @param {*} skillTalentData JSON object that represents skill or talent data.
 * @return {Partial<Skill>} Object containing the extracted skill or talent information.
 */
function extractSkillTalentInfo(skillTalentData) {
  /** @type {Partial<Skill>} */
  const skillTalentInfo = {};

  //Extract name
  if (skillTalentData.name)
    skillTalentInfo.name = new KoEnString(skillTalentData.name);
  else
    console.warn(`${skillTalentData.nameId} is missing a name`);

  //Extract icon
  if (skillTalentData.icon)
    skillTalentInfo.icon = extractIconId(skillTalentData.icon);
  else
    console.warn(`${skillTalentData.nameId} is missing an icon`);

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

  //Extract cooldown
  Object.assign(skillTalentInfo, extractCooldownInfo(skillTalentData));

  //Extract resource cost (mana, energy, etc.)
  Object.assign(skillTalentInfo, extractResourceCostInfo(skillTalentData));

  return skillTalentInfo;
}


/**
 * Mapping of color names in `<c val="">` tags to their colors.
 */
const COLOR_CODES = {
  AbilityPassive: '00ff90',       // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  ColorCreamYellow: 'ffff80',     // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  ColorRed: 'ff0000',             // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  ColorViolet: 'd65cff',          // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  ColorYellow: 'e1c72c',          // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  GlowColorRed: 'ff5858',         // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  MalthaelTrait: '00dfdf',        // Based on heromods/malthael.stormmod/base.stormdata/UI/FontStyles.StormStyle
  StandardTooltipHeader: 'ffffff',// Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  TooltipNumbers: 'bfd4fd',       // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  TooltipQuest: 'e4b800',         // Based on core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  WhitemaneDesperation: 'ff8b8b', // Based on heromods/whitemane.stormmod/base.stormdata/UI/FontStyles.StormStyle
  WhitemaneZeal: 'fff5c2',        // Based on heromods/whitemane.stormmod/base.stormdata/UI/FontStyles.StormStyle
};


/**
 * Parse tooltip text, removing game data tags.
 * @param {string} tooltip
 * @return {string} Parsed description
 */
function parseTooltip(tooltip) {
  return tooltip
    .replace(/(\d+)~~(.+?)~~/gi, (match, base, levelScaling) =>
      `${Math.round(base * (1 + (+levelScaling)))}(+${levelScaling * 100}%)`  //Set scaling numbers to level 1-values
    )
    .replace(/<c val="#?(?:TooltipNumbers|TooltipQuest|bfd4fd|e4b800)">(.*?)<\/c>/gi, '$1') //Remove #TooltipNumbers and #TooltipQuest styling
    .replace(/<c val="#?(?:AbilityPassive|00ff90)">(지속 효과:)<\/c>/gi, '$1')              //Remove #AbilityPassive for generic passive descriptions
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
 * @return {string} Parsed short description
 */
function parseShortDescription(tooltip) {
  return parseTooltip(tooltip).replace(/<.*?>/g, '');
}


/**
 * Extracts cooldown information from a skill or talent JSON object.
 * @param {*} skillTalentData JSON object that represents skill or talent data.
 * @return {Partial<Skill>} Parsed cooldown information. If the skill/talent has no cooldown data, returns undefined.
 */
function extractCooldownInfo(skillTalentData) {
  let cooldown = null, rechargeCooldown = null;

  if (skillTalentData.cooldownTooltip) {
    const cooldownMatch = /(?:재사용|충전)\s*대기시간:\s*(.*?)초/.exec(skillTalentData.cooldownTooltip);
    if (!cooldownMatch)
      throw new Error('Cooldown pattern mismatch:', skillTalentData.cooldownTooltip);

    const cooldownValue = parseFloat(cooldownMatch[1]);
    const { charges } = skillTalentData;

    //Test charges.countUse to exclude Dehaka's Essense Collection
    if (charges && charges.countMax > 1 && charges.countUse === 1)
      rechargeCooldown = cooldownValue;
    else
      cooldown = cooldownValue;

    switch (skillTalentData.nameId) {
      case 'DVaPilotCallMechMEKAfall':  //Fix for MEKAfall
      case 'ThrallSpiritShield':        //Fix for Spirit Shield
        cooldown = null;
    }
  }
  else {
    switch (skillTalentData.nameId) {
      case 'WizardArchonPurePower':     //Fix for Archon: Pure Power
        cooldown = 10; break;

      case 'CrusaderBlindedByTheLight': //Fix for Blinded By The Light
        cooldown = 45; break;
    }
  }

  return { cooldown, rechargeCooldown };
}


/**
 * Extracts resource cost information from a skill or talent JSON object.
 * @param {*} skillTalentData JSON object that represents skill or talent data.
 * @return {Partial<Skill>} Parsed resource cost information.
 */
function extractResourceCostInfo(skillTalentData) {
  let manaCost = null, manaCostPerSecond = null;
  const extras = {};
  const { energyTooltip } = skillTalentData;

  if (energyTooltip) {
    const resourceMatch = /^\s*(.+?)\s*:\s*(초당)?\s*(\d+?)\s*$/.exec(energyTooltip.replace(/<.*?>/g, ''));

    if (resourceMatch) {
      const [, resourceName, perSecondString, resourceCostAmountStr] = resourceMatch;
      const resourceCostAmount = +resourceCostAmountStr;

      if (resourceName === '마나') {
        if (perSecondString)
          manaCostPerSecond = +resourceCostAmount;
        else
          manaCost = +resourceCostAmount;
      }
      else
        extras[resourceName] = (perSecondString ? perSecondString + ' ' : 0) + resourceCostAmount;
    }
    else
      console.warn(`${skillTalentData.nameId}: Unrecognizable energyTooltip -`, util.inspect(energyTooltip));
  }

  return { manaCost, manaCostPerSecond, extras };
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


/**
 * Converts HDP ability type code to Ruliweb-HotS Skill/Talent type code.
 * @param {string} abilityType Ability type code generated by HeroesDataParser
 * @return {string} Skill/Talent type code used by Ruliweb-HotS
 */
function convertAbilityType(abilityType) {
  return {
    Trait: 'D',
    Heroic: 'R',
    Active: 'active',
    Passive: 'passive',
  }[abilityType] || abilityType;
}


/**
 * Extracts the icon ID from the icon file name.
 * If the given file name is invalid, returns an empty string.
 * @param {string} fileName Name of the icon file.
 * @return {string} Icon ID
 */
function extractIconId(fileName) {
  return fileName.replace(/\.\w+$/, '').toLowerCase();
}