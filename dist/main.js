(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["binary-com-longcode"] = factory();
	else
		root["binary-com-longcode"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var find = exports.find = function find(array, fn) {
    if (Array.prototype.find) return Array.prototype.find.call(array, fn);

    var i = 0;
    for (; i < array.length; i++) {
        if (fn(array[i])) break;
    }return array[i];
};

var dateProcessor = exports.dateProcessor = function dateProcessor(ts) {
    ts = parseInt(ts);
    return {
        getDate: function getDate() {
            var dateObj = new Date(ts);
            var date = ('0' + dateObj.getUTCDate()).slice('-2');
            var month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            var year = dateObj.getUTCFullYear();

            return [year, month, date].join('-');
        },
        getDateTime: function getDateTime() {
            var dateObj = new Date(ts);
            var date = ('0' + dateObj.getUTCDate()).slice('-2');
            var month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            var year = dateObj.getUTCFullYear();
            var hours = ('0' + dateObj.getUTCHours()).slice('-2');
            var minutes = ('0' + dateObj.getUTCMinutes()).slice('-2');
            var seconds = ('0' + dateObj.getUTCSeconds()).slice('-2');

            return [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
        },
        days: function days() {
            return parseInt(ts / (24 * 60 * 60 * 1000));
        },
        hours: function hours() {
            var day = 24 * 60 * 60 * 1000;
            return parseInt(ts % day / (60 * 60 * 1000));
        },
        minutes: function minutes() {
            var hour = 60 * 60 * 1000;
            return parseInt(ts % hour / (60 * 1000));
        },
        seconds: function seconds() {
            var minutes = 60 * 1000;
            return parseInt(ts % minutes / 1000);
        }
    };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get_bet_parameters = undefined;

var _utils = __webpack_require__(0);

/**
 * Created by Apoorv Joshi on 17/04/2017
 * @param {*} shortcode
 * @param {*} currency
 * @param {*} is_sold
 */
var get_bet_parameters = exports.get_bet_parameters = function get_bet_parameters(shortcode, currency, active_symbols) {
    var parameters = {
        bet_type: 'Invalid',
        underlying: 'config',
        currency: currency
    };
    if (!active_symbols) throw 'Active Symbols list not present';
    //Contracts with barrier
    var match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)_(S?-?\d+P?)_(S?-?\d+P?)$/);
    if (!match) {
        // Contracts without barriers. Eg: 'Asians'. (Not being racist, it is actually a contract type. Believe me!)
        match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)$/);
        if (match) {
            var underlying = (0, _utils.find)(active_symbols, function (underlying) {
                return underlying.symbol.toUpperCase() === match[2].toUpperCase();
            });
            if (!underlying) throw 'Underlying not found';
            parameters = {
                barrier_count: 0,
                shortcode: match[0],
                bet_type: match[1],
                underlying: underlying.display_name,
                underlying_symbol: match[2],
                amount_type: 'payout',
                amount: (+match[3]).toFixed(2),
                date_start: +match[4],
                tick_expiry: 1,
                tick_count: +match[5].toUpperCase().replace('T', '')
            };
        } else {
            //Legacy contract
            if (/^SPREAD/.test(shortcode)) parameters.bet_type = 'SPREAD';
        }
    } else {
        // Normal contracts with at least 1 barrier.
        var _underlying = (0, _utils.find)(active_symbols, function (underlying) {
            return underlying.symbol.toUpperCase() === match[2].toUpperCase();
        });
        if (!_underlying) throw 'Underlying not found';
        var digits_after_decimal = _underlying.pip ? ('' + _underlying.pip).split('.')[1].length : 2;
        parameters = {
            shortcode: match[0],
            bet_type: match[1],
            underlying_symbol: match[2],
            underlying: _underlying.display_name,
            amount_type: 'payout',
            amount: (+match[3]).toFixed(2),
            date_start: +match[4].toUpperCase().replace('F', '')
        };
        if (match[4].toUpperCase().indexOf('F') !== -1) parameters.is_forward_starting = 1;
        if (match[5].toUpperCase().indexOf('T') !== -1) {
            // Tick trade
            parameters.tick_expiry = 1;
            parameters.tick_count = +match[5].toUpperCase().replace('T', '');
        } else {
            if (match[5].toUpperCase().indexOf('F') !== -1) parameters.fixed_expiry = 1;
            parameters.date_expiry = +match[5].toUpperCase().replace('F', '');
        }
        if (match[6] === 'S0P') {
            // No barrier
            parameters.barrier_count = 0;
        } else if (match[7] === 'S0P' || +match[7] === 0) {
            //Only one barrier available
            parameters.barrier_count = 1;
            if (match[6].startsWith('S') && match[6].endsWith('P')) {
                //Relative barrier
                match[6] = match[6].replace('S', '').replace('P', '');
                parameters.barrier = (match[6] * _underlying.pip).toFixed(digits_after_decimal);
            } else {
                //Absolute barrier
                parameters.barrier_absolute = 1;
                parameters.barrier = match[1].startsWith('DIGIT') ? match[6] : (match[6] / 1000000).toFixed(digits_after_decimal);
            }
        } else {
            // Two barriers available
            parameters.barrier_count = 2;
            if (match[6].startsWith('S') && match[6].endsWith('P')) {
                //Relative Barrier
                match[6] = match[6].replace('S', '').replace('P', '');
                match[7] = match[7].replace('S', '').replace('P', '');
                parameters.high_barrier = (match[6] * _underlying.pip).toFixed(digits_after_decimal);
                parameters.low_barrier = (match[7] * _underlying.pip).toFixed(digits_after_decimal);
            } else {
                //Absolute barrier
                parameters.barrier_absolute = 1;
                parameters.high_barrier = match[1].startsWith('DIGIT') ? +match[6] : (+match[6] / 1000000).toFixed(digits_after_decimal);
                parameters.low_barrier = match[1].startsWith('DIGIT') ? +match[7] : (+match[7] / 1000000).toFixed(digits_after_decimal);
            }
        }
    }

    parameters.currency = currency;

    return parameters;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongCode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _translation = __webpack_require__(4);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LongCode = exports.LongCode = function () {
  function LongCode(lang) {
    _classCallCheck(this, LongCode);

    this.t = new _translation.Translation(lang);
  }

  // Returns longcode based on bet parameters.


  _createClass(LongCode, [{
    key: 'get',
    value: function get(bet_param) {
      var _this = this;
      var t = this.t;
      bet_param = this.processBarrier(bet_param);
      var contract_map = {
        ASIANU: function ASIANU(param) {
          return t.translate('[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.', param);
        },
        ASIAND: function ASIAND(param) {
          return t.translate('[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.', param);
        },
        CALL: function CALL(param) {
          if (param.tick_expiry === 1) {
            // Tick trade
            return t.translate('[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].', param);
          }

          if (param.is_forward_starting === 1) {
            param.duration = _this.getDuration(param.date_expiry - param.date_start);
            param.date_start = _this.getDateTime(param.date_start);
            return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].', param);
          }

          if (_this.isDaily(param.date_expiry - param.date_start)) {
            // Daily normal constracts.
            param.date_expiry = 'close on ' + _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            //Fixed expiry
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].', param);
          }
          // Intraday normal contracts having duration in minutes, seconds, or hours.
          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.', param);
        },
        DIGITDIFF: function DIGITDIFF(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.', param);
        },
        DIGITEVEN: function DIGITEVEN(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.', param);
        },
        DIGITMATCH: function DIGITMATCH(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.', param);
        },
        DIGITODD: function DIGITODD(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.', param);
        },
        DIGITOVER: function DIGITOVER(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.', param);
        },
        DIGITUNDER: function DIGITUNDER(param) {
          return t.translate('[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.', param);
        },
        EXPIRYMISS: function EXPIRYMISS(param) {
          if (_this.isDaily(param.date_expiry - param.date_start)) {
            param.date_expiry = _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].', param);
          }

          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.', param);
        },
        EXPIRYRANGE: function EXPIRYRANGE(param) {

          if (_this.isDaily(param.date_expiry - param.date_start)) {
            param.date_expiry = _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].', param);
          }

          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.', param);
        },
        NOTOUCH: function NOTOUCH(param) {
          if (_this.isDaily(param.date_expiry - param.date_start)) {
            param.date_expiry = _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].', param);
          }

          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.', param);
        },
        ONETOUCH: function ONETOUCH(param) {
          if (_this.isDaily(param.date_expiry - param.date_start)) {
            param.date_expiry = _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].', param);
          }

          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.', param);
        },
        PUT: function PUT(param) {
          if (param.tick_expiry === 1) {
            // Tick trade
            return t.translate('[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].', param);
          }

          if (param.is_forward_starting === 1) {
            param.duration = _this.getDuration(param.date_expiry - param.date_start);
            param.date_start = _this.getDateTime(param.date_start);
            return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].', param);
          }

          if (_this.isDaily(param.date_expiry - param.date_start)) {
            // Daily normal constracts.
            param.date_expiry = 'close on ' + _this.getDate(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].', param);
          }

          if (param.fixed_expiry === 1) {
            //Fixed expiry
            param.date_expiry = _this.getDateTime(param.date_expiry);
            return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].', param);
          }
          // Intraday normal contracts having duration in minutes, seconds, or hours.
          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.', param);
        },
        SPREAD: function SPREAD() {
          return t.translate('Legacy contract. No further information is available.');
        }
      };
      if (typeof contract_map[bet_param.bet_type] === 'undefined') {
        return 'Invalid short code.';
      }
      return contract_map[bet_param.bet_type](bet_param);
    }

    //Returns duration in humanized format. Eg: 12 hours 1 minute 20 seconds

  }, {
    key: 'getDuration',
    value: function getDuration(diff) {
      var duration = (0, _utils.dateProcessor)(diff * 1000);
      var t = this.t;
      var duration_str = '';
      if (duration.days()) duration_str += t.translate('[n] day', '[n] days', {
        n: duration.days()
      });
      if (duration.hours()) duration_str += duration_str ? ' ' + t.translate('[n] hour', '[n] hours', {
        n: duration.hours()
      }) : t.translate('[n] hour', '[n] hours', {
        n: duration.hours()
      });
      if (duration.minutes()) duration_str += duration_str ? ' ' + t.translate('[n] minute', '[n] minutes', {
        n: duration.minutes()
      }) : t.translate('[n] minute', '[n] minutes', {
        n: duration.minutes()
      });
      if (duration.seconds()) duration_str += duration_str ? ' ' + t.translate('[n] second', '[n] seconds', {
        n: duration.seconds()
      }) : t.translate('[n] second', '[n] seconds', {
        n: duration.seconds()
      });

      return duration_str;
    }

    //Converts time stamp to date.

  }, {
    key: 'getDateTime',
    value: function getDateTime(ts) {
      return (0, _utils.dateProcessor)(ts * 1000).getDateTime() + ' GMT';
    }

    //Returns the date from timestamp.

  }, {
    key: 'getDate',
    value: function getDate(ts) {
      return (0, _utils.dateProcessor)(ts * 1000).getDate();
    }

    //Checks if contract is daily.

  }, {
    key: 'isDaily',
    value: function isDaily(diff) {
      return (0, _utils.dateProcessor)(diff * 1000).days() > 0;
    }
  }, {
    key: 'processBarrier',
    value: function processBarrier(param) {
      if (param.barrier_count === 0) {
        param.entry_spot = 'entry spot';
      } else if (param.barrier_count === 1) {
        if (param.barrier_absolute === 1) {
          param.entry_spot = param.barrier;
        } else {
          if (param.barrier > 0) param.entry_spot = 'entry spot plus ' + param.barrier.replace(/^[\+\-]/g, '');else param.entry_spot = 'entry spot minus ' + param.barrier.replace(/^[\+\-]/g, '');
        }
      } else if (param.barrier_absolute) {
        param.low_barrier_str = param.low_barrier;
        param.high_barrier_str = param.high_barrier;
      } else {
        param.low_barrier_str = param.low_barrier > 0 ? 'entry spot plus ' + param.low_barrier.replace(/^[\+\-]/g, '') : param.low_barrier < 0 ? 'entry spot minus ' + param.low_barrier.replace(/^[\+\-]/g, '') : 'entry spot';
        param.high_barrier_str = param.high_barrier > 0 ? 'entry spot plus ' + param.high_barrier.replace(/^[\+\-]/g, '') : param.high_barrier < 0 ? 'entry spot minus ' + param.high_barrier.replace(/^[\+\-]/g, '') : 'entry spot';
      }

      return param;
    }
  }]);

  return LongCode;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Longcode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get_bet_parameters = __webpack_require__(1);

