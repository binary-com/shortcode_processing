/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = chai;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const find = (array, fn) => {
    if (Array.prototype.find)
        return Array.prototype.find.call(array, fn);

    let i = 0;
    for (; i < array.length; i++)
        if (fn(array[i]))
            break;

    return array[i];
}
/* harmony export (immutable) */ __webpack_exports__["b"] = find;


const dateProcessor = (ts) => {
    ts = parseInt(ts);
    return {
        getDate: () => {
            const dateObj = new Date(ts);
            const date = ('0' + dateObj.getUTCDate()).slice('-2');
            const month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            const year = dateObj.getUTCFullYear();

            return [year, month, date].join('-');
        },
        getDateTime: () => {
            const dateObj = new Date(ts);
            const date = ('0' + dateObj.getUTCDate()).slice('-2');
            const month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            const year = dateObj.getUTCFullYear();
            const hours = ('0' + dateObj.getUTCHours()).slice('-2');
            const minutes = ('0' + dateObj.getUTCMinutes()).slice('-2');
            const seconds = ('0' + dateObj.getUTCSeconds()).slice('-2');

            return [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
        },
        days: () => {
            return parseInt(ts / (24 * 60 * 60 * 1000));
        },
        hours: () => {
            const day = 24 * 60 * 60 * 1000;
            return parseInt((ts % day) / (60 * 60 * 1000));
        },
        minutes: () => {
            const hour = 60 * 60 * 1000;
            return parseInt((ts % hour) / (60 * 1000));
        },
        seconds: () => {
            const minutes = 60 * 1000;
            return parseInt((ts % minutes) / 1000);
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dateProcessor;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__proposal_parameters__ = __webpack_require__(22);



/**
 * Created by Apoorv Joshi on 17/04/2017
 * @param {*} shortcode
 * @param {*} currency
 * @param {*} is_sold
 */
const get_bet_parameters = (shortcode, currency, active_symbols) => {
    let parameters = {
        bet_type: 'Invalid',
        underlying: 'config',
        currency: currency
    };
    // If shortcode is not provided or is not supported then throw error.
    if (!shortcode || (typeof shortcode !== 'string' && typeof shortcode !== 'object'))
        throw 'Shortcode not supported';

    if (!active_symbols)
        throw 'Active Symbols list not present';
    
    // in case someone sends the raw response from websocket.
    if(active_symbols.active_symbols)
        active_symbols = active_symbols.active_symbols;

    // For proposal response
    if (typeof shortcode === 'object') {
        const proposal_response = shortcode;
        if (!shortcode.proposal || !shortcode.echo_req) {
            throw 'Unsupported proposal response. Please pass the complete response with "echo_req".'
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__proposal_parameters__["a" /* get_proposal_parameters */])(proposal_response);
    }

    //Contracts with barrier
    let match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)_(S?-?\d+P?)_(S?-?\d+P?)$/);
    if (!match) { // Contracts without barriers. Eg: 'Asians'. (Not being racist, it is actually a contract type. Believe me!)
        match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)$/);
        if (match) {
            const underlying = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* find */])(active_symbols, underlying => underlying.symbol.toUpperCase() === match[2].toUpperCase());
            if (!underlying)
                throw 'Underlying not found';
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
            }
        } else { //Legacy contract
            if (/^SPREAD/.test(shortcode))
                parameters.bet_type = 'SPREAD';
        }
    } else { // Normal contracts with at least 1 barrier.
        const underlying = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* find */])(active_symbols, underlying => underlying.symbol.toUpperCase() === match[2].toUpperCase());
        if (!underlying)
            throw 'Underlying not found';
        const digits_after_decimal = underlying.pip ? ('' + underlying.pip).split('.')[1].length : 2;
        parameters = {
            shortcode: match[0],
            bet_type: match[1],
            underlying_symbol: match[2],
            underlying: underlying.display_name,
            amount_type: 'payout',
            amount: (+match[3]).toFixed(2),
            date_start: +match[4].toUpperCase().replace('F', '')
        }
        if (match[4].toUpperCase().indexOf('F') !== -1) parameters.is_forward_starting = 1;
        if (match[5].toUpperCase().indexOf('T') !== -1) { // Tick trade
            parameters.tick_expiry = 1;
            parameters.tick_count = +match[5].toUpperCase().replace('T', '');
        } else {
            if (match[5].toUpperCase().indexOf('F') !== -1) parameters.fixed_expiry = 1;
            parameters.date_expiry = +match[5].toUpperCase().replace('F', '')
        }
        if (match[6] === 'S0P') { // No barrier
            parameters.barrier_count = 0;
        } else if (match[7] === 'S0P' || +match[7] === 0) { //Only one barrier available
            parameters.barrier_count = 1;
            if (match[6].startsWith('S') && match[6].endsWith('P')) { //Relative barrier
                match[6] = match[6].replace('S', '').replace('P', '')
                parameters.barrier = (match[6] * underlying.pip).toFixed(digits_after_decimal);
            } else { //Absolute barrier
                parameters.barrier_absolute = 1;
                parameters.barrier = match[1].startsWith('DIGIT') ? match[6] : (match[6] / 1000000).toFixed(digits_after_decimal);
            }
        } else { // Two barriers available
            parameters.barrier_count = 2;
            if (match[6].startsWith('S') && match[6].endsWith('P')) { //Relative Barrier
                match[6] = match[6].replace('S', '').replace('P', '');
                match[7] = match[7].replace('S', '').replace('P', '')
                parameters.high_barrier = (match[6] * underlying.pip).toFixed(digits_after_decimal);
                parameters.low_barrier = (match[7] * underlying.pip).toFixed(digits_after_decimal);
            } else { //Absolute barrier
                parameters.barrier_absolute = 1;
                parameters.high_barrier = match[1].startsWith('DIGIT') ? +match[6] : (+match[6] / 1000000).toFixed(digits_after_decimal);
                parameters.low_barrier = match[1].startsWith('DIGIT') ? +match[7] : (+match[7] / 1000000).toFixed(digits_after_decimal);
            }
        }
    }


    parameters.currency = currency;

    return parameters;
}
/* harmony export (immutable) */ __webpack_exports__["a"] = get_bet_parameters;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translation_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(1);



class LongCode {

  constructor(lang) {
    this.t = new __WEBPACK_IMPORTED_MODULE_0__translation_js__["a" /* Translation */](lang);
  }

