var Canvas = null;

/** /
var JS_CANVAS = {
  version: "0.0.0",
  namespace: "http://www.w3.org/2000/svg",
  name: "JS_CANVAS"
};

(function(prefix) {
  var Set = function(that) {
    this.items = {};
    if (that !== void(0))
      this.update(that);
  };

  Set.prototype.add = function(item) {
    var oldItem = this.items[item.id];
    this.items[item.id] = item;
    return oldItem;
  };

  Set.prototype.update = function(set) {
    for (var id in set.items) {
      if (set.items.hasOwnProperty(id))
        this.items[id] = set.items[id];
    }
  };

  Set.prototype.remove = function(item) {
    delete this.items[item.id];
  };

  Set.prototype.contains = function(item) {
    return this.items[item.id] !== void(0);
  };

  Set.prototype.each = function(f) {
    for (var id in this.items) {
      if (this.items.hasOwnProperty(id))
        f(this.items[id]);
    }
  };

  var Tile = function(canvas, id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.objects = [];
    this.canvas = canvas;
    this.needsUpdate = true;
    this.n = null;
  };

  Tile.prototype.refresh = function() {
    if (!this.needsUpdate)
      return;
    var n = this.n;
    if (n === null)
      this.n = n = document.createElement('canvas');
    n.style.position = 'absolute';
    n.style.left = this.x + 'px';
    n.style.top = this.y + 'px';
    n.style.width = (n.width = this.canvas.tileWidth) + 'px';
    n.style.height = (n.height = this.canvas.tileHeight) + 'px';
    for (var i = this.objects.length; --i >= 0;) {
      var object = this.objects[i];
      var ctx = n.getContext('2d');
      ctx.strokeStyle = "rgb(0, 0, 0)";
      switch (object.type) {
      case 'oval':
        ctx.beginPath();
        ctx.arc(object.x - this.x, object.y - this.y, object.width / 2, 0, Math.PI * 2, 0);
        ctx.stroke();
        break;
      }
    }
    if (!this.n.parentNode)
      this.canvas.vg.appendChild(n);
    this.needsUpdate = false;
  };

  Tile.prototype.discard = function() {
    this.n.parentNode.removeChild(this.n);
    this.n = null;
    this.needsUpdate = true;
  };

  Tile.prototype.addObject= function(object) {
    this.objects.push(object);
    this.needsUpdate = true;
  };

  var Canvas = function(n) {
    this.n = n;
    var vg = document.createElement("div");
    vg.style.width = '4000px';
    vg.style.height = '4000px';
    vg.style.backgroundColor = '#fff';
    vg.style.position = 'relative';
    vg.style.overflow = 'hidden';
    this.n.appendChild(vg);
    this.vg = vg;
    this.objects = [];
    this.tileWidth = 400;
    this.tileHeight = 400;
    this.tiles = {};
    this.nextId = 1;
    this.visibleTiles = new Set();
    var self = this;
    this.n.addEventListener('scroll', function(e) {
      self.refresh();
    }, false);
  };

  Canvas.prototype.buildTileKey = function Canvas_buildTileKey(x, y) {
    return x + ":" + y;
  };

  Canvas.prototype.getTile = function Canvas_getTile(x, y) {
    var tileX = (x / this.tileWidth | 0) * this.tileWidth,
        tileY = (y / this.tileHeight | 0) * this.tileHeight;
    var key = this.buildTileKey(tileX, tileY);
    var tile = this.tiles[key];
    if (tile === void(0))
      tile = this.tiles[key] = new Tile(this, key, tileX, tileY);
    return tile;
  };

  Canvas.prototype.getViewportLeftTop = function() {
    var vp = this.n;
    return { x: parseInt(vp.scrollLeft), y: parseInt(vp.scrollTop) };
  };

  Canvas.prototype.getViewportSize = function() {
    var vp = this.n;
    return { x: parseInt(vp.style.width), y: parseInt(vp.style.height) };
  };

  Canvas.prototype.refresh = function() {
    var vpSize = this.getViewportSize(); 
    var vpLT = this.getViewportLeftTop();
    var visibleTiles = new Set(), hiddenTiles = new Set(this.visibleTiles);
    var ly = ((vpLT.y + vpSize.y + this.tileHeight) / this.tileHeight| 0) * this.tileHeight;
    var lx = ((vpLT.x + vpSize.x + this.tileWidth) / this.tileWidth | 0) * this.tileWidth;
    for (var y = vpLT.y; y < ly; y += this.tileHeight) {
      for (var x = vpLT.x; x < lx; x += this.tileWidth) {
        var tile = this.getTile(x, y);
        tile.refresh();
        visibleTiles.add(tile);
        hiddenTiles.remove(tile);
      }
    }
    hiddenTiles.each(function(tile) { tile.discard(); });
    this.visibleTiles = visibleTiles;
  };

  Canvas.prototype.drawOval = function Canvas_drawOval(x, y, width, height) {
    var object = { id: this.nextId++, type: 'oval', x: x, y: y, width: width, height: height };
    this.objects.push(object);
    var tiles = new Set();
    tiles.add(this.getTile(x - width / 2, y - height / 2));
    tiles.add(this.getTile(x + width / 2, y - height / 2));
    tiles.add(this.getTile(x - width / 2, y + height / 2));
    tiles.add(this.getTile(x + width / 2, y + height / 2));
    tiles.each(function(tile) { tile.addObject(object); });
  };

  this.JS_CANVAS.Canvas = Canvas;
})('v');

/**/
