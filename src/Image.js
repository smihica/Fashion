var Image = _class('Image', {
  mixins: [Base],

  interfaces: [Shape],

  props: {
    _imageData: null
  },

  methods: {
    init: function Image_init() {
      Base.prototype.init.apply(this, arguments);
      this.impl = new Fashion.IMPL.Image(this);
    },

    imageData: function (value) {
      if (value !== void(0)) {
        this._imageData = value;
        this._dirty |= DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._imageData;
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

/*
 * vim: sts=2 sw=2 ts=2 et
 */
