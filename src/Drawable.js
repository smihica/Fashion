var Drawable = _class("Drawable", {

  props: {
    impl: null,
    _id_acc: 0,
    _target: null,
    _elements: {},
    _capturing_elements: {},
    _numElements: 0,
    _content_size: {},
    _anchor: 'left-top'
  },

  methods: {
    init: function(target, content_size)
    {
      this.target = target;

      this._content_size = content_size ? _clone(content_size):
                           { width: target.clientWidth,
                             height: target.clientHeight };
      this.impl = new Fashion.IMPL.Drawable(target, this._content_size);
    },

    viewPortPosition: function()
    {
      return { x: target.scrollLeft, y: target.scrollTop };
    },

    viewPortSize: function()
    {
      return { width: target.clientWidth, height: target.clientHeight };
    },

    contentSize: function()
    {
      return this.impl.contentSize();
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
        throw new NotFound("Shape " + shape + " is not added yet");

      }
      return shape;
    },

    captureMouse: function(shape) {
      this.impl.captureMouse(shape.impl);
    },

    releaseMouse: function(shape) {
      this.impl.releaseMouse(shape.impl);
    }
  }
});
