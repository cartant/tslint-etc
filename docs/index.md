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

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-103034213-2', 'auto');
    ga('send', 'pageview');
</script>
