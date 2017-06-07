import BaseComponent from '../../base/component';
import template from './view.html';

/**
 * 根据当前滑块位置确定 Hue（色相）的值
 * @param  {number} info.curPos  滑块位置，相对左边/相对上方
 * @param  {number} info.minPos  滑块位置范围最小值
 * @param  {number} info.maxPos  滑块位置范围最大值
 * @param  {number} info.minHue  Hue 范围内最小值
 * @param  {number} info.maxHue  Hue 范围内最大值
 * @return {number}              处理后生成的色相值
 */
let generateHue = function(info, direction) {
    if (info.curPos < info.minPos) {
        return info.minHue;
    } else if (info.curPos > info.maxPos) {
        return info.maxHue;
    }
    let percent = info.curPos * 100 / info.maxPos;
    if (direction === 'vertical') {
        percent = 100 - percent;
    }
    let h = Math.round(360 * percent / 100);
    return h === 360 ? 359 : h;
};

let Hue = BaseComponent.extend({
    name: 'hue',
    template,
    config(data) {
        data.direction = data.direction || 'horizontal';
        this.supr(data);
    },
    handleChange(e, skip) {
        !skip && e.preventDefault();
        let container = this.$refs.container;
        let direction = this.data.direction;
        let options = {
            vertical: {
                curPos: (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset),
                minPos: 0,
                maxPos: container.clientHeight,
                minHue: 359,
                maxHue: 0
            },
            horizontal: {
                curPos: (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset),
                minPos: 0,
                maxPos: container.clientWidth,
                minHue: 0,
                maxHue: 359
            }
        };
        let h = generateHue(options[direction], direction);
        if (this.data.colors.hsl.h !== h) {
            this.$emit('change', {
                h,
                s: this.data.colors.hsl.s,
                l: this.data.colors.hsl.l,
                a: this.data.colors.hsl.a,
                source: 'hsl'
            });
        }
    },
    computed: {
        pointerTop() {
            if (this.data.direction === 'vertical') {
                return `${-((this.data.colors.hsl.h * 100) / 360) + 100}%`;
            } 
            return 0;
      
        },
        pointerLeft() {
            if (this.data.direction === 'vertical') {
                return 0;
            } 
            return `${(this.data.colors.hsl.h * 100) / 360}%`;
      
        }
    }
}).filter({
    directionClass(direction) {
        let classMap = {
            horizontal: 'c-hue-horizontal',
            vertical: 'c-hue-vertical'
        };
        return classMap[direction] || '';
    }
});

module.exports = Hue;
