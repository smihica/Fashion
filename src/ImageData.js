var ImageData = _class('ImageData', {
  props: {
    url: null,
    node: null,
    _size: null,
    callbacks: null
  },

  methods: {
    init: function ImageData_init(url) {
      this.url = url;
      this.node = new _Image();

      this.callbacks = [];
      var self = this;
      Fashion._lib._bindEvent(this.node, 'load', function () {
        self._size = { width: self.node.width, height: self.node.height };
        Fashion._lib._unbindEvent(self.node, 'load', arguments.callee);
        for (var i = 0; i < self.callbacks.length; i++)
          self.callbacks[i](self._size);
        self.callbacks = null;
      });

      this.node.src = url;
    },

    size: function ImageData_size(f) {
      if (this._size !== null)
        f(this._size);
      else
        this.callbacks.push(f);
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
