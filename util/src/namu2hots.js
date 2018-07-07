#!/usr/bin/env node

/**
 * Converts NamuWiki markup to hero objects.
 * @module namu2hots
 */

'use strict';

const assert = require('assert');
const { Hero, Skill, Talent } = require('./models');

module.exports = {
  /**
   * Parse a hero's page content to hero data.
   * @param {string} namuMarkup NamuWiki markup
   * @returns {Hero} Hero data
   */
  parseHeroPage(namuMarkup) {
    const hero = { skills: [], talents: {} };

    namuMarkup = removeTableMarkup(namuMarkup);
    namuMarkup = removeColorSpanMarkup(namuMarkup, COMMON_TEXT_COLORS);
    namuMarkup = removeImages(namuMarkup, COMMON_IMAGES);
    namuMarkup = removeNamuFootnotes(namuMarkup);
    namuMarkup = removeAnchors(namuMarkup);
    namuMarkup = removeNamuBr(namuMarkup);

    const sections = parseSections(namuMarkup);

    let isUltimateSection = false;
    let talentLevel; //Must be outside the loop to correctly apply the talent's level.

    for (const title in sections) {
      const content = sections[title];

      let skillTitleMatch, talentTitleMatch;

      if (title === '소개') {
        Object.assign(hero, parseHeroIntroSection(content));
      }
      else if (skillTitleMatch = /(고유\s*능력|[QWERZ1])\s*[\-:]\s*(.*)/i.exec(title)) {
        const tables = parseTables(content);
        assert(tables.length > 0, 'Skill section (%s) does not contain a table:', title, content);

        const skills = parseSkillTable(skillTitleMatch[2], skillTitleMatch[1], tables[0]);
        for (const skill of skills) {
          if (isUltimateSection) {
            skill.level = talentLevel;
            if (!hero.talents[talentLevel])
              hero.talents[talentLevel] = [];
            hero.talents[talentLevel].push(new Talent(skill));
          }
          else
            hero.skills.push(skill);
        }
      }
      else if (talentTitleMatch = /(\d)단계: 레벨 (\d+)/.exec(title)) {
        talentLevel = parseInt(talentTitleMatch[2]);

        const tables = parseTables(content);
        isUltimateSection = !tables.length;

        if (!isUltimateSection) { //Skip if ultimate section
          //Assumption: The first table is the talent table.
          const talents = parseTalentTable(talentLevel, tables[0]);
          if (!hero.talents[talentLevel])
            hero.talents[talentLevel] = [];
          hero.talents[talentLevel].push(...talents);
        }
      }
    }

    return new Hero(hero);
  },

  /**
   * Parse Cho'Gall's page content to and generate two Hero objects.
   * @param {string} namuMarkup NamuWiki markup
   * @returns {Object<string, Hero>} Hero objects in `{ "cho": cho, "gall": gall }` format
   */
  parseChoGallPage(namuMarkup) {
    const ogreMarkups = namuMarkup.split(/=+.*(?:초.*Cho|갈.*Gall).*=+/i);
    if (ogreMarkups.length !== 3)
      console.warn('Unable to split Cho\'Gall article in 3:', ogreMarkups.length);

    const cho = this.parseHeroPage(ogreMarkups[1]);
    const gall = this.parseHeroPage(ogreMarkups[2]);

    const choGallData = parseChoGallIntroSection(ogreMarkups[0]);
    Object.assign(cho, choGallData.cho);
    Object.assign(gall, choGallData.gall);

    return { cho, gall };
  }
};


//-------- Parser functions --------//

/**
 * Parses every table in the given content, and returns an array of tables.
 * Each table is an array of strings, representing the content of each cell.
 * @param {string} namuMarkup NamuWiki content
 * @return {string[][]} 2-dimensional array of cells in tables.
 */
