var Base = _class("Base", {
  props: {
    id: null,
    impl: null,
    drawable: null,
    handler: null,
    _position: { x: 0, y: 0 },
    _size: { x: 0, y: 0 },
    _style: { fill: null, stroke: null },
    _zIndex: 0,
    _transform: null,
    _dirty: Fashion.DIRTY_POSITION | Fashion.DIRTY_SIZE | Fashion.DIRTY_ZINDEX ,
    _visibility: true
  },

  methods: {
    init: function (values) {
      if (values) {
        for (var i in values) {
          switch (typeof this[i]) {
          case 'function':
            this[i](values[i]);
            break;
          default:
            throw new ArgumentError('Invalid keyword argument: ' + i);
          }
        }
      }
    },

    position: function(value) {
      if (value) {
        this._position = value;
        this._dirty |= Fashion.DIRTY_POSITION;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._position;
    },

    size: function(value) {
      if (value) {
        this._size = value;
        this._dirty |= Fashion.DIRTY_SIZE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._size;
    },

    zIndex: function(value) {
      if (value !== void(0)) {
        this._zIndex = value;
        this._dirty |= Fashion.DIRTY_ZINDEX;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._zIndex;
    },

    transform: function(value) {
      if (value !== void(0)) {
        this._transform = value;
        this._dirty |= Fashion.DIRTY_TRANSFORM;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._transform;
    },

    style: function(value) {
      if (value !== void(0)) {
        this._style = value;
        this._dirty |= Fashion.DIRTY_STYLE;
        if (this.drawable)
          this.drawable._enqueueForUpdate(this);
      }
      return this._style;
    },

    _attachTo: function(drawable) {
      this.drawable = drawable;
      this.impl = new drawable.backend[this.constructor.impl](this);
    },

    captureMouse: function() {
      if (!this.drawable)
        throw new NotAttached("This Shape is not attached any Drawable yet.");
      this.drawable.impl.captureMouse(this.impl);
    },

    releaseMouse: function() {
      if (!this.drawable)
        throw new NotAttached("This Shape is not attached any Drawable yet.");
      this.drawable.impl.releaseMouse(this.impl);
    },

    addEvent: function(type, h) {
      if (this.handler === null) {
        this.handler = new MouseEventsHandler(
          this,
          ['mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout']
        );
      }
      this.handler.add.apply(this.handler, arguments);
      this._dirty |= Fashion.DIRTY_EVENT_HANDLERS;
      if (this.drawable)
        this.drawable._enqueueForUpdate(this);
    },

    removeEvent: function(type, h) {
      if (this.handler === null) return;
      var arglen = arguments.length;
      if (arglen === 0) {
        this.handler.removeAll();
      } else if (arglen == 1) {
        this.handler.removeAll.apply(this.handler, type);
      } else if (arguments.length < 3) {
        this.handler.remove(type, h);
      }
      this._dirty |= Fashion.DIRTY_EVENT_HANDLERS;
      if (this.drawable)
        this.drawable._enqueueForUpdate(this);
    },

    _refresh: function () {
      this.impl.refresh(this._dirty);
      this._dirty = 0;
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
