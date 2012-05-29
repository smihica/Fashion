var Image = _class('Image', {
  parent: Base,
  class_props: { impl: 'Image' },
  props: {
    _imageData: null
  },
  methods: {
    imageData: function (value) {
      if (value !== void(0)) {
        this._imageData = value;
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._imageData;
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
