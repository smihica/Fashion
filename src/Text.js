var Text = _class("Text", {
  parent: Base,
  class_props: { impl: 'Text' },
  props: {
    _text: '',
    _fontFamily: 'Sans',
    _fontSize: 10
  },
  methods: {
    fontFamily: function(value) {
      if (value) {
        this._fontFamily = value
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._fontFamily;
    },

    fontSize: function(value) {
      if (value) {
        this._fontSize = value;
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      };
      return this._fontSize;
    },

    text: function (value) {
      if (value) {
        this._text = value;
        this._dirty |= Fashion.DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      };
      return this._text;
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
