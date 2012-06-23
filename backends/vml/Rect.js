var Rect = (function () {
  function appendPath(vml, size, corner) {
    var prec = VML_FLOAT_PRECISION,
        rx = (corner.x || 0) * prec / size.x;
        ry = (corner.y || 0) * prec / size.y;
    vml.push('at0,0,', rx * 2, ',', ry * 2, ',', rx, ',0,0,', ry);
    vml.push('l0,', prec - ry);
    vml.push('at0,', prec - ry * 2, ',', rx * 2, ',', prec, ',0,', prec - ry, ',', rx, ',', prec);
    vml.push('l', prec - rx, ',', prec);
    vml.push('at', prec - rx * 2, ',', prec - ry * 2, ',', prec, ',', prec, ',', prec - rx, ',', prec, ',', prec, ',', prec - ry);
    vml.push('l', prec, ',', ry);
    vml.push('at', prec - rx * 2, ',0,', prec, ',', ry * 2, ',', prec, ',', ry, ',', prec - rx, ',', 0);
    vml.push('x');
    return vml;
  }

  var handlers = {
    rect: {
      buildElement: function () {
        var vml = appendPrologue([], this.wrapper.id, 'rect');
        appendStyles(vml, this);
        appendEpilogue(vml, 'rect');
        return vml;
      },

      update: function () {
      }
    },

    roundrect: {
      buildElement: function () {
        var vml = appendPrologue([], this.wrapper.id, 'roundrect');
        vml.push(' arcsize="', (this.wrapper._corner.x || 0) / this.wrapper._size.x, '"');
        appendStyles(vml, this);
        appendEpilogue(vml, 'roundrect');
        return vml;
      },

      update: function () {
        this._elem.arcSize = (this.wrapper._corner.x || 0) / this.wrapper._size.x;
      }
    },

    shape: {
      buildElement: function () {
        var position = this.wrapper._position;
        var vml = appendPrologue([], this.wrapper.id, 'shape');
        vml.push(' path="');
        appendPath(vml, this.wrapper._size, this.wrapper._corner);
        vml.push('"');
        appendStyles(vml, this);
        appendEpilogue(vml, 'shape');
        return vml;
      },

      update: function () {
        this._elem.path = appendPath([], this.wrapper._size, this.wrapper._corner).join('');
      }
    }
  };

  return _class("RectVML", {
    parent: Base,

    props: {
      _handler: null
    },

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
            Fashion.DIRTY_SIZE | Fashion.DIRTY_SHAPE,
            function() {
              var size = this.wrapper._size;
              var handler = this.determineImpl();
              if (handler === this._handler) {
                this._elem.node.style.width = size.x + 'px';
                this._elem.node.style.height = size.y + 'px';
                handler.update.call(this);
              } else {
                var n = document.createElement('div');
                var elem = this._elem;
                n.innerHTML = handler.buildElement.call(this).join('');
                var nn = n.firstChild, parentNode = elem.node.parentNode;
                parentNode.insertBefore(nn, elem.node);
                parentNode.removeChild(elem.node);
                this._handler = handler;
                this._elem = {
                  node: nn,
                  fill: nn.firstChild,
                  stroke: nn.firstChild ? nn.firstChild.nextSibling: null,
                  skew: null
                };
              }
            }
          ]
        ]
      })
    },

    methods: {
      determineImpl: function() {
        var size = this.wrapper._size;
        var corner = this.wrapper._corner;
        if (corner.x == corner.y && size.x == size.y) {
          if (corner.x == 0)
            return handlers.rect;
          else
            return handlers.roundrect;
        } else {
          return handlers.shape;
        }
      },

      newElement: function(vg) {
        var handler = this._handler = this.determineImpl();
        var vml = handler.buildElement.call(this);
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
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
