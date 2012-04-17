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
      if (points !== void(0)) {
        this._points = points;
        this._elem.setAttribute('d', points.join().replace(/,/g, ' '));
      }

      return this._points;
    }
  }
});
