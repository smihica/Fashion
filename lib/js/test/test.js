var drawable = null;

var test_init = function() {
  Fashion.init([ 'SVG', 'Canvas', 'VML' ]);
  var c = document.getElementById('STAGE');
  drawable = new Fashion.Drawable(c, 1000, 1000);
};

var test = function() {
  var p1 = drawable.path('M 0 50 L 0 0 50 0');
  var p2 = drawable.path('M 0 50 L 0 0 50 0');
  var p3 = drawable.path('M 0 50 L 0 0 50 0');

  p2.transform({translate: {x: 50, y: 90}}, {rotate: {angle: -45}});
  p3.transform({translate: {x: 50, y: 90}}, {rotate: {angle: -45}}, {translate: {x: 130, y: 160}});
  //p1.transform({translate: {x: 50, y: 30}}, {ratate: {angle: 30}});

  for(var i=0,l=100; i<l; i++) {

/*
    var p = drawable.path('M 0 -10 L 5.88 8.09 -9.51 -3.09 9.51 -3.09 -5.88 8.09 Z');
    p.position({x: Math.random()*1000, y: Math.random()*1000});
    p.size({width: Math.random()*150, height: Math.random()*150});

    var c = drawable.circle(Math.random()*1000, Math.random()*1000, 30, 30);

    c.transform(
      {rotate: {angle: 30}},
      {scale: {x:2, y:5}},
      {rotate: {angle: -30, x:0, y:0}},
      {translate: {x: -10, y: -10}}
    );

    var r = drawable.rect(Math.random()*1000, Math.random()*1000, 50, 50);

    r.transform({scale: {x:2, y:2}});
    r.reset();
*/

  }
};