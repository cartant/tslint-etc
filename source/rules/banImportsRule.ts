/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */
/*tslint:disable:no-use-before-declare*/

import * as Lint from "tslint";
import * as ts from "typescript";
import * as tsutils from "tsutils";

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Disallows the use of banned imports.",
        options: {
            "type": "object"
        },
        optionsDescription: Lint.Utils.dedent`
            An object containing keys that are regular expressions
            and values that are either booleans or strings containing the explanation for the ban.`,
        requiresTypeInfo: false,
        ruleName: "ban-imports",
        type: "functionality",
        typescriptOnly: false
    };

    public static FAILURE_STRING = "Import is banned";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {

        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}

class Walker extends Lint.RuleWalker {

    private _bans: { explanation: string, regExp: RegExp }[] = [];

    constructor(sourceFile: ts.SourceFile, rawOptions: Lint.IOptions) {

        super(sourceFile, rawOptions);

        const [options] = this.getOptions();
        if (options) {
            Object.entries(options).forEach(([key, value]) => {
                if (value !== false) {
                    this._bans.push({
                        explanation: (typeof value === "string") ? value : "",
                        regExp: new RegExp(key)
                    });
                }
            });
        }
    }

    public visitImportDeclaration(node: ts.ImportDeclaration): void {

        const { _bans } = this;
        const moduleSpecifier = node.moduleSpecifier.getText().replace(/['"]/g, "");

        for (let b = 0, length = _bans.length; b < length; ++b) {
            const ban = _bans[b];
            if (ban.regExp.test(moduleSpecifier)) {
                const explanation = ban.explanation ? `: ${ban.explanation}` : "";
                const failure = `${Rule.FAILURE_STRING}: '${moduleSpecifier}' matches ${ban.regExp.toString()}${explanation}`;
                this.addFailureAtNode(node.moduleSpecifier, failure);
            }
        }
        super.visitImportDeclaration(node);
    }
}
