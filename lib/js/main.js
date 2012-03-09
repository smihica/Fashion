var Fashion = (function() {

  var Fashion = {};

  var FLOAT_ACCURACY = 4;
  var SEPARATOR = /\s|,/;

  include("util.misc.js");
  include("util.error.js");
  include("util.classify.js");

  include("util.js")
  include("lib/lib.js");
  include("lib/lib.test.js");

  include("svg/svg.js");
  include("vml/vml.js");
  include("canvas/canvas.js");

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

  Fashion.Lib      = Lib;
  Fashion.Shape    = not_bounded;
  Fashion.Circle   = not_bounded;
  Fashion.Rect     = not_bounded;
  Fashion.Path     = not_bounded;
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

    Fashion.Shape    = Shape;
    Fashion.Circle   = Circle;
    Fashion.Rect     = Rect;
    Fashion.Path     = Path;
    Fashion.Drawable = Drawable;

  };

  return Fashion;

})();
