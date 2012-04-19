var Backend = (function() {

  var _ = {};

  include("BaseImpl.js");
  include("DrawableImpl.js");
  include("ShapeImpl.js");
  include("PathImpl.js");
  include("TextImpl.js");

  _.BaseImpl     = BaseImpl;
  _.DrawableImpl = DrawableImpl;
  _.ShapeImpl    = ShapeImpl;
  _.PathImpl     = PathImpl;
  _.TextImpl     = TextImpl;

  include("svg/svg.js");
  _.SVG = SVG;

  include("vml/vml.js");
  _.VML = VML;

  include("canvas/canvas.js");
  _.Canvas = Canvas;

  var unsupported = function () {
    throw new NotSupported('Browser is not supported');
  }

  var Dummy = {
    Shape    : unsupported,
    Circle   : unsupported,
    Rect     : unsupported,
    Path     : unsupported,
    Text     : unsupported,
    Drawable : unsupported
  };

  _.Dummy = Dummy;

  _.determineImplementation = function determineImplementation(priority) {
    for (var i=0, l=priority.length; i<l; i++) {
      var target = priority[i].toLowerCase();
      if (target === 'svg' && (SVG !== null))            return SVG;
      else if (target === 'vml' && (VML !== null))       return VML;
      else if (target === 'canvas' && (Canvas !== null)) return Canvas;
    }
    return Dummy;
  };

  return _;

})();