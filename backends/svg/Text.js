var Text = _class("TextSVG", {
  parent: Base,

  class_props: {
    _refresher: new Refresher(Base._refresher).setup({
      moreHandlers: [
        [
          Fashion.DIRTY_POSITION,
          function () {
            var position = this.wrapper._position;
            this._elem.setAttribute('x', position.x + 'px');
            this._elem.setAttribute('y', position.y + 'px');
          }
        ],
        [
          Fashion.DIRTY_SIZE,
          function () {
            var size = this.wrapper._size;
            this._elem.setAttribute('width', size.x + 'px');
            this._elem.setAttribute('height', size.y + 'px');
          }
        ],
        [
          Fashion.DIRTY_SHAPE,
          function () {
            this._elem.setAttribute('font-size', this.wrapper._fontSize + 'px'); 
            this._elem.setAttribute('font-family', this.wrapper._fontFamily);
            if (this._elem.firstChild)
              this._elem.removeChild(this._elem.firstChild);
            this._elem.appendChild(newTextNode(this.wrapper._text));
          }
        ]
      ]
    })
  },

  methods: {
    newElement: function() {
      return newElement('text');
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
