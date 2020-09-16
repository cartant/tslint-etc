/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { tsquery } from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    description: "Disallows single-character type parameters.",
    options: {
      properties: {
        prefix: { type: "string" },
      },
      type: "object",
    },
    optionsDescription: Lint.Utils.dedent`
      An optional object with an optional \`prefix\` property.
      If a \`prefix\` is specified, type parameters without the prefix are forbidden.`,
    requiresTypeInfo: false,
    ruleName: "no-t",
    type: "style",
    typescriptOnly: true,
  };

  public static FAILURE_STRING =
    "Single-character type parameters are forbidden";

  /*tslint:disable:semicolon*/
  public static FAILURE_MESSAGE_PREFIX = (name: string, prefix: string) =>
    `Type parameter '${name}' does not have prefix '${prefix}'`;
  /*tslint:enable:semicolon*/

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const failures: Lint.RuleFailure[] = [];

    const identifiers = tsquery(
      sourceFile,
      "TypeParameter > Identifier[name=/^.$/]"
    ) as ts.Identifier[];
    identifiers.forEach((identifier) => {
      failures.push(
        new Lint.RuleFailure(
          sourceFile,
          identifier.getStart(),
          identifier.getStart() + identifier.getWidth(),
          Rule.FAILURE_STRING,
          this.ruleName
        )
      );
    });

    const { ruleArguments } = this.getOptions();
    const [options = {}] = ruleArguments;
    const { prefix } = options;
    if (prefix) {
      const identifiers = tsquery(
        sourceFile,
        "TypeParameter > Identifier[name=/^.{2,}$/]"
      ) as ts.Identifier[];
      identifiers.forEach((identifier) => {
        const { text } = identifier;
        if (text.indexOf(prefix) !== 0) {
          failures.push(
            new Lint.RuleFailure(
              sourceFile,
              identifier.getStart(),
              identifier.getStart() + identifier.getWidth(),
              Rule.FAILURE_MESSAGE_PREFIX(text, prefix),
              this.ruleName
            )
          );
        }
      });
    }
    return failures;
  }
}
