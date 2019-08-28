/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Disallows single-character type parameters.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: false,
    ruleName: "no-t",
    type: "style",
    typescriptOnly: true
  };

  public static FAILURE_STRING =
    "Single-character type parameters are forbidden";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];
    const identifiers = tsquery(
      sourceFile,
      "TypeParameter > Identifier[name=/^.$/]"
    );
    identifiers.forEach((node: ts.Node) => {
      failures.push(
        new Lint.RuleFailure(
          sourceFile,
          node.getStart(),
          node.getStart() + node.getWidth(),
          Rule.FAILURE_STRING,
          this.ruleName
        )
      );
    });
    return failures;
  }
}
