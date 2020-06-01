/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import * as Lint from "tslint";
import * as tsutils from "tsutils";
import * as ts from "typescript";

export class ScopeWalker extends Lint.ProgramAwareRuleWalker {
  protected callbackMap: Map<ts.Node, string> = new Map<ts.Node, string>();
  protected callbackStack: (ts.ArrowFunction | ts.FunctionExpression)[] = [];
  protected knownNames: Record<string, boolean> = {};

  protected visitArrowFunction(node: ts.ArrowFunction): void {
    if (this.callbackMap.has(node)) {
      this.callbackStack.push(node);
      super.visitArrowFunction(node);
      this.callbackStack.pop();
    } else {
      super.visitArrowFunction(node);
    }
  }

  protected visitCallExpression(node: ts.CallExpression): void {
    const { arguments: args, expression } = node;
    let name: string;

    if (tsutils.isIdentifier(expression)) {
      name = expression.getText();
    } else if (tsutils.isPropertyAccessExpression(expression)) {
      const { name: propertyName } = expression;
      name = propertyName.getText();
    }

    const callbacks = args.filter(
      (arg) => tsutils.isArrowFunction(arg) || tsutils.isFunctionExpression(arg)
    );
    callbacks.forEach((callback) => this.callbackMap.set(callback, name));
    super.visitCallExpression(node);
    callbacks.forEach((callback) => this.callbackMap.delete(callback));
  }

  protected visitFunctionExpression(node: ts.FunctionExpression): void {
    if (this.callbackMap.has(node)) {
      this.callbackStack.push(node);
      super.visitFunctionExpression(node);
      this.callbackStack.pop();
    } else {
      super.visitFunctionExpression(node);
    }
  }
}
