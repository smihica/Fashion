var Base = _class("BaseSVG", {

  interfaces: [BaseImpl],

  props : {
    handler: null,
    drawable: null,
    _elem: null,
    def: null
  },

  methods: {
    dispose: function() {
      if (this.drawable) {
        this.drawable.remove(this);
      }
      if (this.def) {
        this.def.delRef();
        this.def = null;
      }
    },

    transform: function(matrix)
    {
      this._elem.setAttribute('transform', Util.matrixString(matrix));
    },

    resetTransform: function()
    {
      this._elem.removeAttribute('transform');
    },

    style: function(st)
    {
      if (st.fill) {
        if (st.fill instanceof FloodFill) {
          this._elem.setAttribute('fill', st.fill.color.toString(true));
          this._elem.setAttribute('fill-opacity', st.fill.color.a / 255.0);
        } else if (st.fill instanceof LinearGradientFill
            || st.fill instanceof RadialGradientFill
            || st.fill instanceof ImageTileFill) {
          var def = this.drawable._defsManager.get(st.fill);
          this._elem.setAttribute('fill', "url(#" + def.id + ")");
          if (this.def)
            this.def.delRef();
          this.def = def;
          def.addRef();
        }
      } else {
        this._elem.setAttribute('fill', 'none');
      }

      if (st.stroke) {
        this._elem.setAttribute('stroke', st.stroke.color.toString(true));
        this._elem.setAttribute('stroke-opacity', st.stroke.color.a / 255.0);
        this._elem.setAttribute('stroke-width', st.stroke.width);
        if (st.stroke.pattern && st.stroke.pattern.length > 1)
          this._elem.setAttribute('stroke-dasharray', st.stroke.pattern.join(' '));
      } else {
        this._elem.setAttribute('stroke', 'none');
      }
      var visibility = st.visibility;
      var cursor = st.cursor;

      if (st.zIndex) {
        this._elem.setAttribute('z-index', st.zIndex);
      } else {
        this._elem.setAttribute('z-index', 0);
      }

      this._elem.style.display = visibility ? 'block' : 'none';
      this._elem.style.cursor  = cursor;

    },

    resetStyle: function()
    {
      this.style(DEFAULT_STYLE);
    },

    holdEventsHandler: function(handler)
    {
      var self = this;
      if (this.handler === null) {
        var funcs = new MultipleKeyHash();
        this.handler = handler;
        this.handler.holdTrigger('shape-impl', {
          add:    function(type, raw) {
            var wrapped = function(dom_evt){
              var evt = new MouseEvt(dom_evt, self);
              return raw.call(self, evt);
            };
            funcs.put(raw, wrapped);
            UtilImpl.DomEvt.addEvt(self._elem, type, wrapped);
          },
          remove: function(type, raw) {
            UtilImpl.DomEvt.remEvt(self._elem, type, funcs.pop(raw));
          }
        });
      } else {
        throw new AlreadyExists("impl already has a events handler.");
      }
    },

    releaseEventsHandler: function () {
      if (this.handler !== null) {
        this.handler.releaseTriger('shape-impl');
      } else {
        throw new NotFound("events handler is not exist yet.");
      }
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
