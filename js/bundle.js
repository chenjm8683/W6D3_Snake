/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(1);

	$(function() {
	  var rootEl = $('.snake');
	  new SnakeView(rootEl);
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);