#!/usr/bin/env node

/**
 * Test script for markdown2hots, intended to be called from the command line.
 */

'use strict';

const fs = require('fs');
const rewire = require('rewire');
const models = require('../src/models.js');
const markdown2hots = rewire('../src/markdown2hots.js');

const markdown = fs.readFileSync('temp/heroes.md', 'utf8');
const heroes = markdown2hots.parseHeroMarkdown(markdown);

//Write compact JSON output
const heroesCompact = models.Hero.compact(heroes);

const outputJsonFile = 'temp/from-md.json';
fs.writeFileSync(outputJsonFile, JSON.stringify(heroesCompact, null, 2));
console.log('Markdown-to-json results saved to', outputJsonFile);