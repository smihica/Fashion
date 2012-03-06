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

    anchor: function(d)
    {
      if (d) {
        this._anchor = d;
      }
      return this._anchor;
    },

    circle: function(x, y, width, height)
    {
      var id = this.gensym();
      var n = new Circle(id, x, y, width, height);
      this.append(n);
      return n;
    },

    rect: function(x, y, width, height)
    {
      var id = this.gensym();
      var n = new Rect(id, x, y, width, height);
      this.append(n);
      return n;
    },

    path: function(path_arr)
    {
      var id = this.gensym();
      var n = new Path(id, path_arr);
      this.append(n);
      return n;
    },

    text: function(x, y, src)
    {
      var id = this.gensym();
      var n = new Text(id, x, y, src);
      this.append(n);
      return n;
    },

    append: function(shape) {
      this._elements[shape.id] = shape;
      this.impl.append(shape.impl);
    },

    remove: function(id) {
      this._elements[id] = undefined;
      this.impl.remove(id);
    }
  }
});
