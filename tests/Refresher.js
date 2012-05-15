var Fashion = require('../fashion.js');

exports.Refresher = {
  testInstantiate: function (test) {
    test.expect(1);
    test.ok(new Fashion.Backend.Refresher);
    test.done();
  },

  testSetup: function (test) {
    test.expect(5);
    var refresher = new Fashion.Backend.Refresher;
    var result = null;
    refresher.setup({
      preHandler: function () { result.push('pre'); },
      postHandler: function () { result.push('post'); },
      handlers: [
        [ 1, function () { result.push(1) } ],
        [ 2, function () { result.push(2) } ]
      ],
      moreHandlers: [
        [ 4, function () { result.push(4) } ],
        [ 8, function () { result.push(8) } ],
        [ 16, function () { result.push(16) } ]
      ]
    });
    for (var i = 1; i <= 16; i <<= 1) {
      result = [];
      refresher.call(null, i);
      test.deepEqual(['pre', i, 'post'], result);
    }
    test.done();
  }
};

/*
 * vim: sts=2 sw=2 ts=2 et
 */

