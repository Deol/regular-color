import Regular from 'regularjs';
import tinycolor from 'tinycolor2';
import _ from '../assets/util';

function _colorChange(colors, oldHue) {
    let color;

    if (colors && colors.hsl) {
        color = tinycolor(colors.hsl);
    } else if (colors && colors.hex && colors.hex.length > 0) {
        color = tinycolor(colors.hex);
    } else {
        color = tinycolor(colors);
    }

    let hsl = color.toHsl();
    let hsv = color.toHsv();

    colors.a = _.limitScope(colors.a, 0, 1);
    colors.a = _.limitDecimal(colors.a, 2);

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
        hsl,
        hex: color.toHexString().toUpperCase(),
        rgba: color.toRgb(),
        hsv,
        oldHue: _.hasNum(colors.h) ? colors.h : (oldHue || hsl.h),
        source: colors.source,
        a: colors.a || color.getAlpha()
    };
}

let BaseComponent = Regular.extend({
    _colorChange,
    colorChange(colors, oldHue) {
        this.data.oldHue = this.data.colors.hsl.h;
        this.data.colors = this._colorChange(colors, oldHue || this.data.oldHue);
        this.$emit('changeColor', this.data.colors);
    },
    isValidHex(hex) {
        return tinycolor(hex).isValid();
    },
    simpleCheckForValidColor(colors) {
        let keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v'];
        let checked = 0;
        let passed = 0;

        for (let i = 0, len = keysToCheck.length; i < len; i++) {
            let letter = keysToCheck[i];
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