  // Returns longcode based on bet parameters.
  get(bet_param) {
    const _this = this;
    const t = this.t;
    bet_param = this.processBarrier(bet_param);
    const contract_map = {
      ASIANU: (param) => {
        return t.translate('[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.', param);
      },
      ASIAND: (param) => {
        return t.translate('[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.', param);
      },
      CALL: (param) => {
        if (param.tick_expiry === 1) { // Tick trade
          return t.translate('[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].', param)
        }

        if (param.is_forward_starting === 1) {
          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          param.date_start = _this.getDateTime(param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].', param)
        }

        if (_this.isDaily(param.date_expiry - param.date_start)) {
          // Daily normal constracts.
          param.date_expiry = 'close on ' + _this.getDate(param.date_expiry);
          return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].', param)
        }

        if (param.fixed_expiry === 1) { //Fixed expiry
          param.date_expiry = _this.getDateTime(param.date_expiry);
          return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].', param)
        }
        // Intraday normal contracts having duration in minutes, seconds, or hours.
        param.duration = _this.getDuration(param.date_expiry - param.date_start);
        return t.translate('[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.', param)
      },
      DIGITDIFF: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.', param);
      },
      DIGITEVEN: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.', param);
      },
      DIGITMATCH: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.', param);
      },
      DIGITODD: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.', param);
      },
      DIGITOVER: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.', param);
      },
      DIGITUNDER: (param) => {
        return t.translate('[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.', param);
      },
      EXPIRYMISS: (param) => {
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
      EXPIRYRANGE: (param) => {

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
      NOTOUCH: (param) => {
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
      ONETOUCH: (param) => {
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
      PUT: (param) => {
        if (param.tick_expiry === 1) { // Tick trade
          return t.translate('[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].', param)
        }

        if (param.is_forward_starting === 1) {
          param.duration = _this.getDuration(param.date_expiry - param.date_start);
          param.date_start = _this.getDateTime(param.date_start);
          return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].', param)
        }

        if (_this.isDaily(param.date_expiry - param.date_start)) {
          // Daily normal constracts.
          param.date_expiry = 'close on ' + _this.getDate(param.date_expiry);
          return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].', param)
        }

        if (param.fixed_expiry === 1) { //Fixed expiry
          param.date_expiry = _this.getDateTime(param.date_expiry);
          return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].', param)
        }
        // Intraday normal contracts having duration in minutes, seconds, or hours.
        param.duration = _this.getDuration(param.date_expiry - param.date_start);
        return t.translate('[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.', param)
      },
      SPREAD: () => {
        return t.translate('Legacy contract. No further information is available.');
      }
    };
    if(typeof contract_map[bet_param.bet_type] === 'undefined'){
      return 'Invalid short code.';
    }
    return contract_map[bet_param.bet_type](bet_param);
  }

  //Returns duration in humanized format. Eg: 12 hours 1 minute 20 seconds
  getDuration(diff) {
    const duration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* dateProcessor */])(diff * 1000);
    const t = this.t;
    let duration_str = '';
    if (duration.days()) duration_str += t.translate('[n] day', '[n] days', {
      n: duration.days()
    });
    if (duration.hours())
      duration_str += duration_str ? ' ' + t.translate('[n] hour', '[n] hours', {
        n: duration.hours()
      }) : t.translate('[n] hour', '[n] hours', {
        n: duration.hours()
      });
    if (duration.minutes())
      duration_str += duration_str ? ' ' + t.translate('[n] minute', '[n] minutes', {
        n: duration.minutes()
      }) : t.translate('[n] minute', '[n] minutes', {
        n: duration.minutes()
      });
    if (duration.seconds())
      duration_str += duration_str ? ' ' + t.translate('[n] second', '[n] seconds', {
        n: duration.seconds()
      }) : t.translate('[n] second', '[n] seconds', {
        n: duration.seconds()
      });

    return duration_str;
  }

  //Converts time stamp to date.
  getDateTime(ts) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* dateProcessor */])(ts * 1000).getDateTime() + ' GMT';
  }

  //Returns the date from timestamp.
  getDate(ts) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* dateProcessor */])(ts * 1000).getDate();
  }

  //Checks if contract is daily.
  isDaily(diff) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* dateProcessor */])(diff * 1000).days() > 0;
  }

  processBarrier(param) {
    if (param.barrier_count === 0) {
      param.entry_spot = 'entry spot';
    } else if (param.barrier_count === 1) {
      if (param.barrier_absolute === 1) {
        param.entry_spot = param.barrier;
      } else {
        if (param.barrier > 0)
          param.entry_spot = 'entry spot plus ' + param.barrier.replace(/^[\+\-]/g, '');
        else
          param.entry_spot = 'entry spot minus ' + param.barrier.replace(/^[\+\-]/g, '');
      }
    } else if (param.barrier_absolute) {
      param.low_barrier_str = param.low_barrier;
      param.high_barrier_str = param.high_barrier;
    } else {
      param.low_barrier_str = param.low_barrier > 0 ? 'entry spot plus ' + param.low_barrier.replace(/^[\+\-]/g, '') :
        param.low_barrier < 0 ? 'entry spot minus ' + param.low_barrier.replace(/^[\+\-]/g, '') : 'entry spot';
      param.high_barrier_str = param.high_barrier > 0 ? 'entry spot plus ' + param.high_barrier.replace(/^[\+\-]/g, '') :
        param.high_barrier < 0 ? 'entry spot minus ' + param.high_barrier.replace(/^[\+\-]/g, '') : 'entry spot';
    }

    return param;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LongCode;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_loader_po_loader_translation_de_po__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_json_loader_po_loader_translation_de_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_json_loader_po_loader_translation_de_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_loader_po_loader_translation_en_po__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_json_loader_po_loader_translation_en_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_json_loader_po_loader_translation_en_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_json_loader_po_loader_translation_es_po__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_json_loader_po_loader_translation_es_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_json_loader_po_loader_translation_es_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_json_loader_po_loader_translation_fr_po__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_json_loader_po_loader_translation_fr_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_json_loader_po_loader_translation_fr_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_loader_po_loader_translation_id_po__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_loader_po_loader_translation_id_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_loader_po_loader_translation_id_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_json_loader_po_loader_translation_it_po__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_json_loader_po_loader_translation_it_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_json_loader_po_loader_translation_it_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_json_loader_po_loader_translation_ja_po__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_json_loader_po_loader_translation_ja_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_json_loader_po_loader_translation_ja_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_json_loader_po_loader_translation_pl_po__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_json_loader_po_loader_translation_pl_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_json_loader_po_loader_translation_pl_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_json_loader_po_loader_translation_pt_po__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_json_loader_po_loader_translation_pt_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_json_loader_po_loader_translation_pt_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_json_loader_po_loader_translation_ru_po__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_json_loader_po_loader_translation_ru_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_json_loader_po_loader_translation_ru_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_json_loader_po_loader_translation_th_po__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_json_loader_po_loader_translation_th_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_json_loader_po_loader_translation_th_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_json_loader_po_loader_translation_vi_po__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_json_loader_po_loader_translation_vi_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_json_loader_po_loader_translation_vi_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_json_loader_po_loader_translation_zh_cn_po__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_json_loader_po_loader_translation_zh_cn_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_json_loader_po_loader_translation_zh_cn_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_json_loader_po_loader_translation_zh_tw_po__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_json_loader_po_loader_translation_zh_tw_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_json_loader_po_loader_translation_zh_tw_po__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_json_loader_po_loader_translation_test_po__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_json_loader_po_loader_translation_test_po___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_json_loader_po_loader_translation_test_po__);














