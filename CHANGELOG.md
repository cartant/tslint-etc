<a name="1.13.10"></a>
## [1.13.10](https://github.com/cartant/tslint-etc/compare/v1.13.9...v1.13.10) (2021-05-19)

### Fixes

* Support `Array` constructors in the `no-assign-mutated-array` rule. ([e86d200](https://github.com/cartant/tslint-etc/commit/e86d200))

<a name="1.13.9"></a>
## [1.13.9](https://github.com/cartant/tslint-etc/compare/v1.13.8...v1.13.9) (2020-11-28)

### Fixes

* Add `index.js` to `files` in `package.json`. ([836cf8f](https://github.com/cartant/tslint-etc/commit/836cf8f))

<a name="1.13.8"></a>
## [1.13.8](https://github.com/cartant/tslint-etc/compare/v1.13.7...v1.13.8) (2020-11-28)

### Changes

* Use `files` in `package.json` instead of `.npmignore`. ([f5fdb0e](https://github.com/cartant/tslint-etc/commit/f5fdb0e))

<a name="1.13.7"></a>
## [1.13.7](https://github.com/cartant/tslint-etc/compare/v1.13.6...v1.13.7) (2020-09-08)

### Changes

* Widen the TypeScript peer dependency range. ([417f224](https://github.com/cartant/tslint-etc/commit/417f224))

<a name="1.13.6"></a>
## [1.13.6](https://github.com/cartant/tslint-etc/compare/v1.13.5...v1.13.6) (2020-08-25)

### Fixes

* Use the correct `DOMException` capitalization. ([93fe131](https://github.com/cartant/tslint-etc/commit/93fe131))

<a name="1.13.5"></a>
## [1.13.5](https://github.com/cartant/tslint-etc/compare/v1.13.4...v1.13.5) (2020-08-25)

### Changes

* Relax `throw-error` to allow throwing or rejecting a `DomException`. ([b57d3bb](https://github.com/cartant/tslint-etc/commit/b57d3bb))

<a name="1.13.4"></a>
## [1.13.4](https://github.com/cartant/tslint-etc/compare/v1.13.3...v1.13.4) (2020-08-23)

### Changes

* Don't include the TypeScript version in `expect-type` failure messages. ([405c129](https://github.com/cartant/tslint-etc/commit/405c129))

<a name="1.13.3"></a>
## [1.13.3](https://github.com/cartant/tslint-etc/compare/v1.13.2...v1.13.3) (2020-08-23)

### Fixes

* In `expect-type`, ignore diagnostics that don't have lines. ([2fe12e3](https://github.com/cartant/tslint-etc/commit/2fe12e3))

<a name="1.13.2"></a>
## [1.13.2](https://github.com/cartant/tslint-etc/compare/v1.13.1...v1.13.2) (2020-08-23)

### Changes

* Remove newlines from `expect-type` failure message. ([2391839](https://github.com/cartant/tslint-etc/commit/2391839))

<a name="1.13.1"></a>
## [1.13.1](https://github.com/cartant/tslint-etc/compare/v1.13.0...v1.13.1) (2020-08-10)

### Fixes

* In the `no-assign-mutated-array` rule, treat `splice` as an array creator - it returns an array containing the deleted elements. ([2298a6f](https://github.com/cartant/tslint-etc/commit/2298a6f))

<a name="1.13.0"></a>
## [1.13.0](https://github.com/cartant/tslint-etc/compare/v1.12.0...v1.13.0) (2020-07-18)

### Features

* Added the `no-array-foreach` rule. ([afea026](https://github.com/cartant/tslint-etc/commit/afea026))

<a name="1.12.0"></a>
## [1.12.0](https://github.com/cartant/tslint-etc/compare/v1.11.1...v1.12.0) (2020-07-12)

### Features

* Added the `no-implicit-any-catch` rule. ([b9aeb5a](https://github.com/cartant/tslint-etc/commit/b9aeb5a))

<a name="1.11.1"></a>
## [1.11.1](https://github.com/cartant/tslint-etc/compare/v1.11.0...v1.11.1) (2020-06-24)

### Changes

* Don't distribute the `yarn.lock` file.

<a name="1.11.0"></a>
## [1.11.0](https://github.com/cartant/tslint-etc/compare/v1.10.1...v1.11.0) (2020-06-08)

### Features

* Support `ImportEqualsDeclaration` nodes in the `no-unused-dependency` rule. ([db44d74](https://github.com/cartant/tslint-etc/commit/db44d74))

<a name="1.10.1"></a>
## [1.10.1](https://github.com/cartant/tslint-etc/compare/v1.10.0...v1.10.1) (2020-02-29)

### Fixes

* Widen `tslint` peer dependency. ([23b03d1](https://github.com/cartant/tslint-etc/commit/23b03d1))

<a name="1.10.0"></a>
## [1.10.0](https://github.com/cartant/tslint-etc/compare/v1.9.2...v1.10.0) (2019-12-07)

### Features

* Add a `prefix` option to the `no-t` rule. ([fd63c43](https://github.com/cartant/tslint-etc/commit/fd63c43))

<a name="1.9.2"></a>
## [1.9.2](https://github.com/cartant/tslint-etc/compare/v1.9.1...v1.9.2) (2019-11-05)

### Fix

* Use a more relaxed RegExp in `no-dtslint-typo`. ([50b4fac](https://github.com/cartant/tslint-etc/commit/50b4fac))

<a name="1.9.1"></a>
## [1.9.1](https://github.com/cartant/tslint-etc/compare/v1.9.0...v1.9.1) (2019-11-04)

### Fix

* Pass the actual version of the local `typescript` package in the `expect-type` rule. ([19a35c2](https://github.com/cartant/tslint-etc/commit/19a35c2))

<a name="1.9.0"></a>
## [1.9.0](https://github.com/cartant/tslint-etc/compare/v1.8.0...v1.9.0) (2019-11-04)

### Features

* Add the `expect-type` rule (from [dtslint](https://github.com/Microsoft/dtslint)). ([81a2554](https://github.com/cartant/tslint-etc/commit/81a2554))

<a name="1.8.0"></a>
## [1.8.0](https://github.com/cartant/tslint-etc/compare/v1.7.1...v1.8.0) (2019-11-04)

### Features

* Add the `expect-deprecation` rule. ([92488a4](https://github.com/cartant/tslint-etc/commit/92488a4))
* Add the `no-dtslint-typo` rule. ([df1d697](https://github.com/cartant/tslint-etc/commit/df1d697))

### Changes

* Deprecate the `no-missing-dollar-expect` rule. ([8300eb5](https://github.com/cartant/tslint-etc/commit/8300eb5))

<a name="1.7.1"></a>
## [1.7.1](https://github.com/cartant/tslint-etc/compare/v1.7.0...v1.7.1) (2019-10-28)

### Fixes

* Don't delete a file's leading comment when removing the first unused import. ([6b3beba](https://github.com/cartant/tslint-etc/commit/6b3beba))

<a name="1.7.0"></a>
## [1.7.0](https://github.com/cartant/tslint-etc/compare/v1.6.0...v1.7.0) (2019-08-28)

### Features

* Add `no-t` rule. ([41a1b34](https://github.com/cartant/tslint-etc/commit/41a1b34))

<a name="1.6.1"></a>
## [1.6.1](https://github.com/cartant/tslint-etc/compare/v1.6.0...v1.6.1) (2019-10-26)

### Notes

* Published by accident. This should have been `1.7.1`.

<a name="1.6.0"></a>
## [1.6.0](https://github.com/cartant/tslint-etc/compare/v1.5.6...v1.6.0) (2019-07-20)

### Features

* Add an `ignored` option to `no-unused-declaration`. ([8f83c76](https://github.com/cartant/tslint-etc/commit/8f83c76))

<a name="1.5.6"></a>
## [1.5.6](https://github.com/cartant/tslint-etc/compare/v1.5.5...v1.5.6) (2019-06-28)

### Fixes

* Ignore qualified names in `no-unsafe-callback-scope`. ([0a92549](https://github.com/cartant/tslint-etc/commit/0a92549))

<a name="1.5.5"></a>
## [1.5.5](https://github.com/cartant/tslint-etc/compare/v1.5.4...v1.5.5) (2019-06-19)

### Fixes

* Add `console` to the `no-unsafe-callback-scope` whitelist. ([a4a766a](https://github.com/cartant/tslint-etc/commit/a4a766a))

<a name="1.5.4"></a>
## [1.5.4](https://github.com/cartant/tslint-etc/compare/v1.5.3...v1.5.4) (2019-06-19)

### Fixes

* Fixed problems with `no-unsafe-callback-scope` and property-access expressions. ([93d5fc0](https://github.com/cartant/tslint-etc/commit/93d5fc0))

<a name="1.5.3"></a>
## [1.5.3](https://github.com/cartant/tslint-etc/compare/v1.5.2...v1.5.3) (2019-05-22)

### Fixes

* Fix `no-unused-declaration` fixer for situations in which default and named imports are (un)used together - see [#21](https://github.com/cartant/tslint-etc/issues/21). ([a68d3c0](https://github.com/cartant/tslint-etc/commit/a68d3c0))

<a name="1.5.2"></a>
## [1.5.2](https://github.com/cartant/tslint-etc/compare/v1.5.1...v1.5.2) (2019-04-26)

### Fixes

* Fix a bug with imports and the `no-unused-declaration` rule - see [#19](https://github.com/cartant/tslint-etc/issues/19). ([4bbf6cc](https://github.com/cartant/tslint-etc/commit/4bbf6cc))

<a name="1.5.1"></a>
## [1.5.1](https://github.com/cartant/tslint-etc/compare/v1.5.0...v1.5.1) (2019-04-13)

### Fixes

* Support interfaces and type aliases in the `no-unused-declaration` rule. ([bdc71ba](https://github.com/cartant/tslint-etc/commit/bdc71ba))

<a name="1.5.0"></a>
## [1.5.0](https://github.com/cartant/tslint-etc/compare/v1.4.4...v1.5.0) (2019-03-31)

### Features

* Add an `allowLocal` option to the `no-const-enum` rule. ([1637c8d](https://github.com/cartant/tslint-etc/commit/1637c8d))

<a name="1.4.4"></a>
## [1.4.4](https://github.com/cartant/tslint-etc/compare/v1.4.3...v1.4.4) (2019-03-30)

### Fixes

* Don't delete imports more than once when fixing `no-unused-declaration` failures. ([a8b634d](https://github.com/cartant/tslint-etc/commit/a8b634d))

<a name="1.4.3"></a>
## [1.4.3](https://github.com/cartant/tslint-etc/compare/v1.4.2...v1.4.3) (2019-03-29)

### Fixes

* Allow removal of props via destructing with `no-unused-declaration` enabled. ([e0699a7](https://github.com/cartant/tslint-etc/commit/e0699a7))

<a name="1.4.2"></a>
## [1.4.2](https://github.com/cartant/tslint-etc/compare/v1.4.1...v1.4.2) (2019-03-29)

### Fixes

* Fix a problem with `no-unused-declaration` and `defaultProps`. ([2235987](https://github.com/cartant/tslint-etc/commit/2235987))

<a name="1.4.1"></a>
## [1.4.1](https://github.com/cartant/tslint-etc/compare/v1.4.0...v1.4.1) (2019-03-27)

### Fixes

* Don't use typed rules for `no-enum` and `no-const-enum`. ([58ac299](https://github.com/cartant/tslint-etc/commit/58ac299))

<a name="1.4.0"></a>
## [1.4.0](https://github.com/cartant/tslint-etc/compare/v1.3.2...v1.4.0) (2019-03-27)

### Features

* Add `no-enum` and `no-const-enum` rules. ([06f2f59](https://github.com/cartant/tslint-etc/commit/06f2f59))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/cartant/tslint-etc/compare/v1.3.1...v1.3.2) (2019-02-25)

### Fixes

* Allow throwing and rethrowing `any`. ([6146d14](https://github.com/cartant/tslint-etc/commit/6146d14))

<a name="1.3.1"></a>
## [1.3.1](https://github.com/cartant/tslint-etc/compare/v1.3.0...v1.3.1) (2019-02-23)

### Changes

* Replaced `util.ts` with `tsutils-etc`.

<a name="1.3.0"></a>
## [1.3.0](https://github.com/cartant/tslint-etc/compare/v1.2.12...v1.3.0) (2019-02-15)

### Features

* Added options to the `no-unused-declaration` rule. ([e592d9d](https://github.com/cartant/tslint-etc/commit/e592d9d))

<a name="1.2.12"></a>
## [1.2.12](https://github.com/cartant/tslint-etc/compare/v1.2.11...v1.2.12) (2018-12-24)

### Fixes

* The `no-unused-declaration` rule now supports overload signatures. ([a9fd1d8](https://github.com/cartant/tslint-etc/commit/a9fd1d8))
* The `no-unused-declaration` rule now supports hoisting functions into object shorthand. ([2bc3eb9](https://github.com/cartant/tslint-etc/commit/2bc3eb9))

<a name="1.2.11"></a>
## [1.2.11](https://github.com/cartant/tslint-etc/compare/v1.2.10...v1.2.11) (2018-12-22)

### Fixes

* `no-unsafe-callback-scope` rule now supports readonly, static class properties and parameter destructuring. ([85f0801](https://github.com/cartant/tslint-etc/commit/85f0801))

<a name="1.2.10"></a>
## [1.2.10](https://github.com/cartant/tslint-etc/compare/v1.2.9...v1.2.10) (2018-12-21)

### Fixes

* `no-unsafe-callback-scope` rule now considers `instanceof` constructors safe. ([604aee3](https://github.com/cartant/tslint-etc/commit/604aee3))

<a name="1.2.9"></a>
## [1.2.9](https://github.com/cartant/tslint-etc/compare/v1.2.8...v1.2.9) (2018-12-15)

### Fixes

* Apply fixes - from `rxjs-tslint-rules` - to `no-unsafe-callback-scope` rule. ([956d7fd](https://github.com/cartant/tslint-etc/commit/956d7fd))

<a name="1.2.8"></a>
## [1.2.8](https://github.com/cartant/tslint-etc/compare/v1.2.7...v1.2.8) (2018-12-14)

### Fixes

* Supported pre/postfix operators in the `no-unused-declaration` rule. ([788bb3a](https://github.com/cartant/tslint-etc/commit/788bb3a))

<a name="1.2.7"></a>
## [1.2.7](https://github.com/cartant/tslint-etc/compare/v1.2.6...v1.2.7) (2018-10-24)

### Features

* Added `no-assign-mutated-array` rule. ([c4e8504](https://github.com/cartant/tslint-etc/commit/c4e8504))

<a name="1.2.6"></a>
## [1.2.6](https://github.com/cartant/tslint-etc/compare/v1.2.5...v1.2.6) (2018-09-12)

### Features

* Added `no-missing-dollar-expect` for [dtslint](https://github.com/Microsoft/dtslint) expectations.

<a name="1.2.5"></a>
## [1.2.5](https://github.com/cartant/tslint-etc/compare/v1.2.4...v1.2.5) (2018-09-06)

### Fixes

* Fixed a problem with `no-unused-declaration` false positives when using functions and object-shorthand properties. ([2dcdfac](https://github.com/cartant/tslint-etc/commit/2dcdfac))
* Fixed a problem with `no-unused-declaration` false positives when using self-closing JSX elements. ([7948bc7](https://github.com/cartant/tslint-etc/commit/7948bc7))

<a name="1.2.4"></a>
## [1.2.4](https://github.com/cartant/tslint-etc/compare/v1.2.3...v1.2.4) (2018-09-01)

### Fixes

* Fixed a problem with `no-unused-declaration` false positives for exports. ([600ce3c](https://github.com/cartant/tslint-etc/commit/600ce3c))
* Fixed a problem with `no-unused-declaration` false positives for hoisted functions. ([5d17a2b](https://github.com/cartant/tslint-etc/commit/5d17a2b))
* Fixed a problem with `no-unused-declaration` false positives for JSX-related imports. ([a46596d](https://github.com/cartant/tslint-etc/commit/a46596d))

<a name="1.2.3"></a>
## [1.2.3](https://github.com/cartant/tslint-etc/compare/v1.2.2...v1.2.3) (2018-07-31)

### Build

* Widen TypeScript peer semver to allow for version 3.0. ([fb28cb1](https://github.com/cartant/tslint-etc/commit/fb28cb1))

<a name="1.2.2"></a>
## [1.2.2](https://github.com/cartant/tslint-etc/compare/v1.2.1...v1.2.2) (2018-05-07)

### Fixes

* Fixed a problem in which the `no-unused-declaration` rule throw errors when inspecting variables typed as `any`. ([b07c760](https://github.com/cartant/tslint-etc/commit/b07c760))

<a name="1.2.1"></a>
## [1.2.1](https://github.com/cartant/tslint-etc/compare/v1.2.0...v1.2.1) (2018-05-07)

### Fixes

* Fixed a problem in which the `no-unused-declaration` rule did not recognise usage via object shorthand. ([cc86c2e](https://github.com/cartant/tslint-etc/commit/cc86c2e))

<a name="1.2.0"></a>
## [1.2.0](https://github.com/cartant/tslint-etc/compare/v1.1.0...v1.2.0) (2018-05-07)

### Features

* Added a fixer to the `no-unused-declaration` rule for unused imports. Other unused declarations must be fixed manually, as their automated removal would be considerably more destructive and could result in lost work.  ([95c221d](https://github.com/cartant/tslint-etc/commit/95c221d))

### Fixes

* The `no-unused-declaration` rule now detects unused default imports. ([cc70e40](https://github.com/cartant/tslint-etc/commit/cc70e40))

### Build

* The TSLint testing infrastructure is now used instead of Mocha. ([1076253](https://github.com/cartant/tslint-etc/commit/1076253))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/cartant/tslint-etc/compare/v1.0.1...v1.1.0) (2018-05-06)

### Features

* Added a `no-unused-declaration` rule. It's similar to TSLint's built-in [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) rule, but has a simpler implementation and fewer [problems](https://github.com/palantir/tslint/search?q=no-unused-variable&state=open&type=Issues). Hopefully.