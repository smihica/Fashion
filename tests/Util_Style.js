var Fashion = require('../fashion.js');

exports.Util_Style = {
  testConvertStrokeString: function(test) {
    test.expect(6);
    test.deepEqual(Fashion.Util.Style.convertStrokeString("#CCC"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: null, pattern: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC "),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: null, pattern: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC 10"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC 10 "),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC  10 --__"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: [ 2, 2 ] });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC    100 -_--_"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 100, pattern: [ 1, 1, 2, 1 ] });
    test.done();
  },

  testConvertColorString: function(test) {
    test.expect(5);
    test.deepEqual(Fashion.Util.Style.convertColorString("#ccc"), { r: 204, g: 204, b: 204, a: 255 });
    test.deepEqual(Fashion.Util.Style.convertColorString("#FFFFFF"), { r: 255, g: 255, b: 255, a: 255 });
    test.deepEqual(Fashion.Util.Style.convertColorString("#7F7F7F00"), { r: 127, g: 127, b: 127, a: 0 });
    test.deepEqual(Fashion.Util.Style.convertColorString("white"), { r: 255, g: 255, b: 255, a: 255 });
    test.deepEqual(Fashion.Util.Style.convertColorString("aqua"), { r: 0, g: 255, b: 255, a: 255 });
    test.done();
  }
};
