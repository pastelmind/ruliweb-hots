/**
 * @file Enhances pages containing HotsBoxes.
 */


//Live HTMLCollections for optimizing DOM access
const heroLevelDisplays = document.getElementsByClassName('hots-hero-level');
const heroBoxes = document.getElementsByClassName('ruliweb-hots-hero-table');
const skillBoxes = document.getElementsByClassName('ruliweb-hots-skill-table');
const talentBoxes = document.getElementsByClassName('ruliweb-hots-talent-table');

//Update all HotsBoxes
for (const hotsBox of [...heroBoxes, ...skillBoxes, ...talentBoxes]) {
  if (isSemverLessOrEqual(hotsBox.dataset.ruliwebHotsVersion, '0.10.1')) {
    prepareLegacyHotsBox(hotsBox);
  }
  addHeroLevelSlider(hotsBox);
}

//Add combined event listener for all hero level sliders
document.body.addEventListener('input', event => {
  /** @type {HTMLInputElement} */
  const slider = event.target;
  if (!(slider.tagName === 'INPUT' && slider.type === 'range')) return;

  const level = slider.value;

  //Update hero level displays
  for (const element of heroLevelDisplays) {
    element.textContent = level;
  }

  for (const hotsBox of [...heroBoxes, ...skillBoxes, ...talentBoxes]) {
    updateHeroLevels(hotsBox, level);
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
  if (!semVerAMatch) return false;
  const semVerBMatch = semVerB.match(semVerPattern);
  if (!semVerBMatch) return false;

  const aMajor = parseInt(semVerAMatch[1]);
  const bMajor = parseInt(semVerBMatch[1]);
  if (aMajor < bMajor) return true;
  if (aMajor > bMajor) return false;

  const aMinor = parseInt(semVerAMatch[2]);
  const bMinor = parseInt(semVerBMatch[2]);
  if (aMinor < bMinor) return true;
  if (aMinor > bMinor) return false;

  const aPatch = parseInt(semVerAMatch[3]);
  const bPatch = parseInt(semVerBMatch[3]);
  return aPatch <= bPatch;
}


/**
 * Prepares a legacy HotsBox element for hero level slider enhancements.
 *
 * This looks for text matching the form "number(+number)" or "number(+number)%"
 * and surrounds them with `<output>` tags decorated with `data-*` attributes.
 *
 * @param {HTMLElement} hotsBox Root element of a HotsBox
 */
function prepareLegacyHotsBox(hotsBox) {
  hotsBox.innerHTML = hotsBox.innerHTML.replace(
    /(\d+(?:\.\d+)?) ?\(\+(\d+(?:\.\d+)?)(%?)\)/g,
    (match, level1ValueStr, scalingValueStr, percentSign) => {
      const level1Value = parseFloat(level1ValueStr);
      if (Number.isNaN(level1Value)) return match;

      if (percentSign) {
        const levelScaling = 1 + parseFloat(scalingValueStr) / 100;
        if (Number.isNaN(levelScaling)) return match;

        const base = Math.round(level1Value / levelScaling);
        return `<output data-hots-level-base="${base}"` +
          ` data-hots-level-scaling="${levelScaling}">${match}</output>`
      }
      else {
        const levelAdd = parseFloat(scalingValueStr);
        if (Number.isNaN(levelAdd)) return match;

        //For linearly scaling values, the level 1-value is the base value, and
        //the levelAdd value is added on every level up
        return `<output data-hots-level-base="${level1Value}"` +
          ` data-hots-level-add="${levelAdd}">${match}</output>`
      }
    }
  );
}


/**
 * Adds a Hero Level Slider at the bottom of a HotsBox.
 *
 * @param {HTMLElement} hotsBox Root element of the HotsBox.
 */
function addHeroLevelSlider(hotsBox) {
  const hlsContainer = document.createElement('div');
  hlsContainer.style.textAlign = 'right';
  hlsContainer.innerHTML = '영웅 레벨: ' +
    '<output class="hots-hero-level"></output> ' +
    '<input type="range" min="0" max="30" value="1">';
  hotsBox.appendChild(hlsContainer);
}


/**
 * Updates the hero level slider, level display, and all scaling values in the
 * given HotsBox.
 *
 * @param {HTMLElement} hotsBox Root element of a HotsBox
 * @param {number} level Global hero level
 */
function updateHeroLevels(hotsBox, level) {
  //Synchronize all hero level sliders
  for (const slider of hotsBox.getElementsByTagName('input')) {
    if (slider.type === 'range') {
      slider.value = level;
    }
  }

  //Update level scaling values
  for (const valueElement of hotsBox.getElementsByTagName('output')) {
    const {
      hotsLevelBase,
      hotsLevelScaling,
      hotsLevelAdd,
    } = valueElement.dataset;
    if (!hotsLevelBase) return;

    if (hotsLevelScaling) {
      levelScaling = +hotsLevelScaling;
      const scaledValue = Math.round(hotsLevelBase * levelScaling ** level);
      const scalingPercent = Math.round((levelScaling - 1) * 10000) / 100;
      valueElement.textContent = `${scaledValue}(+${scalingPercent}%)`;
    }
    else {
      const scaledValue = (+hotsLevelBase) + hotsLevelAdd * (level - 1);
      valueElement.textContent = `${scaledValue}(+${hotsLevelAdd})`;
    }
  }
}