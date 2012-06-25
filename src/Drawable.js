var Drawable = _class("Drawable", {
  props: {
    backend: null,
    impl: null,
    handler: null,
    batchUpdater: null,
    target: null,
    _id_acc: 0,
    _elements: {},
    _capturing_elements: {},
    _numElements: 0,
    _anchor: 'left-top',
    _content_size:      { x: 0, y: 0 },
    _viewport_size:     { x: 0, y: 0 },
    _offset_position:      null,
    _transform: null,
    _inverse_transform: null,
    _dirty: 0
  },
  methods: {
    init: function(target, options) {
      this.backend = options && options.backend || Fashion.getBackend();
      this.target = target;
      this.impl = new this.backend.Drawable(this);
      this.transform(Matrix.scale(1.));
      if (options && options.viewportSize) {
        this.viewportSize(options.viewportSize);
      } else {
        var self = this;
        if (_window) {
          onceOnLoad(function () {
            var size = { x: target.clientWidth, y: target.clientHeight };
            self.viewportSize(size);
            if (!options || !options.contentSize)
              self.contentSize(size);
          });
        }
      }
      if (options) {
        if (options.contentSize)
          this.contentSize(options.contentSize);
        else if (options.viewportSize)
          this.contentSize(options.viewportSize);
      }
    },

    dispose: function () {
      this.impl.dispose();
    },

    viewportSize: function(size) {
      if (size) {
        this._viewport_size = size;
        this._dirty |= Fashion.DIRTY_SIZE;
        this._enqueueForUpdate(this);
      }
      return this._viewport_size;
    },

    viewportInnerSize: function () {
      return this.impl._viewportInnerSize;
    },

    contentSize: function(size) {
      if (size) {
        this._content_size = size;
        this._dirty |= Fashion.DIRTY_TRANSFORM;
        this._enqueueForUpdate(this);
      }
      return this._content_size;
    },

    scrollPosition: function(position) {
      if (position)
        return this.impl.scrollPosition(position);
      else
        return this.impl.scrollPosition();
    },

    transform: function (value) {
      if (value) {
        this._transform = value;
        this._inverse_transform = value.invert();
        this._dirty |= Fashion.DIRTY_TRANSFORM;
        this._enqueueForUpdate(this);
      }
      return this._transform;
    },

    gensym: function() {
      var sym = "G" + (++this._id_acc);
      return sym;
    },

    numElements: function() {
      return this._numElements;
    },

    each: function(func) {
      var elems = this._elements;
      for (var i in elems) {
        if (elems.hasOwnProperty(i)) {
          func.call(this, elems[i], i);
        }
      }
    },

    find: function(func) {
      var rt = null;
      this.each(function(elem, i) {
        if (rt || !func.call(this, elem, i)) return;
        rt = elem;
      });
      return rt;
    },

    collect: function(func) {
      var rt = [];
      this.each(function(elem, i) {
        if (func.call(this, elem, i)) rt.push(elem);
      });
      return rt;
    },

    map: function(func) {
      var elems = this._elements;
      this.each(function(elem, i) { elems[i] = func.call(this, elem); });
      return this;
    },

    anchor: function(d) {
      if (d) {
        this._anchor = d;
        this.impl.anchor(d);
      }
      return this._anchor;
    },

    draw: function(shape) {
      var id = this.gensym();
      shape.id = id;
      shape._attachTo(this);
      this.impl.append(shape.impl);
      shape.impl.refresh(shape._dirty);
      this._elements[id] = shape;
      this._numElements++;
      return shape;
    },

    drawAll: function(shapes) {
      for(var i=0,l=shapes.length; i<l; i++) {
        shapes[i] = this.draw(shapes[i]);
      }
      return shapes;
    },

    erase: function(shape) {
      var id = shape.id;

      if (id && (id in this._elements)) {
        shape.drawable = null;
        shape._dirty = ~0;
        shape.id = null;
        this.impl.remove(shape.impl);
        delete this._elements[id];
        this._numElements--;
      } else {
        throw new NotSupported("Shape " + shape + " is not added yet");
      }
      return shape;
    },

    captureMouse: function() {
      this.impl.captureMouse(this.impl);
    },

    releaseMouse: function() {
      this.impl.releaseMouse(this.impl);
    },

    addEvent: function(type, h) {
      if (this.handler === null)
        this.handler = new MouseEventsHandler(this);
      this.handler.add.apply(this.handler, arguments);
      this._dirty |= Fashion.DIRTY_EVENT_HANDLERS;
      this._enqueueForUpdate(this);
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
    },

    _enqueueForUpdate: function (shape) {
      if (this.batchUpdater) {
        this.batchUpdater.schedule(shape, shape._refresh);
      } else {
        shape._refresh();
      }
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
