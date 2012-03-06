var Rect = _class("Rect", {

  includes: [Base],

  impls: [Shape],

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

    display_position: function()
    {
    },

    display_size: function()
    {
    },

    gravity_position: function()
    {
    },

    hit_test: function(d)
    {
    }
  }
});