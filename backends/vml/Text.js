var Text = _class("TextVML", {
  mixins: [Base],

  props : {
    _elem: null,
    _child: null,
    _path: null
  },

  methods: {
    init: function(str)
    {

      this._elem  = Util.createVmlElement('line');
      this._path  = Util.createVmlElement('path');
      this._child = Util.createVmlElement('textpath');
      this._path.setAttribute('textpathok', 'true');
      this._child.setAttribute('string', str);
      this._child.setAttribute('on', 'true');
      this._elem.appendChild(this._path);
      this._elem.appendChild(this._child);

      this._elem.style.width = '100px';
      this._elem.style.height = '100px';

/*
        <v:line from="50 200" to="400 100">
        <v:fill on="True" color="red"/>
        <v:path textpathok="True"/>
        <v:textpath on="True" string="VML Text"
           style="font:normal normal normal 36pt Arial"/>
        </v:line>
*/

    },

    position: function(x, y, width, height)
    {
      //this._elem.style.left = x + 'px';
      //this._elem.style.top  = y + 'px';

      this._elem.setAttribute('from', x + ' ' + y);
      this._elem.setAttribute('to', (x + 1) + ' ' + y);
    },

    size: function(font_size)
    {
      this._child.style.font = "normal normal normal " + font_size + "pt 'Arial'";
      // this._elem.style.fontSize = font_size + 'px';
    },

    family: function(font_family)
    {
      // this._elem.style.fontFamily = font_family;
    }
  }
});
