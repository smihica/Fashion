var Fashion = (function() {
  var Fashion = this;

  include("constants.js");

  include("lib/lib.js");
  Fashion._lib = _lib;

  var _window = typeof window == 'undefined' ? void(0): window;
  var _Image = _window && typeof _window.Image !== 'undefined' ? _window.Image: null;

  this.browser = detectBrowser(_window);
  this.window = _window;

  var determineImplementation = function determineImplementation(priority) {
    for (var i = 0, l = priority.length; i < l; i++) {
      var target = priority[i].toLowerCase();
      if (target === 'svg' && Fashion.Backend.SVG)
        return Fashion.Backend.SVG;
      else if (target === 'vml' && Fashion.Backend.VML)
        return Fashion.Backend.VML;
      else if (target === 'canvas' && Fashion.Backend.Canvas)
        return Fashion.Backend.Canvas;
    }
    
    function unsupported() {
      throw new NotSupported('Browser is not supported');
    }
    
    return {
      Shape    : unsupported,
      Circle   : unsupported,
      Rect     : unsupported,
      Path     : unsupported,
      Text     : unsupported,
      Drawable : unsupported
    };
  };

  include("Matrix.js");
  this.Matrix = Matrix;

  include("../backends/backend.js");
  this.Backend = Backend;

  include("Color.js");
  this.Color = Color;

  include("Stroke.js");
  this.Stroke = Stroke;

  include("Fill.js");
  this.Fill = Fill;
  this.FloodFill = FloodFill;
  this.GradientFill = GradientFill;
  this.LinearGradientFill = LinearGradientFill;
  this.RadialGradientFill = RadialGradientFill;
  this.ImageTileFill = ImageTileFill;

  include("ImageData.js");
  this.ImageData = ImageData;

  include("PathData.js");
  this.PathData = PathData;

  include("MouseEvt.js");
  this.MouseEvt = MouseEvt;

  include("MouseEventsHandler.js");
  this.MouseEventsHandler = MouseEventsHandler;

  include("BatchUpdater.js");
  this.BatchUpdater = BatchUpdater;
  this.BasicBatchUpdater = BasicBatchUpdater;

  include("Base.js");

  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Drawable.js");
  include("Text.js");
  include("Image.js");

  this.Base     = Base;
  this.Circle   = Circle;
  this.Rect     = Rect;
  this.Path     = Path;
  this.Text     = Text;
  this.Image    = Image;
  this.Drawable = Drawable;

  include("conf.js");

  Fashion.getBackend = function getBackend() {
    return determineImplementation(DEFAULT_PRIORITY);
  };

  return this;
}).call(typeof exports !== 'undefined' ? exports: {});
