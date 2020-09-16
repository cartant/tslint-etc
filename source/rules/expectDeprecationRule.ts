/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as ts from "typescript";
import { getDeprecation } from "../support";

export class Rule extends Lint.Rules.TypedRule {
  public static metadata: Lint.IRuleMetadata = {
    description:
      "Asserts deprecations with $ExpectDeprecation and $ExpectNoDeprecation.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: true,
    ruleName: "expect-deprecation",
    type: "functionality",
    typescriptOnly: true,
  };

  public applyWithProgram(
    sourceFile: ts.SourceFile,
    program: ts.Program
  ): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];
    const typeChecker = program.getTypeChecker();

    const statements = tsquery(
      sourceFile,
      `CallExpression[expression.text="it"] ExpressionStatement, CallExpression[expression.text="it"] VariableStatement`
    ) as (ts.ExpressionStatement | ts.VariableStatement)[];
    statements.forEach((statement) => {
      const index = sourceFile.text.indexOf("\n", statement.end);
      if (index !== -1) {
        const trailing = sourceFile.text.substring(statement.end, index);
        const match = trailing.match(
          /^\s*\/\/\s*(\$ExpectDeprecation|\$ExpectNoDeprecation)\s*$/
        );
        if (match) {
          const idendtifers = tsquery(
            statement,
            "Identifier"
          ) as ts.Identifier[];
          const found = idendtifers.some(
            (idendtifer) =>
              getDeprecation(idendtifer, typeChecker) !== undefined
          );
          const [, expectation] = match;
          const pos = statement.end + trailing.indexOf(expectation);
          const end = pos + expectation.length;
          if (expectation === "$ExpectDeprecation") {
            if (!found) {
              failures.push(
                new Lint.RuleFailure(
                  sourceFile,
                  pos,
                  end,
                  "No deprecation found",
                  this.ruleName
                )
              );
            }
          } else {
            if (found) {
              failures.push(
                new Lint.RuleFailure(
                  sourceFile,
                  pos,
                  end,
                  "Deprecation found",
                  this.ruleName
                )
              );
            }
          }
        }
      }
    });
    return failures;
  }
}
