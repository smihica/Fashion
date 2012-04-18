var Drawable = _class("Drawable", {

  props: {
    impl: null,
    _id_acc: 0,
    _target: null,
    _elements: {},
    _numElements: 0,
    _content_size: {},
    _viewport_size: {},
    _anchor: 'left-top'
  },

  methods: {

    init: function(target, content_size, viewport_size)
    {
      this.target = target;

      this._content_size = _clone(content_size);
      this._viewport_size = _clone(viewport_size);

      this.impl = new Fashion.IMPL.Drawable(target, content_size, viewport_size);
    },

    viewPortPosition: function()
    {
    },

    viewPortSize: function()
    {
    },

    contentSize: function()
    {
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

    find: function(func)
    {
      var elems = this._elements;
      for (var i in elems) {
        var elem = elems[i];
        if (func(elem))
          return elem;
      }
      return null;
    },

    map: function(func)
    {
      var rt = [], elems = this._elements;
      for (var i in elems) {
        var elem = func(elems[i]);
        if (elem !== void(0))
          rt.push(elem);
      }
      return rt;
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
      if (!id)
        throw "Shape " + shape + " is not added yet"; 
      if (id in this._elements) {
        this.impl.remove(shape.impl);
        delete this._elements[id];
        this._elements.__id = null;
        this._numElements--;
      }
      return shape;
    },

    eraseIf: function(func) {
      var elems = this._elements;
      for (var i in elems) {
        var elem = elems[i];
        if (elem !== void(0)) {
          if (func(elem)) {
            return this.erase(elem);
          }
        }
      }
    },

    eraseAllIf: function(func) {
      var rt = [];
      var elems = this._elements;
      for (var i in elems) {
        var elem = elems[i];
        if (elem !== void(0)) {
          if (func(elem)) {
            rt.push(i);
          }
        }
      }
      for (var i=0,l=rt.length; i<l; i++) {
        rt[i] = this.erase(elems[rt[i]])
      }
      return rt;
    }
  }
});
