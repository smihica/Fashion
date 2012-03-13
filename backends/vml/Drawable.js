var Drawable = _class("DrawableVML", {

  props: {
    _vg: null
  },

  class_methods: {
    setup: function() {
      document.write('<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="' + prefix + '" />\n');
      document.write('<style type="text/css">\n' + prefix + '\\:*{behavior:url(#default#VML)}\n</style>');
    }
  },

  methods: {
    init: function(node, width, height)
    {
      var vg = Util.createVmlElement('group');
      vg.style.left = 0;
      vg.style.top = 0;
      vg.style.width = width;
      vg.style.height = height;
      this._vg = vg;
      node.appendChild(vg);
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
