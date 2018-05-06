/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */
/*tslint:disable:no-use-before-declare*/

import * as Lint from "tslint";
import * as ts from "typescript";
import * as tsutils from "tsutils";

export class Rule extends Lint.Rules.TypedRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Disallows used declarations.",
        options: null,
        optionsDescription: "Not configurable.",
        requiresTypeInfo: true,
        ruleName: "no-unused-declaration",
        type: "functionality",
        typescriptOnly: true
    };

    public static FAILURE_STRING = "Unused declarations are forbidden";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {

        return this.applyWithWalker(new Walker(sourceFile, this.getOptions(), program));
    }
}

export class Walker extends Lint.ProgramAwareRuleWalker {

    private _identifiers = new Map<ts.Node, boolean>();
    private _names = new Set<string>();

    protected onSourceFileEnd(): void {

        const { _identifiers } = this;
        _identifiers.forEach((used, identifier) => {
            if (!used) {
                this.addFailureAtNode(identifier, Rule.FAILURE_STRING);
            }
        });
    }

    protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {

        const { name } = node;
        if (name && !tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            const { _identifiers, _names } = this;
            _identifiers.set(name, false);
            _names.add(name.getText());
        }
        super.visitFunctionDeclaration(node);
    }

    protected visitIdentifier(node: ts.Identifier): void {

        const { _identifiers, _names } = this;
        const isDeclaration = _identifiers.has(node);
        const isExpected = _names.has(node.getText());
        if (!isDeclaration && isExpected) {

            const typeChecker = this.getTypeChecker();
            const symbol = typeChecker.getSymbolAtLocation(node);
            const [declaration] = symbol.getDeclarations();

            const identifier = getIdentifier(declaration);
            const isEnforced = _identifiers.has(identifier);
            if (isEnforced) {
                _identifiers.set(identifier, true);
            }
        }
        super.visitIdentifier(node);
    }

    protected visitNamedImports(node: ts.NamedImports): void {

        const { _identifiers, _names } = this;
        node.elements.forEach(element => {
            const { name, propertyName } = element;
            if (propertyName) {
                _identifiers.set(propertyName, true);
            }
            _identifiers.set(name, false);
            _names.add(name.getText());
        });
        super.visitNamedImports(node);
    }

    protected visitNamespaceImport(node: ts.NamespaceImport): void {

        const { _identifiers, _names } = this;
        const { name } = node;
        _identifiers.set(name, false);
        _names.add(name.getText());
        super.visitNamespaceImport(node);
    }

    protected visitNode(node: ts.Node): void {

        super.visitNode(node);

        if (tsutils.isSourceFile(node)) {
            this.onSourceFileEnd();
        }
    }

    protected visitVariableStatement(node: ts.VariableStatement): void {

        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            const { _identifiers, _names } = this;
            tsutils.forEachDeclaredVariable(node.declarationList, declaration => {
                const { name } = declaration;
                _identifiers.set(name, false);
                _names.add(name.getText());
            });
        }
        super.visitVariableStatement(node);
    }
}

function getIdentifier(node: ts.Declaration): ts.Identifier {

    return node["name"];
}
