# parse-german

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A natural language parser for the German language, that produces [nlcst][]. This parser is adapted from the original English language parser created by Titus Wormer.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`ParseGerman()`](#parsegerman)
*   [Algorithm](#algorithm)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)
*   [Acknowledgement](#acknowledgement)

## What is this?

This package exposes a parser that takes German natural language and produces a syntax tree. It is an adaptation of the `parse-english` parser created by Titus Wormer.

## When should I use this?

If you need to handle German natural language as syntax trees manually, this is for you. It’s specifically tailored to handle the nuances and structures of the German language.

## Install

This package is ESM only. In Node.js (version 16+), install with npm:

```sh
npm install parse-german
```

In browsers with esm.sh:

```html
<script type="module">
  import {ParseGerman} from 'https://esm.sh/parse-german?bundle'
</script>
```

## Use

Example usage of the parser:

```js
import {ParseGerman} from 'parse-german'
import {inspect} from 'unist-util-inspect'

const tree = new ParseGerman().parse('Dies ist ein einfacher deutscher Satz.')

console.log(inspect(tree))
```

## API

### `ParseGerman()`

Create a new parser for the German language. Adapted from the `ParseEnglish` parser, and extends `ParseLatin`.

## Algorithm

Incorporates all features of `parse-latin`, with additional support for German language-specific elements.

## Types

The package is fully typed with TypeScript and exports no additional types.

## Compatibility

Compatible with maintained versions of Node.js.

## Security

This package is safe to use.

## Related

*   [`parse-latin`](https://github.com/wooorm/parse-latin)
*   [`parse-english`](https://github.com/wooorm/parse-english)
*   [`parse-dutch`](https://github.com/wooorm/parse-dutch)

## Contribute

Contributions are welcome! See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Dennis Ollhoff][nyxb]

## Acknowledgement

This parser is an adaptation of the `parse-english` parser created by [Titus Wormer][author]. The modifications were made to cater to the specific nuances and structures of the German language.

<!-- Definitions -->

[build-badge]: https://img.shields.io/badge/build-passing-brightgreen

[build]: https://github.com/nyxb/parse-german/actions

[coverage-badge]: https://img.shields.io/badge/coverage-100%25-brightgreen

[coverage]: https://codecov.io/gh/nyxb/parse-german

[downloads-badge]: https://img.shields.io/badge/downloads-100%2B-brightgreen

[downloads]: https://npmjs.com/package/parse-german

[size-badge]: https://img.shields.io/badge/size-10kB-brightgreen

[size]: https://bundlephobia.com/result?p=parse-german

[nyxb]: https://github.com/nyxb

[contribute]: https://opensource.guide/how-to-contribute/

[license]: LICENSE

[author]: https://wooorm.com

[nlcst]: https://github.com/syntax-tree/nlcst

```
```
