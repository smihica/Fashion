var Path = (function() {

  var identifierArglen = {
    Z:0, H:1, V:1, M:2, L:2, T:2, R:2, S:4, Q:4, C:6, A:7
  };

  var first_item_was_not_an_identifier = function() {
    return _error(null,
                  'Invalid pointString format Error',
                  'First item must be an identifier M,L,H,V,C,Z,T,R,S,Q,A.',
                  true);
  };

  var notfound_such_identifier = function(atom) {
    return _error(null,
                  'Invalid pointString identifier Error',
                  'Expected identifiers are M,L,H,V,C,Z,T,R,S,Q,A. but you gave "' + atom + '".',
                  true);
  };

  var argument_length_is_not_accurate = function(last_idt, arglen, arglen_now) {
    return _error(null,
                  'Invalid pointString format Error',
                  'The arguments length of the identifier \''+ last_idt +'\' is not accurate. ' +
                  'Expected ' + arglen + ' or multiple of it,  but you gave ' + arglen_now + ' unnecessary arguments.',
                  true);
  };

  var invalid_character_in_point_string = function() {
    return _error(null,
                  'Invalid pointString format Error',
                  'Point string is not allowed except for identifier-string M,L,H,V,C,Z,T,R,S,Q,A or a Number.',
                  true);
  };

  var _Path = _class("Util.Path", {

    class_methods: {

      convertPathString: function(points) {

        var x, atom, arglen, arglen_now, set, last_idt, rt = [], arr = points.split(SEPARATOR);

        atom = arr[0];

        if (!( atom.length === 1 && (x = atom.charCodeAt(0)) && 64 < x && x < 91 ))
          throw first_item_was_not_an_identifier();

        set = [atom];
        last_idt = atom;
        arglen = identifierArglen[atom];
        if ( arglen === void(0) ) throw notfound_such_identifier(atom);
        arglen_now = 0;

        for (var i=1, l=arr.length; i<l; i++) {

          if ((atom = arr[i]) === '') continue;

          x = atom.charCodeAt(0);

          if ( atom.length === 1 && 64 < x && x < 91 ) {

            if (arglen === arglen_now) {
              rt.push(set);
              set = [atom];
              last_idt = atom;
              arglen = identifierArglen[atom];
              if ( arglen === void(0) ) throw notfound_such_identifier(atom);

            } else {
              throw argument_length_is_not_accurate(last_idt, arglen, arglen_now);
            }

          } else if ((47 < x && x < 58) || x === 43 || x === 45 || x === 46) {
            n =  +(parseFloat(atom).toFixed(FLOAT_ACCURACY));
            if (arglen === arglen_now) {
              rt.push(set);
              set = [last_idt, n];

            } else {
              set.push(n);

            }
          } else {
            throw invalid_character_in_point_string();

          }

          arglen_now = set.length - 1;

        }

        if (arglen !== arglen_now)
          throw argument_length_is_not_accurate(last_idt, arglen, arglen_now);

        rt.push(set);

        return rt;
      }
    }
  });

  return _Path;
})();
