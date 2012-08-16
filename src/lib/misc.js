// detect atomic or not
function _atomic_p(obj) {
  var t;
  return ( obj === null || obj === void(0) ||
           (t = typeof obj) === 'number' ||
           t === 'string' ||
           t === 'boolean' ||
           ((obj.valueOf !== Object.prototype.valueOf) &&
            !(obj instanceof Date)));
};


// make deep clone of the object
function _clone(obj, target) {
  if (_atomic_p(obj)) return obj;

  // if target is given. clone obj properties into it.
  var clone, p;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
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
      target : new obj.constructor();
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

function _bindEvent(target, type, f) {
  if (typeof BROWSER == 'undefined')
    return;

  if (BROWSER.identifier == 'ie' && BROWSER.version < 9)
    target.attachEvent('on' + type, f);
  else
    target.addEventListener(type, f, false);
}

function _unbindEvent(target, type, f) {
  if (typeof BROWSER == 'undefined')
    return;

  if (BROWSER.identifier == 'ie' && BROWSER.version < 9)
    target.detachEvent('on' + type, f);
  else
    target.removeEventListener(type, f, false);
}

var _escapeXMLSpecialChars = (function () {
  var specials = new RegExp("[<>&'\"]"),
      map = ['', '&lt;', '&gt;', '&amp;', '&apos;', '&quot;', ''];
  return function (str) {
    if (typeof str != 'string')
      str = str.toString();
    return str.replace(specials, function(x) { return map[special.source.indexOf(x)] });
  };
})();

function _clip(target, min, max) {
  return Math.min(Math.max(target, min), max);
}

function _clipPoint(target, min, max) {
  return { x: _clip(target.x, min.x, max.x),
           y: _clip(target.y, min.y, max.y) };
}

function _addPoint(lhs, rhs) {
  return { x: lhs.x + rhs.x, y: lhs.y + rhs.y };
}

function _subtractPoint(lhs, rhs) {
  return { x: lhs.x - rhs.x, y: lhs.y - rhs.y };
}

function _indexOf(array, elem, fromIndex) {
  if (array instanceof Array && 'indexOf' in Array.prototype) {
    return array.indexOf(elem, fromIndex);
  }
  for (var i = Math.max(fromIndex || 0, 0); i < array.length; i++) {
    if (array[i] === elem)
      return i;
  }
  return -1;
}
