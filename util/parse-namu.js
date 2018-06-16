#!/usr/bin/env node

/**
 * Converts downloaded NamuWiki source files to Markdown.
 */

'use strict';

const fs = require('fs');
const namu2hots = require('./src/namu2hots.js');
const markdown2hots = require('/src/markdown2hots.js');


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