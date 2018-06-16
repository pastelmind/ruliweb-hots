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
fs.writeFileSync('temp/from-md.json', JSON.stringify(heroes, null, 2));
console.log('Complete!');