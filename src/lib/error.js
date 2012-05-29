var FashionError = function(message) {
  Error.apply(this, arguments);
  if (typeof Error.captureStackTrace !== 'undefined')
    Error.captureStackTrace(this, this.constructor);
  this.message = message;
};
FashionError.prototype = new Error();

var createExceptionClass = function(exceptionClassName) {
  var exceptionClass = function() { FashionError.apply(this, arguments); };
  exceptionClass.prototype = new FashionError();
  exceptionClass.prototype.name = exceptionClassName;
  return exceptionClass;
}
var NotImplemented   = createExceptionClass('NotImplemented');
var ValueError       = createExceptionClass('ValueError');
var PropertyError    = createExceptionClass('PropertyError');
var NotSupported     = createExceptionClass('NotSupported');
var ArgumentError    = createExceptionClass('ArgumentError');
var NotAttached      = createExceptionClass('NotAttached');
var NotFound         = createExceptionClass('NotFound');
var AlreadyExists    = createExceptionClass('AlreadyExists');
var DeclarationError = createExceptionClass('DeclarationError');
var AssertionFailure = createExceptionClass('AssertionFailure');
