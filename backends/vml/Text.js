var Text = _class("TextVML", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          Fashion.DIRTY_POSITION,
          function () {
            var position = this.wrapper._position;
            this._elem.node.style.left = position.x + 'px';
            this._elem.node.style.top = position.y + 'px';
          }
        ],
        [
          Fashion.DIRTY_SIZE,
          function () {
            var size = this.wrapper._size;
            this._elem.node.style.width = size.x + 'px';
            this._elem.node.style.height = size.y + 'px';
          }
        ],
        [
          Fashion.DIRTY_SHAPE,
          function () {
            this._elem.textpath.fontSize = this.wrapper._fontSize + 'px'; 
            this._elem.textpath.fontFamily = this.wrapper._fontFamily;
            this._elem.textpath.string = this.wrapper._text;
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function(vg) {
      var vml = [
        '<', VML_PREFIX, ':line',
        ' unselectable="on"',
        ' __fashion__id="', this.wrapper.id, '"',
        ' from="0,0" to="1,0"'
      ];
      var fillAndStroke = new VMLFillAndStroke();
      fillAndStroke.setStyle({
        position: 'absolute',
        width: '1px',
        height: '1px',
        left: this.wrapper._position.x + 'px',
        top: this.wrapper._position.y + 'px'
      });
      this._buildVMLStyle(fillAndStroke);
      fillAndStroke.appendHTML(vml);
      vml.push(
        '<', VML_PREFIX, ':path textpathok="t" />',
        '<', VML_PREFIX, ':textpath string="', _escapeXMLSpecialChars(this.wrapper._text), '" on="t"',
        ' style="', 'font-size:', this.wrapper._fontSize, 'px;',
                    'font-family:', _escapeXMLSpecialChars(this.wrapper._fontFamily), ';',
                    'v-text-align:left" />',
        '</', VML_PREFIX, ':line', '>');
      vg.node.insertAdjacentHTML('beforeEnd', vml.join(''));
      var n = vg.node.lastChild;
      return populateWithChildElements({
        node: n,
        fill: null,
        stroke: null,
        skew: null,
        textpath: n.lastChild
      });
    }
  }
});
