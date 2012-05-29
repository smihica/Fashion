var Base = (function() { 
  function toVMLOMString(value) {
    if (typeof value == 'string') {
      return value;
    } else if (typeof value == 'boolean') {
      return value ? 't': 'f'
    } else {
      return value.toString();
    }
  }

  var VMLOMMarkupBuilder = _class('VMLOMMarkupBuilder', {
    props: {
      innerAttrs: null,
      outerAttrs: null
    },

    methods: {
      init: function (tagName) {
        this.tagName = tagName;
      },

      setInnerAttribute: function (name, value) {
        if (!this.innerAttrs)
          this.innerAttrs = {};
        this.innerAttrs[name] = value;
      },

      setOuterAttribute: function (name, value) {
        if (!this.outerAttrs)
          this.outerAttrs = {};
        this.outerAttrs[name] = value;
      },

      appendHTML: function (bufferPair) {
        if (this.outerAttrs) {
          for (var name in this.outerAttrs)
            bufferPair.outer.push(' ', name, '="', _escapeXMLSpecialChars(toVMLOMString(this.outerAttrs[name])), '"');
        }
        if (this.innerAttrs) {
          bufferPair.inner.push('<', VML_PREFIX, ':', this.tagName);
          for (var name in this.innerAttrs)
            bufferPair.inner.push(' ', name, '="', _escapeXMLSpecialChars(toVMLOMString(this.innerAttrs[name])), '"');
          bufferPair.inner.push(' />');
        }
      },

      assign: function (nodePair) {
        if (this.outerAttrs) {
          for (var name in this.outerAttrs)
            nodePair.outer[name] = this.outerAttrs[name];
        }
        if (this.innerAttrs) {
          for (var name in this.innerAttrs)
            nodePair.inner[name] = this.innerAttrs[name];
        }
      }
    }
  });

  VMLFillAndStroke = _class('VMLFillAndStroke', {
    props: {
      fill: null,
      stroke: null,
      styles: {}
    },

    methods: {
      init: function () {
        this.fill = new VMLOMMarkupBuilder('fill');
        this.stroke = new VMLOMMarkupBuilder('stroke');
      },

      setStyle: function (name, value) {
        if (typeof name == 'object' && value === void(0)) {
          for (var _name in name)
            this.styles[_name] = name[_name];
        } else {
          this.styles[name] = value;
        }
      },

      assignToElement: function (elem) {
        if (this.fill) {
          var fillNode = elem.fill;
          if (this.fill.innerAttrs && !fillNode)
            fillNode = newElement(this.fill.tagName);
          this.fill.assign({ outer: elem.node, inner: fillNode });
          if (fillNode && !elem.fill) {
            elem.node.appendChild(fillNode);
            elem.fill = fillNode;
          }
        }
        if (this.stroke) {
          var strokeNode = elem.stroke;
          if (this.stroke.innerAttrs && !strokeNode)
            strokeNode = newElement(this.stroke.tagName);
          this.stroke.assign({ outer: elem.node, inner: strokeNode });
          if (strokeNode && !elem.stroke) {
            elem.node.appendChild(strokeNode);
            elem.stroke = strokeNode;
          }
        }
        for (var name in this.styles)
          elem.node.style[name] = this.styles[name];
      },

      appendHTML: function (buf) {
        var innerBuf = [];
        this.fill.appendHTML({ outer: buf, inner: innerBuf });
        this.stroke.appendHTML({ outer: buf, inner: innerBuf });
        if (this.styles) {
          var attrChunks = [];
          for (var name in this.styles)
            attrChunks.push(name.replace(/[A-Z]/, function ($0) { return '-' + $0.toLowerCase(); }), ':', this.styles[name], ';');
          buf.push(' style', '="', _escapeXMLSpecialChars(attrChunks.join('')), '"');
        }
        buf.push(">");
        buf.push.apply(buf, innerBuf);
      }
    }
  });

  return _class("BaseVML", {
    props : {
      drawable: null,
      _elem: null,
      wrapper: null,
      _refresher: null,
      _handledEvents: {
        mousedown: false,
        mouseup: false,
        mousemove: false,
        mouseout: false
      }
    },

    class_props: {
      _refresher: new Refresher().setup({
        preHandler: function (dirty) {
          if (!this.drawable)
            return dirty;
          if (!this._elem) {
            this._elem = this.newElement(this.drawable._vg);
            return dirty & DIRTY_EVENT_HANDLERS;
          }
          return dirty;
        },

        handlers: [
          [
            DIRTY_TRANSFORM,
            function () {
              var transform = this.wrapper._transform;
              if (transform) {
                var scale = this.wrapper._transform.isScaling();
                if (scale) {
                  if (this._elem.skew) {
                    this._elem.node.removeChild(this._elem.skew);
                    this._elem.skew = null;
                  }
                  this._elem.node.coordOrigin = (-transform.e * VML_FLOAT_PRECISION).toFixed(0) + ',' + (-transform.f * VML_FLOAT_PRECISION).toFixed(0);
                  this._elem.node.coordSize = (VML_FLOAT_PRECISION / scale.x).toFixed(0) + ',' + (VML_FLOAT_PRECISION / scale.y).toFixed(0);
                } else {
                  if (!this._elem.skew) {
                    this._elem.skew = newElement('skew');
                    this._elem.node.appendChild(this._elem.skew);
                  }
                  this._elem.node.coordOrigin = null;
                  this._elem.node.coordSize = VML_FLOAT_PRECISION + ',' + VML_FLOAT_PRECISION;
                  this._elem.skew.matrix = matrixString(transform);
                  this._elem.skew.on = true;
                }
              } else {
                if (this._elem.skew) {
                  this._elem.node.removeChild(this._elem.skew);
                  this._elem.skew = null;
                }
              }
            }
          ],
          [
            DIRTY_STYLE,
            function () {
              var fillAndStroke = new VMLFillAndStroke();
              this._buildVMLStyle(fillAndStroke);
              fillAndStroke.assignToElement(this._elem);
            }
          ],
          [
            DIRTY_VISIBILITY,
            function () {
              this._elem.node.style.display = this.wrapper._visibility ? 'block' : 'none';
            }
          ],
          [
            DIRTY_EVENT_HANDLERS,
            function () {
              for (var type in this._handledEvents) {
                var beingHandled = this._handledEvents[type];
                var toHandle = this.wrapper.handler && this.wrapper.handler.handles(type);
                if (!beingHandled && toHandle) {
                  this.drawable._handleEvent(type);
                  this._handledEvents[type] = true;
                } else if (beingHandled && !toHandle) {
                  this.drawable._unhandleEvent(type);
                  this._handledEvents[type] = false;
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
        var self = this;
      },

      dispose: function() {
        if (this.drawable)
          this.drawable.remove(this);
        else
          this._removed();
      },

      _removed: function () {
        if (this._elem) {
          for (var type in this._handledEvents) {
            if (this._handledEvents[type])
              this.drawable._unhandleEvent(type);
          }
          this._elem.__fashion__id = null;
          this._elem = null;
        }
        this.drawable = null;
      },

      newElement: function (vg) {
        return null;
      },

      refresh: function (dirty) {
        this._refresher.call(this, dirty);
      },

      _buildVMLStyle: function (fillAndStroke) {
        var st = this.wrapper._style;
        function populateWithGradientAttributes(fill) {
          var firstColor = st.fill.colors[0];
          var lastColor = st.fill.colors[st.fill.colors.length - 1];
          // The order is reverse.
          fill.setInnerAttribute('color2', firstColor[1]._toString(true));
          fill.setInnerAttribute('color', lastColor[1]._toString(true));
          if (firstColor[0] == 0 && lastColor[0] == 1) {
            fill.setInnerAttribute('opacity2', firstColor[1].a / 255.);
            fill.setInnerAttribute('opacity', lastColor[1].a / 255.);
          }
          var colors = [];
          for (var i = st.fill.colors.length; --i >= 0; ) {
            var color = st.fill.colors[i];
            colors.push((color[0] * 100).toFixed(0) + "% " + color[1]._toString(true));
          }
          fill.setInnerAttribute('colors', colors.join(","));
        }

        var fill = fillAndStroke.fill, stroke = fillAndStroke.stroke;
        if (st.fill) {
          if (st.fill instanceof FloodFill) {
            if (st.fill.color.a == 255) {
              fill.setOuterAttribute('fillColor', st.fill.color._toString(true));
            } else {
              fill.setInnerAttribute('type', "solid");
              fill.setInnerAttribute('color', st.fill.color._toString(true));
              fill.setInnerAttribute('opacity', st.fill.color.a / 255.);
            }
          } else if (st.fill instanceof LinearGradientFill) {
            populateWithGradientAttributes(fill);
            fill.setInnerAttribute('type', "gradient");
            fill.setInnerAttribute('method', "sigma");
            fill.setInnerAttribute('angle', (st.fill.angle * 360).toFixed(0));
          } else if (st.fill instanceof RadialGradientFill) {
            populateWithGradientAttributes(fill);
            fill.setInnerAttribute('type', "gradientRadial");
            fill.setInnerAttribute('focusPosition', st.fill.focus.x + " " + st.fill.focus.y);
          } else if (st.fill instanceof ImageTileFill) {
            fill.setInnerAttribute('type', "tile");
            fill.setInnerAttribute('src', st.fill.imageData.url);
          }
          fill.setOuterAttribute('filled', true);
        } else {
          fill.setOuterAttribute('filled', false);
        }

        if (st.stroke) {
          if (st.stroke.color.a == 255 && !st.stroke.pattern) {
            stroke.setOuterAttribute('strokeColor', st.stroke.color._toString(true));
            stroke.setOuterAttribute('strokeWeight', st.stroke.width);
          } else {
            stroke.setInnerAttribute('color', st.stroke.color._toString(true));
            stroke.setInnerAttribute('opacity', st.stroke.color.a / 255.);
            stroke.setInnerAttribute('weight', st.stroke.width);
            if (st.stroke.pattern)
              stroke.setInnerAttribute('dashStyle', st.stroke.pattern.join(' '));
          }
          stroke.setOuterAttribute('stroked', true);
        } else {
          stroke.setOuterAttribute('stroked', false);
        }
        fillAndStroke.setStyle('cursor', st.cursor ? st.cursor: 'normal');
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
