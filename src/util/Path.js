var Path = (function() {

  var identifierArglen = {
    Z:0, H:1, V:1, M:2, L:2, T:2, R:2, S:4, Q:4, C:6, A:7
  };

  var _Path = _class("Util.Path", {

    class_methods: {

      convertPathString: function(points) {

        var x, atom, arglen, arglen_now, set, last_idt, rt = [], arr = points.split(SEPARATOR);

        atom = arr[0];

        if (!( atom.length === 1 && (x = atom.charCodeAt(0)) && 64 < x && x < 91 ))
          throw new ValueError(
              'First item must be an identifier M,L,H,V,C,Z,T,R,S,Q,A.');

        set = [atom];
        last_idt = atom;
        arglen = identifierArglen[atom];
        if (arglen === void(0)) {
          throw new NotFound(
              'Expected identifiers are M,L,H,V,C,Z,T,R,S,Q,A. but you gave "' + atom + '".');
        }
        
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
              if (arglen === void(0)) {
                throw new NotFound(
                    'Expected identifiers are M,L,H,V,C,Z,T,R,S,Q,A. but you gave "' + atom + '".');
              }
            } else {
              throw new ValueError(
                  'The arguments length of the identifier \''+ last_idt +'\' is not accurate. ' +
                  'Expected ' + arglen + ' or multiple of it,  but you gave ' + arglen_now + ' unnecessary arguments.');
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
            throw new ValueError(
                'Point string is not allowed except for identifier-string M,L,H,V,C,Z,T,R,S,Q,A or a Number.');
          }

          arglen_now = set.length - 1;
        }

        if (arglen !== arglen_now) {
          throw new ValueError(
              'The arguments length of the identifier \''+ last_idt +'\' is not accurate. ' +
              'Expected ' + arglen + ' or multiple of it,  but you gave ' + arglen_now + ' unnecessary arguments.');
        }

        rt.push(set);

        return rt;
      }
    }
  });

  return _Path;
})();
