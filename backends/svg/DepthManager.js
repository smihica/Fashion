var DepthManager = _class("DepthManager", {
  props: {
    root: null,
    depth: []
  },

  methods: {
    init: function(root) {
      this.root = root;
    },

    add: function(shape) {
      var s = 0, e = this.depth.length;
      while (s != e) {
        var c = (s + e) >> 1;
        if (this.depth[c].wrapper._zIndex < shape.wrapper._zIndex) {
          s = c + 1;
        } else {
          e = c;
        }
      }
      var exists = false;
      while (s < this.depth.length && this.depth[s].wrapper._zIndex == shape.wrapper._zIndex) {
        if (this.depth[s].wrapper.id == shape.wrapper.id) {
          exists = true;
          break;
        }
        s++;
      }
      this.depth.splice(s, exists, shape);
      if (shape._elem) {
        var beforeChild = null;
        for (var i = s + 1; i < this.depth.length; i++) {
          beforeChild = this.depth[i]._elem;
          if (beforeChild)
            break;
        }
        shape._elem.parentNode.insertBefore(shape._elem, beforeChild);
      }
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
