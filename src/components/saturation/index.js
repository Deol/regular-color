var BaseComponent = require('../../base/component');
var tpl = require('./view.html');

var throttle = require('../../assets/util.js').throttle;

var Saturation = BaseComponent.extend({
  name: 'saturation',
  template: tpl,
  throttle: throttle(function(fn, data) {
    return fn(data);
  }, 50),
  handleChange: function(e, skip) {
    !skip && e.preventDefault();
    var container = this.$refs.container;
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
    var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);

    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    } else if (top < 0) {
      top = 0;
    } else if (top > containerHeight) {
      top = containerHeight;
    }

    var saturation = left * 100 / containerWidth;
    var bright = -(top * 100 / containerHeight) + 100;

    this.throttle(this.onChange.bind(this), {
      h: this.data.colors.hsl.h,
      s: saturation,
      v: bright,
      a: this.data.colors.hsl.a,
      source: 'rgb'
    })
  },
  onChange: function(colors) {
    this.$emit('change', colors);
  },
  computed: {
    bgColor: function() {
      return 'hsl(' + this.data.colors.hsl.h + ', 100%, 50%)';
    },
    pointerTop: function() {
      return -(this.data.colors.hsv.v * 100) + 100 + '%';
    },
    pointerLeft: function() {
      return this.data.colors.hsv.s * 100 + '%';
    }
  }
});

module.exports = Saturation;
