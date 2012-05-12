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
      Text: function() {
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

  testInstantiateText: function (test) {
    test.expect(5);
    test.ok(new Fashion.Text());
    var shape = new Fashion.Text({ text: "text" })
    test.equal("text", shape.text());
    var shape = new Fashion.Text({ fontSize: 10 })
    test.equal(10, shape.fontSize());
    var shape= new Fashion.Text({ fontFamily: "sans" })
    test.equal("sans", shape.fontFamily());
    try {
      new Fashion.Text({ blah: null });
      test.fail();
    } catch (e) {
      if (!e instanceof Fashion.ArgumentError)
        throw e;
      test.ok(true);
    }
    test.done();
  },

  testUnboundText: function (test) {
    test.expect(7);
    var shape = new Fashion.Text();
    test.equal(null, shape.drawable);
    var initialDirty = shape._dirty;
    shape.text("text");
    test.equal("text", shape.text());
    test.equal(DIRTY_SHAPE, shape._dirty ^ initialDirty);
    shape.fontSize(10);
    test.equal(10, shape.fontSize());
    test.equal(DIRTY_SHAPE, shape._dirty ^ initialDirty);
    shape.fontFamily("sans");
    test.equal("sans", shape.fontFamily());
    test.equal(DIRTY_SHAPE, shape._dirty ^ initialDirty);
    test.done();
  },

  testBoundText: function (test) {
    test.expect(9);
    var drawable = new Fashion.Drawable(null, { viewportSize: { x: 100, y: 100 } });
    var shape = new Fashion.Text();
    drawable.draw(shape);
    var initialDirty = shape._dirty;
    shape.text("text");
    test.equal("text", shape.text());
    test.equal(0, shape._dirty);
    test.equal(DIRTY_SHAPE, shape.impl.dirty ^ initialDirty);
    shape.fontSize(10);
    test.equal(0, shape._dirty);
    test.equal(DIRTY_SHAPE, shape.impl.dirty);
    test.equal(10, shape.fontSize());
    shape.fontFamily("sans");
    test.equal("sans", shape.fontFamily());
    test.equal(0, shape._dirty);
    test.equal(DIRTY_SHAPE, shape.impl.dirty);
    test.done();
  }
};
})(exports);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
