var Drawable = (function() {
  return _class("DrawableSVG", {
    props: {
      prefix: "svg",
      _vg: null,
      _defsManager: null,
    },

    methods: {
      init: function(node, content_size)
      {
        var vg = newNode("svg");
        vg.setAttribute("version", "1.1");
        vg.setAttribute("width", content_size.width + "px");
        vg.setAttribute("height", content_size.height + "px");
        var defs = newNode("defs");
        vg.appendChild(defs);
        node.appendChild(vg);
        this._vg = vg;
        this._defsManager = new DefsManager(defs);
      },

      contentSize: function()
      {
        return { x: this._vg.offsetWidth, y: this._vg.offsetHeight };
      },

      append: function(shape)
      {
        shape.drawable = this;
        this._vg.appendChild(shape._elem);
      },

      remove: function(shape)
      {
        var child = shape._elem;
        this._vg.removeChild(child);
        shape.drawable = null;
      }

    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
