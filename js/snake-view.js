var Board = require('./snake.js');

SIZE = 50;

function View(rootEl) {
  this.board = new Board(SIZE);
  this.$rootEl = rootEl;

  this.setupBoard();
  this.registerEvents();
  // this.render();
  this.intervalId = window.setInterval(this.step.bind(this), 100);

}

$.extend(View.prototype, {
  setupBoard: function() {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
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

    $('div').removeClass('apple');
    var applePos = this.board.applePos;
    $('.snake').find('.row-' + applePos[0]).filter(".col-" + applePos[1]).addClass('apple');
  },

  step: function() {
    this.board.moveSnake();
    this.render();
    if (this.board.gameOver) {
      window.clearInterval(this.intervalId);
      alert("Gameover!");
    }
  },




})

module.exports = View;
