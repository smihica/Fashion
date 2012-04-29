// detect atomic or not
var _atomic_p = function(obj) {
  var t = typeof obj;
  return (obj === null || obj === void(0) ||
           t === 'boolean' || t === 'number' || t === 'string' ||
           obj.valueOf !== Object.prototype.valueOf);
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

function xparseInt(str, radix) {
  var retval = parseInt(str, radix);
  if (isNaN(retval))
    throw new ValueError("Invalid numeric string: " + str);
  return retval;
}

function _repeat(str, length) {
  var retval = '';
  while (length) {
    if (length & 1)
      retval += str;
    str += str;
    length >>= 1;
  }
  return retval;
}

function _lpad(str, length, pad) {
  return _repeat(pad, length - str.length) + str;
}
