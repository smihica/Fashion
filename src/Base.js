var Base = _class("Base", {

  props: {
    impl: null,
    drawable: null,
    _position: {x:0, y:0},
    _size: {width:0, height:0},
    _transform: {},
    _style: {},
    handler: null
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
      return _clone(this._position);
    },

    size: function(d)
    {
      if (d) {
        var width = d.width, height = d.height;
        this._size.width = width;
        this._size.height = height;
        this.impl.size(width, height);
      }
      return _clone(this._size);
    },

    transform: function()
    {
      var l;

      if ((l = arguments.length) > 0) {

        var scale, rotate, translate, tr, j, i;
        var pos = this.position();
        var x = pos.x, y = pos.y;
        var m = new Util.Matrix();

        for (j=0; j<l; j++) {

          tr = arguments[j];

          for (i in tr) {
            if (tr.hasOwnProperty(i)) {
              switch(i) {
              case 'scale':
                scale = tr[i];
                if (scale.x === void(0) || scale.y === void(0))
                  throw new ArgumentError("transform() scale needs x, y parameters at least.");
                if (scale.cx === void(0)) scale.cx = x;
                if (scale.cy === void(0)) scale.cy = y;
                this._transform.scale = scale;
                break;

              case 'rotate':
                rotate = tr[i];
                if (rotate.angle === void(0))
                  throw new ArgumentError("transform() rotate needs angle parameter at least.");
                if (rotate.x === void(0)) rotate.x = x;
                if (rotate.y === void(0)) rotate.y = y;
                this._transform.rotate = rotate;
                break;

              case 'translate':
                translate = tr[i];
                if (translate.x === void(0) || translate.y === void(0))
                  throw new ArgumentError("transform() translate needs x, y parameters at least.");
                this._transform.translate = translate;
                break;

              default:
                throw new ArgumentError("transform() expects 'translate', 'scale', 'rotate', but '" + i + "' given.");

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

    resetTransform: function()
    {
      this._transform = {};
      this.impl.resetTransform();
    },

    style: function(st)
    {
      if (st !== void(0)) {
        var i;
        var stroke = null;
        visibility=true,
        fill = null;
        cursor='default',
        zIndex=0;

        for (i in st) {
          if (st.hasOwnProperty(i)) {
            switch(i) {
            case 'stroke':
              stroke = st[i];
              break;
            case 'visibility':
              visibility = st[i];
              break;
            case 'fill':
              fill = st[i];
              break;
            case 'cursor':
              cursor = st[i];
              break;
            case 'zIndex':
              zIndex = st[i];
              break;
            }
          }
        }

        this._style = {
          stroke: stroke,
          visibility: visibility,
          fill: fill,
          cursor: cursor,
          zIndex: zIndex
        };

        if (this.drawable)
          this.impl.style(this._style);
      }

      return this._style;
    },

    attachTo: function(drawable) {
      this.drawable = drawable;
      this.impl.style(this._style);
    },

    resetStyle: function()
    {
      this._style = {};
      this.impl.resetStyle();
    },

    captureMouse: function() {

      if (!this.drawable)
        throw new NotAttached("This Shape is not attached any Drawable yet.");

      this.drawable.captureMouse(this);

    },

    releaseMouse: function() {

      if (!this.drawable)
        throw new NotAttached("This Shape is not attached any Drawable yet.");

      this.drawable.releaseMouse(this);

    },

    addEvent: function(h)
    {
      if (this.handler === null) this.handler = new MouseEventsHandler(this);
      this.handler.add(h);
    },

    removeEvent: function()
    {
      if (this.handler === null) throw new NotSupported("EventsHandler has not initialized in this shape.");
      this.handler.remove.apply(this.handler, arguments);
    }
  }
});
