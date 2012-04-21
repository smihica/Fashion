var drawable = null;

var test_init = function() {
  var c = document.getElementById('STAGE');
  drawable = new Fashion.Drawable(c, 1000, 1000);

};

var test = function() {

  var p1 = drawable.draw(
    new Fashion.Path(
      Fashion.Util.Path.convertPathString('M 0 50 L 0 0 50 0')));

  var p2 = drawable.draw(
    new Fashion.Path(
      Fashion.Util.Path.convertPathString('M 0 50 L 0 0 50 0')));

  var p3 = drawable.draw(
    new Fashion.Path(
      Fashion.Util.Path.convertPathString('M 0 50 L 0 0 50 0')));

  p2.transform({translate: {x: 50, y: 90}}, {rotate: {angle: -45}});
  p3.transform({translate: {x: 50, y: 90}}, {rotate: {angle: -45}}, {translate: {x: 130, y: 160}});

  p2.style({
    fill: {
      none: true
    },
    stroke: {
      width: 10,
      color: Fashion.Util.Style.convertColorString('#FF0000FF')
    }
  });

  p3.style({
    fill: { none: true },
    stroke: {
      width: 4,
      color: new Fashion.Color(0, 255, 0, 255)
    }
  });


  drawable.erase(p1);

  var stylize = function(n) {
    n.style({
      fill: {
        color: new Fashion.Color(
          (Math.random() * 255).toFixed(0),
          (Math.random() * 255).toFixed(0),
          (Math.random() * 255).toFixed(0),
          (Math.random() * 255).toFixed(0)),
        rule: ''
      },
      stroke: {
        color: new Fashion.Color(
          (Math.random()*255).toFixed(0),
          (Math.random()*255).toFixed(0),
          (Math.random()*255).toFixed(0),
          (Math.random()*255).toFixed(0)),
        width: 2
      }
    });
  };


  for(var i=0,l=100; i<l; i++) {

    var f = drawable.draw(
      new Fashion.Text(
        Math.random()*1000, Math.random()*1000, Math.random()*100, 'Shin Aoyama'));
    stylize(f);

    var p = drawable.draw(
      new Fashion.Path(
        Fashion.Util.Path.convertPathString(
          'M 0 -10 L 5.88 8.09 -9.51 -3.09 9.51 -3.09 -5.88 8.09 Z')));
    p.position({x: Math.random()*1000, y: Math.random()*1000});
    p.size({width: Math.random()*300, height: Math.random()*300});
    stylize(p);

    var c = drawable.draw(
      new Fashion.Circle(Math.random()*1000, Math.random()*1000, 30, 30));
    stylize(c);


    var r = drawable.draw(
      new Fashion.Rect(Math.random()*1000, Math.random()*1000, 50, 50));
    stylize(r);

  }


};
