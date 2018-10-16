#!/usr/bin/env node
'use strict';

/**
 * Validates hots.json using the schema (hots-schema.json) plus some logical
 * checks.
 */

const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');


/**
 * Class that validates `hots.json` files.
 */
class HotsJsonValidator {
  /**
   * Initilize HotsJsonValidator and validates the given JSON schema.
   * If the JSON schema is invalid, prints the error text to stderr and throws
   * the error object.
   * @param {*} hotsDataSchema JSON schema object for `hots.json`
   */
  constructor(hotsDataSchema) {
    this.ajv = new Ajv({ multipleOfPrecision: 5 });

    try {
      this.schemaValidator = this.ajv.compile(hotsDataSchema);
    }
    catch (error) {
      console.error(this.ajv.errorsText());
      throw error;
    }
  }

  /**
   * Validates the contents of a `hots.json` file.
   * If validation fails, prints errors to stderr before throwing errors.
   * @param {*} hotsDataJson Contents of `hots.json`
   */
  validate(hotsDataJson) {
    //Validate against the schema
    if (!this.schemaValidator(hotsDataJson)) {
      console.error(this.ajv.errorsText(this.schemaValidator.errors));
      throw this.schemaValidator.errors;
    }

    //Check if hotsData.heroes and hotsData.ptrHeroes are properly sorted by hero ID
    if (!isObjectSortedByKey(hotsDataJson.heroes))
      throw new Error(`hotsData.heroes is not sorted`);

    if (!isObjectSortedByKey(hotsDataJson.ptrHeroes || {}))
      throw new Error(`hotsData.ptrHeroes is not sorted`);

    //Check for duplicate stat presets
    const statPresetIdsFound = {};
    for (const preset of hotsDataJson.statPresets) {
      if (preset.id in statPresetIdsFound)
        throw new Error(`Duplicate stat preset ID found: ${preset.id}`);
      statPresetIdsFound[preset.id] = preset;
    }

    const KNOWN_HERO_COUNT = 83;

    //Warn if # of heroes is different than the expected value
    const heroCount = Object.keys(hotsDataJson.heroes).length;
    if (heroCount !== KNOWN_HERO_COUNT)
      console.warn(`Warning: Hero count is ${heroCount}, expected ${KNOWN_HERO_COUNT}`);

    //Warn if # of PTR heroes is bigger than the expected value
    if (hotsDataJson.ptrHeroes) {
      const ptrHeroCount = Object.keys(hotsDataJson.ptrHeroes).length;
      if (ptrHeroCount > KNOWN_HERO_COUNT)
        console.warn(`Warning: PTR Hero count is ${ptrHeroCount}, expected at most ${KNOWN_HERO_COUNT}`);
    }
  }
}


//-------- Main code --------//

const hotsDataSchemaPath = path.join(__dirname, '../docs/hots-schema.json');
const hotsDataSchema = JSON.parse(fs.readFileSync(hotsDataSchemaPath, 'utf8'));
console.log('Loaded schema from', hotsDataSchemaPath);


let hotsJsonValidator;

try {
  hotsJsonValidator = new HotsJsonValidator(hotsDataSchema);
  console.log('Passed schema validation');
}
catch (error) {
  console.error('Schema validation failure');
  throw error;
}

const HOTS_JSON_PATHS = Object.freeze([
  path.join(__dirname, '../docs/hots.json'),
  path.join(__dirname, '../chrome-ext/tests/data/hots.json')
]);

for (const hotsDataPath of HOTS_JSON_PATHS) {
  const hotsDataJson = JSON.parse(fs.readFileSync(hotsDataPath, 'utf8'));
  console.log('Loaded HotS data from', hotsDataPath);

  try {
    hotsJsonValidator.validate(hotsDataJson);
    console.log('Passed data validation');
  }
  catch (error) {
    console.error('Failed validation for', hotsDataPath);
    throw error;
  }
}


//-------- Support functions --------//

/**
 * Tests if an object's keys are sorted
 * @param {Object<string, any>} obj Object
 * @return {boolean}
 */
function isObjectSortedByKey(obj) {
  let prevKey = null;

  for (const key of Object.keys(obj)) {
    if (prevKey !== null && prevKey > key) {
      console.error(`Unsorted key found: ${prevKey} should be after ${key}`);
      return false;
    }

    prevKey = key;
  }

  return true;
}