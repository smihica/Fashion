var Text = _class("Text", {
  mixins: [Base],
  interfaces: [Bindable, Shape],
  props: {
    _text: '',
    _fontFamily: 'Sans',
    _fontSize: 10
  },
  methods: {
    init: function (values) {
      Base.prototype.init.apply(this, arguments);
      this.impl = new Fashion.IMPL.Text(this);
    },

    fontFamily: function(value) {
      if (value) {
        this._fontFamily = value
        this._dirty |= DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._fontFamily;
    },

    fontSize: function(value) {
      if (value) {
        this._fontSize = value;
        this._dirty |= DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      };
      return this._fontSize;
    },

    text: function (value) {
      if (value) {
        this._text = value;
        this._dirty |= DIRTY_SHAPE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      };
      return this._text;
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
