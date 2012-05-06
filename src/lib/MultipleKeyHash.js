var MultipleKeyHash = _class("MultipleKeyHash", {
  props: {
    _eql: function(key1, key2) { return key1 === key2 },
    _src: []
  },

  methods: {

    init: function(eql) {
      if (eql && typeof eql === 'function') this._eql = eql;
    },

    put: function(key, value) {
      var r = {};
      if (this.exist_p(key, r)) {
        r['ref']['value'] = value;
      }
      this._src.push({key: key, value: value});
    },

    get: function(key) {
      var r = {};
      if (this.exist_p(key, r)) return r['ref']['value'];
      return null;
    },

    pop: function(key) {
      var rt = this.get(key);
      if (rt !== null) this.erace(key);
      return rt;
    },

    erace: function(keys) {
      if (arguments.length > 0) {
        keys = Array.prototype.slice.call(arguments);

        for (var i=0, l=keys.length; i<l; i++) {
          var key = keys[i];
          var r = {};
          if (this.exist_p(key, r)) {
            this._src.splice(r.idx, 1);
          } else {
            throw new NotFound("the object is not found. key = " + key.toString());
          }
        }

      } else {
        for (var l=this._src.length; 0<l; l--) {
          this._src.pop();
        }
      }
    },

    exist_p: function(key, obj) {
      for (var i=0, l=this._src.length; i<l; i++) {
        if (this._eql(this._src[i]['key'], key)) {
          if (obj) {
            obj['ref'] = this._src[i];
            obj['idx'] = i;
          }
          return true;
        }
      }
      return false;
    },

    getAllKeys: function() {
      var rt = [];
      for (var l=this._src.length; 0<l; l--) rt.unshift(this._src[l-1].key);
      return rt;
    },

    getAllValues: function() {
      var rt = [];
      for (var l=this._src.length; 0<l; l--) rt.unshift(this._src[l-1].value);
      return rt;
    },

    forEach: function(fn, self) {
      self = self || this;
      for (var i=0, l=this._src.length; i<l; i++) {
        var item = this._src[i];
        fn.call(self, item.key, item.value, item);
      }
    },

    length: function() {
      return this._src.length;
    }
  }
});