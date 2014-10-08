'use strict';

var so = require('..');

var foo = so(function*(){ return 'foo'; });
var bar = so(function*(){ return 'bar'; });
var baz = so(function*(){ throw new Error('Sentinel'); });

var rec = so(function*(n){ return n === 0 ? 0 : 1 + (yield rec(n-1)); });

describe('so', function(){
  it('should return a function',function(){
    foo.should.be.a.Function;
  });
  it('should be composable', function(){
    var foobar = so(function*(){
      var a = yield foo();
      var b = yield bar();
      return a + b;
    });
    return foobar().should.become('foobar');
  });
  it('should support immediate recursion and be reasonably fast', function(){
    var n = 10000;
    return rec(n).should.become(n);
  });
  it('should preserve `this` context', function(){
    var obj = {
      value: 'baz',
      getIt: so(function*(){
        return this.value;
      })
    };
    return obj.getIt().should.become('baz');
  });
  describe('when used with `throw`', function(){
    it('should propagate immediate exceptions', function() {
      return baz().should.be.rejectedWith(Error,'Sentinel');
    });
    it('should handle nested exceptions with `try/catch`', function(){
      var foobarbaz = so(function*(){
        try {
          yield foo();
          yield bar();
          yield baz(); // will throw
        } catch (e) {
          return 'handled';
        }
      });
      return foobarbaz().should.become('handled');
    });
    it('should propagate nested exceptions', function(){
      var foobarbaz = so(function*(){
        yield foo();
        yield bar();
        yield baz();
      });
      return foobarbaz().should.be.rejectedWith(Error,'Sentinel');
    });
  });
  describe('result',function(){
    it('should return a promise', function(){
      foo().should.have.a.property('then').that.is.a.Function;
    });
    it('should be resolved into correct result', function(){
      return foo().should.become('foo');
    });
  });
});
