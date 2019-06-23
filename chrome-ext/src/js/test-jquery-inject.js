/// <reference path="../../../node_modules/@types/jquery/jquery.d.ts" />


(() => {

$('.ruliweb-hots-hero-table,.ruliweb-hots-skill-table,.ruliweb-hots-talent-table')
  .each(function () {
    if (isSemverLessOrEqual(this.dataset.ruliwebHotsVersion, '0.10.1')) {
      prepareLegacyTable($(this));
    }
  });

/**
 * Checks if the semver-compatible version A is lesser than or equal to B.
 *
 * Note: This only accepts version strings of the form "number.number.number".
 * If either string does not match the pattern, returns false.
 *
 * @param {string} semVerA Semver-compatible version A
 * @param {string} semVerB Semver-compatible version B
 * @return {boolean} true iff `semVerA` <= `semVerB`, false otherwise
 */
function isSemverLessOrEqual(semVerA, semVerB) {
  const semVerPattern = /(\d+)\.(\d+)\.(\d+)/;

  const semVerAMatch = semVerA.match(semVerPattern);
  const semVerBMatch = semVerB.match(semVerPattern);
  if (!semVerAMatch || !semVerBMatch) return false;

  // Compare major version number
  const aMajor = +semVerAMatch[1];
  const bMajor = +semVerBMatch[1];
  if (aMajor < bMajor) return true;
  if (aMajor > bMajor) return false;

  // Compare minor version number
  const aMinor = +semVerAMatch[2];
  const bMinor = +semVerBMatch[2];
  if (aMinor < bMinor) return true;
  if (aMinor > bMinor) return false;

  // Compare patch numbers
  return +semVerAMatch[3] <= +semVerBMatch[3];
}


/**
 * Prepares a legacy injected table element for hero level slider enhancements.
 *
 * This looks for text matching the form "number(+number)" or "number(+number)%"
 * and surrounds them with `<output>` tags decorated with `data-*` attributes.
 *
 * @param {JQuery} tableElem Injected table element
 */
function prepareLegacyTable(tableElem) {
  tableElem.html(tableElem.html().replace(
    /(\d+(?:\.\d+)?) ?\(\+(\d+(?:\.\d+)?)(%?)\)/g,
    (match, level1ValueStr, scalingValueStr, percentSign) => {
      const level1Value = +level1ValueStr;
      if (level1Value !== level1Value) return match;

      if (percentSign) {
        const levelScaling = 1 + (+scalingValueStr) / 100;
        if (levelScaling !== levelScaling) return match;

        const base = Math.round(level1Value / levelScaling);
        return `<output data-hots-level-base="${base}"` +
          ` data-hots-level-scaling="${levelScaling}">${match}</output>`
      }
      else {
        const levelAdd = +scalingValueStr;
        if (levelAdd !== levelAdd) return match;

        //For linearly scaling values, the level 1-value is the base value, and
        //the levelAdd value is added on every level up
        return `<output data-hots-level-base="${level1Value}"` +
          ` data-hots-level-add="${levelAdd}">${match}</output>`
      }
    }
  ));
}

})();