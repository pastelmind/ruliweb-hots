#!/usr/bin/env node

/**
 * Converts NamuWiki markup to hero objects.
 * @module namu2hots
 */

'use strict';

const { Hero, Skill, Talent } = require('./models.js');

module.exports = {
  /**
   * Parse a hero's page content to hero data.
   * @param {string} namuMarkup NamuWiki markup
   * @returns {Hero} Hero data
   */
  parseHeroPage(namuMarkup) {
    const hero = new Hero;

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
      else if (skillTitleMatch = /(고유 능력|Q|W|E|R|1)\s*(?:-|:)\s*(.*)/.exec(title)) {
        const tables = parseTables(content);
        if (!tables[0][1])
          throw JSON.stringify({ title, tables });

        //Assumption: The second cell of the  first table contains the skill description.
        const skill = parseSkill(skillTitleMatch[2], skillTitleMatch[1], tables[0][1]);
        if (isUltimateSection) {
          skill.level = talentLevel;
          if (!hero.talents[talentLevel])
            hero.talents[talentLevel] = [];
          hero.talents[talentLevel].push(new Talent(skill));
        }
        else
          hero.skills.push(skill);
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

    return hero;
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
    cho.name = '초';
    gall.name = '갈';

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

  const typeAndRoleCell = tables[0][7];
  const universeCell = tables[0][8];

  return {
    type: parseHeroType(typeAndRoleCell),
    role: parseHeroRole(typeAndRoleCell),
    universe: parseHeroUniverse(universeCell)
  };
}

/**
 * Parse Cho'Gall's intro section and extract hero data.
 * @param {string} section NamuWiki markup
 * @return {Object.<string, Object>} Hero data in the form of `{ cho, gall }`
 */
function parseChoGallIntroSection(section) {
  const tables = parseTables(section);

  const choTypeAndRoleCell = tables[0][8];
  const gallTypeAndRoleCell = tables[0][9];
  const universeCell = tables[0][10];

  const cho = {
    type: parseHeroType(choTypeAndRoleCell),
    role: parseHeroRole(choTypeAndRoleCell),
    universe: parseHeroUniverse(universeCell)
  };
  const gall = {
    type: parseHeroType(gallTypeAndRoleCell),
    role: parseHeroRole(gallTypeAndRoleCell),
    universe: cho.universe
  };

  return { cho, gall };
}

/**
 * Parse a hero's attack type (melee/ranged/both).
 * @param {string} content NamuWiki markup
 * @return {string} One of '근접', '원거리', '근접 / 원거리', ''
 */
function parseHeroType(content) {
  const match = /근접|원거리|근접 \/ 원거리/.exec(content);
  return match ? match[0] : '';
}

/**
 * Parse a hero's role (warrior/assassin/support/specialist).
 * @param {string} content NamuWiki markup
 * @return {string} One of '전사', '암살자', '지원가', '전문가', ''
 */
function parseHeroRole(content) {
  const match = /전사|암살자|지원가|전문가/.exec(content);
  return match ? match[0] : '';
}

/**
 * Parse a hero's universe (warcraft/starcraft/diablo/classic/overwatch).
 * @param {string} content NamuWiki markup
 * @return {string} One of '워크래프트', '스타크래프트', '디아블로', '블리자드 고전', '오버워치', ''
 */
function parseHeroUniverse(content) {
  const match = /워크래프트|스타크래프트|디아블로|블리자드 고전|오버워치/.exec(content);
  return match ? match[0] : '';
}

/**
 * Parse a skill section and produces skill data
 * @param {string} name Skill name
 * @param {string} type Skill type
 * @param {string} rawDescription Unparsed description in the skill table
 * @returns {Skill} Skill data
 */
function parseSkill(name, type, rawDescription) {
  const skill = { type, name, extras: {} };

  skill.description = removeBoldFormatting(rawDescription.replace(
    /\[\[파일:.*?(?:\|.*?)?\]\]\s?'''(.+?)'''\s?([^\[]+)/g,
    (match, extraName, extraInfo) => {
      if (extraName.includes('시간') && !skill.cooldown)
        skill.cooldown = parseFloat(extraInfo);
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
    const talentData = parseSkill(
      removeBoldFormatting(table[i + 1]),
      table[i + 2],
      table[i + 3]
    );
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
  '#f2fee7',  //기술 본문
  '#66ccec',  //특성 이름 및 유형
  '#fd8a27',  //특성 이름 내 링크
  '#eefee7',  //특성 본문
  '#d9d9d9',  //재사용 대기시간
  '#3cb5f1',  //마나 소모량
  '#cc9999',  //기술 및 특성 사거리 정보
  '#ffc000',  //퀘스트
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
  return namuMarkup.replace(/\[\* [^\[]*(\[\[[^\]]*\]\][^\[]*)*\]/g, '');
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