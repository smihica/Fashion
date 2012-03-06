Fashion.VML = null;
/*
Fashion.VML = (function() {

  var VML = {};
  var prefix = 'v';

  if ( !!document.createElementNS && !!document.createElementNS( "http://www.w3.org/2000/svg", "svg").createSVGRect ) {
    return null;
  }

  var console = {
    log: function(txt) {
      var n = document.getElementById('console');
      n.value += txt + "\n";
      var r = n.createTextRange();
      r.move('character', n.value.length);
      r.select();
    }
  };

  var Drawable = _class("Drawable", {
    props: {
      id_acc: 0,
      n: null,
      elements: {},
      vg: null
    },

    class_methods: {
      setup: function() {
        document.write('<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="' + prefix + '" />\n');
        document.write('<style type="text/css">\n' + prefix + '\\:*{behavior:url(#default#VML)}\n</style>');
      }
    },

    methods: {
      init: function(n, w, h)
      {
        this.n = n;
        this.n.style.position = 'relative';
        var vg = document.createElement(prefix + ':group');
        this.n.appendChild(vg);
        this.vg = vg;
      },

      gensym: function()
      {
        var sym = "G"+this.id_acc;
        this.id_acc++;
        return sym;
      },

      circle: function Drawable_circle(x, y, d)
      {
        var id = this.gensym();
        var n = new Circle(id, x, y, d);
        this.elements[id] = n;
        this.n.appendChild(n.elem);
        return n;
      },

      rect: function Drawable_rect(x, y, width, height)
      {
        var id = this.gensym();
        var n = new Rect(id, x, y, width, height);
        this.elements[id] = n;
        this.n.appendChild(n.elem);
        return n;
      },

      line: function Drawable_line(points)
      {
        var id = this.gensym();
        var n = new Line(id, points);
        this.elements[id] = n;
        this.n.appendChild(n.elem);
        return n;
      },

      polygon: function Drawable_polygon(points)
      {
        var id = this.gensym();
        var n = new Polygon(id, points);
        this.elements[id] = n;
        this.n.appendChild(n.elem);
        return n;
      },

      bezier: function Drawable_bezier(x, y, width)
      {
      }
    }
  });

  var Shape = _class("Shape", {

    props: {
      id: null,
      type: "shape",
      attr: {},
      elem: null,
      _style: {}
    },

    methods: {
      init: function(id, type, style, attr) {
        this.id = id;
        this.type = type;
        this.elem = document.createElement(prefix + this.type);
        this.elem.style.position = 'absolute';
        this.set_attr(attr || {});
        this.add_attr({id: id});
        this.style(style);
      },

      set_attr: function(attr) {
        var self = this;

        // for(var i in attr)
        // if (attr.hasOwnProperty(i))
        // self.elem.removeAttribute(i);

        this.attr = attr;

        for (var i in attr)
          if (attr.hasOwnProperty(i))
            self.elem.setAttribute(i, attr[i]);

        return this.elem;

      },

      add_attr: function(attr) {
        var self = this;

        for (var i in attr) {
          if (attr.hasOwnProperty(i)) {
            self.attr[i] = attr[i];
            self.elem.setAttribute(i, attr[i]);
          }
        }

        return this.elem;

      },

      get_attr: function() {
        return this.attr;
      },

      x: function(d) {
        if (d) {
          this._style.x = d;
          this.elem.style.left = d + 'px';
        }
        return this._style.x;
      },

      y: function(d) {
        if (d) {
          this._style.y = d;
          this.elem.style.top = d + 'px';
        }
        return this._style.y;
      },

      width: function(d) {
        if (d) {
          this._style.width = d;
          this.elem.style.width = d + 'px';
        }
        return this._style.width;
      },

      height: function(d) {
        if (d) {
          this._style.height = d;
          this.elem.style.height = d + 'px';
        }
        return this._style.height;
      },

      cursor: function(d) {
        if(d) {
          this._style.cursor = d;
          this.elem.style.cursor = d;
        }
        return this._style.cursor;
      },

      fill: function(d) {
        if(d) {
          this._style.fill = d;
          if (d === 'none') {
            this.elem.filled = false;
          } else {
            this.elem.filled = true;
            this.elem.fillcolor = d;
          }
        }
        return this._style.fill;
      },

      stroke: function(d) {
        if (d) {
          this._style.stroke = d;
          if (d === 'none') {
            this.elem.stroked = false;
          } else {
            this.elem.stroked = true;
            this.elem.strokecolor = d;
          }
        }
        return this._style.stroke;
      },

      stroke_width: function(d) {
        if (d) {
          this._style.stroke_width = d;
          this.elem.setAttribute('strokeweight', d+'px');
        }
        return this._style.stroke_width;
      },

      style: function(st) {
        if (st.hasOwnProperty('x')) {
          this.x(st.x);
        }
        if (st.hasOwnProperty('y')) {
          this.y(st.y);
        }
        if (st.hasOwnProperty('width')) {
          this.width(st.width);
        }
        if (st.hasOwnProperty('height')) {
          this.height(st.height);
        }
        if (st.hasOwnProperty('cursor')) {
          this.cursor(st.cursor);
        }
        if (st.hasOwnProperty('stroke')) {
          this.stroke(st.stroke);
        }
        if (st.hasOwnProperty('fill')) {
          this.fill(st.fill);
        }
        return this._style;
      }
    }
  });

  var Circle = _class("Circle", {
    parent: Shape,

    methods: {
      init: function(id, x, y, d) {
        this.__super__().init.call(this, id, ":oval", {
          x: x,
          y: y,
          radius: (d / 2),
          stroke: '#000',
          fill: '#66F'
        });
      },

      radius: function(d) {
        if (d) {
          var diameter = d*2;
          this._style.radius = d;
          this.width(diameter); this.height(diameter);
        }
        return this._style.radius;
      },

      style: function(st) {
        this.__super__().style.call(this, st);

        if (st.hasOwnProperty('radius')) {
          this.radius(st.radius);
        }

        return this._style;
      }
    }
  });

  var Rect = _class("Rect", {
    parent: Shape,

    methods: {
      init: function(id, x, y, width, height) {
        this.__super__().init.call(this, id, ":rect", {
          x: x,
          y: y,
          width: width,
          height: height,
          stroke: '#000',
          fill: '#66F'
        });
      }
    }
  });

  var Line = _class("Line", {
    parent: Shape,

    methods: {
      init: function (id, points) {
        this.__super__().init.call(this, id, ':polyline', {
          stroke: '#000',
          fill: 'none',
          points: points
        });
      },

      style: function(st) {
        this.__super__().style.call(this, st);

        if (st.hasOwnProperty('points')) {
          this.points(st.points);
        }

        return this._style;
      },

      points: function(d) {
        if (d) {
          this._style.points = d;
          for (var i=0, l=d.length; i<l; i++) {
            d[i] = d[i].join('px,') + 'px';
          }
          this.add_attr({points: d.join(' ')});
        }
        return this._style.points;
      }
    }
  });

  var Polygon = _class("Polygon", {
    parent: Shape,

    methods: {
      init: function (id, points) {
        this.__super__().init.call(this, id, ':polyline', {
          stroke: '#000',
          fill: '#6F6',
          points: points
        });
      },

      style: function(st) {
        this.__super__().style.call(this, st);

        if (st.hasOwnProperty('points')) {
          this.points(st.points);
        }

        return this._style;
      },

      points: function(d) {
        if (d) {
          this._style.points = d;
          for (var i=0, l=d.length; i<l; i++) {
            d[i] = d[i].join('px,') + 'px';
          }
          this.add_attr({points: d.join(' ')});
        }
        return this._style.points;
      }
    }
  });

  var Path = _class("Path", {
    parent: Shape,

    mathods: {
      init: function(id, data) {
        this.__super__().init.call(this, id, ':shape', {
          stroke: '#000',
          fill: '#6F6',
          path: data
        });
      },

      style: function(st) {
        this.__super__().style.call(this, st);

        if (st.hasOwnProperty('path')) {
          this.path(st.path);
        }

        return this._style;
      },

      path: function(d) {
        if (d) {
          this._style.path = d;
          data = this.convert_data(data);
          this.add_attr({path: data});
        }
        return this._style.path;
      },

      convert_data: function(data) {

        if (data.match(/[A|a]/) !== null) syntax_error();

        var matcher = [
            /^\s*?(m)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)\s*[,|\s]\s*(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // m x,y
            /^\s*?(M)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)\s*[,|\s]\s*(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // M x,y
            /^\s*?(l)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)\s*[,|\s]\s*(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // l x,y
            /^\s*?(L)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)\s*[,|\s]\s*(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // L x,y
            /^\s*?(h)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // h x
            /^\s*?(H)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // H x
            /^\s*?(v)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // v y
            /^\s*?(V)\s*?(-?[1-9]\d*([¥.]{1}[0-9]+)?)/, // V y
            /^\s*?(z)\s*$/, // z
            /^\s*?(Z)\s*$/  // Z
        ];
        var matcher_len = matcher.length;

        var ret = "";
        var pos = {x:0, y:0};

        outer:
        while (true) {

          if (data.length === 0) {
            ret += 'e';
            break;
          }

          for (var i=0; i<matcher_len; i++) {
            var m = data.match(matcher[i]);
            if (m === null) continue;

            if (i < 4) {
              var sym = m[1];
              var d1 = +(m[2]);
              var d2 = +(m[4]);

              if (sym === 'm' || sym === 'l') {
                d1 += pos.x;
                d2 += pos.y;
              }
              pos.x = d1;
              pos.y = d2;

              sym = sym.toLowerCase();

              var prefix = '';
              if (sym !== 'l' || last_sym !== 'l') prefix = sym + ' ';

              ret += prefix + pos.x + ',' + pox.y + ' ';

            } else if (i < 8) {
              var sym = m[1];
              var d1 = +(m[2]);
              var hp = (sym === 'h');
              var vp = (sym === 'v');
              var Hp = (sym === 'H');

              if (hp) {
                d1 += pos.x;
                pos.x = d1;
              } else if (vp) {
                d1 += pos.y;
                pos.y = d1;
              } else if (Hp) {
                pos.x = d1;
              } else {
                pos.y = d1;
              }

              sym = 'l';
              var prefix = '';

              if (sym !== last_sym) prefix = sym + ' ';

              ret += prefix + pos.x + ',' + pos.y + ' ';

            } else {
              var sym = 'x';
              ret += sym + ' ';

            }

            data = data.substring(m[0].length);
            last_sym = sym;

            continue outer;
          }
          syntax_error();
        }

        return ret;
      }
    }
  });

  VML.Drawable = Drawable;
  VML.Shape    = Shape;
  VML.Circle   = Circle;
  VML.Rect     = Rect;
  VML.Line     = Line;
  VML.Polygon  = Polygon;
  VML.Path     = Path;

  VML.Drawable.setup();

  return VML;


})();

*/

Fashion.VML = null;