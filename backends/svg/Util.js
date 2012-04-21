var Util = _class("UtilSVG", {
  class_methods: {
    createSvgElement: function(type) {
      return document.createElementNS("http://www.w3.org/2000/svg", type);
    },
    createTextElement: function(str) {
      return document.createTextNode(str);
    },
    convertStrokePattern: function(pattern) {
      return pattern.join(' ');
    },
    convertColorArray: function(color) {
      var r = color.r.toString(16);
      if (r.length < 2) r = '0' + r;
      var g = color.g.toString(16);
      if (g.length < 2) g = '0' + g;
      var b = color.b.toString(16);
      if (b.length < 2) b = '0' + b;
      return { color: '#' + r + g + b, opacity: (color.a / 255.0) };
    },
    matrixString: function(m) {
      return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
    }
  }
});
