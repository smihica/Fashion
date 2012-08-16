var Backend = (function() {
  include("Refresher.js");
  include("TransformStack.js");

  var getDomOffsetPosition = (function () {
    var support_box_model =  (_window && _window.document.compatMode === "CSS1Compat");

    var contains = (function() {
      if ( _window && _window.document.documentElement.contains ) {
        return function( a, b ) {
          return a !== b && (a.contains ? a.contains(b) : true);
        };

      } else if ( _window && _window.document.documentElement.compareDocumentPosition ) {
        return function( a, b ) {
          return !!(a.compareDocumentPosition(b) & 16);
        };

      } else {
        return function() {
          return false;
        };
      }
    })();

    if ( _window && "getBoundingClientRect" in _window.document.documentElement ) {
      return function getDomOffsetPosition_boundingClientRect(elem, doc, docElem, box ) {
        doc = document; docElem = document.documentElement;

        try {
          box = elem.getBoundingClientRect();
        } catch(e) {}

        if ( !box || !contains( docElem, elem ) ) {
          return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
        }

        var body = doc.body,
        clientTop  = docElem.clientTop  || body.clientTop  || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop  = _window.pageYOffset || support_box_model && docElem.scrollTop  || body.scrollTop,
        scrollLeft = _window.pageXOffset || support_box_model && docElem.scrollLeft || body.scrollLeft,
        top  = box.top  + scrollTop  - clientTop,
        left = box.left + scrollLeft - clientLeft;

        return { x: left, y: top };
      };
    } else {
      return function getDomOffsetPosition(elem) {
        var curleft = 0, curtop = 0;
        if (elem.offsetParent) {
          do {
            curleft += elem.offsetLeft;
            curtop += elem.offsetTop;

          } while (elem = elem.offsetParent);
        }
        return {x: curleft, y: curtop};
      };
    }
  })();


  return {
    Refresher      : Refresher,
    TransformStack : TransformStack,
    getDomOffsetPosition: getDomOffsetPosition
  };

})();
