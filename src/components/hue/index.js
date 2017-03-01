var BaseComponent = require('../../base/component');
var tpl = require('./view.html');

/**
 * 根据当前滑块位置确定 Hue（色相）的值
 * @param  {number} info.curPos  滑块位置，相对左边/相对上方
 * @param  {number} info.minPos  滑块位置范围最小值
 * @param  {number} info.maxPos  滑块位置范围最大值
 * @param  {number} info.minHue  Hue 范围内最小值
 * @param  {number} info.maxHue  Hue 范围内最大值
 * @return {number}              处理后生成的色相值
 */
var generateHue = function(info, direction) {
  if (info.curPos < info.minPos) {
    return info.minHue;
  } else if (info.curPos > info.maxPos) {
    return info.maxHue;
  }
  var percent = info.curPos * 100 / info.maxPos;
  if (direction === 'vertical') {
    percent = 100 - percent;
  }
  var h = Math.round(360 * percent / 100);
  return h === 360 ? 359 : h;
}

var Hue = BaseComponent.extend({
  name: 'hue',
  template: tpl,
  config: function(data) {
    data.direction = data.direction || 'horizontal';
    this.supr(data);
  },
  handleChange: function(e, skip) {
    !skip && e.preventDefault();
    var container = this.$refs.container;
    var direction = this.data.direction;
    var options = {
        vertical: {
            curPos: (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset),
            minPos: 0,
            maxPos: container.clientHeight,
            minHue: 359,
            maxHue: 0
        },
        horizontal: {
            curPos: (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset),
            minPos: 0,
            maxPos: container.clientWidth,
            minHue: 0,
            maxHue: 359
        }
    };
    var h = generateHue(options[direction], direction);
    if (this.data.colors.hsl.h !== h) {
      this.$emit('change', {
        h: h,
        s: this.data.colors.hsl.s,
        l: this.data.colors.hsl.l,
        a: this.data.colors.hsl.a,
        source: 'hsl'
      })
    }
  },
  computed: {
    pointerTop: function() {
      if (this.data.direction === 'vertical') {
        return -((this.data.colors.hsl.h * 100) / 360) + 100 + '%';
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
