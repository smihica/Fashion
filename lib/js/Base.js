var Base = _class("Base", {

  props: {
    impl: null,
    _position: {x:0, y:0},
    _size: {width:0, height:0},
    _transform: {}
  },

  methods: {
    position: function(d)
    {
      if (d) {
        var x = d.x, y = d.y;
        this._position.x = x;
        this._position.y = y;
        this.impl.position(x, y, this._size.width, this._size.height);
      }
      return {x: this._position.x, y: this._position.y};
    },

    size: function(d)
    {
      if (d) {
        var width = d.width, height = d.height;
        this._size.width = width;
        this._size.height = height;
        this.impl.size(width, height);
      }
      return {width: this._size.width, height: this._size.height};
    },

    transform: function()
    {
      var l;

      if ((l = arguments.length) > 0) {

        var scale, rotate, translate, tr, j, i;
        var pos = this.position();
        var x = pos.x, y = pos.y;
        console.log(x, y);
        var m = new Util.Matrix();

        for (j=0; j<l; j++) {

          tr = arguments[j];

          for (i in tr) {
            if (tr.hasOwnProperty(i)) {
              if (i === 'scale') {
                scale = tr[i];
                if (scale.x === undefined || scale.y === undefined) _error("Less parameters Error.", "transform() scale needs x, y parameters at least.");
                if (scale.cx === undefined) scale.cx = x;
                if (scale.cy === undefined) scale.cy = y;
                this._transform.scale = scale;

              } else if (i === 'rotate') {
                rotate = tr[i];
                if (rotate.angle === undefined) _error("Less parameters Error.", "transform() rotate needs angle parameter at least.");
                if (rotate.x === undefined) rotate.x = x;
                if (rotate.y === undefined) rotate.y = y;
                this._transform.rotate = rotate;

              } else if (i === 'translate') {
                translate = tr[i];
                if (translate.x === undefined || translate.y === undefined) _error("Less parameters Error.", "transform() translate needs x, y parameters at least.");
                this._transform.translate = translate;

              } else {
                _error('Invalid property Error.', "transform() expects 'tranlate', 'scale', 'rotate', but given '" + i + "'.");

              }
            }
          }
          m.set(tr);
        }

        this.impl.transform(m);
      }

      return ({
        scale:     this._transform.scale,
        rotate:    this._transform.rotate,
        translate: this._transform.translate
      });

    },

    reset: function()
    {
      this._transform = {};
      this.impl.reset();
    },

    /*
     * style
     * stroke - set stroke-property-string or none. 'none' or 'color [, width, dash]' default is 'none'
     * * color - set RGBA-color-string #FFFF or #FFFFFFFF default is #0000
     * * width - set line-width-string /\d*?/. default is 1
     * * dash  - set dash-pattern-string '' or '-' or '.' or '-.' or '-..' or '. ' or '- ' or '--' or '- .' or '--.' or '--..'
     */
    style: function(st)
    {

      element.style({
        stroke: "#FF0AF000 10 ..---"
      });

      element.style({
        stroke: {
          color: "#0000",
          width: 10,
          dash:  ".-"
        }
      });

      element.style({
        stroke: {
          color: {
            R: 255,
            G: 10,
            B: 180,
            A: 0
          },
          width: 10,
          dash: [ 10, 20 ]
        }
      });

    }
  }
});