// This is for testing purpose only.


const lang_map = {
    de: __WEBPACK_IMPORTED_MODULE_0_json_loader_po_loader_translation_de_po___default.a,
    en: __WEBPACK_IMPORTED_MODULE_1_json_loader_po_loader_translation_en_po___default.a,
    es: __WEBPACK_IMPORTED_MODULE_2_json_loader_po_loader_translation_es_po___default.a,
    fr: __WEBPACK_IMPORTED_MODULE_3_json_loader_po_loader_translation_fr_po___default.a,
    id: __WEBPACK_IMPORTED_MODULE_4_json_loader_po_loader_translation_id_po___default.a,
    it: __WEBPACK_IMPORTED_MODULE_5_json_loader_po_loader_translation_it_po___default.a,
    ja: __WEBPACK_IMPORTED_MODULE_6_json_loader_po_loader_translation_ja_po___default.a,
    pl: __WEBPACK_IMPORTED_MODULE_7_json_loader_po_loader_translation_pl_po___default.a,
    pt: __WEBPACK_IMPORTED_MODULE_8_json_loader_po_loader_translation_pt_po___default.a,
    ru: __WEBPACK_IMPORTED_MODULE_9_json_loader_po_loader_translation_ru_po___default.a,
    th: __WEBPACK_IMPORTED_MODULE_10_json_loader_po_loader_translation_th_po___default.a,
    vi: __WEBPACK_IMPORTED_MODULE_11_json_loader_po_loader_translation_vi_po___default.a,
    zh_cn: __WEBPACK_IMPORTED_MODULE_12_json_loader_po_loader_translation_zh_cn_po___default.a,
    zh_tw: __WEBPACK_IMPORTED_MODULE_13_json_loader_po_loader_translation_zh_tw_po___default.a,
    test: __WEBPACK_IMPORTED_MODULE_14_json_loader_po_loader_translation_test_po___default.a,
};

