var RGUI = require('regular-ui');
var tpl = require('./view.html');

var throttle = require('lodash.throttle')

var Saturation = RGUI.Component.extend({
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
  onChange: function(param) {
    this.$emit('change', param);
  },
  handleMouseDown: function(e) {
    this.handleChange(e, true);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp: function(e) {
    this.unbindEventListeners();
  },
  unbindEventListeners: function() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
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