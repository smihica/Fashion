var Circle = _class("CircleVML", {
  mixins: [Base],

  props: {
    _elem: null
  },

  methods: {
    init: function()
    {
      this._elem = newElement('oval');
    },

    position: function(x, y, width, height)
    {
      this._elem.style.left = x + 'px';
      this._elem.style.top  = y + 'px';
    },

    size: function(width, height)
    {
      this._elem.style.width  = width + 'px';
      this._elem.style.height = height + 'px';
    }
  }
});
