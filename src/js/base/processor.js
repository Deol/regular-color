var Regular = require('regularjs');
var tinycolor = require('tinycolor2');
var _ = require('../assets/util');

function _colorChange(colors, oldHue) {
  var color;

  colors.a = _.limitScope(colors.a, 0, 1);
  colors.a = _.limitDecimal(colors.a, 2);

  if (colors.hex) {
    color = tinycolor(colors.hex);
    color.setAlpha(colors.a);
  } else {
    color = tinycolor(colors);
  }

  var hsl = color.toHsl();
  var hsv = color.toHsv();

  hsl.h = _.limitDecimal(hsl.h, 0);
  hsl.s = _.limitDecimal(hsl.s, 2);
  hsl.l = _.limitDecimal(hsl.l, 2);

  hsv.h = _.limitDecimal(hsl.h, 0);
  hsv.s = _.limitDecimal(hsv.s, 2);
  hsv.v = _.limitDecimal(hsv.v, 2);

  /**
   *  饱和度 (saturation) 为 0 时，色相 (hue) 在转换时被消色差 (achromatic) 置为 0
   *  本工程中不输出 hsl 和 hsv，故此处做特殊处理
   */
  if (hsl.s === 0) {
    hsl.h = _.hasNum(colors.h) ? colors.h : (oldHue || 0);
    hsv.h = _.hasNum(colors.h) ? colors.h : (oldHue || 0);
  }

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: _.hasNum(colors.h) ? colors.h : (oldHue || hsl.h),
    source: colors.source,
    a: colors.a
  }
}

var BaseComponent = Regular.extend({
  _colorChange: _colorChange,
  colorChange: function(colors, oldHue) {
    this.data.colors = this._colorChange(colors, oldHue || this.data.oldHue);
    this.data.oldHue = this.data.colors.hsl.h;
    this.$emit('changeColor', this.data.colors);
  },
  isValidHex: function(hex) {
    return tinycolor(hex).isValid();
  },
  simpleCheckForValidColor: function(colors) {
    var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v'];
    var checked = 0;
    var passed = 0;

    for (var i = 0, len = keysToCheck.length; i < len; i++) {
      var letter = keysToCheck[i];
      if (colors[letter]) {
        checked++;
        if (!isNaN(colors[letter])) {
          passed++;
        }
      }
    }
    if (checked === passed) {
      return colors;
    }
  }
});

module.exports = BaseComponent;