import BaseComponent from '../../base/component';
import template from './view.html';

import checkboard from '../checkboard/index';

let Alpha = BaseComponent.extend({
    name: 'alpha',
    template,
    handleChange(e, skip) {
        !skip && e.preventDefault();
        let container = this.$refs.container;
        let containerWidth = container.clientWidth;
        let left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
        let a;

        if (left < 0) {
            a = 0;
        } else if (left > containerWidth) {
            a = 1;
        } else {
            a = left / containerWidth;
        }

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
