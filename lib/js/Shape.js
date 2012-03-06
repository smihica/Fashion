/*
 * Shape interface class.
 */
var Shape = _class("Shape", {
  methods: {
    position:         function(d) {},
    size:             function(d) {},
    displayPosition:  function()  {},
    displaySize:      function()  {},
    hitTest:          function(d) {},
    transform:        function(d) {},
    reset:            function()  {},
    style:            function(d) {}
  }
});