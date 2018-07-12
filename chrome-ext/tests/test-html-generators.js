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
    getManifest: () => JSON.parse(fs.readFileSync(path.join(__dirname, '../src/manifest.json')))
  }
};

const HotsDialog = require('../src/js/hots-dialog');

/**
 * Retrieves the contents of the HTML file in the expected/ directory
 * @param {string} fileName HTML file name without the .html extension
 * @return {string} HTML source
 */
function getExpectedHtml(fileName) {
  return fs.readFileSync(path.join(__dirname, `expected/${fileName}.html`), 'utf8');
}

describe('HotsDialog.htmlGenerators', () => {
  let heroes;


  before('Loading test data files', () => {
    heroes = JSON.parse(fs.readFileSync(
      path.join(__dirname, 'data/heroes.json'), 'utf8'));
    for (const heroId in heroes) {
      const hero = heroes[heroId];
      hero.id = heroId;
      hero.skills.forEach((skill, index) => skill.index = index);
    }

    const templateFileContent = fs.readFileSync(path.join(__dirname, `../src/js/templates.js`), 'utf8');
    HotsDialog.htmlGenerators.templates = JSON.parse(templateFileContent.replace(/^[^{]*/, ''));
  });


  describe('Dialog templates', () => {
    it('generates dialog content correctly', () => {
      const dialogHtml =
        HotsDialog.htmlGenerators.generateDialogContent(HotsDialog.heroFilters, heroes);

      assert.strictEqual(dialogHtml, getExpectedHtml('dialog'));
    });

    it('generates skill icons correctly', () => {
      const skillIconsHtml =
        HotsDialog.htmlGenerators.generateSkillIcons(heroes.gazlowe);

      assert.strictEqual(skillIconsHtml, getExpectedHtml('dialog-skills'));
    });

    it('generates talent list correctly', () => {
      const talentIconsHtml =
        HotsDialog.htmlGenerators.generateTalentList(heroes.gazlowe);

      assert.strictEqual(talentIconsHtml, getExpectedHtml('dialog-talents'));
    });
  });


  describe('Inserted templates', () => {
    it('generates hero info table correctly', () => {
      let heroInfoHtml = '';

      for (const heroId in heroes) {
        const hero = heroes[heroId];
        heroInfoHtml += HotsDialog.htmlGenerators.generateHeroInfoTable(hero);
      }

      // fs.writeFileSync(path.join(__dirname, 'expected/insert-hero-info.html'), heroInfoHtml);
      assert.strictEqual(heroInfoHtml, getExpectedHtml('insert-hero-info'));
    });

    it('generates skill info table correctly', () => {
      let skillInfoHtml = '';

      for (const heroId in heroes) {
        const hero = heroes[heroId];

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

      for (const heroId in heroes) {
        const hero = heroes[heroId];

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

