var Rect = _class("Rect", {
  props : {
    _elem: null
  },

  methods: {
    init: function(id)
    {
      this._elem = Util.createSvgElement(id, 'rect');
    },

    position: function(x, y, width, height)
    {
      this._elem.setAttribute('x', x+'px');
      this._elem.setAttribute('y', y+'px');
    },

    size: function(width, height)
    {
      this._elem.setAttribute('width', (width/2)+'px');
      this._elem.setAttribute('height', (height/2)+'px');
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
