var Circle = _class("CircleVML", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          DIRTY_POSITION,
          function() {
            var position = this.wrapper._position;
            this._elem.node.style.left = position.x + 'px';
            this._elem.node.style.top = position.y + 'px';
          }
        ],
        [
          DIRTY_SIZE,
          function() {
            var size = this.wrapper._size;
            this._elem.node.style.width = size.x + 'px';
            this._elem.node.style.height = size.y + 'px';
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function(vg) {
      var position = this.wrapper._position;
      var size = this.wrapper._size;
      var vml = [
        '<', VML_PREFIX, ':oval',
        ' __fashion__id="', this.wrapper.id, '"'
      ];
      var fillAndStroke = new VMLFillAndStroke();
      this._buildVMLStyle(fillAndStroke);
      fillAndStroke.setStyle({
        position: 'absolute',
        display: 'block',
        margin: 0,
        padding: 0,
        width: size.x + 'px',
        height: size.y + 'px',
        left: position.x + 'px',
        top: position.y + 'px'
      });
      fillAndStroke.appendHTML(vml);
      vml.push('</', VML_PREFIX, ':oval', '>');
      vg.node.insertAdjacentHTML('beforeEnd', vml.join(''));
      return {
        node: vg.node.lastChild,
        fill: null,
        stroke: null,
        skew: null
      };
    }
  }
});
