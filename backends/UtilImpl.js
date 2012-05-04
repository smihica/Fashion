// utils for Impl

var UtilImpl = {
  DomEvt: _class("Impl.UtilImpl.DomEvt", {
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
  })
};

