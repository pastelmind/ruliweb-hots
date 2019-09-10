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


  describe('HotsBox templates', () => {
    it('generates hero boxes correctly', () => {
      const hero = hotsData.heroes.Tinker;
      const heroBoxFull = HotsDialog.renderers
        .renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion);
      snapshot(heroBoxFull);

      const heroBoxSimple = HotsDialog.renderers
        .renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion, true);
      snapshot(heroBoxSimple);
    });

    it('generates skill boxes correctly', () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        const skillBox = HotsDialog.renderers
          .renderSkillInfoTable(skill, 64);
        snapshot(skillBox);
      }
    });

    it('generates skill boxes (with version) correctly', () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        const skillBoxWithVersion = HotsDialog.renderers
          .renderSkillInfoTable(skill, 64, '34.3');
        snapshot(skillBoxWithVersion);
      }
    });

    it('generates talent boxes correctly', () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        const talentBox = HotsDialog.renderers
          .renderTalentInfoTable(talent, 48);
        snapshot(talentBox);
      }
    });

    it('generates talent boxes (with version) correctly', () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        const talentBoxWithVersion = HotsDialog.renderers
          .renderTalentInfoTable(talent, 48, '34.3');
        snapshot(talentBoxWithVersion);
      }
    });

    it('generates talent box groups correctly', () => {
      const hero = hotsData.heroes.Tinker;
      for (const talentGroup of Object.values(hero.talents)) {
        const talentBoxGroup = HotsDialog.renderers
          .renderTalentGroupInfoTable(talentGroup, 48);
        snapshot(talentBoxGroup);
      }
    });
  });
});

