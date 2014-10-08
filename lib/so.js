'use strict';

/**
 * Module dependencies
 */

var Promise = require('bluebird');
var asap = require('asap');

/**
 * Expose `async`
 */

exports = module.exports = async;

/**
 * Converts `makeGenerator` generator function
 * into function that returns a promise while handling
 * all `yield` calls in the body as blocking promises.
 * Based on ForbesLindesay's presentation with slight modification
 * http://pag.forbeslindesay.co.uk/#/
 *
 * @param {GeneratorFunction} makeGenerator
 * @return {Function::arguments -> Promise}
 *
 * @api public
 */

function async(makeGenerator) {
  return function() {
    var generator = makeGenerator.apply(this, arguments);
    function handle(result) {
      if (result.done) return result.value;
      return result.value.then(function (res) {
        return handle(generator.next(res));
      }, function (err) {
        return handle(generator.throw(err));
      });
    }
    return new Promise(function (fulfill, reject) {
      asap(function(){
        try {
          fulfill(handle(generator.next()));
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}