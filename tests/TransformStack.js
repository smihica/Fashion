var Fashion = require('../fashion.js');

var DummyMatrix = function (data) { this.data = data; };
DummyMatrix.prototype.multiply = function (that) {
  return new this.constructor(this.data.concat(that.data));
};

exports.TransformStack = {
  testInstantiate: function (test) {
    test.expect(1);
    test.ok(new Fashion.Backend.TransformStack);
    test.done();
  },

  testAdd: function (test) {
    test.expect(28);
    var transformStack = new Fashion.Backend.TransformStack;
    test.equal(true, transformStack.add('first', 'a', new DummyMatrix([1])));
    test.deepEqual([1], transformStack.get().data);
    test.equal(true, transformStack.add('first', 'b', new DummyMatrix([2])));
    test.deepEqual([2, 1], transformStack.get().data);
    test.equal(true, transformStack.add('first', 'c', new DummyMatrix([3])));
    test.deepEqual([3, 2, 1], transformStack.get().data);
    test.equal(true, transformStack.add('last', 'd', new DummyMatrix([4])));
    test.deepEqual([3, 2, 1, 4], transformStack.get().data);
    test.equal(true, transformStack.add('last', 'e', new DummyMatrix([5])));
    test.deepEqual([3, 2, 1, 4, 5], transformStack.get().data);
    test.equal(true, transformStack.add('last', 'f', new DummyMatrix([6])));
    test.deepEqual([3, 2, 1, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('afterFirst', 'g', new DummyMatrix([7])));
    test.deepEqual([3, 2, 1, 7, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('afterFirst', 'h', new DummyMatrix([8])));
    test.deepEqual([3, 2, 1, 8, 7, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('afterFirst', 'i', new DummyMatrix([9])));
    test.deepEqual([3, 2, 1, 9, 8, 7, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('beforeLast', 'j', new DummyMatrix([10])));
    test.deepEqual([3, 2, 1, 9, 8, 7, 10, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('beforeLast', 'k', new DummyMatrix([11])));
    test.deepEqual([3, 2, 1, 9, 8, 7, 10, 11, 4, 5, 6], transformStack.get().data);
    test.equal(true, transformStack.add('beforeLast', 'l', new DummyMatrix([12])));
    test.deepEqual([3, 2, 1, 9, 8, 7, 10, 11, 12, 4, 5, 6], transformStack.get().data);
    test.equal(false, transformStack.add('first', 'f', new DummyMatrix([13])));
    test.deepEqual([3, 2, 1, 9, 8, 7, 10, 11, 12, 4, 5, 13], transformStack.get().data);
    test.equal(false, transformStack.add('last', 'c', new DummyMatrix([14])));
    test.deepEqual([14, 2, 1, 9, 8, 7, 10, 11, 12, 4, 5, 13], transformStack.get().data);
    test.done();
  }
};

/*
 * vim: sts=2 sw=2 ts=2 et
 */


