var VML = (function() {

  // checking browser.
  if ((BROWSER.identifier !== 'ie' || BROWSER.version > 8 )) return null;

  var _ = {};
  var VML_PREFIX = 'v';
  var VML_NAMESPACE_URL = 'urn:schemas-microsoft-com:vml';
  var VML_BEHAVIOR_URL = '#default#VML';

  function setup() {
    var namespaces = _window.document.namespaces;
    if (!namespaces[VML_PREFIX])
      namespaces.add(VML_PREFIX, VML_NAMESPACE_URL);
    _window.document.createStyleSheet().addRule(VML_PREFIX + '\\:*', "behavior:url(#default#VML)");
  }

  function newElement(type) {
    var elem = _window.document.createElement(VML_PREFIX + ':' + type);
    return elem;
  }

  function matrixString(m) {
    return [m.a, m.c, m.b, m.d, m.e, m.f].join(',');
  }

  function pathString(path) {
    var retval = [];
    for (var i = 0; i < path.length; i++) {
      var p = path[i];
      switch (p[0]) {
      case 'M':
        retval.push('m', (p[1] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[2] * VML_FLOAT_PRECISION).toFixed(0));
        break;
      case 'L':
        retval.push('l', (p[1] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[2] * VML_FLOAT_PRECISION).toFixed(0));
        break;
      case 'C':
        retval.push('c', (p[1] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[2] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[3] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[4] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[5] * VML_FLOAT_PRECISION).toFixed(0),
                         (p[6] * VML_FLOAT_PRECISION).toFixed(0));
        break;
      case 'Z':
        retval.push('x');
        break;
      // TODO !!!!
      case 'R':
      case 'T':
      case 'S':
      case 'Q':
      case 'A':
      }
    }
    retval.push('e');
    return retval.join(' ');
  }

  function strokePattern(pattern) {
    return pattern.join(' ');
  }

  function buildMouseEvt(impl, msieEvt) {
    var retval = new MouseEvt();
    retval.type = msieEvt.type;
    retval.target = impl.wrapper;
    var which = msieEvt.which;
    var button = msieEvt.button;
    if (!which && button !== void(0)) {
      which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
    }
    switch(which) {
    case 0: retval.left = retval.middle = retval.right = false; break;
    case 1: retval.left = true; break;
    case 2: retval.middle = true; break;
    case 3: retval.right = true; break;
    }

    var physicalPagePosition;

    var doc = _window.document, body = doc.body;
    physicalPagePosition = {
      x: msieEvt.clientX + body.scrollLeft,
      y: msieEvt.clientY + body.scrollTop
    };

    if (impl instanceof Drawable) {
      retval.physicalPosition = _subtractPoint(physicalPagePosition, impl.getViewportOffset());
      retval.logicalPosition = impl.convertToLogicalPoint(retval.physicalPosition);
    } else {
      retval.physicalPosition = _subtractPoint(physicalPagePosition, impl.drawable.getViewportOffset());
      retval.logicalPosition = impl.drawable.convertToLogicalPoint(retval.physicalPosition);
      retval.offsetPosition = _subtractPoint(retval.logicalPosition, impl.wrapper._position);
    }

    return retval;
  }

  include("Util.js");
  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("Drawable.js");

  _.Util       = Util;
  _.Circle     = Circle;
  _.Rect       = Rect;
  _.Path       = Path;
  _.Text       = Text;
  _.Drawable   = Drawable;

  setup();

  return _;

})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
