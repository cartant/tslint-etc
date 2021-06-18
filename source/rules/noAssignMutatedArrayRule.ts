/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as tsutils from "tsutils";
import * as ts from "typescript";
import { couldBeType } from "../support";

const mutatorRegExp = /^(fill|reverse|sort)$/;
const creatorRegExp = /^(concat|entries|filter|keys|map|slice|splice|values)$/;

export class Rule extends Lint.Rules.TypedRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Disallows the assignment of returned, mutated arrays.",
    options: null,
    optionsDescription: "Not configurable.",
    requiresTypeInfo: true,
    ruleName: "no-assign-mutated-array",
    type: "functionality",
    typescriptOnly: true,
  };

  public static FAILURE_STRING = "Assignment of mutated arrays is forbidden";

  public applyWithProgram(
    sourceFile: ts.SourceFile,
    program: ts.Program
  ): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];
    const typeChecker = program.getTypeChecker();

    const identifiers = tsquery(
      sourceFile,
      `CallExpression PropertyAccessExpression Identifier[name=${mutatorRegExp.toString()}]`
    );
    identifiers.forEach((node: unknown) => {
      const identifier = node as ts.Identifier;
      const propertyAccessExpression =
        identifier.parent as ts.PropertyAccessExpression;
      const callExpression = identifier.parent.parent as ts.CallExpression;
      const parent = callExpression.parent;
      if (!tsutils.isExpressionStatement(parent)) {
        const type = typeChecker.getTypeAtLocation(
          propertyAccessExpression.expression
        );
        if (
          couldBeType(type, "Array") &&
          this.mutatesReferencedArray(callExpression)
        ) {
          failures.push(
            new Lint.RuleFailure(
              sourceFile,
              identifier.getStart(),
              identifier.getStart() + identifier.getWidth(),
              Rule.FAILURE_STRING,
              this.ruleName
            )
          );
        }
      }
    });
    return failures;
  }

  private isNewArray(expression: ts.LeftHandSideExpression): boolean {
    if (tsutils.isArrayLiteralExpression(expression)) {
      return true;
    }
    if (tsutils.isNewExpression(expression)) {
      return true;
    }
    if (tsutils.isCallExpression(expression)) {
      const callee = expression.expression;
      if (tsutils.isIdentifier(callee) && callee.text === "Array") {
        return true;
      }
      if (
        tsutils.isPropertyAccessExpression(callee) &&
        tsutils.isIdentifier(callee.expression) &&
        callee.expression.text === "Array"
      ) {
        return true;
      }
    }
    return false;
  }

  private mutatesReferencedArray(callExpression: ts.CallExpression): boolean {
    if (tsutils.isPropertyAccessExpression(callExpression.expression)) {
      const propertyAccessExpression = callExpression.expression;
      const { expression, name } = propertyAccessExpression;
      if (creatorRegExp.test(name.getText())) {
        return false;
      }
      if (this.isNewArray(expression)) {
        return false;
      }
      if (tsutils.isCallExpression(expression)) {
        return this.mutatesReferencedArray(expression);
      }
    }
    return true;
  }
}
