#!/usr/bin/env node

/**
 * Organizes all hero, skill, and talent images in `hots.json`.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const program = require('commander');

const Hero = require('./src/hero');
const extractImageUrlsFromHtml = require('./src/extract-img-from-html');
const CachedUrlHasher = require('./src/cached-url-hasher');


const readFileAsync = util.promisify(fs.readFile);
const cachedUrlHasher = new CachedUrlHasher;


//Compatibility code for Node v8
require('./src/console-assert-no-throw');


program
  .arguments('<listfile>')
  .description('Find and report duplicate images (<img> tags) in the listfile (HTML)')
  .action(listfile => program.listfile = listfile);

program.parse(process.argv);


if (process.argv.length <= 2 || !program.listfile) {
  console.error('Must specify listfile');
  program.help();
}


//-------- Main code --------//

(async () => {
  const listfileContent = await readFileAsync(program.listfile, 'utf8');
  const iconUrlToAltText = extractImageUrlsFromHtml(listfileContent);
  const iconUrls = Object.keys(iconUrlToAltText);

  console.log(`${Object.keys(iconUrlToAltText).length} icon(s) found.`);
  process.stdout.write('Comparing...');

  const CHUNK_SIZE = 20;    //Process images concurrently in chunks to avoid hammering the servers too hard

  const hashToIconUrl = {};
  for (let i = 0; i < iconUrls.length; i += CHUNK_SIZE) {
    const promises = iconUrls.slice(i, i + CHUNK_SIZE).map(async iconUrl => {
      const hash = await cachedUrlHasher.hash(iconUrl);
      process.stdout.write('.');

      const prevIconUrl = hashToIconUrl[hash]
      if (prevIconUrl) {
        console.log(`\nDuplicate found: ${iconUrl} (${iconUrlToAltText[iconUrl]}) is identical to ${prevIconUrl} (${iconUrlToAltText[prevIconUrl]})`);
      }
      else
        hashToIconUrl[hash] = iconUrl;
    });

    await Promise.all(promises);
  }
})();