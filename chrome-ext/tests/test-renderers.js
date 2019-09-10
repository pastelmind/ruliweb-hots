#!/usr/bin/env node

/**
 * Tests for methods that convert mustache templates to HTML
 */

'use strict';

const fs = require('fs');
const path = require('path');

const snapshot = require('snap-shot-it');

const decorateHotsData = require('../src/js/decorate-hots-data');

const { loadTemplates } = require('./js/mocks');
const Renderer = require('../src/js/hots-dialog-renderer');


describe('HotsDialog.Renderer', () => {
  let hotsData;
  let renderer;
  const heroFilters = {
    universe: {
      name: '세계관',
      filters: {
        'warcraft': '워크래프트',
        'starcraft': '스타크래프트',
        'diablo': '디아블로',
        'classic': '블리자드 고전',
        'overwatch': '오버워치',
      },
    },
    newRole: {
      name: '역할',
      filters: {
        tank: '전사',
        bruiser: '투사',
        ranged_assassin: '원거리 암살자',
        melee_assassin: '근접 암살자',
        healer: '치유사',
        support: '지원가',
      },
    },
  };

  before('Loading test data files', async () => {
    hotsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/hots.json'), 'utf8')
    );
    decorateHotsData(hotsData);

    const templates = await loadTemplates();
    renderer = new Renderer(templates);
  });


  describe('Dialog templates', () => {
    it('generates dialog content correctly', () => {
      snapshot(
        renderer.renderDialogContent(heroFilters, hotsData.heroes)
      );
    });

    it('generates skill icons correctly', () => {
      snapshot(renderer.renderSkillIcons(hotsData.heroes.Tinker));
    });

    it('generates talent list correctly', () => {
      snapshot(renderer.renderTalentList(hotsData.heroes.Tinker));
    });
  });


  describe('HotsBox templates', () => {
    it('generates hero boxes correctly', () => {
      const hero = hotsData.heroes.Tinker;
      snapshot(
        renderer.renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion)
      );
      snapshot(
        renderer.renderHeroInfoTable(hero, 64, 48, hotsData.hotsVersion, true)
      );
    });

    it('generates skill boxes correctly', () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        snapshot(renderer.renderSkillInfoTable(skill, 64));
      }
    });

    it('generates skill boxes (with version) correctly', () => {
      const hero = hotsData.heroes.Fenix;
      for (const skill of hero.skills) {
        snapshot(renderer.renderSkillInfoTable(skill, 64, '34.3'));
      }
    });

    it('generates talent boxes correctly', () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        snapshot(renderer.renderTalentInfoTable(talent, 48));
      }
    });

    it('generates talent boxes (with version) correctly', () => {
      const hero = hotsData.heroes.Rexxar;
      for (const talentGroup of Object.values(hero.talents)) {
        // Test only the first talent of each level to save time
        const talent = talentGroup[0];
        snapshot(renderer.renderTalentInfoTable(talent, 48, '34.3'));
      }
    });

    it('generates talent box groups correctly', () => {
      const hero = hotsData.heroes.Tinker;
      for (const talentGroup of Object.values(hero.talents)) {
        snapshot(renderer.renderTalentGroupInfoTable(talentGroup, 48));
      }
    });
  });
});

