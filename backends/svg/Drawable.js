var Drawable = _class("DrawableSVG", {
  interfaces : [VisualObject, DrawableImpl],

  props: {
    prefix: "svg",
    wrapper: null,
    _defsManager: null,
    _depthManager: null,
    _svg:         null,
    _vg:          null,
    _viewport:    null,
    _capturingShape: null,
    _handledEvents: {
      mousedown: null,
      mouseup:   null,
      mousemove: null,
      mouseout:  null
    },
    _eventFunc: null,
    _captureEventFunc: null,
    _refresher: null
  },

  class_props: {
    _refresher: new Refresher().setup({
      preHandler: function() {
        if (!this._viewport.parentNode != this.wrapper.target) {
          this.wrapper.target.appendChild(this._viewport);
        }
      },

      handlers: [
        [
          DIRTY_SIZE,
          function() {
            var viewportSize = this.wrapper._viewport_size;
            this._viewport.style.width  = viewportSize.x + 'px';
            this._viewport.style.height = viewportSize.y + 'px';
            this._updateContentSize();
          }
        ],
        [
          DIRTY_TRANSFORM,
          function() {
            this._vg.setAttribute("transform", matrixString(this.wrapper._transform));
            this._updateContentSize();
          }
        ],
        [
          DIRTY_EVENT_HANDLERS,
          function() {
            for (var type in this._handledEvents) {
              var handled = this.wrapper.handler.handles(type);
              var eventFunc = this._handledEvents[type];
              if (!eventFunc && handled) {
                this._svg.addEventListener(type, this._eventFunc, false);
                this._handledEvents[type] = this._eventFunc;
              } else if (eventFunc && !handled) {
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
        if (self._capturingShape)
          return true;
        domEvt.stopPropagation();
        self.wrapper.handler.dispatch(buildMouseEvt(self, domEvt));
        return false;
      };

      this._captureEventFunc = function (domEvt) {
        var func = self._capturingShape._handledEvents[domEvt.type];
        return func ? func(domEvt): true;
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
      if (this._capturingShape == shape)
        this.releaseMouse(shape);
      if (this._vg && shape._elem)
        this._vg.removeChild(shape._elem);
      shape._removed(shape);
    },

    anchor: function() {
    },

    getViewportOffset: function() {
      return UtilImpl.getDomOffsetPosition(this._viewport);
    },

    captureMouse: function(shape) {
      var self = this;

      if (this._capturingShape) {
        throw new AlreadyExists("The shape is already capturing.");
      }

      for (var type in shape._handledEvents)
        this._viewport.offsetParent.addEventListener(type, this._captureEventFunc, true);

      this._capturingShape = shape;
    },

    releaseMouse: function(shape) {
      var handler = shape.handler;

      if (this._capturingShape != shape) {
        throw new NotFound("The shape is not capturing.");
      }

      for (var type in shape._handledEvents)
        this._viewport.offsetParent.removeEventListener(type, this._captureEventFunc, false);

      this._capturingShape = null;
    },

    convertToLogicalPoint: function(point) {
      return _addPoint(this.scrollPosition(), this.wrapper._inverse_transform.apply(point));
    },

    convertToPhysicalPoint: function(point) {
      return _addPoint(this.wrapper._transform.apply(this.scrollPosition()), point);
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
      var viewport = _window.document.createElement("div");
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
