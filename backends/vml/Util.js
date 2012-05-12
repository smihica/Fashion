var Util = _class("UtilVML", {
  class_methods: {
    matrixString: function(m) {
      return "progid:DXImageTransform.Microsoft.Matrix(" +
        "M11=" + m.get(0) + ", M12=" + m.get(2) + ", M21=" + m.get(1) + ", M22=" + m.get(3) +
        ", Dx=" + m.get(4) + ", Dy=" + m.get(5) + ", sizingmethod='auto expand')";
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

    convertPathArray: function(path) {
      var retval = [];
      for (var i = 0; i < path.length; i++) {
        var p = path[i];
        var idt = p[0];
        switch (idt) {
        case 'M':
          retval.push('m' + p[1] + ',' + p[2]);
          break;
        case 'L':
          retval.push('l' + p[1] + ',' + p[2]);
          break;
        case 'C':
          retval.push('c' + p[1] + ',' + p[2] + ',' + p[3] + ',' + p[4] + ',' + p[5] + ',' + p[6]);
          break;
        case 'Z':
          retval.push('x');
          break;
        // TODO !!!!
        case 'R':
        case 'T':
        case 'S':
        case 'Q':
        case 'A':
        }
      }
      retval.push('e');
      return retval.join('');
    }
  }
});
