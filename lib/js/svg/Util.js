var Util = _class("UtilSVG", {
  class_methods: {
    createSvgElement: function(id, type) {
      var rt = document.createElementNS("http://www.w3.org/2000/svg", type);
      rt.setAttribute('id', id);
      return rt;
    },
    matrixString: function(m) {
      return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
    }
  }
});