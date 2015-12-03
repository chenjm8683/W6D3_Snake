var Board = require('./snake.js');

function View(rootEl) {
  this.board = new Board();
  this.$rootEl = rootEl;

  this.setupBoard();
  // this.render();

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

  render: function() {
    $('div').removeClass('snake-segment');

    this.board.snake.segments.forEach(function(pos) {
      var row = pos[0];
      var col = pos[1];
      $('.snake').find('.row-' + row).filter(".col-" + col).addClass('snake-segment');
    })
  }


})

module.exports = View;
