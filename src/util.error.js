var FashionError = this.Error = function(message) {
  Error.apply(this, arguments);
  if (typeof Error.captureStackTrace !== 'undefined')
    Error.captureStackTrace(this, this.constructor);
  this.message = message;
};
FashionError.prototype = new Error();

function createExceptionClass(exceptionClassName) {
  var exceptionClass = function() { FashionError.apply(this, arguments); };
  exceptionClass.prototype = new FashionError();
  exceptionClass.prototype.name = exceptionClassName;
  this[exceptionClassName] = exceptionClass;
  return exceptionClass;
}
var NotImplemented = createExceptionClass.call(this, 'NotImplemented');
var ValueError = createExceptionClass.call(this, 'ValueError');
var PropertyError = createExceptionClass.call(this, 'PropertyError');
var NotSupported = createExceptionClass.call(this, 'NotSupported');
var ArgumentError = createExceptionClass.call(this, 'ArgumentError');
var NotSupported = createExceptionClass.call(this, 'NotSupported');
var NotAttached = createExceptionClass.call(this, 'NotAttached');
