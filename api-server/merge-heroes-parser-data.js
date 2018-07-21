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


const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);
const writeFileAsync = util.promisify(fs.writeFile);


//Compatibility code for Node v8.11
//TODO Erase when upgraded to Node v10
(() => {
  if (parseInt(process.version.match(/\d+/)[0]) >= 10) return;
  const { AssertionError } = require('assert');

  const oldAssert = console.assert;
  console.assert = (value, message, ...args) => {
    try {
      oldAssert(value, message, ...args);
    }
    catch (e) {
      if (e instanceof AssertionError)
        console.error(e.stack);
      else
        throw e;
    }
  };
})();


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

  program.inputJson = path.resolve(program.inputJson);
  const hotsDataInput = await readFileAsync(program.inputJson, 'utf8');
  const hotsData = JSON.parse(hotsDataInput);
  const heroArray = Object.values(hotsData.heroes);

  const dataFiles = await readdirAsync(program.dataDir);

  for (const dataFile of dataFiles) {
    try {
      const heroDataSource = await readFileAsync(path.join(program.dataDir, dataFile), 'utf8');
      const heroData = JSON.parse(heroDataSource);
      const hero = heroArray.find(hero => hero.name === heroData.name);

      if (hero)
        hero.stats = extractAllHeroUnitStats(heroData);
      else
        console.warn('Cannot find hero with name:', heroData.name, '(skipped)');
    }
    catch (e) {
      console.error(e); //Report and consume error
    }
  }

  //Fix for Cho'Gall
  const gallStats = hotsData.heroes.gall.stats, choStats = hotsData.heroes.cho.stats;
  gallStats.hp = choStats.hp;
  gallStats.hpRegen = choStats.hpRegen;
  gallStats.radius = choStats.radius;
  gallStats.speed = choStats.speed;

  program.outputJson = path.resolve(program.outputJson);
  await writeFileAsync(program.outputJson, JSON.stringify(hotsData, null, 2));
  console.log('HotS data saved to', program.outputJson);

})();


/**
 * Extracts Hero unit stats from the given hero data.
 * @param {Object} heroData
 * @return {UnitStatInfo | UnitStatInfo[]} Stat info of a single unit, or an array of unit stat infos
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

      const varianTaunt = Object.assign({}, unit);
      varianTaunt.unitName = jsonFindId(heroData.abilities, 'VarianTaunt').name;
      varianTaunt.hp = Object.create(unit.hp);
      varianTaunt.hpRegen = Object.create(unit.hpRegen);
      varianTaunt.hp.value *= 1 + parseFloat(tauntMods.modification.vitalMaxFraction.life.value);
      varianTaunt.hpRegen.value += parseFloat(tauntMods.modification.vitalRegen.life.value);
      unitStats.set(unitData.id + 'Taunt', varianTaunt);

      const varianColossusSmash = Object.assign({}, unit);
      varianColossusSmash.unitName = jsonFindId(heroData.abilities, 'VarianColossusSmash').name;
      varianColossusSmash.damage = Object.create(unit.damage);
      varianColossusSmash.hp = Object.create(unit.hp);
      varianColossusSmash.hpRegen = Object.create(unit.hpRegen);
      varianColossusSmash.damage.value *= 1 + parseFloat(varianWeaponDamageBase.multiplicativeModifier.varianColossusSmashWeapon.modifier);
      varianColossusSmash.hp.value *= 1 + parseFloat(colossusSmashMods.modification.vitalMaxFraction.life.value);
      varianColossusSmash.hpRegen.value += parseFloat(colossusSmashMods.modification.vitalRegen.life.value);
      unitStats.set(unitData.id + 'ColossusSmash', varianColossusSmash);

      const varianTwinBlades = Object.assign({}, unit);
      varianTwinBlades.unitName = jsonFindId(heroData.abilities, 'VarianTwinBladesofFury').name;
      varianTwinBlades.damage = Object.create(unit.damage);
      varianTwinBlades.damage.value *= 1 + parseFloat(varianWeaponDamageBase.multiplicativeModifier.varianTwinBladesOfFuryWeapon.modifier);
      varianTwinBlades.period /= 1 + parseFloat(twinBladesMods.modification.unifiedAttackSpeedFactor);
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

    mech.unitName = '로봇 모드';
    pilot.unitName = '조종사 모드';

    return [mech, pilot];
  }
  if (heroData.id === 'LostVikings')
    return [unitStats.get('HeroOlaf'), unitStats.get('HeroBaleog'), unitStats.get('HeroErik')];

  //Fix for Chen: Remove Earth, Wind, and Fire
  if (heroData.id === 'Chen') {
    const chen = unitStats.get('HeroChen');
    unitStats.clear();
    unitStats.set('HeroChen', chen);
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
 * @typedef {{ value: number, levelScaling: number }} ScalingStat
 */

