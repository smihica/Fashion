var fs = require('fs');
eval(fs.readFileSync(require.resolve('../src/lib/misc.js'), 'utf-8'));
eval(fs.readFileSync(require.resolve('../src/lib/classify.js'), 'utf-8'));
eval(fs.readFileSync(require.resolve('../src/lib/error.js'), 'utf-8'));
eval(fs.readFileSync(require.resolve('../src/lib/MultipleKeyHash.js'), 'utf-8'));
exports._lib_MultipleKeyHash = {
  test_basic: function(test) {
    test.expect(15);

    var hash = new MultipleKeyHash();
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
    }, NotFound);

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

    var hash = new MultipleKeyHash(function(k1, k2){
      return (k1.a === k2.a && k1.b === k2.b && k1.c === k2.c );
    });

    var key1 = {a: "a", b: "b", c: "c"};
    var key2 = {a: "d", b: "e", c: "f"};
    var key3 = {a: "g", b: "h", c: "i"};

    test.done();
  }
};