class Translation {
    constructor(lang) {
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
    translate(...args) {
        const curr_lang = lang_map[this.lang || 'en'];
        const str = args[0];
        let rt_str;

        if (typeof args[1] === 'string') { // Plural conversion
            const replacer = args[2];
            const prop = Object.keys(replacer);
            if (replacer[prop[0]] == 0 || replacer[prop[0]] > 1) {
                if (curr_lang[str] && curr_lang[str][2]) {
                    rt_str = curr_lang[str][2];
                } else {
                    rt_str = curr_lang[str] && curr_lang[str][0] ? curr_lang[str][0] : args[1];
                }
            } else {
                rt_str = curr_lang[str] && curr_lang[str][1] ? curr_lang[str][1] : str;
            }
            // Replace variables in string with values.
            rt_str = this.replace(rt_str, replacer);
        } else {
            rt_str = curr_lang[str] && curr_lang[str][1] ? curr_lang[str][1] : str;
            // Replace variables in string with values.
            rt_str = this.replace(rt_str, args[1]);
        }

        return rt_str;
    }

    replace(str, obj) {
        if (!obj) return str;

        const prop = Object.keys(obj);
        while (prop.length) {
            const str_var = prop.shift();
            str = str.replace('[' + str_var + ']', obj[str_var]);
        }
        return str;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Translation;



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./get_bet_parameters.test.js": 24,
	"./longcode.test.js": 25,
	"./longcode_generator.test.js": 26,
	"./translation.test.js": 27,
	"./util.test.js": 28
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
		"[n] Tag",
		"[n] Tage"
	],
	"[n] hour": [
		"[n] hours",
		"[n] Stunde",
		"[n] Stunden"
	],
	"[n] minute": [
		"[n] minutes",
		"[n] Minute",
		"[n] Minuten"
	],
	"[n] second": [
		"[n] seconds",
		"[n] Sekunde",
		"[n] Sekunden"
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
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 11 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 12 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 13 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 14 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo tique-taque de [underlying] for estritamente superior  mdia dos [tick_count] tique-taques."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo tique-taque de [underlying] for estritamente inferior  mdia dos [tick_count] tique-taques."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"Prmio de [amount] [currency] se [underlying], depois de [tick_count] tique-taques for estritamente superior a [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"Prmio de [amount] [currency] se [underlying] for estritamente superior a [entry_spot] depois de [duration] desde [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"Prmio de [currency] [amount] se [underlying] for estritamente superior a [entry_spot] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"Prmio de [amount] [currency] se [underlying] for estritamente superior a [entry_spot] depois de [duration] desde a hora de incio do contrato."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo dgito de [underlying] no for [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se ltimo dgito de [underlying] for par depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo dgito de [underlying] for [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo dgito de [underlying] for mpar depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo dgito de [underlying] for superior a [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"Prmio de [amount] [currency] se o ltimo dgito de [underlying] for inferior a [barrier] depois de [tick_count] tique-taques."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] no fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Prmio de [amount] [currency] se [underlying] terminar fora de [low_barrier_str] a [high_barrier_str] depois de [duration] depois da hora de incio do contrato."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] no fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Prmio de [currency] [amount] se [underlying] terminar estritamente entre [low_barrier_str] e [high_barrier_str] depois de [duration] desde a hora de incio do contrato."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] no tocar em [entry_spot] at ao fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] no tocar em [entry_spot] at [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"Prmio de [amount] [currency] se [underlying] no tocar em [entry_spot] at [duration] depois da hora de incio do contrato."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] toca em [entry_spot] at ao fecho em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] toca em [entry_spot] at [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"Prmio de [amount] [currency] se [underlying] toca em [entry_spot] at [duration] depois do incio da hora de incio do contrato."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"Prmio de [amount] [currency] se [underlying] depois de [tick_count] tique-taques for estritamente inferior a [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"Prmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] depois de [duration] desde [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"Prmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] em [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"Prmio de [amount] [currency] se [underlying] for estritamente inferior a [entry_spot] depois de [duration] desde a hora de incio do contrato."
	],
	"Legacy contract. No further information is available.": [
		null,
		"Contrato herdado. Nenhumas informaes adicionais disponveis."
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
/* 15 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя котировка [underlying] будет строго выше, чем общее среднее значение [tick_count] тика/ов."
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последний тик [underlying] будет строго ниже, чем среднее значение [tick_count] тика/ов."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] после [tick_count] тика/ов будет строго выше [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго выше [entry_spot] через [duration] после [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго выше [entry_spot] во время [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго выше [entry_spot] через [duration] после времени начала контракта."
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] не будет равна [barrier] после [tick_count] тика/ов."
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] будет чётным числом через [tick_count] тик (тика/тиков)."
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] совпадёт с [barrier] через [tick_count] тик (тика/тиков)."
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] будет нечётным числом через [tick_count] тик (тика/тиков)."
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] будет выше [barrier] через [tick_count] тик (тика/тиков)."
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"Получить выплату [currency] [amount], если последняя десятичная [underlying] будет ниже [barrier] через [tick_count] тик (тика/тиков)."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окажется вне диапазона от [low_barrier_str] до [high_barrier_str] на момент закрытия [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окажется вне диапазона от [low_barrier_str] до [high_barrier_str] на момент [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окажется вне диапазона от [low_barrier_str] до [high_barrier_str] через [duration] после времени начала контракта."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окажется строго в пределах диапазона от [low_barrier_str] до [high_barrier_str] на момент закрытия [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окончится строго в пределах диапазона от [low_barrier_str] до [high_barrier_str] в момент [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] окончится строго в пределах диапазона от [low_barrier_str] до [high_barrier_str] через [duration] после начала контракта."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] не коснётся [entry_spot] к моменту закрытия [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] не коснётся [entry_spot] до [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] не коснётся [entry_spot] в течение [duration] после начала контракта."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] коснётся [entry_spot] к моменту закрытия [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] коснётся [entry_spot] к моменту [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] коснётся [entry_spot] в течение [duration] после начала контракта."
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] после [tick_count] тика/ов будет строго ниже [entry_spot]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго ниже [entry_spot] через [duration] после [date_start]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго ниже [entry_spot] на момент [date_expiry]."
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"Получить выплату [currency] [amount], если [underlying] будет строго ниже [entry_spot] в течение [duration] после начала контракта."
	],
	"Legacy contract. No further information is available.": [
		null,
		"Традиционный контракт. Информация недоступна."
	],
	"[n] day": [
		"[n] days",
		"[n] дн.",
		"[n] дн.",
		"[n] дн."
	],
	"[n] hour": [
		"[n] hours",
		"[n] час.",
		"[n] час.",
		"[n] час."
	],
	"[n] minute": [
		"[n] minutes",
		"[n] мин.",
		"[n] мин.",
		"[n] мин."
	],
	"[n] second": [
		"[n] seconds",
		"[n] сек.",
		"[n] сек.",
		"[n] сек."
	]
};

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
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
/* 19 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"如果[underlying] 的最后跳动点严格高于[tick_count] 的平均跳动点，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"如果[underlying] 的最后跳动点严格低于[tick_count] 的平均跳动点，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"[tick_count] 跳动点后如果[underlying] 严格高于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] 后 [duration] 时如果[underlying] 严格高于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 严格高于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"合约开始后 [duration] 时如果[underlying] 严格高于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字不是[barrier]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字是偶数，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字是[barrier]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字是奇数，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字高于[barrier]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳动点后如果[underlying] 的最后数字低于[barrier]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] 闭市时如果[underlying] 平仓价在[low_barrier_str] 和[high_barrier_str] 范围外，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 平仓价在[low_barrier_str] 和[high_barrier_str] 范围外，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"合约开始后如果[underlying] 平仓价在[low_barrier_str] 和[high_barrier_str] 范围外，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] 闭市时如果[underlying] 严格收于[low_barrier_str] 和[high_barrier_str] 范围内，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 严格收于[low_barrier_str] 和[high_barrier_str] 范围内，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"合约开始后 [duration] 时如果[underlying] 严格收于[low_barrier_str] 和[high_barrier_str] 范围内，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] 闭市时如果[underlying] 未触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 未触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"合约开始后 [duration] 期内如果[underlying] 未触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] 闭市时如果[underlying] 触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"合约开始后 [duration] 期内如果[underlying] 触及[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"[tick_count] 跳动点后如果[underlying] 严格低于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] 后 [duration] 时如果[underlying] 严格低于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] 时如果[underlying] 严格低于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"合约开始后 [duration] 时如果[underlying] 严格低于[entry_spot]，可获取 [currency] [amount] 赔付额。"
	],
	"Legacy contract. No further information is available.": [
		null,
		"旧版合约。无法提供更加详细的信息。"
	],
	"[n] day": [
		"[n] days",
		"[n] 天"
	],
	"[n] hour": [
		"[n] hours",
		"[n] 小时"
	],
	"[n] minute": [
		"[n] minutes",
		"[n] 分钟"
	],
	"[n] second": [
		"[n] seconds",
		"[n] 秒"
	]
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
	"": {
		"content-type": "text/plain; charset=UTF-8"
	},
	"[currency] [amount] payout if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.": [
		null,
		"如果[underlying] 的最後跳動點嚴格高於[tick_count] 的平均跳動點，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.": [
		null,
		"如果[underlying] 的最後跳動點嚴格低於[tick_count] 的平均跳動點，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].": [
		null,
		"[tick_count] 跳動點後如果[underlying] 嚴格高於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] 後[duration] 時如果[underlying] 嚴格高於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 嚴格高於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly higher than [entry_spot] at [duration] after contract start time.": [
		null,
		"合約開始後[duration] 時如果[underlying] 嚴格高於[entry_spot] ，可獲得 [currency] [amount] 賠付。"
	],
	"[currency] [amount] payout if last digit of [underlying] is not [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字不是[barrier]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if last digit of [underlying] is even after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字是偶數，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if last digit of [underlying] is [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字是[barrier]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if last digit of [underlying] is odd after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字是奇數，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if last digit of [underlying] is higher than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字高於[barrier]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if last digit of [underlying] is lower than [barrier] after [tick_count] ticks.": [
		null,
		"[tick_count] 跳動點後如果[underlying] 的最後數字低於[barrier]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] 収市時如果[underlying] 平倉價在[low_barrier_str] 和[high_barrier_str] 範圍外，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 平倉價在[low_barrier_str] 和[high_barrier_str] 範圍外，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends outside [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"合約開始後[duration] 時如果[underlying] 平倉價在[low_barrier_str] 和[high_barrier_str] 範圍外，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at close on [date_expiry].": [
		null,
		"[date_expiry] 収市時如果[underlying] 嚴格収於[low_barrier_str] 和[high_barrier_str] 範圍內，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 嚴格収於[low_barrier_str] 和[high_barrier_str] 範圍內，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] ends strictly between [low_barrier_str] to [high_barrier_str] at [duration] after contract start time.": [
		null,
		"合約開始後[duration] 時如果[underlying] 嚴格収於[low_barrier_str] 和[high_barrier_str] 範圍內，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] 閉市時如果[underlying] 未觸及[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 未觸及[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] does not touch [entry_spot] through [duration] after contract start time.": [
		null,
		"合約開始後[duration] 期內如果[underlying] 未觸及[entry_spot]，可獲得 [currency] [amount] 賠付。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through close on [date_expiry].": [
		null,
		"[date_expiry] 閉市時如果[underlying] 觸及[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 觸及[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] touches [entry_spot] through [duration] after contract start time.": [
		null,
		"合約開始後[duration] 期內如果[underlying] 觸及[entry_spot]，可獲得 [currency] [amount] 賠付。"
	],
	"[currency] [amount] payout if [underlying] after [tick_count] ticks is strictly lower than [entry_spot].": [
		null,
		"[tick_count] 跳動點後如果[underlying] 嚴格低於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after [date_start].": [
		null,
		"[date_start] 後[duration] 時如果[underlying] 嚴格低於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [date_expiry].": [
		null,
		"[date_expiry] 時如果[underlying] 嚴格低於[entry_spot]，可獲得 [currency] [amount] 賠付額。"
	],
	"[currency] [amount] payout if [underlying] is strictly lower than [entry_spot] at [duration] after contract start time.": [
		null,
		"合約開始後[duration] 時如果[underlying] 嚴格低於[entry_spot] ，可獲得 [currency] [amount] 賠付。"
	],
	"Legacy contract. No further information is available.": [
		null,
		"舊版合約。無法提供更加詳細的資訊。"
	],
	"[n] day": [
		"[n] days",
		"[n] 天"
	],
	"[n] hour": [
		"[n] hours",
		"[n] 小時"
	],
	"[n] minute": [
		"[n] minutes",
		"[n] 分鐘"
	],
	"[n] second": [
		"[n] seconds",
		"[n] 秒"
	]
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_bet_parameters_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__longcode_generator_js__ = __webpack_require__(3);



class Longcode {
  constructor(...args) {
    if (typeof args[0] !== 'object')
      throw 'Param 1 containing active_symbols is missing.';
    this.active_symbols = args[0];
    this.lang = this.isLangSupported(args[1]) ? args[1] : 'en'; // EN is fallback language.
    this.currency = args[2] ? args[2] : this.isLangSupported(args[1]) ? 'USD' : args[1] ? args[1] : 'USD';
    this.longcode_gen = new __WEBPACK_IMPORTED_MODULE_1__longcode_generator_js__["a" /* LongCode */](this.lang);
  }

  getActiveSymbols() {
    return this.active_symbols;
  }

  getBetParameters(shortcode) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__get_bet_parameters_js__["a" /* get_bet_parameters */])(shortcode, this.currency, this.active_symbols);
  }

  getCurrentLanguage() {
    return this.lang;
  }

  getCurrentCurrency() {
    return this.currency;
  }

  get(shortcode) {
    const bet_param = this.getBetParameters(shortcode);
    return this.longcode_gen.get(bet_param);
  }

  setCurrentLanguage(lang) {
    this.lang = lang;
  }

  setCurrentCurrency(curr) {
    this.currency = curr;
  }

  isLangSupported(lang) {
    lang = (lang || '').trim().toLowerCase();
    return lang === 'ar' || lang === 'de' || lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'id' || lang === 'it' || lang === 'th'
      || lang === 'ja' || lang === 'pl' || lang === 'pt' || lang === 'ru' || lang === 'vi' || lang === 'zn_cn' || lang === 'zh_tw';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Longcode;


/* unused harmony default export */ var _unused_webpack_default_export = ({
  Longcode
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


const get_proposal_parameters = (proposal) => {
    const parameters = 1
    return parameters;
}
/* harmony export (immutable) */ __webpack_exports__["a"] = get_proposal_parameters;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var context = __webpack_require__(5);
context.keys().forEach(context);
module.exports = context;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chai__);



describe('get_bet_parameters', () => {
    const active_symbols = [{
        "allow_forward_starting": 1,
        "display_name": "Bull Market Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.0001",
        "submarket": "random_daily",
        "submarket_display_name": "Daily Reset Indices",
        "symbol": "RDBULL",
        "symbol_type": "stockindex"
    },
    {
        "allow_forward_starting": 1,
        "display_name": "Volatility 10 Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.001",
        "submarket": "random_index",
        "submarket_display_name": "Continuous Indices",
        "symbol": "R_10",
        "symbol_type": "stockindex"
    }];

    it('Throws error if active_symbols is undefined', () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(() => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('invalid_invalid', 'USD', undefined))
            .to.throw('Active Symbols list not present');
    });

    it('Sends "invalid" as bet_type for unsupported shortcodes', () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('invalid_invalid', 'USD', active_symbols).bet_type)
            .to.equal('Invalid');
    });

    describe('Barriers', () => {
        it('Contracts with no barriers (Asians)', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ASIANU_R_10_3.88_1492410252_5T', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 0,
                    shortcode: 'ASIANU_R_10_3.88_1492410252_5T',
                    bet_type: 'ASIANU',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount: '3.88',
                    date_start: 1492410252,
                    amount_type: 'payout',
                    tick_expiry: 1,
                    tick_count: 5,
                    currency: 'USD'
                });
        });

        it('Contracts with no barriers (Normal)', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492405008_5T_S0P_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 0,
                    shortcode: 'CALL_R_10_10_1492405008_5T_S0P_0',
                    bet_type: 'CALL',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '10.00',
                    date_start: 1492405008,
                    tick_expiry: 1,
                    tick_count: 5,
                    currency: 'USD'
                });
        });

        it('Contracts with 1 barriers', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_70.73_1492407012_5T_S1366P_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    shortcode: 'CALL_R_10_70.73_1492407012_5T_S1366P_0',
                    bet_type: 'CALL',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '70.73',
                    date_start: 1492407012,
                    tick_expiry: 1,
                    tick_count: 5,
                    barrier: '1.366',
                    currency: 'USD'
                });
        });

        it('Contracts with 2 barriers', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYRANGE_R_10_3.25_1492407769_1492407889_S1796P_S-1795P', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 2,
                    shortcode: 'EXPIRYRANGE_R_10_3.25_1492407769_1492407889_S1796P_S-1795P',
                    bet_type: 'EXPIRYRANGE',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '3.25',
                    date_start: 1492407769,
                    date_expiry: 1492407889,
                    high_barrier: '1.796',
                    low_barrier: '-1.795',
                    currency: 'USD'
                });
        });

        it('Contracts with 1 absolute barrier', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492585652_1492732799_10862000000_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier_absolute: 1,
                    barrier: '10862.000',
                    shortcode: 'CALL_R_10_10_1492585652_1492732799_10862000000_0',
                    bet_type: 'CALL',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '10.00',
                    date_start: 1492585652,
                    date_expiry: 1492732799,
                    currency: 'USD'
                });
        });

        it('Contracts with 2 absolute barrier', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYMISS_R_10_10_1492582188_1492732799F_10815110000_10811110000', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 2,
                    barrier_absolute: 1,
                    shortcode: 'EXPIRYMISS_R_10_10_1492582188_1492732799F_10815110000_10811110000',
                    bet_type: 'EXPIRYMISS',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '10.00',
                    date_start: 1492582188,
                    date_expiry: 1492732799,
                    fixed_expiry: 1,
                    high_barrier: '10815.110',
                    low_barrier: '10811.110',
                    currency: 'USD'
                });
        });
    })

    describe('Digits', () => {
        it('DIGITDIFF type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITDIFF_R_10_2.2_1492408062_5T_4_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '4',
                    barrier_absolute: 1,
                    shortcode: 'DIGITDIFF_R_10_2.2_1492408062_5T_4_0',
                    bet_type: 'DIGITDIFF',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '2.20',
                    date_start: 1492408062,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD'
                });
        });

        it('DIGITMATCH type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITMATCH_R_10_18.18_1492407891_5T_4_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '4',
                    barrier_absolute: 1,
                    shortcode: 'DIGITMATCH_R_10_18.18_1492407891_5T_4_0',
                    bet_type: 'DIGITMATCH',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '18.18',
                    date_start: 1492407891,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD'
                });
        });

        it('DIGITMATCH type contract with Barrier as 0', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITMATCH_R_10_18.18_1492407891_5T_0_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '0',
                    barrier_absolute: 1,
                    shortcode: 'DIGITMATCH_R_10_18.18_1492407891_5T_0_0',
                    bet_type: 'DIGITMATCH',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '18.18',
                    date_start: 1492407891,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD'
                });
        });

        it('DIGITOVER type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITOVER_R_10_4.88_1492408153_5T_5_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '5',
                    barrier_absolute: 1,
                    shortcode: 'DIGITOVER_R_10_4.88_1492408153_5T_5_0',
                    bet_type: 'DIGITOVER',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '4.88',
                    date_start: 1492408153,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD'
                });
        });

        it('DIGITUNDER type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITUNDER_R_10_2.82_1492408225_5T_7_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '7',
                    barrier_absolute: 1,
                    shortcode: 'DIGITUNDER_R_10_2.82_1492408225_5T_7_0',
                    bet_type: 'DIGITUNDER',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '2.82',
                    date_start: 1492408225,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD'
                });
        });

        it('DIGITODD type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITODD_R_10_3.92_1492408262_5T_0_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '0',
                    barrier_absolute: 1,
                    shortcode: 'DIGITODD_R_10_3.92_1492408262_5T_0_0',
                    bet_type: 'DIGITODD',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '3.92',
                    date_start: 1492408262,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD',
                });
        });

        it('DIGITEVEN type contract', () => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITEVEN_R_10_3.92_1492410208_5T_0_0', 'USD', active_symbols))
                .to.deep.equal({
                    barrier_count: 1,
                    barrier: '0',
                    barrier_absolute: 1,
                    shortcode: 'DIGITEVEN_R_10_3.92_1492410208_5T_0_0',
                    bet_type: 'DIGITEVEN',
                    underlying: "Volatility 10 Index",
                    underlying_symbol: 'R_10',
                    amount_type: 'payout',
                    amount: '3.92',
                    date_start: 1492410208,
                    tick_count: 5,
                    tick_expiry: 1,
                    currency: 'USD',
                });
        });
    });

    it('Returns bet_type as SPREAD for legacy contracts', () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_get_bet_parameters_js__["a" /* get_bet_parameters */])("SPREADU_R_10_1_1490952253_1_1.55_POINT", 'USD', active_symbols).bet_type)
            .to.equal('SPREAD');
    })
});


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chai__);



