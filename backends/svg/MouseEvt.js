var MouseEvt = _class("MouseEvtSVG", {

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
/*
 * vim: sts=2 sw=2 ts=2 et
 */
