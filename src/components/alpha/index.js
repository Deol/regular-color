var BaseComponent = require('../../base/component');
var tpl = require('./view.html');

var checkboard = require('../checkboard/index');
var _ = require('../../assets/util');

var Alpha = BaseComponent.extend({
  name: 'alpha',
  template: tpl,
  handleChange: function(e, skip) {
    !skip && e.preventDefault();
    var container = this.$refs.container;
    var containerWidth = container.clientWidth;
    var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
    var a;

    if (left < 0) {
      a = 0;
    } else if (left > containerWidth) {
      a = 1;
    } else {
      a = left / containerWidth;
    }

    if (this.data.colors.a !== a) {
      this.$emit('change', {
        h: this.data.colors.hsl.h,
        s: this.data.colors.hsl.s,
        l: this.data.colors.hsl.l,
        a: a,
        source: 'rgba'
      });
    }
  },
  computed: {
    gradientColor: function() {
      var rgba = this.data.colors.rgba;
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)';
    },
    dealLeft: function() {
      return this.data.colors.a * 100 + '%';
    }
  }
});

module.exports = Alpha;
