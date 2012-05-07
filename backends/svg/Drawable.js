var Drawable = _class("DrawableSVG", {

  interfaces : [DrawableImpl],

  props: {
    prefix: "svg",
    handler: null,
    _defsManager: null,

    _svg:         null,
    _vg:          null,
    _viewport:    null,

    _onscroll:    null,

    _capturing_shapes: new MultipleKeyHash(),
    _capturing_functions: new MultipleKeyHash()
  },

  methods: {
    init: function(node, content_size, viewport_size, onscroll)
    {
      var svg = newNode("svg");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("width", content_size.width + "px");
      svg.setAttribute("height", content_size.height + "px");
      svg.style.margin = "0";
      svg.style.padding = "0";
      svg.style.background = "#CCC";
      svg.style["-moz-user-select"] = svg.style["-khtml-user-select"] =
        svg.style["-webkit-user-select"] = svg.style["-ms-user-select"] =
        svg.style["user-select"] = 'none';

      var defs = newNode("defs");
      this._defsManager = new DefsManager(defs);
      svg.appendChild(defs);

      var root = newNode("g");
      svg.appendChild(root);

      var viewport = _window.document.createElement("div");
      viewport.style.padding = '0';
      viewport.style.width  = viewport_size.width + "px";
      viewport.style.height = viewport_size.height + "px";

      if (content_size.width <= viewport_size.width &&
          content_size.height <= viewport_size.height)
        viewport.style.overflow = "hidden";
      else
        viewport.style.overflow = "scroll";


      viewport.style.border = "1px solid #999";
      viewport.style.margin = "0";
      viewport.style.padding = "0";
      viewport.appendChild(svg);

      node.appendChild(viewport);

      this._viewport = viewport;
      this._svg      = svg;
      this._vg       = root;

      this._onscroll = onscroll || function() {};
      var self = this;
      this._viewport.addEventListener('scroll', function(evt) {
        self._onscroll({x: this.scrollLeft, y:this.scrollTop});
      }, false);

    },

    zoom: function(ratio)
    {
      if (ratio) {
        this._vg.setAttribute("transform", "scale(" + ratio + ")");
      }
    },

    viewportSize: function(size)
    {
      if (size) {
        this._viewport.style.width  = size.width + "px";
        this._viewport.style.height = size.height + "px";
      }
    },

    contentSize: function(size, scrolling)
    {
      if (size) {
        this._svg.setAttribute("width", size.width + "px");
        this._svg.setAttribute("height", size.height + "px");
        this._svg.style.width  = size.width + "px";
        this._svg.style.height = size.height + "px";

        if (scrolling) {
          this._viewport.style.overflow = 'scroll';
        } else {
          this._viewport.style.overflow = 'hidden';
        }

      }
    },

    scrollPosition: function(position)
    {
      if (position) {
        this._viewport.scrollLeft = position.x+'';
        this._viewport.scrollTop  = position.y+'';
        this._onscroll({x: position.x, y: position.y});
      }
    },

    append: function(shape)
    {
      shape.drawable = this;
      this._vg.appendChild(shape._elem);
    },

    remove: function(shape)
    {
      var child = shape._elem;
      this._vg.removeChild(child);
      shape.drawable = null;
    },

    anchor: function()
    {
    },

    getOffsetPosition: function()
    {
      return UtilImpl.getDomOffsetPosition(this._viewport);
    },

    captureMouse: function(shape)
    {
      var self = this;
      var handler = shape.handler;

      if (this._capturing_shapes.exist_p(shape)) {
        throw new AlreadyExists("The shape is already capturing.");
      }

      this._capturing_shapes.put(shape, null);

      var handler_functions = handler.getHandlerFunctionsAll();

      for (var j in handler_functions) {
        for (var i=0, l=handler_functions[j].length; i<l; i++) {
          (function(j, i) {
            var raw = handler_functions[j][i];
            var wrapped = function(dom_evt) {
              if (dom_evt.target !== shape._elem) {
                var evt = new MouseEvt(dom_evt, shape);
                return raw.call(shape, evt);
              }
            }
            self._capturing_functions.put(raw, wrapped);
            self._vg.addEventListener(j, wrapped, false);
          })(j, i);
        }
      }

      var self = this;
      handler.holdTrigger('drawable-impl', {
        append: function(type, raw) {
          var wrapped = function(dom_evt) {
            if (dom_evt.target !== shape._elem) {
              var evt = new MouseEvt(dom_evt, shape);
              return raw.call(shape, evt);
            }
          };
          self._capturing_functions.put(raw, wrapped);
          self._vg.addEventListener(type, wrapped, false);
        },
        remove: function(type, raw) {
          var wrapped = self._capturing_functions.pop(raw);
          self._vg.removeEventListener(type, wrapped, false);
        }
      });

    },

    releaseMouse: function(shape)
    {
      var handler = shape.handler;

      if (!this._capturing_shapes.exist_p(shape)) {
        throw new NotFound("The shape is not capturing.");
      }

      this._capturing_shapes.erace(shape);

      var handler_functions = handler.getHandlerFunctionsAll();

      for (var j in handler_functions) {
        for (var i=0, l=handler_functions[j].length; i<l; i++) {
          var raw = handler_functions[j][i];
          var wrapped = this._capturing_functions.pop(raw);
          this._vg.removeEventListener(j, wrapped, false);
        }
      }

      handler.releaseTrigger('drawable-impl');
    },

    holdEventsHandler: function(handler)
    {
      var self = this;
      if (this.handler === null) {
        var funcs = new MultipleKeyHash();
        this.handler = handler;
        this.handler.holdTrigger('drawable-impl', {
          add:    function(type, raw) {
            var wrapped = function(dom_evt){
              var evt = new MouseEvt(dom_evt, self);
              return raw.call(self, evt);
            };
            funcs.put(raw, wrapped);
            UtilImpl.DomEvt.addEvt(self._svg, type, wrapped);
          },
          remove: function(type, raw) {
            UtilImpl.DomEvt.remEvt(self._svg, type, funcs.pop(raw));
          }
        });
      } else {
        throw new AlreadyExists("impl already has a events handler.");
      }
    },

    releaseEventsHandler: function ()
    {
      if (this.handler !== null) {
        this.handler.releaseTriger('drawable-impl');
      } else {
        throw new NotFound("events handler is not exist yet.");
      }
    }

  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
