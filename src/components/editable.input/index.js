import Regular from 'regularjs';
import template from './view.html';

import _ from '../../assets/util';

let EditableInput = Regular.extend({
    name: 'ed-in',
    template,
    config(data) {
        data.arrowOffset = data.arrowOffset || 1;
        this.supr(data);
    },
    update(e) {
        this.handleChange(e.target.value);
    },
    handleChange(newVal) {
        let colors = {};
        let { label } = this.data;
        colors[label] = newVal || 0;
        if (colors.hex === undefined && _.hasNum(colors[label])) {
            this.$emit('change', colors);
        } else if (/^#([A-Fa-f0-9]{6})$/.test(newVal)) {
            this.$emit('change', colors);
        }
    },
    handleKeyDown(e) {
        let value = this.data.value;
        let number = Number(value);
        let amount = Number(this.data.arrowOffset) || 1;

        if (isNaN(number)) {
            return;
        }

        // Up
        if (e.keyCode === 38 || e.which === 38) {
            value = number + amount;
            this.handleChange(value);
            e.preventDefault();
        }

        // Down
        if (e.keyCode === 40 || e.which === 40) {
            value = number - amount;
            this.handleChange(value);
            e.preventDefault();
        }
    }
}).filter({
    dealValue: {
        get(val) {
            return val ? val : '#';
        },
        set(val) {
            return val === '#' ? '' : val;
        }
    }
});

module.exports = EditableInput;
