var Matrix = (function() {

  var PI = Math.PI;

  var rad = function (deg) {
    return deg % 360 * PI / 180;
  };

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

    methods: {

      init: function (a, b, c, d, e, f) {
        if (a) {
          this.a = +a; this.c = +c; this.e = +e;
          this.b = +b; this.d = +d; this.f = +f;
        }
      },

      set: function(tr) {
        for (i in tr) {
          if (tr.hasOwnProperty(i)) {
            if (i === 'scale') {
              var s = tr.scale;
              this.scale(s.x, s.y, s.cx, s.cy);

            } else if (i === 'rotate') {
              var r = tr.rotate;
              this.rotate(r.angle, r.x, r.y);

            } else if (i === 'translate') {
              var t = tr.translate;
              this.translate(t.x, t.y);

            } else {
              _error('Invalid property Error.', "transform() expects 'tranlate', 'scale', 'rotate'.");

            }
          }
        }
      },

      add: function (a, b, c, d, e, f) {
        var out = [[], [], []],

        m = [[this.a, this.c, this.e],
             [this.b, this.d, this.f],
             [0, 0, 1]],

        matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
        x, y, z, res;

        if (a && a instanceof this.constructor) {
          matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
        }

        for (x = 0; x < 3; x++) {
          for (y = 0; y < 3; y++) {
            res = 0;
            for (z = 0; z < 3; z++) {
              res += m[x][z] * matrix[z][y];
            }
            out[x][y] = res;
          }
        }
        this.a = out[0][0];
        this.b = out[1][0];
        this.c = out[0][1];
        this.d = out[1][1];
        this.e = out[0][2];
        this.f = out[1][2];
      },

      invert: function () {
        var me = this,
        x = me.a * me.d - me.b * me.c;
        return new this.constructor(
          me.d / x, -me.b / x, -me.c / x,
          me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
      },

      clone: function () {
        return new this.constructor(this.a, this.b, this.c, this.d, this.e, this.f);
      },

      translate: function (x, y) {
        this.add(1, 0, 0, 1, x, y);
      },

      scale: function (x, y, cx, cy) {
        y == null && (y = x);
        (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
        this.add(x, 0, 0, y, 0, 0);
        (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
      },

      rotate:  function (a, x, y) {
        a = rad(a);
        x = x || 0;
        y = y || 0;
        var cos = +Math.cos(a).toFixed(9),
        sin = +Math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        this.add(1, 0, 0, 1, -x, -y);
      },

      x: function (x, y) {
        return x * this.a + y * this.c + this.e;
      },

      y: function (x, y) {
        return x * this.b + y * this.d + this.f;
      },

      get: function (i) {
        return +this[String.fromCharCode(97 + i)].toFixed(4);
      },

      toString: function () {
        return [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
      },

      toFilter: function () {
        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
          ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
          ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
      },

      offset: function () {
        return [this.e.toFixed(4), this.f.toFixed(4)];
      },

      /*\
       * Matrix.split
       [ method ]
       **
       * Splits matrix into primitive transformations
       = (object) in format:
       o dx (number) translation by x
       o dy (number) translation by y
       o scalex (number) scale by x
       o scaley (number) scale by y
       o shear (number) shear
       o rotate (number) rotation in deg
       o isSimple (boolean) could it be represented via simple transformations
       \*/
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

        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
        return out;
      },

      /*\
       * Matrix.toTransformString
       [ method ]
       **
       * Return transform string that represents given matrix
       = (string) transform string
       \*/
      toTransformString: function (shorter) {
        var s = shorter || this[split]();
        if (s.isSimple) {
          s.scalex = +s.scalex.toFixed(4);
          s.scaley = +s.scaley.toFixed(4);
          s.rotate = +s.rotate.toFixed(4);
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
