let BaseComponent = require('../../base/component');
let tpl = require('./view.html');

let throttle = require('../../assets/util.js').throttle;

let Saturation = BaseComponent.extend({
    name: 'saturation',
    template: tpl,
    throttle: throttle((fn, data) => {
        return fn(data);
    }, 50),
    handleChange(e, skip) {
        !skip && e.preventDefault();
        let container = this.$refs.container;
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        let left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
        let top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);

        if (left < 0) {
            left = 0;
        } else if (left > containerWidth) {
            left = containerWidth;
        } else if (top < 0) {
            top = 0;
        } else if (top > containerHeight) {
            top = containerHeight;
        }

        let saturation = left * 100 / containerWidth;
        let bright = -(top * 100 / containerHeight) + 100;

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
