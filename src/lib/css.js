var _parseCSSRules = (function () {
  var regexp_for_rules = /\s*(-?(?:[_a-z\u00a0-\u10ffff]|\\[^\n\r\f#])(?:[\-_A-Za-z\u00a0-\u10ffff]|\\[^\n\r\f])*)\s*:\s*((?:(?:(?:[^;\\ \n\r\t\f"']|\\[0-9A-Fa-f]{1,6}(?:\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9A-Fa-f])+|"(?:[^\n\r\f\\"]|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*"|'(?:[^\n\r\f\\']|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*')(?:\s+|(?=;|$)))+)(?:;|$)/g;

  var regexp_for_values = /(?:((?:[^;\\ \n\r\t\f"']|\\[0-9A-Fa-f]{1,6}(?:\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9A-Fa-f])+)|"((?:[^\n\r\f\\"]|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*)"|'((?:[^\n\r\f\\']|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*)')(?:\s+|$)/g;

  function unescape(escaped) {
    return escaped.replace(/(?:\\(0{0,2}d[89ab][0-9A-Fa-f]{2})(?:\r\n|[ \n\r\t\f])?)?\\([0-9A-Fa-f]{1,6})(?:\r\n|[ \n\r\t\f])?|\\([^\n\r\f0-9A-Fa-f])/g, function(_, a, b, c) {
      if (a !== void(0)) {
        var c2 = parseInt(b, 16) ;
        if (c2 < 0xdc00 || c2 > 0xdfff)
          throw new ValueError("Invalid surrogate pair");
        return String.fromCharCode((((parseInt(a, 16) & 0x3ff) << 10) | (c2 & 0x3ff)) + 0x10000);
      } else if (b !== void(0)) {
        return String.fromCharCode(parseInt(b, 16));
      } else if (c !== void(0)) {
        return c;
      }
    });
  }

  return function _parseCSSRules(str) {
    var retval = {};
    var r = str.replace(regexp_for_rules, function (_, k, v) {
      var values = [];
      var r = v.replace(regexp_for_values, function (_, a, b, c) {
        if (a !== void(0)) {
          values.push(unescape(a));
        } else if (b !== void(0)) {
          values.push(unescape(b));
        } else if (c !== void(0)) {
          values.push(unescape(c));
        }
        return '';
      });
      if (r != '')
        throw new ValueError("Invalid CSS rule string: " + str);
      retval[k] = values;
      return '';
    });
    if (r != '')
      throw new ValueError("Invalid CSS rule string: " + str);
    return retval;
  };
})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
