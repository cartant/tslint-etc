# tslint-etc

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cartant/tslint-etc/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/tslint-etc.svg)](https://www.npmjs.com/package/tslint-etc)
[![Downloads](http://img.shields.io/npm/dm/tslint-etc.svg)](https://npmjs.org/package/tslint-etc)
[![Build status](https://img.shields.io/travis/cartant/tslint-etc.svg)](http://travis-ci.org/cartant/tslint-etc)
[![dependency status](https://img.shields.io/david/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc)
[![devDependency Status](https://img.shields.io/david/dev/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/tslint-etc.svg)](https://david-dm.org/cartant/tslint-etc#info=peerDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/cartant/tslint-etc.svg)](https://greenkeeper.io/)

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

**WARNING**: Before configuring any of the following rules, you should ensure that TSLint's `no-unused-variable` rule is **not** enabled in your configuration (or in any configuration that you extend). That rule [has caused problems in the past](https://github.com/cartant/rxjs-tslint-rules/issues/4) - as it leaves the TypeScript program in an unstable state - and has a [significant number of still-open issues](https://github.com/palantir/tslint/search?q=no-unused-variable&state=open&type=Issues&utf8=%E2%9C%93).

The package includes the following rules (none of which are enabled by default):

| Rule | Description | Options |
| --- | --- | --- |
| `ban-imports` | Disallows the use of banned imports. | [See below](#ban-imports) |
| `no-unsafe-callback-scope` | Disallows the use of variables/properties from unsafe/outer scopes in callbacks. | None |
| `throw-error` | Enforces the use of `Error` values when throwing or rejecting. | None |

### Options

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