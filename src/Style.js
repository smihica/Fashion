var Style = (function() {
  return _class("Style", {
    props: {
      fill: null,
      stroke: null
    },

    methods: {
      init: function Style_init() {
        switch (arguments.length) {
        case 0:
          break;
        case 1:
          var arg = arguments[0];
          if (typeof arg != 'object') {
            throw new ArgumentError("Invalid argument: " + arg);
          if (arg instanceof Stroke)
            this.stroke = arg;
          else if (arg instanceof Fill)
            this.fill = arg;
          else
            this.initWithObject.apply(this, arguments);
          break;
        default:
          this.initWithArguments.apply(this, arguments);
          break;
        }
      },

      initWithArguments: function Style_initWithArguments() {
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg instanceof Stroke)
            this.stroke = arg;
          else if (arg instanceof Fill)
            this.fill = arg;
          else if (arg !== null)
            throw new ArgumentError("Invalid type for argument #" + i);
        }
      },

      initWithObject: function Style_initWithObject(obj) {
        do {
          if (typeof obj.stroke == 'object') {
            if (obj.stroke === null || obj.stroke instanceof Stroke) {
              this.stroke = obj.stroke;
              break;
            }
          }
          throw new ArgumentError("Property 'stroke' in " + obj + " does not give a Stroke object");
        } while (0);

        do {
          if (typeof obj.fill == 'object') {
            if (obj.fill === null || obj.fill instanceof Fill) {
              this.fill = obj.fill;
              break;
            }
          }
          throw new ArgumentError("Property 'fill' in " + obj + " does not give a Fill object");
        } while (0);
      },

      override: function Style_override(that) {
        var fill = this.fill, stroke = this.stroke;

        if (!this.fill)
          fill = that.fill;

        if (!this.stroke) {
          stroke = that.stroke;
        } else {
          if (that.stroke) {
            stroke = new Stroke(
              that.stroke.color != null ?
                that.stroke.color:
                this.stroke.color,
              that.stroke.width != null ?
                that.stroke.width:
                this.stroke.width,
              that.stroke.pattern != null ?
                that.stroke.pattern:
                this.stroke.pattern
            );
          }
        }
        return new this.constructor(fill, stroke);
      }
    }
  });
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
