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
    templateHtml = this._injectHotsVersion(templateHtml, hotsVersion);

    templateHtml = templateHtml.replace(/\{\{name\}\}/g, hero.name)
      .replace(/\{\{type\}\}/g, hero.type)
      .replace(/\{\{icon\}\}/g, hero.iconUrl || this.missingIconUrl);
    
    const skillTemplatePattern = /<[^<]*\{\{skill.*?>/;
    const skillTemplateMatch = skillTemplatePattern.exec(templateHtml);
    if (skillTemplateMatch) {
      const skillTemplate = skillTemplateMatch[0].replace(/skill\./g, '');
      const skillFragment = hero.skills.map(skill => this.generateSkillHtml(skillTemplate, skill, hotsVersion)).join('');
      templateHtml = templateHtml.replace(skillTemplatePattern, skillFragment);
    }

    return templateHtml;
  },

  /**
   * Generates a injectable HTML string using the template string and skill data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} skill Skill data object
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  generateSkillHtml(templateHtml, skill, hotsVersion) {
    templateHtml = this._injectHotsVersion(templateHtml, hotsVersion);

    return templateHtml.replace(/\{\{name\}\}/g, skill.name)
      .replace(/\{\{type\}\}/g, skill.type)
      .replace(/\{\{icon\}\}/g, skill.iconUrl || this.missingIconUrl)
      .replace(/\{\{description\}\}/g, skill.description);
  },

  /**
   * Generates a injectable HTML string using the template string and talent data.
   * @param {string} templateHtml Base template string to work with
   * @param {Object} talent Talent data object
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  generateTalentHtml(templateHtml, talent, hotsVersion) {
    templateHtml = this._injectHotsVersion(templateHtml, hotsVersion);

    return templateHtml.replace(/\{\{name\}\}/g, talent.name)
      .replace(/\{\{type\}\}/g, talent.type)
      .replace(/\{\{level\}\}/g, talent.level)
      .replace(/\{\{icon\}\}/g, talent.iconUrl || this.missingIconUrl)
      .replace(/\{\{description\}\}/g, talent.description);
  },

  /**
   * Injects HotS version string into the given template string and returns the
   * modified template string.
   * @private
   * @param {string} html Base template string to work with
   * @param {string} hotsVersion Version string of Heroes of the Storm
   */
  _injectHotsVersion(html, hotsVersion) {
    if (hotsVersion)
      return html.replace(/\{\{hots_version\}\}/g, hotsVersion);
    else  //Remove HotS version row
      return html.replace(/<tr[^{]*\{\{hots_version\}\}.*?<\/tr>/gi, '');
  }
};