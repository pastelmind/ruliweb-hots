#!/usr/bin/env node

/**
 * Merge data from JSON files generated by [heroes-parser](https://www.npmjs.com/package/heroes-parser)
 * into ruliweb-hots' own JSON file.
 * Note: `heroes-parser` is not a dependency and should be installed separately.
 * Note: To use `heroes-parser`, you must use the `--profile detailed` option.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const program = require('commander');

const HotsData = require('./src/hots-data');
const Hero = require('./src/hero');
const HeroStats = require('./src/hero-stats');
const Talent = require('./src/talent');
const KoEnString = require('./src/ko-en-string');
const mergeHotsData = require('./src/merge-hots-data');


const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);
const writeFileAsync = util.promisify(fs.writeFile);


//Compatibility code for Node v8
require('./src/console-assert-no-throw');

/**
 * @typedef {import('./src/scaling-stat')} ScalingStat
 */


//-------- Main code --------//

const DEFAULT_JSON_PATH = path.join(__dirname, '../docs/hots.json');


program
  .option('-d, --data-dir <dirpath>', 'Directory containing JSON files generated by heroes-parser')
  .option('-i, --input-json [jsonfile]', 'Source JSON file to read from', DEFAULT_JSON_PATH)
  .option('-o, --output-json [jsonfile]', 'Target JSON file to write to', DEFAULT_JSON_PATH)
  .parse(process.argv);


if (process.argv.length <= 2 || !program.dataDir) {
  console.error('Must specify data directory');
  program.help();
}


(async () => {
  const dataFiles = await readdirAsync(program.dataDir);

  const heroes = {};
  for (const dataFile of dataFiles) {
    try {
      const heroDataSource = await readFileAsync(path.join(program.dataDir, dataFile), 'utf8');
      const heroData = JSON.parse(heroDataSource);
      heroes[heroData.id] = parseHero(heroData);
    }
    catch (e) {
      console.error(e); //Report and consume error
    }
  }

  //Fix for Cho'Gall
  const { Cho, Gall } = heroes;
  if (Cho && Gall) {
    Gall.stats.hp = Cho.stats.hp;
    Gall.stats.hpRegen = Cho.stats.hpRegen;
    Gall.stats.radius = Cho.stats.radius;
    Gall.stats.speed = Cho.stats.speed;
  }

  program.inputJson = path.resolve(program.inputJson);
  const hotsDataInput = await readFileAsync(program.inputJson, 'utf8');
  const hotsData = new HotsData(hotsDataInput);

  mergeHotsData(hotsData, { heroes });

  program.outputJson = path.resolve(program.outputJson);
  await writeFileAsync(program.outputJson, hotsData.stringify());
  console.log('HotS data saved to', program.outputJson);

})();


//-------- Support functions --------//

/**
 * Parses Hero data from the given JSON object.
 * @param {Object} heroData Hero data
 * @return {Hero} Hero object
 */
function parseHero(heroData) {
  const hero = new Hero({
    id: heroData.id,
    name: toKoEnString(heroData.name).ko,
    title: toKoEnString(heroData.title).ko,
    stats: extractAllHeroUnitStats(heroData),
    talents: parseAllTalents(heroData),
  });

  switch (hero.id) {
    case 'LostVikings': //Longboat Raid! => Mortar
      insertSubAbilitiesAfterTalent(hero, heroData, '바이킹의 습격!', '박격포');
      break;
    case 'Firebat':     //Bunker Drop => Flamethrower
      insertSubAbilitiesAfterTalent(hero, heroData, '벙커 투하', '화염방사기');
      break;
    case 'Junkrat':     //RIP-Tire => Jump!
      insertSubAbilitiesAfterTalent(hero, heroData, '죽이는 타이어', '점프!');
      break;
    case 'Chen':        //Storm, Earth, Fire => Storm / Earth / Fire
      insertSubAbilitiesAfterTalent(hero, heroData, '폭풍, 대지, 불', '폭풍', '대지', '불');
      break;
    case 'Tychus':      //Commandeer Odin => Annihilate / Ragnarok Missiles / Thrusters
      insertSubAbilitiesAfterTalent(hero, heroData, '오딘 출격', '몰살', '라그나로크 미사일', '추진기 가동');
      break;
  }

  return hero;
}

