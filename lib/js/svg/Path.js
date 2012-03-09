var Path = _class("Path", {
  props : {
    _elem: null
  },

  methods: {
    init: function(id)
    {
      this._elem = Util.createSvgElement(id, 'path');
    },

    points: function(points)
    {
      if (points !== undefined) {
        this._points = points;
        this._elem.setAttribute('d', points.join().replace(/,/g, ' '));
      }

      return this._points;
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