#!/usr/bin/env node

/**
 * Provides a class that downloads a file to a directory.
 */

const fs = require('fs');
const axios = require('axios');

const savedUrls = Symbol('savedUrls');

/**
 * A class that asynchronously downloads a file to a directory.
 * Each URL is cached, so multiple calls with the same URL will not download
 * the URL again.
 */
module.exports = class CachedUrlDownloader {
  constructor() {
    this[savedUrls] = {};
  }

  /**
   * Download a remote file and save it to the given path. Each URL is cached,
   * so multiple calls with the same URL will not download the URL again.
   * @param {string} url File to download
   * @param {string} savePath Path to save to
   */
  async download(url, savePath) {
    if (url in this[savedUrls]) return;  //Already saving/saved, no-op
    this[savedUrls][url] = savePath;

    //Start a new download
    const response = await axios.get(url, { responseType: 'stream' });
    const downloadStream = response.data;

    const saveStream = fs.createWriteStream(savePath);

    return new Promise(resolve => {
      saveStream.on('finished', resolve);
      saveStream.on('error', error => { throw error; });
      downloadStream.pipe(saveStream);
    });
  }
};