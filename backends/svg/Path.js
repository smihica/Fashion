var Path = _class("PathSVG", {

  mixins: [Base],

  props : {
    _elem: null
  },

  methods: {
    init: function()
    {
      this._elem = Util.createSvgElement('path');
    },

    points: function(points)
    {
      if (points !== undefined) {
        this._points = points;
        this._elem.setAttribute('d', points.join().replace(/,/g, ' '));
      }

      return this._points;
    }
  }
});