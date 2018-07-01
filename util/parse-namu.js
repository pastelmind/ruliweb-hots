#!/usr/bin/env node

/**
 * Converts downloaded NamuWiki source files to Markdown and JSON.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { Hero } = require('./src/models');
const namu2hots = require('./src/namu2hots');
const markdown2hots = require('./src/markdown2hots');


//Read data from NamuWiki pages
const namuHeroArray = [];
const namuDir = path.normalize('temp/namu-dump/raw');

fs.readdirSync(namuDir).forEach(fileName => {
  const namuMarkup = fs.readFileSync(path.join(namuDir, fileName), 'utf8');

  //Exception: Cho'Gall is two heroes in one
  if (fileName.includes('초갈')) {
    const chogall = namu2hots.parseChoGallPage(namuMarkup);
    namuHeroArray.push(chogall.cho, chogall.gall);
  }
  else {
    const hero = namu2hots.parseHeroPage(namuMarkup);
    hero.name = fileName.replace(/\(.*\)/, '').replace('.txt', '');
    namuHeroArray.push(hero);
  }
});

//Read minimal data containing Hero ID and icon URLs
const heroesMinimal = JSON.parse(fs.readFileSync('./util/data/heroes-minimal.json'));

//Merge minimal data and NamuWiki data
const heroes = {};

namuHeroArray.forEach(hero => {
  for (const heroId in heroesMinimal) {
    if (hero.id === heroId) {
      const minimalHero = heroesMinimal[heroId];
      //Copy hero iconUrl and skill iconUrl
      //TODO improve logic
      hero.iconUrl = minimalHero.iconUrl;
      if (minimalHero.skills) {
        minimalHero.skills.forEach((skill, index) => {
          hero.skills[index].iconUrl = skill.iconUrl;
        });
      }

      heroes[heroId] = new Hero(hero);
      delete heroesMinimal[heroId];
      return;
    }
  }

  console.warn(hero.name + ` (${hero.id}) is not in heroes-minimal.json -- it is dropped from the dataset.`);
});

for (const remainingHeroId in heroesMinimal)
  console.warn(heroesMinimal[remainingHeroId].name + ` (${remainingHeroId}) is not found in NamuWiki data --it is dropped from the dataset.`);

//Generate JSON output
const heroesCompact = Hero.compact(heroes);

const compactJsonFile = './temp/heroes-compact.json';
fs.writeFileSync(compactJsonFile, JSON.stringify(heroesCompact, null, 2));
console.log('Compact JSON file written to', compactJsonFile);

//Generate Markdown output
const markdownFile = './docs/heroes.md';
let markdown = '';

for (const heroId in heroes)
  markdown += markdown2hots.heroToMarkdown(heroes[heroId]);

fs.writeFileSync(markdownFile, markdown);
console.log('Markdown file written to', markdownFile);