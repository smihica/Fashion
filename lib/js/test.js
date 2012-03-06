TEST = {
  set : {},

  log : function(arg){
    var test_setp = arg.match(/^TESTING_SET\s:/);
    var test_unitp = arg.match(/^UNIT\s:/);
    if (test_setp) {
      var line = document.createElement("h1");
      line.innerHTML = arg;
      this.stage.appendChild(line);
    } else if (test_unitp) {
      var line = document.createElement("h2");
      line.innerHTML = arg;
      this.stage.appendChild(line);

    } else {
      var line = document.createElement("span");
      var br   = document.createElement("br");
      if (arg.match(/^!!! ERROR !!!/)) // error
        line.className = "error";
      else if (arg.match(/^Passed./))
        line.className = "success";
      else {
        line.className = "normal";
        arg = arg.replace(/\s/g, "&nbsp;");
      }
      line.innerHTML = arg;
      this.stage.appendChild(line);
      this.stage.appendChild(br);
    }
  },

  DefineTest : function(name, list) {
    var rt = {};
    var self = this;
    rt.name = name;
    rt.list = list;
    rt.start = function() {
      var len = this.list.length;

      var test_fn = function(result, description) {
        description = (description || "");

        if (arguments.length == 0)
          return self.log(" --- There are nothing to do yet. Skip --- ");

        if (result)
          self.log("Passed. --- "+ description);
        else
          self.log("!!! ERROR !!! --- " + description);

      };

      var log_fn = function(x) {
        self.log(x);
      };

      self.log("TESTING_SET : " + this.name);
      for(var i=0; i<len; i++) {
        self.log("UNIT : " + this.list[i][0]);
        (this.list[i][1])(test_fn, log_fn);
      }

    }
    this.set[name] = rt;
    return rt;
  },

  runtest : function() {
    var selector = document.getElementById("selector");
    var i = selector.selectedIndex;
    var target = selector.childNodes[i].text;

    if (target == "ALL") {
      for(var j in this.set) {
        (this.set[j]).start();
      }
    } else {
      (this.set[target]).start();
    }
  },

  clear : function() {
    var c;
    while (c = this.stage.lastChild) this.stage.removeChild(c);
  }
};

include("*.test.js");

window.onload = function() {

  TEST.stage = document.getElementById("logstage");

  var selector = document.getElementById("selector");
  var option = document.createElement("option");
  option.innerHTML = "ALL";
  selector.appendChild(option);

  for(var i in TEST.set) {
    var option = document.createElement("option");
    option.innerHTML = i;
    selector.appendChild(option);
  }

};