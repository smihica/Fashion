var Drawable = _class("Drawable", {

  props: {
    impl: null,
    handler: null,
    _id_acc: 0,
    _target: null,
    _elements: {},
    _capturing_elements: {},
    _numElements: 0,
    _anchor: 'left-top',
    _content_size:      {width: 0, height: 0},
    _content_size_real: {width: 0, height: 0},
    _viewport_size:     {width: 0, height: 0},
    _scroll_position:      {x: 0, y: 0},
    _scroll_position_real: {x: 0, y: 0},
    _zoom_ratio: 1.0
  },

  methods: {
    init: function(target, size)
    {
      var self = this;
      this.target = target;

      var content_size, viewport_size;
      if (size) {
        viewport_size = (size.viewport) ? size.viewport : size;
        content_size  = (size.content)  ? size.content  : (size.viewport) ? size.viewport : size;
        if (content_size.width < viewport_size.width)   content_size.width  = viewport_size.width;
        if (content_size.height < viewport_size.height) content_size.height = viewport_size.height;

      } else {
        content_size = viewport_size = {
          width:  target.style.clientWidth,
          height: target.style.clientHeight
        };
      }

      this._content_size.width  = content_size.width;
      this._content_size.height = content_size.height;
      this._content_size_real.width  = content_size.width * this._zoom_ratio;
      this._content_size_real.height = content_size.height * this._zoom_ratio;
      this._viewport_size.width  = viewport_size.width;
      this._viewport_size.height = viewport_size.height;

      this.impl = new Fashion.IMPL.Drawable(
        target,
        this._content_size_real,
        this._viewport_size,
        function(position) {
          self._scroll_position.x = position.x / self._zoom_ratio;
          self._scroll_position.y = position.y / self._zoom_ratio;
        }
      );

    },

    zoom: function(ratio, position)
    {
      this._zoom_ratio = ratio;
      this.impl.zoom(ratio);
      this.contentSize(this._content_size);
      if (position) {
        this.scrollPosition({
          x: position.x - ((this._viewport_size.width  / this._zoom_ratio) / 2),
          y: position.y - ((this._viewport_size.height / this._zoom_ratio) / 2)
        });
      }
    },

    viewportSize: function(size)
    {
      if (size) {
        size.width  = Math.max(size.width, 0);
        size.height = Math.max(size.height, 0);
        this._viewport_size.width  = size.width;
        this._viewport_size.height = size.height;
        this.impl.viewportSize(this._viewport_size);
        this.contentSize(this._content_size);
      }
      return _clone(this._viewport_size);
    },

    contentSize: function(size)
    {
      if (size) {
        var vs = this._viewport_size;

        this._content_size.width  = Math.max(size.width,  vs.width);
        this._content_size.height = Math.max(size.height, vs.height);
        this._content_size_real.width  = Math.round(Math.max(this._content_size.width  * this._zoom_ratio, vs.width));
        this._content_size_real.height = Math.round(Math.max(this._content_size.height * this._zoom_ratio, vs.height));

        this.impl.contentSize(
          this._content_size_real,
          (this._content_size.width > this._viewport_size.width ||
           this._content_size.height > this._viewport_size.height));

        this.scrollPosition(this._scroll_position);
      }
      return _clone(this._content_size);
    },

    scrollPosition: function(position)
    {
      if (position) {
        var cs = this._content_size, vs = this._viewport_size;
        var left_limit = cs.width  - vs.width;
        var top_limit  = cs.height - vs.height;
        this._scroll_position.x = _clip(position.x, 0, left_limit);
        this._scroll_position.y = _clip(position.y, 0, top_limit);
        this._scroll_position_real.x = Math.round(this._scroll_position.x * this._zoom_ratio);
        this._scroll_position_real.y = Math.round(this._scroll_position.y * this._zoom_ratio);
        this.impl.scrollPosition(this._scroll_position_real);
      }

      return _clone(this._scroll_position);
    },

    getOffsetPosition: function()
    {
      return this.impl.getOffsetPosition();
    },

    gensym: function()
    {
      var sym = "G" + (++this._id_acc);
      return sym;
    },

    numElements: function()
    {
      return this._numElements;
    },

    each: function(func)
    {
      var elems = this._elements;
      for (var i in elems) {
        if (elems.hasOwnProperty(i)) {
          func.call(this, elems[i], i);
        }
      }
    },

    find: function(func)
    {
      var rt = null;
      this.each(function(elem, i) {
        if (rt || !func.call(this, elem, i)) return;
        rt = elem;
      });
      return rt;
    },

    collect: function(func)
    {
      var rt = [];
      this.each(function(elem, i) {
        if (func.call(this, elem, i)) rt.push(elem);
      });
      return rt;
    },

    map: function(func)
    {
      var elems = this._elements;
      this.each(function(elem, i) { elems[i] = func.call(this, elem); });
      return this;
    },

    anchor: function(d)
    {
      if (d) {
        this._anchor = d;
        this.impl.anchor(d);
      }
      return this._anchor;
    },

    draw: function(shape) {
      this.impl.append(shape.impl);
      var id = this.gensym();
      this._elements[id] = shape;
      shape.__id = id;
      shape.attachTo(this);
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
      var id = shape.__id;

      if (id && (id in this._elements)) {
        shape.drawable = null;
        delete shape.__id;
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

    addEvent: function(h) {
      if (this.handler === null) this.handler = new MouseEventsHandler(this);
      this.handler.add(h);
    },

    removeEvent: function()
    {
      if (this.handler === null) throw new NotSupported("EventsHandler has not initialized in this drawable.");
      this.handler.remove.apply(this.handler, arguments);
    }
  }
});
