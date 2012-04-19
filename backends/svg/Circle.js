var Circle = _class("CircleSVG", {

  interfaces: [ShapeImpl],

  mixins: [Base],

  props : {
    _elem: null
  },

  methods: {
    init: function()
    {
      this._elem = Util.createSvgElement('ellipse');
    },

    position: function(x, y, width, height)
    {
      this._elem.setAttribute('cx', (x+(width/2))+'px');
      this._elem.setAttribute('cy', (y+(height/2))+'px');
    },

    size: function(width, height)
    {
      this._elem.setAttribute('rx', (width/2)+'px');
      this._elem.setAttribute('ry', (height/2)+'px');
    }
  }
});