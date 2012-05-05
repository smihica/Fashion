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
          var eventDoc = dom_evt.target.ownerDocument || document;
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

  // Please write better code !!!
  getDomOffsetPosition: function getDomOffsetPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;

      } while (obj = obj.offsetParent);
    }
    return {x: curleft, y: curtop};
  }
};