describe('Main module', () => {
  let active_symbols;

  before(() => {
    active_symbols = [{
      "allow_forward_starting": 1,
      "display_name": "Bull Market Index",
      "exchange_is_open": 1,
      "is_trading_suspended": 0,
      "market": "volidx",
      "market_display_name": "Volatility Indices",
      "pip": "0.0001",
      "submarket": "random_daily",
      "submarket_display_name": "Daily Reset Indices",
      "symbol": "RDBULL",
      "symbol_type": "stockindex"
    },
    {
      "allow_forward_starting": 1,
      "display_name": "Volatility 10 Index",
      "exchange_is_open": 1,
      "is_trading_suspended": 0,
      "market": "volidx",
      "market_display_name": "Volatility Indices",
      "pip": "0.001",
      "submarket": "random_index",
      "submarket_display_name": "Continuous Indices",
      "symbol": "R_10",
      "symbol_type": "stockindex"
    }];
  });

  it('Constructor test', () => {
    let sp = new __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__["a" /* Longcode */](active_symbols, 'EUR');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(sp.getCurrentCurrency()).to.equal('EUR');
    sp = new __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__["a" /* Longcode */](active_symbols);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(sp.getCurrentCurrency()).to.equal('USD');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(sp.getCurrentLanguage()).to.equal('en');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(() => { new __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__["a" /* Longcode */]() }).to.throw('Param 1 containing active_symbols is missing.');
  });

  it('Returns bet parameter', () => {
    let sp = new __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__["a" /* Longcode */](active_symbols, 'en', 'EUR');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(sp.getBetParameters('CALL_R_10_70.73_1492407012_5T_S1366P_0')).to.deep.equal({
      amount: '70.73',
      amount_type: 'payout',
      barrier: '1.366',
      barrier_count: 1,
      bet_type: 'CALL',
      currency: 'EUR',
      date_start: 1492407012,
      shortcode: 'CALL_R_10_70.73_1492407012_5T_S1366P_0',
      tick_count: 5,
      tick_expiry: 1,
      underlying: 'Volatility 10 Index',
      underlying_symbol: 'R_10'
    });
  });

  it('Returns longcode', () => {
    let longcode = new __WEBPACK_IMPORTED_MODULE_0__src_longcode_js__["a" /* Longcode */](active_symbols, 'en', 'EUR');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(longcode.get('EXPIRYRANGE_RDBULL_10_1492589411_1492590000F_S1776P_S-1775P')).to.equal('EUR 10.00 payout if Bull' +
      ' Market Index ends strictly between entry spot minus 0.1775 to entry spot plus 0.1776 at 2017-04-19 08:20:00 GMT.');
  });
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_longcode_generator_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chai__);




describe('Longcode Generator', () => {
    const active_symbols = [{
        "allow_forward_starting": 1,
        "display_name": "Bull Market Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.0001",
        "submarket": "random_daily",
        "submarket_display_name": "Daily Reset Indices",
        "symbol": "RDBULL",
        "symbol_type": "stockindex"
    },
    {
        "allow_forward_starting": 1,
        "display_name": "Volatility 10 Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.001",
        "submarket": "random_index",
        "submarket_display_name": "Continuous Indices",
        "symbol": "R_10",
        "symbol_type": "stockindex"
    }];
    const longcode = new __WEBPACK_IMPORTED_MODULE_0__src_longcode_generator_js__["a" /* LongCode */]('en')

    describe('ASIAN', () => {
        it('ASIANU contract type.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ASIANU_R_10_3.88_1492410252_5T', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 3.88 payout if the last tick of Volatility 10 Index is strictly higher than the average of the 5 ticks.');
        });

        it('ASIAND contract type.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ASIAND_R_10_3.88_1492410530_5T', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 3.88 payout if the last tick of Volatility 10 Index is strictly lower than the average of the 5 ticks.');
        });
    });

    describe('CALL', () => {
        it('Contract having no barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492495694_5T_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly higher than entry spot.');
        });

        it('Contract having +ve barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492495842_5T_S364P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly higher than entry spot plus 0.364.');
        });

        it('Contract having -ve barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492496024_5T_S-364P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly higher than entry spot minus 0.364.');
        });

        it('Contracts having +ve barrier and hours as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492585037_1492592365_S628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot plus 0.628 at 2 hours 2 minutes 8 seconds after contract start time.')
        });

        it('Contracts having -ve barrier and hours as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492585037_1492592365_S-628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot minus 0.628 at 2 hours 2 minutes 8 seconds after contract start time.')
        });

        it('Contracts having absolute barrier and days as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492585652_1492732799_10862000000_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than 10862.000 at close on 2017-04-20.')
        });

        it('Forward starting contract.', () => {
            let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492498500F_1492502760_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at 1 hour 11 minutes after 2017-04-18 06:55:00 GMT.');
            param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492501500F_1492552200F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at 14 hours 5 minutes after 2017-04-18 07:45:00 GMT.');
        });

        it('Intraday contract having fixed expiry.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492501145_1492559400F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at 2017-04-18 23:50:00 GMT.');
        });

        it('Daily contract having fixed expiry.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492501623_1493423999F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at close on 2017-04-28.');
        });

        it('Normal contracts.', () => {
            let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492501916_1492505656_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at 1 hour 2 minutes 20 seconds after contract start time.');
            param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('CALL_R_10_10_1492502097_1493596799_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at close on 2017-04-30.');
        });
    });

    describe('DIGIT', () => {
        it('DIGITDIFF contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITDIFF_R_10_2.2_1492408062_5T_4_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 2.20 payout if last digit of Volatility 10 Index is not 4 after 5 ticks.');
        });

        it('DIGITEVEN contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITEVEN_R_10_3.92_1492410208_5T_0_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 3.92 payout if last digit of Volatility 10 Index is even after 5 ticks.');
        });

        it('DIGITMATCH contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITMATCH_R_10_18.18_1492407891_5T_4_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 18.18 payout if last digit of Volatility 10 Index is 4 after 5 ticks.');
        });

        it('DIGITMATCH contracts with barrier as "0"', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITMATCH_R_10_18.18_1492407891_5T_0_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 18.18 payout if last digit of Volatility 10 Index is 0 after 5 ticks.');
        });

        it('DIGITODD contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITODD_R_10_3.92_1492408262_5T_0_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 3.92 payout if last digit of Volatility 10 Index is odd after 5 ticks.');
        });

        it('DIGITOVER contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITOVER_R_10_4.88_1492408153_5T_5_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 4.88 payout if last digit of Volatility 10 Index is higher than 5 after 5 ticks.');
        });

        it('DIGITUNDER contracts', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('DIGITUNDER_R_10_2.82_1492408225_5T_7_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 2.82 payout if last digit of Volatility 10 Index is lower than 7 after 5 ticks.');
        });
    });

    describe('EXPIRY', () => {
        describe('EXPIRYMISS', () => {
            it('Fixed expiry contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYMISS_R_10_10_1492580629_1492580760F_S1776P_S-1775P', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends outside entry spot minus 1.775 to entry spot plus 1.776 at 2017-04-19 05:46:00 GMT.');
            });

            it('Daily contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYMISS_R_10_10_1492586396_1492732799_10815110000_10811123000', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends outside 10811.123 to 10815.110 at close on 2017-04-20.');
            });

            it('Duration contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYMISS_R_10_10_1492587192_1492592712_S1776P_S-1775P', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends outside entry spot minus 1.775 to entry spot plus 1.776 at 1 hour 32 minutes after contract start time.');
            });
        });

        describe('EXPIRYRANGE', () => {
            it('Fixed expiry contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYRANGE_R_10_10_1492589411_1492590000F_S1776P_S-1775P', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends strictly between entry spot minus 1.775 to entry spot plus 1.776 at 2017-04-19 08:20:00 GMT.');
            });

            it('Daily contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYRANGE_R_10_10_1492589155_1492732799_10860715000_10765447000', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends strictly between 10765.447 to 10860.715 at close on 2017-04-20.');
            });

            it('Duration contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('EXPIRYRANGE_R_10_10_1492588292_1492593812_S1776P_S-1775P', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index ends strictly between entry spot minus 1.775 to entry spot plus 1.776 at 1 hour 32 minutes after contract start time.');
            });
        });
    });

    describe('TOUCH', () => {
        describe('NOTOUCH', () => {
            it('Fixed expiry contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('NOTOUCH_R_10_10_1492592137_1492592280F_S1000P_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index does not touch entry spot plus 1.000 through 2017-04-19 08:58:00 GMT.');
            });
            it('Daily contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('NOTOUCH_R_10_10_1492592475_1492732799_10860715000_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index does not touch 10860.715 through close on 2017-04-20.');
            });
            it('Duration contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('NOTOUCH_R_10_10_1492592618_1492597118_S5000P_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index does not touch entry spot plus 5.000 through 1 hour 15 minutes after contract start time.');
            })
        });

        describe('ONETOUCH', () => {
            it('Fixed expiry contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ONETOUCH_R_10_10_1492594876_1492617000F_S628P_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index touches entry spot plus 0.628 through 2017-04-19 15:50:00 GMT.');
            });
            it('Daily contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ONETOUCH_R_10_10_1492594822_1492732799_10862018000_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index touches 10862.018 through close on 2017-04-20.');
            });
            it('Duration contracts', () => {
                let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('ONETOUCH_R_10_10_1492594129_1492599649_S628P_0', 'USD', active_symbols);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index touches entry spot plus 0.628 through 1 hour 32 minutes after contract start time.');
            });
        });
    });

    describe('PUT', () => {
        it('Contract having no barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492596425_5T_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly lower than entry spot.');
        });

        it('Contract having +ve barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492596389_5T_S628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly lower than entry spot plus 0.628.');
        });

        it('Contract having -ve barrier and tick as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492596328_5T_S-628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index after 5 ticks is strictly lower than entry spot minus 0.628.');
        });

        it('Contracts having +ve barrier and hours as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492596187_1492653787_S628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot plus 0.628 at 16 hours after contract start time.')
        });

        it('Contracts having -ve barrier and hours as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595967_1492653567_S-628P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot minus 0.628 at 16 hours after contract start time.')
        });

        it('Contracts having absolute barrier and days as duration.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595891_1492732799_10862018000_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than 10862.018 at close on 2017-04-20.')
        });

        it('Forward starting contract.', () => {
            let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595700F_1492609020_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at 3 hours 42 minutes after 2017-04-19 09:55:00 GMT.');
            param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492596300F_1492617000F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at 5 hours 45 minutes after 2017-04-19 10:05:00 GMT.');
        });

        it('Intraday contract having fixed expiry.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595519_1492617000F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at 2017-04-19 15:50:00 GMT.');
        });

        it('Daily contract having fixed expiry.', () => {
            const param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595588_1492819199F_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at close on 2017-04-21.');
        });

        it('Normal contracts.', () => {
            let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595816_1492600816_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at 1 hour 23 minutes 20 seconds after contract start time.');
            param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('PUT_R_10_10_1492595725_1492732799_S0P_0', 'USD', active_symbols);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('USD 10.00 payout if Volatility 10 Index is strictly lower than entry spot at close on 2017-04-20.');
        });
    });

    it('Detects invalid contracts', () => {
        let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('Some_invalid_longcode', 'USD', active_symbols);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('Invalid short code.');
    });

    it('Detects legacy contracts', () => {
        let param = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_get_bet_parameters_js__["a" /* get_bet_parameters */])('SPREADU_R_10_1_1490952253_1_1.55_POINT', 'USD', active_symbols);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_chai__["expect"])(longcode.get(param)).to.equal('Legacy contract. No further information is available.');
    });
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_translation_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chai__);



