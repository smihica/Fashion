// detect atomic or not
function _atomic_p(obj) {
  var t = typeof obj;
  return ( !(obj instanceof Date) &&
           ( obj === null || obj === void(0) ||
             t === 'boolean' || t === 'number' || t === 'string' ||
             obj.valueOf !== Object.prototype.valueOf));
};

// make deep clone of the object
function _clone(obj, target) {
  if (_atomic_p(obj)) return obj;

  // if target is given. clone obj properties into it.
  var clone, p;
  if (obj instanceof Date) {
    clone = new Date((typeof obj.getTime === 'function') ? obj.getTime() : obj);
    if (target instanceof Date) {
      for (p in target) if (target.hasOwnProperty(p)) clone[p] = _clone(target[p], clone[p]);
    }
  } else if (typeof obj === 'function') {
    clone = function(){return obj.apply(this, arguments);};
    if (typeof target === 'function') {
      for (p in target) if (target.hasOwnProperty(p)) clone[p] = _clone(target[p], clone[p]);
    }
  } else {
    clone = (!_atomic_p(target) && typeof target !== 'function') ?
      target :
      new obj.constructor()
  }

  for (p in obj)
    if (obj.hasOwnProperty(p))
      clone[p] = _clone(obj[p], clone[p]);

  return clone;
};

function xparseInt(str, radix) {
  var retval = parseInt(str, radix);
  if (isNaN(retval))
    throw new ValueError("Invalid numeric string: " + str);
  return retval;
};

function _repeat(str, length) {
  var retval = '';
  while (length) {
    if (length & 1)
      retval += str;
    str += str;
    length >>= 1;
  }
  return retval;
};

function _lpad(str, length, pad) {
  return _repeat(pad, length - str.length) + str;
};
