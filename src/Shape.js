/*
 * Shape interface class.
 */
var Shape = _class("Shape", {
  parent: Bindable,
  methods: {
    position:         function(d) {},
    size:             function(d) {},
    displayPosition:  function()  {},
    displaySize:      function()  {},
    hitTest:          function(d) {},
    transform:        function(d) {},
    style:            function(d) {}
  }
});
