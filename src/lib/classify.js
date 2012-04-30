var _class = (function() {

  var CLASS_RELATIONSHIP = [[Object, null]];

  function get_parent(_class) {
    for (var i = 0, l = CLASS_RELATIONSHIP.length; i < l; i++) {
      var rel = CLASS_RELATIONSHIP[i];
      if (rel[0] === _class) return rel[1];
    }
    return null;
  };

  function __super__() {
    var pro = this.__proto__;
    return ((pro !== void(0)) ?
            ((this.constructor.prototype === this) ? pro : pro.__proto__ ) :
            get_parent(this.constructor).prototype);
  };

  function inherits(_class, parent) {

    CLASS_RELATIONSHIP.push([_class, parent]);

    var f = function(){}
    f.prototype = parent.prototype;
    _class.prototype = new f();
    _class.prototype.constructor = _class;
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

    __class__ = function() {
      __class__['%%INIT_INSTANCE_ORIGN_PROPS'](this);
      if (this.init)
        this.init.apply(this, arguments);
      else
        _clone(arg, this); 
    };

    l = 0;
    for (p in props) {
      if (props.hasOwnProperty(p)) l++;
    }

    __class__['%%INIT_INSTANCE_ORIGN_PROPS'] = (
      ( l > 0 ) ? function(inst) {
        for (var p in props) {
          if (props.hasOwnProperty(p)) {
            inst[p] = _clone(props[p]);
          }
        }
      } : function(){});

    inherits(__class__, parent);

    for (j = 0, l = mixins.length; j < l; j++) {
      mixin(__class__, mixins[j]);
    }

    for (i in methods) {
      if (methods.hasOwnProperty(i)) {
        method(__class__, i, methods[i]);
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
/*
 * vim: sts=2 sw=2 ts=2 et
 */
