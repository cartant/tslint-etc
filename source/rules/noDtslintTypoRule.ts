/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import * as tsutils from "tsutils";
import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    description:
      "Disallows dtslint expectations that have typographical errors.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: false,
    ruleName: "no-dtslint-typo",
    type: "functionality",
    typescriptOnly: true
  };

  public static FAILURE_STRING = "Typo in dtslint expectation";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];

    const statements = tsquery(
      sourceFile,
      `CallExpression[expression.text="it"] ExpressionStatement, CallExpression[expression.text="it"] VariableStatement`
    ) as (ts.ExpressionStatement | ts.VariableStatement)[];
    statements.forEach(statement => {
      const index = sourceFile.text.indexOf("\n", statement.end);
      if (index !== -1) {
        const trailing = sourceFile.text.substring(statement.end, index);
        const match = trailing.match(/\s*\/\/\s*(.+)$/);
        if (match) {
          const [, expectation] = match;
          const pos = statement.end + trailing.indexOf(expectation);
          const end = pos + expectation.length;
          if (/^(\$\s)?Expect/.test(expectation)) {
            failures.push(
              new Lint.RuleFailure(
                sourceFile,
                pos,
                end,
                Rule.FAILURE_STRING,
                this.ruleName
              )
            );
            return;
          }
          if (
            !/^\$Expect(Type\s*|Error\s*$|Deprecation\s*$|NoDeprecation\s*$)/.test(
              expectation
            )
          ) {
            failures.push(
              new Lint.RuleFailure(
                sourceFile,
                pos,
                end,
                Rule.FAILURE_STRING,
                this.ruleName
              )
            );
            return;
          }
          if (
            /^\$ExpectType/.test(expectation) &&
            !/^\$ExpectType\s+[\(\w)_]/.test(expectation)
          ) {
            failures.push(
              new Lint.RuleFailure(
                sourceFile,
                pos,
                end,
                Rule.FAILURE_STRING,
                this.ruleName
              )
            );
            return;
          }
        }
      }
    });
    return failures;
  }
}
