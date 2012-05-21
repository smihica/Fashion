var Rect = _class("Rect", {
  mixins: [Base],
  interfaces: [Bindable, Shape],
  props: {},
  methods: {
    init: function (values) {
      Base.prototype.init.apply(this, arguments);
      this.impl = new Fashion.IMPL.Rect(this);
    },

    displayPosition: function() {
    },

    displaySize: function() {
    },

    gravityPosition: function() {
    },

    hitTest: function(d) {
    }
  }
});
