#!/usr/bin/env node

/**
 * Updates Chrome extension's version string in manifest.json to match package.json
 */

if (require.main === module) {
  const fs = require('fs');

  const packageVersion = process.env.npm_package_version;
  if (!packageVersion) {
    console.error('Package version is', packageVersion);
  }
  else {
    const manifestJsonPath = './chrome-ext/src/manifest.json';
    const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));

    if (manifestJson.version === packageVersion)
      console.log('manifest.json version is up-to-date (%s), no changes', manifestJson.version);
    else {
      const oldVersion = manifestJson.version;
      manifestJson.version = packageVersion;
      fs.writeFileSync(manifestJsonPath, JSON.stringify(manifestJson, null, 2));
      console.log('Updated manifest version: %s => %s', oldVersion, manifestJson.version);
    }
  }
}