var Path = _class("Path", {

  mixins: [Base],

  interfaces: [Shape],

  props: {
    _points: [],
    _position_matrix: new Util.Matrix()
  },

  methods: {
    init: function (points)
    {
      this.impl = new Fashion.IMPL.Path();
      this.points(points);
      this._matrixes.put(this._position_matrix, null);
    },

    /**
     *
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
    points: function(points)
    {

      if (points !== void(0)) {
        this._points = points;
        this.impl.points(this._points, this);
        this._updateState();
      }

      return this._points;
    },

    position: function(d)
    {
      if (d) {
        var last = this._position_matrix.apply(this._position);
        var xm = d.x - last.x;
        var ym = d.y - last.y;
        this._position_matrix.translate(xm, ym);
        this.impl.transform(this._matrixes);
      }

      return this._position_matrix.apply(this._position);
    },

    size: function(d)
    {

      if (d) {
        var lw = this._size.width;
        var lh = this._size.height;
        var wm = d.width / lw;
        var hm = d.height / lh;
        var pos = this._position;

        var mat = (new Util.Matrix()).scale(wm, hm, pos.x, pos.y);
        this.applyMatrix(mat);
      }

      return {width: this._size.width, height: this._size.height};
    },

    applyMatrix: function(d)
    {
      if (d === void(0))
        throw new ArgumentError("applyMatrix expects 1 argument at least.");
      this._points.applyMatrix(d);
      this.points(this._points, true);
      return this;
    },

    displayPosition: function()
    {
    },

    displaySize: function()
    {
    },

    gravityPosition: function()
    {
    },

    hitTest: function(d)
    {
    },

    /* private */
    _updateState: function()
    {
      var x, y, pos = {x_min: Infinity, y_min: Infinity,
                       x_max: -Infinity, y_max: -Infinity};

      var points = this._points;

      for (var i=0, l=points.length, ll = l-1; i<l; i++) {
        var item = points[i];
        var idt = item[0];

        switch (idt) {

        case 'M':
          if (i < ll) {
            var next_idt = points[i+1][0];
            if (next_idt !== 'M') {
              x = item[1]; y = item[2];
            }
          }
          break;

        case 'L':
        case 'T': // TODO: consider curving line.
        case 'R': // TODO: consider curving line.
          x = item[1]; y = item[2];
          break;

        case 'C': // TODO: consider curving line.
          x = item[5]; y = item[6];
          break;

        case 'Z':
          break;

        case 'H':
          x = item[0];
          break;

        case 'V':
          y = item[0];
          break;

        case 'S': // TODO: consider curving line.
        case 'Q': // TODO: consider curving line.
          x = item[3]; y = item[4];
          break;

        case 'A': // TODO: consider curving line.
          x = item[6]; y = item[7];
          break;
        }

        if (pos.x_min > x) pos.x_min = x;
        if (pos.x_max < x) pos.x_max = x;

        if (pos.y_min > y) pos.y_min = y;
        if (pos.y_max < y) pos.y_max = y;

      }

      this._position.x = pos.x_min;
      this._position.y = pos.y_min;

      this._size.width  = pos.x_max - pos.x_min;
      this._size.height = pos.y_max - pos.y_min;

    }
  }
});
