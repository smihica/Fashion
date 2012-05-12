var Text = _class("TextVML", {
  mixins: [Base],

  props : {
    _elem: null,
    _str: '',
    _size: 0,
    _position: { x: 0, y: 0 }
  },

  methods: {
    init: function(str) {
      this._str = str;
    },

    attachedTo: function(drawable) {
      this.drawable = drawable;
      var vml = [
        '<', VML_PREFIX, ':line style="position:absolute; width:100px; height:100px; left:0px; top:0px">',
        '<', VML_PREFIX, ':path textpathok="t" />',
        '<', VML_PREFIX, ':textpath string="', _escapeXMLSpecialChars(this._str), '" />',
        '</', VML_PREFIX, ':line>'
      ].join('');
      drawable._vg.insertAdjacentHTML('beforeEnd', vml);
      this._elem = drawable._vg.lastChild;
    },

    position: function(x, y, width, height)
    {
      this.position = 
      this._elem.style.left = x;
      this._elem.style.top = y;
    },

    size: function(font_size)
    {
      if (this._elem)
        this._elem.firstChild.nextSibling.style.font = "normal normal normal " + font_size + "pt 'Arial'";
    },

    family: function(font_family)
    {
    }
  }
});
