var Fashion = require('../fashion.js');

exports.Util_Style = {
  testConvertStrokeString: function(test) {
    test.expect(8);
    test.equal(Fashion.Util.Style.convertStrokeString(""), null);
    test.equal(Fashion.Util.Style.convertStrokeString("none"), null);
    test.deepEqual(Fashion.Util.Style.convertStrokeString("#CCC"),
                   { color: [ 204, 204, 204, null ], size: null, dash: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC "),
                   { color: [ 204, 204, 204, null ], size: null, dash: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC 10"),
                   { color: [ 204, 204, 204, null ], size: 10, dash: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC 10 "),
                   { color: [ 204, 204, 204, null ], size: 10, dash: null });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC  10 .._-.."),
                   { color: [ 204, 204, 204, null ], size: 10, dash: '.._-..' });
    test.deepEqual(Fashion.Util.Style.convertStrokeString(" #CCC    100 .._-.._---__"),
                   { color: [ 204, 204, 204, null ], size: 100, dash: '.._-.._---__'});
    test.done();
  },

  testConvertColorString: function(test) {
    test.expect(5);
    test.deepEqual(Fashion.Util.Style.convertColorString("#ccc"), [ 204, 204, 204, null ]);
    test.deepEqual(Fashion.Util.Style.convertColorString("#FFFFFF"), [ 255, 255, 255, null ]);
    test.deepEqual(Fashion.Util.Style.convertColorString("#7F7F7F00"), [ 127, 127, 127, 0 ]);
    test.deepEqual(Fashion.Util.Style.convertColorString("white"), [ 255, 255, 255, null ]);
    test.deepEqual(Fashion.Util.Style.convertColorString("aqua"), [ 0, 255, 255, null ]);
    test.done();
  }
};
