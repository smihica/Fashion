var Rect = _class("Rect", {
  parent: Base,
  class_props: { impl: 'Rect' },
  props: {
    _corner: { x: 0, y: 0 }
  },
  methods: {
    corner: function(value) {
      if (value !== void(0)) {
        this._corner = value;
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._corner;
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
