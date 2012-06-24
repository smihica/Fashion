var _lib = {};

include("browser.js");
_lib.detectBrowser = detectBrowser;
var BROWSER = detectBrowser(typeof window == 'undefined' ? void(0): window);

include("assert.js");
_lib.__assert__            = __assert__;

include("misc.js");
_lib._atomic_p             = _atomic_p;
_lib._clone                = _clone;
_lib.xparseInt             = xparseInt;
_lib._repeat               = _repeat;
_lib._lpad                 = _lpad;
_lib._clip                 = _clip;
_lib.clipPoint             = _clipPoint;
_lib.addPoint              = _addPoint;
_lib.subtractPoint         = _subtractPoint;
_lib.escapeXMLSpecialChars = _escapeXMLSpecialChars;
_lib._bindEvent            = _bindEvent;
_lib._unbindEvent          = _unbindEvent;

include("error.js");
_lib.FashionError          = FashionError;
_lib.createExceptionClass  = createExceptionClass;
_lib.NotImplemented        = NotImplemented;
_lib.ValueError            = ValueError;
_lib.PropertyError         = PropertyError;
_lib.NotSupported          = NotSupported;
_lib.ArgumentError         = ArgumentError;
_lib.NotAttached           = NotAttached;
_lib.NotFound              = NotFound;
_lib.AlreadyExists         = AlreadyExists;

include("classify.js");
_lib._class = _class;
