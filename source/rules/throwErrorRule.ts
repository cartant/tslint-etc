/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */
/*tslint:disable:no-use-before-declare*/

import * as Lint from "tslint";
import * as ts from "typescript";
import * as tsutils from "tsutils";

import { couldBeType } from "../support/util";

export class Rule extends Lint.Rules.TypedRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Enforces the use of `Error` values when throwing or rejecting.",
        options: null,
        optionsDescription: "Not configurable.",
        requiresTypeInfo: true,
        ruleName: "throw-error",
        type: "functionality",
        typescriptOnly: true
    };

    public static FAILURE_STRING = "Throwing non-Error values is forbidden";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {

        return this.applyWithWalker(new Walker(sourceFile, this.getOptions(), program));
    }
}

export class Walker extends Lint.ProgramAwareRuleWalker {

    private _callbacks = new Map<ts.Node, boolean>();
    private _rejects = new Map<ts.Node, boolean>();

    protected visitArrowFunction(node: ts.ArrowFunction): void {

        let reject: ts.Node | undefined = undefined;

        if (this._callbacks.has(node)) {
            [, reject] = node.parameters;
        }

        if (reject) {
            this._rejects.set(reject, true);
        }
        super.visitArrowFunction(node);

        if (reject) {
            this._rejects.delete(reject);
        }
    }

    protected visitCallExpression(node: ts.CallExpression): void {

        const { arguments: [argument], expression } = node;
        const typeChecker = this.getTypeChecker();

        if (tsutils.isPropertyAccessExpression(expression)) {

            const name = expression.name.getText();
            const type = typeChecker.getTypeAtLocation(expression.expression);

            if ((name === "reject") && couldBePromise(type)) {
                if (!argument || !couldBeType(typeChecker.getTypeAtLocation(argument), "Error")) {
                    this.addFailureAtNode(node, Rule.FAILURE_STRING);
                }
            }
        } else if (tsutils.isIdentifier(expression)) {

            const symbol = typeChecker.getSymbolAtLocation(expression);
            const [declaration] = symbol.getDeclarations();

            if (this._rejects.has(declaration) && !couldBeType(typeChecker.getTypeAtLocation(argument), "Error")) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }

        super.visitCallExpression(node);
    }

    protected visitFunctionExpression(node: ts.FunctionExpression): void {

        let reject: ts.Node | undefined = undefined;

        if (this._callbacks.has(node)) {
            [, reject] = node.parameters;
        }

        if (reject) {
            this._rejects.set(reject, true);
        }
        super.visitFunctionExpression(node);

        if (reject) {
            this._rejects.delete(reject);
        }
    }

    protected visitNewExpression(node: ts.NewExpression): void {

        const typeChecker = this.getTypeChecker();
        const type = typeChecker.getTypeAtLocation(node.expression);

        let callback: ts.Node | undefined = undefined;
        if (couldBePromise(type)) {
            [callback] = node.arguments;
        }

        if (callback) {
            this._callbacks.set(callback, true);
        }
        super.visitNewExpression(node);

        if (callback) {
            this._callbacks.delete(callback);
        }
    }

    protected visitThrowStatement(node: ts.ThrowStatement): void {

        const typeChecker = this.getTypeChecker();
        const type = typeChecker.getTypeAtLocation(node.expression);

        if (!couldBeType(type, "Error")) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }

        super.visitThrowStatement(node);
    }
}

function couldBePromise(type: ts.Type): boolean {
    return couldBeType(type, /^Promise/);
}
