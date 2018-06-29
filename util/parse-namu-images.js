#!/usr/bin/env node

/**
 * Converts downloaded NamuWiki source files to Markdown and JSON.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const wget = require('wget-improved');

const namuHtmlDir = path.normalize('temp/namu-dump/html');

const imgAltToUrlMapping = {};

fs.readdirSync(namuHtmlDir).forEach(fileName => {
  const filePath = path.join(namuHtmlDir, fileName);
  const html = fs.readFileSync(filePath, 'utf8');

  const imgTags = html.match(/<img.*?>/g);
  if (!imgTags) {
    console.warn(fileName, 'contains no <img> tags');
    return;
  }

  imgTags.forEach(imgTag => {
    const srcMatch = /src=['"](.*?)['"]/.exec(imgTag);
    const altMatch = /alt=['"](.*?)['"]/.exec(imgTag);
    if (!srcMatch || !altMatch)
      return;

    const src = srcMatch[1], altText = altMatch[1];
    imgAltToUrlMapping[altText] = src;
  });

  console.log('Parsed', filePath);
});

fs.writeFileSync('temp/namu-img-alt-to-url.json',
  JSON.stringify(imgAltToUrlMapping, null, 2));