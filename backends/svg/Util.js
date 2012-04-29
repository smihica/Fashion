var Util = _class("UtilSVG", {
  class_methods: {
    createSvgElement: function(type) {
      return document.createElementNS("http://www.w3.org/2000/svg", type);
    },
    createTextElement: function(str) {
      return document.createTextNode(str);
    },
    matrixString: function(m) {
      return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
    }
  }
});
