var MouseEventsHandler = _class("MouseEventsHandler", {

  class_props: {
    types:  ['mousedown', 'mouseup', 'mousemove', 'mouseout']
  },

  props : {
    mousedown: new MultipleKeyHash(),
    mouseup:   new MultipleKeyHash(),
    mousemove: new MultipleKeyHash(),
    mouseout:  new MultipleKeyHash(),
    _triggers: {},
    _target: null
  },

  methods: {

    init: function(target, h) {
      this._target = target;
      this._target.impl.holdEventsHandler(this);

      if (h) {
        this.add(h);
      }
    },

    getHandlerFunctionsAll: function() {
      var rt = {}, types = MouseEventsHandler.types;
      for (var i=types.length; 0<i; i--) {
        rt[types[i-1]] = this.getHandlerFunctionsFor(types[i-1]);
      }
      return rt;
    },

    getHandlerFunctionsFor: function(idt) {
      if (this.hasOwnProperty(idt)) {
        var funcs = this[idt];
        return funcs.getAllValues();
      }
      throw new NotSupported("Expected keywords are '" + MouseEventsHandler.types.join("', '") + "'.");
    },

    add: function(h) {
      var target = this._target;
      var self = this;
      for (var type in h) {
        (function (type) {
          if (self.hasOwnProperty(type)) {
            var raw = h[type];
            var wrapped = function(impl_evt) {
              var evt = new MouseEvt(impl_evt, target);
              return raw.call(target, evt);
            };
            self[type].put(raw, wrapped);
            self._triggerAppend(type, wrapped);
          } else {
            throw new NotSupported("'" + type + "' cannot add into a MouseEventsHandler. Supported types are '" +
                                   MouseEventsHandler.types.join("', '") + "'.");
          }
        })(type);
      }
    },

    remove: function(idts) {

      idts = Array.prototype.slice.call(arguments);

      for (var i=0, l=idts.length; i<l; i++) {
        var idt = idts[i];
        if (typeof idt === 'string') {
          if (this.hasOwnProperty(idt)) {
            var funcs = this[idt];
            var keys = funcs.getAllKeys();
            for (var k = keys.length; 0<k; k--) {
              var wrapped = funcs.pop(keys[k-1]);
              this._triggerDelete(idt, wrapped);
            }
          } else {
            throw new NotSupported("Expected keywords are '" + MouseEventsHandler.types.join("', '") + "'.");
          }
        } else if (typeof idt === 'function') {
          var h = MouseEventsHandler.types;
          for (var i=h.length; 0<i; i--) {
            var type = h[i-1];
            var wrapped = this[type].pop(idt);
            if (wrapped !== null) {
              this._triggerDelete(type, wrapped);
              return;
            }
          }
          throw new NotFound("The function is not Found in this Handler.");

        } else {
          throw new NotSupported("remove(idts...) expects string or function.");
        }
      }
    },

    holdTrigger: function(id, trigger) {
      if (this._triggers.hasOwnProperty(id)) {
        throw new AlreadyExists("The trigger id is already exists.");
      }
      this._triggers[id] = trigger;
    },

    releaseTrigger: function(id) {
      delete this._triggers[id];
    },

    _triggerAppend: function(type, func) {
      var triggers = this._triggers;
      for (var i in triggers)
        if (triggers.hasOwnProperty(i))
          triggers[i].add(type, func);
    },

    _triggerDelete: function(type, func) {
      var triggers = this._triggers;
      for (var i in triggers)
        if (triggers.hasOwnProperty(i))
          triggers[i].remove(type, func);
    }
  }
});