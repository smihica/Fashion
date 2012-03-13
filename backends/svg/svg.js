Fashion.SVG = (function() {

  // checking browser.
  if ((BROWSER.identifier === 'ie' && BROWSER.version < 9 )) return null;

  var SVG = {};

  include("Util.js");

  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("Drawable.js");

  SVG.Util     = Util;
  SVG.Circle   = Circle;
  SVG.Rect     = Rect;
  SVG.Path     = Path;
  SVG.Text     = Text;
  SVG.Drawable = Drawable;

  return SVG;

})();