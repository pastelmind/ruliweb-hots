/**
 * @file Provides tools for merging two HotsData objects.
 */

import { _t, isNotNullish } from "../../scripts/type-util.js";

import { assert, equal } from "./lazy-assert.js";

/**
 * @typedef {import("../../generated-types/hots").Hero} Hero
 * @typedef {import("../../generated-types/hots").RuliwebHotSDataset} RuliwebHotSDataset
 * @typedef {import("../../generated-types/hots").Skill} Skill
 * @typedef {import("../../generated-types/hots").Talent} Talent
 */

/**
 * @template T
 * @typedef {Record<string, T[]>} TalentRecord
 */

/**
 * @template T
 * @typedef {Readonly<Record<string, ReadonlyArray<T>>>} ReadonlyTalentRecord
 */

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * Creates a new dataset by merging the source dataset into the target dataset.
 * The new dataset may share descendant objects of the source and target
 * datasets.
 *
 * - Heroes that exist only in `source` are added to `target` without cloning.
 * - Heroes that exist only in `target` are excluded.
 * @param {Readonly<RuliwebHotSDataset>} target
 * @param {Partial<Readonly<RuliwebHotSDataset>>} source
 * @return {RuliwebHotSDataset}
 */
export function createMergedHotsData(target, source) {
  /** @type {Record<string, Hero>} */
  const newHeroes = {};
  const targetHeroIds = new Set(Object.keys(target.heroes));

  assert(source.heroes, "Source hero record is empty: %o", source.heroes);
  for (const heroId of Object.keys(source.heroes).sort()) {
    const sourceHero = source.heroes[heroId];

    if (targetHeroIds.has(heroId)) {
      const targetHero = target.heroes[heroId];
      assert(targetHero, "Unexpected value of hero %o: %o", heroId, targetHero);
      newHeroes[heroId] = createMergedHero(targetHero, sourceHero, heroId);
    } else {
      newHeroes[heroId] = sourceHero;
    }
  }

  assert(
    !source.ptrHeroes,
    "Source has ptrHeroes. We don't support ptrHeroes yet!"
  );
  assert(
    !target.ptrHeroes,
    "Target has ptrHeroes. We don't support ptrHeroes yet!"
  );
  assert(
    !source.hotsPtrVersion,
    "Source has hotsPtrVersion. We don't support hotsPtrVersion yet!"
  );
  assert(
    !target.hotsPtrVersion,
    "Target has hotsPtrVersion. We don't support hotsPtrVersion yet!"
  );

  /** @type {Record<string, string>} */
  const newIconUrls = {};
  const { iconUrls: sourceIconUrls = {} } = source;
  const { iconUrls: targetIconUrls } = target;
  for (const iconId of [
    ...Object.keys(sourceIconUrls),
    ...Object.keys(targetIconUrls),
  ]) {
    newIconUrls[iconId] = sourceIconUrls[iconId] || targetIconUrls[iconId];
  }

  return {
    hotsVersion: source.hotsVersion || target.hotsVersion,
    heroes: newHeroes,
    iconUrls: newIconUrls,
  };
}

/**
 * Creates a new hero by merging the data of `source` and `target` heroes.
 * @param {Readonly<Hero>} target
 * @param {Readonly<Hero>} source
 * @param {string} heroId Hero ID used for debugging messages
 * @return {Hero}
 */
function createMergedHero(target, source, heroId) {
  equal(
    target.name,
    source.name,
    "[%] Hero names differ. Are we really merging the same hero?",
    heroId
  );

  // Most properties (including stats) can be simply copied over from source
  const result = { ...source };
  // But skills and talents must be merged separately
  result.skills = createMergedSkillArray(target.skills, source.skills, heroId);
  result.talents = createMergedTalentRecord(
    target.talents,
    source.talents,
    heroId
  );

  return result;
}

/**
 * Merges each new skill into an old skill, and returns a new array of merged
 * skills.
 *
 * Some rules:
 * - The result array contains skills in the same order as `newSkills`.
 * - Merging creates a new skill object.
 * - If a new skill does not have an old version, it is added in the result
 *   array as-is.
 * - If an old skill does not have a new version, it is not included in the
 *   result array.
 * @param {ReadonlyArray<Skill>} oldSkills
 * @param {ReadonlyArray<Readonly<Skill>>} newSkills
 * @param {string} heroId Hero ID used in debugging messages
 * @return {Skill[]}
 */
