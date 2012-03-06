var Base = _class("Base", {

  props: {
    impl: null,
    _position: {x:0, y:0},
    _size: {width:0, height:0},
    _transform: {}
  },

  methods: {
    position: function(d)
    {
      if (d) {
        var x = d.x, y = d.y;
        this._position.x = x;
        this._position.y = y;
        this.impl.position(x, y, this._size.width, this._size.height);
      }
      return {x: this._position.x, y: this._position.y};
    },

    size: function(d)
    {
      if (d) {
        var width = d.width, height = d.height;
        this._size.width = width;
        this._size.height = height;
        this.impl.size(width, height);
      }
      return {width: this._size.width, height: this._size.height};
    },

    transform: function()
    {
      var l;

      if ((l = arguments.length) > 0) {

        var scale, rotate, translate, tr, j;
        var pos = this.position();
        var x = pos.x, y = pos.y;
        var m = new Fashion.Lib.Matrix();

        for (j=0; j<l; j++) {

          tr = arguments[j];

          for (i in tr) {
            if (tr.hasOwnProperty(i)) {
              if (i === 'scale') {
                scale = tr.scale;
                if (!scale.x || !scale.y) _error("Less parameters Error.", "transform() scale needs x, y parameters at least.");
                if (!scale.cx) scale.cx = x;
                if (!scale.cy) scale.cy = y;
                this._transform.scale = scale;

              } else if (i === 'rotate') {
                rotate = tr.rotate;
                if (!rotate.angle) _error("Less parameters Error.", "transform() rotate needs angle parameter at least.");
                if (!rotate.x) rotate.x = x;
                if (!rotate.y) rotate.y = y;
                this._transform.rotate = rotate;

              } else if (i === 'translate') {
                translate = tr.translate;
                if (!translate.x || !translate.y) _error("Less parameters Error.", "transform() translate needs x, y parameters at least.");
                this._transform.translate = translate;

              } else {
                _error('Invalid property Error.', "transform() expects 'tranlate', 'scale', 'rotate', but given '" + i + "'.");

              }
            }
          }
          m.set(tr);
        }

        this.impl.transform(m);
      }

      return ({
        scale:     this._transform.scale,
        rotate:    this._transform.rotate,
        translate: this._transform.translate
      });

    },

    reset: function()
    {
      this._transform = {};
      this.impl.reset();
    },

    style: function(st)
    {
    }
  }
});