function parseTables(namuMarkup) {
  const lines = namuMarkup.split(/\r?\n/);

  const tables = [];
  let currentTable = [];

  /*
  State machine behavior:

  plaintext
  => current line is plaintext    | plaintext     Do nothing
  => current line is proper row   | table         Drop first and last cells, save others
  => current line is unfinished   | unfinished    Drop first cell, save others

  table
  => current line is plaintext    | plaintext     Flush table
  => current line is proper row   | table         Drop first and last cells, save others
  => current line is unfinished   | unfinished    Drop first cell, save others

  unfinished
  => current line is plaintext    | unfinished    Merge first cell, save others
  => current line is proper row   | table         Merge first cell, drop last cell, save others
  => current line is unfinished   | unfinished    Merge first cell, save others
  */

  const PLAINTEXT = 0, TABLE_ROW = 1, TABLE_ROW_UNFINISHED = 2;
  let prevRowType = PLAINTEXT;

  //Assumptions:
  // * Each table row begins and ends with a ||, except...
  // * ...a table line that does not terminate with || is a multi-line cell
  // * ...and subsequent lines are treated as part of the current cell
  lines.forEach(line => {
    const cells = line.split(/\|\|+/g);

    //Is plaintext or improperly beginning row
    if (cells.length === 1) {
      //Contigious plaintext, do nothing
      if (prevRowType === PLAINTEXT) return;

      if (prevRowType === TABLE_ROW) {
        //Flush current table
        if (currentTable.length) {
          tables.push(currentTable);
          currentTable = [];
        }
        prevRowType = PLAINTEXT;
        return;
      }
    }

    //Is a table row, or plaintext after improperly-ended row

    //Default row type is unfinished
    let rowType = TABLE_ROW_UNFINISHED;

    //If this table row is properly ended
    if (cells.length > 1 && cells[cells.length - 1].length === 0) {
      rowType = TABLE_ROW;
      cells.pop();  //Drop the last (empty) cell
    }

    if (prevRowType === TABLE_ROW_UNFINISHED) {
      //Merge first cell with the previously unfinished cell
      currentTable[currentTable.length - 1] += '\n' + cells.shift();
    }
    else
      cells.shift(); //Discard first cell

    currentTable.push(...cells);
    prevRowType = rowType;
  });

  //Flush last table
  if (currentTable.length) tables.push(currentTable);

  return tables;
}

/**
 * Divides an article into sections, separated by headers (=== header ===).
 * The content before the first header can be retrieved by using '' as the key.
 * @param {string} namuMarkup NamuWiki markup
 * @return {Object.<string, string>} Key-value mappings of section header to content
 */
function parseSections(namuMarkup) {
  //Assumption: Headers begin and end with the same number of equal signs (=).

  const result = namuMarkup.split(/^\s*=+\s*(.+?)\s*=+\s*$/mg);
  const headerToContent = {};

  //The first section (with no header)
  headerToContent[''] = result[0];

  //Start at 1, since the first segment is the article name
  for (let i = 1; i < result.length; i += 2)
    headerToContent[result[i]] = result[i + 1];

  return headerToContent;
}

/**
 * Parse a hero's intro section and extract hero data.
 * @param {string} section NamuWiki markup
 * @return {Object.<string, string>} Hero data in the form of `{ type, role, universe }`
 */
function parseHeroIntroSection(section) {
  const tables = parseTables(section);

  assert(tables.length > 0, 'Hero intro section does not contain a table:', section);
  assert(tables[0].length > 8, 'First table in hero intro section does not contain enough cells:', section);

  const heroNameCell = tables[0][1];
  const metadataCells = tables[0].slice(7).join('');

  return {
    name: parseHeroKorName(heroNameCell),
    id: parseHeroId(heroNameCell),
    type: parseHeroType(metadataCells),
    role: parseHeroRoles(metadataCells).join(','),
    universe: parseHeroUniverse(metadataCells)
  };
}

/**
 * Parse Cho'Gall's intro section and extract hero data.
 * @param {string} section NamuWiki markup
 * @return {Object.<string, Object>} Hero data in the form of `{ cho, gall }`
 */
function parseChoGallIntroSection(section) {
  const tables = parseTables(section);

  assert(tables.length > 0, 'Cho\'Gall\'s intro section does not contain a table:', section);
  assert(tables[0].length > 10, 'First table in Cho\'Gall\'s intro section does not contain enough cells:', section);

  const choTypeAndRoleCell = tables[0][8];
  const gallTypeAndRoleCell = tables[0][9];
  const metadataCells = tables[0].slice(10);

  const cho = {
    name: '초',
    id: 'cho',
    type: parseHeroType(choTypeAndRoleCell),
    role: parseHeroRoles(choTypeAndRoleCell).join(','),
    universe: parseHeroUniverse(metadataCells.join(''))
  };
  const gall = {
    name: '갈',
    id: 'gall',
    type: parseHeroType(gallTypeAndRoleCell),
    role: parseHeroRoles(gallTypeAndRoleCell).join(','),
    universe: cho.universe
  };

  return { cho, gall };
}

