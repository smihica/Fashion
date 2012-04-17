var Text = _class("Text", {

  mixins: [Base],

  props: {},

  methods: {
    init: function (x, y, font_size, str)
    {
      this.impl = new Fashion.IMPL.Text(str);
      this.size({font: font_size});
      this.position({x: x, y: y});
    },

    fontFamily: function(d)
    {
      if (d) {
        this._family = d;
        this.impl.family(this._family);
      }
      return this._family;
    },

    lineWidth: function()
    {
    },

    size: function(d)
    {
      if (d) {
        var font = d.font;
        this._size.font = font;
        this.impl.size(font);
      };

      return {font: this._size.font};
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
