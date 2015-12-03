var Board = require('./snake.js');

function View(rootEl) {
  this.board = new Board();
  this.$rootEl = rootEl;

  this.setupBoard();
  this.registerEvents();
  // this.render();
  window.setInterval(this.step.bind(this), 500);

}

$.extend(View.prototype, {
  setupBoard: function() {
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        var $div = $('<div>');
        $div.addClass('row-' + i);
        $div.addClass('col-' + j);
        this.$rootEl.append($div);
      }
    }
  },

  registerEvents: function() {
    $(window).on('keydown', this.handleKeyEvent.bind(this));
    // this.$rootEl.keydown(this.handleKeyEvent.bind(this));
  },

  handleKeyEvent: function(e) {

    var code = e.keyCode;
    // console.log(code);

    var direction = (String.fromCharCode(code)).toLowerCase();
    // console.log(direction);

    this.board.snake.turn(direction);
  },

  render: function() {
    $('div').removeClass('snake-segment');

    this.board.snake.segments.forEach(function(pos) {
      var row = pos[0];
      var col = pos[1];
      $('.snake').find('.row-' + row).filter(".col-" + col).addClass('snake-segment');
    })
  },

  step: function() {
    this.board.snake.move();
    this.render();
  },




})

module.exports = View;
