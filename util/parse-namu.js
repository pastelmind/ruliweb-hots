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

  trimTableMarkup(namuMarkup) {
    return namuMarkup.replace(/<([\^v]?(-|\|)\d+|(table|row)?\s*(align|bgcolor|bordercolor|width)=.*?|[(:)])>/gi, '');
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
   * 퀘스트를 나타내는 나무위키 문법을 평문으로 바꾼다.
   * @param {string} namuMarkup 나무마크
   */
  removeQuestMarkup(namuMarkup) {
    return namuMarkup.replace(/\{\{\{#\w+ '''(반복 퀘스트|퀘스트|보상)''':\}\}\}/g, '$1:')
      .replace(/\[\[파일:Quest_Mark\.png\]\]\s?/g, '');
  },

  /**
   * 몇몇 기술 설명의 강조 표시를 HTML로 바꾼다.
   * @param {string} namuMarkup 나무마크
   */
  replaceSpecialColors(namuMarkup) {
    return namuMarkup.replace(/\{\{\{(#\w+) '''(.*?)'''(:?)\}\}\}(:?)/g, '<b style="color: $1">$2$3$4</b>')
      .replace(/\{\{\{(#\w+) (속도 증폭|치유 증폭|인간|늑대인간|사신의 징표|연계 점수)(:?)\}\}\}(:?)/g, '<span style="color: $1">$2$3$4</span>');
  },

  /**
   * 나무위키 주석([* 내용])을 제거한다.
   * @param {string} namuMarkup 나무마크
   */
  removeNamuFootnotes(namuMarkup) {
    return namuMarkup.replace(/\[\* [^\[]*(\[\[[^\]]*\]\][^\[]*)*\]/g, '');
  },

  /**
   * 나무위키 링크([[링크명|문서]])를 링크명으로 대체한다
   * @param {string} namuMarkup 나무마크
   */
  removeNamuAnchor(namuMarkup) {
    return namuMarkup.replace(/\[\[(?:.+?\|)?(?:\{\{\{#\w{6} )?(.+?)(?:\}\}\})?\]\]/g, '$1');
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

if (require.main === module) {
  const Tests = {
    testTableParser() {
      const filePath = process.argv[2] || 'temp/namu-dump/D.Va.txt';
      const namuMarkup = fs.readFileSync(filePath, 'utf8');
      const tables = NamuParser.parseTables(namuMarkup).map(table =>
        table.map(
          cellText => NamuParser.trimTableMarkup(cellText)
        )
      );

      fs.writeFileSync('temp/output.json', JSON.stringify(tables, null, 2));
    }
  };

  Tests.testTableParser();
}

