'use strict';

/**
 * Expose `so` (ES6 friedly)
 */

module.exports = so['default'] = so.so = so

/**
 * Converts `fn` generator function
 * into function that returns a promise while handling
 * all `yield` calls in the body as blocking promises.
 * Based on ForbesLindesay's presentation with slight modification
 * http://pag.forbeslindesay.co.uk/#/
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 *
 * @api public
 */

function so(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    try {
      return resolved();
    } catch (e) {
      return Promise.reject(e);
    }
    function resolved(res) { return next(gen.next(res)); }
    function rejected(err) { return next(gen.throw(err)); }
    function next(ret) {
      var val = ret.value;
      if (ret.done) {
        return Promise.resolve(val);
      } else if ('function' === typeof val.then) {
        return val.then(resolved, rejected);
      } else {
        throw new Error('Expected Promise');
      }
    }
  };
}