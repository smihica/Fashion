var _class = (function() {
  function __super__() {
    return this.constructor.__super__.prototype;
  }

  function inherits(_class, parent) {
    _class.__super__ = parent;

    var f = function() {};
    f.prototype = parent.prototype;
    f.prototype.constructor = parent;
    _class.prototype = new f();
    _class.prototype.__super__ = __super__;

    var iiop = _class['%%INIT_INSTANCE_ORIGN_PROPS'];

    _class['%%INIT_INSTANCE_ORIGN_PROPS'] = function(inst) {
      var parent_iiop = parent['%%INIT_INSTANCE_ORIGN_PROPS'];
      if (parent_iiop) parent_iiop(inst);
      iiop(inst);
    };

    return _class;

  };

  function method(_class, name, func) {
    func.__class__ = _class;
    _class.prototype[name] = func;
  };

  var genclassid = (function() {
    var id = 0;
    return function getclassid() {
      var ret = "%%ANONYMOUS_CLASS_"+id+"%%"; ++id;
      return ret;
    };
  })();

  function mixin(_class, include) {
    var incproto = include.prototype;
    for (var i in incproto) {
      if (i == 'init') {
        _class.prototype['init%%' + include['%%CLASSNAME%%']] = incproto[i];
      } else if (i !== "__super__" && i !== "constructor") {
        _class.prototype[i] = incproto[i];
      }
    }

    var iiop = _class['%%INIT_INSTANCE_ORIGN_PROPS'];
    _class['%%INIT_INSTANCE_ORIGN_PROPS'] = function(inst) {
      var include_iiop = include['%%INIT_INSTANCE_ORIGN_PROPS'];
      if (include_iiop) include_iiop(inst);
      iiop(inst);
    };
  };

  function check_interface(_class, impl) {
    for (var i in impl.prototype) {
      if (impl.prototype.hasOwnProperty(i)) {
        if (!_class.prototype.hasOwnProperty(i)) {
          throw new DeclarationError(
              'The class \'' + _class['%%CLASSNAME%%'] +
              '\' must provide property or method \'' + i +
              '\' imposed by \'' + impl['%%CLASSNAME%%'] +'".');
        }
      }
    }
  };

  return function _class(name, definition) {
    var __class__, i, j, l, c, def, type;

    var props = {};
    var class_props = {};
    var methods = {};
    var class_methods = {};
    var parent = Object;
    var mixins = [];
    var interfaces = [];

    for (i in definition) {
      switch (i) {
      case "props":
        def = definition[i];
        for (j in def) {
          if (def.hasOwnProperty(j))
            props[j] = def[j];
        }
        break;
      case "class_props":
        class_props = definition[i];
        break;
      case "methods":
        methods = definition[i];
        break;
      case "class_methods":
        class_methods = definition[i];
        break;
      case "parent":
        parent = definition[i];
        break;
      case "interfaces":
        interfaces = definition[i];
        break;
      case "mixins":
        mixins = definition[i];
        break;
      default:
        throw new ArgumentError(
            'You gave \'' + i + '\' as definition, but the _class() excepts' +
            ' only \'props\',\'class_props\',\'methods\',\'class_methods\',\'parent\',\'interfaces\',\'mixins\'.');

      }
    }

    __class__ = function(arg) {
      __class__['%%INIT_INSTANCE_ORIGN_PROPS'](this);
      if (this.init)
        this.init.apply(this, arguments);
      else
        _clone(arg, this); 
    };

    __class__['%%INIT_INSTANCE_ORIGN_PROPS'] =
      function(inst) {
        for (var p in props) {
          if (props.hasOwnProperty(p)) {
            inst[p] = _clone(props[p]);
          }
        }
      };

    inherits(__class__, parent);

    for (j = 0, l = mixins.length; j < l; j++) {
      mixin(__class__, mixins[j]);
    }

    for (i in methods) {
      if (methods.hasOwnProperty(i)) {
        method(__class__, i, methods[i]);
      }
    }
    __class__.prototype.constructor = __class__;

    __class__['%%CLASSNAME%%'] = name || genclassid();
    for (i in class_methods) {
      __class__[i] = class_methods[i];
    }

    for (j=0, l=interfaces.length; j<l; j++) {
      check_interface(__class__, interfaces[j]);
    }

    for (i in class_props) {
      __class__[i] = class_props[i];
    }

    class_methods['init'] && class_methods.init.call(__class__);

    return __class__;
  };

})();
/*
 * vim: sts=2 sw=2 ts=2 et
 */
