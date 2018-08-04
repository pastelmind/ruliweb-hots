#!/usr/bin/env node

'use strict';

/**
 * Extracts URLs from `<img>` tags in the given HTML.
 * @param {string} html HTML string
 * @return {Object<string, string>} Mapping of image URL => image alt text
 */
module.exports = function extractImageUrlsFromHtml(html) {
  const images = {};

  for (const img of html.match(/<img.*?>/gi)) {
    const srcMatch = img.match(/src="(.*?)"/i);
    const altMatch = img.match(/alt="(.*?)"/i);

    images[srcMatch[1]] = altMatch ? altMatch[1] : '';
  }

  return images;
};