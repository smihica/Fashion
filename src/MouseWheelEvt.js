var MouseWheelEvt = _class("MouseWheelEvt", {

  props: {
    type: 'mousewheel',
    target: null,
    delta: 0,
    _preventDefault: null
  },

  methods: {
    init: function (preventDefault) {
      this._preventDefault = preventDefault;
    },

    preventDefault: function preventDefault() {
      this._preventDefault();
    }
  }
});
