#!/usr/bin/env node

/**
 * Conversion between HotS data and Markdown
 */

'use strict';

const { Hero, Skill, Talent } = require('./models.js');

module.exports = {
  parseHeroMarkdown(markdown) {
    const heroes = {};
    let hero = null, skill = null, talent = null, isSkillSection = false, talentLevel = 0;

    parseSections(sections).forEach(section => {
      switch (section.depth) {
        case 0: //Beginning section, ignore
          break;

        case 1: //Is next hero
          hero = new Hero(parseHeroContent(section.content));
          hero.name = section.title;
          heroes.push(hero);
          break;

        case 2: //Is talent/skill section
          if (/^(기술|특성)$/.test(section.title))
            isSkillSection = section.title.includes('기술');
          else
            console.warn(`Unknown depth-${section.depth} section: `, JSON.stringify(section.title));
          break;

        case 3: //Is a skill or talent level group
          if (isSkillSection) {
            skill = new Skill(parseSkillTalentContent(section.content));
            skill.name = section.title;
            hero.skills.push(skill);
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
          talent = new Talent(parseSkillTalentContent(section.content));
          talent.name = section.title;
          talent.level = talentLevel;
          if (!(talentLevel in hero.talents))
            hero.talents[talentLevel] = [talent];
          else
            hero.talents[talentLevel].push(talent);
          break;

        default:
          console.warn(`Section ${section.title} has too many (${section.depth}) hash signs`);
      }
    });
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
 * @return {Object<string, Object>[]} Array of section objects
 */
function parseSections(markdown) {
  const result = markdown.split(/^(#+)\s*(.*?)\s*$/);

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
 * Parses the markdown, extracting hero data.
 * @param {string} markdown Markdown data
 * @return {Object} Hero data
 */
function parseHeroContent(markdown) {
  const data = {};

  data.description = markdown.replace(/^\* (.+?): (.+?)\s*$/mg,
    (match, propName, propValue) => {
      switch (propName) {
        case 'ID': data.id = propValue; break;
        case '아이콘': data.iconUrl = propValue; break;
        case '유형': data.type = propValue; break;
        case '세계관': data.universe = propValue; break;
        case '역할': data.role = parseInt(propValue); break;
        default:
          console.warn('Unknown property:', propName, '/', propValue);
      }

      return '';
    }).trim();

  return data;
}

/**
 * Parses the markdown, extracting skill/talent data.
 * @param {string} markdown Markdown data
 * @return {Object} Skill/talent data
 */
function parseSkillTalentContent(markdown) {
  const data = { extras: {} };

  data.description = markdown.replace(/^\* (.+?): (.+?)\s*$/mg,
    (match, extraName, extraValue) => {
      switch (extraName) {
        case '아이콘':
          data.iconUrl = extraValue; break;
        case '유형':
          data.type = extraValue; break;
        case '재사용 대기시간':
          data.cooldown = parseFloat(extraValue); break;
        case '마나':
          data.manaCost = parseInt(extraValue); break;
        default:
          data.extras[extraName] = extraValue;
      }

      return '';
    }).trim();

  return data;
}


//For testing on Node.js
if (require && module && require.main === module) {
  const fs = require('fs');

  const markdown = fs.readFileSync('docs/heroes.md').toString('utf8');
  const heroes = parseHeroMarkdown(markdown);
  fs.writeFileSync('output.json', JSON.stringify(heroes, null, 2));
  console.log('Complete!');
}