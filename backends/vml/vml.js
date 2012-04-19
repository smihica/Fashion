var VML = (function() {

  // checking browser.
  if ((BROWSER.identifier !== 'ie' || BROWSER.version > 8 )) return null;

  var _ = {};
  var prefix = 'v';

  if (!window.console && DEBUG_MODE) {
    window.console = {
      log: function(txt) {
        /*
        var n = document.getElementById('console');
        n.value += txt + "\n";
        var r = n.createTextRange();
        r.move('character', n.value.length);
        r.select();
        */
      }
    }
  }

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
  _.Drawable.setup();

  return _;

})();