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
      "Disallows implicit `any` errors in catch clauses and promise rejections.",
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

  public static EXPLICIT_ANY = "Explicit any";
  public static IMPLICIT_ANY = "Implicit any";
  public static NARROWED = "Error type must be unknown or any";

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
        if (parameter) {
          this.checkErrorNode(
            sourceFile,
            failures,
            allowExplicitAny,
            parameter
          );
        }
      }
    });

    const catchClauses = tsquery(sourceFile, `CatchClause`) as ts.CatchClause[];
    catchClauses.forEach((catchClause) => {
      const { variableDeclaration } = catchClause;
      if (variableDeclaration) {
        this.checkErrorNode(
          sourceFile,
          failures,
          allowExplicitAny,
          variableDeclaration
        );
      }
    });

    return failures;
  }

  private checkErrorNode(
    sourceFile: ts.SourceFile,
    failures: Lint.RuleFailure[],
    allowExplicitAny: boolean,
    node: ts.ParameterDeclaration | ts.VariableDeclaration
  ): void {
    if (node.type) {
      if (node.type.kind === ts.SyntaxKind.AnyKeyword) {
        if (allowExplicitAny) {
          return;
        }
        failures.push(
          new Lint.RuleFailure(
            sourceFile,
            node.getStart(),
            node.getStart() + node.getWidth(),
            Rule.EXPLICIT_ANY,
            this.ruleName,
            Lint.Replacement.replaceNode(node.type, "unknown")
          )
        );
      } else if (node.type.kind !== ts.SyntaxKind.UnknownKeyword) {
        failures.push(
          new Lint.RuleFailure(
            sourceFile,
            node.getStart(),
            node.getStart() + node.getWidth(),
            Rule.NARROWED,
            this.ruleName
          )
        );
      }
    } else {
      failures.push(
        new Lint.RuleFailure(
          sourceFile,
          node.getStart(),
          node.getStart() + node.getWidth(),
          Rule.IMPLICIT_ANY,
          this.ruleName,
          Lint.Replacement.appendText(
            node.getStart() + node.getWidth(),
            ": unknown"
          )
        )
      );
    }
  }
}
