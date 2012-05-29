var Path = _class("Path", {
  parent: Base,
  class_props: { impl: 'Path' },
  props: {
    _points: [],
    _position_matrix: new Matrix()
  },
  methods: {
    points: function(points) {
      if (points !== void(0)) {
        this._points = points;
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._points;
    }
  }
});
