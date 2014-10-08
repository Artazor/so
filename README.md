So,
===

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]

The most straightforward co-routine library for Node.JS ever.
Provides predictable composable async/await (async/yield) style
co-routines for everyday use since you can live in a Harmony.

Inspired by @ForbesLindesay's great presentation: http://pag.forbeslindesay.co.uk/#/
and @visionmedia `co` (`so` is an alternative to `co` but not the drop-in replacement)

## Installation

```
$ npm install so
```

## Usage

```javascript

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

[npm-image]: https://img.shields.io/npm/v/so.svg?style=flat
[npm-url]: https://npmjs.org/package/so
[travis-image]: https://img.shields.io/travis/Artazor/so.svg?style=flat
[travis-url]: https://travis-ci.org/Artazor/so
[coveralls-image]: https://img.shields.io/coveralls/Artazor/so.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Artazor/so