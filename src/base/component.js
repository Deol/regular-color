var Regular = require('regularjs');

var BaseComponent = Regular.extend({
  handleMouseDown: function(e) {
    this.handleChange(e, true);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp: function(e) {
    this.unbindEventListeners();
  },
  unbindEventListeners: function() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
});

module.exports = BaseComponent;
