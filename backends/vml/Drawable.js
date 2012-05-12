var Drawable = _class("DrawableVML", {
  props: {
    _vg: null
  },

  methods: {
    init: function(node, content_size)
    {
      var vg = newElement('group');
      vg.style.left = 0;
      vg.style.top = 0;
      vg.style.width = content_size.width + "px";
      vg.style.height = content_size.height + "px";
      this._vg = vg;
      node.appendChild(vg);
    },

    append: function(shape) {
      shape._attachedTo(this);
    },

    remove: function(shape) {
      shape._detached();
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
