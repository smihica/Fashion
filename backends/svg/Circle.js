var Circle = _class("CircleSVG", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          Fashion.DIRTY_POSITION | Fashion.DIRTY_SIZE,
          function() {
            var position = this.wrapper._position, size = this.wrapper._size;
            this._elem.setAttribute('rx', (size.x / 2) + 'px');
            this._elem.setAttribute('ry', (size.y / 2) + 'px');
            this._elem.setAttribute('cx', (position.x + (size.x / 2))+'px');
            this._elem.setAttribute('cy', (position.y + (size.y / 2))+'px');
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function() {
      return newElement('ellipse');
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
