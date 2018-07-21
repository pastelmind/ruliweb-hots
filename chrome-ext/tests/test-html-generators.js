#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

//Mocks for HotsDialog

global.Mustache = require('mustache');
global.chrome = {
  runtime: {
    getURL: url => url,
    getManifest: () => ({ version: 'test-ver' })
  }
};

const HotsDialog = require('../src/js/hots-dialog');

/**
 * Retrieves the contents of the HTML file in the expected/ directory
 * @param {string} fileName HTML file name without the .html extension
 * @return {string} HTML source with newlines normalized to LF
 */
function getExpectedHtml(fileName) {
  return fs.readFileSync(path.join(__dirname, `expected/${fileName}.html`), 'utf8').replace(/\r/g, '');
}

describe('HotsDialog.htmlGenerators', () => {
  let hotsData;


  before('Loading test data files', () => {
    hotsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/hots.json'), 'utf8'));
    for (const heroId in hotsData.heroes) {
      const hero = hotsData.heroes[heroId];
      hero.id = heroId;
      hero.skills.forEach((skill, index) => skill.index = index);   //TODO use data prepare function
    }

    const templateFileContent = fs.readFileSync(path.join(__dirname, `../src/js/templates.js`), 'utf8');
    HotsDialog.htmlGenerators.templates = JSON.parse(templateFileContent.replace(/^[^{]*/, ''));
  });


  describe('Dialog templates', () => {
    it('generates dialog content correctly', () => {
      const dialogHtml =
        HotsDialog.htmlGenerators.generateDialogContent(HotsDialog.heroFilters, hotsData.heroes);

      // fs.writeFileSync(path.join(__dirname, 'expected/dialog.html'), dialogHtml);
      assert.strictEqual(dialogHtml, getExpectedHtml('dialog'));
    });

    it('generates skill icons correctly', () => {
      const skillIconsHtml =
        HotsDialog.htmlGenerators.generateSkillIcons(hotsData.heroes.gazlowe);

      // fs.writeFileSync(path.join(__dirname, 'expected/dialog-skills.html'), skillIconsHtml);
      assert.strictEqual(skillIconsHtml, getExpectedHtml('dialog-skills'));
    });

    it('generates talent list correctly', () => {
      const talentIconsHtml =
        HotsDialog.htmlGenerators.generateTalentList(hotsData.heroes.gazlowe);

      // fs.writeFileSync(path.join(__dirname, 'expected/dialog-talents.html'), talentIconsHtml);
      assert.strictEqual(talentIconsHtml, getExpectedHtml('dialog-talents'));
    });
  });


  describe('Inserted templates', () => {
    it('generates hero info table correctly', () => {
      let heroInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes))
        heroInfoHtml += HotsDialog.htmlGenerators.generateHeroInfoTable(hero, hotsData.hotsVersion, hotsData.statPresets);

      // fs.writeFileSync(path.join(__dirname, 'expected/insert-hero-info.html'), heroInfoHtml);
      assert.strictEqual(heroInfoHtml, getExpectedHtml('insert-hero-info'));
    });

    it('generates skill info table correctly', () => {
      let skillInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes)) {
        for (const skill of hero.skills) {
          skillInfoHtml += HotsDialog.htmlGenerators.generateSkillInfoTable(skill);
          skillInfoHtml += HotsDialog.htmlGenerators.generateSkillInfoTable(skill, '34.3');
        }
      }

      // fs.writeFileSync(path.join(__dirname, 'expected/insert-skill-info.html'), skillInfoHtml);
      assert.strictEqual(skillInfoHtml, getExpectedHtml('insert-skill-info'));
    });

    it('generates talent info table correctly', () => {
      let talentInfoHtml = '';

      for (const hero of Object.values(hotsData.heroes)) {
        for (const talentLevel in hero.talents) {
          for (const talent of hero.talents[talentLevel]) {
            talentInfoHtml += HotsDialog.htmlGenerators.generateTalentInfoTable(talent);
            talentInfoHtml += HotsDialog.htmlGenerators.generateTalentInfoTable(talent, '34.3');
          }
        }
      }

      // fs.writeFileSync(path.join(__dirname, 'expected/insert-talent-info.html'), talentInfoHtml);
      assert.strictEqual(talentInfoHtml, getExpectedHtml('insert-talent-info'));
    });
  });
});

