var SVG = (function() {
  // checking browser.
  if ((BROWSER.identifier === 'ie' && BROWSER.version < 9)) return null;

  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

  function newElement(element_name) {
    return _window.document.createElementNS(SVG_NAMESPACE, element_name);
  }

  function newTextNode(text) {
    return _window.document.createTextNode(text);
  }

  function matrixString(m) {
    return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
  }

  function pathString(pathData) {
    return pathData.join(' ').replace(/,/g, ' ');
  }

  function buildMouseEvt(impl, domEvt) {
    var retval = new MouseEvt();
    retval.type = domEvt.type;
    retval.target = impl.wrapper;
    var which = domEvt.which;
    var button = domEvt.button;
    if (!which && button !== undefined ) {
      which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
    }
    switch(which) {
    case 0: retval.left = retval.middle = retval.right = false; break;
    case 1: retval.left = true; break;
    case 2: retval.middle = true; break;
    case 3: retval.right = true; break;
    }

    var physicalPagePosition;
    if (typeof domEvt.pageX != 'number' && typeof domEvt.clientX == 'number') {
      var eventDoc = domEvt.target.ownerDocument || _window.document;
      var doc = eventDoc.documentElement;
      var body = eventDoc.body;
      physicalPagePosition = {
        x: domEvt.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
        y: domEvt.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0)
      };
    } else {
      physicalPagePosition = { x: domEvt.pageX, y: domEvt.pageY };
    }
    if (impl instanceof Drawable) {
      retval.screenPosition   = _subtractPoint(physicalPagePosition, impl.getViewportOffset());
      retval.logicalPosition  = impl.convertToLogicalPoint(retval.screenPosition);
      retval.physicalPosition = impl.convertToPhysicalPoint(retval.screenPosition);
    } else {
      retval.screenPosition   = _subtractPoint(physicalPagePosition, impl.drawable.getViewportOffset());
      retval.logicalPosition  = impl.drawable.convertToLogicalPoint(retval.screenPosition);
      retval.physicalPosition = impl.drawable.convertToPhysicalPoint(retval.screenPosition);
      retval.offsetPosition   = _subtractPoint(retval.logicalPosition, impl.wrapper._position);
    }

    return retval;
  }

  include("Util.js");
  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("DefsManager.js");
  include("DepthManager.js");
  include("Drawable.js");

  return {
    Util     : Util,
    Circle   : Circle,
    Rect     : Rect,
    Path     : Path,
    Text     : Text,
    Drawable : Drawable
  };
})();

/*
 * vim: sts=2 sw=2 ts=2 et
 */
