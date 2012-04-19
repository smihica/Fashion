var SVG = (function() {

  // checking browser.
  if ((BROWSER.identifier === 'ie' && BROWSER.version < 9 )) return null;

  var _ = {};

  include("Util.js");

  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("Drawable.js");

  _.Util     = Util;
  _.Circle   = Circle;
  _.Rect     = Rect;
  _.Path     = Path;
  _.Text     = Text;
  _.Drawable = Drawable;

  return _;

})();