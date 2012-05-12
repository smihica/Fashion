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
