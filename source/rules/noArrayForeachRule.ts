/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";
import { couldBeType } from "../support";

const mutatorRegExp = /^(fill|reverse|sort|splice)$/;
const creatorRegExp = /^(concat|entries|filter|keys|map|slice|values)$/;

export class Rule extends Lint.Rules.TypedRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Forbids calling forEach on arrays.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: true,
    ruleName: "no-array-foreach",
    type: "functionality",
    typescriptOnly: true,
  };

  public static FAILURE_STRING = "Calling forEach on arrays is forbidden";

  public applyWithProgram(
    sourceFile: ts.SourceFile,
    program: ts.Program
  ): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];
    const typeChecker = program.getTypeChecker();

    const callExpressions = tsquery(
      sourceFile,
      `CallExpression[expression.name.text='forEach']`
    ) as ts.CallExpression[];
    callExpressions.forEach((callExpression: ts.CallExpression) => {
      const callee = callExpression.expression;
      if (!ts.isPropertyAccessExpression(callee)) {
        return;
      }
      const { expression: object, name: property } = callee;
      const type = typeChecker.getTypeAtLocation(object);
      if (!couldBeType(type, "Array")) {
        return;
      }
      failures.push(
        new Lint.RuleFailure(
          sourceFile,
          property.getStart(),
          property.getStart() + property.getWidth(),
          Rule.FAILURE_STRING,
          this.ruleName
        )
      );
    });
    return failures;
  }
}
