var BatchUpdater = _class('BatchUpdater', {
  methods: {
    schedule: function (shape, updateFunc) {}
  }
});

var BasicBatchUpdater = _class('BasicBatchUpdater', {
  interfaces: [BatchUpdater],

  props: {
    queue: []
  },

  methods: {
    schedule: function (shape, updateFunc) {
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i][0] === shape &&
            this.queue[i][1] === updateFunc) {
          this.queue.splice(i, 1);
          break;
        }
      }
      this.queue.push([shape, updateFunc]);
    },

    update: function () {
      for (var i = 0; i < this.queue.length; i++) {
        var entry = this.queue[i];
        entry[1].call(entry[0]);
      }
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
