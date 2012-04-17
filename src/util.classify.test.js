//画面表示関数
function debugPrint() {
  var separator = " ";
  document.write(Array.prototype.join.apply(arguments, [separator]));
  document.write('<br>');
};

/**
 * Object <- Worker <- PartTimer <- Cook
 *                               <- Waiter
 */

/**
 * 労働者オブジェクト
 */
var Worker = _class("Worker", {
  props: {
    workedTime: 0
  },
  methods: {
    getMonthlyPay: function() {}
  }
});

/**
 * アルバイト オブジェクト
 */
var PartTimer = _class("PartTimer", {
  parent: Worker,
  props: {
    hourlyPay: 800
  },
  methods: {
    getMonthlyPay: function() {
      return this.hourlyPay * this.workedTime;
    }
  }
});

/**
 * 調理係オブジェクト
 */
var Cook = _class("Cook", {
  parent: PartTimer,
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

/**
 * 接客係オブジェクト
 */

var Waiter = _class("Waiter", {
  parent: PartTimer
});

//プロトタイプ チェーン
(function() {
  var c = new Cook();

  //その１
  debugPrint("Chain1:",
             (c.__super__() === PartTimer.prototype),
             (c.__super__().__super__() === Worker.prototype),
             (c.__super__().__super__().__super__() === Object.prototype));

  //その２
  debugPrint("Chain2:",
             (c.__proto__ === Cook.prototype),
             (Cook.prototype.__proto__ === PartTimer.prototype),
             (PartTimer.prototype.__proto__ === Worker.prototype),
             (Worker.prototype.__proto__ === Object.prototype),
             (Object.prototype.__proto__ === null));

  //その３
  debugPrint("Chain3:",
             (Waiter.prototype.__proto__ === PartTimer.prototype),
             (Cook.prototype.__proto__ === PartTimer.prototype),
             (Waiter.prototype.__proto__ === Cook.prototype.__proto__));
})();

/*

//プロパティ探索
(function() {
  var c = new Cook();
  c.cook = function() { return "Good taste!" };

  debugPrint("cook:",
             c.hasOwnProperty("cook"));

  debugPrint("advantage:",
             c.hasOwnProperty("advantage"),
             c.__proto__.hasOwnProperty("advantage"));

  debugPrint("hourlyPay:",
             c.hasOwnProperty("hourlyPay"),
             c.__proto__.hasOwnProperty("hourlyPay"),
             c.__proto__.__proto__.hasOwnProperty("hourlyPay"));

  debugPrint("workedTime:",
             c.hasOwnProperty("workedTime"),
             c.__proto__.hasOwnProperty("workedTime"),
             c.__proto__.__proto__.hasOwnProperty("workedTime"),
             c.__proto__.__proto__.__proto__.hasOwnProperty(
               "workedTime"));

  debugPrint("getMonthlyPay:",
             c.hasOwnProperty("getMonthlyPay"),
             c.__proto__.hasOwnProperty("getMonthlyPay"));

//[return] true
//  c.__proto__.__proto__.hasOwnProperty("getMonthlyPay");
//  c.__proto__.__proto__.__proto__.hasOwnProperty(
//    "getMonthlyPay");

//[warning] reference to undefined property
//  c.hoge;
})();



/**
 * 労働者 P オブジェクト
 * prototype で workedTime を定義
 * /
function WorkerP() {}
WorkerP.prototype = {
  workedTime: 0
};

/**
 * 労働者 C オブジェクト
 * コンストラクタで workedTime を定義
 * /
function WorkerC() {
  this.workedTime = 0;
}
WorkerC.prototype = {};

/**
 * 労働者 W オブジェクト
 * prototype で workedTime を定義してコンストラクタから使用
 * /
function WorkerW() {
  this.workedTime = 0;
}
WorkerW.prototype = {
  workedTime: null
};

//オブジェクトのプロパティ探索
(function() {
  debugPrint("FunctionObject:",
             WorkerP.prototype.hasOwnProperty("workedTime"),
             WorkerW.prototype.hasOwnProperty("workedTime"));
  
//[return] false
//  WorkerP.hasOwnProperty("workedTime");
//  WorkerP.__proto__.hasOwnProperty("workedTime");
//  WorkerC.hasOwnProperty("workedTime");
//  WorkerC.prototype.hasOwnProperty("workedTime");
//  WorkerC.__proto__.hasOwnProperty("workedTime");
//  WorkerW.hasOwnProperty("workedTime");
//  WorkerW.__proto__.hasOwnProperty("workedTime");
})();

//インスタンスのプロパティ探索
(function() {
  var p = new WorkerP();
  var c = new WorkerC();
  var w = new WorkerW();

  debugPrint("Instanse:",
             p.__proto__.hasOwnProperty("workedTime"),
             c.hasOwnProperty("workedTime"),
             w.hasOwnProperty("workedTime"),
             w.__proto__.hasOwnProperty("workedTime"));

//[warning] reference to undefined property
//[Error] has no properties
//  p.prototype.hasOwnProperty("workedTime");
//  c.prototype.hasOwnProperty("workedTime");
//  w.prototype.hasOwnProperty("workedTime");

//[return] false
//  p.hasOwnProperty("workedTime");
//  c.__proto__.hasOwnProperty("workedTime");
})();
*/
