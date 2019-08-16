#!/usr/bin/env node
'use strict';

/**
 * Validates hots.json using the schema (hots-schema.json) plus some logical
 * checks.
 */

const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');

const HotsData = require('./src/hots-data');


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
    } catch (error) {
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
    // Validate against the schema
    if (!this.schemaValidator(hotsDataJson)) {
      console.error(this.ajv.errorsText(this.schemaValidator.errors));
      throw this.schemaValidator.errors;
    }

    // Check if hotsData.heroes and hotsData.ptrHeroes are properly sorted by
    // hero ID
    if (!isObjectSortedByKey(hotsDataJson.heroes)) {
      throw new Error(`hotsData.heroes is not sorted`);
    }

    if (!isObjectSortedByKey(hotsDataJson.ptrHeroes || {})) {
      throw new Error(`hotsData.ptrHeroes is not sorted`);
    }

    const KNOWN_HERO_COUNT = 87;

    // Warn if # of heroes is different than the expected value
    const heroCount = Object.keys(hotsDataJson.heroes).length;
    if (heroCount !== KNOWN_HERO_COUNT) {
      console.warn(
        `Warning: Hero count is ${heroCount},`,
        `expected ${KNOWN_HERO_COUNT}`
      );
    }

    // Warn if # of PTR heroes is bigger than the expected value
    if (hotsDataJson.ptrHeroes) {
      const ptrHeroCount = Object.keys(hotsDataJson.ptrHeroes).length;
      if (ptrHeroCount > KNOWN_HERO_COUNT) {
        console.warn(
          `Warning: PTR Hero count is ${ptrHeroCount},`,
          `expected at most ${KNOWN_HERO_COUNT}`
        );
      }
    }

    // Check if hotsData.iconUrls is sorted by key
    if (!isObjectSortedByKey(hotsDataJson.iconUrls)) {
      throw new Error(`hotsData.iconUrls is not sorted`);
    }

    // Check if no two icon IDs point to the same URL
    const iconUrlsToIds = {};
    for (const [iconId, url] of Object.entries(hotsDataJson.iconUrls)) {
      if (url in iconUrlsToIds) {
        console.warn(
          `Duplicate icon URL: Both ${iconUrlsToIds[url]} and ${iconId}`,
          `point to ${url}`
        );
      } else iconUrlsToIds[url] = iconId;
    }

    // Check if no hero, skill, or talent is missing an icon
    // Also check if any icons are unused
    const hotsData = new HotsData(hotsDataJson);
    const unusedIcons = new Set(Object.keys(hotsData.iconUrls));

    for (const hero of hotsData.allHeroes()) {
      if (hero.icon in hotsData.iconUrls) unusedIcons.delete(hero.icon);
      else console.warn(`Warning: Missing hero icon for ${hero.name}`);

      for (const skill of hero.allSkillsAndTalents()) {
        if (skill.icon in hotsData.iconUrls) unusedIcons.delete(skill.icon);
        else {
          console.warn(
            `Warning: Missing icon for ${skill.name} in ${hero.name}`
          );
        }
      }
    }

    if (unusedIcons.size) {
      console.warn(`Warning: ${unusedIcons.size} unused icon(s) found`);
    }
  }
}


// -------- Main code -------- //

const hotsDataSchemaPath = path.join(__dirname, '../docs/hots-schema.json');
const hotsDataSchema = JSON.parse(fs.readFileSync(hotsDataSchemaPath, 'utf8'));
console.log('Loaded schema from', hotsDataSchemaPath);


let hotsJsonValidator;

try {
  hotsJsonValidator = new HotsJsonValidator(hotsDataSchema);
  console.log('Passed schema validation');
} catch (error) {
  console.error('Schema validation failure');
  throw error;
}

const HOTS_JSON_PATHS = Object.freeze([
  path.join(__dirname, '../docs/hots.json'),
  path.join(__dirname, '../chrome-ext/tests/data/hots.json'),
]);

for (const hotsDataPath of HOTS_JSON_PATHS) {
  const hotsDataJson = JSON.parse(fs.readFileSync(hotsDataPath, 'utf8'));
  console.log('Loaded HotS data from', hotsDataPath);

  console.group();

  try {
    hotsJsonValidator.validate(hotsDataJson);
    console.groupEnd();
    console.log('Passed data validation');
  } catch (error) {
    console.groupEnd();
    console.error('Failed validation for', hotsDataPath);
    throw error;
  }
}


// -------- Support functions -------- //

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
