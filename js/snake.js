var KEYS = ['w', 's', 'a', 'd'];
var DIFF = [[-1,  0],
            [ 1,  0],
            [ 0, -1],
            [ 0,  1]];

function Snake() {
  this.direction = 'd'; // set default direction "up"
  this.segments = [];   // stores the snake
  this.createSnake(5);
}

Snake.prototype.createSnake = function(length) {
  var row = 25;
  for (var col = 25; col < length + 25; col++) {
    this.segments.unshift([row, col]);
  }
}

Snake.prototype.move = function() {
  var currentHead = this.segments[0];
  var diff = DIFF[KEYS.indexOf(this.direction)];
  var newHead = [currentHead[0] + diff[0], currentHead[1] + diff[1]];
  this.segments.unshift(newHead);
  this.segments.pop();
};

Snake.prototype.turn = function(newDir) {
  if (this.isValidDirection(newDir)) {
    this.direction = newDir;
  }
};

Snake.prototype.isValidDirection = function(newDir) {
  if (DIRECTION.indexOf(newDir) === -1) {
    return false;
  } else if (this.direction === 'w' && newDir === 's' ||
            this.direction === 'a' && newDir === 'd') {
    return false;
  } else {
    return true;
  }
};

function Board() {
  this.snake = new Snake();     // hold a snake
};

module.exports = Board;
