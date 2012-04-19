var Fashion = require('../fashion.js');

(function(exports) {
var IMPL_old = null;

exports.group = {
  setUp: function(callback) {
    IMPL_old = Fashion.IMPL;
    Fashion.IMPL = {
      Drawable: function() {
        this.append = this.remove = function(shape) {
          // do nothing;
        };
      }
    }
    callback();
  },

  tearDown: function(callback) {
    Fashion.IMPL = IMPL_old;
    callback();
  },

  testInstantiate: function(test) {
    test.expect(1);
    test.ok(new Fashion.Drawable());
    test.done();
  },

  testNumElements: function(test) {
    test.expect(4);
    var d = new Fashion.Drawable();
    test.equals(0, d.numElements());
    d.draw({});
    test.equals(1, d.numElements());
    d.draw({});
    test.equals(2, d.numElements());
    d.draw({});
    test.equals(3, d.numElements());
    test.done();
  },

  testDraw: function(test) {
    test.expect(3);
    var d = new Fashion.Drawable();
    test.equals(d.draw({}).__id, 'G' + d._id_acc);
    test.equals(d.draw({}).__id, 'G' + d._id_acc);
    test.equals(d.draw({}).__id, 'G' + d._id_acc);
    test.done();
  },

  testEach: function(test) {
    test.expect(1);
    var d = new Fashion.Drawable();
    var shapes = [ d.draw({ a:0, b:'a' }), d.draw({ a:1, b:'b' }), d.draw({ a:2, b:'c' }) ];
    var rt = '';
    d.each(function(shape) { if (shape.a >= 1) rt += shape.b; });
    test.equals(rt, 'bc');
    test.done();
  },

  testFind:  function(test) {
    test.expect(3);
    var d = new Fashion.Drawable();
    var s1 = d.draw({ a:0, b:'a' });
    var s2 = d.draw({ a:1, b:'b' });
    var s3 = d.draw({ a:2, b:'c' });
    // found
    var _s = d.find(function(shape) { return shape.b === 'c'; });
    test.deepEqual(s3, _s);
    // returns first
    _s = d.find(function(shape) { return 1 <= shape.a; });
    test.deepEqual(s2, _s);
    // notfound == null
    _s = d.find(function(shape) { return 10 <= shape.a; });
    test.equals(null, _s);
    test.done();
  },

  testCollect: function(test) {
    test.expect(2);
    var d = new Fashion.Drawable();
    var s0 = d.draw({a:0}), s1 = d.draw({a:1}), s2 = d.draw({a:2}), s3 = d.draw({a:3});
    // get even
    var even_shapes = d.collect(function(shape) { return (shape.a % 2) == 0; });
    test.deepEqual(even_shapes, [s0, s2]);
    // notfound == []
    var shapes = d.collect(function(shape) { return (shape.a > 10); });
    test.deepEqual(shapes, []);

    test.done();
  },

  testMap:function(test) {
    test.expect(2);
    var d = new Fashion.Drawable();
    var s0 = d.draw({a:0,b:'a'}), s1 = d.draw({a:1,b:'b'});
    var s2 = d.draw({a:2,b:'c'}), s3 = d.draw({a:3,b:'d'});
    d = d.map(function(s) { s.a += 1; return s } ).map(function(s) { s.a *= 10; s.b += "\n"; return s } );
    test.equals(s2.a, 30);
    test.equals(s3.b, "d\n");
    test.done();
  },

  testErase: function(test) {
    test.expect(5);
    var d = new Fashion.Drawable();
    var a = d.draw({ a:0 }), b = d.draw({ a:1 }), c = d.draw({ a:2 });
    test.equals(d.numElements(), 3);
    d.erase(a);
    test.equals(d.numElements(), 2);
    d.erase(a);
    test.equals(d.numElements(), 2);
    d.erase(b);
    test.equals(d.numElements(), 1);
    d.erase(c);
    test.equals(d.numElements(), 0);
    test.done();
  }
};

})(exports);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
