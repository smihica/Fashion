var Text = (function() {
  var ANCHOR_SYMS = {
    'left': 'left',
    'center': 'center',
    'right': 'right',
    'start': 'left',
    'middle': 'center',
    'end': 'right'
  };
  return _class("Text", {
    parent: Base,
    class_props: { impl: 'Text' },
    props: {
      _text: '',
      _fontFamily: 'Sans',
      _fontSize: 10,
      _anchor: 'left'
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
      },

      anchor: function (value) {
        if (value) {
          var _value = ANCHOR_SYMS[value.toLowerCase()];
          if (_value === void(0))
            throw new ValueError('Invalid anchor type: ' + _value);
          this._anchor = _value;
          this._dirty |= Fashion.DIRTY_SHAPE;
          if (this.drawable)
            this.drawable._enqueueForUpdate(this);
        };
        return this._anchor;
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
