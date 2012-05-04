var Fashion = require('../fashion.js');

exports.Stroke = {
  testStroke: function(test) {
    test.expect(6);
    test.deepEqual(new Fashion.Stroke("#CCC"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: null, pattern: null });
    test.deepEqual(new Fashion.Stroke(" #CCC "),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: null, pattern: null });
    test.deepEqual(new Fashion.Stroke(" #CCC 10"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: null });
    test.deepEqual(new Fashion.Stroke(" #CCC 10 "),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: null });
    test.deepEqual(new Fashion.Stroke(" #CCC  10 --__"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 10, pattern: [ 2, 2 ] });
    test.deepEqual(new Fashion.Stroke(" #CCC    100 -_--_"),
                   { color: { r: 204, g: 204, b: 204, a: 255 }, width: 100, pattern: [ 1, 1, 2, 1 ] });
    test.done();
  }
};
