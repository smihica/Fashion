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

  testStyleWithString: function(test) {
    test.expect(3);
    var x = new Fashion.Style("fill: #00ff00; stroke: #0000ff; stroke-width: 0.172");
    test.deepEqual(new Fashion.Color(0, 255, 0,   255), x.fill.color); 
    test.deepEqual(new Fashion.Color(0, 0,   255, 255), x.stroke.color); 
    test.equal(.172, x.stroke.width); 
    test.done();
  }
};

