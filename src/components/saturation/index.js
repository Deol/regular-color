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
        let data = this.data;
        let content = this.$refs.content;
        let left = _.getDistanceX(e, content);
        let top = _.getDistanceY(e, content);
        let container = _.getOffset(content);

        left = _.limitScope(left, 0, container.width);
        top = _.limitScope(top, 0, container.height);
        data.saturation = left * 100 / container.width;
        data.bright = -(top * 100 / container.height) + 100;

        this.throttle(this.onChange.bind(this), {
            h: data.colors.hsl.h,
            s: data.saturation,
            v: data.bright,
            a: data.colors.hsl.a,
            source: 'hsva'
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
            let {colors, bright} = this.data;
            if(bright) {
                return `${-bright + 100}%`;
            }
            return `${-(colors.hsv.v * 100) + 100}%`;
        },
        pointerLeft() {
            let {colors, saturation} = this.data;
            if(saturation) {
                return `${saturation}%`;
            }
            return `${colors.hsv.s * 100}%`;
        }
    }
});

module.exports = Saturation;
