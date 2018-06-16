#!/usr/bin/env node

/**
 * Converts downloaded NamuWiki source files to Markdown.
 */

'use strict';

const fs = require('fs');
const namu2hots = require('./src/namu2hots.js');

const MarkdownGenerator = {
  heroToMarkdown(hero) {
    let markdown = '# ' + hero.name + '\n'
      + '## 기술\n';

    markdown += hero.skills.map(this.skillToMarkdown).join('\n\n');

    markdown += '\n\n## 특성';

    for (const talentLevel in hero.talents) {
      markdown += '\n### 레벨 ' + talentLevel + '\n'
        + hero.talents[talentLevel].map(
          talent => this.talentToMarkdown(talent)
        ).join('\n\n') + '\n';
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
    return '#' + this.skillToMarkdown(talent);
  }
};


if (require.main === module) {
  const outputFile = 'temp/markdown/heroes.md';
  const inputDir = 'temp/namu-dump/';

  //Overwrite content
  fs.writeFileSync(outputFile, '\n');

  fs.readdirSync(inputDir).forEach(fileName => {
    const data = fs.readFileSync(inputDir + fileName, 'utf8');
    const hero = namu2hots.parseHeroPage(data);
    hero.name = fileName.replace(/\(.*\)/, '').replace('.txt', '');
    fs.writeFileSync(outputFile, MarkdownGenerator.heroToMarkdown(hero), { flag: 'a' });
  });
}