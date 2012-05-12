var Stroke = (function() {
  var predefined_patterns = {
    'solid':  [],
    'dotted': [1, 1],
    'dashed': [2, 2],
    'double': []
  };

  return _class("Stroke", {
    props: {
      color: null,
      width: null,
      pattern: null
    },
 
    class_methods: {
      parseDashString: function Stroke_parseDashString(str) {
        var retval;
        if ((retval = predefined_patterns[str]))
          return retval;

        retval = [];
        var last = '-';
        var segment_length = 0;
        for (var i in str) {
          var c = str[i];
          if (c != '-' && c != '_')
            throw new ValueError("Invalid character: '" + c + "' occurred in " + str);
          if (last != str[i]) {
            retval.push(segment_length);
            segment_length = 0;
            last = c;
          }
          segment_length++;
        }
        retval.push(segment_length);
        return retval;
      }
    },

    methods: {
      init: function Stroke_init() {
        switch (arguments.length) {
        case 0:
          break;
        case 1:
          if (typeof arguments[0] == 'string' || arguments[0] instanceof String) {
            this.initWithString.apply(this, arguments);
            break;
          }
          /* fall throigh */
        case 2:
        case 3:
          this.initWithArguments.apply(this, arguments);
          break;
        default:
          throw new ArgumentError("constructor expects 0, 1, 2 or 3 arguments, got " + arguments.length);
        }
      },
  
      initWithArguments: function Stroke_initWithArguments(color, width, pattern) {
        this.color = color;
        this.width = width === void(0) ? null: width;
        this.pattern = pattern === void(0) ? null: pattern;
      },
  
      initWithString: function Stroke_initWithString(str) {
        var rt = null;
  
        var tokens = str.split(/\s+/);
        if (tokens[0] == '')
          tokens.shift();
        if (tokens[tokens.length - 1] == '')
          tokens.pop();
        if (tokens.length == 0 || tokens.length > 3)
          throw new ValueError("Invalid number of tokens: " + str);
  
        this.initWithArguments(
          new Color(tokens[0]),
          tokens.length >= 2 ? xparseInt(tokens[1]): null,
          tokens.length >= 3 ? this.constructor.parseDashString(tokens[2]): null
        );
      }
    }
  });
})();

/*
 * vim: sts=2 sw=2 ts=2 et
 */