/**
 * @typedef {Object} UnitStatInfo
 * @property {string} unitName
 * @property {ScalingStat} hp
 * @property {ScalingStat =} hpRegen
 * @property {ScalingStat =} mp
 * @property {ScalingStat =} mpRegen
 * @property {number =} charge
 * @property {number =} energy
 * @property {number =} fury
 * @property {ScalingStat =} healEnergy
 * @property {number =} zaryaEnergy
 * @property {number =} ammo
 * @property {number =} brew
 * @property {ScalingStat =} shields
 * @property {number} radius
 * @property {number} speed
 * @property {ScalingStat | ScalingStat[] =} damage
 * @property {number | number[] =} range
 * @property {number | number[] =} period
 */

/**
 * Extracts unit stat information from the given unit data.
 * @param {Object} unitData Data of a single unit
 * @param {Object} heroData Hero data that owns the unit data.
 * @return {UnitStatInfo} Unit stat information
 */
function extractUnitStats(unitData, heroData) {
  if (!(unitData && typeof unitData === 'object')) return undefined;

  const stats = {
    unitName: unitData.name,
    hp: {
      value: unitData.lifeMax.value,
      levelScaling: unitData.lifeMax.levelScaling
    },
    radius: unitData.radius,
    speed: unitData.speed
  };

  if (unitData.lifeRegenRate) {
    stats.hpRegen = {
      value: unitData.lifeRegenRate.value,
      levelScaling: unitData.lifeRegenRate.levelScaling
    };
  }

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

  Object.assign(stats, extractResourceInfo(unitData));

  if (unitData.shieldsMax) {
    stats.shields = {
      value: parseFloat(unitData.shieldsMax.value),
      levelScaling: unitData.shieldsMax.levelScaling
    };
  }

  const weapons = extractWeaponInfo(unitData.weapon, heroData);
  if (weapons) {
    let weapon1, weapon2;
    if (Array.isArray(weapons)) {
      console.assert(weapons.length === 2, `Invalid number of weapons found (${weapons.length}), expected 2`);
      weapon1 = weapons[0];
      weapon2 = weapons[1];
    }
    else {
      weapon1 = weapons;
      weapon2 = null;
    }

    Object.assign(stats, weapon1);

    if (weapon2) {
      if (weapon1.damage.value !== weapon2.damage.value || weapon1.damage.levelScaling !== weapon2.damage.levelScaling)
        stats.damage = [stats.damage, weapon2.damage];

      if (weapon1.range !== weapon2.range)
        stats.range = [stats.range, weapon2.range];

      if (weapon1.period !== weapon2.period)
        stats.period = [stats.period, weapon2.period];
    }
  }

  return stats;
}


/**
 * @typedef {Object} UnitResourceInfo
 * @property {ScalingStat =} mp
 * @property {ScalingStat =} mpRegen
 * @property {number =} charge
 * @property {number =} energy
 * @property {number =} fury
 * @property {ScalingStat =} healEnergy
 * @property {number =} zaryaEnergy
 * @property {number =} ammo
 * @property {number =} brew
 */

/**
 * Extracts unit resource information from the given unit data.
 * @param {Object} unitData Data of a single unit
 * @param {Object} heroData Hero data that owns the unit data.
 * @return {UnitResourceInfo} Unit resource information
 */
