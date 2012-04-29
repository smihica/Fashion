var Fill = _class("Fill", {
  props: {},
  methods: {}
});

var FloodFill = _class("FloodFill", {
  parent: Fill,

  props: {
    color: new Color()
  },

  methods: {
    init: function(color) {
      this.color = color;
    }
  }
});

var GradientFill = _class("GradientFill", {
  parent: Fill,

  props: {
    colors: [],
  },

  methods: {
    init: function(colors) {
      this.colors = colors;
    }
  }
});

var LinearGradientFill = _class("LinearGradientFill", {
  parent: GradientFill,

  props: {
    angle: 0
  },

  methods: {
    init: function(colors, angle) {
      this.__super__().init.call(this, colors);
      this.angle = angle;
    }
  }
});

var RadialGradientFill = _class("RadialGradientFill", {
  parent: GradientFill,

  props: {
    focus: { x: "50%", y: "50%" }
  },

  methods: {
    init: function(colors, focus) {
      this.__super__().init.call(this, colors);
      this.focus = focus;
    }
  }
});

var ImageTileFill = _class("ImageTileFill", {
  parent: Fill,

  props: {
    url: null,
    width: { x: 0, y: 0 }
  },

  methods: {
    init: function(url) {
      this.__super__().init.call(this);
      this.url = url;
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
