Fashion.Backend.SVG = (function() {
  var Fashion = this;
  var window = Fashion.window;
  var _class = Fashion._lib._class;
  var _escapeXMLSpecialChars = Fashion._lib.escapeXMLSpecialChars;
  var __assert__ = Fashion._lib.__assert__;
  var _addPoint = Fashion._lib.addPoint;
  var _subtractPoint = Fashion._lib.subtractPoint;
  var _clipPoint = Fashion._lib.clipPoint;
  var Refresher = Fashion.Backend.Refresher;
  var TransformStack = Fashion.Backend.TransformStack;

  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

  var isGecko = window.navigator.userAgent.indexOf("Gecko/") >= 0;

  function newElement(element_name) {
    return window.document.createElementNS(SVG_NAMESPACE, element_name);
  }

  function newTextNode(text) {
    return window.document.createTextNode(text);
  }

  function matrixString(m) {
    return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
  }

  function pathString(pathData) {
    return pathData.join(' ').replace(/,/g, ' ');
  }

  function buildMouseEvt(impl, domEvt) {
    var retval = new Fashion.MouseEvt();
    retval.type = domEvt.type;
    retval.target = impl.wrapper;
    var which = domEvt.which;
    var button = domEvt.button;
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
    if (typeof domEvt.pageX != 'number' && typeof domEvt.clientX == 'number') {
      var eventDoc = domEvt.target.ownerDocument || window.document;
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
      var physicalPosition    = _addPoint(impl.convertToPhysicalPoint(impl.scrollPosition()), retval.screenPosition);
      retval.logicalPosition  = impl.convertToLogicalPoint(physicalPosition);
      retval.physicalPosition = physicalPosition;
    } else {
      retval.screenPosition   = _subtractPoint(physicalPagePosition, impl.drawable.getViewportOffset());
      var physicalPosition    = _addPoint(impl.drawable.convertToPhysicalPoint(impl.drawable.scrollPosition()), retval.screenPosition);
      retval.logicalPosition  = impl.drawable.convertToLogicalPoint(physicalPosition);
      retval.physicalPosition = physicalPosition;
      retval.offsetPosition   = _subtractPoint(retval.logicalPosition, impl.wrapper._position);
    }

    return retval;
  }

  include("Base.js");
  include("Circle.js");
  include("Rect.js");
  include("Path.js");
  include("Text.js");
  include("DefsManager.js");
  include("DepthManager.js");
  include("Drawable.js");

  return {
    Circle   : Circle,
    Rect     : Rect,
    Path     : Path,
    Text     : Text,
    Drawable : Drawable
  };
}).call(Fashion);

/*
 * vim: sts=2 sw=2 ts=2 et
 */
