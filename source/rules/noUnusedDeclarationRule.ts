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
    description: "Disallows unused declarations.",
    options: {
      properties: {
        declarations: { type: "boolean" },
        ignored: { type: "object" },
        imports: { type: "boolean" },
      },
      type: "object",
    },
    optionsDescription: Lint.Utils.dedent`
      An optional object with optional \`imports\`, \`declarations\` and \`ignored\` properties.
      The \`imports\` and \`declarations\` properties are booleans and determine whether or not unused imports or declarations are allowed.
      They default to \`true\`.
      The \`ignored\` property is an object containing keys that are regular expressions
      and values that are booleans - indicating whether or not matches are ignored.`,
    requiresTypeInfo: true,
    ruleName: "no-unused-declaration",
    type: "functionality",
    typescriptOnly: true,
  };

  public static FAILURE_STRING = "Unused declarations are forbidden";

  public applyWithProgram(
    sourceFile: ts.SourceFile,
    program: ts.Program
  ): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new Walker(sourceFile, this.getOptions(), program)
    );
  }
}

export class Walker extends Lint.ProgramAwareRuleWalker {
  private _associationsByIdentifier = new Map<ts.Node, ts.Node[]>();
  private _declarationsByIdentifier = new Map<ts.Node, ts.Node>();
  private _deletes = new Set<ts.Node>();
  private _ignored: RegExp[] = [];
  private _scopes = [new Map<string, ts.Identifier>()];
  private _withoutDeclarations = new Set<string>();
  private _usageByIdentifier = new Map<ts.Node, "declared" | "seen" | "used">();
  private _validate = {
    declarations: true,
    imports: true,
  };

  constructor(
    sourceFile: ts.SourceFile,
    rawOptions: Lint.IOptions,
    program: ts.Program
  ) {
    super(sourceFile, rawOptions, program);

    const [options] = this.getOptions();
    if (options) {
      Object.entries(options.ignored || {}).forEach(([key, value]) => {
        if (value !== false) {
          this._ignored.push(new RegExp(key));
        }
      });
      this._validate = { ...this._validate, ...options };
    }
  }

