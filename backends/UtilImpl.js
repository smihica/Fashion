// utils for Impl

var UtilImpl = {
  DomEvt: _class("Impl.UtilImpl.DomEvt", {

    class_methods: {
      addEvt: ((_window && (_window.document.addEventListener)) ?
               function(elem, type, func){ return elem.addEventListener(type, func, false); } :
               ((_window && (_window.document.attachEvent)) ?
                function(elem, type, func) { return elem.attachEvent('on' + type, func); } :
                function() { throw new NotSupported("This Browser is not Supported add Event to a DomElement."); })),

      remEvt: ((_window && (_window.document.removeEventListener)) ?
               function(elem, type, func) { return elem.removeEventListener(type, func, false); } :
               ((_window && (_window.document.detachEvent)) ?
                 function(elem, tyoe, func) { return elem.detachEvent('on' + type, func); } :
                function() { throw new NotSupported("This Browser is not Supported add Event to a DomElement."); }))
    },

    methods: {
      convertToMouseEvt: function convertToMouseEvt(dom_evt) {
        var which = dom_evt.which;
        var button = dom_evt.button;
        if (!which && button !== undefined ) {
          which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
        }
        switch(which) {
        case 0: this.left = this.middle = this.right = false; break;
        case 1: this.left = true; break;
        case 2: this.middle = true; break;
        case 3: this.right = true; break;
        }

        var pageX = dom_evt.pageX;
        var pageY = dom_evt.pageY;
        if ( dom_evt.pageX == null && dom_evt.clientX != null ) {
          var eventDoc = dom_evt.target.ownerDocument || _window.document;
          var doc = eventDoc.documentElement;
          var body = eventDoc.body;

          pageX = dom_evt.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
          pageY = dom_evt.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        this.pagePosition.x = pageX;
        this.pagePosition.y = pageY;

        return this;
      }
    }
  }),

  getDomOffsetPosition: (function () {
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

    if ( _window && "getBoundingClientRect" in _window.document.documentElement )
      return function getDomOffsetPosition_boundingClientRect(elem, doc, docElem, box ) {
        doc = document; docElem = document.documentElement;

        try {
          box = elem.getBoundingClientRect();
        } catch(e) {}

        if ( !box || !contains( docElem, elem ) ) {
          console.log('here');
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
  })()

};

