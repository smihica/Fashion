var Path = _class("PathVML", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          Fashion.DIRTY_SHAPE,
          function () {
            this._elem.node.setAttribute('path', pathString(this.wrapper._points));
          }
        ],
        [
          Fashion.DIRTY_POSITION,
          function () {
            var position = this.wrapper._position;
            this._elem.node.style.left = position.x + 'px';
            this._elem.node.style.top = position.y + 'px';
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function(vg) {
      var position = this.wrapper._position;
      var vml = [
        '<', VML_PREFIX, ':shape',
        ' unselectable="on"',
        ' __fashion__id="', this.wrapper.id, '"',
        ' coordsize="',
            VML_FLOAT_PRECISION, ',',
            VML_FLOAT_PRECISION, '" ',
        ' path="', pathString(this.wrapper._points), '"'
      ];
      var fillAndStroke = new VMLFillAndStroke();
      this._buildVMLStyle(fillAndStroke);
      fillAndStroke.setStyle({
        position: 'absolute',
        display: 'block',
        width: '1px',
        height: '1px',
        margin: 0,
        padding: 0,
        left: position.x + 'px',
        top: position.y + 'px'
      });
      fillAndStroke.appendHTML(vml);
      vml.push('</', VML_PREFIX, ':shape', '>');
      vg.node.insertAdjacentHTML('beforeEnd', vml.join(''));
      return populateWithChildElements({
        node: vg.node.lastChild,
        fill: null,
        stroke: null,
        skew: null
      });
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
