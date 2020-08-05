/**
 * @file Provides renderer functions that convert HotS data objects to HTML.
 */

/**
 * @typedef {import("../../../api/src/hero").Hero} Hero
 * @typedef {import("../../../api/src/skill").Skill} Skill
 * @typedef {import("../../../api/src/talent").Talent} Talent
 */

import _Mustache from "./vendor/mustache.js";

/** @type {import('mustache')} */
const Mustache = _Mustache;

/** Template-based renderer that generates HTML strings. */
export class Renderer {
  /**
   * @param {Object<string, string>} templates Maps template names to template
   *    strings.
   */
  constructor(templates) {
    this._templates = templates;
  }

  /**
   * Generates a table of hero information to be injected into a page.
   * @param {Hero} hero Hero data
   * @param {number=} iconSize Hero icon size in pixels (default: 64)
   * @param {number=} skillIconSize Skill i size in pixels (default: 48)
   * @param {string=} hotsVersion (optional) HotS version string to display
   * @param {boolean} isSimpleTable If truthy, generate a simplified table
   * @return {string} HTML source
   */
  renderHeroInfoTable(
    hero,
    iconSize = 64,
    skillIconSize = 48,
    hotsVersion,
    isSimpleTable
  ) {
    const heroView = Object.create(hero);

    // Set universe icon offset
    heroView.universeIconOffset = {
      classic: "0%",
      starcraft: "20%",
      diablo: "40%",
      warcraft: "60%",
      overwatch: "80%",
      nexus: "100%",
    }[heroView.universe];

    // Generate skill groups
    const traits = { title: "고유 능력", skills: [] };
    const basicAbilities = { title: "일반 기술", skills: [] };
    const heroicAbilities = { title: "궁극기", skills: [] };

    heroView.skills.forEach((skill) => {
      if (skill.type === "D") traits.skills.push(skill);
      else if (skill.type === "R") heroicAbilities.skills.push(skill);
      else basicAbilities.skills.push(skill);
    });

    for (const talentArray of Object.values(heroView.talents)) {
      for (const talent of talentArray) {
        if (talent.type === "R") heroicAbilities.skills.push(talent);
      }
    }

    heroView.skillGroups = [traits, basicAbilities, heroicAbilities];

    for (const skillGroup of heroView.skillGroups) {
      skillGroup.skills = skillGroup.skills.map((skill) =>
        this.renderSkillTalentView(skill, skillIconSize)
      );
    }

    heroView.hotsVersion = hotsVersion;
    heroView.iconSize = iconSize;
    heroView.appVersion = chrome.runtime.getManifest().version;
    heroView.isForHeroTable = true;
    heroView.isSimpleHeroTable = heroView.isSimpleSkillTable = !!isSimpleTable;

    return Mustache.render(this._templates["insert-hero"], heroView, {
      skill: this._templates["insert-skill"],
      stats: this._templates["insert-skill-stats"],
    });
  }

  /**
   * Generates a table of skill information to be injected into a page.
   * @param {Skill} skill Skill data
   * @param {number=} iconSize Icon size in pixels (default: 64)
   * @param {string=} hotsVersion (optional) HotS version string to display
   * @return {string} HTML source
   */
  renderSkillInfoTable(skill, iconSize = 64, hotsVersion) {
    return Mustache.render(
      this._templates["insert-skill"],
      this.renderSkillTalentView(skill, iconSize, hotsVersion),
      { stats: this._templates["insert-skill-stats"] }
    );
  }

  /**
   * Generates a table of talent information to be injected into a page.
   * @param {Talent} talent Talent data
   * @param {number=} iconSize Icon size in pixels (default: 48)
   * @param {string=} hotsVersion (optional) HotS version string to display
   * @return {string} HTML source
   */
  renderTalentInfoTable(talent, iconSize = 48, hotsVersion) {
    const talentView = this.renderSkillTalentView(
      talent,
      iconSize,
      hotsVersion
    );
    talentView.isTalent = true;

    return Mustache.render(this._templates["insert-skill"], talentView, {
      stats: this._templates["insert-skill-stats"],
    });
  }

  /**
   * Generates a row of talent tables from a talent group.
   * @param {Talent[]} talentGroup Talent group
   * @param {number=} iconSize Icon size in pixels (default: 48)
   * @param {string=} hotsVersion (optional) HotS version string to display
   * @return {string} HTML source
   */
  renderTalentGroupInfoTable(talentGroup, iconSize = 48, hotsVersion) {
    return talentGroup
      .map((talent) =>
        this.renderTalentInfoTable(talent, iconSize, hotsVersion)
      )
      .join("&nbsp;");
  }

  /**
   * Generates a Mustache-compatible view from a Skill or Talent.
   * This is an internal method called by other generator methods.
   * @package
   * @param {Skill | Talent} skill Skill or Talent object
   * @param {number=} iconSize Icon size in pixels (default: 48)
   * @param {string=} hotsVersion (optional) HotS version string
   * @return {object} Object to be fed into Mustache
   */
  renderSkillTalentView(skill, iconSize = 48, hotsVersion) {
    const view = Object.create(skill);
    view.hotsVersion = hotsVersion;
    view.iconSize = iconSize;
    view.hasStats = !!(
      skill.cooldown ||
      skill.rechargeCooldown ||
      skill.manaCost
    );
    view.appVersion = chrome.runtime.getManifest().version;

    // Parse skill description
    view.description = skill.description
      .replace(
        /^[^\S\r\n]*(퀘스트|보상|반복\s*퀘스트)\s*(?=:)/gm,
        '<img style="HEIGHT: 1.3em; vertical-align: -20%" ' +
          'src="https://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" ' +
          'alt="$1" title="$1"> <b style="color: #fb0">$1</b>'
      )
      .replace(
        /^[^\S\r\n]*(지속\s*효과)\s*(?=:)/gm,
        '<b style="color: #0e8">$1</b>'
      )
      .replace(/\r?\n/g, "<br>");

    // Parse extra properties
    view.extras = [];

    for (const [name, value] of Object.entries(skill.extras || {})) {
      if (name.includes("생명력")) view.lifeCost = value;
      else if (/기력|에너지|취기|분노/.test(name)) {
        view.energyCost = value;
        view.energyCostName = name;
      } else view.extras.push({ name, value });

      view.hasStats = true;
    }

    return view;
  }
}
