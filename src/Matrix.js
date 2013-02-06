var Matrix = (function() {

  var PI = Math.PI;

  var norm = function(a) {
    return ( a[0] * a[0] ) + ( a[1] * a[1] );
  };

  var normalize = function(a) {
    var mag = Math.sqrt(norm(a));
    a[0] && (a[0] /= mag);
    a[1] && (a[1] /= mag);
  };

  var _Matrix = _class("Matrix", {
    props: {
      a: 1, c: 0, e: 0,
      b: 0, d: 1, f: 0
    },

    class_methods: {
      translate: function (offset) {
        return new this(1, 0, 0, 1, offset.x, offset.y)
      },

      scale: function (degree, anchor) {
        if (anchor) {
          return new this(degree, 0, 0, degree, anchor.x, anchor.y)
                     .multiplyI(1, 0, 0, 1, -anchor.x, -anchor.y);
        } else {
          return new this(degree, 0, 0, degree, 0, 0);
        }
      },

      rotate: function (r, anchor) {
        var cos = Math.cos(r), sin = Math.sin(r);
        if (anchor) {
          return new this(cos, sin, -sin, cos, anchor.x, anchor.y)
                     .multiplyI(1, 0, 0, 1, -anchor.x, -anchor.y);
        } else {
          return new this(cos, sin, -sin, cos, 0, 0);
        }
      }
    },

    methods: {
      init: function (a, b, c, d, e, f) {
        if (arguments.length == 6) {
          this.a = +a; this.c = +c; this.e = +e;
          this.b = +b; this.d = +d; this.f = +f;
        } else if (arguments.length != 0) {
          throw new ArgumentError("0 or 6 arguments expected");
        }
      },

      equals: function (that) {
        return that != null &&
               this.a == that.a && this.b == that.b && this.c == that.c &&
               this.d == that.d && this.e == that.e && this.f == that.f;
      },

      multiplyI: function (a2, b2, c2, d2, e2, f2) {
        return new this.constructor(
          this.a * a2 + this.c * b2,
          this.b * a2 + this.d * b2,
          this.a * c2 + this.c * d2,
          this.b * c2 + this.d * d2,
          this.a * e2 + this.c * f2 + this.e,
          this.b * e2 + this.d * f2 + this.f
        );
      },

      multiply: function (that) {
        return new this.constructor(
          this.a * that.a + this.c * that.b,
          this.b * that.a + this.d * that.b,
          this.a * that.c + this.c * that.d,
          this.b * that.c + this.d * that.d,
          this.a * that.e + this.c * that.f + this.e,
          this.b * that.e + this.d * that.f + this.f
        );
      },

      invert: function () {
        var me = this,
        x = me.a * me.d - me.b * me.c;
        return new this.constructor(
          me.d / x, -me.b / x, -me.c / x,
          me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
      },

      translate: function (offset) {
        if (offset ===  void(0))
          return { x: this.e, y: this.f };
        return this.multiplyI(1, 0, 0, 1, offset.x, offset.y);
      },

      scale: function (degree, anchor) {
        if (anchor) {
          return this.multiplyI(degree, 0, 0, degree, anchor.x, anchor.y)
                     .multiplyI(1, 0, 0, 1, -cx, -cy);
        } else {
          return this.multiplyI(degree, 0, 0, degree, 0, 0);
        }
      },

      rotate:  function (r, anchor) {
        var cos = Math.cos(r), sin = Math.sin(r);
        if (anchor) {
          return this.multiplyI(cos, sin, -sin, cos, x, y)
                     .multiplyI(1, 0, 0, 1, -x, -y);
        } else {
          return this.multiplyI(cos, sin, -sin, cos, 0, 0);
        }
      },

      isUnit: function () {
        return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1;
      },

      isScaling: function() {
        return this.b == 0 && this.c == 0 && { x: this.a, y: this. d } || null;
      },

      apply: function(p) {
        return { x: (p.x * this.a) + (p.y * this.c) + this.e,
                 y: (p.x * this.b) + (p.y * this.d) + this.f };
      },

      get: function (i) {
        return this[String.fromCharCode(97 + i)];
      },

      toString: function () {
        return '{ ' + this.a + ', ' + this.b + ', ' + this.e + 
               '  ' + this.c + ', ' + this.d + ', ' + this.f + ' }';
      },

      offset: function () {
        return { x: this.e, y: this.f };
      },

      split: function () {
        var out = {};
        // translation
        out.dx = this.e;
        out.dy = this.f;

        // scale and shear
        var row = [[this.a, this.c], [this.b, this.d]];
        out.scalex = Math.sqrt(norm(row[0]));
        normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaley = Math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaley;

        // rotation
        var sin = -row[0][1],
        cos = row[1][1];
        if (cos < 0) {
          out.rotate = R.deg(Math.acos(cos));
          if (sin < 0) {
            out.rotate = 360 - out.rotate;
          }
        } else {
          out.rotate = R.deg(Math.asin(sin));
        }

        out.isSimple = !+out.shear.toFixed(FLOAT_ACCURACY_ACCURATE) && (out.scalex.toFixed(FLOAT_ACCURACY_ACCURATE) == out.scaley.toFixed(FLOAT_ACCURACY_ACCURATE) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(FLOAT_ACCURACY_ACCURATE) && out.scalex.toFixed(FLOAT_ACCURACY_ACCURATE) == out.scaley.toFixed(FLOAT_ACCURACY_ACCURATE) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(FLOAT_ACCURACY_ACCURATE) && !out.rotate;
        return out;
      },

      toTransformString: function (shorter) {
        var s = shorter || this[split]();
        if (s.isSimple) {
          s.scalex = +s.scalex.toFixed(FLOAT_ACCURACY);
          s.scaley = +s.scaley.toFixed(FLOAT_ACCURACY);
          s.rotate = +s.rotate.toFixed(FLOAT_ACCURACY);
          return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) +
            (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
            (s.rotate ? "r" + [s.rotate, 0, 0] : E);
        } else {
          return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        }
      }
    }
  });

  return _Matrix;

})();
