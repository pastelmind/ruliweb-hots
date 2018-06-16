#!/usr/bin/env node

/**
 * Test script for markdown2hots, intended to be called from the command line.
 */

'use strict';

const fs = require('fs');
const rewire = require('rewire');
const markdown2hots = rewire('../src/markdown2hots.js');

const markdown = fs.readFileSync('temp/heroes.md', 'utf8');
const heroes = markdown2hots.parseHeroMarkdown(markdown);

//Write compact JSON output
const heroesCompact = {};
for (const heroId in heroes)
  heroesCompact[heroId] = heroes[heroId].compact();

const outputJsonFile = 'temp/from-md.json';
fs.writeFileSync(outputJsonFile, JSON.stringify(heroesCompact, null, 2));
console.log('Markdown-to-json results saved to', outputJsonFile);