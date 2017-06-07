let Regular = require('regularjs');

let BaseComponent = Regular.extend({
    handleMouseDown(e) {
        this.handleChange(e, true);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        window.addEventListener('mousemove', this.handleChange);
        window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp() {
        this.unbindEventListeners();
    },
    unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleChange);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
});

module.exports = BaseComponent;
