#!/usr/bin/env node

/**
 * Test script for models
 */

import { strict as assert } from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { HotsData } from "../src/hots-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("Hero", () => {
  let heroJsonCompact;
  /** @type {{ [heroId: string]: import("../src/hero").Hero }} */
  let heroes;

  before("Loading test data files", () => {
    heroJsonCompact = JSON.parse(
      fs.readFileSync(path.join(__dirname, "input/heroes.json"), "utf8")
    );
  });

  it("should load JSON correctly", () => {
    heroes = HotsData.unpackHeroes(heroJsonCompact);
  });

  it("should provide an iterator for each skill/talent", () => {
    for (const hero of Object.values(heroes)) {
      const skillCount = hero.skills.length;
      const talentCount = [...hero.allTalents()].length;

      const rawHeroData = heroJsonCompact[hero.id];
      assert.equal(
        skillCount,
        rawHeroData.skills.length,
        hero.id + ": # of parsed skills is different"
      );

      const expectedTalentCount = Object.values(rawHeroData.talents)
        .map((arr) => arr.length)
        .reduce((a, b) => a + b);
      assert.equal(
        talentCount,
        expectedTalentCount,
        hero.id + ": # of parsed talents is different"
      );
    }
  });
});
