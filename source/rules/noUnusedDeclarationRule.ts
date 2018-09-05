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

    private _declarationsByIdentifier = new Map<ts.Node, ts.Node>();
    private _scopes = [new Map<string, ts.Identifier>()];
    private _withoutDeclarations = new Set<string>();
    private _usageByIdentifier = new Map<ts.Node, "declared" | "seen" | "used">();

    protected visitClassDeclaration(node: ts.ClassDeclaration): void {

        const { name } = node;
        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            this.declared(node, name);
        }
        super.visitClassDeclaration(node);
    }

    protected visitEnumDeclaration(node: ts.EnumDeclaration): void {

        const { name } = node;
        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            this.declared(node, name);
        }
        super.visitEnumDeclaration(node);
    }

    protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {

        const { name } = node;
        if (name && !tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            this.declared(node, name);
        }
        super.visitFunctionDeclaration(node);
    }

    protected visitIdentifier(node: ts.Identifier): void {

        const { _usageByIdentifier, _withoutDeclarations } = this;

        if (tsutils.isExportSpecifier(node.parent)) {
            this.seen(node.getText());
            return;
        }

        const isDeclaration = _usageByIdentifier.has(node);
        if (!isDeclaration && !tsutils.isReassignmentTarget(node)) {

            let hasDeclarations = false;
            const typeChecker = this.getTypeChecker();
            const symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                const declarations = symbol.getDeclarations();
                if (declarations) {
                    declarations.forEach(declaration => {
                        const identifier = getIdentifier(declaration);
                        this.seen(identifier);
                    });
                    hasDeclarations = true;
                }
            }
            if (!hasDeclarations) {
                _withoutDeclarations.add(node.getText());
            }
        }
        super.visitIdentifier(node);
    }

    protected visitImportDeclaration(node: ts.ImportDeclaration): void {

        const { importClause } = node;
        if (importClause) {
            const { name } = node.importClause;
            if (name) {
                this.declared(node, name);
                this.setScopedIdentifier(name);
            }
        }
        super.visitImportDeclaration(node);
    }

    protected visitJsxElement(node: ts.JsxElement): void {

        const jsxFactory = this.getProgram().getCompilerOptions().jsxFactory || "React.createElement";
        const index = jsxFactory.indexOf(".");
        this.seen((index === -1) ? jsxFactory : jsxFactory.substring(0, index));
        super.visitJsxElement(node);
    }

    protected visitNamedImports(node: ts.NamedImports): void {

        node.elements.forEach(element => {
            const { name, propertyName } = element;
            this.declared(node, name);
            if (propertyName) {
                this.seen(propertyName);
            }
            this.setScopedIdentifier(name);
        });
        super.visitNamedImports(node);
    }

    protected visitNamespaceImport(node: ts.NamespaceImport): void {

        const { name } = node;
        this.declared(node, name);
        this.setScopedIdentifier(name);
        super.visitNamespaceImport(node);
    }

    protected visitNode(node: ts.Node): void {

        const isScopeBoundary = tsutils.isBlock(node) ||
            tsutils.isArrowFunction(node) ||
            tsutils.isConstructorDeclaration(node) ||
            tsutils.isFunctionDeclaration(node) ||
            tsutils.isGetAccessorDeclaration(node) ||
            tsutils.isMethodDeclaration(node) ||
            tsutils.isSetAccessorDeclaration(node);

        const { _scopes } = this;
        if (isScopeBoundary) {
            _scopes.push(new Map<string, ts.Identifier>());
        }
        super.visitNode(node);

        if (isScopeBoundary) {
            _scopes.pop();
        }
        if (tsutils.isSourceFile(node)) {
            this.onSourceFileEnd();
        }
    }

    protected visitObjectLiteralExpression(node: ts.ObjectLiteralExpression): void {

        node.properties.forEach(property => {
            if (tsutils.isShorthandPropertyAssignment(property)) {
                const identifier = this.getScopedIdentifier(property.name.getText());
                if (identifier) {
                    this.seen(identifier);
                }
            }
        });
        super.visitObjectLiteralExpression(node);
    }

    protected visitVariableStatement(node: ts.VariableStatement): void {

        if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
            tsutils.forEachDeclaredVariable(node.declarationList, declaration => {
                const { name } = declaration;
                this.declared(node, name);
                this.setScopedIdentifier(name);
            });
        }
        super.visitVariableStatement(node);
    }

    private declared(declaration: ts.Node, name: ts.Node): void {

        const { _declarationsByIdentifier, _usageByIdentifier } = this;
        _declarationsByIdentifier.set(name, declaration);
        const usage = _usageByIdentifier.get(name);
        _usageByIdentifier.set(name, (usage === "seen") ? "used" : "declared");
    }

    private getFix(identifier: ts.Node, declaration: ts.Node): Lint.Fix | undefined {

        if (tsutils.isImportDeclaration(declaration)) {
            return Lint.Replacement.deleteFromTo(
                declaration.getFullStart(),
                declaration.getFullStart() + declaration.getFullWidth()
            );
        } else if (tsutils.isNamedImports(declaration)) {
            const { _usageByIdentifier } = this;
            const { elements } = declaration;
            if (elements.every(element => _usageByIdentifier.get(element.name) === "declared")) {
                const importClause = declaration.parent as ts.ImportClause;
                const importDeclaration = importClause.parent as ts.ImportDeclaration;
                return Lint.Replacement.deleteFromTo(
                    importDeclaration.getFullStart(),
                    importDeclaration.getFullStart() + importDeclaration.getFullWidth()
                );
            }
            const index = elements.findIndex(element => element.name === identifier);
            const from = (index === 0) ?
                elements[index].getFullStart() :
                elements[index - 1].getFullStart() + elements[index - 1].getFullWidth();
            const to = (index === 0) ?
                elements[index + 1].getFullStart() :
                elements[index].getFullStart() + elements[index].getFullWidth();
            return Lint.Replacement.deleteFromTo(from, to);
        } else if (tsutils.isNamespaceImport(declaration)) {
            const importClause = declaration.parent as ts.ImportClause;
            const importDeclaration = importClause.parent as ts.ImportDeclaration;
            return Lint.Replacement.deleteFromTo(
                importDeclaration.getFullStart(),
                importDeclaration.getFullStart() + importDeclaration.getFullWidth()
            );
        }
        return undefined;
    }

    private getScopedIdentifier(name: string): ts.Node | undefined {

        const { _scopes } = this;
        for (let s = _scopes.length - 1; s >= 0; --s) {
            const scope = _scopes[s];
            if (scope.has(name)) {
                return scope.get(name);
            }
        }
        return undefined;
    }

    private onSourceFileEnd(): void {

        const { _declarationsByIdentifier, _usageByIdentifier, _withoutDeclarations } = this;
        _usageByIdentifier.forEach((usage, identifier) => {
            if ((usage === "declared") && !_withoutDeclarations.has(identifier.getText())) {
                const declaration = _declarationsByIdentifier.get(identifier);
                const fix = this.getFix(identifier, declaration);
                this.addFailureAtNode(identifier, Rule.FAILURE_STRING, fix);
            }
        });
    }

    private seen(name: ts.Node | string): void {

        const { _usageByIdentifier } = this;
        if (typeof name === "string") {
            _usageByIdentifier.forEach((value, key) => {
                if (key.getText() === name) {
                    _usageByIdentifier.set(key, (value === "declared") ? "used" : "seen");
                }
            });
        } else {
            const usage = _usageByIdentifier.get(name);
            _usageByIdentifier.set(name, (usage === "declared") ? "used" : "seen");
        }
    }

    private setScopedIdentifier(identifier: ts.Identifier): void {

        const { _scopes } = this;
        const scope = _scopes[_scopes.length - 1];
        scope.set(identifier.getText(), identifier);
    }
}

function getIdentifier(node: ts.Declaration): ts.Identifier {

    return node["name"];
}
