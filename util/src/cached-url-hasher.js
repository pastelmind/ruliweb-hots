#!/usr/bin/env node

/**
 * Provides a class that downloads a file and computes its hash.
 */

const crypto = require('crypto');
const util = require('util');
const axios = require('axios');

const hashes = Symbol('hashes');

/**
 * A class that asynchronously downloads a file and computes its hash.
 * Hash values are cached, so multiple calls with the same URL will not download
 * the URL again.
 */
module.exports = class CachedUrlHasher {
  constructor() {
    this[hashes] = {};
  }

  /**
   * Compute the SHA-1 hash of a remote file. Hash values are cached, so
   * multiple calls with the same URL will not download the URL again.
   * @param {string} url File to download and hash
   * @return {Promise<string>} Hash string
   */
  async hash(url) {
    const cachedHashes = this[hashes];
    const cached = cachedHashes[url];

    if ('string' === typeof cached)     //Computation finished
      return cached;                    //...return the hash string
    else if (cached instanceof Promise) //Still computing hash
      return cached;                    //...return the promise
    else if (cached !== undefined)      //Unknown value is cached
      throw new TypeError('Unknown value cached:', util.inspect(cached, { colors: true }));

    //Not in cache: Start a new download
    return cachedHashes[url] = (async () => {
      const response = await axios.get(url, { responseType: 'stream' });
      const downloadStream = response.data;

      const hashStream = crypto.createHash('sha1');

      return new Promise(resolve => {
        hashStream.on('readable', () => {
          const data = hashStream.read();
          if (data)
            resolve(cachedHashes[url] = data.toString('hex'));
        });
        hashStream.on('error', error => { throw error; });
        downloadStream.pipe(hashStream);  //Pipe the download as a stream for performance
      });
    })();
  }
};