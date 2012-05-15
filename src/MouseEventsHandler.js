var MouseEventsHandler = _class("MouseEventsHandler", {
  props : {
    _handlersMap: {
      mousedown: [],
      mouseup:   [],
      mousemove: [],
      mouseout:  []
    },
    _target: null
  },

  methods: {
    init: function(target, h) {
      this._target = target;

      if (h) {
        this.add(h);
      }
    },

    getHandlerFunctionsFor: function(type) {
      var funcs = this._handlersMap[type];
      if (!funcs)
        throw new NotSupported("Unexpected keyword '" + type + "'.");
      return funcs;
    },

    add: function(type, h) {
      if (arguments.length == 2 && typeof h == 'function') {
        var handlers = this._handlersMap[type];
        if (!handlers)
          throw new NotSupported("Unsupported event type: '" + type + "'.");
        if (_indexOf(handlers, h) >= 0)
          return false;
        handlers.push(h);
        return true;
      } else if (arguments.length == 1) {
        for (var _type in type)
          this.add(_type, type[_type]);
        return true;
      } else {
        throw new ArgumentError("Unexpected argument: " + type);
      }
    },

    remove: function(type, h) {
      var handlers = this._handlersMap[type];
      var i = _indexOf(handlers, h);
      if (i < 0)
        throw new NotFound("The function is not Found in this Handler.");
      handlers.splice(i, 1);
    },

    removeAll: function (type) {
      if (type instanceof Array) {
        for (var i = 0; i < type.length; i++)
          this.removeAll(type[i]);
        return;
      }
      this._handlersMap[type] = [];
    },

    dispatch: function (evt) {
      var handlers = this._handlersMap[evt.type];
      if (handlers === void(0))
        return false;
      for (var i = 0; i < handlers.length; i++)
        handlers[i].call(this._target, evt);
      return true;
    },

    handles: function (type) {
      var handlers = this._handlersMap[type];
      return handlers && handlers.length > 0;
    }
  }
});
