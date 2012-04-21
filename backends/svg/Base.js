var Base = _class("BaseSVG", {

  props : {},

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
        var fill = Util.convertColorArray(st.fill.color);
        fill.rule = st.fill.rule;

        this._elem.setAttribute('fill', fill.color);
        this._elem.setAttribute('fill-opacity', fill.opacity);
        this._elem.setAttribute('fill-rule', fill.rule);
      } else {
        this._elem.setAttribute('fill', 'none');
      }

      if (st.stroke) {
        var stroke = Util.convertColorArray(st.stroke.color);
        this._elem.setAttribute('stroke', stroke.color);
        this._elem.setAttribute('stroke-opacity', stroke.opacity);
        this._elem.setAttribute('stroke-width', st.stroke.width);
        if (st.stroke.pattern && st.stroke.pattern.length > 1)
          this._elem.setAttribute('stroke-dasharray', Util.convertStrokePattern(st.stroke.pattern));
      } else {
        this._elem.setAttribute('stroke', 'none');
      }
      //stroke.dasharray  = Util.convertStrokeDash(st.stroke.dash);
      var visibility = st.visibility;
      var cursor = st.cursor;

      if (st.zIndex) {
        this._elem.setAttribute('z-index', st.zIndex);
      } else {
        this._elem.setAttribute('z-index', 0);
      }

      //this._elem.setAttribute('stroke-dasharray', stroke.dasharray);
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
