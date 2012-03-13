var Util = _class("UtilVML", {

  class_props: {
    dashTbl : {
      "-": "shortdash",
      ".": "shortdot",
      "-.": "shortdashdot",
      "-..": "shortdashdotdot",
      ". ": "dot",
      "- ": "dash",
      "--": "longdash",
      "- .": "dashdot",
      "--.": "longdashdot",
      "--..": "longdashdotdot"
    }
  },

  class_methods: {
    createVmlElement: function(type, attrp) {
      var elem = document.createElement(prefix + ':' + type);
      if (!attrp) elem.style.position = 'absolute';
      return elem;
    },

    matrixString: function(m) {
      return "progid:DXImageTransform.Microsoft.Matrix(" +
        "M11=" + m.get(0) + ", M12=" + m.get(2) + ", M21=" + m.get(1) + ", M22=" + m.get(3) +
        ", Dx=" + m.get(4) + ", Dy=" + m.get(5) + ", sizingmethod='auto expand')";
    },

    convertStrokeDash: function(x) {
      return (this.dashTbl[x]) || 'solid';
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

    convertPathArray: function(path) {

      var str = '';
      var last_idt = '';
      var x, y;

      for (var i=0,l=path.length; i<l; i++ ) {
        var p = path[i];
        var idt = p[0];
        switch (idt) {
        case 'M':
          idt = 'm';
          x = p[1]; y = p[2];
          str += ' ' + idt + ' ' + x.toFixed() + ',' + y.toFixed();
          break;

        case 'H':
        case 'V':
          if (idt ==='V') y = p[1]; else x = p[1];
          p[1] = x; p[2] = y;
        case 'L':
          idt = 'l';
          x = p[1]; y = p[2];
          str += ((last_idt === idt) ? ', ' : ' ' + idt + ' ' ) + x.toFixed() + ',' + y.toFixed();

          break;

        case 'C':
          idt = 'c';
          x = item[5]; y = item[6];
          str += (((last_idt === idt) ? ', ' : ' ' + idt + ' ' ) +
                  p[1].toFixed() + ',' + p[2].toFixed() + ',' + p[3].toFixed() + ',' +
                  p[4].toFixed() + ',' + x.toFixed() + ',' + y.toFixed());

          break;

        case 'Z':
          idt = 'x';
          str += idt+' ';
          break;

        // TODO !!!!
        case 'R':
        case 'T':
        case 'S':
        case 'Q':
        case 'A':
        }

        last_idt = idt;
      }

      return (str + ' e');
    }
  }
});