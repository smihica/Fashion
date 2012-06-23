var Circle = _class("CircleVML", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          Fashion.DIRTY_POSITION,
          function() {
            var position = this.wrapper._position;
            this._elem.node.style.left = position.x + 'px';
            this._elem.node.style.top = position.y + 'px';
          }
        ],
        [
          Fashion.DIRTY_SIZE,
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
      var vml = appendPrologue([], this.wrapper.id, 'oval');
      appendStyles(vml, this);
      appendEpilogue(vml, 'oval');
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
