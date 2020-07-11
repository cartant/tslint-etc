/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-tslint-rules
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.TypedRule {
  public static metadata: Lint.IRuleMetadata = {
    deprecationMessage: undefined,
    description:
      "Disallows implicit `any` error parameters in promise rejections.",
    options: {
      properties: {
        allowExplicitAny: { type: "boolean" },
      },
      type: "object",
    },
    optionsDescription: Lint.Utils.dedent`
      An optional object with an optional \`allowExplicitAny\` property.`,
    requiresTypeInfo: true,
    ruleName: "no-implicit-any-catch",
    type: "functionality",
    typescriptOnly: true,
  };

  public static EXPLICIT_ANY = "Explicit any in promise rejection";
  public static IMPLICIT_ANY = "Implicit any in promise rejection";

  public applyWithProgram(
    sourceFile: ts.SourceFile,
    program: ts.Program
  ): Lint.RuleFailure[] {
    const {
      ruleArguments: [options],
    } = this.getOptions();
    const allowExplicitAny =
      options && options.hasOwnProperty("allowExplicitAny")
        ? options.allowExplicitAny
        : false;
    const failures: Lint.RuleFailure[] = [];

    const callExpressions = tsquery(
      sourceFile,
      `CallExpression[expression.name.text=/^(catch|then)$/]`
    ) as ts.CallExpression[];

    callExpressions.forEach((callExpression) => {
      const { expression } = callExpression;
      if (!ts.isPropertyAccessExpression(expression)) {
        return;
      }
      const arg =
        expression.name.text === "catch"
          ? callExpression.arguments[0]
          : callExpression.arguments[1];
      if (!arg) {
        return;
      }
      if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
        const [parameter] = arg.parameters;
        if (parameter.type) {
          if (
            parameter.type.kind === ts.SyntaxKind.AnyKeyword &&
            !allowExplicitAny
          ) {
            failures.push(
              new Lint.RuleFailure(
                sourceFile,
                parameter.getStart(),
                parameter.getStart() + parameter.getWidth(),
                Rule.EXPLICIT_ANY,
                this.ruleName,
                Lint.Replacement.replaceNode(parameter.type, "unknown")
              )
            );
          }
        } else {
          failures.push(
            new Lint.RuleFailure(
              sourceFile,
              parameter.getStart(),
              parameter.getStart() + parameter.getWidth(),
              Rule.IMPLICIT_ANY,
              this.ruleName,
              Lint.Replacement.appendText(
                parameter.getStart() + parameter.getWidth(),
                ": unknown"
              )
            )
          );
        }
      }
    });
    return failures;
  }
}
