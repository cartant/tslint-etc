## Rules

**WARNING**: Before configuring any of the following rules, you should ensure that TSLint's `no-unused-variable` rule is **not** enabled in your configuration (or in any configuration that you extend). That rule [has caused problems in the past](https://github.com/cartant/rxjs-tslint-rules/issues/4) - as it leaves the TypeScript program in an unstable state - and has a [significant number of still-open issues](https://github.com/palantir/tslint/search?q=no-unused-variable&state=open&type=Issues&utf8=%E2%9C%93). Consider using this package's `no-unused-declaration` rule instead.

The package includes the following rules (none of which are enabled by default):

| Rule | Description | Fixer | Options |
| --- | --- | --- | --- |
| `ban-imports` | Disallows the use of banned imports. | No | [See below](#ban-imports) |
| `expect-deprecation` | Asserts deprecations with `$ExpectDeprecation` and `$ExpectNoDeprecation`. | No | None |
| `expect-type` | Asserts types with `$ExpectType` and presence of errors with `$ExpectError`. | No | None |
| `no-assign-mutated-array` | Disallows the assignment of returned, mutated arrays. Useful for those times you forget that `sort` and `reverse` mutate the array upon which they are called. | No | None |
| `no-const-enum` | Disallows the use of `const enum`. Constant enums are not compatible with isolated modules. | No | [See below](#no-const-enum) |
| `no-dtslint-typo` | Disallows [dtslint](https://github.com/Microsoft/dtslint)-like expectations that have typographical errors. | No | None |
| `no-enum` | Disallows the use of `enum`. | No | None |
| `no-unsafe-callback-scope` | Disallows the use of variables/properties from unsafe/outer scopes in callbacks. | No | [See below](#no-unsafe-callback-scope) |
| `no-unused-declaration` | Disallows unused declarations. | Yes, but [see below](#no-unused-declaration) | [See below](#no-unused-declaration) |
| `throw-error` | Enforces the use of `Error` values when throwing or rejecting. | No | None |

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

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-103034213-2', 'auto');
    ga('send', 'pageview');
</script>
