var Circle = _class("Circle", {

  mixins: [Base],

  interfaces: [Shape],

  props: {},

  methods: {
    init: function (values) {
      Base.prototype.init.apply(this, arguments);
      this.impl = new Fashion.IMPL.Circle(this);
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
