var Fashion = (function(Fashion) {
  include("conf.js");

  include("util.browser.js");

  var BROWSER = detectBrowser(typeof window == 'undefined' ? void(0): window);

  include("util.misc.js");
  include("util.error.js");

  include("util.classify.js");
  Fashion._class = _class;

  include("util/util.js");
  include("util/util.test.js");

  include("../backends/svg/svg.js");
  include("../backends/vml/vml.js");
  include("../backends/canvas/canvas.js");

  Fashion.Util     = Util;

  function unsupported() {
    _error(null, 'Invalid Browser', 'Fashion wasn\'t supported this browser.');
  }

  var dummyImpl = {
    Shape    : unsupported,
    Circle   : unsupported,
    Rect     : unsupported,
    Path     : unsupported,
    Text     : unsupported,
    Drawable : unsupported
  };

  Fashion.determineImplementation = function determineImplementation(priority) {
    for (var i=0, l=priority.length; i<l; i++) {
      var target = priority[i].toLowerCase();
      if (target === 'svg' && (Fashion.SVG !== null)) {
        return Fashion.SVG;
      } else if (target === 'vml' && (Fashion.VML !== null)) {
        return Fashion.VML;
      } else if (target === 'canvas' && (Fashion.Canvas !== null)) {
        return Fashion.Canvas;
      }
    }
    return dummyImpl;
  }

  Fashion.IMPL = Fashion.determineImplementation(DEFAULT_PRIORITY);

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

  return Fashion;

})(typeof exports === 'undefined' ? {}: exports);
