var Fashion = require('../fashion.js');

(function(exports) {
var IMPL_old = null;

exports.group = {
  setUp: function(callback) {
    IMPL_old = Fashion.IMPL;
    Fashion.IMPL = {
      Drawable: function() {
        this.append = function(shape) {
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

  testMap1: function(test) {
    test.expect(1);
    var d = new Fashion.Drawable();
    var shapes = [ d.draw({}), d.draw({}), d.draw({}) ];
    var _shapes = d.map(function(shape) { return shape; });
    test.deepEqual(_shapes, shapes);
    test.done();
  },

  testMap2: function(test) {
    test.expect(1);
    var d = new Fashion.Drawable();
    var shapes = [ d.draw({ a:0 }), d.draw({ a:1 }), d.draw({ a:2 }) ];
    var _shapes = d.map(function(shape) { return shape.a != 1 ? shape.a: void(0); });
    test.deepEqual(_shapes, [ 0, 2 ]);
    test.done();
  }
};

})(exports);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
