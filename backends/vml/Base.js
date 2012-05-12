var Base = _class("BaseVML", {
  props : {
    drawable: null,
    handler: null
  },

  methods: {

    transform: function(matrixes)
    {
      if (matrixes.length() > 0) {
        var mat = new Fashion.Util.Matrix();
        matrixes.forEach(function(k, v) { mat.combine(k); }, this);
        this._elem.style.filter = Util.matrixString(mat);
      } else {
        this._elem.style.filter = '';
      }
    },

    style: function(st)
    {
      var elem = this._elem;
      var fill = elem.getElementsByTagName('fill'), _fill = null;
      if (st.fill) {
        if (st.fill instanceof FloodFill) {
          if (st.fill.color.a == 255) {
            if (fill && fill.length > 0)
              fill[0].parentNode.removeChild(fill[0]);
            elem.fillColor = st.fill.color.toString(true);
          } else {
            if (!fill || !fill.length) {
              fill = [newElement('fill')];
              elem.appendChild(fill[0]);
            }
            fill.type = "solid";
            fill.color = st.fill.color.toString(true);
            fill.opacity = st.fill.color.a / 255.;
          }
        } else if (st.fill instanceof LinearGradientFill) {
          if (!fill || !fill.length) {
            fill = [newElement('fill')];
            elem.appendChild(fill[0]);
          }
          var firstColor = st.fill.colors[0].toString(true);
          var lastColor = st.fill.colors[st.fill.colors.length - 1].toString(true);
          if (firstColor[0] == 0 && lastColor[0] == 1) {
            fill.color = firstColor[1].toString(true);
            fill.opacity = firstColor[1].a / 255.;
            fill.color2 = lastColor[1].toString(true);
            fill.opacity2 = lastColor[1].a / 255.;
          }
          var colors = [];
          for (var i = 0; i < st.fill.colors.length; i++) {
            var color = st.fill.colors[i];
            colors.push((color[0] * 100).toFixed(0) + "% " + color[1].toString(true));
          }
          fill.type = "gradient";
          fill.method = "sigma";
          fill.colors = colors.join(",");
          fill.angle = (fill.angle * 360).toFixed(0);
        } else if (st.fill instanceof RadialGradientFill) {
          if (!fill || !fill.length) {
            fill = [newElement('fill')];
            elem.appendChild(fill[0]);
          }
          var firstColor = st.fill.colors[0].toString(true);
          var lastColor = st.fill.colors[st.fill.colors.length - 1].toString(true);
          if (firstColor[0] == 0 && lastColor[0] == 1) {
            fill.color = firstColor[1].toString(true);
            fill.opacity = firstColor[1].a / 255.;
            fill.color2 = lastColor[1].toString(true);
            fill.opacity2 = lastColor[1].a / 255.;
          }
          var colors = [];
          for (var i = 0; i < st.fill.colors.length; i++) {
            var color = st.fill.colors[i];
            colors.push((color[0] * 100).toFixed(0) + "% " + color[1].toString(true));
          }
          fill.type = "gradientRadial";
          fill.focusPosition = st.fill.focus.x + " " + st.fill.focus.y;
          fill.colors = colors.join(",");
        } else if (st.fill instanceof ImageTileFill) {
          if (!fill || !fill.length) {
            fill = [newElement('fill')];
            elem.appendChild(fill[0]);
          }
          fill.src = st.fill.imageData.url;
          fill.type = "tile";
        }
        elem.filled = true;
      } else {
        if (fill && fill.length > 0)
          fill[0].parentNode.removeChild(fill[0]);
        elem.filled = false;
      }

      var stroke = elem.getElementsByTagName('');
      if (st.stroke) {
        if (st.stroke.color.a == 255 && !st.stroke.pattern) {
          if (stroke && stroke.length > 0)
            stroke[0].parentNode.removeChild(stroke[0]);
          elem.strokeColor = st.stroke.color.toString(true);
          elem.strokeWeight = st.stroke.width;
        } else {
          if (!stroke || !stroke.length) {
            stroke = [newElement('stroke')];
            elem.appendChild(stroke[0]);
          }
          stroke[0].color = st.stroke.color.toString(true);
          stroke[0].opacity = st.stroke.color.a / 255.;
          stroke[0].weight = st.stroke.width;
          if (st.stroke.pattern)
            stroke[0].dashStyle = st.stroke.pattern.join(' ');
        }
        elem.stroked = true;
      } else {
        elem.stroked = false;
      }

      elem.style.display = st.visibility ? 'block' : 'none';
      elem.style.cursor = st.cursor ? st.cursor: 'normal';
    },

    resetStyle: function()
    {
      this.style(DEFAULT_STYLE);
    },

    _attachedTo: function(drawable) {
    },

    _detached: function() {
      shape.drawable._vg.removeChild(this._elem);
      shape.drawable = null;
    },

    holdEventsHandler: function(handler)
    {
      var self = this;
      if (this.handler === null) {
        var funcs = new MultipleKeyHash();
        this.handler = handler;
        this.handler.holdTrigger('shape-impl', {
          add:    function(type, raw) {
            var wrapped = function(dom_evt){
              var evt = new MouseEvt(dom_evt, self);
              return raw.call(self, evt);
            };
            funcs.put(raw, wrapped);
            _bindEvent(self._elem, type, wrapped);
          },
          remove: function(type, raw) {
            _unbindEvent(self._elem, type, funcs.pop(raw));
          }
        });
      } else {
        throw new AlreadyExists("impl already has a events handler.");
      }
    },

    releaseEventsHandler: function () {
      if (this.handler !== null) {
        this.handler.releaseTriger('shape-impl');
      } else {
        throw new NotFound("events handler is not exist yet.");
      }
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
