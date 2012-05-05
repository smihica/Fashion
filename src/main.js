var Fashion = (function() {
  var Fashion = this;

  include("lib/lib.js");
  Fashion._lib = _lib;

  var _window = typeof window == 'undefined' ? void(0): window;
  var _Image = _window && typeof _window.Image !== 'undefined' ? _window.Image: null;
  BROWSER = detectBrowser(_window);
  Fashion.browser = BROWSER;

  include("util/util.js");
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

  include("ImageData.js");
  Fashion.ImageData = ImageData;

  include("PathData.js");
  Fashion.PathData = PathData;

  include("Style.js");
  Fashion.Style = Style;

  include("MouseEvt.js");
  Fashion.MouseEvt = MouseEvt;

  include("MouseEventsHandler.js");
  Fashion.MouseEventsHandler = MouseEventsHandler;

  include("Shape.js");
  include("Base.js");

  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Drawable.js");
  include("Text.js");
  include("Image.js");

  Fashion.Shape    = Shape;
  Fashion.Circle   = Circle;
  Fashion.Rect     = Rect;
  Fashion.Path     = Path;
  Fashion.Text     = Text;
  Fashion.Image    = Image;
  Fashion.Drawable = Drawable;

  include("conf.js");

  Fashion.IMPL = Backend.determineImplementation(DEFAULT_PRIORITY);

  return this;
}).call(typeof exports !== 'undefined' ? exports: {});
