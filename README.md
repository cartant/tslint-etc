# tslint-etc

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cartant/tslint-etc/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/tslint-etc.svg)](https://www.npmjs.com/package/tslint-etc)
[![Downloads](http://img.shields.io/npm/dm/tslint-etc.svg)](https://npmjs.org/package/tslint-etc)
[![Build status](https://img.shields.io/circleci/build/github/cartant/tslint-etc?token=bc4cb43bc04841847049232b7637e4291f5cc96d)](https://app.circleci.com/pipelines/github/cartant)
[![dependency status](https://img.shields.io/david/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc)
[![devDependency Status](https://img.shields.io/david/dev/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc#info=peerDependencies)

TSLint [is deprecated](https://github.com/palantir/tslint#tslint). All of the rules in this package have equivalent ESLint rules in the [`eslint-plugin-etc`](https://github.com/cartant/eslint-plugin-etc) package or have 'official' ESLint equivalents.

And ESLint implementations this package's [`dtslint`](https://github.com/Microsoft/dtslint)-related rules can be found in the [`eslint-plugin-dtslint`](https://github.com/cartant/eslint-plugin-dtslint) package.

### What is it?

`tslint-etc` is set of TSLint rules to enforce policies that cannot be specified - or easily specified - with the built-in rules.

## Install

Install the package using NPM:

    npm install tslint-etc --save-dev

Update your `tslint.json` file to extend this package and add any rules you want to configure to the `rules` object:

```json
{
  "extends": [
    "tslint-etc"
  ],
  "rules": {
    "throw-error": { "severity": "error" }
  }
}
```

<a name="rules"></a>

## Rules

**WARNING**: Before configuring any of the following rules, you should ensure that TSLint's `no-unused-variable` rule is **not** enabled in your configuration (or in any configuration that you extend). That rule [has caused problems in the past](https://github.com/cartant/rxjs-tslint-rules/issues/4) - as it leaves the TypeScript program in an unstable state - and has a [significant number of still-open issues](https://github.com/palantir/tslint/search?q=no-unused-variable&state=open&type=Issues&utf8=%E2%9C%93). Consider using this package's `no-unused-declaration` rule instead.

The package includes the following rules (none of which are enabled by default):

| Rule | Description | Fixer | Options |
| --- | --- | --- | --- |
| `ban-imports` | Disallows the use of banned imports. | No | [See below](#ban-imports) |
| `expect-deprecation` | Asserts deprecations with `$ExpectDeprecation` and `$ExpectNoDeprecation`. | No | None |
| `expect-type` | Asserts types with `$ExpectType` and presence of errors with `$ExpectError`. You can use ESLint and this rule to perform your type tests without having to install or run dtslint. | No | None |
| `no-assign-mutated-array` | Disallows the assignment of returned, mutated arrays. Useful for those times you forget that `sort` and `reverse` mutate the array upon which they are called. | No | None |
| `no-const-enum` | Disallows the use of `const enum`. Constant enums are [not compatible with isolated modules](https://ncjamieson.com/dont-export-const-enums/). | No | [See below](#no-const-enum) |
| `no-dtslint-typo` | Disallows [dtslint](https://github.com/Microsoft/dtslint)-like expectations that have typographical errors. | No | None |
| `no-enum` | Disallows the use of `enum`. | No | None |
| `no-implicit-any-catch` | Like the [`no-implicit-any-catch` rule](https://github.com/typescript-eslint/typescript-eslint/pull/2202) in `@typescript-eslint/eslint-plugin`, but for `Promise` rejections, too. | |
| `no-t` | Disallows single-character type parameters. | No | None |
| `no-unsafe-callback-scope` | Disallows the use of variables/properties from unsafe/outer scopes in callbacks. | No | [See below](#no-unsafe-callback-scope) |
| `no-unused-declaration` | Disallows unused declarations. | Yes, but [see below](#no-unused-declaration) | [See below](#no-unused-declaration) |
| `throw-error` | Enforces the use of `Error` values when throwing or rejecting. | No | None |

### Options and notes

<a name="ban-imports"></a>

#### ban-imports

The `ban-imports` rule takes an object containing keys that are regular expressions and values that are either booleans or strings containing the explanation for the ban.

For example, to following configuration would disallow `"foo"` with an explanation, would disallow `"bar"` without an explanation and would allow `"baz"`:

```json
"rules": {
  "ban-imports": {
    "options": [{
      "^foo$": "'foo' has been deprecated; use 'baz'",
      "^bar$": true,
      "^baz$": false
    }],
    "severity": "error"
  }
}
```

<a name="no-const-enum"></a>

#### no-const-enum

This rule takes an optional object with an optional `allowLocal` property - which defaults to `false`. If `allowLocal` is `true`, only exported const enums are forbidden.

For example, to following configuration would local (i.e. non-exported) const enums:

```json
"rules": {
  "no-const-enum": {
    "options": [{
      "allowLocal": true
    }],
    "severity": "error"
  }
}
```

<a name="no-unsafe-callback-scope"></a>

#### no-unsafe-callback-scope

This rule takes an optional object with optional `allowMethods`, `allowParameters` and `allowProperties` properties.

If the `allowMethods` option is `true`, calling methods via `this` is allowed.

If the `allowParameters` option is `true`, referencing function parameters from outer scopes is allowed.

If the `allowProperties` option is `true`, accessing properties via `this` is allowed.

The following options are equivalent to the rule's default configuration:

```json
"rules": {
  "no-unsafe-callback-scope": {
    "options": [{
      "allowMethods": true,
      "allowParameters": true,
      "allowProperties": false
    }],
    "severity": "error"
  }
}
```

<a name="no-unused-declaration"></a>

#### no-unused-declaration

This rule has a fixer. However, the fixer will only remove unused import declarations. It will not remove other kinds of declarations, as doing so could be potentially destructive.

For example, having it remove a function that you've spent time writing - just because you've not yet exported or called it - would be too dispiriting, so the rule will just flag it as a failure and leave the function untouched.

The rule takes an optional object with optional `imports`, `declarations` and `ignored` properties. The `imports` and `declarations` properties are booleans and determine whether or not unused imports or declarations are allowed. They default to `true`. The `ignored` property is an object containing keys that are regular expressions and values that are booleans - indicating whether or not matches are ignored.

For example:

```json
"rules": {
  "no-unused-declaration": {
    "options": [{
      "declarations": true,
      "ignored": {},
      "imports": true
    }],
    "severity": "error"
  }
}
```
