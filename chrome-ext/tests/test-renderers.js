#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import snapshot from "snap-shot-it";

import { loadTemplates } from "./js/mocks.js";
import { decorateHotsData } from "../src/js/decorate-hots-data.js";
import { Renderer } from "../src/js/hots-dialog-renderer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("HotsDialog.Renderer", () => {
  let hotsData;
  let renderer;

  before("Loading test data files", async () => {
    hotsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/hots.json"), "utf8")
    );
    decorateHotsData(hotsData);

    const templates = await loadTemplates();
    renderer = new Renderer(templates);
  });

  describe("HotsBox templates", () => {
    it("generates hero boxes correctly", () => {
      const hero = hotsData.heroes.Tinker;
      snapshot(
        renderer.renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion)
      );
      snapshot(
        renderer.renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion, true)
      );
    });

    it("generates skill boxes correctly", () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        snapshot(renderer.renderSkillInfoTable(skill, 64));
      }
    });

    it("generates skill boxes (with version) correctly", () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        snapshot(renderer.renderSkillInfoTable(skill, 64, "34.3"));
      }
    });

    it("generates talent boxes correctly", () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        snapshot(renderer.renderTalentInfoTable(talent, 48));
      }
    });

    it("generates talent boxes (with version) correctly", () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        snapshot(renderer.renderTalentInfoTable(talent, 48, "34.3"));
      }
    });

    it("generates talent box groups correctly", () => {
      const hero = hotsData.heroes.Tinker;
      for (const talentGroup of Object.values(hero.talents)) {
        snapshot(renderer.renderTalentGroupInfoTable(talentGroup, 48));
      }
    });
  });
});
