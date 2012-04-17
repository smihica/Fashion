var Path = _class("PathVML", {

  mixins: [Base],

  props: {
    _elem: null
  },

  methods: {

    init: function()
    {
      this._elem = Util.createVmlElement('shape');
      this.resetStyle();
    },

    points: function(points, parent)
    {
      if (points !== void(0)) {
        var s = parent.size();
        var p = parent.position();

        this._points = points;
        this._elem.setAttribute('path', Util.convertPathArray(points));
        this._elem.style.width  = '1000px';
        this._elem.style.height = '1000px';
        this._elem.style.left = '0';
        this._elem.style.top  = '0';
      }

      return this._points;
    }
  }
});

