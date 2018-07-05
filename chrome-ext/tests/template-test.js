#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */


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
      const skillInfoTableHtml =
        HotsDialog.htmlGenerators.generateSkillInfoTable(heroes.rexxar.skills[1]);
      const skillInfoTableHtmlWithVersion =
        HotsDialog.htmlGenerators.generateSkillInfoTable(heroes.rexxar.skills[2], '34.1');

      assert.strictEqual(skillInfoTableHtml, getExpectedHtml('insert-skill-info'));
      assert.strictEqual(skillInfoTableHtmlWithVersion, getExpectedHtml('insert-skill-info-version'));
    });

    it('generates talent info table correctly', () => {
      const talentInfoTableHtml =
        HotsDialog.htmlGenerators.generateSkillInfoTable(heroes.rexxar.talents['13'][1]);
      const talentInfoTableHtmlWithVersion =
        HotsDialog.htmlGenerators.generateSkillInfoTable(heroes.rexxar.talents['13'][2], '34.1');

      assert.strictEqual(talentInfoTableHtml, getExpectedHtml('insert-talent-info'));
      assert.strictEqual(talentInfoTableHtmlWithVersion, getExpectedHtml('insert-talent-info-version'));
    });
  });
});