/**
 * Extracts Hero unit stats from the given hero data.
 * @param {Object} heroData
 * @return {HeroStats | HeroStats[]} Stat info of a single unit, or an array of unit stat infos
 */
function extractAllHeroUnitStats(heroData) {
  const unitStats = new Map;

  for (const unitData of heroData.units) {
    const unit = extractUnitStats(unitData, heroData);

    if (!(unit && ((unit.hp.value && unit.damage) || heroData.id === 'Gall')))
      continue;

    unitStats.set(unitData.id, unit);

    //Fix for Varian: Manually add stats for each heroic ability as separate units
    if (unitData.id === 'HeroVarian') {
      unit.unitName = '기본';

      const varianWeaponDamageBase = jsonFindId(heroData, 'VarianHeroWeaponDamageBase');
      const tauntMods = jsonFindId(heroData, 'VarianTauntHeroModifications');
      const colossusSmashMods = jsonFindId(heroData, 'VarianColossusSmashHeroModifications');
      const twinBladesMods = jsonFindId(heroData, 'VarianTwinBladesOfFuryHeroModifications');

      const varianTaunt = new HeroStats(unit);
      varianTaunt.unitName = toKoEnString(jsonFindId(heroData.abilities, 'VarianTaunt').name).ko;
      varianTaunt.hp.value *= 1 + parseFloat(tauntMods.modification.vitalMaxFraction.life.value);
      varianTaunt.hpRegen.value += parseFloat(getLifeRegenModification(tauntMods));
      unitStats.set(unitData.id + 'Taunt', varianTaunt);

      const varianColossusSmash = new HeroStats(unit);
      varianColossusSmash.unitName = toKoEnString(jsonFindId(heroData.abilities, 'VarianColossusSmash').name).ko;
      varianColossusSmash.damage.value *= 1 + parseFloat(varianWeaponDamageBase.multiplicativeModifier.varianColossusSmashWeapon.modifier);
      varianColossusSmash.hp.value *= 1 + parseFloat(colossusSmashMods.modification.vitalMaxFraction.life.value);
      varianColossusSmash.hpRegen.value += parseFloat(getLifeRegenModification(colossusSmashMods));
      unitStats.set(unitData.id + 'ColossusSmash', varianColossusSmash);

      const varianTwinBlades = new HeroStats(unit);
      varianTwinBlades.unitName = toKoEnString(jsonFindId(heroData.abilities, 'VarianTwinBladesofFury').name).ko;
      varianTwinBlades.damage.value *= 1 + parseFloat(varianWeaponDamageBase.multiplicativeModifier.varianTwinBladesOfFuryWeapon.modifier);
      varianTwinBlades.period.value /= 1 + parseFloat(twinBladesMods.modification.unifiedAttackSpeedFactor);
      unitStats.set(unitData.id + 'TwinBlades', varianTwinBlades);
    }
    //Fix for Rexxar: Manually add Misha's stats
    else if (unitData.id === 'HeroRexxar') {
      const mishaData = jsonFindId(heroData, 'RexxarMisha');
      unitStats.set(mishaData.id, extractUnitStats(mishaData, heroData));
    }
  }

  //Sort hero stats in a proper order
  if (heroData.id === 'DVa') {
    const mech = unitStats.get('HeroDVaMech');
    const pilot = unitStats.get('HeroDVaPilot');

    mech.unitName = jsonFindId(heroData.abilities, 'DVaMechMechMode').name.kokr;
    pilot.unitName = '조종사 모드';

    return [mech, pilot];
  }
  if (heroData.id === 'LostVikings')
    return [unitStats.get('HeroOlaf'), unitStats.get('HeroBaleog'), unitStats.get('HeroErik')];

  //Remove non-hero units of Abathur, Chen, Ragnaros, Medivh, and Lt. Morales
  for (const heroUnitId of ['HeroAbathur', 'HeroChen', 'HeroRagnaros', 'HeroMedivh', 'HeroMedic']) {
    const heroUnit = unitStats.get(heroUnitId);
    if (heroUnit) {
      unitStats.clear();
      unitStats.set(heroUnitId, heroUnit);
      break;
    }
  }

  //Unit count assertions
  console.assert(unitStats.size, 'No units found for ' + heroData.id);

  const EXPECTED_UNIT_COUNT = Object.freeze({
    'Alexstrasza': 2,
    'Rexxar': 2,
    'Varian': 4
  });
  const expectedUnitCount = EXPECTED_UNIT_COUNT[heroData.id] || 1;
  console.assert(unitStats.size <= expectedUnitCount, `Too many units (${unitStats.size}) found for ${heroData.id}, expected ${expectedUnitCount}`);
  console.assert(unitStats.size >= expectedUnitCount, `Not enough units (${unitStats.size}) found for ${heroData.id}, expected ${expectedUnitCount}`);

  //If there is only 1 unit, return it; otherwise, return an array of units
  if (unitStats.size === 1) {
    const unit = unitStats.values().next().value;
    delete unit.unitName;   //Omit unit names if there is only one unit
    return unit;
  }
  else
    return [...unitStats.values()];
}