function createMergedSkillArray(oldSkills, newSkills, heroId) {
  assertNoDuplicateSkills(oldSkills, heroId);
  assertNoDuplicateSkills(newSkills, heroId);

  /** @type {ReadonlyMap<string, number>} */
  const oldSkillIndices = new Map(
    oldSkills.map((skill, index) => [skill.id, index])
  );
  const unmergedOldSkillIds = new Set(oldSkills.map((skill) => skill.id));

  const mergedSkills = newSkills.map((sourceSkill, newIndex) => {
    const oldIndex = oldSkillIndices.get(sourceSkill.id);

    if (typeof oldIndex === "undefined") {
      console.log("[%s] Added new skill %o", heroId, sourceSkill.id);
      return sourceSkill;
    }

    if (oldIndex !== newIndex) {
      console.log(
        "[%s] Moved skill %o: index %d -> %d",
        heroId,
        sourceSkill.id,
        oldIndex,
        newIndex
      );
    }

    assert(
      unmergedOldSkillIds.delete(sourceSkill.id),
      "Skill %o of hero %o is merged twice",
      sourceSkill.id,
      heroId
    );

    const targetSkill = oldSkills[oldIndex];
    return createMergedSkill(targetSkill, sourceSkill);
  });

  for (const skillId of unmergedOldSkillIds) {
    console.log("[%s] Deleted skill %o", heroId, skillId);
  }

  return mergedSkills;
}

/**
 * @param {ReadonlyArray<Readonly<Skill>>} skills
 * @param {string} heroId Hero ID used for debugging
 * @throws If two skills have the same `id`
 */
function assertNoDuplicateSkills(skills, heroId) {
  const skillIdsSeen = new Set();
  for (const skill of skills) {
    // If the skill ID is already in the set, add() will not change its size
    assert(
      skillIdsSeen.size !== skillIdsSeen.add(skill.id).size,
      "Duplicate skill ID %o in hero %o",
      skill.id,
      heroId
    );
  }
}

/**
 * Creates a new skill by merging the data of `source` and `target` skills.
 * @param {Readonly<Skill>} target
 * @param {Readonly<Skill>} source
 * @return {Skill}
 */
function createMergedSkill(target, source) {
  // Use all source fields except 'extras'
  const { extras: sourceExtras, upgradeFor, ...result } = source;
  // Merge the 'extras' object of target and source
  const extras = { ...target.extras, ...sourceExtras };

  if (Object.keys(extras).length > 0) {
    // Type assertion needed to make TypeScript happy
    /** @type {Skill} */ (result).extras = extras;
  }

  // Ensure that upgradeFor, if it exists, is the last field.
  if (isNotNullish(upgradeFor)) {
    // Type assertion needed to make TypeScript happy
    /** @type {Skill} */ (result).upgradeFor = upgradeFor;
  }

  if (target.type !== source.type) {
    console.log(
      "Talent %o type changed: %o -> %o",
      source.id,
      target.type,
      source.type
    );
  }
  if (target.upgradeFor !== source.upgradeFor) {
    console.log(
      "Talent %o upgradeFor changed: %o -> %o",
      source.id,
      target.upgradeFor,
      source.upgradeFor
    );
  }

  return result;
}

/**
 * Creates a record of talents by merging two existing talent records.
 *
 * Some rules:
 * - The result record matches the talent tiers and ordering of `newTalents`.
 * - Merging creates a new talent object.
 * - If a new talent does not have an old version, it is added in the result
 *   array as-is.
 * - If an old talent does not have a new version, it is not included in the
 *   result array.
 * @param {ReadonlyTalentRecord<Talent>} oldTalents
 * @param {ReadonlyTalentRecord<Readonly<Talent>>} newTalents
 * @param {string} heroId Hero ID used in debugging messages
 * @return {TalentRecord<Talent>}
 */
