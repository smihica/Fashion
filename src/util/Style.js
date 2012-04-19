var Style = (function() {

  var color_code_table = {
    aliceblue: [240, 248, 255, null], 
    antiquewhite: [250, 235, 215, null], 
    aqua: [0, 255, 255, null], 
    aquamarine: [127, 255, 212, null], 
    azure: [240, 255, 255, null], 
    beige: [245, 245, 220, null], 
    bisque: [255, 228, 196, null], 
    black: [0, 0, 0, null], 
    blanchedalmond: [255, 235, 205, null], 
    blue: [0, 0, 255, null], 
    blueviolet: [138, 43, 226, null], 
    brown: [165, 42, 42, null], 
    burlywood: [222, 184, 135, null], 
    cadetblue: [95, 158, 160, null], 
    chartreuse: [127, 255, 0, null], 
    chocolate: [210, 105, 30, null], 
    coral: [255, 127, 80, null], 
    cornflowerblue: [100, 149, 237, null], 
    cornsilk: [255, 248, 220, null], 
    crimson: [220, 20, 60, null], 
    cyan: [0, 255, 255, null], 
    darkblue: [0, 0, 139, null], 
    darkcyan: [0, 139, 139, null], 
    darkgoldenrod: [184, 134, 11, null], 
    darkgray: [169, 169, 169, null], 
    darkgreen: [0, 100, 0, null], 
    darkgrey: [169, 169, 169, null], 
    darkkhaki: [189, 183, 107, null], 
    darkmagenta: [139, 0, 139, null], 
    darkolivegreen: [85, 107, 47, null], 
    darkorange: [255, 140, 0, null], 
    darkorchid: [153, 50, 204, null], 
    darkred: [139, 0, 0, null], 
    darksalmon: [233, 150, 122, null], 
    darkseagreen: [143, 188, 143, null], 
    darkslateblue: [72, 61, 139, null], 
    darkslategray: [47, 79, 79, null], 
    darkslategrey: [47, 79, 79, null], 
    darkturquoise: [0, 206, 209, null], 
    darkviolet: [148, 0, 211, null], 
    deeppink: [255, 20, 147, null], 
    deepskyblue: [0, 191, 255, null], 
    dimgray: [105, 105, 105, null], 
    dimgrey: [105, 105, 105, null], 
    dodgerblue: [30, 144, 255, null], 
    firebrick: [178, 34, 34, null], 
    floralwhite: [255, 250, 240, null], 
    forestgreen: [34, 139, 34, null], 
    fuchsia: [255, 0, 255, null], 
    gainsboro: [220, 220, 220, null], 
    ghostwhite: [248, 248, 255, null], 
    gold: [255, 215, 0, null], 
    goldenrod: [218, 165, 32, null], 
    gray: [128, 128, 128, null], 
    green: [0, 128, 0, null], 
    greenyellow: [173, 255, 47, null], 
    grey: [128, 128, 128, null], 
    honeydew: [240, 255, 240, null], 
    hotpink: [255, 105, 180, null], 
    indianred: [205, 92, 92, null], 
    indigo: [75, 0, 130, null], 
    ivory: [255, 255, 240, null], 
    khaki: [240, 230, 140, null], 
    lavender: [230, 230, 250, null], 
    lavenderblush: [255, 240, 245, null], 
    lawngreen: [124, 252, 0, null], 
    lemonchiffon: [255, 250, 205, null], 
    lightblue: [173, 216, 230, null], 
    lightcoral: [240, 128, 128, null], 
    lightcyan: [224, 255, 255, null], 
    lightgoldenrodyellow: [250, 250, 210, null], 
    lightgray: [211, 211, 211, null], 
    lightgreen: [144, 238, 144, null], 
    lightgrey: [211, 211, 211, null], 
    lightpink: [255, 182, 193, null], 
    lightsalmon: [255, 160, 122, null], 
    lightseagreen: [32, 178, 170, null], 
    lightskyblue: [135, 206, 250, null], 
    lightslategray: [119, 136, 153, null], 
    lightslategrey: [119, 136, 153, null], 
    lightsteelblue: [176, 196, 222, null], 
    lightyellow: [255, 255, 224, null], 
    lime: [0, 255, 0, null], 
    limegreen: [50, 205, 50, null], 
    linen: [250, 240, 230, null], 
    magenta: [255, 0, 255, null], 
    maroon: [128, 0, 0, null], 
    mediumaquamarine: [102, 205, 170, null], 
    mediumblue: [0, 0, 205, null], 
    mediumorchid: [186, 85, 211, null], 
    mediumpurple: [147, 112, 219, null], 
    mediumseagreen: [60, 179, 113, null], 
    mediumslateblue: [123, 104, 238, null], 
    mediumspringgreen: [0, 250, 154, null], 
    mediumturquoise: [72, 209, 204, null], 
    mediumvioletred: [199, 21, 133, null], 
    midnightblue: [25, 25, 112, null], 
    mintcream: [245, 255, 250, null], 
    mistyrose: [255, 228, 225, null], 
    moccasin: [255, 228, 181, null], 
    navajowhite: [255, 222, 173, null], 
    navy: [0, 0, 128, null], 
    oldlace: [253, 245, 230, null], 
    olive: [128, 128, 0, null], 
    olivedrab: [107, 142, 35, null], 
    orange: [255, 165, 0, null], 
    orangered: [255, 69, 0, null], 
    orchid: [218, 112, 214, null], 
    palegoldenrod: [238, 232, 170, null], 
    palegreen: [152, 251, 152, null], 
    paleturquoise: [175, 238, 238, null], 
    palevioletred: [219, 112, 147, null], 
    papayawhip: [255, 239, 213, null], 
    peachpuff: [255, 218, 185, null], 
    peru: [205, 133, 63, null], 
    pink: [255, 192, 203, null], 
    plum: [221, 160, 221, null], 
    powderblue: [176, 224, 230, null], 
    purple: [128, 0, 128, null], 
    red: [255, 0, 0, null], 
    rosybrown: [188, 143, 143, null], 
    royalblue: [65, 105, 225, null], 
    saddlebrown: [139, 69, 19, null], 
    salmon: [250, 128, 114, null], 
    sandybrown: [244, 164, 96, null], 
    seagreen: [46, 139, 87, null], 
    seashell: [255, 245, 238, null], 
    sienna: [160, 82, 45, null], 
    silver: [192, 192, 192, null], 
    skyblue: [135, 206, 235, null], 
    slateblue: [106, 90, 205, null], 
    slategray: [112, 128, 144, null], 
    slategrey: [112, 128, 144, null], 
    snow: [255, 250, 250, null], 
    springgreen: [0, 255, 127, null], 
    steelblue: [70, 130, 180, null], 
    tan: [210, 180, 140, null], 
    teal: [0, 128, 128, null], 
    thistle: [216, 191, 216, null], 
    tomato: [255, 99, 71, null], 
    turquoise: [64, 224, 208, null], 
    violet: [238, 130, 238, null], 
    wheat: [245, 222, 179, null], 
    white: [255, 255, 255, null], 
    whitesmoke: [245, 245, 245, null], 
    yellow: [255, 255, 0, null], 
    yellowgreen: [154, 205, 50, null]
  };

  var _Style = _class("Util.Style", {

    class_methods: {
      convertStyleString: function() {
      },

      convertFillString: function() {
      },

      convertStrokeString: function(str) {
        var rt = null;

        str = str.replace(/^\s+|\s+$/g, '');

        if (str === '' || str === 'none')
          return rt;

        var tokens = str.split(/\s+/);
        if (tokens.length == 0 || tokens.length > 3)
          throw new ValueError("Invalid number of tokens: " + str);

        return { color: this.convertColorString(tokens[0]),
                 size: tokens.length >= 2 ? xparseInt(tokens[1]): null,
                 dash: tokens.length >= 3 ? this.checkDashString(tokens[2]): null };
      },

      convertColorString:  function(str) {
        if ((code = color_code_table[str]))
          return code;

        var g = /^\s*#(?:([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])|([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?)\s*$/.exec(str);
        if (!g)
          throw new ValueError("Invalid color specifier: " + str);

        var rt = [0, 0, 0, null];
        if (g[1] !== void(0)) {
          for (var i = 1; i <= 3; i++) {
            var v = xparseInt(g[i], 16);
            rt[i - 1] = v | (v << 4);
          }
        } else {
          for (var i = 4; i <= 7 && g[i]; i++)
            rt[i - 4] = xparseInt(g[i], 16);
        }

        return rt;
      },

      checkDashString: function(str) {
        var mtc = str.match(/^[._-]+$/);
        if (mtc === null)
          throw new ValueError(
              "Dash string must be constructed by '.' or '-' or '_'. but you gave " + str + ".");
        return str;
      }
    }
  });

  return _Style;

})();
