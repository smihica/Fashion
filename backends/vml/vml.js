var VML = (function() {

  // checking browser.
  if ((BROWSER.identifier !== 'ie' || BROWSER.version > 8 )) return null;

  var _ = {};
  var VML_PREFIX = 'v';

  function setup() {
    var namespaces = document.namespaces;
    if (!namespaces[VML_PREFIX])
      namespaces.add(VML_PREFIX, 'urn:schemas-microsoft-com:vml', '#default#VML');
  }

  function newElement(type) {
    var elem = _window.document.createElement(VML_PREFIX + ':' + type);
    return elem;
  }

  include("Util.js");
  include("MouseEvt.js");
  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("Drawable.js");

  _.Util       = Util;
  _.MouseEvt   = MouseEvt;
  _.Circle     = Circle;
  _.Rect       = Rect;
  _.Path       = Path;
  _.Text       = Text;
  _.Drawable   = Drawable;

  setup();

  return _;

})();
