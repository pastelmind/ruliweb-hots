#!/usr/bin/env node

/**
 * Validates hots.json using the schema (hots-schema.json) plus some logical
 * checks.
 */

const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');


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

//Check if hotsData.heroes is properly ordered by hero name
Object.values(hotsData.heroes).reduce((heroA, heroB) => {
  if (heroA.name > heroB.name)
    throw new Error(`Heroes are not sorted: ${heroA.name} should be after ${heroB.name}`);

  return heroB; //To continue iteration
});

//Check for duplicate stat presets
const statPresets = {};
for (const preset of hotsData.statPresets) {
  if (preset.id in statPresets)
    throw new Error(`Duplicate stat preset ID found: ${preset.id}`);
  statPresets[preset.id] = preset;
}

console.log('Passed data validation');