var Image = _class('Image', {
  mixins: [Base],

  interfaces: [Shape],

  methods: {
    init: function Image_init(imageData, position, size) {
      this.impl = new Fashion.IMPL.Image(imageData);
      this.position = position;
      if (size) {
        this.size = size;
      } else {
        imageData.addEventListener("load", function() {
          this.size(imageData.size);
        });
      }
    },

    displayPosition: function()
    {
    },

    displaySize: function()
    {
    },

    gravityPosition: function()
    {
    },

    hitTest: function(d)
    {
    }
  }
});

/*
 * vim: sts=2 sw=2 ts=2 et
 */
