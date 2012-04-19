var Fashion = (function() {
  var Fashion = this;

  include("conf.js");

  include("util.browser.js");

  var BROWSER = detectBrowser(typeof window == 'undefined' ? void(0): window);

  include("util.misc.js");

  include("util.error.js");

  include("util.classify.js");
  Fashion._class = _class;

  include("util/util.js");
  include("util/util.test.js");
  Fashion.Util = Util;

  include("../backends/backend.js");
  Fashion.Backend = Backend;

  Fashion.IMPL = Backend.determineImplementation(DEFAULT_PRIORITY);

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
  return this;
}).call(typeof exports !== 'undefined' ? exports: {});
