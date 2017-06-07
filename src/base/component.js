import Regular from 'regularjs';

const dom = Regular.dom;

let BaseComponent = Regular.extend({
    handleMouseDown(e) {
        this.handleChange(e, true);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        dom.on(window, 'mousemove', this.handleChange);
        dom.on(window, 'mouseup', this.handleMouseUp);
    },
    handleMouseUp() {
        this.unbindEventListeners();
    },
    unbindEventListeners() {
        dom.off(window, 'mousemove', this.handleChange);
        dom.off(window, 'mouseup', this.handleMouseUp);
    }
});

module.exports = BaseComponent;
