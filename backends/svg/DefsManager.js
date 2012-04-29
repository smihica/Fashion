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
      var retval = [
        '<', 'linearGradient',
        ' x1="', v1x * 100, '%"',
        ' y1="', v1y * 100, '%"',
        ' x2="', v2x * 100, '%"',
        ' y2="', v2y * 100, '%"',
        ' gradientUnits="objectBoundingBox">'
      ];
      var colors = obj.colors;
      for (var i = 0; i < colors.length; i++) {
        retval.push('<', 'stop',
                    ' offset="', colors[i][0] * 100, '"',
                    ' stop-color="', colors[i][1].toString(true), '"',
                    ' stop-opacity="', colors[i][1].a / 255.0, '"',
                    ' />');
      }
      retval.push('</', 'linearGradient', '>');
      return retval.join('');
    },
    RadialGradientFill: function(obj) {
      var retval = [
        '<', 'radialGradient',
        ' cx="50%" cy="50%" r="50%"',
        ' fx="', obj.focus.x, '"',
        ' fy="', obj.focus.y, '"',
        ' gradientUnits="objectBoundingBox">'
      ];
      var colors = obj.colors;
      for (var i = 0; i < colors.length; i++) {
        retval.push('<', 'stop',
                    ' offset="', colors[i][0] * 100, '"',
                    ' stop-color="', colors[i][1].toString(true), '"',
                    ' stop-opacity="', colors[i][1].a / 255.0, '"',
                    ' />');
      }
      retval.push('</', 'radialGradient', '>');
      return retval.join('');
    }
  };

  return _class("DefsManager", {
    props: {
      node: null,
      nodes: {}
    },

    methods: {
      init: function(node) {
        this.node = node;
        this.seq = 0;
      },

      nextId: function() {
        return "__svg__def" + (++this.seq);
      },

      get: function(def) {
        var className = def.constructor['%%CLASSNAME%%'];
        var serializer = serializers[className];
        if (!serializer)
          throw new NotSupported(className + " is not supported by SVG backend");
        var xml = serializer(def);
        console.log(xml);
        var n = this.nodes[xml];
        if (!n) {
          var parser = new DOMParser();
          n = parser.parseFromString(
            '<?xml version="1.0" ?><svg xmlns="' + SVG_NAMESPACE + '">'
            + xml + '</svg>', "text/xml").documentElement.firstChild;
          n.setAttribute("id", this.nextId());
          n = this.node.ownerDocument.adoptNode(n);
          this.node.appendChild(n);
          this.nodes[xml] = n;
        }
        return n;
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
