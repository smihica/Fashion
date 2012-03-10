var _error = function(type, name, message, throwlessp) {
  var error;
  if (type === 'eval') {
    error = new EvalError()
  } else if (type === 'range') {
    error = new RangeError()
  } else if (type === 'reference') {
    error = new ReferenceError()
  } else if (type === 'syntax') {
    error = new SyntaxError()
  } else if (type === 'type') {
    error = new TypeError()
  } else if (type === 'uri') {
    error = new URIError()
  } else if (type === 'native') {
    error = new NativeError()
  } else {
    error = new Error();
  }
  error.name    = name;
  error.message = message;

  if (throwlessp) {
    return error;
  }

  throw error;
};