/**
 * Parse and return the hero's Korean name
 * @param {string} heroNameCell NamuWiki markup
 * @return {string} Hero name in Korean
 */
function parseHeroKorName(heroNameCell) {
  const heroKorNameMatch = /'''\s*(.+?)\s*,/.exec(heroNameCell)
  assert(heroKorNameMatch, 'Cannot parse hero\'s Korean name from:', heroNameCell);

  return heroKorNameMatch[1];
}

/**
 * Parse the hero's English name and generate an ID string.
 * A hero ID string contains lowercase alphanumeric characters and dashes(-).
 * @param {string} heroNameCell NamuWiki markup
 * @return {string} Hero ID string
 */
function parseHeroId(heroNameCell) {
  const heroEngNameMatch = /\((.+?),/.exec(heroNameCell)
  assert(heroEngNameMatch, 'Cannot parse hero\'s English name from:', heroNameCell);

  //1. Latin-ize string (Lúcio -> Lucio)
  //2. Convert spaces to dashes (Li Li -> Li-Li)
  //3. Remove non-alphanumeric characters, except dashes
  //4. Convert to lowercase
  //Code for removing diacritics from: https://stackoverflow.com/a/37511463/9943202
  return heroEngNameMatch[1].normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
}

/**
 * Parse a hero's attack type (melee/ranged/both).
 * @param {string} content NamuWiki markup
 * @return {string} One of '근접', '원거리', '근접 / 원거리', ''
 */
function parseHeroType(content) {
  const isMelee = content.includes('근접');
  const isRanged = content.includes('원거리');

  if (isMelee) {
    if (isRanged) return '근접 / 원거리';
    else return '근접';
  }
  else {
    if (isRanged) return '원거리';
    else {
      console.warn('Hero type unknown:', content);
      return '';
    }
  }
}

/**
 * Parse a hero's role (warrior/assassin/support/specialist).
 * @param {string} content NamuWiki markup
 * @return {string[]} An array of role IDs defined in `Hero.roles`, or an empty array if unknown.
 */
function parseHeroRoles(content) {
  const roleIds = Hero.parseRoles(content);
  if (!roleIds.length)
    console.warn('Hero role unknown:', content);
  return roleIds;
}

/**
 * Parse a hero's universe (warcraft/starcraft/diablo/classic/overwatch).
 * @param {string} content NamuWiki markup
 * @return {string} A role ID defined in `Hero.universes`, or '' if unknown.
 */
function parseHeroUniverse(content) {
  const universeId = Hero.parseUniverse(content);
  if (!universeId)
    console.warn('Hero universe unknown:', content);
  return universeId;
}

/**
 * Parse a skill table and returns one or more skills
 * @param {string} name Skill name
 * @param {string} type Skill type
 * @param {string[]} cells NamuWiki skill table
 * @return {Skill[]} Array of one or two skills
 */
function parseSkillTable(name, type, cells) {
  assert(cells.length > 1, 'Skill table for %s does not contain enough cells:', name, cells);

  const matches = /\s*(.*?)\s*:\s*(.*?)\s*\/\s*(.*?)\s*\(\s*(.*?)\s*:\s*(.*?)\s*\/\s*(.*?)\s*\)/.exec(name);

  if (matches) {
    assert(cells.length > 3, `Dual skill (${name}) detected, but skill table has insufficient cells`);

    const skillName1 = `${matches[1]}: ${matches[2]} (${matches[4]}: ${matches[5]})`;
    const skillName2 = `${matches[1]}: ${matches[3]} (${matches[4]}: ${matches[6]})`;

    return [parseSkill(skillName1, type, cells[0], cells[1]), parseSkill(skillName2, type, cells[2], cells[3])];
  }

  //Assumption: The second cell of the  first table contains the skill description.
  return [parseSkill(name, type, cells[0], cells[1])];
}

/**
 * Parse a skill section and produces skill data
 * @param {string} name Skill name
 * @param {string} type Skill type
 * @param {string} iconCell NamuWiki markup of table cell containing the skill icon
 * @param {string} rawDescription Unparsed description in the skill table
 * @returns {Skill} Skill data
 */
function parseSkill(name, type, iconCell, rawDescription) {
  const skill = { name, type, extras: {} };

  const iconNameMatch = /\[\[(파일:.+?)\s*(?:\|.*?)?\]\]/.exec(iconCell);
  assert(iconNameMatch, 'Cannot parse skill/talent icon of %s from:', name, iconCell);
  skill.iconUrl = iconNameMatch[1];

  skill.description = removeBoldFormatting(rawDescription.replace(
    /\[\[파일:.*?(?:\|.*?)?\]\]\s?'''(.+?)'''\s?([^\[]+)/g,
    (match, extraName, extraInfo) => {
      if (extraName.includes('재사용 대기시간') && !skill.cooldown)
        skill.cooldown = parseFloat(extraInfo);
      else if (extraName.includes('충전 대기시간') && !skill.rechargeCooldown)
        skill.rechargeCooldown = parseFloat(extraInfo);
      else if (extraName.includes('마나') && !skill.manaCost)
        skill.manaCost = parseFloat(extraInfo);
      else if (!(extraName in skill.extras))
        skill.extras[extraName] = extraInfo.trim();
      else
        console.warn('Warning: Duplicate extra name is ignored;', extraName, 'in skill description', rawDescription);

      return '';
    }).trim());

  return new Skill(skill);
}

/**
 * Parse a talent section and produce an array of talent data
 * @param {number} talentLevel Level of the talents in the table
 * @param {string[]} table Pre-parsed talent table
 * @returns {Talent[]} Array of talent data
 */
function parseTalentTable(talentLevel, table) {
  const talents = [];

  //Assumption: The talent table contains 4x the number of talents.
  //            Each cell represents: talent icon, name, type, and description.
  for (let i = 0; i + 3 < table.length; i += 4) {
    const talentData = parseSkill(removeBoldFormatting(table[i + 1]), table[i + 2], table[i], table[i + 3]);
    talentData.level = talentLevel;
    talents.push(new Talent(talentData));
  }

  return talents;
}


//-------- NamuWiki format removers --------//

/**
 * Removes table decoration markup from the given string
 * @param {string} namuMarkup NamuWiki markup
 * @return {string} Modified NamuWiki markup
 */
function removeTableMarkup(namuMarkup) {
  return namuMarkup.replace(/\s*<([\^v]?(-|\|)\d+|(table|row)?\s*(align|bgcolor|bordercolor|width)=.*?|[(:)])>\s*/gi, '');
}

/**
 * Converts NamuWiki text coloring markup ({{{#xxxxxx text}}}) to HTML <span>,
 * except for the ones provided in the blacklist.
 * @param {string} namuMarkup NamuWiki markup
 * @param {string[]} blacklist Array of colors to remove instead of converting. Use '#ffffff' form (mixed cases acceptable)
 * @return {string} Modified NamuWiki markup
 */
function removeColorSpanMarkup(namuMarkup, blacklist = []) {
  //For easy comparison
  blacklist = blacklist.map(str => str.toLowerCase());

  const DO_NOTHING = 0, CONVERT_TO_SPAN = 1, REMOVE_LATER = 2;
  const spanStack = [];
  const spanBoundsPattern = /(\{\{\{|\}\}\})(?:(#\w{6}) \s*)?/g;
  let spanBoundsMatch = null;
  let output = '', sliceBegin = 0;

  while (spanBoundsMatch = spanBoundsPattern.exec(namuMarkup)) {
    //Setting this to anything other than null will trigger a slice at the at
    //the end of the loop
    let appendAfterSlice = null;

    if (spanBoundsMatch[1] === '{{{') {
      const color = spanBoundsMatch[2];
      if (color) {
        if (blacklist.includes(color.toLowerCase())) {
          spanStack.push(REMOVE_LATER);
          appendAfterSlice = '';
        }
        else {
          spanStack.push(CONVERT_TO_SPAN);
          appendAfterSlice = `<span style="color: ${color}">`;
        }
      }
      else
        spanStack.push(DO_NOTHING);
    }
    else {
      const action = spanStack.pop();
      if (action === CONVERT_TO_SPAN)
        appendAfterSlice = '</span>';
      else if (action === REMOVE_LATER)
        appendAfterSlice = '';  //Trigger slice, but append nothing
    }

    if (appendAfterSlice !== null) {
      //Slice everything up to this point, append the fragment
      output += spanBoundsMatch.input.slice(sliceBegin, spanBoundsMatch.index) + appendAfterSlice;
      //Arrange the next slice to begin after this
      sliceBegin = spanBoundsPattern.lastIndex;
    }
  }

  //Add remaining text
  output += namuMarkup.slice(sliceBegin);

  return output;
}

const COMMON_TEXT_COLORS = [
  '#f2fee7',  //Skill description
  '#66ccec',  //Talent name and type
  '#fd8a27',  //Hyperlink in talent name
  '#eefee7',  //Talent description
  '#ffffff',  //Talent description (occasionally)
  '#d9d9d9',  //Cooldown
  '#c4c4c4',  //Cooldown (occasionally)
  '#3cb5f1',  //Mana cost
  '#f1e83b',  //Brew / Energy / Fury cost
  '#ffd700',  //Energy cost (Lt. Morales)
  '#52e41e',  //Life cost
  '#cc9999',  //Skill and talent range, area-of-effect, and width.
  '#ffc000',  //Quests
  '#01f189',  //Passive skill component
];

/**
 * Removes bold text formatting ('''text''').
 * @param {string} namuMarkup NamuWiki markup
 * @return {string} Modified NamuWiki markup
 */
function removeBoldFormatting(namuMarkup) {
  return namuMarkup.replace(/'''/g, '');
}

