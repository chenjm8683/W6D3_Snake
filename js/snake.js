var KEYS = ['w', 's', 'a', 'd'];
var DIFF = [[-1,  0],
            [ 1,  0],
            [ 0, -1],
            [ 0,  1]];

function Snake(boardSize) {
  this.direction = 'd'; // set default direction "up"
  this.segments = [];   // stores the snake
  this.boardSize = boardSize;
  this.createSnake(5);
  this.isGrowing = false;

}

Snake.prototype.createSnake = function(length) {
  var row = Math.floor(this.boardSize / 2);
  var col = Math.floor(this.boardSize / 2);
  for ( col ; col < length + row; col++) {
    this.segments.unshift([row, col]);
  }
}

Snake.prototype.move = function() {
  var currentHead = this.segments[0];
  var diff = DIFF[KEYS.indexOf(this.direction)];
  var newHead = [currentHead[0] + diff[0], currentHead[1] + diff[1]];
  this.segments.unshift(newHead);
  if (!this.isGrowing){
    this.segments.pop();
  }
  this.isGrowing = false;
};

Snake.prototype.turn = function(newDir) {
  if (this.isValidDirection(newDir)) {
    this.direction = newDir;
  }
};

Snake.prototype.isValidDirection = function(newDir) {
  if (KEYS.indexOf(newDir) === -1) {
    return false;
  } else if (this.isOppositeDirection(newDir)) {
    return true;
  } else {
    return false;
  }
};

Snake.prototype.isOppositeDirection = function(newDir) {
  var currentDiff = DIFF[KEYS.indexOf(this.direction)];
  var newDiff = DIFF[KEYS.indexOf(newDir)];
  if (currentDiff[0] + newDiff[0] === 0){
    return false;
  } else {
    return true;
  }
};


function Board(boardSize) {
  this.snake = new Snake(boardSize);     // hold a snake
  this.applePos = null;             // stores an apple on the board
  this.numMoves = 0;
  this.boardSize = boardSize;
  this.gameOver = false;
  this.randomApple();
};

Board.prototype.moveSnake = function() {
  this.snake.move();
  this.numMoves += 1;

  // check game over
  if (this.isGameOver()) {
    this.gameOver = true;
  } else if (this.isEatingApple()){
    this.snake.isGrowing = true;
    this.randomApple();
  }
};

Board.prototype.isGameOver = function() {
  if (this.isHeadHittingBody() || this.isHeadHittingWall()) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.isHeadHittingBody = function() {
  var snakeHead = this.snake.segments[0];
  var snakeBody = this.snake.segments.slice(1);
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeHead[0] === snakeBody[i][0] && snakeHead[1] === snakeBody[i][1]) {
      return true;
    }
  }
  return false;
}

Board.prototype.isHeadHittingWall = function() {
  var snakeHead = this.snake.segments[0];
  if (snakeHead[0] < 0 || snakeHead[1] < 0 || snakeHead[0] >= this.boardSize || snakeHead[1] >= this.boardSize) {
    return true;
  } else {
    return false;
  }
}

Board.prototype.isEatingApple = function() {
  var snakeHead = this.snake.segments[0];
  if (this.applePos[0] === snakeHead[0] && this.applePos[1] === snakeHead[1]) {
    return true;
  } else {
    return false;
  }

};


Board.prototype.randomApple = function() {
  do {
    var pos = this.randomPos();
  } while (this.snake.segments.indexOf(pos) !== -1)
  this.applePos = pos;
};

Board.prototype.randomPos = function() {
  var x = Math.floor(Math.random() * this.boardSize);
  var y = Math.floor(Math.random() * this.boardSize);
  return [x, y];
}

module.exports = Board;
