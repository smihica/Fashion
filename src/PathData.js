var PathData = (function() {
  /**
   * M   moveto                           (x y)+
   * Z   closepath                        (none)
   * L   lineto                           (x y)+
   * H   horizontal lineto                x+
   * V   vertical lineto                  y+
   * C   curveto                          (x1 y1 x2 y2 x y)+
   * S   smooth curveto                   (x2 y2 x y)+
   * Q   quadratic Bezier curveto         (x1 y1 x y)+
   * T   smooth quadratic Bezier curveto  (x y)+
   * A   elliptical arc                   (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
   * R   Catmull-Rom curveto*x1 y1        (x y)+
   *
   **/
  var OPERATORS = {
    'Z': 'Z',
    'z': 'Z',
    'closePath': 'Z',
    'H': 'H',
    'h': 'h',
    'horizontalLineTo': 'H',
    'horizontalLineToRel': 'h',
    'V': 'V',
    'v': 'v',
    'verticalLineTo': 'V',
    'verticalLineToRel': 'v',
    'M': 'M',
    'm': 'm',
    'moveTo': 'M',
    'moveToRel': 'm',
    'L': 'L',
    'l': 'l',
    'lineTo': 'L',
    'lineToRel': 'l',
    'T': 'T',
    't': 't',
    'curveToSmoothQB': 'T',
    'curveToSmoothQBRel': 't',
    'R': 'R',
    'r': 'r',
    'curveToCR': 'R',
    'curveToCRRel': 'r',
    'S': 'S',
    's': 's',
    'curveToSmooth': 'S',
    'curveToSmoothRel': 's',
    'Q': 'Q',
    'q': 'q',
    'curveToQB': 'Q',
    'curveToQBRel': 'q',
    'C': 'C',
    'c': 'c',
    'curveTo': 'C',
    'curveToRel': 'c',
    'A': 'A',
    'a': 'a',
    'arc': 'A',
    'arcRel': 'a'
  };

  function PathDataBuilder(data) {
    this.data = data;
    this.last = { x: 0., y: 0. };
  };

  PathDataBuilder.prototype.parseNumber = function(v) {
    var retval = parseFloat(v);
    if (isNaN(retval))
      throw new ValueError("Invalid argument: " + v);
    return retval;
  };

  PathDataBuilder.prototype.addSegments = function(arr, i, l, op) {
    var arg_len = 0;
    switch (op) {
    case 'Z':
      if (l != 0)
        throw new ValueError("closePath takes no arguments, " + l + " given: " + arr.join(" "));
      this.data.push(['Z']); 
      break;

    case 'H':
      if (l == 0)
        throw new ValueError("horizontalLineTo takes at least 1 argument" + arr.join(" "));
      var x = 0.;
      for (var j = 0; j < l; j++) {
        x = this.parseNumber(arr[i + j]);
        this.data.push(['M', x, this.last.y]);
      }
      this.last.x = x;
      break;

    case 'h':
      if (l == 0)
        throw new ValueError("horizontalLineToRel takes at least 1 argument:" + arr.join(" "));
      var x = this.last.x;
      for (var j = 0; j < l; j++) {
        x += this.parseNumber(arr[i + j]);
        this.data.push(['M', x, this.last.y]);
      }
      this.last.x = x;
      break;

    case 'V':
      if (l == 0)
        throw new ValueError("verticalLineTo takes at least 1 argument: " + arr.join(" "));
      var y = 0.;
      for (var j = 0; j < l; j++) {
        y = this.parseNumber(arr[i + j]);
        this.data.push(['M', this.last.x, y]);
      }
      this.last.y = y;
      break;

    case 'v':
      if (l == 0)
        throw new ValueError("verticalLineToRel takes at least 1 argument: " + arr.join(" "));
      var y = this.last.y;
      for (var j = 0; j < l; j++) {
        y += this.parseNumber(arr[i + j]);
        this.data.push(['M', this.last.x, y]);
      }
      this.last.y = y;
      break;

    case 'M':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("moveTo takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.parseNumber(arr[i]), y = this.parseNumber(arr[i + 1]);
      this.data.push(['M', x, y]);
      for (var j = i + 2, n = i + l; j < n ; j += 2) {
        x = this.parseNumber(arr[j]), y = this.parseNumber(arr[j + 1]);
        this.data.push(['L', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'm':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("moveToRel takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.parseNumber(arr[i]) + this.last.x, y = this.parseNumber(arr[i + 1]) + this.last.y;
      this.data.push(['M', x, y]);
      for (var j = i + 2, n = i + l; j < n ; j += 2) {
        x += this.parseNumber(arr[j]), y += this.parseNumber(arr[j + 1]);
        this.data.push(['L', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'L':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("lineTo takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j < n ; j += 2) {
        x = this.parseNumber(arr[j]), y = this.parseNumber(arr[j + 1]);
        this.data.push(['L', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'l':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("lineTo takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 2) {
        x += this.parseNumber(arr[j]), y += this.parseNumber(arr[j + 1]);
        this.data.push(['L', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'T':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("curveToSmoothQB takes 2 * n arguments, " + l + " given:" + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 2) {
        x = this.parseNumber(arr[j]), y = this.parseNumber(arr[j + 1]);
        this.data.push(['T', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 't':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("curveToSmoothQBRel takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 2) {
        x += this.parseNumber(arr[j]), y += this.parseNumber(arr[j + 1]);
        this.data.push(['T', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'R':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("curveToCR takes 2 * n arguments, " + l + " given:" + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 2) {
        x = this.parseNumber(arr[j]), y = this.parseNumber(arr[j + 1]);
        this.data.push(['R', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'r':
      if (l == 0 || l % 2 != 0)
        throw new ValueError("curveToCRRel takes 2 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 2) {
        x += this.parseNumber(arr[j]), y += this.parseNumber(arr[j + 1]);
        this.data.push(['R', x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'S':
      if (l == 0 || l % 4 != 0)
        throw new ValueError("curveToSmooth takes 4 * n arguments, " + l + " given: " + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 4) {
        var x2 = this.parseNumber(arr[j]), y2 = this.parseNumber(arr[j + 1]);
        x = this.parseNumber(arr[j + 2]), y = this.parseNumber(arr[j + 3]);
        this.data.push(['S', x2, y2, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 's':
      if (l == 0 || l % 4 != 0)
        throw new ValueError("curveToSmooth takes 4 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 4) {
        var x2 = x + this.parseNumber(arr[j]), y2 = y + this.parseNumber(arr[j + 1]);
        x += this.parseNumber(arr[j + 2]), y += this.parseNumber(arr[j + 3]);
        this.data.push(['S', x2, y2, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'Q':
      if (l == 0 || l % 4 != 0)
        throw new ValueError("curveToQB takes 4 * n arguments, " + l + " given: " + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 4) {
        var x1 = this.parseNumber(arr[j]), y1 = this.parseNumber(arr[j + 1]);
        x = this.parseNumber(arr[j + 2]), y = this.parseNumber(arr[j + 3]);
        this.data.push(['Q', x1, y1, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'q':
      if (l == 0 || l % 4 != 0)
        throw new ValueError("curveToQBRel takes 4 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 4) {
        var x1 = x + this.parseNumber(arr[j]), y1 = y + this.parseNumber(arr[j + 1]);
        x += this.parseNumber(arr[j + 2]), y += this.parseNumber(arr[j + 3]);
        this.data.push(['Q', x1, y1, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'C':
      if (l == 0 || l % 6 != 0)
        throw new ValueError("curveTo takes 6 * n arguments, " + l + " given: " + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 6) {
        var x1 = this.parseNumber(arr[j]), y1 = this.parseNumber(arr[j + 1]);
        var x2 = this.parseNumber(arr[j + 2]), y2 = this.parseNumber(arr[j + 3]);
        x = this.parseNumber(arr[j + 4]), y = this.parseNumber(arr[j + 5]);
        this.data.push(['C', x1, y1, x2, y2, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'c':
      if (l == 0 || l % 6 != 0)
        throw new ValueError("curveToRel takes 6 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 6) {
        x1 = x + this.parseNumber(arr[j]), y1 = y + this.parseNumber(arr[j + 1]);
        x2 = x + this.parseNumber(arr[j + 2]), y2 = y + this.parseNumber(arr[j + 3]);
        x += this.parseNumber(arr[j + 4]), y += this.parseNumber(arr[j + 5]);
        this.data.push(['C', x1, y1, x2, y2, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'A':
      if (l == 0 || l % 7 != 0)
        throw new ValueError("arc takes 7 * n arguments, " + l + " given: " + arr.join(" "));
      var x = 0., y = 0.;
      for (var j = i, n = i + l; j <n ; j += 7) {
        var rx = this.parseNumber(arr[j]), ry = this.parseNumber(arr[j + 1]);
        var x_axis_rotation = this.parseNumber(arr[j + 2]);
        var large_arc_flag = this.parseNumber(arr[j + 3]);
        var sweep_flag = this.parseNumber(arr[j + 4]);
        var x = this.parseNumber(arr[j + 5]), y = this.parseNumber(arr[j + 6]);
        this.data.push(['A', rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;

    case 'a':
      if (l == 0 || l % 7 != 0)
        throw new ValueError("arcRel takes 7 * n arguments, " + l + " given: " + arr.join(" "));
      var x = this.last.x, y = this.last.y;
      for (var j = i, n = i + l; j <n ; j += 7) {
        var rx = this.parseNumber(arr[j]), ry = this.parseNumber(arr[j + 1]);
        var x_axis_rotation = this.parseNumber(arr[j + 2]);
        var large_arc_flag = this.parseNumber(arr[j + 3]);
        var sweep_flag = this.parseNumber(arr[j + 4]);
        x += this.parseNumber(arr[j + 5]), y += this.parseNumber(arr[j + 6]);
        this.data.push(['A', rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y]);
      }
      this.last.x = x, this.last.y = y;
      break;
    }
  };

  return _class('PathData', {
    props: {
      length: 0
    },

    methods: {
      init: function PathData_init(points) {
        if (typeof points === 'string' || points instanceof String) {
          this.initWithString(points);
        } else if (points instanceof Array) {
          this.initWithArray(points);
        }
      },

      initWithString: function PathData_initWithString(str) {
        var x, atom, arglen_now, seg, last_idt;
        var arr = str.match(/-?((?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][-+]?[0-9]+)?)|[A-Za-z_]+/g);
        var builder = new PathDataBuilder(this);
        for (var i = 0, n; i < arr.length; i = n) {
          var op;
          if (!(op = OPERATORS[arr[i]]))
            throw new ValueError('Unexpected operator "' + arr[i] + '"');

          i++;

          n = i;
          while (n < arr.length && !(arr[n] in OPERATORS)) n++;
          builder.addSegments(arr, i, n - i, op);
        }
      },

      initWithArray: function PathData_initWithArray(arr) {
        var builder = new PathDataBuilder(this);
        for (var i = 0; i < arr.length; i++) {
          var seg = arr[i];
          var op;
          if (!(op = OPERATORS[seg[0]]))
            throw new ValueError('Unexpected operator "' + arr[i] + '"');
          builder.addSegments(arr, 1, seg.length, op);
        }
      },

      applyMatrix: function PathData_applyMatrix(matrix) {
        var x = 0, y = 0;
        for (var i = 0; i < this.length; i++) {
          var seg = this[i];
          switch (seg[0]) {
          case 'Z':
            break;

          case 'M':
          case 'L':
          case 'T':
          case 'R':
            var p = matrix.apply({ x: seg[1], y: seg[2] });
            seg[1] = p.x, seg[2] = p.y;
            break;

          case 'S':
          case 'Q':
            var p = matrix.apply({ x: seg[1], y: seg[2] });
            seg[1] = p.x, seg[2] = p.y;
            var q = matrix.apply({ x: seg[3], y: seg[4] });
            seg[3] = q.x, seg[4] = q.y;
            break;

          case 'C':
            var p = matrix.apply({ x: seg[1], y: seg[2] });
            seg[1] = p.x, seg[2] = p.y;
            var q = matrix.apply({ x: seg[3], y: seg[4] });
            seg[3] = q.x, seg[4] = q.y;
            var r = matrix.apply({ x: seg[5], y: seg[6] });
            seg[5] = r.x, seg[6] = r.y;
            break;

          case 'A':
            var p = matrix.apply({ x: seg[1], y: seg[2] });
            seg[1] = p.x, seg[2] = p.y;
            var q = matrix.apply({ x: seg[7], y: seg[8] });
            seg[7] = q.x, seg[8] = q.y;
            break;
          }
        }
      },

      push: Array.prototype.push,

      join: Array.prototype.join,

      slice: Array.prototype.slice
    }
  });
})();
