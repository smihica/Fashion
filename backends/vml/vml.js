Fashion.Backend.VML = (function() {
  var Fashion = this;
  var window = Fashion.window;
  var _class = Fashion._lib._class;
  var _escapeXMLSpecialChars = Fashion._lib.escapeXMLSpecialChars;
  var __assert__ = Fashion._lib.__assert__;
  var _addPoint = Fashion._lib.addPoint;
  var _subtractPoint = Fashion._lib.subtractPoint;
  var _clipPoint = Fashion._lib.clipPoint;
  var Refresher = Fashion.Backend.Refresher;
  // checking browser.
  if (Fashion.browser.identifier !== 'ie') return null;

  var VML_PREFIX = 'v';
  var VML_NAMESPACE_URL = 'urn:schemas-microsoft-com:vml';
  var VML_BEHAVIOR_URL = '#default#VML';
  var VML_FLOAT_PRECISION = 1e4;

  function setup() {
    var namespaces = window.document.namespaces;
    if (Fashion.browser.version >= 8) {
      if (!namespaces[VML_PREFIX])
        namespaces.add(VML_PREFIX, VML_NAMESPACE_URL, VML_BEHAVIOR_URL);
      window.document.createStyleSheet().addRule(VML_PREFIX + '\\:line', "behavior:url(#default#VML)");
      window.document.createStyleSheet().addRule(VML_PREFIX + '\\:rect', "behavior:url(#default#VML)");
      window.document.createStyleSheet().addRule(VML_PREFIX + '\\:roundrect', "behavior:url(#default#VML)");
      window.document.createStyleSheet().addRule(VML_PREFIX + '\\:oval', "behavior:url(#default#VML)");
    } else {
      if (!namespaces[VML_PREFIX])
        namespaces.add(VML_PREFIX, VML_NAMESPACE_URL);
      window.document.createStyleSheet().addRule(VML_PREFIX + '\\:*', "behavior:url(#default#VML)");
    }
  }

  function newElement(type) {
    var elem = window.document.createElement(VML_PREFIX + ':' + type);
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

  function appendPrologue(vml, id, tagName) {
    vml.push(
        '<', VML_PREFIX, ':', tagName,
        ' unselectable="on"',
        ' __fashion__id="', id, '"');
    return vml;
  }

  function appendEpilogue(vml, tagName) {
    vml.push('</', VML_PREFIX, ':', tagName, '>');
    return vml;
  }

  function appendStyles(vml, shape) {
    var position = shape.wrapper._position;
    var size = shape.wrapper._size;
    var fillAndStroke = new VMLFillAndStroke();
    shape._buildVMLStyle(fillAndStroke);
    fillAndStroke.setStyle({
      position: 'absolute',
      display: 'block',
      margin: 0,
      padding: 0,
      width: size.x + 'px',
      height: size.y + 'px',
      left: position.x + 'px',
      top: position.y + 'px'
    });
    fillAndStroke.appendHTML(vml);
    return vml;
  }

  function populateWithChildElements(elem) {
    var childNodes = elem.node.childNodes;
    for (var i = childNodes.length; --i >= 0;) {
      var node = childNodes[i];
      switch (node.tagName.toLowerCase()) {
      case 'fill':
        elem.fill = node;
        break;
      case 'stroke':
        elem.stroke = node;
        break;
      }
    }
    return elem;
  }

  function buildMouseEvt(impl, msieEvt) {
    var retval = new Fashion.MouseEvt();
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

    var doc = window.document, body = doc.body;
    physicalPagePosition = {
      x: msieEvt.clientX + body.scrollLeft,
      y: msieEvt.clientY + body.scrollTop
    };

    if (impl instanceof Drawable) {
      retval.screenPosition   = _subtractPoint(physicalPagePosition, impl.getViewportOffset());
      var physicalPosition    = _addPoint(impl.convertToPhysicalPoint(impl.scrollPosition()), retval.screenPosition);
      retval.logicalPosition  = impl.convertToLogicalPoint(physicalPosition);
      retval.physicalPosition = physicalPosition
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
  include("Drawable.js");

  setup();

  return {
    Circle: Circle,
    Rect: Rect,
    Path: Path,
    Text: Text,
    Drawable: Drawable
  }; 
}).call(Fashion);
/*
 * vim: sts=2 sw=2 ts=2 et
 */
