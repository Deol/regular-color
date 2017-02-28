var RGUI = require('regular-ui');
var tpl = require('./view.html');

var EditableInput = RGUI.Component.extend({
  name: 'ed-in',
  template: tpl,
  config: function(data) {
    data.arrowOffset = data.arrowOffset || 1;
    this.supr(data);
  },
  update: function(e) {
    this.handleChange(e.target.value);
  },
  handleChange: function(newVal) {
    var colors = {};
    colors[this.data.label] = newVal;
    this.$emit('change', colors);
  },
  handleKeyDown: function(e) {
    var value = this.data.value;
    var number = Number(value);
    var amount = Number(this.data.arrowOffset) || 1;

    // Decimal places
    var multiple = Math.pow(10, amount.toString().split('.')[1].length);

    if (!isNaN(number)) {
      // Up
      if (e.keyCode === 38 || e.which === 38) {
        value = Math.round((number + amount) * multiple) / multiple;
        this.handleChange(value);
        e.preventDefault();
      }

      // Down
      if (number !== 0 && (e.keyCode === 40 || e.which === 40)) {
        value = Math.round((number - amount) * multiple) / multiple;
        this.handleChange(value);
        e.preventDefault();
      }
    }
  },
  handleBlur: function(e) {
    console.log(e);
  },
  handleDrag: function(e) {
    console.log(e);
  },
  handleMouseDown: function(e) {
    console.log(e);
  }
}).filter({
  maxFilter: {
    get: function(value) {
      if (this.data.max && value > this.data.max) {
        return this.max;
      } else {
        return value;
      }
    },
    set: function(value, oldVal) {
      return value;
    }
  }
});

module.exports = EditableInput;
