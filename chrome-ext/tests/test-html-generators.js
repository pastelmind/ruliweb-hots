#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const HotsDialog = require('../src/js/hots-dialog');

/**
 * Retrieves the contents of the HTML file in the expected/ directory
 * @param {string} fileName HTML file name without the .html extension
 * @return {string} HTML source
 */
function getExpectedHtml(fileName) {
  return fs.readFileSync(path.join(__dirname, `expected/${fileName}.html`), 'utf8');
}

describe('HotsDialog.templates', () => {
  let heroes;


  before('Loading test data files', () => {
    heroes = JSON.parse(fs.readFileSync(
      path.join(__dirname, 'data/heroes.json'), 'utf8'));
    for (const heroId in heroes) {
      const hero = heroes[heroId];
      hero.id = heroId;
      hero.skills.forEach((skill, index) => skill.index = index);
    }

    const templates = HotsDialog.htmlGenerators.templates = {};
    [
      'dialog', 'dialog-skills', 'dialog-talents',
      'insert-hero', 'insert-skill', 'insert-talent'
    ].forEach(templateName => {
      templates[templateName] = fs.readFileSync(
        path.join(__dirname, `../src/templates/${templateName}.mustache`), 'utf8');
    });
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
    it('generates skill info table correctly', () => {
      let skillInfoHtml = '';

      for (const heroId in heroes) {
        const hero = heroes[heroId];

        for (const skill of hero.skills) {
          skillInfoHtml += HotsDialog.htmlGenerators.generateSkillInfoTable(skill) + '\r\n';
          skillInfoHtml += HotsDialog.htmlGenerators.generateSkillInfoTable(skill, '34.3') + '\r\n';
        }
      }

      assert.strictEqual(skillInfoHtml, getExpectedHtml('insert-skill-info'));
    });

    it('generates talent info table correctly', () => {
      let talentInfoHtml = '';

      for (const heroId in heroes) {
        const hero = heroes[heroId];

        for (const talentLevel in hero.talents) {
          for (const talent of hero.talents[talentLevel]) {
            talentInfoHtml += HotsDialog.htmlGenerators.generateTalentInfoTable(talent) + '\r\n';
            talentInfoHtml += HotsDialog.htmlGenerators.generateTalentInfoTable(talent, '34.3') + '\r\n';
          }
        }
      }

      assert.strictEqual(talentInfoHtml, getExpectedHtml('insert-talent-info'));
    });
  });
});

