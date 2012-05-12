var Rect = _class("RectSVG", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          DIRTY_POSITION,
          function () {
            var position = this.wrapper._position;
            this._elem.setAttribute('x', position.x + 'px');
            this._elem.setAttribute('y', position.y + 'px');
          }
        ],
        [
          DIRTY_SIZE,
          function () {
            var size = this.wrapper._size;
            this._elem.setAttribute('width', size.x + 'px');
            this._elem.setAttribute('height', size.y + 'px');
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function() {
      return newElement('rect');
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
