/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import { Rule as NoDtslintTypoRule } from "./noDtslintTypoRule";

export class Rule extends NoDtslintTypoRule {
  public static metadata: Lint.IRuleMetadata = {
    deprecationMessage: "Use the no-dtslint-typo rule instead.",
    description:
      "Disallows dtslint $ExpectType and $ExpectError expectations if the $ is missing.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: false,
    ruleName: "no-missing-dollar-expect",
    type: "functionality",
    typescriptOnly: false,
  };
}
