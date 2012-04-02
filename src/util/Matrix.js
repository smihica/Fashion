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
              // console.log("scale:"+s.x+","+s.y+","+s.cx+","+s.cy);
              this.scale(s.x, s.y, s.cx, s.cy);

            } else if (i === 'rotate') {
              var r = tr.rotate;
              // console.log("rotate:"+r.angle+","+r.x+","+r.y);
              this.rotate(r.angle, r.x, r.y);

            } else if (i === 'translate') {
              var t = tr.translate;
              // console.log("translate:"+t.x+","+t.y);
              this.translate(t.x, t.y);

            } else {
              _error('Invalid property Error.', "transform() expects 'tranlate', 'scale', 'rotate'.");

            }
          }
        }
        return this;
      },

      add: function (a, b, c, d, e, f) {
        var a1=this.a, b1=this.b, c1=this.c, d1=this.d, e1=this.e, f1=this.f;

        this.a = a1*a+c1*b;
        this.b = b1*a+d1*b;
        this.c = a1*c+c1*d;
        this.d = b1*c+d1*d;
        this.e = a1*e+c1*f+e1;
        this.f = b1*e+d1*f+f1;

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
        return this;
      },

      scale: function (x, y, cx, cy) {
        this.add(x, 0, 0, y, cx, cy);
        this.add(1, 0, 0, 1, -cx, -cy);
        return this;
      },

      rotate:  function (a, x, y) {
        a = rad(a);
        var cos = +Math.cos(a).toFixed(FLOAT_ACCURACY_ACCURATE);
        var sin = +Math.sin(a).toFixed(FLOAT_ACCURACY_ACCURATE);
        this.add(cos, sin, -sin, cos, x, y);
        this.add(1, 0, 0, 1, -x, -y);
        return this;
      },

      x: function (x, y) {
        return (x * this.a) + (y * this.c) + this.e;
      },

      y: function (x, y) {
        return (x * this.b) + (y * this.d) + this.f;
      },

      get: function (i) {
        return +this[String.fromCharCode(97 + i)].toFixed(FLOAT_ACCURACY);
      },

      getAll: function() {
        var rt = [];
        for(var i=0; i<6; i++) {
          rt.push(this.get(i));
        }
        return rt;
      },

      toString: function () {
        return [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
      },

      offset: function () {
        return [this.e.toFixed(FLOAT_ACCURACY), this.f.toFixed(FLOAT_ACCURACY)];
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
