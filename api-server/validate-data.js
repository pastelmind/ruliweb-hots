#!/usr/bin/env node

/**
 * Validates hots.json using the schema (hots-schema.json) plus some logical
 * checks.
 */

const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');


//-------- Main code --------//


const hotsDataSchemaPath = path.join(__dirname, '../docs/hots-schema.json');
const hotsDataSchema = JSON.parse(fs.readFileSync(hotsDataSchemaPath, 'utf8'));
console.log('Loaded schema from', hotsDataSchemaPath);

const hotsDataPath = path.join(__dirname, '../docs/hots.json');
const hotsData = JSON.parse(fs.readFileSync(hotsDataPath, 'utf8'));
console.log('Loaded HotS data from', hotsDataPath);

const ajv = new Ajv({ multipleOfPrecision: 5 });
if (!ajv.validate(hotsDataSchema, hotsData)) {
  console.error('Schema validation failure');
  console.error(ajv.errorsText());
  throw ajv.errors;
}

console.log('Passed schema validation');

//Check if hotsData.heroes and hotsData.ptrHeroes are properly ordered by hero name
if (!isHeroCollectionSortedByName(hotsData.heroes))
  throw new Error(`hotsData.heroes is not sorted`);

if (!isHeroCollectionSortedByName(hotsData.ptrHeroes || {}))
  throw new Error(`hotsData.ptrHeroes is not sorted`);

//Check for duplicate stat presets
const statPresets = {};
for (const preset of hotsData.statPresets) {
  if (preset.id in statPresets)
    throw new Error(`Duplicate stat preset ID found: ${preset.id}`);
  statPresets[preset.id] = preset;
}

console.log('Passed data validation');


//-------- Support functions --------//

/**
 * Tests if a collection of heroes is sorted by hero name
 * @param {Object<string, any>} heroes Mapping of hero ID to hero object
 * @return {boolean}
 */
function isHeroCollectionSortedByName(heroes) {
  let heroA = null;

  for (const heroB of Object.values(heroes)) {
    if (heroA && heroA.name.localeCompare(heroB.name, 'en') > 0) {
      console.error(`Unsorted heroes found: ${heroA.name} should be after ${heroB.name}`);
      return false;
    }

    heroA = heroB;
  }

  return true;
}