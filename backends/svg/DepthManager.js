var DepthManager = _class("DepthManager", {
  props: {
    root: null,
    shapes: {},
    depth: []
  },

  methods: {
    init: function(root) {
      this.root = root;
    },

    add: function(shape) {
      var pair = this.shapes[shape.id];
      if (pair)
        this.depth.splice(pair[0], 1);

      var s = 0, e = this.depth.length;
      while (s != e) {
        var c = (s + e) >> 1;
        if (this.shapes[this.depth[c]][1].wrapper.zIndex < shape.wrapper.zIndex) {
          s = c;
        } else {
          e = c;
        }
      }
      this.depth.splice(s, 0, shape.id);
      if (shape._elem) {
        var beforeChild = null;
        for (var i = s + 1; i < this.depth.length; i++) {
          beforeChild = this.shapes[this.depth[i]][1]._elem;
          if (beforeChild)
            break;
        }
        shape._elem.parentNode.insertBefore(shape._elem, beforeChild);
      }
      this.shapes[shape.id] = [ s, shape ];
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
