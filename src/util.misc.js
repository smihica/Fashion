// detect atomic or not
var _atomic_p = function(obj) {
  var t = typeof obj;
  return ( obj === null || obj === undefined ||
           t === 'boolean' || t === 'number' || t === 'string' );
};

// make deep clone of the object
var _clone = function(obj) {
  if (_atomic_p(obj)) {
    return obj;
  } else {
    var clone = new obj.constructor();

    for (var p in obj)
      if (obj.hasOwnProperty(p))
        clone[p] = _clone(obj[p]);

    return clone;
  }
};
