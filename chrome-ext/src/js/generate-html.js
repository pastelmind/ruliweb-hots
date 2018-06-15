/**
 * Generates HTML from hero/skill/talent data to inject in articles.
 */

'use strict';

const HtmlGenerator = {
  /** Placeholder for missing icons */
  missingIconUrl: 'http://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png',

  /**
   * Generates a injectable HTML string using the template string and hero data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} hero Hero data object
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  generateHeroHtml(templateHtml, hero, hotsVersion) {
    const view = Object.create(hero);
    if (!view.iconUrl)
      view.iconUrl = this.missingIconUrl;
    view.hots_version = hotsVersion;

    view.skills = view.skills.map(skill => {
      const skillView = Object.create(skill);
      if (!skillView.iconUrl)
        skillView.iconUrl = this.missingIconUrl;
      return skillView;
    });

    return Mustache.render(templateHtml, view);
  },

  /**
   * Generates a injectable HTML string using the template string and skill data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} skill Skill data object
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  generateSkillHtml(templateHtml, skill, hotsVersion) {
    const view = Object.create(skill);
    if (!view.iconUrl)
      view.iconUrl = this.missingIconUrl;
    view.hots_version = hotsVersion;

    return Mustache.render(templateHtml, view);
  },

  /**
   * Generates a injectable HTML string using the template string and talent data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} talent Talent data object
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  generateTalentHtml(templateHtml, talent, hotsVersion) {
    const view = Object.create(talent);
    if (!view.iconUrl)
      view.iconUrl = this.missingIconUrl;
    view.hots_version = hotsVersion;

    return Mustache.render(templateHtml, view);
  }
};