/**
 * Removes specific images that contain any of the given tokens (case insensitive).
 * Also removes a single trailing space chracter, if any.
 * @param {string} namuMarkup NamuWiki markup
 * @param {string[]} imageTokens Image name tokens that will be matched with indexOf()
 * @return {string} Modified NamuWiki markup
 */
function removeImages(namuMarkup, imageTokens = []) {
  imageTokens = imageTokens.map(str => str.toLowerCase());
  return namuMarkup.replace(/\[\[파일:([^\]]+?)(?:\|[^\]]+)?\]\] ?/g, (match, imageName) => {
    for (let i = 0; i < imageTokens.length; ++i)
      if (imageName.toLowerCase().indexOf(imageTokens[i]) !== -1)
        return '';

    return match;
  })
}

const COMMON_IMAGES = [
  // 'Cooldown_Clock.png', //재사용 대기시간
  // 'icon-range-32.png',  //효과 사거리
  // 'icon-width-32.png',  //효과 너비
  // 'icon-radius-32.png', //효과 반경
  'Quest_Mark.png'  //퀘스트 및 보상
];

/**
 * Removes NamuWiki footnotes ([* text]). Warning: Cannot handle image links.
 * @param {string} namuMarkup NamuWiki markup
 * @return {string} Modified NamuWiki markup
 */
