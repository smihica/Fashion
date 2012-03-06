var Circle = _class("CircleSVG", {
  props : {
    _elem: null
  },

  methods: {
    init: function(id)
    {
      this._elem = Util.createSvgElement(id, 'ellipse');
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
    },

    transform: function(matrix)
    {
      this._elem.setAttribute('transform', Util.matrixString(matrix));
    },

    reset: function()
    {
      this._elem.removeAttribute('transform');
    }
  }
});