/*
 * Shape interface class.
 */
var Shape = _class("Shape", {
  methods: {
    position:         function(d) {},
    size:             function(d) {},
    display_position: function()  {},
    display_size:     function()  {},
    hit_test:         function(d) {},
    gravity_position: function()  {},
    transform:        function(d) {},
    reset:            function()  {},
    style:            function(d) {}
  }
});