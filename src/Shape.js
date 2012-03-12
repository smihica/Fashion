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
    resetTransform:   function()  {},
    style:            function(d) {},
    resetStyle:       function()  {}
  }
});