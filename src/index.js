/*
 * Created by Aeo on 2017/02/16.
 * Chrome Color for Regularjs
 */
require('./mcss/index.mcss');

let BaseComponent = require('./base/processor');
let tpl = require('./view.html');

// components
let hue = require('./components/hue');
let alpha = require('./components/alpha');
let checkboard = require('./components/checkboard');
let saturation = require('./components/saturation');
let editableinput = require('./components/editable.input');

let _ = require('./assets/util');

let Color = BaseComponent.extend({
    name: 'color',
    template: tpl,
    config(data) {
        data.fields = ['hex', 'rgba', 'hsla'];
        data.fieldsIndex = 0;
        data.highlight = false;

        data.colors = this._colorChange(data.colors);

        this.supr(data);
    },
    handlePreset(c) {
        this.colorChange({
            hex: c,
            source: 'hex'
        });
    },
    childChange(colors) {
        this.colorChange(colors);
    },
    inputChange(colors) {
        if (!colors) {
            return;
        }
        if (colors.hex) {
            this.isValidHex(colors.hex) && this.colorChange({
                hex: colors.hex,
                source: 'hex'
            });
        } else if (_.hasSome(colors, ['r', 'g', 'b', 'a'])) {
            this.colorChange({
                r: _.has(colors, 'r') ? colors.r : this.data.colors.rgba.r,
                g: _.has(colors, 'g') ? colors.g : this.data.colors.rgba.g,
                b: _.has(colors, 'b') ? colors.b : this.data.colors.rgba.b,
                a: _.has(colors, 'a') ? colors.a : this.data.colors.rgba.a,
                source: 'rgba'
            });
        }
    },
    toggleViews() {
        if (this.data.fieldsIndex >= 2) {
            this.data.fieldsIndex = 0;
            return;
        }
        this.data.fieldsIndex++;
    },
    showHighlight() {
        this.data.highlight = true;
    },
    hideHighlight() {
        this.data.highlight = false;
    },
    computed: {
        activeColor() {
            let rgba = this.data.colors.rgba;
            return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
        }
    }
});
Color.component('hue', hue);
Color.component('alpha', alpha);
Color.component('checkboard', checkboard);
Color.component('saturation', saturation);
Color.component('editableinput', editableinput);

module.exports = Color;
