var _parseCSSRules = (function () {
  var regexp_for_rules = /\s*(-?(?:[_a-z\u00a0-\u10ffff]|\\[^\n\r\f])(?:[\-_a-z\u00a0-\u10ffff]|\\[^\n\r\f])*)\s*:\s*((?:(?:(?:[^;\\\n\r\f\t "']|\\[^\n\r\f\t ])+|"(?:[^\n\r\f\\"]|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*"|'(?:[^\n\r\f\\']|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*')(?:\s+|(?=;|$)))+)(?:;|$)/g;

  var regexp_for_values = /(?:((?:[^;\\\n\r\f\t "']|\\[^\n\r\f\t ])+)|"((?:[^\n\r\f\\"]|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*)"|'((?:[^\n\r\f\\']|\\(?:\n|\r\n|\r|\f)|\\[^\n\r\f])*)')(?:\s+|$)/g;

  function unescape(escaped) {
    return escaped.replace(/\\(0{0,2}d[89ab][0-9a-f]{2})\\(0{0,2}d[c-f][0-9a-f]{2})|\\([0-9a-f]{1,6})|\\([^\n\r\f0-9a-f])/g, function(_, a, b, c, d) {
      if (a !== void(0)) {
        return String.fromCharCode((((parseInt(a, 16) & 0x3fff) << 12) | (parseInt(b, 16) & 0x3fff)) + 0x10000);
      } else if (c !== void(0)) {
        return String.fromCharCode(parseInt(c, 16));
      } else if (d !== void(0)) {
        return d;
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
