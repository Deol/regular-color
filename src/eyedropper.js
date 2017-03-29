/*
 * Created by Aeo on 2017/02/16.
 * Chrome EyeDropper for Regularjs
 */
var BaseComponent = require('./base/processor');
var tpl = require('./view.html');

// components
var hue = require('./components/hue');
var alpha = require('./components/alpha');
var checkboard = require('./components/checkboard');
var saturation = require('./components/saturation');
var editableinput = require('./components/editable.input');

var _ = require('./assets/util');

var EyeDropper = BaseComponent.extend({
  name: 'eyedropper',
  template: tpl,
  config: function(data) {
    data.fields = ['hex', 'rgba', 'hsla'];
    data.fieldsIndex = 0;
    data.highlight = false;

    data.colors = this._colorChange(data.colors);

    this.supr(data);
  },
  handlePreset: function(c) {
    this.colorChange({
      hex: c,
      source: 'hex'
    })
  },
  childChange: function(colors) {
    this.colorChange(colors);
  },
  inputChange: function(colors) {
    if (!colors) {
      return;
    }
    if (colors.hex) {
      this.isValidHex(colors.hex) && this.colorChange({
        hex: colors.hex,
        source: 'hex'
      })
    } else if (_.hasSome(colors, ['r', 'g', 'b', 'a'])) {
      this.colorChange({
        r: _.has(colors, 'r') ? colors.r : this.data.colors.rgba.r,
        g: _.has(colors, 'g') ? colors.g : this.data.colors.rgba.g,
        b: _.has(colors, 'b') ? colors.b : this.data.colors.rgba.b,
        a: _.has(colors, 'a') ? colors.a : this.data.colors.rgba.a,
        source: 'rgba'
      })
    }
  },
  toggleViews: function() {
    if (this.data.fieldsIndex >= 2) {
      this.data.fieldsIndex = 0;
      return;
    }
    this.data.fieldsIndex++;
  },
  showHighlight: function() {
    this.data.highlight = true;
  },
  hideHighlight: function() {
    this.data.highlight = false;
  },
  computed: {
    activeColor: function() {
      var rgba = this.data.colors.rgba;
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
    }
  }
});

module.exports = EyeDropper;