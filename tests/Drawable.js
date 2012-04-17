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

  testDraw: function(test) {
    test.expect(3);
    var d = new Fashion.Drawable();
    test.equals(d.draw({ __id: null }).__id, 'G' + d._id_acc);
    test.equals(d.draw({ __id: null }).__id, 'G' + d._id_acc);
    test.equals(d.draw({ __id: null }).__id, 'G' + d._id_acc);
    test.done();
  }
};

})(exports);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
