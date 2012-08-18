var Drawable = _class("DrawableVML", {
  props: {
    _vg: null,
    _content: null,
    _viewport: null,
    _viewportInnerSize: { x: 0, y: 0 },
    _capturingShape: null,
    _handledEvents: {
      mousedown: [ false, 0, null ],
      mouseup: [ false, 0, null ],
      mousemove: [ false, 0, null ],
      mouseover: [ false, 0, null ],
      mouseout: [ false, 0, null ],
      scroll: [ false, 0, null ],
      visualchange: [ false, 0, null ]
    },
    _scrollPosition: { x: 0, y: 0 },
    _currentEvent: null,
    _eventFunc: null,
    _captureEventFunc: null,
    _scrollEventFunc: null,
    _refresher: null
  },

  class_props: {
    _refresher: new Refresher().setup({
      preHandler: function () {
        if (!this._viewport.parentNode != this.wrapper.target) {
          this.wrapper.target.appendChild(this._viewport);
        }
      },
      postHandler: function (_, originalDirty) {
        var evt = new Fashion.VisualChangeEvt();
        evt.target = this.wrapper;
        evt.dirty = originalDirty;
        if (this.wrapper.handler)
          this.wrapper.handler.dispatch(evt);
      },
      handlers: [
        [
          Fashion.DIRTY_SIZE,
          function() {
            var viewportSize = this.wrapper._viewport_size;
            this._viewport.style.width  = viewportSize.x + 'px';
            this._viewport.style.height = viewportSize.y + 'px';
            this._updateContentSize();
          }
        ],
        [
          Fashion.DIRTY_TRANSFORM,
          function () {
            var transform = this.wrapper._transform;
            if (transform) {
              var scale = this.wrapper._transform.isScaling();
              if (scale) {
                if (this._vg.skew) {
                  this._vg.node.removeChild(this._vg.skew);
                  this._vg.skew = null;
                }
                var contentSize = this.wrapper._transform.apply(this.wrapper._content_size);
                this._vg.node.coordOrigin = (-transform.e * VML_FLOAT_PRECISION) + ',' + (-transform.f * VML_FLOAT_PRECISION);
                this._vg.node.coordSize = (VML_FLOAT_PRECISION / scale.x) + ',' + (VML_FLOAT_PRECISION / scale.y);
              } else {
                if (!this._vg.skew) {
                  this._vg.skew = newElement('skew');
                  this._vg.node.appendChild(this._vg.skew);
                }
                this._vg.node.coordOrigin = null;
                this._vg.node.coordSize = VML_FLOAT_PRECISION + ',' + VML_FLOAT_PRECISION;
                this._vg.skew.matrix = matrixString(transform);
                this._vg.skew.on = true;
              }
            } else {
              this._vg.node.removeChild(this._vg.skew);
              this._vg.skew = null;
            }
            this._updateContentSize();
          }
        ],
        [
          Fashion.DIRTY_EVENT_HANDLERS,
          function () {
            for (var type in this._handledEvents) {
              var beingHandled = this._handledEvents[type][0];
              var toHandle = this.wrapper.handler.handles(type);
              if (!beingHandled && toHandle) {
                if (type != 'scroll' && type.indexOf('visualchange') != 0)
                  this._handleEvent(type);
                this._handledEvents[type][0] = true;
              } else if (beingHandled && !toHandle) {
                if (type != 'scroll' && type.indexOf('visualchange') != 0)
                  this._unhandleEvent(type);
                this._handledEvents[type][0] = false;
              }
            }
          }
        ]
      ]
    })
  },

  methods: {
    init: function(wrapper) {
      this.wrapper = wrapper;
      this._refresher = this.constructor._refresher;

      var self = this;
      this._eventFunc = function(msieEvt) {
        if (self._capturingShape && self._capturingShape !== self)
          return false;
        var target = msieEvt.srcElement;
        var fashionId = target.__fashion__id;
        var retval = void(0);
        self._currentEvent = msieEvt;
        if (fashionId) {
          var targetShape = self.wrapper._elements[fashionId];
          if (targetShape.handler)
            retval = targetShape.handler.dispatch(buildMouseEvt(targetShape.impl, msieEvt));
        }
        if (retval !== false) {
          if (self._handledEvents[msieEvt.type][0]) {
            if (self.wrapper.handler)
              retval = self.wrapper.handler.dispatch(buildMouseEvt(self, msieEvt));
          }
        }
        self._currentEvent = null;
        return retval;
      };

      this._captureEventFunc = function (msieEvt) {
        return self._capturingShape.wrapper.handler.dispatch(buildMouseEvt(self._capturingShape, msieEvt));
      };

      this._scrollEventFunc = function (msieEvt) {
        var physicalPosition = { x: parseInt(self._viewport.scrollLeft), y: parseInt(self._viewport.scrollTop) };
        self._scrollPosition = self.wrapper._inverse_transform.apply(physicalPosition);
        if (self._handledEvents.scroll[0]) {
          var evt = new Fashion.ScrollEvt();
          evt.target = self.wrapper;
          evt.physicalPosition = physicalPosition;
          evt.logicalPosition = self._scrollPosition;
          self.wrapper.handler.dispatch(evt);
        }
      };

      this._viewport = this._buildViewportElement();
      Fashion._lib._bindEvent(this._viewport, 'scroll', this._scrollEventFunc);
      this._content = this._buildContentElement();
      this._viewport.appendChild(this._content);
      this._vg = this._buildRoot();
      this._content.appendChild(this._vg.node);
    },

    dispose: function() {
      if (this._viewport && this._viewport.parentNode)
        this._viewport.parentNode.removeChild(this._viewport);
      this._viewport = null;
      this._content = null;
      this._vg = null;
      this._wrapper = null;
    },

    refresh: function (dirty) {
      this._refresher.call(this, dirty);
    },

    scrollPosition: function(position) {
      if (position) {
        position = _clipPoint(
            position,
            this.wrapper._inverse_transform.translate(),
            _subtractPoint(
              this.wrapper._content_size,
              this.wrapper._inverse_transform.apply(
                this._viewportInnerSize)));
        this._scrollPosition = position;
        if (window.readyState == 'complete') {
          var _position = this.wrapper._transform.apply(position);
          this._viewport.scrollLeft = _position.x;
          this._viewport.scrollTop  = _position.y;
        } else {
          var self = this;
          Fashion._lib._bindEvent(window, 'load', function () {
            Fashion._lib._unbindEvent(window, 'load', arguments.callee);
            var _position = self.wrapper._transform.apply(self._scrollPosition);
            self._viewport.scrollLeft = _position.x;
            self._viewport.scrollTop  = _position.y;
          });
        }
        return position;
      }
      return this._scrollPosition;
    },

    append: function(shape) {
      shape.drawable = this;
    },

    remove: function(shape) {
      if (this._capturingShape == shape)
        this.releaseMouse(shape);
      if (this._vg && shape._elem)
        this._vg.node.removeChild(shape._elem.node);
      shape._removed(shape);
    },

    anchor: function () {
    },

    getViewportOffset: function() {
      return Fashion.Backend.getDomOffsetPosition(this._viewport);
    },

    captureMouse: function(shape) {
      var self = this;

      if (this._capturingShape) {
        throw new Fashion.AlreadyExists("The shape is already capturing.");
      }

      var self = this;

      self._currentEvent.cancelBubble = true;
      for (var type in shape._handledEvents)
        this._viewport.offsetParent.attachEvent('on' + type, this._captureEventFunc);

      this._capturingShape = shape;
    },

    releaseMouse: function(shape) {
      var handler = shape.handler;

      if (this._capturingShape != shape) {
        throw new Fashion.NotFound("The shape is not capturing.");
      }

      for (var type in shape._handledEvents)
        this._viewport.offsetParent.detachEvent('on' + type, this._captureEventFunc);

      this._capturingShape = null;
    },

    capturingShape: function () {
      return this._capturingShape;
    },

    convertToLogicalPoint: function(point) {
      return _addPoint(this.scrollPosition(), this.wrapper._inverse_transform.apply(point));
    },

    _updateContentSize: function () {
      var viewportSize = this.wrapper._viewport_size;
      var _scrollPosition = this.wrapper._transform.apply(this._scrollPosition);
      var contentSize = this.wrapper._transform.apply(this.wrapper._content_size);
      this._content.style.width = contentSize.x + 'px';
      this._content.style.height = contentSize.y + 'px';
      this._viewport.scrollLeft = _scrollPosition.x;
      this._viewport.scrollTop  = _scrollPosition.y;
      this._viewport.style.overflow =
         (contentSize.x <= viewportSize.x &&
          contentSize.y <= viewportSize.y) ? 'hidden': 'scroll';
      this._viewportInnerSize = {
        x: this._viewport.clientWidth,
        y: this._viewport.clientHeight
      };
      this._scrollEventFunc();
    },

    _buildRoot: function () {
      var vg = newElement('group');
      vg.style.cssText = 'position:absolute;display:block;margin:0;padding:0;width:' + VML_FLOAT_PRECISION + 'px;height:' + VML_FLOAT_PRECISION + 'px';
      vg.coordSize = VML_FLOAT_PRECISION + ',' + VML_FLOAT_PRECISION;
      return { node: vg, skew: null };
    },

    _buildContentElement: function () {
      var content = window.document.createElement("div");
      content.style.cssText = 'position:absolute;left:0px;top:0px;display:block;margin:0;padding:0;overflow:hidden;';
      return content;
    },

    _buildViewportElement: function () {
      var viewport = window.document.createElement("div");
      viewport.style.cssText = 'position:relative;display:block;margin:0;padding:0;overflow:hidden;';
      return viewport;
    },

    _handleEvent: function (type) {
      var triple = this._handledEvents[type];
      __assert__(triple);
      if (triple[1]++ == 0)
        this._content.attachEvent('on' + type, triple[2] = this._eventFunc);
    },

    _unhandleEvent: function (type) {
      var triple = this._handledEvents[type];
      __assert__(triple);
      if (triple[1] == 0)
        return;
      if (--triple[1] == 0) {
        this._content.detachEvent('on' + type, triple[2]);
        triple[2] = null;
      }
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
