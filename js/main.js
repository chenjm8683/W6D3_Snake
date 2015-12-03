var SnakeView = require('./snake-view.js');

$(function() {
  var rootEl = $('.snake');
  new SnakeView(rootEl);
})
