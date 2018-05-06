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

    private _declarationsByIdentifier = new Map<ts.Node, ts.Declaration>();
    private _usageByIdentifier = new Map<ts.Node, boolean>();

    protected visitClassDeclaration(node: ts.ClassDeclaration): void {

        const { name } = node;
        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            const { _declarationsByIdentifier, _usageByIdentifier } = this;
            _declarationsByIdentifier.set(name, node);
            _usageByIdentifier.set(name, false);
        }
        super.visitClassDeclaration(node);
    }

    protected visitEnumDeclaration(node: ts.EnumDeclaration): void {

        const { name } = node;
        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            const { _declarationsByIdentifier, _usageByIdentifier } = this;
            _declarationsByIdentifier.set(name, node);
            _usageByIdentifier.set(name, false);
        }
        super.visitEnumDeclaration(node);
    }

    protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {

        const { name } = node;
        if (name && !tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            const { _declarationsByIdentifier, _usageByIdentifier } = this;
            _declarationsByIdentifier.set(name, node);
            _usageByIdentifier.set(name, false);
        }
        super.visitFunctionDeclaration(node);
    }

    protected visitIdentifier(node: ts.Identifier): void {

        const { _usageByIdentifier } = this;
        const isDeclaration = _usageByIdentifier.has(node);
        if (!isDeclaration && !tsutils.isReassignmentTarget(node)) {

            const typeChecker = this.getTypeChecker();
            const symbol = typeChecker.getSymbolAtLocation(node);
            const declarations = symbol.getDeclarations();

            declarations.forEach(declaration => {
                const identifier = getIdentifier(declaration);
                const isEnforced = _usageByIdentifier.has(identifier);
                if (isEnforced) {
                    _usageByIdentifier.set(identifier, true);
                }
            });
        }
        super.visitIdentifier(node);
    }

    protected visitNamedImports(node: ts.NamedImports): void {

        const { _declarationsByIdentifier, _usageByIdentifier } = this;
        node.elements.forEach(element => {
            const { name, propertyName } = element;
            _declarationsByIdentifier.set(name, element);
            _usageByIdentifier.set(name, false);
            if (propertyName) {
                _usageByIdentifier.set(propertyName, true);
            }
        });
        super.visitNamedImports(node);
    }

    protected visitNamespaceImport(node: ts.NamespaceImport): void {

        const { _declarationsByIdentifier, _usageByIdentifier } = this;
        const { name } = node;
        _declarationsByIdentifier.set(name, node);
        _usageByIdentifier.set(name, false);
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
            const { _declarationsByIdentifier, _usageByIdentifier } = this;
            tsutils.forEachDeclaredVariable(node.declarationList, declaration => {
                const { name } = declaration;
                _declarationsByIdentifier.set(name, declaration);
                _usageByIdentifier.set(name, false);
            });
        }
        super.visitVariableStatement(node);
    }

    private onSourceFileEnd(): void {

        const { _declarationsByIdentifier, _usageByIdentifier } = this;
        _usageByIdentifier.forEach((used, identifier) => {
            if (!used) {
                const declaration = _declarationsByIdentifier.get(identifier);
                this.addFailureAtNode(identifier, Rule.FAILURE_STRING, getFix(declaration));
            }
        });
    }
}

function getFix(declaration: ts.Declaration): Lint.Fix | undefined {

    // https://github.com/palantir/tslint/blob/master/src/rules/noUnusedVariableRule.ts#L192-L197
    return undefined;
}

function getIdentifier(node: ts.Declaration): ts.Identifier {

    return node["name"];
}
