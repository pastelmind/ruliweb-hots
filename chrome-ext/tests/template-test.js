#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */


const assert = require('assert');
const fs = require('fs');
const path = require('path');
const HotsDialog = require('../src/js/hots-dialog');

/**
 * Trims each line of a multiline string
 * @param {string} str
 * @return Result string with each line trimmed
 */
function trimLines(str) {
  return str.split('\n').map(line => line.trim()).join('\n');
}

describe('HotsDialog.templates', () => {
  let heroes;
  let refHtml;


  before('Loading test data files', () => {
    heroes = JSON.parse(fs.readFileSync(
      path.join(__dirname, 'data/heroes.json'), 'utf8'));
    for (const heroId in heroes) {
      const hero = heroes[heroId];
      hero.id = heroId;
      hero.skills.forEach((skill, index) => skill.index = index);
    }

    refHtml = {};
    [
      'dialog-heroes', 'dialog-skills', 'dialog-talents'
    ].forEach(refName => {
      refHtml[refName] = fs.readFileSync(
        path.join(__dirname, `expected/${refName}.html`), 'utf8');
    });

    const templates = HotsDialog.htmlGenerators.templates = {};
    [
      'dialog', 'dialog-heroes', 'dialog-skills', 'dialog-talents',
      'insert-hero', 'insert-skill', 'insert-talent'
    ].forEach(templateName => {
      templates[templateName] = fs.readFileSync(
        path.join(__dirname, `../src/templates/${templateName}.mustache`), 'utf8');
    });
  });


  describe('Dialog templates', () => {
    it('generates hero icons correctly', () => {
      const heroIconsHtml =
        HotsDialog.htmlGenerators.generateHeroIcons(Object.values(heroes));

      assert.strictEqual(heroIconsHtml, refHtml['dialog-heroes']);
    });

    it('generates skill icons correctly', () => {
      const skillIconsHtml =
        HotsDialog.htmlGenerators.generateSkillIcons(heroes.gazlowe);

      assert.strictEqual(skillIconsHtml, refHtml['dialog-skills']);
    });

    it('generates talent list correctly', () => {
      const talentIconsHtml =
        HotsDialog.htmlGenerators.generateTalentList(heroes.gazlowe);

      assert.strictEqual(talentIconsHtml, refHtml['dialog-talents']);
    });
  });
});

