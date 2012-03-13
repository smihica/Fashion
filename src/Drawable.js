var Drawable = _class("Drawable", {

  props: {
    impl: null,
    _id_acc: 0,
    _target: null,
    _elements: {},
    _anchor: 'left-top'
  },

  methods: {

    init: function(target, width, height)
    {
      this.target = target;
      this.impl = new IMPL.Drawable(target, width, height);
    },

    gensym: function()
    {
      var sym = "G"+this._id_acc;
      this._id_acc++;
      return sym;
    },

    findIf: function(func) {
      var elems = this._elements, elem, i;
      for (i in elems) {
        elem = elems[i];
        if (elem !== undefined) {
          if (func(elem)) return elem;
        }
      }
    },

    collectIf: function(func) {
      var rt = [], elems = this._elements, elem, i;
      for (i in elems) {
        elem = elems[i];
        if (elem !== undefined && func(elem))
          rt.push(elem);
      }
      return rt;
    },

    isExist: function(func) {
      var elems = this._elements, elem, i;
      for (i in elems) {
        elem = elems[i];
        if (elem !== undefined && func(elem))
          return true;
      }
      return false;
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
      var id = this.gensym();
      this._elements[id] = shape;
      shape.__id = id;
      this.impl.append(shape.impl);
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
      if (id !== undefined) {
        this._elements[id] = undefined;
        delete this._elements[id];
        this.impl.remove(shape.impl);
      }
      return shape;
    },

    eraseIf: function(func) {
      var elems = this._elements;
      for (var i in elems) {
        var elem = elems[i];
        if (elem !== undefined) {
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
        if (elem !== undefined) {
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
