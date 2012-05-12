var Fashion = require('../fashion.js');

var Worker = Fashion._lib._class("Worker", {
  class_props: {
    worker: true
  },
  props: {
    workedTime: 0
  },
  methods: {
    getMonthlyPay: function() {}
  }
});

var Parttimer = Fashion._lib._class("Parttimer", {
  parent: Worker,
  class_props: {
    partTimer: true
  },
  props: {
    hourlyPay: 800
  },
  methods: {
    getMonthlyPay: function() {
      return this.hourlyPay * this.workedTime;
    }
  }
});

var Cook = Fashion._lib._class("Cook", {
  parent: Parttimer,
  class_props: {
    cook: true
  },
  props: {
    advantage: 50
  },
  methods: {
    getMonthlyPay : function() {
      return (this.hourlyPay + this.advantage)
        * this.workedTime;
    }
  }
});

var Waiter = Fashion._lib._class("Waiter", {
  parent: Parttimer,
  class_props: {
    waiter: true
  }
});


exports._lib_class = {
  testPrototypeChain: function(test) {
    test.expect(11);

    var c = new Cook();

    test.equal(Parttimer.prototype, c.__super__());
    test.equal(Worker.prototype, c.__super__().__super__());
    test.equal(Object.prototype, c.__super__().__super__().__super__());

    test.equal(Cook.prototype, c.__proto__);
    test.equal(Parttimer.prototype, Cook.prototype.__proto__);
    test.equal(Worker.prototype, Parttimer.prototype.__proto__);
    test.equal(Object.prototype, Worker.prototype.__proto__);
    test.equal(null, Object.prototype.__proto__);

    test.equal(Parttimer.prototype, Waiter.prototype.__proto__);
    test.equal(Parttimer.prototype, Cook.prototype.__proto__);
    test.equal(Cook.prototype.__proto__, Waiter.prototype.__proto__);

    test.done();
  },

  testPropertySearch: function(test) {
    test.expect(15);

    var c = new Cook();
    c.cook = function() { return "Good taste!" };

    test.ok(c.hasOwnProperty("cook"));
    test.ok(c.hasOwnProperty("advantage"));
    test.ok(!c.__proto__.hasOwnProperty("advantage"));
    test.ok(c.hasOwnProperty("hourlyPay"));
    test.ok(!c.__proto__.hasOwnProperty("hourlyPay"));
    test.ok(!c.__proto__.__proto__.hasOwnProperty("hourlyPay"));
    test.ok(c.hasOwnProperty("workedTime"));
    test.ok(!c.__proto__.hasOwnProperty("workedTime"));
    test.ok(!c.__proto__.__proto__.hasOwnProperty("workedTime"));
    test.ok(!c.__proto__.__proto__.__proto__.hasOwnProperty("workedTime"));
    test.ok(!c.hasOwnProperty("getMonthlyPay"));
    test.ok(c.__proto__.hasOwnProperty("getMonthlyPay"));
    test.ok(c.__proto__.__proto__.hasOwnProperty("getMonthlyPay"));
    test.ok(c.__proto__.__proto__.__proto__.hasOwnProperty("getMonthlyPay"));
    test.equal(typeof c.hoge, 'undefined');

    test.done();
  },

  testClassProperties: function(test) {
    test.expect(10);
    test.ok(!Worker.partTimer);
    test.ok(Parttimer.__super__.worker);
    test.ok(Parttimer.partTimer);
    test.ok(Cook.__super__.__super__.worker);
    test.ok(Cook.__super__.partTimer);
    test.ok(Cook.cook);
    test.ok(!Waiter.cook);
    test.ok(Waiter.__super__.__super__.worker);
    test.ok(Waiter.__super__.partTimer);
    test.ok(Waiter.waiter);
    test.done();
  }
};

/*
 * vim: sts=2 sw=2 ts=2 et
 */
