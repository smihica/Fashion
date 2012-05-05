var Fashion = require('../fashion.js');

exports.Color = {
  testColor: function(test) {
    test.expect(9);
    test.deepEqual(new Fashion.Color(0, 1, 2), { r: 0, g: 1, b: 2, a: 255 });
    test.deepEqual(new Fashion.Color(0, 1, 2, 3), { r: 0, g: 1, b: 2, a: 3 });
    test.deepEqual(new Fashion.Color("#ccc"), { r: 204, g: 204, b: 204, a: 255 });
    test.deepEqual(new Fashion.Color("#FFFFFF"), { r: 255, g: 255, b: 255, a: 255 });
    test.deepEqual(new Fashion.Color("#7F7F7F00"), { r: 127, g: 127, b: 127, a: 0 });
    test.deepEqual(new Fashion.Color("white"), { r: 255, g: 255, b: 255, a: 255 });
    test.deepEqual(new Fashion.Color("aqua"), { r: 0, g: 255, b: 255, a: 255 });
    test.deepEqual(new Fashion.Color("rgb(0, 0, 0)"), { r: 0, g: 0, b: 0, a: 255 });
    test.deepEqual(new Fashion.Color("rgba(0, 0, 0, 128)"), { r: 0, g: 0, b: 0, a: 128 });
    test.done();
  }
};
