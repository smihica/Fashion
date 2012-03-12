var Fashion = (function() {

  var Fashion = {};

  include("conf.js");

  include("util.misc.js");
  include("util.error.js");
  include("util.classify.js");

  include("util/util.js");
  include("util/util.test.js");

  include("../backends/svg/svg.js");
  include("../backends/vml/vml.js");
  include("../backends/canvas/canvas.js");

  var not_bounded = _class("NotBounded", {
    methods: {
      init: function()
      {
        _error(null,
               'Fashion is not initialized Error',
               'Please call Fashion.init() first. Fashion is not initialized yet.');
      }
    }
  });

  Fashion.Util     = Util;
  Fashion.Shape    = not_bounded;
  Fashion.Circle   = not_bounded;
  Fashion.Rect     = not_bounded;
  Fashion.Path     = not_bounded;
  Fashion.Text     = not_bounded;
  Fashion.Drawable = not_bounded;

  Fashion.init = function(priority) {

    var IMPL = null;

    for (var i=0, l=priority.length; i<l; i++) {
      var target = priority[i];
      if (target === 'SVG' && (Fashion.SVG !== null)) {
        IMPL = Fashion.SVG;
      } else if (target === 'VML' && (Fashion.VML !== null)) {
        IMPL = Fashion.VML;
      } else if (target === 'Canvas' && (Fashion.Canvas !== null)) {
        IMPL = Fashion.Canvas;
      }
    }

    if (IMPL === null) {
      _error(null, 'Invalid Browser', 'Fashion wasn\'t supported this browser.');
    }

    include("Shape.js");
    include("Base.js");

    include("Circle.js");
    include("Rect.js");
    include("Path.js");
    include("Drawable.js");
    include("Text.js");

    Fashion.Shape    = Shape;
    Fashion.Circle   = Circle;
    Fashion.Rect     = Rect;
    Fashion.Path     = Path;
    Fashion.Text     = Text;
    Fashion.Drawable = Drawable;

  };

  return Fashion;

})();
