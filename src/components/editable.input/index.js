var Regular = require('regularjs');
var tpl = require('./view.html');

var EditableInput = Regular.extend({
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
});

module.exports = EditableInput;