function extractResourceInfo(unitData) {
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
      let resourceId = null;

      switch (unitData.id) {
        case 'HeroDVaPilot': case 'HeroDVaMech':
          resourceId = 'charge'; break;
        case 'HeroMedic': case 'HeroValeera':
          resourceId = 'energy'; break;
        case 'HeroBarbarian':
          resourceId = 'fury'; break;
        case 'HeroAuriel':
          resourceId = 'healEnergy'; break;
        case 'HeroZarya':
          resourceId = 'zaryaEnergy'; break;
        case 'HeroJunkrat': case 'HeroTracer':
          resourceId = 'ammo'; break;
        case 'HeroChen':
          resourceId = 'brew'; break;
        default:
          console.warn(`Unknown resource type for ${unitData.id}: ${unitData.energyMax}`);
      }

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
const WEAPON_IDS_RESOLVE_MULTIPLE = Object.freeze({
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
  'ChenEarthHeroWeapon': 0
});

/**
 * @typedef {Object} WeaponInfo
 * @property {number} range Attack range
 * @property {number} period Attack period (inverse of attack speed)
 * @property {ScalingStat} damage Attack damage
 */

/**
 * Extracts weapon information from JSON weapon data.
 * @param {*} weaponData unitData.weapon value produced by heroes-parser
 * @param {Object} heroData Data object of the hero that owns the weapon
 * @return {WeaponInfo|WeaponInfo[]} Weapon info, or an array of weapon info
 */
function extractWeaponInfo(weaponData, heroData) {
  if (!(weaponData && typeof weaponData === 'object')) return undefined;

  if (Array.isArray(weaponData)) {
    if (weaponData.find(w => w.id in WEAPON_IDS_RESOLVE_MULTIPLE))
      weaponData = weaponData.filter(w => w.id in WEAPON_IDS_RESOLVE_MULTIPLE);

    const weapons = weaponData.map(weapon => extractWeaponInfo(weapon, heroData)).filter(w => w);
    return weapons.length <= 1 ? weapons[0] : weapons;
  }

  if (weaponData.link && typeof weaponData.link === 'object')
    return extractWeaponInfo(weaponData.link, heroData);

  if (!(weaponData.range && weaponData.period))
    return undefined;

  console.assert(weaponData.range, `${weaponData.id}: Missing weaponData.range`);
  console.assert(weaponData.period, `${weaponData.id}: Missing weaponData.period`);

  const weaponInfo = { range: weaponData.range, period: weaponData.period };

  const damageEffect = getDamageEffect(weaponData.effects);
  if (damageEffect && damageEffect.amount) {
    console.assert(Number.isInteger(damageEffect.amount.levelScaling * 200), `${damageEffect.amount.levelScaling} is not a multiple of 0.005`);

    weaponInfo.damage = {
      value: damageEffect.amount.value,
      levelScaling: damageEffect.amount.levelScaling
    };

    //Fix for Sgt. Hammer
    if (damageEffect.multiplicativeModifier) {
      if (damageEffect.multiplicativeModifier.siegeBonus)
        weaponInfo.damage.value *= 1 + parseFloat(damageEffect.multiplicativeModifier.siegeBonus.modifier);
    }
  }
  else {
    //Manual fix for Fenix to compensate for bug in heroes-parser
    if (weaponData.id === 'FenixHeroWeapon') {
      const phaseBombWeaponDamage = jsonFindId(heroData.units, 'FenixHeroPhaseBombWeaponDamage');

      weaponInfo.damage = {
        value: phaseBombWeaponDamage.amount.value / 1.25,
        levelScaling: phaseBombWeaponDamage.amount.levelScaling
      };
    }
    else
      return undefined;
  }

  //Fix for Fenix
  if (weaponData.id === 'FenixHeroWeapon') {
    const repeaterCannonBehavior = jsonFindId(heroData.abilities, 'FenixRepeaterCannonBehavior');

    weaponInfo.period /= 1 + repeaterCannonBehavior.modification.additiveAttackSpeedFactor;
  }
  else if (weaponData.id === 'FenixPhaseBombWeapon') {
    const phaseBombBehavior = jsonFindId(heroData.abilities, 'FenixPhaseBombBehavior');

    weaponInfo.range += phaseBombBehavior.modification.weaponRange;
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
      if (damageEffect) return damageEffect;
    }
  }

  return undefined;
}


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