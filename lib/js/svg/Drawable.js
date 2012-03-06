var Drawable = _class("DrawableSVG", {

  props: {
    _vg: null
  },

  methods: {

    init: function(node, width, height)
    {
      var vg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      vg.setAttribute("version", "1.1");
      vg.setAttribute("width", width+"px");
      vg.setAttribute("height", height+"px");
      this._vg = vg;
      node.appendChild(vg);
    },

    append: function(shape) {
      this._vg.appendChild(shape._elem);
    },

    remove: function(id) {
      var child = this._vg.getElementById(id);
      if (child) {
        this._vg.removeChild(child);
      }
    }
  }
});
