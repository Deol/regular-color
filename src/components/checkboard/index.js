var RGUI = require('regular-ui');
var tpl = require('./view.html');

var _checkboardCache = {};

/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */
function renderCheckboard(c1, c2, size) {
  // Dont Render On Server
  if (typeof document === 'undefined') {
    return null;
  }
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * 2;
  var ctx = canvas.getContext('2d');
  // If no context can be found, return early.
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}

/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */
function getCheckboard(c1, c2, size) {
  var key = c1 + ',' + c2 + ',' + size;

  if (_checkboardCache[key]) {
    return _checkboardCache[key];
  } else {
    var checkboard = renderCheckboard(c1, c2, size);
    _checkboardCache[key] = checkboard;
    return checkboard;
  }
}

var Checkboard = RGUI.Component.extend({
  name: 'checkboard',
  template: tpl,
  config: function(data) {
    data.size = data.size || 8;
    data.white = data.white || '#fff';
    data.grey = data.grey || '#e6e6e6';
    this.supr(data);
  },
  computed: {
    bgStyle: function() {
      return 'url(' + getCheckboard(this.data.white, this.data.grey, this.data.size) + ') center left';
    }
  }
});

module.exports = Checkboard;
