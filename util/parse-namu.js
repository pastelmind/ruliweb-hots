#!/usr/bin/env node

'use strict';

const NamuParser = {
  /**
   * Parses every table in the given content, and returns an array of tables.
   * Each table is an array of strings, representing the content of each cell.
   * @param {string} namuMarkup NamuWiki content
   * @return {string[][]} 2-dimensional array of cells in tables.
   */
  parseTables(namuMarkup) {
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
  },

  /**
   * Removes table decoration markup from the given string
   * @param {string} namuMarkup NamuWiki markup
   * @return {string} Modified NamuWiki markup
   */
  trimTableMarkup(namuMarkup) {
    return namuMarkup.replace(/<([\^v]?(-|\|)\d+|(table|row)?\s*(align|bgcolor|bordercolor|width)=.*?|[(:)])>/gi, '');
  },

  /**
   * Divides an article into sections, separated by headers (=== header ===).
   * The content before the first header can be retrieved by using '' as the key.
   * @param {string} namuMarkup NamuWiki markup
   * @return {Object.<string, string>} Key-value mappings of section header to content
   */
  parseSections(namuMarkup) {
    //Assumption: Headers begin and end with the same number of equal signs (=).

    const result = namuMarkup.split(/^\s*=+\s*(.+?)\s*=+\s*$/mg);
    const headerToContent = {};

    //The first section (with no header)
    headerToContent[''] = result[0];

    //Start at 1, since the first segment is the article name
    for (let i = 1; i < result.length; i += 2)
      headerToContent[result[i]] = result[i + 1];

    return headerToContent;
  },

  parseHeroPage(namuMarkup) {
    const hero = {
      skills: [],
      talents: []
    };

    namuMarkup = replaceSpecialColors(namuMarkup);
    namuMarkup = removeNamuFootnotes(namuMarkup);
    namuMarkup = removeQuestMarkup(namuMarkup);
    namuMarkup = removeNamuBr(namuMarkup);

    //글을 구역별로 나눈다
    const pattern = /^=+\s*(.+?)\s*=+\s*$/mg;

    let matches = [];
    let match;
    while (match = pattern.exec(namuMarkup))
      matches.push(match);

    let isTalentSection = false;
    let talentLevel; //루프 바깥에 선언해야 궁극기의 레벨을 올바르게 설정할 수 있다.

    matches.forEach((match, index) => {
      let title = match[1], content;
      if (index < matches.length - 1)
        content = namuMarkup.slice(match.index + match[0].length, matches[index + 1].index);
      else
        content = namuMarkup.slice(match.index + match[0].length);

      console.log('Match', match.index, '/ title =', JSON.stringify(title), '/ content-length:', content.length);

      const skillTitleMatch = /(고유 능력|Q|W|E|R|1)\s*(?:-|:)\s*(.*)/.exec(title);
      const talentTitleMatch = /(\d)단계: 레벨 (\d+)/.exec(title);

      if (skillTitleMatch) {
        const skill = parseSkillSection(skillTitleMatch[1], skillTitleMatch[2], content);
        if (isTalentSection) { //궁극기
          skill.level = talentLevel;
          hero.talents.push(skill);
        }
        else
          hero.skills.push(skill);
      }
      else if (talentTitleMatch) {
        isTalentSection = true;
        talentLevel = parseInt(talentTitleMatch[2]);

        const talents = parseTalentSection(content);
        talents.forEach(talent => talent.level = talentLevel);
        hero.talents.push(...talents);
      }
    });

    return hero;
  },

  /**
   * Removes NamuWiki text coloring markup ({{{#xxxxxx text}}}).
   * @param {string} namuMarkup NamuWiki markup
   * @param {string[]} colors Array of colors to remove, each in the form of '#ffffff' (mixed cases acceptable)
   * @return {string} Modified NamuWiki markup
   */
  removeColorSpanMarkup(namuMarkup, colors) {
    //For easy comparison
    colors = colors.map(str => str.toLowerCase());

    const spanStack = [];
    const spanBoundsPattern = /(\{\{\{|\}\}\})(?:(#\w{6}) )?/g;
    let spanBoundsMatch = null;
    let output = '', sliceBegin = 0;

    while (spanBoundsMatch = spanBoundsPattern.exec(namuMarkup)) {
      let needsSlice = false;

      if (spanBoundsMatch[1] === '{{{') {
        if (spanBoundsMatch[2] && colors.includes(spanBoundsMatch[2].toLowerCase())) {
          needsSlice = true;
          spanStack.push(true);   //Remove this span later
        }
        else
          spanStack.push(false);  //Don't remove this span later
      }
      else
        needsSlice = spanStack.pop();

      if (needsSlice) {
        //Slice everything up to this point, and arrange next slice to begin after this
        output += spanBoundsMatch.input.slice(sliceBegin, spanBoundsMatch.index);
        sliceBegin = spanBoundsPattern.lastIndex;
      }
    }

    //Add remaining text
    output += namuMarkup.slice(sliceBegin);

    return output;
  },

  COMMON_TEXT_COLORS: [
    '#f2fee7',  //기술 본문
    '#66ccec',  //특성 이름 및 유형
    '#fd8a27',  //특성 이름 내 링크
    '#eefee7',  //특성 본문
    '#d9d9d9',  //재사용 대기시간
    '#3cb5f1',  //마나 소모량
    '#cc9999',  //기술 및 특성 사거리 정보
    '#ffc000',  //퀘스트
  ],

  /**
   * Removes bold text formatting ('''text''').
   * @param {string} namuMarkup NamuWiki markup
   * @return {string} Modified NamuWiki markup
   */
  removeBoldFormatting(namuMarkup) {
    return namuMarkup.replace(/'''/g, '');
  },

  /**
   * Removes specific images that contain any of the given tokens (case insensitive).
   * Also removes a single trailing space chracter, if any.
   * @param {string} namuMarkup NamuWiki markup
   * @param {string[]} imageTokens Image name tokens that will be matched with indexOf()
   * @return {string} Modified NamuWiki markup
   */
  removeImages(namuMarkup, imageTokens = []) {
    imageTokens = imageTokens.map(str => str.toLowerCase());
    return namuMarkup.replace(/\[\[파일:([^\]]+?)(?:\|[^\]]+)?\]\] ?/g, (match, imageName) => {
      for (let i = 0; i < imageTokens.length; ++i)
        if (imageName.toLowerCase().indexOf(imageTokens[i]) !== -1)
          return '';

      return match;
    })
  },

  COMMON_IMAGES: [
    'Cooldown_Clock.png', //재사용 대기시간
    'icon-range-32.png',  //효과 사거리
    'icon-width-32.png',  //효과 너비
    'icon-radius-32.png', //효과 반경
  ],

  /**
   * 나무위키 주석([* 내용])을 제거한다.
   * @param {string} namuMarkup 나무마크
   */
  removeNamuFootnotes(namuMarkup) {
    return namuMarkup.replace(/\[\* [^\[]*(\[\[[^\]]*\]\][^\[]*)*\]/g, '');
  },

  /**
   * Flattens NamuWiki anchors ([[target]] or [[target|link text]]) to plain text
   * Note: Images are unaffeected.
   * @param {string} namuMarkup NamuWiki markup
   * @return {string} Modified NamuWiki markup
   */
  removeAnchors(namuMarkup) {
    return namuMarkup.replace(/\[\[(?!파일:)(?:[^\]]+\|)?([^\]]+)]\]/g, '$1');
  },

  /**
   * 나무위키식 줄바꿈([br])을 개행문자로 대체한다.
   * @param {string} namuMarkup 나무마크
   */
  removeNamuBr(namuMarkup) {
    return namuMarkup.replace(/\[br\]/gi, '\n');
  },

  parseSkillSection(skillType, skillName, content) {
    const skill = {
      type: skillType,
      name: removeNamuAnchor(skillName),
      description: '',
      cooldown: undefined,
      extras: {}
    };

    const contentMatch = /\{\{\{#\w{6} ([^]+?)\s*\}\}\}([^]*?)\|\|/m.exec(content);
    if (contentMatch) {
      skill.description = contentMatch[1];

      const skillExtra = contentMatch[2];
      const extraPattern = /'''(.+?)''' (.+?)\s*(?:[{}\[\]])/g;

      let extraMatch;
      while (extraMatch = extraPattern.exec(skillExtra)) {
        if (extraMatch[1].includes('시간'))
          skill.cooldown = parseFloat(extraMatch[2]);
        else
          skill.extras[extraMatch[1]] = extraMatch[2];
      }
    }
    else
      console.error('match failure');

    return skill;
  },

  parseTalentSection(content) {
    const headerPattern = /'''\{\{\{#\w{6} (.*?)\}\}\}'''.*?\|\|.*?\{\{\{#\w{6} (.*?)\}\}\}/g;
    let headerMatches = [], headerMatch;
    while (headerMatch = headerPattern.exec(content))
      headerMatches.push(headerMatch);

    return headerMatches.map((headerMatch, index) => {
      let begin = headerMatch.index + headerMatch[0].length, end;
      if (index < headerMatches.length - 1)
        end = headerMatches[index + 1].index;
      else
        end = content.length;

      return parseSkillSection(headerMatch[2], headerMatch[1], content.slice(begin, end));
    });
  }
};

const MarkdownGenerator = {
  heroToMarkdown(hero) {
    let markdown = '# ' + hero.name + '\n'
      + '## 기술\n';

    markdown += hero.skills.map(skillToMarkdown).join('\n\n');

    markdown += '\n\n## 특성';

    const talentsByLevel = {};
    hero.talents.forEach(talent => {
      console.log(talent.level + ': ' + talent.name);
      if (!(talent.level in talentsByLevel))
        talentsByLevel[talent.level] = [talent];
      else
        talentsByLevel[talent.level].push(talent);
    });

    for (talentLevel in talentsByLevel) {
      markdown += '\n### 레벨 ' + talentLevel + '\n'
        + talentsByLevel[talentLevel].map(talentToMarkdown).join('\n\n') + '\n';
    }

    return markdown + '\n';
  },

  skillToMarkdown(skill) {
    let markdown = '### ' + skill.name + '\n'
      + '* 유형: ' + skill.type + '\n';

    if (skill.cooldown)
      markdown += '* 재사용 대기시간: ' + skill.cooldown + '\n';

    for (const extra in skill.extras)
      markdown += '* ' + extra + ': ' + skill.extras[extra] + '\n';

    markdown += '\n' + skill.description;

    return markdown;
  },

  talentToMarkdown(talent) {
    return '#' + skillToMarkdown(talent);
  }
};


const fs = require('fs');

// fs.writeFileSync('output.md', '\n\n');

// const heroFiles = fs.readdirSync('namuwiki-heroes-raw');
// heroFiles.forEach(fileName => {
//   const data = fs.readFileSync('namuwiki-heroes-raw/' + fileName);
//   const hero = parseHeroPage(data.toString('utf8'));
//   hero.name = fileName.replace(/\(.*\)/, '').replace('.txt', '');
//   fs.writeFileSync('output.md', heroToMarkdown(hero), { flag: 'a' });
// });
const Tests = {
  testTableParser(namuMarkup) {
    return NamuParser.parseTables(
      NamuParser.trimTableMarkup(namuMarkup)
    );
  },

  testColorSpanRemove(namuMarkup) {
    return NamuParser.removeColorSpanMarkup(
      namuMarkup,
      ['#eefee7', '#ffffff', '#ffd700']
    );
  },

  testRemoveImages(namuMarkup) {
    return NamuParser.removeImages(
      namuMarkup,
      NamuParser.COMMON_IMAGES
    );
  },

  testRemoveAnchors(namuMarkup) {
    return NamuParser.removeAnchors(namuMarkup);
  },

  testSections(namuMarkup) {
    return NamuParser.parseSections(namuMarkup);
  },

  testComposite(namuMarkup) {
    namuMarkup = NamuParser.removeColorSpanMarkup(
      namuMarkup,
      NamuParser.COMMON_TEXT_COLORS
    );

    namuMarkup = NamuParser.trimTableMarkup(namuMarkup);
    namuMarkup = NamuParser.removeImages(namuMarkup, NamuParser.COMMON_IMAGES);
    namuMarkup = NamuParser.removeAnchors(namuMarkup);
    namuMarkup = NamuParser.removeBoldFormatting(namuMarkup);

    const sections = NamuParser.parseSections(namuMarkup);

    for (const header in sections)
      sections[header] = NamuParser.parseTables(sections[header]);

    return sections;
  }
};

function runTests() {
  const test = process.argv[2];
  if (test) {
    const filePath = process.argv[3] || 'temp/namu-dump/D.Va.txt';
    const namuMarkup = fs.readFileSync(filePath, 'utf8');

    const testName = ('test' + test).toLowerCase();
    let matchFound = false;
    for (const testFuncName in Tests) {
      if (testFuncName.toLowerCase() === testName) {
        matchFound = true;

        console.log(`Running test: ${testFuncName}()  (input size is ${namuMarkup.length} characters)`)

        let result = Tests[testFuncName](namuMarkup);

        let resultFile;
        if (typeof result === 'string')
          resultFile = 'temp/output.txt';
        else {
          resultFile = 'temp/output.json';
          result =  JSON.stringify(result, null, 2);
        }

        fs.writeFileSync(resultFile, result);

        console.log(`Test finished, results written to ${resultFile} (output size: ${result.length} characters)`);
        break;
      }
    }

    if (matchFound)
      return;

    console.log(test + ' does not match any test available\n');
  }

  console.log('Available tests:');
  for (const testFuncName in Tests)
    console.log('\t' + testFuncName.toLowerCase().replace('test', ''));
}


if (require.main === module) {
  runTests();
}

