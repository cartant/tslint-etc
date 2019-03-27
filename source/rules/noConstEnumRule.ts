/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";

export class Rule extends Lint.Rules.TypedRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Disallows the use of const enums.",
        options: null,
        optionsDescription: "Not configurable.",
        requiresTypeInfo: false,
        ruleName: "no-const-enum",
        type: "functionality",
        typescriptOnly: true
    };

    public static FAILURE_STRING = "const enum is forbidden";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        const failures: Lint.RuleFailure[] = [];
        const constKeywords = tsquery(
            sourceFile,
            "EnumDeclaration > ConstKeyword"
        );
        constKeywords.forEach((node: ts.Node) => {
            const enumDeclaration = node.parent as ts.EnumDeclaration;
            failures.push(new Lint.RuleFailure(
                sourceFile,
                enumDeclaration.getStart(),
                enumDeclaration.getStart() + enumDeclaration.getWidth(),
                Rule.FAILURE_STRING,
                this.ruleName
            ));
        });
        return failures;
    }
}
