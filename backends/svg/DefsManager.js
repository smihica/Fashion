function createForeignNode(xml) {
  return new DOMParser().parseFromString(
    '<?xml version="1.0" ?>'
    + '<svg xmlns="' + SVG_NAMESPACE + '" '
    + 'xmlns:xlink="' + XLINK_NAMESPACE + '">'
    + xml + '</svg>', "text/xml").documentElement.firstChild;
}

var Def = _class('Def', {
  props: {
    manager: null,
    id: null,
    node: null,
    xml: null,
    refcount: 1
  },

  methods: {
    init: function(manager, node, xml, id) {
      this.manager = manager;
      this.node = node;
      this.xml = xml;
      this.id = id;
    },

    dispose: function() {
      if (this.manager)
        this.manager.remove(this);
      this.manager = null;
      this.xml = null;
      this.node = null;
      this.id = null;
    },

    addRef: function() {
      ++this.refcount;
    },

    delRef: function() {
      if (--this.refcount <= 0)
        this.dispose();
    }
  }
});

var DefsManager = (function() {
  var serializers = {
    LinearGradientFill: function(obj) {
      var tmp = obj.angle % 1;
      var real_angle = tmp < 0 ? 1 + tmp: tmp;
      var angle_in_radian = Math.PI * real_angle * 2;
      var vx = Math.cos(angle_in_radian),
          vy = Math.sin(angle_in_radian);
      if (obj.angle < 0.125 || obj.angle >= 0.875) {
        vy /= vx;
        vx = 1;
      } else if (obj.angle >= 0.125 && obj.angle < 0.375) {
        vx /= vy;
        vy = 1;
      } else if (obj.angle >= 0.375 && obj.angle < 0.625) {
        vy /= -vx;
        vx = -1;
      } else if (obj.angle >= 0.625 && obj.angle < 0.875) {
        vx /= vy;
        vy = -1;
      }
      var v2x = vx / 2 + .5, v2y = vy / 2 + .5;
      var v1x = -v2x + 1, v1y = -v2y + 1;
      var chunks = [
        '<linearGradient',
        ' x1="', v1x * 100, '%"',
        ' y1="', v1y * 100, '%"',
        ' x2="', v2x * 100, '%"',
        ' y2="', v2y * 100, '%"',
        ' gradientUnits="objectBoundingBox">'
      ];
      var colors = obj.colors;
      for (var i = 0; i < colors.length; i++) {
        chunks.push('<stop offset="', colors[i][0] * 100, '"',
                    ' stop-color="', colors[i][1].toString(true), '"',
                    ' stop-opacity="', colors[i][1].a / 255.0, '"',
                    ' />');
      }
      chunks.push('</linearGradient>');
      return [ chunks.join(''), null ];
    },
    RadialGradientFill: function(obj) {
      var chunks = [
        '<radialGradient cx="50%" cy="50%" r="50%"',
        ' fx="', obj.focus.x, '"',
        ' fy="', obj.focus.y, '"',
        ' gradientUnits="objectBoundingBox">'
      ];
      var colors = obj.colors;
      for (var i = 0; i < colors.length; i++) {
        chunks.push('<stop offset="', colors[i][0] * 100, '"',
                    ' stop-color="', colors[i][1].toString(true), '"',
                    ' stop-opacity="', colors[i][1].a / 255.0, '"',
                    ' />');
      }
      chunks.push('</radialGradient>');
      var xml = chunks.join('');
      return [ xml, null ];
    },
    ImageTileFill: function(obj) {
      var xml = [
        '<pattern width="0" height="0" patternUnits="userSpaceOnUse">',
        '<image xlink:href="', _escapeXMLSpecialChars(obj.imageData.url), '" width="0" height="0" />',
        '</pattern>'
      ].join('');
      return [
        xml,
        function(n) {
          obj.imageData.size(function(size) {
            n.setAttribute("width", size.width);
            n.setAttribute("height", size.height);
            n.firstChild.setAttribute("width", size.width);
            n.firstChild.setAttribute("height", size.width);
          });
        }
      ];
    }
  };

  return _class("DefsManager", {
    props: {
      node: null,
      nodes: {},
      dynamicNodes: {}
    },

    methods: {
      init: function(node) {
        this.node = node;
      },

      nextId: function() {
        var id;
        do {
          id = "__svg__def" + (Math.random() * 2147483648 | 0);
        } while (this.node.ownerDocument.getElementById(id));
        return id;
      },

      get: function(def) {
        var className = def.constructor['%%CLASSNAME%%'];
        var serializer = serializers[className];
        if (!serializer)
          throw new Fashion.NotSupported(className + " is not supported by SVG backend");
        var pair = serializer(def);
        var def = this.nodes[pair[0]];
        if (!def) {
          var id = this.nextId();
          var n = createForeignNode(pair[0]);
          if (pair[1]) pair[1](n);
          n.setAttribute("id", id);
          n = this.node.ownerDocument.adoptNode(n);
          def = new Def(this, n, pair[0], id);
          this.node.appendChild(n);
          this.nodes[pair[0]] = def;
        }
        return def;
      },

      remove: function(def) {
        delete this.nodes[def.xml];
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
