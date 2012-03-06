var _class = (function() {

  var CLASS_RELATIONSHIP = [[Object, null]];

  var get_parent = function(_class) {
    for (var i=0,l=CLASS_RELATIONSHIP.length;i<l;i++) {
      var rel = CLASS_RELATIONSHIP[i];
      if (rel[0] === _class) return rel[1];
    }
    return null;
  };

  var __super__ = function() {
    var pro = this.__proto__;
    return ((pro !== undefined) ?
            ((this.constructor.prototype === this) ? pro : pro.__proto__ ) :
            get_parent(this.constructor).prototype);
  };

  var inherits = function(_class, parent) {

    CLASS_RELATIONSHIP.push([_class, parent]);

    var f = function(){}
    f.prototype = parent.prototype;
    _class.prototype = new f();
    _class.prototype.constructor = _class;
    _class.prototype.__super__ = __super__;

    return _class;

  };

  var method = function(_class, name, func) {
    _class.prototype[name] = func;
  };

  var genclassid = (function() {
    var id = 0;
    return function() {
      var ret = "%%ANONYMOUS_CLASS_"+id+"%%"; ++id;
      return ret;
    };
  })();

  var mixin = function(_class, include) {
    var incproto = include.prototype;
    for(i in incproto) {
      if (incproto.hasOwnProperty(i)) {
        if (i !== "__super__" && i !== "constructor") {
          _class.prototype[i] = incproto[i];
        }
      }
    }
  };

  var check_interface = function(_class, impl) {
    for (var i in impl.prototype) {
      if (impl.prototype.hasOwnProperty(i)) {
        if (!_class.prototype.hasOwnProperty(i)) {
          _error(null, 'Not implemented interface Error',
                 'The class \'' + _class['%%CLASSNAME%%'] +
                 '\' must provide property or method \'' + i +
                 '\' imposed from \'' + impl['%%CLASSNAME%%'] +'".');
        }
      }
    }
  };

  return function _class(name, definition) {
    var __class__, i, j, l;

    var props = {};
    var class_props = {};
    var methods = {};
    var class_methods = {};
    var parent = Object;
    var mixins = [];
    var interfaces = [];

    for(i in definition) {
      if (definition.hasOwnProperty(i)) {
        if (i === "props") {
          props = definition[i];
        } else if (i === "class_props") {
          class_props = definition[i];
        } else if (i === "methods") {
          methods = definition[i];
        } else if (i === "class_methods") {
          class_methods = definition[i];
        } else if (i === "parent") {
          parent = definition[i];
        } else if (i === "interfaces") {
          interfaces = definition[i];
        } else if (i === "mixins") {
          mixins = definition[i];
        } else {
          _error(null, 'Invalid class definition Error',
                 'You gave \'' + i + '\' as definition, but the _class() excepts' +
                 ' only \'props\',\'class_props\',\'methods\',\'class_methods\',\'parent\',\'interfaces\',\'mixins\'.');
        }
      }
    }

    __class__ = methods["init"] || function(){};
    methods["init"] = __class__;

    inherits(__class__, parent);

    for(j=0, l=mixins.length; j<l; j++) {
      mixin(__class__, mixins[j]);
    }

    for (i in methods) {
      if (methods.hasOwnProperty(i)) {
        method(__class__, i, methods[i]);
      }
    }

    for(i in props) {
      if (props.hasOwnProperty(i)) {
        __class__.prototype[i] = props[i];
      }
    }

    __class__['%%CLASSNAME%%'] = name || genclassid();
    for(i in class_methods) {
      if (class_methods.hasOwnProperty(i)) {
        __class__[i] = class_methods[i];
      }
    }

    for(i in class_props) {
      if (class_props.hasOwnProperty(i)) {
        __class__[i] = class_props[i];
      }
    }

    for (j=0, l=interfaces.length; j<l; j++) {
      check_interface(__class__, interfaces[j]);
    }

    return __class__;

  };

})();