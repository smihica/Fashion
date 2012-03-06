var Rect = _class("Rect", {

  mixins: [Base],

  interfaces: [Shape],

  props: {
    id: ''
  },

  methods: {
    init: function (id, x, y, width, height)
    {
      this.id = id;
      this.impl = new IMPL.Rect(id);
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