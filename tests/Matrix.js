var Fashion = require('../fashion.js');

exports.Matrix = {
  testInstantiateScale: function (test) {
    test.expect(6);
    var matrix = Fashion.Util.Matrix.scale(1.);
    test.equal(1., matrix.a);
    test.equal(0., matrix.b);
    test.equal(0., matrix.c);
    test.equal(1., matrix.d);
    test.equal(0., matrix.e);
    test.equal(0., matrix.f);
    test.done();
  }
};

/*
 * vim: sts=2 sw=2 ts=2 et
 */
