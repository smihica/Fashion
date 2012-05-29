var DEBUG_MODE = true;

var DEFAULT_PRIORITY = ['svg', 'vml', 'canvas'];

var SEPARATOR = /\s|,/;

var DEFAULT_STYLE = {
  fill: {
    color: new Color(),
    rule: "nonzero",
    none: true
  },
  stroke: {
    color: new Color(),
    width: 1,
    none: false
  },
  visibility: true,
  cursor: "default"
};