function removeNamuFootnotes(namuMarkup) {
  let result = '';
  const footnoteBeginPattern = /\[\*/g;
  let footnoteMatch;
  let sliceBegin = 0;

  while (footnoteMatch = footnoteBeginPattern.exec(namuMarkup)) {
    const bracketPattern = /[\[\]]/g;
    bracketPattern.lastIndex = footnoteBeginPattern.lastIndex;
    let bracketMatch;
    let bracketDepth = 1;

    while (bracketDepth && (bracketMatch = bracketPattern.exec(namuMarkup))) {
      if ('[' === bracketMatch[0])
        ++bracketDepth;
      else
        --bracketDepth;
    }

    result += namuMarkup.slice(sliceBegin, footnoteMatch.index);
    if (bracketMatch) //End of footnote found
      sliceBegin = footnoteBeginPattern.lastIndex = bracketPattern.lastIndex;
    else              //End of document reached
      return result;
  }

  return result + namuMarkup.slice(sliceBegin);
}

/**
 * Flattens NamuWiki anchors ([[target]] or [[target|link text]]) to plain text
 * Note: Images are unaffeected.
 * @param {string} namuMarkup NamuWiki markup
 * @return {string} Modified NamuWiki markup
 */
function removeAnchors(namuMarkup) {
  return namuMarkup.replace(/\[\[(?!파일:)(?:[^\]]+\|)?([^\]]+)]\]/g, '$1');
}

/**
 * Replaces NamuWiki line break macros ([br]) with newlines.
 * @param {string} namuMarkup NamuWiki markup
 * @return {string} Modified NamuWiki markup
 */
function removeNamuBr(namuMarkup) {
  return namuMarkup.replace(/\[br\]/gi, '\n');
}