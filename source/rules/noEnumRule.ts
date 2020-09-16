/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Disallows the use of enums.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: false,
    ruleName: "no-enum",
    type: "functionality",
    typescriptOnly: true,
  };

  public static FAILURE_STRING = "enum is forbidden";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];
    const enumDeclarations = tsquery(sourceFile, "EnumDeclaration");
    enumDeclarations.forEach((node: ts.Node) => {
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
