var RGUI = require('regular-ui');
var tinycolor = require('tinycolor2');
var _ = require('../assets/util.js');

function _colorChange(colors, oldHue) {
  var color;
  if (!colors.a && colors.a !== 0) {
      colors.a = 1;
  }
  colors.a = _.limitScope(colors.a, 0, 1);
  if (colors.hex) {
    color = tinycolor(colors.hex);
    color.setAlpha(colors.a);
  } else {
    color = tinycolor(colors);
  }

  var hsl = color.toHsl();
  var hsv = color.toHsv();
  if (hsl.s === 0) {
    hsl.h = colors.h || oldHue || 0;
    hsv.h = colors.h || oldHue || 0;
  }
  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: colors.h || oldHue || hsl.h,
    source: colors.source,
    a: colors.a
  }
}

var BaseComponent = RGUI.Component.extend({
  _colorChange: _colorChange,
  colorChange: function(colors, oldHue) {
    this.data.colors = _colorChange(colors, oldHue || this.data.oldHue);
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
