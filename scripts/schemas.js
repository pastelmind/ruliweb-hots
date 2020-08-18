/**
 * @file Provides paths and loaders for JSON schemas used throughout this
 * project.
 */

import { promises as fsPromises } from "fs";
import { dirname, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { readFile } = fsPromises;

/**
 * Type of the JSON schema object for `hots.json`
 * @typedef {import("../docs/hots-schema.json")} HotsSchema
 */

/**
 * Type of the JSON schema object for hero data JSON files generated by
 * HeroesDataParser
 * @typedef {import("../docs/hdp-herodata-schema.json")} HdpHeroDataSchema
 */

/**
 * Absolute path of the JSON schema for `hots.json`.
 */
export const HOTS_SCHEMA_PATH = resolvePath(
  __dirname,
  "../docs/hots-schema.json"
);

/**
 * Absolute path of the JSON schema for `herodata_*_enus.json` files, generated
 * by HeroesDataParser.
 */
export const HDP_HERODATA_SCHEMA_PATH = resolvePath(
  __dirname,
  "../docs/hdp-herodata-schema.json"
);

/**
 * Loads the JSON schema for `hots.json`.
 * @return {Promise<HotsSchema>}
 */
export async function loadHotsSchema() {
  return JSON.parse(await readFile(HOTS_SCHEMA_PATH, "utf8"));
}

/**
 * Loads the JSON schema for `hots.json`.
 * @return {Promise<HdpHeroDataSchema>}
 */
export async function loadHdpHeroDataSchema() {
  return JSON.parse(await readFile(HDP_HERODATA_SCHEMA_PATH, "utf8"));
}

/**
 * @typedef {
    Omit<HdpHeroDataSchema, "definitions">
    & { definitions: DefsWithTitle<HdpHeroDataSchema["definitions"]> }
  } HdpHeroDataKoSchema
*/

/**
 * Generates a Korean version of the HdpHeroData JSON schema, using the English
 * version as the base.
 * @param {HdpHeroDataSchema} schema English version of HdpHeroData schema
 * @return {HdpHeroDataKoSchema}
 */
export function createHdpHeroDataKoSchema(schema) {
  const { hero, unitLife, unitEnergy } = schema.definitions;
  const { difficulty, type, shield, roles, expandedRole } = hero.properties;

  // Translate enums
  const difficultyEnumKo = translateEnums(difficulty.enum, {
    Easy: "쉬움",
    Medium: "중간",
    Hard: "어려움",
    "Very Hard": "아주 어려움",
  });
  const heroTypeEnumKo = translateEnums(type.enum, {
    Melee: "근접",
    Ranged: "원거리",
  });
  const shieldTypeEnumKo = translateEnums(shield.properties.type.enum, {
    Shields: "보호막",
  });
  const rolesEnumKo = translateEnums(roles.items.enum, {
    Assassin: "암살자",
    Multiclass: "다중 역할",
    Specialist: "전문가",
    Support: "지원가",
    Warrior: "전사",
  });
  const expandedRoleEnumKo = translateEnums(expandedRole.enum, {
    Bruiser: "투사",
    Healer: "치유사",
    "Melee Assassin": "근접 암살자",
    "Ranged Assassin": "원거리 암살자",
    Support: "지원가",
    Tank: "전사",
  });
  const lifeTypeEnumKo = translateEnums(unitLife.properties.type.enum, {
    Health: "생명력",
  });
  const energyTypeEnumKo = translateEnums(unitEnergy.properties.type.enum, {
    Ammo: "탄약",
    Brew: "취기",
    Charge: "충전",
    Energy: "기력",
    Fury: "분노",
    Mana: "마나",
    "Stored Energy": "치유 에너지",
  });

  // Fix for Zarya, whose energy type is "Energy" in English, but is
  // translated differently from other Energy-based heroes
  energyTypeEnumKo.push("에너지");

  // Change title so that json-schema-to-typescript generates a different root
  // interface name from the new schema
  const title = schema.title + "Ko";

  // Change ID to prevent Ajv from complaining
  const $id = schema.$id.replace(/\.json$/, "-ko$&");

  // Construct new enums
  return {
    ...schema,
    $id,
    title,
    definitions: addTitleToDefs({
      ...schema.definitions,
      hero: {
        ...hero,
        properties: {
          ...hero.properties,
          difficulty: { ...difficulty, enum: difficultyEnumKo },
          type: { ...type, enum: heroTypeEnumKo },
          shield: {
            ...shield,
            properties: {
              ...shield.properties,
              type: { ...shield.properties.type, enum: shieldTypeEnumKo },
            },
          },
          roles: { ...roles, items: { ...roles.items, enum: rolesEnumKo } },
          expandedRole: { ...expandedRole, enum: expandedRoleEnumKo },
        },
      },
      unitLife: {
        ...unitLife,
        properties: {
          ...unitLife.properties,
          type: { ...unitLife.properties.type, enum: lifeTypeEnumKo },
        },
      },
      unitEnergy: {
        ...unitEnergy,
        properties: {
          ...unitEnergy.properties,
          type: { ...unitEnergy.properties.type, enum: energyTypeEnumKo },
        },
      },
    }),
  };
}

/**
 * @param {string[]} enums
 * @param {Object<string, string>} table Conversion table
 * @return {string[]}
 * @throws {Error} If a key is duplicated, is not found in `table`, or if any
 *    key-value pair in `table` is not used
 */
function translateEnums(enums, table) {
  /** @type {Set<string>} */
  const seen = new Set();
  const unseen = new Set(Object.keys(table));

  const translated = enums.map((key) => {
    if (seen.size === seen.add(key).size) {
      throw new Error(`Duplicate key in enum: '${key}'`);
    }

    if (!unseen.delete(key)) {
      throw new Error(`Cannot find translation for '${key}'`);
    }

    return table[key];
  });

  for (const unusedKey of unseen) {
    throw new Error(
      `Unused key/value in translation table: '${unusedKey}' -> '${table[unusedKey]}'`
    );
  }

  return translated;
}

/**
 * @template T
 * @typedef {{ [P in keyof T]: T[P] & { title: string } }} DefsWithTitle
 */

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Adds a title to all schema definitions.
 * @template {Record<string, any>} T
 * @param {T} definitions
 * @return {DefsWithTitle<T>}
 */
function addTitleToDefs(definitions) {
  /** @type {DefsWithTitle<T>} */
  const newDef = { ...definitions };

  for (const defId of Object.keys(newDef)) {
    newDef[defId].title = (newDef[defId].title || defId) + "Ko";
  }

  return newDef;
}