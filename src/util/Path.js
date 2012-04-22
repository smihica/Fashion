var Path = (function() {

  var identifierArglen = {
    Z:0, H:1, V:1, M:2, L:2, T:2, R:2, S:4, Q:4, C:6, A:7
  };

  var _Path = _class("Util.Path", {
    class_methods: {
      convertPathString: function(points) {
        return new PathData(points);
      }
    }
  });

  return _Path;
})();
