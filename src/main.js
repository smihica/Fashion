var Fashion = (function() {
  var Fashion = this;

  include("util.browser.js");
  BROWSER = detectBrowser(typeof window == 'undefined' ? void(0): window);

  include("util.misc.js");

  include("util.error.js");

  include("util.classify.js");
  Fashion._class = _class;

  include("util/util.js");
  include("util/util.test.js");
  Fashion.Util = Util;

  include("../backends/backend.js");
  Fashion.Backend = Backend;

  include("Color.js");
  Fashion.Color = Color;

  include("Stroke.js");
  Fashion.Stroke = Stroke;

  include("Fill.js");
  Fashion.Fill = Fill;
  Fashion.FloodFill = FloodFill;
  Fashion.GradientFill = GradientFill;
  Fashion.LinearGradientFill = LinearGradientFill;
  Fashion.RadialGradientFill = RadialGradientFill;
  Fashion.ImageTileFill = ImageTileFill;

  include("PathData.js");
  Fashion.PathData = PathData;

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

  include("conf.js");

  Fashion.IMPL = Backend.determineImplementation(DEFAULT_PRIORITY);

  return this;
}).call(typeof exports !== 'undefined' ? exports: {});
