var Circle = _class("Circle", {

  mixins: [Base],

  interfaces: [Shape],

  props: {},

  methods: {
    init: function (x, y, width, height)
    {
      this.impl = new Fashion.IMPL.Circle();
      this.size({width: width, height: height});
      this.position({x: x, y: y});
    },

    displayPosition: function()
    {
    },

    displaySize: function()
    {
    },

    gravityPosition: function()
    {
    },

    hitTest: function(d)
    {
    }
  }
});
