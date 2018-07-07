#!/usr/bin/env node

/**
 * Conversion between HotS data and Markdown.
 */

'use strict';

const { Hero, Skill, Talent } = require('./models.js');

module.exports = {
  /**
   * Parses hero data in Markdown format
   * @param {string} markdown Markdown hero data
   * @returns {Object<string, Hero>} Key-value mappings of Hero ID to hero
   */
  parseHeroMarkdown(markdown) {
    const heroes = {};
    let hero = null, isSkillSection = false, talentLevel = 0;

    parseSections(markdown).forEach(section => {
      switch (section.depth) {
        case 0: //Beginning section, ignore
          break;

        case 1: //Is next hero
          hero = parseHeroContent(section.title, section.content);
          heroes[hero.id] = hero;
          break;

        case 2: //Is talent/skill section
          if (/^(기술|특성)$/.test(section.title))
            isSkillSection = section.title.includes('기술');
          else
            console.warn(`Unknown depth-${section.depth} section: `, JSON.stringify(section.title));
          break;

        case 3: //Is a skill or talent level group
          if (isSkillSection) {
            hero.skills.push(parseSkillMarkdown(section.title, section.content));
          }
          else {
            const talentLevelMatch = section.title.match(/^레벨 (\d+)$/);
            if (talentLevelMatch)
              talentLevel = parseInt(talentLevelMatch[1]);
            else
              console.warn(`Unknown depth-${section.depth} section:`, JSON.stringify(section.title));
          }
          break;

        case 4: //Is a talent
          const talent = parseTalentMarkdown(section.title, talentLevel, section.content);
          if (!(talentLevel in hero.talents))
            hero.talents[talentLevel] = [talent];
          else
            hero.talents[talentLevel].push(talent);
          break;

        default:
          console.warn(`Section ${section.title} has too many (${section.depth}) hash signs`);
      }
    });

    return heroes;
  },

  /**
   * Converts a single hero's data to Markdown format.
   * @param {Hero} hero Hero data
   */
  heroToMarkdown(hero) {
    let markdown = `# ${hero.name}\n`;

    if (hero.id)
      markdown += `* ID: ${hero.id}\n`;
    if (hero.iconUrl)
      markdown += `* 아이콘: ${hero.iconUrl}\n`;
    if (hero.type)
      markdown += `* 유형: ${hero.type}\n`;
    if (hero.role)
      markdown += `* 역할: ${hero.getRoleName()}\n`;
    if (hero.universe)
      markdown += `* 세계관: ${hero.getUniverseName()}\n`;

    markdown += '\n## 기술\n';
    markdown += hero.skills.map(skillToMarkdown).join('\n\n');

    markdown += '\n\n## 특성\n';

    for (const talentLevel in hero.talents) {
      markdown += `### 레벨 ${talentLevel} \n`;
      markdown += hero.talents[talentLevel].map(talentToMarkdown).join('\n\n');
      markdown += '\n\n';
    }

    return markdown;
  }
};

//-------- Parser functions --------//

/**
 * Parses the markdown into sections. Each section has the following properties:
 * - title: Title (header) string
 * - depth: Number of hash marks (#) in the header string
 * - content: Content between this header and the next (trimmed).
 * The first section is always title = '', depth = 0.
 * @param {string} markdown Markdown data
 * @return {Object[]} Array of section objects
 */
function parseSections(markdown) {
  const result = markdown.split(/^(#+)\s*(.*?)\s*$/m);

  const sections = [{
    title: '',
    depth: 0,
    content: result[0].trim()
  }];

  for (let i = 1; i < result.length; i += 3) {
    sections.push({
      title: result[i + 1],
      depth: result[i].length,
      content: result[i + 2].trim()
    });
  }

  return sections;
}

/**
 * Parses the markdown and generates hero data.
 * @param {string} name Hero name
 * @param {string} markdown Markdown data
 * @return {Hero} Hero object
 */
function parseHeroContent(name, markdown) {
  const hero = { name };

  hero.description = markdown.replace(/^\* (.+?): (.+?)\s*$/mg,
    (match, propName, propValue) => {
      switch (propName) {
        case 'ID': hero.id = propValue; break;
        case '아이콘': hero.iconUrl = propValue; break;
        case '유형': hero.type = propValue; break;
        case '역할': hero.role = Hero.parseRole(propValue); break;
        case '세계관': hero.universe = Hero.parseUniverse(propValue); break;
        default:
          console.warn('Unknown property:', propName, '/', propValue);
      }

      return '';
    }).split(/ *\r?\n/g).join('\n').trim();

  if (!hero.id)
    console.warn('Missing hero ID for', hero.name);

  return new Hero(hero);
}

/**
 * Parses the markdown, extracting skill data.
 * @param {string} name Skill name
 * @param {string} markdown Markdown data
 * @return {Skill} Skill object
 */
function parseSkillMarkdown(name, markdown) {
  const skill = { name, extras: {} };

  skill.description = markdown.replace(/^\* (.+?): (.+?)\s*$/mg,
    (match, extraName, extraValue) => {
      switch (extraName) {
        case '아이콘':
          skill.iconUrl = extraValue; break;
        case '유형':
          skill.type = extraValue; break;
        case '마나':
          skill.manaCost = parseInt(extraValue); break;
        case '재사용 대기시간':
          skill.cooldown = parseFloat(extraValue); break;
        case '충전 대기시간':
          skill.rechargeCooldown = parseFloat(extraValue); break;
        default:
          skill.extras[extraName] = extraValue;
      }

      return '';
    }).split(/ *\r?\n/g).join('\n').trim();

  return new Skill(skill);
}

/**
 * Parses the markdown, extracting talent data.
 * @param {string} name Talent name
 * @param {number} level Level of the talent
 * @param {string} markdown Markdown data
 * @return {Talent} Talent object
 */
function parseTalentMarkdown(name, level, markdown) {
  const talentData = parseSkillMarkdown(name, markdown);
  talentData.level = level;
  return new Talent(talentData);
}

//-------- Markdown converters --------//

/**
 * Returns a Markdown representation of the skill data.
 * @param {Skill} skill
 * @return {string} Markdown
 */
function skillToMarkdown(skill) {
  let markdown = `### ${skill.name}\n* 유형: ${skill.type}\n`;

  if (skill.iconUrl)
    markdown += `* 아이콘: ${skill.iconUrl}\n`;

  if (skill.manaCost)
    markdown += `* 마나: ${skill.manaCost}\n`;

  if (skill.cooldown)
    markdown += `* 재사용 대기시간: ${skill.cooldown}\n`;

  if (skill.rechargeCooldown)
    markdown += `* 충전 대기시간: ${skill.rechargeCooldown}\n`;

  for (const extra in skill.extras)
    markdown += `* ${extra}: ${skill.extras[extra]}\n`;

  //Add two spaces after lines so that single line breaks are not removed by Markdown parsers
  markdown += '\n' + skill.description.replace(/^(?!\*|#).*\S(?=\n\S)/mg, '$&  ');

  return markdown;
}

/**
 * Returns a Markdown representation of the talent data.
 * @param {Talent} talent
 * @return {string} Markdown
 */
function talentToMarkdown(talent) {
  return '#' + skillToMarkdown(talent);
}

//-------- String converters --------//

const universes = {

};

function universeToId(universe) {

}