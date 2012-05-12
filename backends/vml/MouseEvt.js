var MouseEvt = _class("MouseEvtVML", {
  interfaces: [MouseEvtImpl],

  mixins: [UtilImpl.DomEvt],

  props: {
    pagePosition: {x:0,y:0},
    left:         false,
    middle:       false,
    right:        false
  },

  methods: {
    init: function(dom_evt, shape) {
      this.convertToMouseEvt(dom_evt);
    }
  }
});
