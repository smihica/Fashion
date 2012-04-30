var _lib = {};

include("browser.js");
_lib.detectBrowser = detectBrowser;
var BROWSER = detectBrowser(typeof window == 'undefined' ? void(0): window);

include("misc.js");
_lib._atomic_p             = _atomic_p;
_lib._clone                = _clone;
_lib.xparseInt             = xparseInt;
_lib._repeat               = _repeat;
_lib._lpad                 = _lpad;

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

include("MultipleKeyHash.js");
_lib.MultipleKeyHash = MultipleKeyHash;