/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */
/*tslint:disable:no-use-before-declare*/

import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Disallows dtslint $ExpectType and $ExpectError expectations if the $ is missing.",
        options: null,
        optionsDescription: "Not configurable.",
        requiresTypeInfo: false,
        ruleName: "no-missing-dollar-expect",
        type: "functionality",
        typescriptOnly: false
    };

    public static FAILURE_STRING = "Missing $";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}

class Walker extends Lint.RuleWalker {

    public walk(sourceFile: ts.SourceFile): void {
        const text = sourceFile.getText();
        const regExp = /\/\/\s+Expect(Type|Error)/g;
        let result: RegExpExecArray;
        /*tslint:disable:no-conditional-assignment*/
        while (result = regExp.exec(text)) {
            this.addFailureFromStartToEnd(
                result.index,
                result.index + result[0].length,
                Rule.FAILURE_STRING
            );
        }
        /*tslint:enable:no-conditional-assignment*/
    }
}
