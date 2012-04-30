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
    init: function(impl_evt, shape) {
      this.left   = impl_evt.left;
      this.middle = impl_evt.middle;
      this.right  = impl_evt.right;

      var px = impl_evt.pagePosition.x;
      var py = impl_evt.pagePosition.y;

      this.contentPosition.x = px;
      this.contentPosition.y = py;
      this.screenPosition.x  = px;
      this.screenPosition.y  = py;
      this.offsetPosition.x  = px;
      this.offsetPosition.y  = py;
    }
  }
});