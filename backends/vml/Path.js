var Path = _class("PathVML", {
  mixins: [Base],

  props: {
    _elem: null,
    _points: null
  },

  methods: {
    init: function() {
      this._elem = newElement('shape');
      this.resetStyle();
    },

    attachedTo: function(drawable) {
      this.drawable = drawable;
      var vml = [
        '<', VML_PREFIX, ':shape style="position:absolute; width:100px; height:100px; left:0px; top:0px" ',
        'path="', Util.convertPathArray(this.points), '">',
        '</', VML_PREFIX, ':shape>'
      ].join('');
      drawable._vg.insertAdjacentHTML('beforeEnd', vml);
      this._elem = drawable._vg.lastChild;
    },

    points: function(points, parent) {
      if (points !== void(0)) {
        this._points = points;
      }
      return this._points;
    }
  }
});

