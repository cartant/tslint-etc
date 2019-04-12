<a name="1.5.1"></a>
## [1.5.1](https://github.com/cartant/tslint-etc/compare/v1.5.0...v1.5.1) (2019-04-13)

## Fixes

* Support interfaces and type aliases in the `no-unused-declaration` rule. ([bdc71ba](https://github.com/cartant/tslint-etc/commit/bdc71ba))

<a name="1.5.0"></a>
## [1.5.0](https://github.com/cartant/tslint-etc/compare/v1.4.4...v1.5.0) (2019-03-31)

## Features

* Add an `allowLocal` option to the `no-const-enum` rule. ([1637c8d](https://github.com/cartant/tslint-etc/commit/1637c8d))

<a name="1.4.4"></a>
## [1.4.4](https://github.com/cartant/tslint-etc/compare/v1.4.3...v1.4.4) (2019-03-30)

## Fixes

* Don't delete imports more than once when fixing `no-unused-declaration` failures. ([a8b634d](https://github.com/cartant/tslint-etc/commit/a8b634d))

<a name="1.4.3"></a>
## [1.4.3](https://github.com/cartant/tslint-etc/compare/v1.4.2...v1.4.3) (2019-03-29)

## Fixes

* Allow removal of props via destructing with `no-unused-declaration` enabled. ([e0699a7](https://github.com/cartant/tslint-etc/commit/e0699a7))

<a name="1.4.2"></a>
## [1.4.2](https://github.com/cartant/tslint-etc/compare/v1.4.1...v1.4.2) (2019-03-29)

## Fixes

* Fix a problem with `no-unused-declaration` and `defaultProps`. ([2235987](https://github.com/cartant/tslint-etc/commit/2235987))

<a name="1.4.1"></a>
## [1.4.1](https://github.com/cartant/tslint-etc/compare/v1.4.0...v1.4.1) (2019-03-27)

## Fixes

* Don't use typed rules for `no-enum` and `no-const-enum`. ([58ac299](https://github.com/cartant/tslint-etc/commit/58ac299))

<a name="1.4.0"></a>
## [1.4.0](https://github.com/cartant/tslint-etc/compare/v1.3.2...v1.4.0) (2019-03-27)

## Features

* Add `no-enum` and `no-const-enum` rules. ([06f2f59](https://github.com/cartant/tslint-etc/commit/06f2f59))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/cartant/tslint-etc/compare/v1.3.1...v1.3.2) (2019-02-25)

## Fixes

* Allow throwing and rethrowing `any`. ([6146d14](https://github.com/cartant/tslint-etc/commit/6146d14))

<a name="1.3.1"></a>
## [1.3.1](https://github.com/cartant/tslint-etc/compare/v1.3.0...v1.3.1) (2019-02-23)

## Changes

* Replaced `util.ts` with `tsutils-etc`.

<a name="1.3.0"></a>
## [1.3.0](https://github.com/cartant/tslint-etc/compare/v1.2.12...v1.3.0) (2019-02-15)

## Features

* Added options to the `no-unused-declaration` rule. ([e592d9d](https://github.com/cartant/tslint-etc/commit/e592d9d))

<a name="1.2.12"></a>
## [1.2.12](https://github.com/cartant/tslint-etc/compare/v1.2.11...v1.2.12) (2018-12-24)

## Fixes

* The `no-unused-declaration` rule now supports overload signatures. ([a9fd1d8](https://github.com/cartant/tslint-etc/commit/a9fd1d8))
* The `no-unused-declaration` rule now supports hoisting functions into object shorthand. ([2bc3eb9](https://github.com/cartant/tslint-etc/commit/2bc3eb9))

<a name="1.2.11"></a>
## [1.2.11](https://github.com/cartant/tslint-etc/compare/v1.2.10...v1.2.11) (2018-12-22)

## Fixes

* `no-unsafe-callback-scope` rule now supports readonly, static class properties and parameter destructuring. ([85f0801](https://github.com/cartant/tslint-etc/commit/85f0801))

<a name="1.2.10"></a>
## [1.2.10](https://github.com/cartant/tslint-etc/compare/v1.2.9...v1.2.10) (2018-12-21)

## Fixes

* `no-unsafe-callback-scope` rule now considers `instanceof` constructors safe. ([604aee3](https://github.com/cartant/tslint-etc/commit/604aee3))

<a name="1.2.9"></a>
## [1.2.9](https://github.com/cartant/tslint-etc/compare/v1.2.8...v1.2.9) (2018-12-15)

## Fixes

* Apply fixes - from `rxjs-tslint-rules` - to `no-unsafe-callback-scope` rule. ([956d7fd](https://github.com/cartant/tslint-etc/commit/956d7fd))

<a name="1.2.8"></a>
## [1.2.8](https://github.com/cartant/tslint-etc/compare/v1.2.7...v1.2.8) (2018-12-14)

## Fixes

* Supported pre/postfix operators in the `no-unused-declaration` rule. ([788bb3a](https://github.com/cartant/tslint-etc/commit/788bb3a))

<a name="1.2.7"></a>
## [1.2.7](https://github.com/cartant/tslint-etc/compare/v1.2.6...v1.2.7) (2018-10-24)

## Features

* Added `no-assign-mutated-array` rule. ([c4e8504](https://github.com/cartant/tslint-etc/commit/c4e8504))

<a name="1.2.6"></a>
## [1.2.6](https://github.com/cartant/tslint-etc/compare/v1.2.5...v1.2.6) (2018-09-12)

## Features

* Added `no-missing-dollar-expect` for [dtslint](https://github.com/Microsoft/dtslint) expectations.

<a name="1.2.5"></a>
## [1.2.5](https://github.com/cartant/tslint-etc/compare/v1.2.4...v1.2.5) (2018-09-06)

## Fixes

* Fixed a problem with `no-unused-declaration` false positives when using functions and object-shorthand properties. ([2dcdfac](https://github.com/cartant/tslint-etc/commit/2dcdfac))
* Fixed a problem with `no-unused-declaration` false positives when using self-closing JSX elements. ([7948bc7](https://github.com/cartant/tslint-etc/commit/7948bc7))

<a name="1.2.4"></a>
## [1.2.4](https://github.com/cartant/tslint-etc/compare/v1.2.3...v1.2.4) (2018-09-01)

## Fixes

* Fixed a problem with `no-unused-declaration` false positives for exports. ([600ce3c](https://github.com/cartant/tslint-etc/commit/600ce3c))
* Fixed a problem with `no-unused-declaration` false positives for hoisted functions. ([5d17a2b](https://github.com/cartant/tslint-etc/commit/5d17a2b))
* Fixed a problem with `no-unused-declaration` false positives for JSX-related imports. ([a46596d](https://github.com/cartant/tslint-etc/commit/a46596d))

<a name="1.2.3"></a>
## [1.2.3](https://github.com/cartant/tslint-etc/compare/v1.2.2...v1.2.3) (2018-07-31)

## Build

* Widen TypeScript peer semver to allow for version 3.0. ([fb28cb1](https://github.com/cartant/rxjs-tslint-rules/commit/fb28cb1))

<a name="1.2.2"></a>
## [1.2.2](https://github.com/cartant/tslint-etc/compare/v1.2.1...v1.2.2) (2018-05-07)

## Fixes

* Fixed a problem in which the `no-unused-declaration` rule throw errors when inspecting variables typed as `any`. ([b07c760](https://github.com/cartant/tslint-etc/commit/b07c760))

<a name="1.2.1"></a>
## [1.2.1](https://github.com/cartant/tslint-etc/compare/v1.2.0...v1.2.1) (2018-05-07)

## Fixes

* Fixed a problem in which the `no-unused-declaration` rule did not recognise usage via object shorthand. ([cc86c2e](https://github.com/cartant/tslint-etc/commit/cc86c2e))

<a name="1.2.0"></a>
## [1.2.0](https://github.com/cartant/tslint-etc/compare/v1.1.0...v1.2.0) (2018-05-07)

## Features

* Added a fixer to the `no-unused-declaration` rule for unused imports. Other unused declarations must be fixed manually, as their automated removal would be considerably more destructive and could result in lost work.  ([95c221d](https://github.com/cartant/tslint-etc/commit/95c221d))

## Fixes

* The `no-unused-declaration` rule now detects unused default imports. ([cc70e40](https://github.com/cartant/tslint-etc/commit/cc70e40))

## Build

* The TSLint testing infrastructure is now used instead of Mocha. ([1076253](https://github.com/cartant/tslint-etc/commit/1076253))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/cartant/tslint-etc/compare/v1.0.1...v1.1.0) (2018-05-06)

## Features

* Added a `no-unused-declaration` rule. It's similar to TSLint's built-in [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) rule, but has a simpler implementation and fewer [problems](https://github.com/palantir/tslint/search?q=no-unused-variable&state=open&type=Issues). Hopefully.