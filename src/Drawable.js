var Drawable = _class("Drawable", {
  interfaces: [Bindable],

  props: {
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
    _dirty: DIRTY_SIZE | DIRTY_TRANSFORM
  },

  methods: {
    init: function(target, options) {
      var self = this;
      this.target = target;
      this._viewport_size = options && options.viewportSize || { x: target.clientWidth, y: target.clientHeight };
      this._content_size = options && options.contentSize || this._viewport_size;

      this.impl = new Fashion.IMPL.Drawable(this);
      this.transform(Util.Matrix.scale(1.));
    },

    viewportSize: function(size) {
      if (size) {
        this._viewport_size = size;
        this._dirty |= DIRTY_SIZE;
        this._enqueueForUpdate(this);
      }
      return this._viewport_size;
    },

    contentSize: function(size) {
      if (size) {
        this._content_size = size;
        this._dirty |= DIRTY_TRANSFORM;
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
        this._dirty |= DIRTY_TRANSFORM;
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
      this.impl.append(shape.impl);
      shape.impl.refresh(shape._dirty);
      var id = this.gensym();
      this._elements[id] = shape;
      shape.id = id;
      shape._attachTo(this);
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
        shape.id = null;
        this.impl.remove(shape.impl);
        delete this._elements[id];
        this._numElements--;
      } else {
        throw new NotSupported("Shape " + shape + " is not added yet");
      }
      return shape;
    },

    captureMouse: function(shape) {
      this.impl.captureMouse(shape.impl);
    },

    releaseMouse: function(shape) {
      this.impl.releaseMouse(shape.impl);
    },

    addEvent: function(type, h) {
      if (this.handler === null)
        this.handler = new MouseEventsHandler(this);
      this.handler.add.apply(this.handler, arguments);
      this._dirty |= DIRTY_EVENT_HANDLERS;
      this._enqueueForUpdate(this);
    },

    removeEvent: function(type, h) {
      if (this.handler === null)
        return;
      this.handler.remove(type, h);
      this._dirty |= DIRTY_EVENT_HANDLERS;
      if (this.drawable)
        this.drawable._enqueueForUpdate(this);
    },

    _enqueueForUpdate: function (shape) {
      if (this.batchUpdater) {
        this.batchUpdater.schedule(shape, function() {
          shape.impl.refresh(shape._dirty);
          shape._dirty = 0;
        });
      } else {
        shape.impl.refresh(shape._dirty);
        shape._dirty = 0;
      }
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
