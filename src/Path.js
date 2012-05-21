var Path = _class("Path", {
  mixins: [Base],
  interfaces: [Bindable, Shape],
  props: {
    _points: [],
    _position_matrix: new Util.Matrix()
  },
  methods: {
    init: function (values) {
      Base.prototype.init.apply(this, arguments);
      this.impl = new Fashion.IMPL.Path(this);
    },

    points: function(points) {
      if (points !== void(0)) {
        this._points = points;
        this._dirty |= DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._points;
    },

    displayPosition: function() {
    },

    displaySize: function() {
    },

    gravityPosition: function() {
    },

    hitTest: function(d) {
    }
  }
});
