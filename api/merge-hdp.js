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
const logger = require('./src/logger.js');


// Compatibility code for Node v8
require('./src/console-assert-no-throw');


const DEFAULT_JSON_PATH = path.join(__dirname, '../docs/hots.json');


program
  .arguments('<json_kr> <json_en>')
  .on('--help', () => {
    console.log('\n  Arguments:\n');
    console.log(
      '    <json_kr>'.padEnd(32)
      + '  JSON file (koKR) generated by HeroesDataParser'
    );
    console.log(
      '    <json_en>'.padEnd(32)
      + '  JSON file (enUS) generated by HeroesDataParser'
    );
  })
  .option(
    '-m, --merge-json [jsonfile]', 'hots.json file to merge with',
    DEFAULT_JSON_PATH
  )
  .option(
    '-o, --output-json [jsonfile]', 'hots.json file to write to',
    DEFAULT_JSON_PATH
  )
  .option('-p, --ptr', 'Prioritize merging into heroes in PTR section')
  .action((jsonKr, jsonEn) => {
    if (jsonKr) program.jsonKr = path.resolve(jsonKr);
    if (jsonEn) program.jsonEn = path.resolve(jsonEn);
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


// -------- Support functions -------- //

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

  // Fixes for heroic abilities that have sub-abilities
  // TODO: Move these abilities into properties of the parent abilities

  switch (hero.id) {
    // Longboat Raid! => Mortar
    case 'LostVikings':
      relocateSubAbilitiesAfterTalent(
        hero,
        'LostVikingsHeroicAbilityLongboatRaid',
        'LostVikingsLongboatRaidMortar',
      );
      break;
    // Bunker Drop => Flamethrower
    case 'Firebat':
      relocateSubAbilitiesAfterTalent(
        hero,
        'FirebatHeroicAbilityBunkerDrop',
        'FirebatBunkerDropFlamethrower',
      );
      break;
    // RIP-Tire => Jump!
    case 'Junkrat':
      relocateSubAbilitiesAfterTalent(hero,
        'JunkratRIPTire',
        'JunkratRIPTireJump',
      );
      break;
    // Storm, Earth, Fire => Storm / Earth / Fire
    case 'Chen':
      relocateSubAbilitiesAfterTalent(hero,
        'ChenHeroicAbilityStormEarthFire',
        'ChenStorm',
        'ChenEarth',
        'ChenFire',
      );
      break;
    // Commandeer Odin => Annihilate / Ragnarok Missiles / Thrusters
    case 'Tychus':
      relocateSubAbilitiesAfterTalent(hero,
        'TychusHeroicAbilityCommandeerOdin',
        'TychusOdinAnnihilate',
        'TychusOdinRagnarokMissilesTargeted',
        'TychusOdinThrusters',
      );
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

  // Always place traits at the front
  if (traitArray) skillDataArray.push(...traitArray);
  else logger.warn(`${heroId} has no trait`);

  for (const abilityArray of Object.values(abilities)) {
    skillDataArray.push(...abilityArray);
  }

  // Exclude heroic abilities unless the hero is Tracer
  if (heroId === 'Tracer') skillDataArray.push(...heroicArray);

  // Exclude mount abilities that share the same name with the trait
  for (const mountAbility of mountArray) {
    if (!skillDataArray.find(s => s.name.equals(mountAbility.name))) {
      skillDataArray.push(mountAbility);
    }
  }

  for (const subAbilityGroup of heroData.subAbilities || []) {
    for (const [parentLink, subAbilities] of Object.entries(subAbilityGroup)) {
      const parentAbilityType = parentLink.split('|')[2];

      for (const abilityArray of Object.values(subAbilities)) {
        for (const a of abilityArray) {
          a.parentAbilityType = parentAbilityType;
        }
        skillDataArray.push(...abilityArray);
      }
    }
  }

  for (const heroUnitData of heroData.HeroUnits || []) {
    for (const [heroUnitId, heroUnit] of Object.entries(heroUnitData)) {
      // Exclude heroics attached to hero units (Alextrasza's Cleansing Flame)
      const { heroic, ...abilities } = heroUnit.abilities || {};

      for (const abilityArray of Object.values(abilities)) {
        for (const ability of abilityArray) {
          ability.heroUnitId = heroUnitId;
        }

        skillDataArray.push(...abilityArray);
      }
    }
  }

  const skillDataObject = skillDataArray.filter(skillData => {
    switch (skillData.nameId) {
      // Exclude common abilities
      case 'Hearthstone':
      case 'LootSpray':
      case 'LootYellVoiceLine':
      case 'Mount':
      case 'Dismount':
      // Exclude Crossfade, because HDP >= 2.7.0 extracts the in-game tooltips
      // instead of the hero shop tooltips
      case 'LucioCrossfade':
      case 'LucioCrossfadeActivateHealingBoost':
        return false;
    }

    return true;
  }).reduce((obj, skill) => {
    // Exclude duplicate skill IDs
    if (!(skill.nameId in obj)) obj[skill.nameId] = skill;
    return obj;
  }, {});

  return Object.values(skillDataObject).map(parseSkillData);
}


/**
 * Parses all talent data from a hero JSON object.
 * @param {Hero} heroData JSON object that represents hero data
 * @param {string} heroId ID of the hero entry
 * @return {Object<number, Talent[]>} Mapping of talent levels to Talent groups
 */
function parseAllTalentsData(heroData, heroId) {
  const talents = {};

  for (const talentLevelPropertyName in heroData.talents) {
    let talentLevel = +(talentLevelPropertyName.replace('level', ''));

    // Fix for Chromie's trait
    if (heroId === 'Chromie') talentLevel = Math.max(1, talentLevel - 2);

    talents[talentLevel] =
      heroData.talents[talentLevelPropertyName].map(parseTalentData);
  }

  return talents;
}


/**
 * Finds a talent by `talentId` in `hero`, and inserts the given subabilities
 * after it as talents.
 * @param {Hero} hero Hero
 * @param {string} talentId ID of the talent to search for
 * @param  {...string} subAbilityIds ID strings of subabilities to insert
 */
function relocateSubAbilitiesAfterTalent(hero, talentId, ...subAbilityIds) {
  for (const talentArray of Object.values(hero.talents)) {
    const talentIndex = talentArray.findIndex(talent => talent.id === talentId);
    if (talentIndex !== -1) {
      const subAbilities = subAbilityIds.map(id => {
        for (const [skillIndex, skill] of hero.skills.entries()) {
          if (skill.id === id) {
            // If a skill is found, remove it from the array of skills
            hero.skills.splice(skillIndex, 1);
            return skill;
          }
        }
        return new Talent({ id });
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
  'ChenBreathOfFire',
  'DeathwingEarthShatter',
  'DeathwingLavaBurst',
  'FenixRepeaterCannon',
]);

const ABILITY_TYPE_TO_SKILL_TYPE = Object.freeze({
  Active: 'active',
  Heroic: 'R',
  Passive: 'passive',
  Trait: 'D',
});

/**
 * Parses skill data from a skill JSON object.
 * @param {*} skillData JSON object that represents skill data
 * @return {Skill} Skill object containing the extracted data
 */
function parseSkillData(skillData) {
  const skill = Object.assign(new Skill(), extractSkillTalentInfo(skillData));

  // Parse skill type (but not talent type)
  const { abilityType, parentAbilityType } = skillData;
  skill.type = ABILITY_TYPE_TO_SKILL_TYPE[abilityType] || abilityType;
  if (parentAbilityType && !NOT_SUB_ABILITIES.has(skillData.nameId)) {
    const parentType =
      ABILITY_TYPE_TO_SKILL_TYPE[parentAbilityType] || parentAbilityType;
    skill.type = parentType + ' - ' + skill.type;
  }

  return skill;
}


/**
 * Parses talent data from a talent JSON object.
 * @param {*} talentData JSON object that represents talent data
 * @return {Talent} Talent object containing the extracted data
 */
function parseTalentData(talentData) {
  return Object.assign(new Talent(), extractSkillTalentInfo(talentData));
}


/**
 * Extracts skill/talent information from a skill or talent JSON object.
 * @param {*} skillTalentData JSON object that represents skill or talent data.
 * @return {Partial<Skill>} Object containing the extracted skill or talent
 *    information.
 */
function extractSkillTalentInfo(skillTalentData) {
  /** @type {Partial<Skill>} */
  const skillTalentInfo = {};

  if (skillTalentData.nameId) {
    skillTalentInfo.id = skillTalentData.nameId;
  } else {
    logger.warn(`Missing nameId field in ${util.inspect(skillTalentData)}`);
  }

  // Extract name
  if (skillTalentData.name) {
    skillTalentInfo.name = new KoEnString(skillTalentData.name);
  } else logger.warn(`${skillTalentData.nameId} is missing a name`);

  // Extract icon
  if (skillTalentData.icon) {
    skillTalentInfo.icon = extractIconId(skillTalentData.icon);
  } else logger.warn(`${skillTalentData.nameId} is missing an icon`);

  // Extract description
  if (skillTalentData.fullTooltip) {
    skillTalentInfo.description = parseTooltip(skillTalentData.fullTooltip);
  } else logger.warn(`${skillTalentData.name} is missing a full tooltip`);

  // Extract short description
  if (skillTalentData.shortTooltip) {
    skillTalentInfo.shortDescription =
      parseShortDescription(skillTalentData.shortTooltip);
  } else logger.warn(`${skillTalentData.name} is missing a short tooltip`);

  // Extract cooldown
  Object.assign(skillTalentInfo, extractCooldownInfo(skillTalentData));

  // Extract resource cost (mana, energy, etc.)
  Object.assign(skillTalentInfo, extractResourceCostInfo(skillTalentData));

  return skillTalentInfo;
}


/**
 * Mapping of color names in `<c val="">` tags to their colors.
 */
const COLOR_CODES = {
  // From core.stormmod/base.stormdata/UI/FontStyles.StormStyle
  AbilityPassive: '00ff90',
  ColorCreamYellow: 'ffff80',
  ColorRed: 'ff0000',
  ColorViolet: 'd65cff',
  ColorYellow: 'e1c72c',
  GlowColorRed: 'ff5858',
  StandardTooltipHeader: 'ffffff',
  TooltipNumbers: 'bfd4fd',
  TooltipQuest: 'e4b800',
  // From heromods/deathwing.stormmod/base.stormdata/UI/FontStyles.StormStyle
  DeathwingWorldBreaker: 'd8ab80',
  DeathwingDestroyer: 'ef6e28',
  // From heromods/malthael.stormmod/base.stormdata/UI/FontStyles.StormStyle
  MalthaelTrait: '00dfdf',
  // From heromods/whitemane.stormmod/base.stormdata/UI/FontStyles.StormStyle
  WhitemaneDesperation: 'ff8b8b',
  WhitemaneZeal: 'fff5c2',
};


/** Colors that will be removed from tooltips. */
const BLACKLISTED_COLORS = new Set([
  'TooltipNumbers',
  'TooltipQuest',
  'bfd4fd',
  'e4b800',
]);


/**
 * Parse tooltip text, removing game data tags.
 * @param {string} tooltip
 * @return {string} Parsed description
 */
function parseTooltip(tooltip) {
  return tooltip
    // Set scaling numbers to level 1-values
    .replace(/(\d+%?)~~(.+?)~~/gi, (match, base, levelScaling) => {
      const percentSign = base.includes('%') ? '%' : '';
      levelScaling = parseFloat(levelScaling);
      const amount = Math.round(parseFloat(base) * (1 + levelScaling));
      const scalingFactorPercent = Math.round(levelScaling * 10000) / 100;
      return `${amount}${percentSign}(+${scalingFactorPercent}%)`;
    })
    .replace(
      /<[cs]((?:\s+\w+=".*?")+)>(.*?)(?:<\/[cs]>|$)/gi,
      (tag, attrs, text) => {
        const attributePattern = /\b(\w+)="(.*?)"/gi;
        let match;
        let val;
        while (match = attributePattern.exec(attrs)) {
          const attribute = match[1];
          // Fix Blizzard's typo errors
          if (attribute === 'val' || attribute === 'al') val = match[2];
          else logger.warn(`Unknown attribute '${attribute}' in ${tag}`);
        }

        // Handle color gradients introduced in HDP 4.0.0
        const colorGradientMatch = val.match(/^(\w{6})-(\w{6})$/);
        if (colorGradientMatch) {
          const [, color1, color2] = colorGradientMatch;
          return `<span style="` +
            `color:#${color1};text-shadow:0 0 1px #${color2}` +
            `">${text}</span>`;
        }

        let color = val.replace('#', '');
        if (BLACKLISTED_COLORS.has(color)) return text;
        if (/AbilityPassive|00ff90/gi.test(color)
          && text.startsWith('지속 효과')) {
          return text;
        }
        color = COLOR_CODES[color] || color.toLowerCase();
        return `<span style="color:#${color}">${text}</span>`;
      }
    )
    .replace(
      /(\d(?:\(\+.*?%\))?)<lang rule="jongsung">(.*?),(.*?)<\/lang>/gi,
      (match, digitPart, eul, rul) =>
        digitPart + ('2459'.includes(digitPart.charAt(0)) ? rul : eul)
    )
    .replace(/\s*<\/?n\/?>\s*/gi, '\n')
    .replace(/<img.*?\/>/gi, '')
    .replace(/\n+(\n보상:)/gi, '$1') // Fix Blizzard's newline errors
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
 * @return {Partial<Skill>} Parsed cooldown information. If the skill/talent has
 *    no cooldown data, returns undefined.
 */
function extractCooldownInfo(skillTalentData) {
  let cooldown = null;
  let rechargeCooldown = null;

  if (skillTalentData.cooldownTooltip) {
    const cooldownMatch = /(?:재사용|충전)\s*대기시간:\s*(.*?)초/.exec(
      skillTalentData.cooldownTooltip
    );
    if (!cooldownMatch) {
      throw new Error(
        'Cooldown pattern mismatch:', skillTalentData.cooldownTooltip
      );
    }

    const cooldownValue = parseFloat(cooldownMatch[1]);
    const { charges } = skillTalentData;

    // Test charges.countUse to exclude Dehaka's Essense Collection
    if (charges && charges.countMax > 1 && charges.countUse === 1) {
      rechargeCooldown = cooldownValue;
    } else cooldown = cooldownValue;

    switch (skillTalentData.nameId) {
      case 'DVaPilotCallMechMEKAfall': // Fix for MEKAfall
      case 'ThrallSpiritShield': // Fix for Spirit Shield
        cooldown = null;
    }
  } else {
    switch (skillTalentData.nameId) {
      case 'WizardArchonPurePower': // Fix for Archon: Pure Power
        cooldown = 10; break;

      case 'CrusaderBlindedByTheLight': // Fix for Blinded By The Light
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
  let manaCost = null;
  let manaCostPerSecond = null;
  const extras = {};
  const { energyTooltip } = skillTalentData;

  if (energyTooltip) {
    const resourceMatch = /^\s*(.+?)\s*:\s*(초당)?\s*(\d+?)\s*$/.exec(
      energyTooltip.replace(/<.*?>/g, '')
    );

    if (resourceMatch) {
      const [, resourceName, perSecondString, resourceCostAmountStr] =
        resourceMatch;
      const resourceCostAmount = +resourceCostAmountStr;

      if (resourceName === '마나') {
        if (perSecondString) manaCostPerSecond = +resourceCostAmount;
        else manaCost = +resourceCostAmount;
      } else {
        extras[resourceName] =
          (perSecondString ? perSecondString + ' ' : 0) + resourceCostAmount;
      }
    } else {
      logger.warn(
        `${skillTalentData.nameId}: Unrecognizable energyTooltip -`,
        util.inspect(energyTooltip)
      );
    }
  }

  return { manaCost, manaCostPerSecond, extras };
}


/**
 * Merges English locale data from `hdpDataEn` into `hdpDataKo`.
 * @param {Object} hdpDataKo JSON data (koKR locale) generated by
 *    HeroesDataParser
 * @param {Object} hdpDataEn JSON data (enUS locale) generated by
 *    HeroesDataParser
 */
function mergeHdpLocale(hdpDataKo, hdpDataEn) {
  for (const heroId in hdpDataKo) {
    const heroDataKo = hdpDataKo[heroId];
    const heroDataEn = hdpDataEn[heroId];

    mergeAbilityGroupLocale(heroDataKo.abilities, heroDataEn.abilities);

    (heroDataKo.subAbilities || []).forEach((superGroupKo, index) => {
      const superGroupEn = heroDataEn.subAbilities[index];

      for (const subAbilityGroupId in superGroupKo) {
        mergeAbilityGroupLocale(
          superGroupKo[subAbilityGroupId], superGroupEn[subAbilityGroupId]
        );
      }
    });

    (heroDataKo.HeroUnits || []).forEach((heroUnitGroupKo, index) => {
      const heroUnitGroupEn = heroDataEn.HeroUnits[index];

      for (const heroUnitId in heroUnitGroupKo) {
        mergeAbilityGroupLocale(
          heroUnitGroupKo[heroUnitId].abilities,
          heroUnitGroupEn[heroUnitId].abilities
        );
      }
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
 * Extracts the icon ID from the icon file name.
 * If the given file name is invalid, returns an empty string.
 * @param {string} fileName Name of the icon file.
 * @return {string} Icon ID
 */
function extractIconId(fileName) {
  return fileName.replace(/\.\w+$/, '').toLowerCase();
}


if (require.main === module) {
  const jsonKr = JSON.parse(fs.readFileSync(program.jsonKr, 'utf8'));
  const jsonEn = JSON.parse(fs.readFileSync(program.jsonEn, 'utf8'));
  mergeHdpLocale(jsonKr, jsonEn);

  const heroes = {};
  for (const heroDataName in jsonKr) {
    // Fix for HDP 3.1.0
    if (heroDataName === '_stormhero') continue;

    logger.pushTag(`Parsing ${heroDataName}`);
    // Fix for HDP >= 4.0.0
    const heroId = jsonKr[heroDataName].cHeroId || heroDataName;
    heroes[heroDataName] = parseHeroData(jsonKr[heroDataName], heroId);
    logger.popTag();
  }

  const hotsData = new HotsData(fs.readFileSync(program.mergeJson, 'utf8'));
  mergeHotsData(hotsData, { heroes }, program.ptr);
  fs.writeFileSync(program.outputJson, hotsData.stringify());
}
