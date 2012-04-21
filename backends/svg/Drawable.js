var Drawable = _class("DrawableSVG", {

  props: {
    _vg: null
  },

  methods: {

    init: function(node, content_size)
    {
      var vg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      vg.setAttribute("version", "1.1");
      vg.setAttribute("width", content_size.width + "px");
      vg.setAttribute("height", content_size.height + "px");
      this._vg = vg;
      node.appendChild(vg);
    },

    contentSize: function()
    {
      return { x: this._vg.offsetWidth, y: this._vg.offsetHeight };
    },

    append: function(shape)
    {
      this._vg.appendChild(shape._elem);
    },

    remove: function(shape)
    {
      var child = shape._elem;
      this._vg.removeChild(child);
    }

  }
});
