var Base = _class("BaseSVG", {

  props : {
    drawable: null,
  },

  methods: {

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
            || st.fill instanceof RadialGradientFill) {
          var n = this.drawable._defsManager.get(st.fill)
          this._elem.setAttribute('fill', "url(#" + n.getAttribute("id") + ")");
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


    // !!!!!!!!!! TEMP implement. !!!!!!!!!!
    addEvent: function(evt)
    {
      for (i in evt) {
        if (evt.hasOwnProperty(i)) {
          if (i === 'mouseover' || i === 'mouseout' || i === 'click' ) {
            this._elem.addEventListener(i, evt[i], false);
          }
        }
      }
    },
    removeEvent: function(evt)
    {
      for (i in evt) {
        if (evt.hasOwnProperty(i))
          if (i === 'mouseover' || i === 'mouseout' || i === 'click' )
            this._elem.removeEventListener(i, evt[i], false);
      }
    }
    //////////////////////////////////////////


  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
