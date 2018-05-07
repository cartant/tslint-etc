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