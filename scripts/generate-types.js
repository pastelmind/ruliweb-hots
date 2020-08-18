#!/usr/bin/env node
/**
 * @file Generates TypeScript declarations (*.d.ts) from JSON schemas.
 */

import { promises as fsPromises } from "fs";
import { dirname, join as joinPath, relative as relativePath } from "path";
import { fileURLToPath } from "url";

import json2ts from "json-schema-to-typescript";

import {
  HDP_HERODATA_SCHEMA_PATH,
  HOTS_SCHEMA_PATH,
  loadHdpHeroDataSchema,
  loadHotsSchema,
} from "./schemas.js";

const { mkdir, writeFile } = fsPromises;
const { compile } = json2ts;
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {Parameters<compile>[0]} JsonSchema
 */

/**
 * Generates TypeScript type declarations from a JSON schema and saves it to a
 * file.
 * @param {JsonSchema | Promise<JsonSchema>} schemaPromise
 *    A JSON schema object, or a promise that resolves to one
 * @param {string} schemaPath
 *    Path of the JSON schema file (used for logging only)
 * @param {string} dtsPath Path to save the generated d.ts file to
 */
async function generateDtsFromSchema(schemaPromise, schemaPath, dtsPath) {
  const schema = await schemaPromise;

  if (!schema.title) {
    throw new Error("Schema has no title");
  }
  const dtsContent = await compile(schema, schema.title, {
    ignoreMinAndMaxItems: true,
  });

  await writeFile(dtsPath, dtsContent);
  console.log(
    "Conversion successful:",
    relativePath("", schemaPath),
    "->",
    relativePath("", dtsPath)
  );
}

(async () => {
  try {
    const DTS_DIR = joinPath(__dirname, "../generated-types/");

    // Create directory if it doesn't exist
    await mkdir(DTS_DIR, { recursive: true });

    await Promise.all([
      generateDtsFromSchema(
        loadHotsSchema(),
        HOTS_SCHEMA_PATH,
        joinPath(DTS_DIR, "hots.d.ts")
      ),
      generateDtsFromSchema(
        loadHdpHeroDataSchema(),
        HDP_HERODATA_SCHEMA_PATH,
        joinPath(DTS_DIR, "hdp-herodata.d.ts")
      ),
    ]);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();
