import BaseComponent from '../../base/component';
import template from './view.html';

import _ from '../../assets/util';

let Saturation = BaseComponent.extend({
    name: 'saturation',
    template,
    throttle: _.throttle((fn, data) => {
        return fn(data);
    }, 50),
    handleChange(e, skip) {
        !skip && e.preventDefault();
        let content = this.$refs.content;
        let left = _.getDistanceX(e, content);
        let top = _.getDistanceY(e, content);
        let container = _.getOffset(content);

        if (left < 0) {
            left = 0;
        } else if (left > container.width) {
            left = container.width;
        }
        
        if (top < 0) {
            top = 0;
        } else if (top > container.height) {
            top = container.height;
        }

        let saturation = left * 100 / container.width;
        let bright = -(top * 100 / container.height) + 100;

        this.throttle(this.onChange.bind(this), {
            h: this.data.colors.hsl.h,
            s: saturation,
            v: bright,
            a: this.data.colors.hsl.a,
            source: 'rgb'
        });
    },
    onChange(colors) {
        this.$emit('change', colors);
    },
    computed: {
        bgColor() {
            return `hsl(${this.data.colors.hsl.h}, 100%, 50%)`;
        },
        pointerTop() {
            return `${-(this.data.colors.hsv.v * 100) + 100}%`;
        },
        pointerLeft() {
            return `${this.data.colors.hsv.s * 100}%`;
        }
    }
});

module.exports = Saturation;
