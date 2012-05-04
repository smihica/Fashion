var Fashion = require('../fashion.js');

exports.PathData = {
  testInitStringMoveToBasic: function(test) {
    test.expect(4);
    var pathData = new Fashion.PathData("M 1 2");
    test.equal(pathData.length, 1);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.done();
  },

  testInitStringMoveToImplicitLineTo: function(test) {
    test.expect(7);
    var pathData = new Fashion.PathData("M 1 2 3 4");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'L');
    test.equal(pathData[1][1], 3.);
    test.equal(pathData[1][2], 4.);
    test.done();
  },

  testInitStringMoveToInsufficientArguments: function(test) {
    test.expect(3);
    try {
      var pathData = new Fashion.PathData("M");
      test.ok(false);
    } catch (e) {
      test.equal(e.name, 'ValueError');
    }
    try {
      var pathData = new Fashion.PathData("M 0");
      test.ok(false);
    } catch (e) {
      test.equal(e.name, 'ValueError');
    }
    try {
      var pathData = new Fashion.PathData("M 0 0 0");
      test.ok(false);
    } catch (e) {
      test.equal(e.name, 'ValueError');
    }
    test.done();
  },

  testInitStringMoveToRelBasic: function(test) {
    test.expect(4);
    var pathData = new Fashion.PathData("m 1 2");
    test.equal(pathData.length, 1);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.done();
  },

  testInitStringMoveToRelImplicitLineTo: function(test) {
    test.expect(10);
    var pathData = new Fashion.PathData("m 1 2 3 4 5 6");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'L');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[2][0], 'L');
    test.equal(pathData[2][1], 9.);
    test.equal(pathData[2][2], 12.);
    test.done();
  },

  testInitStringLineTo: function(test) {
    test.expect(7);
    var pathData = new Fashion.PathData("L 1 2 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'L');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringLineToRel: function(test) {
    test.expect(10);
    var pathData = new Fashion.PathData("M 1 2 l 3 4 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'L');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringCurveToSmoothQB: function(test) {
    test.expect(7);
    var pathData = new Fashion.PathData("T 1 2 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'T');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringCurveToSmoothQBRel: function(test) {
    test.expect(10);
    var pathData = new Fashion.PathData("M 1 2 t 3 4 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'T');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringCurveToCR: function(test) {
    test.expect(7);
    var pathData = new Fashion.PathData("T 1 2 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'T');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringCurveToCRRel: function(test) {
    test.expect(10);
    var pathData = new Fashion.PathData("M 1 2 t 3 4 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'T');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringCurveToSmooth: function(test) {
    test.expect(9);
    var pathData = new Fashion.PathData("S 1 2 3 4 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'S');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[0][3], 3.);
    test.equal(pathData[0][4], 4.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringCurveToSmoothRel: function(test) {
    test.expect(12);
    var pathData = new Fashion.PathData("M 1 2 s 3 4 5 6 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'S');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[1][3], 6.);
    test.equal(pathData[1][4], 8.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringCurveToQB: function(test) {
    test.expect(9);
    var pathData = new Fashion.PathData("Q 1 2 3 4 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'Q');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[0][3], 3.);
    test.equal(pathData[0][4], 4.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringCurveToQBRel: function(test) {
    test.expect(12);
    var pathData = new Fashion.PathData("M 1 2 q 3 4 5 6 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'Q');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[1][3], 6.);
    test.equal(pathData[1][4], 8.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringCurveTo: function(test) {
    test.expect(11);
    var pathData = new Fashion.PathData("C 1 2 3 4 5 6 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'C');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[0][3], 3.);
    test.equal(pathData[0][4], 4.);
    test.equal(pathData[0][5], 5.);
    test.equal(pathData[0][6], 6.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringCurveToRel: function(test) {
    test.expect(14);
    var pathData = new Fashion.PathData("M 1 2 c 3 4 5 6 7 8 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'C');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[1][3], 6.);
    test.equal(pathData[1][4], 8.);
    test.equal(pathData[1][5], 8.);
    test.equal(pathData[1][6], 10.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  },

  testInitStringArc: function(test) {
    test.expect(12);
    var pathData = new Fashion.PathData("A 1 2 3 4 5 6 7 m 0 0");
    test.equal(pathData.length, 2);
    test.equal(pathData[0][0], 'A');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[0][3], 3.);
    test.equal(pathData[0][4], 4.);
    test.equal(pathData[0][5], 5.);
    test.equal(pathData[0][6], 6.);
    test.equal(pathData[0][7], 7.);
    test.equal(pathData[1][0], 'M');
    test.equal(pathData[1][1], 0.);
    test.equal(pathData[1][2], 0.);
    test.done();
  },

  testInitStringArcRel: function(test) {
    test.expect(15);
    var pathData = new Fashion.PathData("M 1 2 a 3 4 5 6 7 8 9 m 0 0");
    test.equal(pathData.length, 3);
    test.equal(pathData[0][0], 'M');
    test.equal(pathData[0][1], 1.);
    test.equal(pathData[0][2], 2.);
    test.equal(pathData[1][0], 'A');
    test.equal(pathData[1][1], 4.);
    test.equal(pathData[1][2], 6.);
    test.equal(pathData[1][3], 5.);
    test.equal(pathData[1][4], 6.);
    test.equal(pathData[1][5], 7.);
    test.equal(pathData[1][6], 9.);
    test.equal(pathData[1][7], 11.);
    test.equal(pathData[2][0], 'M');
    test.equal(pathData[2][1], 0.);
    test.equal(pathData[2][2], 0.);
    test.done();
  }
};

/*
 * vim: sts=2 sw=2 ts=2 et
 */
