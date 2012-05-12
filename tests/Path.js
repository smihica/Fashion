var Fashion = require('../fashion.js');
var fs = require('fs');

(function (exports) {
var IMPL_old = null;

eval(fs.readFileSync(require.resolve('../src/constants.js'), 'utf-8'));

exports.Shape = {
  setUp: function (callback) {
    IMPL_old = Fashion.IMPL;
    Fashion.IMPL = {
      Drawable: function() {
        this.append = this.remove = this.refresh = function(shape) {
          // do nothing;
        };
      },
      Path: function() {
        this.refresh = function(dirty) {
          this.dirty = dirty;
        };
      }
    }
    callback();
  },

  tearDown: function(callback) {
    Fashion.IMPL = IMPL_old;
    callback();
  },

  testInstantiatePath: function (test) {
    test.expect(3);
    test.ok(new Fashion.Path());
    var pathData = new Fashion.PathData();
    var shape = new Fashion.Path({ points: pathData })
    test.deepEqual(pathData, shape.points());
    try {
      new Fashion.Path({ blah: null });
      test.fail();
    } catch (e) {
      if (!e instanceof Fashion.ArgumentError)
        throw e;
      test.ok(true);
    }
    test.done();
  },

  testUnboundPath: function (test) {
    test.expect(3);
    var shape = new Fashion.Path();
    var pathData = new Fashion.PathData();
    test.equal(null, shape.drawable);
    var initialDirty = shape._dirty;
    shape.points(pathData);
    test.deepEqual(pathData, shape.points());
    test.equal(DIRTY_SHAPE, shape._dirty ^ initialDirty);
    test.done();
  },

  testBoundPath: function (test) {
    test.expect(3);
    var drawable = new Fashion.Drawable(null, { viewportSize: { x: 100, y: 100 } });
    var shape = new Fashion.Path();
    var initialDirty = shape._dirty;
    drawable.draw(shape);
    test.equal(drawable, shape.drawable);
    shape.points(new Fashion.PathData());
    test.equal(0, shape._dirty);
    test.equal(DIRTY_SHAPE, shape.impl.dirty ^ initialDirty);
    test.done();
  }
};
})(exports);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
