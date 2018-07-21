/**
 * Provides tools for manipulating HotS data after retrieving the JSON file.
 * This script can be used both in Node.js and in the browser.
 */

'use strict';


/**
 * Decorates the raw HotsData object for the extension to use.
 *
 * Actions:
 *  * Set default icon URL to heroes, skills, and talents with missing icons
 *  * Assign an index number to each skill.
 *  * Assign a talent level to each talent.
 * @param {HotsData} hotsData Unmodified HotS data object parsed from hots.json
 * @return {HotsData} Decorated HotS data object
 */
function decorateHotsData(hotsData) {
  //Default URL for missing icons
  const missingIconUrl = 'http://i3.ruliweb.com/img/18/06/15/164006c1bf719dc2c.png';

  for (const [heroId, hero] of Object.entries(hotsData.heroes)) {
    hero.id = heroId;

    //Apply default icon URL to heroes
    if (!hero.iconUrl)
      hero.iconUrl = missingIconUrl;

    hero.skills.forEach((skill, index) => {
      //Apply default icon URL to skills
      if (!skill.iconUrl)
        skill.iconUrl = missingIconUrl;

      //Apply skill index to each skill
      skill.index = index;
    });

    for (const talentLevel in hero.talents) {
      const level = parseInt(talentLevel);

      hero.talents[talentLevel].forEach((talent, index) => {
        //Apply default icon URL to talents
        if (!talent.iconUrl)
          talent.iconUrl = missingIconUrl;

        //Assign talent index and level to each talent
        talent.level = level;
        talent.index = index;
      });
    }
  }

  return hotsData;
}


//For use in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = decorateHotsData;
}