function createMergedTalentRecord(oldTalents, newTalents, heroId) {
  assertNoDuplicateTalents(oldTalents, heroId);
  assertNoDuplicateTalents(newTalents, heroId);

  const unmergedOldTalentIds = new Map(
    Object.entries(oldTalents).flatMap(([tier, talentArray]) =>
      talentArray.map((talent, index) => _t(talent.id, _t(tier, index)))
    )
  );

  /** @type {TalentRecord<Talent>} */
  const resultRecord = {};

  for (const [newTierName, newTalentArray] of Object.entries(newTalents)) {
    resultRecord[newTierName] = newTalentArray.map((sourceTalent, newIndex) => {
      const {
        talent: targetTalent,
        tier: oldTierName,
        index: oldIndex,
      } = findTalent(oldTalents, sourceTalent.id, newTierName, newIndex);

      if (!targetTalent) {
        console.log(
          "[%s] Added new talent %o at [%o][%o]",
          heroId,
          sourceTalent.id,
          newTierName,
          newIndex
        );
        return sourceTalent;
      }

      if (oldTierName !== newTierName || oldIndex !== newIndex) {
        console.log(
          "[%s] Moved talent %o: [%o][%o] -> [%o][%o]",
          heroId,
          sourceTalent.id,
          oldTierName,
          oldIndex,
          newTierName,
          newIndex
        );
      }

      assert(
        unmergedOldTalentIds.delete(sourceTalent.id),
        "Talent %o of hero %o is merged twice",
        sourceTalent.id,
        heroId
      );

      return createMergedTalent(targetTalent, sourceTalent);
    });
  }

  for (const [talentId, [tierName, index]] of unmergedOldTalentIds) {
    console.log(
      "[%s] Deleted talent %o, was at [%o][%o]",
      heroId,
      talentId,
      tierName,
      index
    );
  }

  return resultRecord;
}

/**
 * @param {ReadonlyTalentRecord<Readonly<Talent>>} talents
 * @param {string} heroId Hero ID used for debugging
 * @throws If two talents have the same `id`
 */
function assertNoDuplicateTalents(talents, heroId) {
  const talentIdsSeen = new Set();
  for (const talentArray of Object.values(talents)) {
    for (const talent of talentArray) {
      // If the talent ID is already in the set, add() will not change its size
      assert(
        talentIdsSeen.size !== talentIdsSeen.add(talent.id).size,
        "Duplicate talent ID %o in hero %o",
        talent.id,
        heroId
      );
    }
  }
}

/**
 * Attempts to search for the talent ID
 * @template {Talent} T
 * @param {ReadonlyTalentRecord<T>} talents
 * @param {string} id Talent ID to search for
 * @param {string} expectedTierName
 * @param {number} expectedIndex
 * @return {{ talent: (T | undefined), tier: (string | undefined), index: (number | undefined) }}
 *    If the talent is found, returns an object containing the talent's tier and
 *    index. If the talent cannot be found, all values will be `undefined`.
 */
function findTalent(talents, id, expectedTierName, expectedIndex) {
  // Common case #1: talent stays in the same spot
  // First, check the expected talent tier and indices.
  const expectedTierArray = talents[expectedTierName];
  if (expectedTierArray) {
    const expectedTalent = expectedTierArray[expectedIndex];
    if (expectedTalent && expectedTalent.id === id) {
      return {
        talent: expectedTalent,
        tier: expectedTierName,
        index: expectedIndex,
      };
    }

    // Common case #2: talent is rearranged within the same tier
    for (const [index, talent] of expectedTierArray.entries()) {
      if (talent.id === id) {
        return { talent, tier: expectedTierName, index };
      }
    }
  }

  // Talent may have been moved to another tier.
  // Search entire record
  for (const talentArray of Object.values(talents)) {
    for (const [index, talent] of talentArray.entries()) {
      if (talent.id === id) {
        return { talent, tier: expectedTierName, index };
      }
    }
  }

  // Talent is not found
  return { talent: undefined, tier: undefined, index: undefined };
}

/**
 * Creates a new talent by merging the data of `source` and `target` talents.
 * @param {Readonly<Talent>} target
 * @param {Readonly<Talent>} source
 * @return {Talent}
 */
function createMergedTalent(target, source) {
  return createMergedSkill(target, source);
}