var _longcode_generator = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Longcode = exports.Longcode = function () {
  function Longcode() {
    _classCallCheck(this, Longcode);

    if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) !== 'object') throw 'Param 1 containing active_symbols is missing.';
    this.active_symbols = arguments.length <= 0 ? undefined : arguments[0];
    this.lang = this.isLangSupported(arguments.length <= 1 ? undefined : arguments[1]) ? arguments.length <= 1 ? undefined : arguments[1] : 'en'; // EN is fallback language.
    this.currency = (arguments.length <= 2 ? undefined : arguments[2]) ? arguments.length <= 2 ? undefined : arguments[2] : this.isLangSupported(arguments.length <= 1 ? undefined : arguments[1]) ? 'USD' : (arguments.length <= 1 ? undefined : arguments[1]) ? arguments.length <= 1 ? undefined : arguments[1] : 'USD';
    this.longcode_gen = new _longcode_generator.LongCode(this.lang);
  }

  _createClass(Longcode, [{
    key: 'getActiveSymbols',
    value: function getActiveSymbols() {
      return this.active_symbols;
    }
  }, {
    key: 'getBetParameters',
    value: function getBetParameters(shortcode) {
      return (0, _get_bet_parameters.get_bet_parameters)(shortcode, this.currency, this.active_symbols);
    }
  }, {
    key: 'getCurrentLanguage',
    value: function getCurrentLanguage() {
      return this.lang;
    }
  }, {
    key: 'getCurrentCurrency',
    value: function getCurrentCurrency() {
      return this.currency;
    }
  }, {
    key: 'get',
    value: function get(shortcode) {
      var bet_param = this.getBetParameters(shortcode);
      return this.longcode_gen.get(bet_param);
    }
  }, {
    key: 'setCurrentLanguage',
    value: function setCurrentLanguage(lang) {
      this.lang = lang;
    }
  }, {
    key: 'setCurrentCurrency',
    value: function setCurrentCurrency(curr) {
      this.currency = curr;
    }
  }, {
    key: 'isLangSupported',
    value: function isLangSupported(lang) {
      lang = (lang || '').trim().toLowerCase();
      return lang === 'ar' || lang === 'de' || lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'id' || lang === 'it' || lang === 'th' || lang === 'ja' || lang === 'pl' || lang === 'pt' || lang === 'ru' || lang === 'vi' || lang === 'zn_cn' || lang === 'zh_tw';
    }
  }]);

  return Longcode;
}();

