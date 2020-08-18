/**
 * @file Provides validators for JSON data.
 */

import Ajv from "ajv";

/**
 * @typedef {import("../../generated-types/hdp-herodata-ko").HdpHeroDataKo} HdpHeroDataKo
 * @typedef {import("../../generated-types/hdp-herodata").HdpHeroData} HdpHeroData
 * @typedef {import("../../generated-types/hots").RuliwebHotSDataset} RuliwebHotSDataset
 * @typedef {import("../../scripts/schemas.js").HdpHeroDataKoSchema} HdpHeroDataKoSchema
 * @typedef {import("../../scripts/schemas.js").HdpHeroDataSchema} HdpHeroDataSchema
 * @typedef {import("../../scripts/schemas.js").HotsSchema} HotsSchema
 */

/**
 * Factory class that creates validators from JSON schemas.
 * @example
 *    const vf = new ValidatorFactory();
 *    const validator = vf.createHotsValidator(hotsSchema);
 *
 *    if (!validator.validate(myData)) {
 *      throw validator.errors();
 *    }
 */
export class ValidatorFactory {
  /** Creates a ValidatorFactory. */
  constructor() {
    /** @private */
    this.ajv_ = new Ajv({ multipleOfPrecision: 5 });
  }

  /**
   * Creates a validator function for `hots.json`.
   * @param {HotsSchema} schema Schema for `hots.json`
   * @return {Validator<RuliwebHotSDataset>}
   */
  createHotsValidator(schema) {
    return new Validator(this.ajv_, schema);
  }

  /**
   * Creates a validator function for `herodata_*_enus.json`.
   * @param {HdpHeroDataSchema} schema Schema for `herodata_*_enus.json`
   * @return {Validator<HdpHeroData>}
   */
  createHdpHeroDataValidator(schema) {
    return new Validator(this.ajv_, schema);
  }

  /**
   * Creates a validator function for `herodata_*_kokr.json`.
   * @param {HdpHeroDataKoSchema} schema Schema for `herodata_*_kokr.json`
   * @return {Validator<HdpHeroDataKo>}
   */
  createHdpHeroDataKoValidator(schema) {
    return new Validator(this.ajv_, schema);
  }
}

/**
 * Generic validator class
 * @template T
 */
class Validator {
  /**
   * Creates a validator that validates T
   * @param {InstanceType<Ajv>} ajv
   * @param {any} schema
   */
  constructor(ajv, schema) {
    /** @private */
    this.validator_ = ajv.compile(schema);
  }

  // Due to limitations in TypeScript's control flow analysis, we cannot use the
  // "asserts data is T" return type without explicitly annotating the type of
  // the Validator instance object.
  // Since manually specifying a type is cumbersome, we choose to use the
  // "data is T" form instead, which does not have such restrictions.
  // eslint-disable-next-line valid-jsdoc -- TypeScript syntax
  /**
   * @param {any} data
   * @return {data is T}
   */
  validate(data) {
    return Boolean(this.validator_(data));
  }

  /**
   * Returns the results of the most recent validation error.
   * @return {any}
   */
  errors() {
    return this.validator_.errors;
  }
}
