var Fashion = require('../fashion.js');

exports._lib_MultipleKeyHash = {
  test_basic: function(test) {
    test.expect(15);

    var hash = new Fashion._lib.MultipleKeyHash();
    var key1 = function(x,y) { return x*y };
    var val1 = function(x,y) { return key1(x, y); };
    var key2 = function(x,y) { return x/y };
    var val2 = function(x,y) { return key2(x, y); };
    var key3 = function(x,y) { return x+y };
    var val3 = function(x,y) { return key3(x, y); };
    var key4 = function(x,y) { return x-y };
    var val4 = function(x,y) { return key4(x, y); };

    var key_dummy = function(x,y) { return 0 };

    hash.put(key1, val1);
    hash.put(key2, val2);
    hash.put(key3, val3);
    hash.put(key4, val4);

    test.strictEqual(hash.get(key1), val1);
    test.strictEqual(hash.get(key3), val3);
    test.strictEqual(hash.get(key4), val4);
    test.strictEqual(hash.get(key2), val2);
    test.strictEqual(hash.get(key_dummy), null);
    test.strictEqual(hash._src.length, 4);

    hash.erace(key2);

    test.strictEqual(hash.get(key2), null);
    test.strictEqual(hash._src.length, 3);

    test.throws(function(){
      hash.erace(key2)
    }, Fashion._lib.NotFound);

    var p = hash.pop(key3);

    test.strictEqual(hash.get(key3), null);
    test.strictEqual(hash._src.length, 2);
    test.strictEqual(p, val3);

    test.strictEqual(hash.pop(key3), null);

    var keys = hash.getAllKeys();
    var vals = hash.getAllValues();

    test.deepEqual(keys, [key1, key4]);
    test.deepEqual(vals, [val1, val4]);

    test.done();
  },

  test_arbitrary_copare_function: function(test) {
    test.expect(0);
    test.done();
  }
};
