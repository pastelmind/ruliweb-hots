#!/usr/bin/env node

/**
 * Package the extension source directory into a ZIP file
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import util from 'util';

import yazl from 'yazl';


const statAsync = util.promisify(fs.stat);
const readdirAsync = util.promisify(fs.readdir);

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const packageVersion = process.env.npm_package_version;
if (!packageVersion) {
  throw new Error(`Missing package version (value: ${packageVersion})`);
}

const extensionZip = new yazl.ZipFile();
const sourceDirPath = path.join(__dirname, 'src');
const targetZipPath = path.join(
  __dirname, `../build/ruliweb-hots.${packageVersion}.zip`,
);
const targetZipStream = fs.createWriteStream(targetZipPath);

(async () => {
  for (const filePath of await allFiles(sourceDirPath)) {
    const pathInZip =
      path.relative(sourceDirPath, filePath).replace(/\\/g, '/');
    extensionZip.addFile(filePath, pathInZip);
  }

  // Add docs/hots.json as data/hots.json
  const hotsJsonPath = path.join(__dirname, '../docs/hots.json');
  extensionZip.addFile(hotsJsonPath, 'data/hots.json');

  extensionZip.end();

  extensionZip.outputStream
    .pipe(targetZipStream)
    .on('finish', () => {
      console.log('Extension has been packaged into ZIP file:', targetZipPath);
    });
})();


// -------- Support functions -------- //

/**
 * Returns a list of paths to all files under the directory (recursive).
 * @param {string} dirPath Path to file or directory
 * @return {Promise<string[]>} Array of all files in dirPath (recursive)
 */
async function allFiles(dirPath) {
  const dirStats = await statAsync(dirPath);

  if (dirStats.isDirectory()) {
    const files = [];

    for (const fileName of await readdirAsync(dirPath)) {
      files.push(...await allFiles(path.join(dirPath, fileName)));
    }

    return files;
  } else return [dirPath]; // dirPath is a file
}
