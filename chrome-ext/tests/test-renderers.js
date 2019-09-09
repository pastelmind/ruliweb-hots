#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

'use strict';

const fs = require('fs');
const path = require('path');

const snapshot = require('snap-shot-it');

const decorateHotsData = require('../src/js/decorate-hots-data');

// Mocks for HotsDialog
require('./js/mocks');
const HotsDialog = require('../src/js/hots-dialog');


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

      snapshot(dialogHtml);
    });

    it('generates skill icons correctly', () => {
      const skillIconsHtml =
        HotsDialog.renderers.renderSkillIcons(hotsData.heroes.Tinker);

      snapshot(skillIconsHtml);
    });

    it('generates talent list correctly', () => {
      const talentIconsHtml =
        HotsDialog.renderers.renderTalentList(hotsData.heroes.Tinker);

      snapshot(talentIconsHtml);
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

      snapshot(heroInfoHtml);
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

      snapshot(skillInfoHtml);
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

      snapshot(talentInfoHtml);
    });
  });
});