/**
 * Extracts unit stat information from the given unit data.
 * @param {Object} unitData Data of a single unit
 * @param {Object} heroData Hero data that owns the unit data.
 * @return {HeroStats} Unit stat information
 */
function extractUnitStats(unitData, heroData) {
  if (!(unitData && typeof unitData === 'object'))
    return undefined;

  /** @type {Partial<HeroStats>} */
  const stats = {
    unitName: toKoEnString(unitData.name).ko,
    hp: unitData.lifeMax,
    hpRegen: unitData.lifeRegenRate,
    radius: unitData.radius,
    speed: unitData.speed,
  };

  //Fix for Alexstrasza's Dragon form
  if (unitData.id === 'HeroAlexstraszaDragon')
    stats.hp.value = jsonFindId(heroData, 'HeroAlexstrasza').lifeMax.value + 500;

  //Fix for D.Va's mech
  if (unitData.id === 'HeroDVaMech')
    stats.speed += jsonFindId(unitData, 'DVaMechPermanentSlow').modification.moveSpeedBonus;

  //Fix for Rexxar's Misha
  if (unitData.id === 'RexxarMisha')
    stats.speed *= 1 + jsonFindId(unitData, 'RexxarMishaPassiveMoveSpeed').modification.unifiedMoveSpeedFactor;

  stats.speed = +(stats.speed.toFixed(4));

  Object.assign(stats, extractResourceInfo(unitData, heroData.id));

  if (unitData.shieldsMax) {
    stats.shields = {
      value: parseFloat(unitData.shieldsMax.value),
      levelScaling: unitData.shieldsMax.levelScaling
    };
  }

  Object.assign(stats, extractWeaponInfo(unitData.weapon, heroData));

  return new HeroStats(stats);
}

/**
 * Mapping of Hero ID => resource ID
 */
const HERO_RESOURCE_IDS = Object.freeze({
  DVa: 'charge',
  Medic: 'energy',
  Valeera: 'energy',
  Barbarian: 'fury',
  Auriel: 'healEnergy',
  Zarya: 'zaryaEnergy',
  Junkrat: 'ammo',
  Tracer: 'ammo',
  Chen: 'brew'
});


/**
 * Extracts unit resource information from the given unit data.
 * @param {Object} unitData Data of a single unit
 * @param {string} heroId ID of hero that owns the unit
 * @return {Partial<HeroStats>} Unit resource information
 */
function extractResourceInfo(unitData, heroId) {
  /** @type {Partial<HeroStats>} */
  const resourceInfo = {};

  if (unitData.energyMax) {
    if (unitData.energyMax >= 500) {    //Assume mana
      if (unitData.energyMax === 500)   //Assume standard mana curve
        resourceInfo.mp = { value: unitData.energyMax, levelAdd: 10 };
      else
        resourceInfo.mp = unitData.energyMax;

      if (unitData.energyRegenRate) {
        console.assert(unitData.energyRegenRate === 3, `Non-standard mana regen for ${unitData.id}`);
        resourceInfo.mpRegen = { value: unitData.energyRegenRate, levelAdd: 0.098 };
      }
    } else {
      const resourceId = HERO_RESOURCE_IDS[heroId];
      if (!resourceId)
        console.warn(`Unknown resource type for ${unitData.id}: ${unitData.energyMax}`);

      resourceInfo[resourceId] = unitData.energyMax;
      if (unitData.energyRegenRate)
        resourceInfo[resourceId + 'Regen'] = unitData.energyRegenRate;
    }
  }

  return resourceInfo;
}

/**
 * A set of weapon IDs that are always selected when multiple weapons are found.
 * Values are not used and have no meaning.
 */
