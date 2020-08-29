// Workaround for incorrect typing in @types/should-sinon
// TODO: Remove this file when the following PR is merged:
//    https://github.com/DefinitelyTyped/DefinitelyTyped/pull/47124

import { ShouldSinonAssertion } from "should-sinon";

declare module "sinon" {
  interface SinonSpyCallApi {
    should: ShouldSinonAssertion;
  }
}
