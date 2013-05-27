var DepthManager = _class("DepthManager", {
  props: {
    root: null,
    layers: [],
    depth: [],
    idDepthTable: {}
  },

  methods: {
    init: function(root) {
      this.root = root;
    },

    add: function(shape) {
      var nth = shape.wrapper._zIndex;
      var id = shape.wrapper.id;
      var layer, last_nth;

      // if already exists
      if (last_nth = this.idDepthTable[id]) {

        // if same depth. nothing todo.
        if (last_nth == nth) return;

        // remove
        layer = this.layers[last_nth];
        for (var i=0,l=layer.length; i<l; i++) {
          if (layer[i].wrapper.id == id) {
            layer.splice(i, 1);
            if (layer.length == 0) {
              this.layers.splice(last_nth, 1);
              if (layer.next) layer.next.prev = layer.prev;
              if (layer.prev) layer.prev.next = layer.next;
              this.depth.splice(this.depth.indexOf(last_nth), 1);
            }
            break;
          }
        }
      }

      // if no elements of same depth.
      if (!(layer = this.layers[nth])) {

        var s = 0, e = this.depth.length;

        while (s != e) {
          var c = (s + e) >> 1;
          if (this.depth[c] < nth) {
            s = c + 1;
          } else {
            e = c;
          }
        }

        this.depth.splice(s, 0, nth);

        var idx;

        layer = []; // new layer;

        var prev_layer =
          ((((idx = this.depth[s-1]) !== void(0)) && this.layers[idx]) ||
           null);

        var next_layer =
          ((((idx = this.depth[s+1]) !== void(0)) && this.layers[idx]) ||
           null);

        if (prev_layer) prev_layer.next = layer;
        layer.prev = prev_layer;

        if (next_layer) next_layer.prev = layer;
        layer.next = next_layer;

        this.layers[nth] = layer;

      }

      // if shape has elem.
      // find next-shape that has elem, and insert shape.elem before it.
      if (shape._elem) {
        var layer_for_iter = layer;
        var after_elem = null;
        outer:
        // start from next layer.
        while (layer_for_iter = layer_for_iter.next) {
          for (var i=0,l=layer_for_iter.length; i<l; i++) {
            if (after_elem = layer_for_iter[i]._elem) break outer;
          }
        }
        shape._elem.parentNode.insertBefore(shape._elem, after_elem);
      }

      layer.push(shape);
      this.idDepthTable[id] = nth;

    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