const WEAPON_IDS_RESOLVE_MULTIPLE = {
  'HeroGreymaneRangedWeapon': 0,
  'HeroGreymaneWorgenWeapon': 0,
  'HeroBaleogBow': 0,
  'HeroDehaka': 0,
  'RexxarRangedWeapon': 0,
  'DryadHeroRangedWeapon': 0,
  'StukovHeroWeapon': 0,
  'HeroArtanis': 0,
  'NecromancerHeroWeapon': 0,
  'HeroZeratul': 0,
  'ChoHeroWeapon': 0,
  'AmazonHeroWeaponRanged': 0,
  'ChenFireHeroWeapon': 0,
  'ChenStormHeroWeapon': 0,
  'ChenEarthHeroWeapon': 0,
  'HeroNova': 0,
};

/**
 * Extracts weapon information from JSON weapon data.
 * @param {*} weaponData unitData.weapon value produced by heroes-parser
 * @param {Object} heroData Data object of the hero that owns the weapon
 * @return {Partial<HeroStats>} Object containing weapon information
 */
function extractWeaponInfo(weaponData, heroData) {
  if (!(weaponData && typeof weaponData === 'object')) return undefined;

  if (Array.isArray(weaponData)) {
    if (weaponData.find(w => w.id in WEAPON_IDS_RESOLVE_MULTIPLE))
      weaponData = weaponData.filter(w => w.id in WEAPON_IDS_RESOLVE_MULTIPLE);
  }
  else
    weaponData = [weaponData];

  const weaponInfo = { range: [], period: [], damage: [] };

  for (let weapon of weaponData) {
    if (weapon.link && typeof weapon.link === 'object')
      weapon = weapon.link;

    //Extract weapon range and attack period
    let { range, period } = weapon;

    //A valid weapon entry must have either a range or period
    if (!range && !period)
      continue;

    console.assert(range, `${heroData.id}: Missing ${weapon.id}.range`);
    console.assert(period, `${heroData.id}: Missing ${weapon.id}.period`);

    //Fix for Fenix
    if (weapon.id === 'FenixHeroWeapon') {
      const repeaterCannonBehavior = jsonFindId(heroData.abilities, 'FenixRepeaterCannonBehavior');
      period /= 1 + repeaterCannonBehavior.modification.additiveAttackSpeedFactor;
    }
    else if (weapon.id === 'FenixPhaseBombWeapon') {
      const phaseBombBehavior = jsonFindId(heroData.abilities, 'FenixPhaseBombBehavior');
      range += phaseBombBehavior.modification.weaponRange;
    }

    if (range && !weaponInfo.range.find(r => r.value === range))
      weaponInfo.range.push({ value: range });
    if (period && !weaponInfo.period.find(p => p.value === period))
      weaponInfo.period.push({ value: period });

    //Extract weapon damage
    const damageEffect = getDamageEffect(weapon.effects);
    if (damageEffect && damageEffect.amount) {
      let { value, levelScaling } = damageEffect.amount;

      //Fix for Sgt. Hammer
      if (damageEffect.multiplicativeModifier && damageEffect.multiplicativeModifier.siegeBonus)
        value *= 1 + parseFloat(damageEffect.multiplicativeModifier.siegeBonus.modifier);

      if (!weaponInfo.damage.find(d => d.value === value && d.levelScaling === levelScaling))
        weaponInfo.damage.push({ value, levelScaling });
    }
  }

  //Set alternate weapon names
  const ALTERNATE_WEAPON_NAMES = {
    'Greymane': ['인간', '늑대인간'],
    'Fenix': ['연발포', '위상 폭탄'],
    'SgtHammer': ['전차', '공성 모드'],
  };
  const altWeaponNames = ALTERNATE_WEAPON_NAMES[heroData.id];
  for (const [statId, statArray] of Object.entries(weaponInfo)) {
    if (statArray.length > 1 && altWeaponNames)
      statArray.forEach((s, index) => s.altName = altWeaponNames[index]);
    else {
      //Pick the first stat in each stat array
      weaponInfo[statId] = statArray[0];
    }
  }

  return weaponInfo;
}

/**
 * Recursively searches for a damage effect object related to basic attacks.
 * @param {Object} effect Root effect object
 * @return {{ effectType: 'damage', amount: ScalingStat } | undefined} Effect object if found, or `undefined`.
 */
