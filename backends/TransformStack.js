var TransformStack = _class("TransformStack", {
  props: {
    stack: [],
    pairs: {},
    endOfFirst: 0,
    beginningOfLast: 0
  },

  methods: {
    init: function () {
    },

    add: function (disposition, key, matrix) {
      var pair = this.pairs[key];
      if (pair) {
        pair[1] = matrix;
        return false;
      }
      switch (disposition.toLowerCase()) {
      case 'first':
        pair = [key, matrix];
        this.pairs[key] = pair;
        this.stack.unshift(pair);
        this.endOfFirst++;
        this.beginningOfLast++;
        break;
      case 'afterfirst':
        pair = [key, matrix];
        this.pairs[key] = pair;
        this.stack.splice(this.endOfFirst, 0, pair);
        this.beginningOfLast++;
        break;
      case 'beforelast':
        pair = [key, matrix];
        this.pairs[key] = pair;
        this.stack.splice(this.beginningOfLast, 0, pair);
        this.beginningOfLast++;
        break;
      case 'last':
        pair = [key, matrix];
        this.pairs[key] = pair;
        this.stack.push(pair);
        break;
      default:
        throw new ArgumentError("Invalid disposition: " + disposition);
      }
      return true;
    },

    remove: function (key) {
      if (!(key in this.pairs))
        throw new NotFound("Key not found: " + key);
      var i = 0;
      for (;;) {
        if (i >= this.stack.length)
          throw new NotFound("???"); // should not happen
        if (this.stack[i][0] == key)
          break;
        i++;
      }
      this.stack.splice(i, 1);
      if (i < this.endOfFirst)
        this.endOfFirst--;
      if (i < this.beginningOfLast)
        this.beginningOfLast--;
      delete this.pairs[key];
    },

    get: function () {
      if (this.stack.length == 0)
        return null;
      var matrix = this.stack[0][1];
      for (var i = 1; i < this.stack.length; i++)
        matrix = matrix.multiply(this.stack[i][1]);
      return matrix;
    }
  }
});
/*
 * vim: sts=2 sw=2 ts=2 et
 */
