Fashion.SVG = (function() {

  var SVG = {};

  if (!(!!document.createElementNS && !!document.createElementNS( "http://www.w3.org/2000/svg", "svg").createSVGRect)) {
    return null;
  }

  include("Util.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Drawable.js");

  SVG.Util     = Util;
  SVG.Circle   = Circle;
  SVG.Rect     = Rect;
  SVG.Path     = Path;
  SVG.Drawable = Drawable;

  return SVG;

})();