describe("Translations", () => {
    let translate;
    before(() => {
        const t = new __WEBPACK_IMPORTED_MODULE_0__src_translation_js__["a" /* Translation */]('test');
        translate = (...args) => {
            return t.translate(...args);
        }
    });

    it("Returns the string if no translation is present.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('Hello')).to.equal('Hello');
    });

    it("Returns the string after replacing var in it if no translation is present.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('Hello [_n]!', { _n: 'John Doe' }))
            .to.equal('Hello John Doe!');
    });

    it("Returns translated string.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('Enter a comma separated list of user names.'))
            .to.equal('Eine kommagetrennte Liste von Benutzernamen.');
    });

    it("Returns translated string and replaces variable in it.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('How are you [name]?', { name: 'John Doe' }))
            .to.equal('Wie geht es dir John Doe?');
    });

    it("Returns untranslated singular string based on variable and replaces variable in it.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Hour', '[_n] Hours', { _n: 1 }))
            .to.equal('1 Hour');
    });

    it("Returns untranslated plural string based on variable and replaces variable in it.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Hour', '[_n] Hours', { _n: 2 }))
            .to.equal('2 Hours');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Hour', '[_n] Hours', { _n: 0 }))
            .to.equal('0 Hours');
    });

    it("Returns translated singular string based on variable and replaces variable in it.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Second', '[_n] Seconds', { _n: 1 }))
            .to.equal('1 Sekunde');
    });

    it("Returns translated plural string based on variable and replaces variable in it.", () => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Second', '[_n] Seconds', { _n: 2 }))
            .to.equal('2 Sekunden');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(translate('[_n] Second', '[_n] Seconds', { _n: 0 }))
            .to.equal('0 Sekunden');
    });
})


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chai__);



describe('Duration', () => {
    it('returns date', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])(1492732799 * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.getDate()).to.equal('2017-04-20');
    });

    it('returns date and time', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])(1492592280 * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.getDateTime()).to.equal('2017-04-19 08:58:00');
    });

    it('returns day', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])(1492592280 * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.getDateTime()).to.equal('2017-04-19 08:58:00');
    });

    it('returns hours', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])((1492600816 - 1492595816) * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.hours()).to.equal(1);
    });

    it('returns minutes', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])((1492600816 - 1492595816) * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.minutes()).to.equal(23);
    });

    it('returns seconds', () => {
        const d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["a" /* dateProcessor */])((1492600816 - 1492595816) * 1000);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_chai__["expect"])(d.seconds()).to.equal(20);
    });
})

/***/ })
/******/ ]);