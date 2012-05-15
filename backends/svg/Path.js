var Path = _class("PathSVG", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          DIRTY_SHAPE,
          function () {
            this._elem.setAttribute('d', pathString(this.wrapper._points));
          }
        ],
        [
          DIRTY_POSITION,
          function () {
            this._transformStack.add('first', 'path-position', Util.Matrix.translate(this.wrapper.position));
            this._transformUpdated = true;
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function() {
      return newElement('path');
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
