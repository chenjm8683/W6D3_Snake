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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);