exports.default = {
  Longcode: Longcode
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Translation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// This is for testing purpose only.


var _de = __webpack_require__(5);

var _de2 = _interopRequireDefault(_de);

var _en = __webpack_require__(6);

var _en2 = _interopRequireDefault(_en);

var _es = __webpack_require__(7);

var _es2 = _interopRequireDefault(_es);

var _fr = __webpack_require__(8);

var _fr2 = _interopRequireDefault(_fr);

var _id = __webpack_require__(9);

var _id2 = _interopRequireDefault(_id);

var _it = __webpack_require__(10);

var _it2 = _interopRequireDefault(_it);

var _ja = __webpack_require__(11);

var _ja2 = _interopRequireDefault(_ja);

var _pl = __webpack_require__(12);

var _pl2 = _interopRequireDefault(_pl);

var _pt = __webpack_require__(13);

var _pt2 = _interopRequireDefault(_pt);

var _ru = __webpack_require__(14);

var _ru2 = _interopRequireDefault(_ru);

var _th = __webpack_require__(16);

var _th2 = _interopRequireDefault(_th);

var _vi = __webpack_require__(17);

var _vi2 = _interopRequireDefault(_vi);

var _zh_cn = __webpack_require__(18);

var _zh_cn2 = _interopRequireDefault(_zh_cn);

var _zh_tw = __webpack_require__(19);

var _zh_tw2 = _interopRequireDefault(_zh_tw);

var _test = __webpack_require__(15);

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lang_map = {
    de: _de2.default,
    en: _en2.default,
    es: _es2.default,
    fr: _fr2.default,
    id: _id2.default,
    it: _it2.default,
    ja: _ja2.default,
    pl: _pl2.default,
    pt: _pt2.default,
    ru: _ru2.default,
    th: _th2.default,
    vi: _vi2.default,
    zh_cn: _zh_cn2.default,
    zh_tw: _zh_tw2.default,
    test: _test2.default
};

var Translation = exports.Translation = function () {
    function Translation(lang) {
        _classCallCheck(this, Translation);

        this.lang = lang;
    }
    /**
     * 
     * @param {*} args include string to be translated, its plural form, 
     * and object containing key value pair for replacement in translated string.
     * 
     * For eg: translate('_n Hour','_n Hours',{'_n':2})
     * Note: The first key-value pair will be used to determine the plural form.
     * 
     */


    _createClass(Translation, [{
        key: "translate",
        value: function translate() {
            var curr_lang = lang_map[this.lang || 'en'];
            var str = arguments.length <= 0 ? undefined : arguments[0];
            var rt_str = void 0;

            if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'string') {
                // Plural conversion
                var replacer = arguments.length <= 2 ? undefined : arguments[2];
                var prop = Object.keys(replacer);
                if (replacer[prop[0]] == 0 || replacer[prop[0]] > 1) {
                    if (curr_lang[str] && curr_lang[str][2]) {
                        rt_str = curr_lang[str][2];
                    } else {
                        rt_str = curr_lang[str] && curr_lang[str][0] ? curr_lang[str][0] : arguments.length <= 1 ? undefined : arguments[1];
                    }
                } else {
                    rt_str = curr_lang[str] && curr_lang[str][1] ? curr_lang[str][1] : str;
                }
                // Replace variables in string with values.
                rt_str = this.replace(rt_str, replacer);
            } else {
                rt_str = curr_lang[str] && curr_lang[str][1] ? curr_lang[str][1] : str;
                // Replace variables in string with values.
                rt_str = this.replace(rt_str, arguments.length <= 1 ? undefined : arguments[1]);
            }

            return rt_str;
        }
    }, {
        key: "replace",
        value: function replace(str, obj) {
            if (!obj) return str;

            var prop = Object.keys(obj);
            while (prop.length) {
                var str_var = prop.shift();
                str = str.replace('[' + str_var + ']', obj[str_var]);
            }
            return str;
        }
    }]);

    return Translation;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn der letzte Tick [underlying] ausdrcklich hher als der Durchschnitt der [tick_count] Ticks ist."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn der letzte Tick [underlying] ausdrcklich niedriger als der Durchschnitt der [tick_count] Ticks ist."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] nach [tick_count] Ticks ausdrcklich hher ist als [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich hher als [entry_spot] zu [duration] nach [date_start] ist."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich hher als [entry_spot] zum [date_expiry] ist."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich hher als [entry_spot] zu [duration] nach der Startzeit des Kontrakts ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks nicht [barrier] ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks gerade ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks [barrier] ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks ungerade ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks hher als [barrier] ist."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"[currency] [amount] Auszahlung, wenn die letzte Ziffer des [underlying] nach [tick_count] Ticks niedriger als [barrier] ist."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] innerhalb [low_barrier_str] und [high_barrier_str] zum Schluss auf [date_expiry] endet."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] auerhalb [low_barrier_str] und [high_barrier_str] zum [date_expiry] endet."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] auerhalb [low_barrier_str] und [high_barrier_str] zu [duration] nach der Startzeit des Kontrakts endet."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich zwischen [low_barrier_str] und [high_barrier_str] zum Schluss auf [date_expiry] endet."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich zwischen [low_barrier_str] und [high_barrier_str] zum [date_expiry] endet."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich zwischen [low_barrier_str] und [high_barrier_str] zu [duration] nach der Startzeit des Kontrakts endet."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] nicht durch Schlieen zum [date_expiry] berhrt."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] nicht durch [date_expiry] berhrt."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] nicht durch [duration] nach der Startzeit des Kontraktes berhrt."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] durch Schlieen zum [date_expiry] berhrt."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] durch [date_expiry] berhrt."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] den [entry_spot] durch [duration] nach der Startzeit des Kontraktes berhrt."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] nach [tick_count] Ticks ausdrcklich niedriger ist, als [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich niedriger als [entry_spot] zu [duration] nach [date_start] ist."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich niedriger als [entry_spot] zum [date_expiry] ist."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"[currency] [amount] Auszahlung, wenn [underlying] ausdrcklich niedriger als [entry_spot] zu [duration] nach der Startzeit des Kontraktes ist."
	],
	"Legacy contract. No further information is available.": [
		null,
		"Erbschaftsvertrag. Es stehen keine weiteren Informationen zur Verfgung."
	],
	"[n] day": [
		"[n] days",
		"Form: One [n] Tag\nForm: Other [n] Tage",
		"Form: one: [n] Tag\nForm: other: [n] Tage"
	],
	"[n] hour": [
		"[n] hours",
		"Form: One [n] Stunde\nForm: Other [n] Stunden",
		"Form: One [n] Stunde\nForm: Other [n] Stunden"
	],
	"[n] minute": [
		"[n] minutes",
		"Form: One [n] Minute\nForm: Other [n] Minuten",
		""
	],
	"[n] second": [
		"[n] seconds",
		"Form: One [n] Sekunde\nForm: Other [n] Sekunden",
		""
	]
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"",
		""
	],
	"[n] hour": [
		"[n] hours",
		"",
		""
	],
	"[n] minute": [
		"[n] minutes",
		"",
		""
	],
	"[n] second": [
		"[n] seconds",
		"",
		""
	]
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"",
		""
	],
	"[n] hour": [
		"[n] hours",
		"",
		""
	],
	"[n] minute": [
		"[n] minutes",
		"",
		""
	],
	"[n] second": [
		"[n] seconds",
		"",
		""
	]
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"",
		""
	],
	"[n] hour": [
		"[n] hours",
		"",
		""
	],
	"[n] minute": [
		"[n] minutes",
		"",
		""
	],
	"[n] second": [
		"[n] seconds",
		"",
		""
	]
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika tik terakhir [underlying] pasti lebih tinggi dari rata-rata [tick_count] tik."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika tik terakhir [underlying] pasti lebih rendah dari rata-rata [tick_count] tik."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"Hasil [currency] [amount] jika [underlying] setelah [tick_count] tik pasti lebih tinggi dari [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih tinggi dari [entry_spot] selama [duration] setelah [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih tinggi dari [entry_spot] pada [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih tinggi dari [entry_spot] selama [duration] setelah waktu mulai kontrak."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] bukan [barrier] setelah [tick_count] tik."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] adalah genap setelah [tick_count] tik."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] adalah [barrier] setelah [tick_count] tik."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] adalah ganjil setelah [tick_count] tik."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] lebih tinggi dari [barrier] setelah [tick_count] tik."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"Hasil [currency] [amount] jika digit terakhir [underlying] lebih rendah [barrier] setelah [tick_count] tik."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] berakhir diluar [low_barrier_str] hingga [high_barrier_str] pada penutupan [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] berakhir diluar [low_barrier_str] hingga [high_barrier_str] pada [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] berakhir diluar [low_barrier_str] hingga [high_barrier_str] pada [duration] setelah waktu mulai kontrak."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti berakhir antara [low_barrier_str] hingga [high_barrier_str] pada penutupan [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti berakhir antara [low_barrier_str] hingga [high_barrier_str] pada [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] berakhir antara [low_barrier_str] hingga [high_barrier_str] pada [duration] setelah waktu mulai kontrak."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] tidak menyentuh [entry_spot] hingga penutupan [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] tidak menyentuh [entry_spot] hingga [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] tidak menyentuh [entry_spot] hingga [duration] setelah waktu mulai kontrak."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] menyentuh [entry_spot] hingga penutupan pada [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] menyentuh [entry_spot] hingga [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] menyentuh [entry_spot] hingga [duration] setelah waktu mulai kontak."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"Hasil [currency] [amount] jika [underlying] setelah [tick_count] tik pasti lebih rendah dari [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih rendah dari [entry_spot] selama [duration] setelah [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih rendah dari [entry_spot] pada [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"Hasil [currency] [amount] jika [underlying] pasti lebih rendah dari [entry_spot] selama [duration] setelah waktu mulai kontrak."
	],
	"Legacy contract. No further information is available.": [
		null,
		"Kontrak legacy. Tidak tersedia informasi lebih lanjut."
	],
	"[n] day": [
		"[n] days",
		"[n] hari"
	],
	"[n] hour": [
		"[n] hours",
		"[n] jam"
	],
	"[n] minute": [
		"[n] minutes",
		"[n] menit"
	],
	"[n] second": [
		"[n] seconds",
		"[n] detik"
	]
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"",
		""
	],
	"[n] hour": [
		"[n] hours",
		"",
		""
	],
	"[n] minute": [
		"[n] minutes",
		"",
		""
	],
	"[n] second": [
		"[n] seconds",
		"",
		""
	]
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		""
	],
	"[n] hour": [
		"[n] hours",
		""
	],
	"[n] minute": [
		"[n] minutes",
		""
	],
	"[n] second": [
		"[n] seconds",
		""
	]
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"Wypata w wysokoci [amount] [currency] nastpi, jeeli ostatni najmniejszy przyrost ceny, jaki wykazuje [underlying] jest wyszy ni rednia z [tick_count] najmniejszych przyrostw ceny."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"Wypata w wysokoci [amount] [currency] nastpi, jeeli ostatni najmniejszy przyrost ceny, jaki wykazuje [underlying] jest niszy ni rednia z [tick_count] najmniejszych przyrostw ceny."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"Wypata w wysokoci [amount] [currency] nastpi, jeeli warto, jak wskazuje [underlying] po [tick_count] najmniejszych przyrostach ceny jest wysza ni [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		"Nieaktualny kontrakt. Brak dodatkowych informacji."
	],
	"[n] day": [
		"[n] days",
		"dzie [n]",
		"",
		"[n] dni"
	],
	"[n] hour": [
		"[n] hours",
		"",
		"",
		""
	],
	"[n] minute": [
		"[n] minutes",
		"",
		"",
		""
	],
	"[n] second": [
		"[n] seconds",
		"",
		"",
		""
	]
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último tique-taque de [underlying] for estritamente superior à média dos [tick_count] tique-taques."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último tique-taque de [underlying] for estritamente inferior à média dos [tick_count] tique-taques."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"Prêmio de [amount] [currency] se [underlying], depois de [tick_count] tique-taques for estritamente superior a [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] for estritamente superior a [entry_spot] depois de [duration] desde [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"Prêmio de [currency] [amount] se [underlying] for estritamente superior a [entry_spot] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"Prêmio de [amount] [currency] se [underlying] for estritamente superior a [entry_spot] depois de [duration] desde a hora de início do contrato."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último dígito de [underlying] não for [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se último dígito de [underlying] for par depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último dígito de [underlying] for [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último dígito de [underlying] for ímpar depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último dígito de [underlying] for superior a [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"Prêmio de [amount] [currency] se o último dígito de [underlying] for inferior a [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] no fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Prêmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] depois de [duration] depois da hora de início do contrato."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] no fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Prêmio de [currency] [amount] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] depois de [duration] desde a hora de início do contrato."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] não tocar em [entry_spot] até ao fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] não tocar em [entry_spot] até [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"Prêmio de [amount] [currency] se [underlying] não tocar em [entry_spot] até [duration] depois da hora de início do contrato."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] toca em [entry_spot] até ao fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] toca em [entry_spot] até [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"Prêmio de [amount] [currency] se [underlying] toca em [entry_spot] até [duration] depois do início da hora de início do contrato."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] depois de [tick_count] tique-taques for estritamente inferior a [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] depois de [duration] desde [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"Prêmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"Prêmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] depois de [duration] desde a hora de início do contrato."
	],
	"Legacy contract. No further information is available.": [
		null,
		"Contrato herdado. Nenhumas informações adicionais disponíveis."
	],
	"[n] day": [
		"[n] days",
		"[n] dia",
		"[n] dias"
	],
	"[n] hour": [
		"[n] hours",
		"[n] hora",
		"[n] horas"
	],
	"[n] minute": [
		"[n] minutes",
		"[n] minuto",
		"[n] minutos"
	],
	"[n] second": [
		"[n] seconds",
		"[n] segundo",
		"[n] segundos"
	]
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]   ,     [tick_count] /."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]   ,    [tick_count] /."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"  [currency] [amount],  [underlying]  [tick_count] /    [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]  [duration]  [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]   [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]  [duration]    ."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]    [barrier]  [tick_count] /."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]     [tick_count]  (/)."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]   [barrier]  [tick_count]  (/)."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]     [tick_count]  (/)."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]   [barrier]  [tick_count]  (/)."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"  [currency] [amount],    [underlying]   [barrier]  [tick_count]  (/)."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]     [low_barrier_str]  [high_barrier_str]    [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]     [low_barrier_str]  [high_barrier_str]   [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]     [low_barrier_str]  [high_barrier_str]  [duration]    ."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]       [low_barrier_str]  [high_barrier_str]    [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]       [low_barrier_str]  [high_barrier_str]   [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]       [low_barrier_str]  [high_barrier_str]  [duration]   ."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]   [entry_spot]    [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]   [entry_spot]  [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]   [entry_spot]   [duration]   ."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]  [entry_spot]    [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]  [entry_spot]   [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]  [entry_spot]   [duration]   ."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"  [currency] [amount],  [underlying]  [tick_count] /    [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]  [duration]  [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]   [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"  [currency] [amount],  [underlying]    [entry_spot]   [duration]   ."
	],
	"Legacy contract. No further information is available.": [
		null,
		" .  ."
	],
	"[n] day": [
		"[n] days",
		"[n] .",
		"[n] .",
		"[n] ."
	],
	"[n] hour": [
		"[n] hours",
		"[n] .",
		"[n] .",
		"[n] ."
	],
	"[n] minute": [
		"[n] minutes",
		"[n] .",
		"[n] .",
		"[n] ."
	],
	"[n] second": [
		"[n] seconds",
		"[n] .",
		"[n] .",
		"[n] ."
	]
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
	"Enter a comma separated list of user names.": [
		null,
		"Eine kommagetrennte Liste von Benutzernamen."
	],
	"[_n] Second": [
		"[_n] Seconds",
		"[_n] Sekunde",
		"[_n] Sekunden"
	],
	"Hello": [
		null,
		""
	],
	"Hello [_n]!": [
		null,
		""
	],
	"How are you [name]?": [
		null,
		"Wie geht es dir [name]?"
	],
	"[_n] Hour": [
		"[_n] Hours",
		"",
		""
	]
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		""
	],
	"[n] hour": [
		"[n] hours",
		""
	],
	"[n] minute": [
		"[n] minutes",
		""
	],
	"[n] second": [
		"[n] seconds",
		""
	]
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		""
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		""
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		""
	],
	"[n] hour": [
		"[n] hours",
		""
	],
	"[n] minute": [
		"[n] minutes",
		""
	],
	"[n] second": [
		"[n] seconds",
		""
	]
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"[underlying] [tick_count]  [currency] [amount] "
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"[underlying] [tick_count]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"[tick_count] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start]  [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		" [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying]  [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying]  [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"[underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		" [duration] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		" [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		" [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"[tick_count] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start]  [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		" [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"[n] "
	],
	"[n] hour": [
		"[n] hours",
		"[n] "
	],
	"[n] minute": [
		"[n] minutes",
		"[n] "
	],
	"[n] second": [
		"[n] seconds",
		"[n] "
	]
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"[underlying] [tick_count]  [currency] [amount] "
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"[underlying] [tick_count]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"[tick_count] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"[duration] [underlying] [entry_spot]  [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying]  [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying]  [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] [underlying] [barrier] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"[duration] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"[duration] [underlying] [low_barrier_str] [high_barrier_str]  [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"[duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"[duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"[tick_count] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] [duration] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] [underlying] [entry_spot] [currency] [amount] "
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"[duration] [underlying] [entry_spot]  [currency] [amount] "
	],
	"Legacy contract. No further information is available.": [
		null,
		""
	],
	"[n] day": [
		"[n] days",
		"[n] "
	],
	"[n] hour": [
		"[n] hours",
		"[n] "
	],
	"[n] minute": [
		"[n] minutes",
		"[n] "
	],
	"[n] second": [
		"[n] seconds",
		"[n] "
	]
};

/***/ })
/******/ ]);
});