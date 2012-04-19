var Rect = _class("RectSVG", {

  interfaces: [ShapeImpl],

  mixins: [Base],

  props : {
    _elem: null
  },

  methods: {
    init: function()
    {
      this._elem = Util.createSvgElement('rect');
    },

    position: function(x, y, width, height)
    {
      this._elem.setAttribute('x', x+'px');
      this._elem.setAttribute('y', y+'px');
    },

    size: function(width, height)
    {
      this._elem.setAttribute('width', width+'px');
      this._elem.setAttribute('height', height+'px');
    }
  }
});
