#!/usr/bin/env node
'use strict';

const HotsData = require('./hots-data');

/**
 * @typedef {import('./hero')} Hero
 */

/**
 * @typedef {import('./skill')} Skill
 */

/**
 * @typedef {import('./ko-en-string')} KoEnString
 */

0;

/**
 * Merges the source dataset into the target dataset.
 * @param {HotsData} target Dataset to merge into
 * @param {HotsData} source Dataset to import from
 */
module.exports = function mergeHotsData(target, source) {
  for (const sourceHero of Object.values(source.heroes)) {
    let targetHero = target.heroes[sourceHero.id];

    //Cannot find hero with same ID
    if (!targetHero) {
      //Attempt to find a hero with a matching name
      targetHero = Object.values(target.heroes).find(hero => isEqualInOneLocale(hero.name, sourceHero.name));
      if (targetHero)
        console.warn(`Hero ID mismatch: Expected to find ${sourceHero.id}, but matched with ${targetHero.id}`);
    }

    if (targetHero) {
      console.group('Merging', sourceHero.id);
      mergeHero(targetHero, sourceHero);
      console.groupEnd();
    }
    else {
      console.log('Added new hero:', sourceHero.name);
      target.heroes[sourceHero.id] = sourceHero;
    }
  }
};


/**
 * Merges data from source Hero object into the target Hero object.
 * @param {Hero} target Hero data to merge into
 * @param {Hero} source Hero data to merge from
 */
function mergeHero(target, source) {
  //Merge properties
  mergeProperties(target, source, {
    id: 0,
    name: 0,
    title: 0,
    type: 0,
    role: 0,
    universe: 0,
  });

  //Merge hero stats
  if (Array.isArray(source.stats)) {
    target.stats = source.stats.map((sourceUnitStats, sourceUnitIndex) =>
      mergeHeroStats(target.stats[sourceUnitIndex] || target.stats[0] || target.stats, sourceUnitStats));
  }
  else if (source.stats)
    target.stats = mergeHeroStats(target.stats[0] || target.stats, source.stats);

  //Merge skills
  source.skills.forEach((sourceSkill, sourceSkillIndex) => {
    //Find matching skill by index
    let targetSkill = target.skills[sourceSkillIndex];

    //If the corresponding target skill is not in the same index, search for the
    //target skill.
    if (!(targetSkill && isEqualInOneLocale(targetSkill.name, sourceSkill.name))) {
      const targetSkillIndex = target.skills.findIndex(skill => isEqualInOneLocale(skill.name, sourceSkill.name));

      if (targetSkillIndex !== -1) {
        console.warn(`Skill index mismatch: ${sourceSkill.name} was expected in [${sourceSkillIndex}], but found in [${targetSkillIndex}]`);
        targetSkill = target.skills[targetSkillIndex];
      }
      else {
        console.warn(`Skill not found: ${sourceSkill.name} in [${sourceSkillIndex}]`);
        return;
      }
    }

    mergeSkill(targetSkill, sourceSkill);
  });

  //Merge talents
  const sourceTalentEntries = Object.entries(source.talents);
  if (sourceTalentEntries.length) {
    const oldTalents = target.talents;
    const newTalents = target.talents = {};

    for (const [sourceTalentLevel, sourceTalentArray] of sourceTalentEntries) {
      const newTalentArray = newTalents[sourceTalentLevel] = [];

      sourceTalentArray.forEach((sourceTalent, sourceTalentIndex) => {
        //Find matching talent by level and index
        let targetTalent = (oldTalents[sourceTalentLevel] || [])[sourceTalentIndex];

        //If the corresponding target talent is not in the same level and index,
        //search for the target talent.
        if (!(targetTalent && isEqualInOneLocale(targetTalent.name, sourceTalent.name))) {
          let targetTalentIndex = -1, targetTalentLevel, targetTalentArray;
          for ([targetTalentLevel, targetTalentArray] of Object.entries(oldTalents)) {
            targetTalentIndex = targetTalentArray.findIndex(talent => isEqualInOneLocale(talent.name, sourceTalent.name));

            if (targetTalentIndex !== -1)
              break;
          }

          if (targetTalentIndex !== -1) {
            console.warn(`Talent position mismatch: ${sourceTalent.name} was expected in [${sourceTalentLevel}][${sourceTalentIndex}], but found in [${targetTalentLevel}][${targetTalentIndex}]`);
            targetTalent = targetTalentArray[targetTalentIndex];
          }
          else
            console.warn(`Talent not found: ${sourceTalent.name} in [${sourceTalentLevel}][${sourceTalentIndex}], creating new talent...`);
        }

        if (targetTalent)
          mergeSkill(targetTalent, sourceTalent);
        else
          targetTalent = sourceTalent;

        //Move talent to new position specified by source
        newTalentArray[sourceTalentIndex] = targetTalent;
      });
    }
  }
}


