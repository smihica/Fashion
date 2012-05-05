var MouseEvt = _class("MouseEvt", {

  props: {
    contentPosition: {x:0,y:0},
    screenPosition:  {x:0,y:0},
    offsetPosition:  {x:0,y:0},
    left:            false,
    middle:          false,
    right:           false
  },

  methods: {
    init: function(impl_evt, target) {
      this.left   = impl_evt.left;
      this.middle = impl_evt.middle;
      this.right  = impl_evt.right;

      var px = impl_evt.pagePosition.x;
      var py = impl_evt.pagePosition.y;

      var shape = null, drawable = null;
      // drawable
      if (target instanceof Fashion.Drawable) {
        drawable = target;
      } else {
        shape = target;
        drawable = shape.drawable;
      }

      var offset_position = drawable.getOffsetPosition();
      var scroll_position = drawable.scrollPosition();

      // real size
      this.screenPosition.x  = px - offset_position.x;
      this.screenPosition.y  = py - offset_position.y;

      // logical size
      this.contentPosition.x = scroll_position.x + (this.screenPosition.x / drawable._zoom_ratio);
      this.contentPosition.y = scroll_position.y + (this.screenPosition.y / drawable._zoom_ratio);
      this.offsetPosition.x = this.contentPosition.x;
      this.offsetPosition.y = this.contentPosition.y;

      if (shape) {
        // logical size
        var sp = shape.position();
        this.offsetPosition.x -= sp.x;
        this.offsetPosition.y -= sp.y;
      }
    }
  }
});