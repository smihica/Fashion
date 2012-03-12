var Util = _class("UtilSVG", {
  class_methods: {
    createSvgElement: function(type) {
      return document.createElementNS("http://www.w3.org/2000/svg", type);
    },
    createTextElement: function(str) {
      return document.createTextNode(str);
    },
    convertColorArray: function(arr) {
      var color = '#', R, G, B;
      R = (new Number(arr[0])).toString(16);
      G = (new Number(arr[1])).toString(16);
      B = (new Number(arr[2])).toString(16);
      if (R.length < 2) R='0'+R;
      if (G.length < 2) G='0'+G;
      if (B.length < 2) B='0'+B;
      return {color: color+R+G+B, opacity: (arr[3] / 255.0)};
    },
    matrixString: function(m) {
      return "matrix(" + [m.get(0), m.get(1), m.get(2), m.get(3), m.get(4), m.get(5)].join() + ")";
    }
  }
});