/**
 * Merges data from the source HeroStats object into the target HeroStats object.
 * @param {HeroStats} target HeroStats object to merge stat data into
 * @param {HeroStats} source HeroStats object to merge stat data from
 * @return {HeroStats} Merged HeroStats object
 */
function mergeHeroStats(target, source) {
  const scalingStatProperties = {
    hp: 0,
    hpRegen: 0,
    mp: 0,
    mpRegen: 0,
    healEnergy: 0,
    shields: 0,
  };

  for (const propertyName in scalingStatProperties) {
    mergeScalingStat(target[propertyName], source[propertyName]);
  }

  //HeroStats.prototype.damage can be either a ScalingStat or an array of ScalingStats
  if (Array.isArray(source.damage)) {
    target.damage = source.damage.map((d, index) =>
      mergeScalingStat(target.damage[index] || target.damage[0] || target.damage, d));
  }
  else
    target.damage = mergeScalingStat(target.damage[0] || target.damage, source.damage);

  return mergeProperties(target, source, {
    unitName: 0,
    charge: 0,
    chargeRegen: 0,
    energy: 0,
    fury: 0,
    zaryaEnergy: 0,
    ammo: 0,
    brew: 0,
    radius: 0,
    speed: 0,
    damage: 0,
    range: 0,
    period: 0,
  });
}


/**
 * Merges data from the source Skill object into the target Skill object.
 * @param {Skill} target Skill object to merge into
 * @param {Skill} source Skill object to merge from
 * @return {Skill} Merged Skill object
 */
function mergeSkill(target, source) {
  //Merge skill and talent names
  mergeProperties(target.name, source.name, { ko: 0, en: 0 });

  return mergeProperties(target, source, {
    description: 0,
    shortDescription: 0,
  });
}


/**
 * Merges data from the source ScalingStat object into the target ScalingStat object.
 * @param {ScalingStat} target ScalingStat object to merge into
 * @param {ScalingStat} source ScalingStat object to merge from
 * @return {ScalingStat} Merged ScalingStat object
 */
function mergeScalingStat(target, source) {
  return mergeProperties(target, source, {
    value: 0,
    levelAdd: 0,
    levelScaling: 0,
    altName: 0,
  });
}


/**
 * Copies properties specified in `propertyNames` from the source object to the
 * target object. If a property's value is a non-null falsy value, it is not
 * copied.
 * @param {Object<string, *>} target Target object to copy properties into
 * @param {Object<string, *>} source Source object to copy properties from
 * @param {{ [propertyName: string]: * }} propertyNames Object whose keys are property names to copy. Values are
 * ignored.
 * @return {Object<string, *>} The merged target object.
 */
function mergeProperties(target, source, propertyNames) {
  for (const property in propertyNames)
    if (source[property] || source[property] === null)
      target[property] = source[property];

  return target;
}


/**
 * Checks if two KoEnStrings have either equal Korean or equal English values.
 * Empty strings (`''`) are treated as non-equal.
 * @param {KoEnString} str1
 * @param {KoEnString} str2
 */
function isEqualInOneLocale(str1, str2) {
  return (str1.ko && str1.ko === str2.ko) || (str1.en && str1.en === str2.en);
}