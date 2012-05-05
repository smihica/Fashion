var Fashion = require('../fashion.js');

exports._lib_misc = {
  test_atomic_p: function(test) {
    test.expect(8);
    test.ok(Fashion._lib._atomic_p(null), 'null');
    test.ok(Fashion._lib._atomic_p(undefined), 'undefined');
    test.ok(Fashion._lib._atomic_p(false), 'false');
    test.ok(Fashion._lib._atomic_p(12), 'fixnum');
    test.ok(Fashion._lib._atomic_p(190.03), 'float');
    test.ok(Fashion._lib._atomic_p("hoge"), 'string');
    test.strictEqual(Fashion._lib._atomic_p(new Date()), false, 'date');
    test.strictEqual(Fashion._lib._atomic_p({a: "b", c: "d"}), false, 'object');
    test.done();
  },

  test_clone_plain: function(test) {
    test.expect(9);

    // plain clone
    var x = "hoge";
    var y = Fashion._lib._clone(x);
    test.strictEqual(x, y);
    var x = {a: "b", b: "c", t: new Date()};
    var y = Fashion._lib._clone(x);
    test.deepEqual(x, y);
    test.notStrictEqual(x, y);
    var f = function(x){return x+10};
    f.a = function(y){return y-10};
    f.b = function(){return this-10};
    var x = {f: f};
    var y = Fashion._lib._clone(x);
    test.notStrictEqual(x.f , y.f);
    test.strictEqual(x.f(10), y.f(10));
    test.notStrictEqual(x.f.a , y.f.a);
    test.notStrictEqual(x.f.b , y.f.b);
    test.strictEqual(x.f.a(10), y.f.a(10));
    test.strictEqual(x.f.b.call(100), y.f.b.call(100));

    test.done();
  },

  test_clone_combine_basic: function(test) {
    test.expect(9);

    var x = {a: "b", b: 123, g: true};
    var y = {a: "c", b: 224, e: false};
    var z = Fashion._lib._clone(y, x);
    test.deepEqual(x, {a: "c", b: 224, g: true, e: false});
    test.strictEqual(x, z);

    var x = {a: "b", b: {c: "aaa", d: {e: "fff"}}};
    var y = {a: "c", b: {c: "ccc", d: {e: "ddd"}}};
    var z = Fashion._lib._clone(y, x);
    test.deepEqual(x, {a: "c", b: {c: "ccc", d: {e: "ddd"}}});
    test.strictEqual(x, z);
    test.notStrictEqual(x, y);
    test.notStrictEqual(x.b, y.b);
    test.notStrictEqual(x.b.d, y.b.d);
    test.strictEqual(x.b, z.b);
    test.strictEqual(x.b.d, z.b.d);

    test.done();
  },

  test_clone_combine_date: function(test) {
    test.expect(6);

    var xday = new Date("2011/1/1");
    var yday = new Date("2012/1/1");
    xday.piyo = "piyo";
    xday.hoge = "hoge";
    yday.hoge = "egoh";
    yday.huga = "huga";
    var x = {a: xday};
    var y = {a: yday};
    var z = Fashion._lib._clone(y, x);

    test.notStrictEqual(z.a,y.a);
    test.strictEqual(z.a.toString(),y.a.toString());
    test.notStrictEqual(z.a, xday);
    test.strictEqual(z.a.hoge, "egoh");
    test.strictEqual(z.a.huga, "huga");
    test.strictEqual(z.a.piyo, "piyo");

    test.done();
  },

  test_clone_combine_function: function(test) {
    test.expect(12);

    var y = {a: function(a){return this*a*a}};
    var x = {a: {}};
    var z = Fashion._lib._clone(y, x);

    test.strictEqual(z, x, "1");
    test.notStrictEqual(y.a, z.a, "2");
    test.strictEqual(z.a.call(2, 3), y.a.call(2, 3), "3");

    var xfun = function(a){return this*a*a};
    var yfun = function(a){return this/a/a};

    xfun.x = "aho";
    xfun.y = "gmi";
    xfun.z = function(b){return b*b};
    xfun.a = function(a){return a+a};

    yfun.y = "moe";
    yfun.z = function(c){return c/c};

    var y = {a: yfun};
    var x = {a: xfun};
    var z = Fashion._lib._clone(y, x);

    test.strictEqual(z, x, "4");
    test.notStrictEqual(z.a, y.a, "5");
    test.strictEqual(z.a.call(2,3), y.a.call(2,3), "6");
    test.strictEqual(z.a.x, "aho", "7");
    test.strictEqual(z.a.y, "moe", "8");
    test.strictEqual(z.a.a, x.a.a, "9");
    test.strictEqual(z.a.a(10), x.a.a(10), "10");
    test.notStrictEqual(z.a.z, y.a.z, "11");
    test.strictEqual(z.a.z(10), y.a.z(10), "12");

    test.done();
  },

  testxparseInt: function(test) {
    test.expect(0);
    test.done();
  },

  test_repeat: function(test) {
    test.expect(0);
    test.done();
  },

  test_lpad: function(test) {
    test.expect(0);
    test.done();
  },

  test_clip: function(test) {
    test.expect(3);
    test.strictEqual(0, Fashion._lib._clip(-10, 0, 100));
    test.strictEqual(100, Fashion._lib._clip(300, 0, 100));
    test.strictEqual(50, Fashion._lib._clip(50, 0, 100));
    test.done();
  }

};
