var Drawable = _class("DrawableSVG", {

  interfaces : [DrawableImpl],

  props: {
    prefix: "svg",
    _defsManager: null,
    _vg: null,
    _capturing_shapes: new MultipleKeyHash(),
    _capturing_functions: new MultipleKeyHash()
  },

  methods: {
    init: function(node, content_size)
    {
      var vg = newNode("svg");
      vg.setAttribute("version", "1.1");
      vg.setAttribute("width", content_size.width + "px");
      vg.setAttribute("height", content_size.height + "px");
      var defs = newNode("defs");
      vg.appendChild(defs);
      node.appendChild(vg);
      this._vg = vg;
      this._defsManager = new DefsManager(defs);
    },

    contentSize: function()
    {
      return { x: this._vg.offsetWidth, y: this._vg.offsetHeight };
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
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
