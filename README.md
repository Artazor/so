So
==

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]

The most straightforward co-routine library for Node.JS ever.
Provides predictable composable `async/await` from C#5.0 style
co-routines for everyday use since you can live in a Harmony.

Inspired by @ForbesLindesay's great presentation: http://pag.forbeslindesay.co.uk/#/
and @visionmedia [`co`](https://github.com/visionmedia/co).
As of `co-4.0` that was rewritten to use promises, `so-1.0` can be compared with `co.wrap`
and represents its more light and strict version.

## Platform Compatibility

  When using node 0.11.x or greater, you must use the `--harmony-generators`
  flag or just `--harmony` to get access to generators.

  When using node 0.10.x and lower or browsers without generator support,
  you must use [gnode](https://github.com/TooTallNate/gnode) and/or [regenerator](http://facebook.github.io/regenerator/).

  Also as of `so-1.0` you should ensure existence of Promise either by using `--harmony` or any available polyfill.

## Installation

```
$ npm install so
```

## Usage

```js

var so = require('so');
var fs = require('then-fs');

var readJSON = so(function*(path){
  return JSON.parse(yield fs.readFile(path, 'utf8'));
});

var main = so(function*(){
  var a = yield readJSON('a.json');
  var b = yield readJSON('b.json');
  console.log({a:a, b:b});
});

main().catch(function(e){
  console.log(e.stack || e.message || e);
});
```

or for CoffeeScript

```coffeescript
so = require 'so'
fs = require 'then-fs'

readJSON = so (path) ->
  JSON.parse yield fs.readFile path, 'utf8'

main = so ->
  a = yield readJSON 'a.json'
  b = yield readJSON 'b.json'
  console.log {a, b}

main().catch (e) ->
  console.log e.stack ? e.message ? e
```

[npm-image]: https://img.shields.io/npm/v/so.svg?style=flat
[npm-url]: https://npmjs.org/package/so
[travis-image]: https://img.shields.io/travis/Artazor/so.svg?style=flat
[travis-url]: https://travis-ci.org/Artazor/so
[coveralls-image]: https://img.shields.io/coveralls/Artazor/so.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Artazor/so
