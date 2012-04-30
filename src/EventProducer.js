var EventProducer = _class('EventProducer', {
  props: {
    listenersForEvent: {}
  },

  methods: {
    initEventProducer: function() {
    },

    addEventListener: function(type, func) {
      var listenersForEvent = this.listenersForEvent[type];
      for (var i = 0; i < listenersForEvent.length; i++) {
        if (listenersForEvent[i] == func)
          return;
      }
      listenersForEvent.push(func);
      if (this.__eventAdded)
        this.__eventAdded(type, func);
    },

    removeEventListener: function(type, func) {
      var listenersForEvent = this.listenersForEvent[type];
      for (var i = 0; i < listenersForEvent.length; i++) {
        if (listenersForEvent[i] == func) {
          listenersForEvent.splice(i, 1);
          if (this.__eventRemoved)
            this.__eventRemoved(type, func);
          return;
        }
      }
    },

    dispatchEvent: function(event) {
      var listenersForEvent = listenersForEvent[event.type];
      for (var i = 0; i < listenersForEvent.length; i++) {
        listenersForEvent[i](event);
      }
    }
  }
});
