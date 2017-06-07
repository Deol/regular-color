/*
 * Created by Aeo on 2017/02/16.
 * Chrome Color for Regularjs
 */
import './mcss/index.mcss';

import BaseComponent from './base/processor';
import template from './view.html';

// components
import hue from './components/hue';
import alpha from './components/alpha';
import checkboard from './components/checkboard';
import saturation from './components/saturation';
import editableinput from './components/editable.input';

import _ from './assets/util';

let Color = BaseComponent.extend({
    name: 'color',
    template,
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
