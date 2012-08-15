var Refresher = _class("Refresher", {
  props: {
    _preHandler: null,
    _postHandler: null,
    _handlers: []
  },

  methods: {
    init: function (original) {
      if (original instanceof this.constructor) {
        this._preHandler = original._preHandler;
        this._postHandler = original._postHandler;
        this._handlers = original._handlers.slice(0);
      }
    },

    setup: function(args) {
      for (var i in args)
        this[i].call(this, args[i]);
      return this;
    },

    preHandler: function(pre) {
      this._preHandler = pre;
    },

    postHandler: function(post) {
      this._postHandler = post;
    },

    handlers: function(pairs) {
      this._handlers = pairs;
    },

    moreHandlers: function(pairs) {
      this._handlers = this._handlers.concat(pairs);
    },

    add: function(pair) {
      this._handlers.push(pair);
    },

    call: function (target, dirty) {
      var originalDirty = dirty;
      if (this._preHandler) {
        var _dirty = this._preHandler.call(target, dirty);
        if (_dirty !== void(0))
          dirty = _dirty;
      }
      if (dirty) {
        for (var i = 0; i < this._handlers.length; i++) {
          var pair = this._handlers[i];
          if (dirty & pair[0])
            pair[1].call(target, dirty);
        }
      }
      this._postHandler && this._postHandler.call(target, dirty, originalDirty);
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