  protected visitClassDeclaration(node: ts.ClassDeclaration): void {
    if (this._validate.declarations) {
      const { name } = node;
      if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
        this.declared(node, name);
        this.setScopedIdentifier(name);
      }
    }
    super.visitClassDeclaration(node);
  }

  protected visitEnumDeclaration(node: ts.EnumDeclaration): void {
    if (this._validate.declarations) {
      const { name } = node;
      if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
        this.declared(node, name);
        this.setScopedIdentifier(name);
      }
    }
    super.visitEnumDeclaration(node);
  }

  protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    if (this._validate.declarations) {
      const { body, name } = node;
      if (
        body &&
        name &&
        !tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)
      ) {
        this.declared(node, name);
        this.setScopedIdentifier(name, true);
      }
    }
    super.visitFunctionDeclaration(node);
  }

  protected visitIdentifier(node: ts.Identifier): void {
    const { _usageByIdentifier, _withoutDeclarations } = this;

    if (tsutils.isExportSpecifier(node.parent)) {
      this.seen(node.getText());
      return;
    }

    if (
      tsutils.isPropertyAssignment(node.parent) &&
      node === node.parent.name
    ) {
      return;
    }

    const isDeclaration = _usageByIdentifier.has(node);
    if (
      !isDeclaration &&
      (!tsutils.isReassignmentTarget(node) || isUnaryPrefixOrPostfix(node))
    ) {
      let hasDeclarations = false;
      const typeChecker = this.getTypeChecker();
      const symbol = typeChecker.getSymbolAtLocation(node);
      if (symbol) {
        const declarations = symbol.getDeclarations();
        if (declarations) {
          declarations.forEach((declaration) => {
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
    if (this._validate.imports && importClause) {
      const { name } = node.importClause;
      if (name) {
        this.declared(node, name);
        this.setScopedIdentifier(name);
      }
    }
    super.visitImportDeclaration(node);
  }

  protected visitImportEqualsDeclaration(
    node: ts.ImportEqualsDeclaration
  ): void {
    const { name } = node;
    if (this._validate.imports && name) {
      this.declared(node, name);
      this.setScopedIdentifier(name);
    }
    super.visitImportEqualsDeclaration(node);
  }

  protected visitInterfaceDeclaration(node: ts.InterfaceDeclaration): void {
    if (this._validate.declarations) {
      const { name } = node;
      if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
        this.declared(node, name);
        this.setScopedIdentifier(name);
      }
    }
    super.visitInterfaceDeclaration(node);
  }

  protected visitJsxSelfClosingElement(node: ts.JsxSelfClosingElement): void {
    this.seenJsx();
    super.visitJsxSelfClosingElement(node);
  }

  protected visitJsxElement(node: ts.JsxElement): void {
    this.seenJsx();
    super.visitJsxElement(node);
  }

  protected visitNamedImports(node: ts.NamedImports): void {
    if (this._validate.imports) {
      node.elements.forEach((element) => {
        const { name, propertyName } = element;
        this.declared(node, name);
        if (propertyName) {
          this.seen(propertyName);
        }
        this.setScopedIdentifier(name);
      });
    }
    super.visitNamedImports(node);
  }

  protected visitNamespaceImport(node: ts.NamespaceImport): void {
    if (this._validate.imports) {
      const { name } = node;
      this.declared(node, name);
      this.setScopedIdentifier(name);
    }
    super.visitNamespaceImport(node);
  }

  protected visitNode(node: ts.Node): void {
    const isScopeBoundary =
      tsutils.isBlock(node) ||
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

  protected visitObjectLiteralExpression(
    node: ts.ObjectLiteralExpression
  ): void {
    node.properties.forEach((property) => {
      if (tsutils.isShorthandPropertyAssignment(property)) {
        const text = property.name.getText();
        const identifier = this.getScopedIdentifier(text);
        if (identifier) {
          this.seen(identifier);
        } else {
          this._withoutDeclarations.add(text);
        }
      }
    });
    super.visitObjectLiteralExpression(node);
  }

  protected visitTypeAliasDeclaration(node: ts.TypeAliasDeclaration): void {
    if (this._validate.declarations) {
      const { name } = node;
      if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
        this.declared(node, name);
        this.setScopedIdentifier(name);
      }
    }
    super.visitTypeAliasDeclaration(node);
  }

  protected visitVariableStatement(node: ts.VariableStatement): void {
    if (this._validate.declarations) {
      if (!tsutils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)) {
        const names: ts.Identifier[] = [];
        tsutils.forEachDeclaredVariable(node.declarationList, (declaration) => {
          const { name } = declaration;
          if (
            tsutils.isBindingElement(declaration) &&
            declaration.dotDotDotToken
          ) {
            this.associate(name, names);
          } else {
            names.push(name);
          }
          this.declared(node, name);
          this.setScopedIdentifier(name);
        });
      }
    }
    super.visitVariableStatement(node);
  }

  private associate(name: ts.Node, names: ts.Node[]): void {
    const { _associationsByIdentifier } = this;
    _associationsByIdentifier.set(name, names);
  }

  private declared(declaration: ts.Node, name: ts.Node): void {
    const { _declarationsByIdentifier, _usageByIdentifier } = this;
    _declarationsByIdentifier.set(name, declaration);
    const usage = _usageByIdentifier.get(name);
    _usageByIdentifier.set(name, usage === "seen" ? "used" : "declared");
  }

  private getFix(
    identifier: ts.Node,
    declaration: ts.Node
  ): Lint.Fix | undefined {
    const { _deletes } = this;
    if (
      tsutils.isImportDeclaration(declaration) ||
      tsutils.isImportEqualsDeclaration(declaration)
    ) {
      _deletes.add(declaration);
      return Lint.Replacement.deleteFromTo(
        getStart(declaration),
        declaration.getFullStart() + declaration.getFullWidth()
      );
    } else if (tsutils.isNamedImports(declaration)) {
      const { _usageByIdentifier } = this;
      const { elements } = declaration;
      if (
        elements.every(
          (element) => _usageByIdentifier.get(element.name) === "declared"
        )
      ) {
        const importClause = declaration.parent as ts.ImportClause;
        const importDeclaration = importClause.parent as ts.ImportDeclaration;
        if (_deletes.has(importDeclaration)) {
          return undefined;
        }
        const { name } = importClause;
        if (name && this.used(name)) {
          _deletes.add(declaration);
          return Lint.Replacement.deleteFromTo(
            name.getFullStart() + name.getFullWidth(),
            declaration.getFullStart() + declaration.getFullWidth()
          );
        }
        _deletes.add(importDeclaration);
        return Lint.Replacement.deleteFromTo(
          getStart(importDeclaration),
          importDeclaration.getFullStart() + importDeclaration.getFullWidth()
        );
      }
      const index = elements.findIndex(
        (element) => element.name === identifier
      );
      const from =
        index === 0
          ? elements[index].getFullStart()
          : elements[index - 1].getFullStart() +
            elements[index - 1].getFullWidth();
      const to =
        index === 0
          ? elements[index + 1].getFullStart()
          : elements[index].getFullStart() + elements[index].getFullWidth();
      return Lint.Replacement.deleteFromTo(from, to);
    } else if (tsutils.isNamespaceImport(declaration)) {
      const importClause = declaration.parent as ts.ImportClause;
      const importDeclaration = importClause.parent as ts.ImportDeclaration;
      _deletes.add(importDeclaration);
      return Lint.Replacement.deleteFromTo(
        getStart(importDeclaration),
        importDeclaration.getFullStart() + importDeclaration.getFullWidth()
      );
    }
    return undefined;

    function getStart(
      importDeclaration: ts.ImportDeclaration | ts.ImportEqualsDeclaration
    ): number {
      // If the full-start position is zero, use the (non-full) start in case
      // as the first import might be preceeded by a copyright comment, etc.
      return importDeclaration.getFullStart() || importDeclaration.getStart();
    }
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
    const {
      _declarationsByIdentifier,
      _usageByIdentifier,
      _withoutDeclarations,
    } = this;
    _usageByIdentifier.forEach((usage, identifier) => {
      if (this._ignored.some((regExp) => regExp.test(identifier.getText()))) {
        return;
      }
      if (
        usage === "declared" &&
        !_withoutDeclarations.has(identifier.getText())
      ) {
        const declaration = _declarationsByIdentifier.get(identifier);
        const fix = this.getFix(identifier, declaration);
        this.addFailureAtNode(identifier, Rule.FAILURE_STRING, fix);
      }
    });
  }

  private seen(name: ts.Node | string): void {
    const { _associationsByIdentifier, _usageByIdentifier } = this;
    if (typeof name === "string") {
      _usageByIdentifier.forEach((value, key) => {
        if (key.getText() === name) {
          _usageByIdentifier.set(key, value === "declared" ? "used" : "seen");
          const associatedNames = _associationsByIdentifier.get(key);
          if (associatedNames) {
            associatedNames.forEach((associatedName) =>
              this.seen(associatedName)
            );
          }
        }
      });
    } else {
      const usage = _usageByIdentifier.get(name);
      _usageByIdentifier.set(name, usage === "declared" ? "used" : "seen");
      const associatedNames = _associationsByIdentifier.get(name);
      if (associatedNames) {
        associatedNames.forEach((associatedName) => this.seen(associatedName));
      }
    }
  }

  private seenJsx(): void {
    const jsxFactory =
      this.getProgram().getCompilerOptions().jsxFactory ||
      "React.createElement";
    const index = jsxFactory.indexOf(".");
    this.seen(index === -1 ? jsxFactory : jsxFactory.substring(0, index));
  }

  private setScopedIdentifier(
    identifier: ts.Identifier,
    parent: boolean = false
  ): void {
    const { _scopes } = this;
    const scope = _scopes[_scopes.length - (parent ? 2 : 1)];
    scope.set(identifier.getText(), identifier);
  }

  private used(name: ts.Node | string): boolean {
    const { _usageByIdentifier } = this;
    const text = typeof name === "string" ? name : name.getText();
    let used = false;
    _usageByIdentifier.forEach((usage, identifier) => {
      if (usage === "used" && identifier.getText() === text) {
        used = true;
      }
    });
    return used;
  }
}

function getIdentifier(node: ts.Declaration): ts.Identifier {
  return tsutils.isIdentifier(node) ? node : node["name"];
}

function isUnaryPrefixOrPostfix(node: ts.Node): boolean {
  const { parent } = node;
  return (
    tsutils.isPrefixUnaryExpression(parent) ||
    tsutils.isPostfixUnaryExpression(parent)
  );
}
