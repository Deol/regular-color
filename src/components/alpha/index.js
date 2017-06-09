import BaseComponent from '../../base/component';
import template from './view.html';

import checkboard from '../checkboard/index';

import _ from '../../assets/util';

let Alpha = BaseComponent.extend({
    name: 'alpha',
    template,
    handleChange(e, skip) {
        !skip && e.preventDefault();
        let content = this.$refs.content;
        let container = _.getOffset(content);
        let left = _.getDistanceX(e, content);
        let a = _.limitScope(left / container.width, 0, 1);

        if (this.data.colors.a !== a) {
            this.$emit('change', {
                h: this.data.colors.hsl.h,
                s: this.data.colors.hsl.s,
                l: this.data.colors.hsl.l,
                a,
                source: 'rgba'
            });
        }
    },
    computed: {
        gradientColor() {
            let rgba = this.data.colors.rgba;
            let rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
            return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
        },
        dealLeft() {
            return `${this.data.colors.a * 100}%`;
        }
    }
});
Alpha.component('checkboard', checkboard);

module.exports = Alpha;
