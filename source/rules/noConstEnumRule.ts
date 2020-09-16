/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as tsutils from "tsutils";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Disallows the use of const enums.",
    options: {
      properties: {
        allowLocal: { type: "boolean" },
      },
      type: "object",
    },
    optionsDescription: Lint.Utils.dedent`
      An optional object with an optional \`allowLocal\` property - which defaults to \`false\`.
      If \`allowLocal\` is \`true\`, only exported const enums are forbidden.`,
    requiresTypeInfo: false,
    ruleName: "no-const-enum",
    type: "functionality",
    typescriptOnly: true,
  };

  public static FAILURE_STRING = "const enum is forbidden";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const { ruleArguments } = this.getOptions();
    const [options] = ruleArguments;
    const allowLocal = options ? options.allowLocal : false;
    const failures: Lint.RuleFailure[] = [];
    const constKeywords = tsquery(sourceFile, "EnumDeclaration > ConstKeyword");
    constKeywords.forEach((node: ts.Node) => {
      const enumDeclaration = node.parent as ts.EnumDeclaration;
      if (
        allowLocal &&
        !tsutils.hasModifier(
          enumDeclaration.modifiers,
          ts.SyntaxKind.ExportKeyword
        )
      ) {
        return;
      }
      failures.push(
        new Lint.RuleFailure(
          sourceFile,
          enumDeclaration.getStart(),
          enumDeclaration.getStart() + enumDeclaration.getWidth(),
          Rule.FAILURE_STRING,
          this.ruleName
        )
      );
    });
    return failures;
  }
}
