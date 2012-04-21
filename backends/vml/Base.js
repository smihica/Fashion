var Base = _class("BaseVML", {

  props : {},

  methods: {

    transform: function(matrix)
    {
      this._elem.style.filter = Util.matrixString(matrix);
    },

    resetTransform: function()
    {
      this._elem.style.filter = '';
    },

    style: function(st)
    {
      var node = this._elem;
      var fill = (node.getElementsByTagName('fill') && node.getElementsByTagName('fill')[0]);
      var stroke = (node.getElementsByTagName('stroke') && node.getElementsByTagName('stroke')[0]);

      if (!st.fill.none) {
        if (!fill) fill = Util.createVmlElement('fill', true);
        var color_op = Util.convertColorArray(st.fill.color);

        fill.on = true;
        fill.color = color_op.color;
        fill.opacity = color_op.opacity;
        fill.type = "solid";
        fill.src = '';
        // TODO
        // this._elem.setAttribute('fill-rule', fill.rule);
        node.appendChild(fill);

      } else {
        if (fill) {
          fill.on = false;
          node.removeChild(fill);
        }
      }

      if (!st.stroke.none) {
        if (!stroke) stroke = Util.createVmlElement('stroke', true);
        var color_op = Util.convertColorArray(st.stroke.color);

        stroke.on    = true;
        stroke.color = color_op.color;
        stroke.weight = st.stroke.width + 'px';
        stroke.opacity = color_op.opacity;
        stroke.dashstyle = Util.convertStrokeDash(st.stroke.dash);

        //params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
        //stroke.miterlimit = params["stroke-miterlimit"] || 8;
        //params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");

        node.appendChild(stroke);

      } else {
        var stroke = (node.getElementsByTagName('stroke') && node.getElementsByTagName('stroke')[0]);
        if (stroke) {
          stroke.on = false;
          node.removeChild(stroke);
        }
      }

      //stroke.dasharray  = Util.convertStrokeDash(st.stroke.dash);
      var visibility = st.visibility;
      var cursor = st.cursor;

      //this._elem.setAttribute('stroke-dasharray', stroke.dasharray);
      node.style.display = visibility ? 'block' : 'none';
      node.style.cursor  = cursor;

    },

    resetStyle: function()
    {
      this.style(DEFAULT_STYLE);
    },

    addEvent: function(evt)
    {
    },
    removeEvent: function(evt)
    {
    }
  }
});