function getDamageEffect(effect) {
  if (!(effect && typeof effect === 'object')) return undefined;

  if (Array.isArray(effect)) {
    const damageEffects = effect.map(e => getDamageEffect(e)).filter(e => e);
    return damageEffects.find(e => e.kind === 'Basic') || damageEffects[0];
  }

  if (effect.effectType === 'damage' && effect.amount)
    return effect;

  const SEARCH_PROPS = {
    'impactEffect': 0,
    'periodicEffects': 0,
    'default': 0,
    'areas': 0,     //Fix for Chen Earth
    'effects': 0    //Fix for Chen Earth
  };

  for (const propName in SEARCH_PROPS) {
    if (effect[propName]) {
      const damageEffect = getDamageEffect(effect[propName]);
      if (damageEffect)
        return damageEffect;
    }
  }

  return undefined;
}


/**
 * Parses all talents from the given hero data.
 * @param {Object} heroData JSON object that represents a hero
 * @return {{ [talentLevel: number]: Talent[] }} Collection of Talents, keyed by talent level
 */
function parseAllTalents(heroData) {
  const talents = {};

  for (const [talentLevel, talentDataArray] of Object.entries(heroData.talents))
    talents[+talentLevel] = talentDataArray.map(parseTalentData);

  return talents;
}


/**
 * Parses a Talent object from the given data.
 * @param {Object} talentData JSON object that represents a talent
 * @return {Talent} Talent object
 */
function parseTalentData(talentData) {
  return { name: toKoEnString(talentData.button.name) };
}


/**
 * Finds a talent by `talentName` in `hero`, and inserts the given subabilities
 * after it as talents.
 * @param {Hero} hero Hero
 * @param {Object} heroData JSON object that represents a hero
 * @param {string} talentName Name of talent to search for
 * @param  {...string} subAbilityNames Names of subabilities to insert
 */
function insertSubAbilitiesAfterTalent(hero, heroData, talentName, ...subAbilityNames) {
  for (const talentArray of Object.values(hero.talents)) {
    const talentIndex = talentArray.findIndex(talent => talent.name.ko === talentName);
    if (talentIndex !== -1) {
      const subAbilities = subAbilityNames.map(name => {
        const abilityData = jsonFind(heroData, o => o && o.button && o.button.name && o.button.name.kokr === name);
        return new Talent(abilityData ? parseTalentData(abilityData) : { name: { ko: name } });
      });

      talentArray.splice(talentIndex + 1, 0, ...subAbilities);
      return;
    }
  }
}


//-------- Utility functions --------//

/**
 * Recursively searches through the given JSON object, and returns the first
 * non-null object whose `id` property matches the given value.
 * Wraps around `jsonFind()`
 * @param {*} json
 * @param {string} id
 * @return {*} Matched object or `undefined`
 */
function jsonFindId(json, id) {
  return jsonFind(json, obj => obj && obj.id === id);
}

/**
 * Recursively searches through the given JSON object, and returns the first
 * value for which `callback` evaluates to true.
 * JSON equivalent (not really) of Array.prototype.find()
 * @param {*} json
 * @param {(value: *, key: number|string) => *} callback
 * @return {*} Matched object or `undefined`
 */
function jsonFind(json, callback, key = undefined) {
  if (callback(json, key)) return json;

  let result;
  if (json && typeof json === 'object') {
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; ++i)
        if (result = jsonFind(json[i], callback, i)) return result;
    }
    else {
      for (const objKey in json)
        if (result = jsonFind(json[objKey], callback, objKey)) return result;
    }
  }

  return undefined;
}

/**
 * Extracts the life regen modification value from the given behavior object.
 * @param {{ modification: * }} mod Behavior object
 * @return {number} Life regen modification value
 */
function getLifeRegenModification(mod) {
  if (mod.modification.vitalRegen)
    return mod.modification.vitalRegen.life.value;
  else
    return mod.modification.vitalRegenModification.life;
}

/**
 * Extracts a KR/En string from plain strings and multi-locale string objects.
 * @param {string | { kokr: string, enus: string }} str Plain string or multi-locale string object
 * @return {string} Korean string
 */
function toKoEnString(str) {
  return new KoEnString(typeof str === 'string' ? str.trim() : {
    ko: str.kokr.trim(),
    en: str.enus.trim().replace(/’/g, "'"),
  });
}