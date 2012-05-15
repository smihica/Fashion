var Backend = (function() {
  include("UtilImpl.js");
  include("Refresher.js");
  include("VisualObject.js");
  include("DrawableImpl.js");
  include("ShapeImpl.js");
  include("PathImpl.js");
  include("TextImpl.js");

  include("svg/svg.js");
  include("vml/vml.js");
  include("canvas/canvas.js");

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

  var determineImplementation = function determineImplementation(priority) {
    for (var i=0, l=priority.length; i<l; i++) {
      var target = priority[i].toLowerCase();
      if (target === 'svg' && (SVG !== null))            return SVG;
      else if (target === 'vml' && (VML !== null))       return VML;
      else if (target === 'canvas' && (Canvas !== null)) return Canvas;
    }
    return Dummy;
  };

  return {
    UtilImpl       : UtilImpl,
    VisualObject   : VisualObject,
    DrawableImpl   : DrawableImpl,
    SVG            : SVG,
    VML            : VML,
    Canvas         : Canvas,
    Dummy          : Dummy,
    determineImplementation : determineImplementation
  };

})();
