var drawable = null;

var test_init = function() {

  console.log(Fashion);

  Fashion.init([ 'SVG', 'Canvas', 'VML' ]);
  var c = document.getElementById('STAGE');
  drawable = new Fashion.Drawable(c, 1000, 1000);
};

var test = function() {
  for(var i=0,l=50; i<l; i++) {
    var c = drawable.circle(Math.random()*1000, Math.random()*1000, 30, 30);

    c.transform(
      {rotate: {angle: 30}},
      {scale: {x:2, y:5}},
      {rotate: {angle: -30, x:0, y:0}},
      {translate: {x: -10, y: -10}}
    );

    var r = drawable.rect(Math.random()*1000, Math.random()*1000, 50, 50);

    r.transform({scale: {x:2, y:2}});

  }
};