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