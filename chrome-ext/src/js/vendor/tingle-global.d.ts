/** @file Type definitions for the vendored "tingle.js" as a global module. */

// Based on https://github.com/microsoft/TypeScript/issues/10178#issuecomment-263787616
import * as __tingle from "tingle.js";
declare global {
  var tingle: typeof __tingle;
}
