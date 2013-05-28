var Drawable = _class("DrawableSVG", {
  props: {
    prefix: "svg",
    wrapper: null,
    _defsManager: null,
    _depthManager: null,
    _svg:         null,
    _vg:          null,
    _viewport:    null,
    _viewportInnerSize: null,
    _capturingShape: null,
    _handledEvents: {
      mousedown: null,
      mouseup:   null,
      mousemove: null,
      mouseout:  null,
      scroll: null,
      visualchange: null
    },
    _eventFunc: null,
    _captureEventFunc: null,
    _scrollEventFunc: null,
    _refresher: null
  },

  class_props: {
    _refresher: new Refresher().setup({
      preHandler: function() {
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
          function() {
            this._vg.setAttribute("transform", matrixString(this.wrapper._transform));
            this._updateContentSize();
          }
        ],
        [
          Fashion.DIRTY_EVENT_HANDLERS,
          function() {
            for (var type in this._handledEvents) {
              var handled = this.wrapper.handler.handles(type);
              var eventFunc = this._handledEvents[type];
              if (!eventFunc && handled) {
                if (type == 'scroll') {
                  this._viewport.addEventListener(type, this._scrollEventFunc, false);
                  this._handledEvents[type] = this._scrollEventFunc;
                } else if (type.indexOf('visualchange') != 0) {
                  this._svg.addEventListener(type, this._eventFunc, false);
                  this._handledEvents[type] = this._eventFunc;
                }
              } else if (eventFunc && !handled) {
                if (type == 'scroll')
                  this._viewport.removeEventListener(type, this._eventFunc, false);
                else if (type.indexOf('visualchange') != 0)
                  this._svg.removeEventListener(type, eventFunc, false);
                this._handledEvents[type] = null;
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
      this._eventFunc = function(domEvt) {
        if (self._capturingShape) {
          if (self._capturingShape !== self)
            return true;
          domEvt.stopPropagation();
        }
        self.wrapper.handler.dispatch(buildMouseEvt(self, domEvt));
        return false;
      };

      this._captureEventFunc = function(domEvt) {
        var func = self._capturingShape._handledEvents[domEvt.type];
        var rt = func ? func(domEvt): true;
        domEvt.stopPropagation();
        return rt;
      };

      this._scrollEventFunc = function () {
        if (self._handledEvents.scroll) {
          var evt = new Fashion.ScrollEvt();
          evt.target = self.wrapper;
          evt.physicalPosition = {
            x: self._viewport.scrollLeft,
            y: self._viewport.scrollTop
          };
          evt.logicalPosition = self.scrollPosition();
          self.wrapper.handler.dispatch(evt);
        }
      };

      var viewport = this._buildViewportElement();

      var svg = this._buildSvgElement();
      viewport.appendChild(svg);

      var defs = newElement("defs");
      svg.appendChild(defs);

      var root = newElement("g");
      svg.appendChild(root);

      this._defsManager = new DefsManager(defs);
      this._depthManager = new DepthManager(root);

      this._viewport = viewport;
      this._svg      = svg;
      this._vg       = root;
    },

    dispose: function() {
      this._capturingShape = true;
      if (this._viewport && this._viewport.parentNode)
        this._viewport.parentNode.removeChild(this._viewport);
      this._viewport = null;
      this._svg = null;
      this._vg = null;
      this._wrapper = null;
      this._defsManager = null;
      this._depthManager = null;
    },

    refresh: function (dirty) {
      this._refresher.call(this, dirty);
    },

    scrollPosition: function(position) {
      if (position) {
        var min = this.wrapper._inverse_transform.translate();
        var scrollable_size = _subtractPoint(
          this.wrapper._content_size,
          this.wrapper._inverse_transform.apply(
            this._viewportInnerSize));
        var max = _addPoint(min, scrollable_size);
        position = _clipPoint(position, min, max);
        var _position = this.wrapper._transform.apply(position);
        this._viewport.scrollLeft = _position.x;
        this._viewport.scrollTop  = _position.y;
        return position;
      }
      return this.wrapper._inverse_transform.apply({ x: this._viewport.scrollLeft, y: this._viewport.scrollTop });
    },

    append: function(shape) {
      shape.drawable = this;
    },

    remove: function(shape) {
      if (this._capturingShape === shape)
        this.releaseMouse(shape);
      if (this._vg && shape._elem)
        this._vg.removeChild(shape._elem);
      shape._removed(shape);
    },

    anchor: function() {
    },

    getViewportOffset: function() {
      return Fashion.Backend.getDomOffsetPosition(this._viewport);
    },

    captureMouse: function(shape) {
      var self = this;

      if (this._capturingShape) {
        throw new Fashion.AlreadyExists("The shape is already capturing.");
      }

      for (var type in shape._handledEvents)
        this._viewport.offsetParent.addEventListener(type, this._captureEventFunc, true);

      this._capturingShape = shape;
    },

    releaseMouse: function(shape) {
      if (this._capturingShape != shape) {
        throw new Fashion.NotFound("The shape is not capturing.");
      }

      for (var type in shape._handledEvents)
        this._viewport.offsetParent.removeEventListener(type, this._captureEventFunc, true);

      this._capturingShape = null;
    },

    capturingShape: function () {
      return this._capturingShape;
    },

    convertToLogicalPoint: function(point) {
      return this.wrapper._inverse_transform.apply(point);
    },

    convertToPhysicalPoint: function(point) {
      return this.wrapper._transform.apply(point);
    },

    getMaxDepth: function() {
      return this._depthManager.getMaxDepth();
    },

    getMinDepth: function() {
      return this._depthManager.getMinDepth();
    },

    _updateContentSize: function () {
      var viewportSize = this.wrapper._viewport_size;
      var contentSize = this.wrapper._transform.apply(this.wrapper._content_size);
      this._svg.setAttribute('width', contentSize.x + 'px');
      this._svg.setAttribute('height', contentSize.y + 'px');
      this._svg.style.width = contentSize.x + 'px';
      this._svg.style.height = contentSize.y + 'px';
      this._viewport.style.overflow =
         (contentSize.x <= viewportSize.x &&
          contentSize.y <= viewportSize.y) ? 'hidden': 'scroll';
      this._viewportInnerSize = {
        x: this._viewport.clientWidth,
        y: this._viewport.clientHeight,
      };
      this._scrollEventFunc();
    },

    _buildSvgElement: function() {
      var svg = newElement("svg");
      svg.setAttribute('version', '1.1');
      // svg.style.background = "#ccc";
      svg.setAttribute('style', [
        'margin: 0',
        'padding: 0',
        '-moz-user-select: none',
        '-khtml-user-select: none',
        '-webkit-user-select: none',
        '-ms-user-select: none',
        'user-select: none'
      ].join(';'));
      return svg;
    },

    _buildViewportElement: function () {
      var viewport = window.document.createElement("div");
      viewport.setAttribute('style', [
        'margin: 0',
        'padding: 0'
      ].join(';'));
      return viewport;
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
