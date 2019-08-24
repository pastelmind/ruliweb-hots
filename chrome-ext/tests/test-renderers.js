#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const decorateHotsData = require('../src/js/decorate-hots-data');

// Mocks for HotsDialog
require('./js/mocks');
const HotsDialog = require('../src/js/hots-dialog');

/**
 * Retrieves the contents of the HTML file in the expected/ directory
 * @param {string} fileName HTML file name without the .html extension
 * @return {string} HTML source with newlines normalized to LF
 */
function getExpectedHtml(fileName) {
  return fs
    .readFileSync(path.join(__dirname, `expected/${fileName}.html`), 'utf8')
    .replace(/\r/g, '');
}

describe('HotsDialog.renderers', () => {
  let hotsData;


  before('Loading test data files', () => {
    hotsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/hots.json'), 'utf8')
    );
    decorateHotsData(hotsData);
  });


  describe('Dialog templates', () => {
    it('generates dialog content correctly', () => {
      const dialogHtml = HotsDialog.renderers
        .renderDialogContent(HotsDialog.heroFilters, hotsData.heroes);

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/dialog.html'), dialogHtml
      // );
      assert.strictEqual(dialogHtml, getExpectedHtml('dialog'));
    });

    it('generates skill icons correctly', () => {
      const skillIconsHtml =
        HotsDialog.renderers.renderSkillIcons(hotsData.heroes.Tinker);

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/dialog-skills.html'), skillIconsHtml
      // );
      assert.strictEqual(skillIconsHtml, getExpectedHtml('dialog-skills'));
    });

    it('generates talent list correctly', () => {
      const talentIconsHtml =
        HotsDialog.renderers.renderTalentList(hotsData.heroes.Tinker);

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/dialog-talents.html'), talentIconsHtml
      // );
      assert.strictEqual(talentIconsHtml, getExpectedHtml('dialog-talents'));
    });
  });


  describe('Inserted templates', () => {
    it('generates hero info table correctly', () => {
      let heroInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes)) {
        const heroBoxFull = HotsDialog.renderers
          .renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion);
        const heroBoxSimple = HotsDialog.renderers
          .renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion, true);
        heroInfoHtml += heroBoxFull + heroBoxSimple;
      }

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/insert-hero-info.html'), heroInfoHtml
      // );
      assert.strictEqual(heroInfoHtml, getExpectedHtml('insert-hero-info'));
    });

    it('generates skill info table correctly', () => {
      let skillInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes)) {
        for (const skill of hero.skills) {
          const skillBox = HotsDialog.renderers
            .renderSkillInfoTable(skill, 64);
          const skillBoxWithVersion = HotsDialog.renderers
            .renderSkillInfoTable(skill, 64, '34.3');
          skillInfoHtml += skillBox + skillBoxWithVersion;
        }
      }

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/insert-skill-info.html'),
      //   skillInfoHtml
      // );
      assert.strictEqual(skillInfoHtml, getExpectedHtml('insert-skill-info'));
    });

    it('generates talent info table correctly', () => {
      let talentInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes)) {
        for (const talentLevel in hero.talents) {
          for (const talent of hero.talents[talentLevel]) {
            const talentBox = HotsDialog.renderers
              .renderTalentInfoTable(talent, 48);
            const talentBoxWithVersion = HotsDialog.renderers
              .renderTalentInfoTable(talent, 48, '34.3');

            talentInfoHtml += talentBox + talentBoxWithVersion;
          }
        }
      }

      // fs.writeFileSync(
      //   path.join(__dirname, 'expected/insert-talent-info.html'),
      //   talentInfoHtml
      // );
      assert.strictEqual(talentInfoHtml, getExpectedHtml('insert-talent-info'));
    });
  });
});
