var Style = (function() {

  var _Style = _class("Util.Style", {

    class_methods: {
      convertStyleString: function() {
      },

      convertFillString: function() {
      },

      convertStrokeString: function(str) {
        return new Stroke(str);
      },

      convertColorString:  function(str) {
        return new Color(str);
      }
    }
  });

  return _Style;

})();
