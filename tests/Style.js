var Fashion = require('../fashion.js');

exports.Style = {
  testStyleWithoutArguments: function(test) {
    var x = new Fashion.Style();
    test.expect(2);
    test.equal(null, x.stroke);
    test.equal(null, x.fill);
    test.done();
  },

  testStyleWithAnObjectArgument: function(test) {
    test.expect(12);

    var fill = new Fashion.FloodFill(new Fashion.Color());
    var stroke = new Fashion.Stroke(new Fashion.Color(), 1, null);

    var x = new Fashion.Style(fill);
    test.equal(null, x.stroke);
    test.equal(fill, x.fill);

    var x = new Fashion.Style(stroke);
    test.equal(stroke, x.stroke);
    test.equal(null, x.fill);

    var x = new Fashion.Style({ fill: null, stroke: null });
    test.equal(null, x.stroke);
    test.equal(null, x.fill);

    var x = new Fashion.Style({ fill: fill, stroke: null });
    test.equal(null, x.stroke);
    test.equal(fill, x.fill);

    var x = new Fashion.Style({ fill: null, stroke: stroke });
    test.equal(stroke, x.stroke);
    test.equal(null, x.fill);

    var x = new Fashion.Style({ fill: fill, stroke: stroke });
    test.equal(stroke, x.stroke);
    test.equal(fill, x.fill);

    test.done();
  },

  testStyleWithMultipleObjectArguments: function(test) {
    test.expect(4);

    var fill = new Fashion.FloodFill(new Fashion.Color());
    var stroke = new Fashion.Stroke(new Fashion.Color(), 1, null);

    var x = new Fashion.Style(stroke, fill);
    test.equal(stroke, x.stroke);
    test.equal(fill, x.fill);

    var x = new Fashion.Style(fill, stroke);
    test.equal(stroke, x.stroke);
    test.equal(fill, x.fill);

    test.done();
  },

  testStyleOverride: function(test) {
    test.expect(8);
    var original = new Fashion.Style(
      new Fashion.FloodFill(new Fashion.Color(0, 0, 0)),
      new Fashion.Stroke(new Fashion.Color(0, 0, 0), null, null));
    test.deepEqual(new Fashion.Color(0, 0, 0), original.fill.color);
    test.deepEqual(new Fashion.Color(0, 0, 0), original.stroke.color);
    test.equal(null, original.stroke.width);
    test.equal(null, original.stroke.pattern);
    var overridden = original.override(new Fashion.Style(
      new Fashion.FloodFill(),
      new Fashion.Stroke(new Fashion.Color(1, 1, 1), 1, 'pattern')));
    test.deepEqual(new Fashion.Color(0, 0, 0), overridden.fill.color);
    test.deepEqual(new Fashion.Color(1, 1, 1), overridden.stroke.color);
    test.equal(1, overridden.stroke.width);
    test.equal('pattern', overridden.stroke.pattern);
    test.done();
  }
};

