var Util = (function() {

  var Util = {};

  include("Matrix.js");
  include("Path.js");
  include("Style.js");

  Util.Matrix = Matrix;
  Util.Path   = Path;
  Util.Style  = Style;

  return Util;

})();
