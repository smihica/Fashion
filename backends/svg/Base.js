var Base = _class("BaseSVG", {
  props : {
    drawable: null,
    _elem: null,
    def: null,
    wrapper: null,
    _handledEvents: {
      mousedown: null,
      mouseup:   null,
      mousemove: null,
      mouseover: null,
      mouseout:  null
    },
    _eventFunc: null,
    _refresher: null,
    _transformStack: null,
    _transformUpdated: false
  },

  class_props: {
    _refresher: new Refresher().setup({
      preHandler: function() {
        if (!this.drawable)
          return;
        if (!this._elem) {
          this._elem = this.newElement();
          this.drawable._vg.appendChild(this._elem);
        }
      },

      postHandler: function () {
        this._updateTransform();
      },

      handlers: [
        [
          Fashion.DIRTY_ZINDEX,
          function () {
            this.drawable._depthManager.add(this);
          }
        ],
        [
          Fashion.DIRTY_TRANSFORM,
          function () {
            if (this.wrapper._transform)
              this._transformStack.add('last', 'wrapper', this.wrapper._transform);
            else
              this._transformStack.remove('wrapper');
            this._transformUpdated = true;
          }
        ],
        [
          Fashion.DIRTY_STYLE,
          function () {
            var elem = this._elem;
            var style = this.wrapper._style;
            if (style.fill) {
              if (style.fill instanceof Fashion.FloodFill) {
                elem.setAttribute('fill', style.fill.color.toString(true));
                elem.setAttribute('fill-opacity', style.fill.color.a / 255.0);
              } else if (style.fill instanceof Fashion.LinearGradientFill
                  || style.fill instanceof Fashion.RadialGradientFill
                  || style.fill instanceof Fashion.ImageTileFill) {
                var def = this.drawable._defsManager.get(style.fill);
                elem.setAttribute('fill', "url(#" + def.id + ")");
                if (this.def)
                  this.def.delRef();
                this.def = def;
                def.addRef();
              }
            } else {
              elem.setAttribute('fill', 'none');
            }

            if (style.stroke) {
              elem.setAttribute('stroke', style.stroke.color.toString(true));
              elem.setAttribute('stroke-opacity', style.stroke.color.a / 255.0);
              elem.setAttribute('stroke-width', style.stroke.width);
              if (style.stroke.pattern && style.stroke.pattern.length > 1)
                elem.setAttribute('stroke-dasharray', style.stroke.pattern.join(' '));
            } else {
              elem.setAttribute('stroke', 'none');
            }
            elem.style.cursor = style.cursor;
          }
        ],
        [
          Fashion.DIRTY_VISIBILITY,
          function () {
            this._elem.style.display = this.wrapper._visibility ? 'block' : 'none'
          }
        ],
        [
          Fashion.DIRTY_EVENT_HANDLERS,
          function () {

            if (!this.wrapper.handler) return;

            for (var type in this._handledEvents) {
              var handled = this.wrapper.handler.handles(type);
              var eventFunc = this._handledEvents[type];
              if (!eventFunc && handled) {
                this._elem.addEventListener(type, this._eventFunc, false);
                this._handledEvents[type] = this._eventFunc;
              } else if (eventFunc && !handled) {
                this._elem.removeEventListener(type, eventFunc, false);
                this._handledEvents[type] = null;
              }
            }
          }
        ]
      ]
    })
  },

  methods: {
    init: function (wrapper) {
      this.wrapper = wrapper;
      this._refresher = this.constructor._refresher;
      this._transformStack = new TransformStack();
      var self = this;
      this._eventFunc = function(domEvt) {
        if (self.drawable._capturingShape &&
            self.drawable._capturingShape != self)
          return true;
        self.wrapper.handler.dispatch(buildMouseEvt(self, domEvt));
        return false;
      };
    },

    dispose: function() {
      if (this.drawable)
        this.drawable.remove(this);
      else
        this._removed();
    },

    _removed: function () {
      if (this.def) {
        this.def.delRef();
        this.def = null;
      }
      this._elem = null;
      this.drawable = null;
    },

    newElement: function() { return null; },

    refresh: function(dirty) {
      this._refresher.call(this, dirty);
    },

    _updateTransform: function () {
      if (!this._transformUpdated)
        return;
      var transform = this._transformStack.get();
      if (transform) {
        this._elem.setAttribute('transform', matrixString(transform));
      } else {
        this._elem.removeAttribute('transform');
      }
      this._transformUpdated = false;
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
