var RGUI = require('regular-ui');
var tpl = require('./view.html');

var Hue = RGUI.Component.extend({
  name: 'hue',
  template: tpl,
  config: function(data) {
    data.direction = data.direction || 'horizontal';
    this.supr(data);
  },
  handleChange: function(e, skip) {
    !skip && e.preventDefault();

    var container = this.$refs.container;
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
    var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);
    var h;
    var percent;

    if (this.data.direction === 'vertical') {
      if (top < 0) {
        h = 359;
      } else if (top > containerHeight) {
        h = 0;
      } else {
        percent = -(top * 100 / containerHeight) + 100;
        h = Math.round(360 * percent / 100);
      }

      if (this.data.colors.hsl.h !== h) {
        this.$emit('change', {
          h: h,
          s: this.data.colors.hsl.s,
          l: this.data.colors.hsl.l,
          a: this.data.colors.hsl.a,
          source: 'hsl'
        })
      }
    } else {
      if (left < 0) {
        h = 0;
      } else if (left > containerWidth) {
        h = 359;
      } else {
        percent = left * 100 / containerWidth;
        h = Math.round(360 * percent / 100);
      }

      if (this.data.colors.hsl.h !== h) {
        this.$emit('change', {
          h: h,
          s: this.data.colors.hsl.s,
          l: this.data.colors.hsl.l,
          a: this.data.colors.hsl.a,
          source: 'hsl'
        })
      }
    }
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
    pointerTop: function() {
      if (this.data.direction === 'vertical') {
        return -((this.data.colors.hsl.h * 100) / 360) + 100 + '%'
      } else {
        return 0;
      }
    },
    pointerLeft: function() {
      if (this.data.direction === 'vertical') {
        return 0;
      } else {
        return (this.data.colors.hsl.h * 100) / 360 + '%';
      }
    }
  }
}).filter({
  directionClass: function(direction) {
    var classMap = {
      horizontal: 'c-hue-horizontal',
      vertical: 'c-hue-vertical'
    };
    return classMap[direction] || '';
  }
});

module.exports = Hue;
