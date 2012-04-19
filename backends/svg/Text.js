var Text = _class("TextSVG", {

  interfaces: [TextImpl],

  mixins: [Base],

  props : {
    _elem: null
  },

  methods: {
    init: function(str)
    {
      this._elem = Util.createSvgElement('text');
      this._elem.appendChild(Util.createTextElement(str));
    },

    position: function(x, y)
    {
      this._elem.setAttribute('x', x+'px');
      this._elem.setAttribute('y', y+'px');
    },

    size: function(font_size)
    {
      this._elem.setAttribute('font-size', font_size+'px');
    },

    fontFamily: function(font_family)
    {
      this._elem.setAttribute('font-family', font_family);
    }
  }
});