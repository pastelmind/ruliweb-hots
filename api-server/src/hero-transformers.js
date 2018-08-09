#!/usr/bin/env node

/**
 * Defines a set of functions that operate on a Hero object.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');

const axios = require('axios');
const entities = new require('html-entities').AllHtmlEntities;

const Hero = require('./hero');

module.exports = {
  /**
   * Returns an async function that takes a Hero as its argument.
   * For each skill and talent, reads the NamuWiki image name from the
   * `skillOrTalent.iconUrl` property, and assigns the corresponding download
   * URL to the `skillOrTalent.namuIconUrl` property. This uses the hero's
   * article name stored in `hero.articleName`.
   * @return {HeroTransformCallback} Hero transform function
   */
  getNamuIconUrlAdder() {
    const namuImageNameToNamuUrl = {};
    const crawledArticles = {};

    return async hero => {
      assert(hero.articleName, hero.name + ' does not have a known article name');

      //Cache the article
      if (!(hero.articleName in crawledArticles)) {
        const namuImageUrls = await crawlImageUrls(hero.articleName);
        Object.assign(namuImageNameToNamuUrl, namuImageUrls); //If duplicates exist, overwrite old URLs with new ones
        crawledArticles[hero.articleName] = true;
      }

      for (const skillOrTalent of hero.allSkillsAndTalents()) {
        const namuImageName = skillOrTalent.iconUrl;
        assert(namuImageName in namuImageNameToNamuUrl, skillOrTalent.iconUrl + ' is not associated with any known image URL');
        skillOrTalent.namuIconUrl = namuImageNameToNamuUrl[namuImageName];
      }
    };
  },

  /**
   * Returns an async function that takes a Hero as its argument.
   * For each skill and talent, reads the `skillOrTalent.namuIconUrl` property
   * and downloads it to the specified directory, using `skillOrTalent.iconUrl`
   * as the file name.
   * @param {string} saveDir Directory to save the images to
   * @return {HeroTransformCallback} Hero transform function
   */
  getSkillAndTalentIconDownloader(saveDir) {
    saveDir = path.resolve(saveDir);
    const savedNamuImages = {};

    return async hero => {
      for (const skillOrTalent of hero.allSkillsAndTalents()) {
        const namuImageName = skillOrTalent.iconUrl;
        if (namuImageName in savedNamuImages) //Already downloaded
          continue;

        savedNamuImages[namuImageName] = true;
        const savePath = path.join(saveDir, skillOrTalent.iconUrl.replace('파일:', ''));
        download(skillOrTalent.namuIconUrl, savePath);
      }
    };
  },

  /**
   * Returns an async function that takes a Hero as its argument.
   * For each skill and talent, reads the `skillOrTalent.namuIconUrl` property
   * and downloads the file, then computes its hash. The resulting hash is
   * assigned to `skillOrTalent.iconHash`.
   * @param {CachedUrlHasher} urlHasher A hasher object
   * @return {HeroTransformCallback} Hero transform function
   */
  getSkillAndTalentIconHasher(urlHasher) {
    const hashedNamuImages = {};

    return async hero => Promise.all(
      Array.from(hero, async skillOrTalent => {
        const namuImageName = skillOrTalent.iconUrl;

        if (!(namuImageName in hashedNamuImages)) //Not hashed yet
          hashedNamuImages[namuImageName] = urlHasher.hash(skillOrTalent.namuIconUrl);

        skillOrTalent.iconHash = await hashedNamuImages[namuImageName];
      })
    );
  },

  /**
   * Returns an async function that takes a Hero as its argument.
   * For each skill and talent, reads the `skillOrTalent.iconHash` property and
   * assigns the matching URL in `hashToUrl` to `skillOrTalent.iconUrl`.
   * Upon each call, the transform function will return a Set of URLs from
   * `hashToUrl` that have never been used so far.
   * @param {Object<string, string>} hashToUrl A mapping of image hash => image URL
   * @return {HeroTransformCallback} Hero transform function
   */
  getSkillAndTalentIconHashMatcher(hashToUrl) {
    const unusedUrls = new Set(Object.values(hashToUrl));

    return async hero => {
      for (const skillOrTalent of hero.allSkillsAndTalents()) {
        const hash = skillOrTalent.iconHash;

        if (hash in hashToUrl)
          unusedUrls.delete(skillOrTalent.iconUrl = hashToUrl[hash]);
        else
          console.error(skillOrTalent.iconUrl, 'does not match any hosted URL');
      }

      return unusedUrls;
    };
  }

};


/**
 * @callback HeroTransformCallback
 * @param {Hero} hero Hero object to transform
 * @return {Promise}
 */


/**
 * Downloads the HTML article and parses NamuWiki images.
 * @param {string} articleName
 * @return {Promise<Object.<string,string>>} Key-value mapping of NamuWiki image name => image URL.
 */
async function crawlImageUrls(articleName) {
  const htmlArticleResponse = await axios.get(
    'https://namu.wiki/w/' + encodeURIComponent(articleName),
    { responseType: 'text' }
  );

  return extractImgAltTextToUrl(htmlArticleResponse.data);
}

/**
 * Extracts src and alt attributes from <img> tags in the given HTML.
 * Will decode HTML entities in both src and alt text
 * @param {string} html HTML document source
 * @return {Object.<string, string>} A mapping of alt text: src, or null if there is no <img> tag
 */
function extractImgAltTextToUrl(html) {
  const imgTags = html.match(/<img.*?>/g);
  if (!imgTags)
    return null;

  const imgAltTextToUrlMapping = {};
  imgTags.forEach(imgTag => {
    const srcMatch = /src=['"](.*?)['"]/.exec(imgTag);
    const altMatch = /alt=['"](.*?)['"]/.exec(imgTag);
    if (!srcMatch || !altMatch)
      return;

    const src = entities.decode(srcMatch[1]);
    const altText = entities.decode(altMatch[1]);
    imgAltTextToUrlMapping[altText] = 'https:' + src;
  });

  return imgAltTextToUrlMapping;
}

/**
 * Download a remote file and save it to the given path.
 * @param {string} url File to download
 * @param {string} savePath Path to save to
 */
async function download(url, savePath) {
  const response = await axios.get(url, { responseType: 'stream' });
  const downloadStream = response.data;

  const saveStream = fs.createWriteStream(savePath);

  return new Promise(resolve => {
    saveStream.on('finish', resolve);
    saveStream.on('error', error => { throw error; });
    downloadStream.pipe(saveStream);
  });
}