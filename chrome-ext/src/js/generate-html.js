/**
 * Generates HTML from hero/skill/talent data to inject in articles.
 */

'use strict';

const HtmlGenerator = {
  /**
   * Generates a injectable HTML string using the template string and hero data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} hero Hero data object
   * @param {string} hots_version Version string of Heroes of the Storm
   */
  generateHeroHtml(templateHtml, hero, hots_version) {
    return Mustache.render(templateHtml, { hero, hots_version });
  },

  /**
   * Generates a injectable HTML string using the template string and skill data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} skill Skill data object
   * @param {string} hots_version Version string of Heroes of the Storm
   */
  generateSkillHtml(templateHtml, skill, hots_version) {
    return Mustache.render(templateHtml, { skill, hots_version });
  },

  /**
   * Generates a injectable HTML string using the template string and talent data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} talent Talent data object
   * @param {string} hots_version Version string of Heroes of the Storm
   */
  generateTalentHtml(templateHtml, talent, hots_version) {
    return Mustache.render(templateHtml, { talent, hots_version });
  }
};