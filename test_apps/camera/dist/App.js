/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __webpack_require__(25);
exports.Asset = Asset_1.Asset;
const AssetType_1 = __webpack_require__(4);
exports.AssetType = AssetType_1.AssetType;
const AssetState_1 = __webpack_require__(10);
exports.AssetState = AssetState_1.AssetState;
const AssetFactory_1 = __webpack_require__(26);
exports.AssetFactory = AssetFactory_1.AssetFactory;
const AssetGroup_1 = __webpack_require__(11);
exports.AssetGroup = AssetGroup_1.AssetGroup;
const AssetGroupLoader_1 = __webpack_require__(27);
exports.AssetGroupLoader = AssetGroupLoader_1.AssetGroupLoader;
const AssetLoader_1 = __webpack_require__(28);
exports.AssetLoader = AssetLoader_1.AssetLoader;
const AudioLoader_1 = __webpack_require__(30);
exports.AudioLoader = AudioLoader_1.AudioLoader;
const ImageLoader_1 = __webpack_require__(31);
exports.ImageLoader = ImageLoader_1.ImageLoader;
const JSONLoader_1 = __webpack_require__(32);
exports.JSONLoader = JSONLoader_1.JSONLoader;
const TextAssetBuilder_1 = __webpack_require__(33);
exports.TextAssetBuilder = TextAssetBuilder_1.TextAssetBuilder;
const Spritesheet_1 = __webpack_require__(34);
exports.Spritesheet = Spritesheet_1.Spritesheet;
const Animation_1 = __webpack_require__(35);
exports.Animation = Animation_1.Animation;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SeverityEnum_1 = __webpack_require__(6);
exports.SeverityEnum = SeverityEnum_1.SeverityEnum;
const Camera_1 = __webpack_require__(18);
exports.Camera = Camera_1.Camera;
const IDGenerator_1 = __webpack_require__(19);
exports.IDGenerator = IDGenerator_1.IDGenerator;
const Iterator_1 = __webpack_require__(7);
exports.Iterator = Iterator_1.Iterator;
const LogManager_1 = __webpack_require__(20);
exports.LogManager = LogManager_1.LogManager;
const ViewPort_1 = __webpack_require__(21);
exports.ViewPort = ViewPort_1.ViewPort;
const CollisionEmitter_1 = __webpack_require__(22);
exports.CollisionEmitter = CollisionEmitter_1.CollisionEmitter;
const Color_1 = __webpack_require__(23);
exports.Color = Color_1.Color;
const ColorCode_1 = __webpack_require__(8);
exports.ColorCode = ColorCode_1.ColorCode;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
var instance = null;
var setInstance = (game) => {
    if (instance) {
        instance.getLogManager().log(utils_1.SeverityEnum.WARNING, 'Instance has already been set! Are you instantiating more than one game?');
    }
    instance = game;
};
exports.setInstance = setInstance;
var getInstance = () => {
    return instance;
};
exports.getInstance = getInstance;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetType;
(function (AssetType) {
    AssetType["RAW"] = "raw";
    AssetType["IMAGE"] = "image";
    AssetType["AUDIO"] = "audio";
    AssetType["JSON"] = "json";
})(AssetType = exports.AssetType || (exports.AssetType = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LogicEngine_1 = __webpack_require__(37);
exports.LogicEngine = LogicEngine_1.LogicEngine;
const GroupLogicEngine_1 = __webpack_require__(38);
exports.GroupLogicEngine = GroupLogicEngine_1.GroupLogicEngine;
const RenderingEngine_1 = __webpack_require__(39);
exports.RenderingEngine = RenderingEngine_1.RenderingEngine;
const TwoDimensionalRenderingEngine_1 = __webpack_require__(40);
exports.TwoDimensionalRenderingEngine = TwoDimensionalRenderingEngine_1.TwoDimensionalRenderingEngine;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum;
(function (SeverityEnum) {
    SeverityEnum[SeverityEnum["DEBUG"] = 0] = "DEBUG";
    SeverityEnum[SeverityEnum["INFO"] = 1] = "INFO";
    SeverityEnum[SeverityEnum["WARNING"] = 2] = "WARNING";
    SeverityEnum[SeverityEnum["ERROR"] = 3] = "ERROR";
    SeverityEnum[SeverityEnum["DEPRECATE"] = 4] = "DEPRECATE";
})(SeverityEnum = exports.SeverityEnum || (exports.SeverityEnum = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Iterator {
    constructor(array) {
        this._array = array;
        this._index = -1;
    }
    hasNext() {
        if (this._array[this._index + 1]) {
            return true;
        }
        else {
            return false;
        }
    }
    next() {
        this._index += 1;
        return this._array[this._index];
    }
    hasPrev() {
        if (this._array[this._index]) {
            return true;
        }
        else {
            return false;
        }
    }
    prev() {
        return this._array[this._index--];
    }
    setToBeginning() {
        this._index = -1;
    }
    setToEnd() {
        this._index = this._array.length;
    }
    getFirst() {
        return this._array[0];
    }
    getLast() {
        return this._array[this._array.length - 1];
    }
}
exports.Iterator = Iterator;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorCode;
(function (ColorCode) {
    ColorCode[ColorCode["ALICE_BLUE"] = 15792383] = "ALICE_BLUE";
    ColorCode[ColorCode["ANTIQUE_WHITE"] = 16444375] = "ANTIQUE_WHITE";
    ColorCode[ColorCode["AQUA"] = 65535] = "AQUA";
    ColorCode[ColorCode["AQUAMARINE"] = 8388564] = "AQUAMARINE";
    ColorCode[ColorCode["AZURE"] = 15794175] = "AZURE";
    ColorCode[ColorCode["BEIGE"] = 16119260] = "BEIGE";
    ColorCode[ColorCode["BISQUE"] = 16770244] = "BISQUE";
    ColorCode[ColorCode["BLACK"] = 0] = "BLACK";
    ColorCode[ColorCode["BLANCHED_ALMOND"] = 16772045] = "BLANCHED_ALMOND";
    ColorCode[ColorCode["BLUE"] = 255] = "BLUE";
    ColorCode[ColorCode["BLUE_VIOLET"] = 9055202] = "BLUE_VIOLET";
    ColorCode[ColorCode["BROWN"] = 10824234] = "BROWN";
    ColorCode[ColorCode["BURLY_WOOD"] = 14596231] = "BURLY_WOOD";
    ColorCode[ColorCode["CADET_BLUE"] = 6266528] = "CADET_BLUE";
    ColorCode[ColorCode["CHART_REUSE"] = 8388352] = "CHART_REUSE";
    ColorCode[ColorCode["CHOCOLATE"] = 13789470] = "CHOCOLATE";
    ColorCode[ColorCode["CORAL"] = 16744272] = "CORAL";
    ColorCode[ColorCode["CORNFLOWER_BLUE"] = 6591981] = "CORNFLOWER_BLUE";
    ColorCode[ColorCode["CORN_SILK"] = 16775388] = "CORN_SILK";
    ColorCode[ColorCode["CRIMSON"] = 14423100] = "CRIMSON";
    ColorCode[ColorCode["CYAN"] = 65535] = "CYAN";
    ColorCode[ColorCode["DARK_BLUE"] = 139] = "DARK_BLUE";
    ColorCode[ColorCode["DARK_CYAN"] = 35723] = "DARK_CYAN";
    ColorCode[ColorCode["DARK_GOLDENROD"] = 12092939] = "DARK_GOLDENROD";
    ColorCode[ColorCode["DARK_GRAY"] = 11119017] = "DARK_GRAY";
    ColorCode[ColorCode["DARK_GREY"] = 11119017] = "DARK_GREY";
    ColorCode[ColorCode["DARK_GREEN"] = 25600] = "DARK_GREEN";
    ColorCode[ColorCode["DARK_KHAKI"] = 12433259] = "DARK_KHAKI";
    ColorCode[ColorCode["DARK_MAGENTA"] = 9109643] = "DARK_MAGENTA";
    ColorCode[ColorCode["DARK_OLIVE_GREEN"] = 5597999] = "DARK_OLIVE_GREEN";
    ColorCode[ColorCode["DARK_ORANGE"] = 16747520] = "DARK_ORANGE";
    ColorCode[ColorCode["DARK_ORCHID"] = 10040012] = "DARK_ORCHID";
    ColorCode[ColorCode["DARK_RED"] = 9109504] = "DARK_RED";
    ColorCode[ColorCode["DARK_SALMON"] = 15308410] = "DARK_SALMON";
    ColorCode[ColorCode["DARK_SEA_GREEN"] = 9419919] = "DARK_SEA_GREEN";
    ColorCode[ColorCode["DARK_SLATE_BLUE"] = 4734347] = "DARK_SLATE_BLUE";
    ColorCode[ColorCode["DARK_SLATE_GRAY"] = 3100495] = "DARK_SLATE_GRAY";
    ColorCode[ColorCode["DARK_SLATE_GREY"] = 3100495] = "DARK_SLATE_GREY";
    ColorCode[ColorCode["DARK_TORQUOISE"] = 52945] = "DARK_TORQUOISE";
    ColorCode[ColorCode["DARK_VIOLET"] = 9699539] = "DARK_VIOLET";
    ColorCode[ColorCode["DEEP_PINK"] = 16716947] = "DEEP_PINK";
    ColorCode[ColorCode["DEEP_SKY_BLUE"] = 49151] = "DEEP_SKY_BLUE";
    ColorCode[ColorCode["DIM_GRAY"] = 6908265] = "DIM_GRAY";
    ColorCode[ColorCode["DIM_GREY"] = 6908265] = "DIM_GREY";
    ColorCode[ColorCode["DODGER_BLUE"] = 2003199] = "DODGER_BLUE";
    ColorCode[ColorCode["FIRE_BRICK"] = 11674146] = "FIRE_BRICK";
    ColorCode[ColorCode["FLORAL_WHITE"] = 16775920] = "FLORAL_WHITE";
    ColorCode[ColorCode["FOREST_GREEN"] = 2263842] = "FOREST_GREEN";
    ColorCode[ColorCode["FUCHSIA"] = 16711935] = "FUCHSIA";
    ColorCode[ColorCode["GAINSBORO"] = 14474460] = "GAINSBORO";
    ColorCode[ColorCode["GHOST_WHITE"] = 16316671] = "GHOST_WHITE";
    ColorCode[ColorCode["GOLD"] = 16766720] = "GOLD";
    ColorCode[ColorCode["GOLDENROD"] = 14329120] = "GOLDENROD";
    ColorCode[ColorCode["GRAY"] = 8421504] = "GRAY";
    ColorCode[ColorCode["GREY"] = 8421504] = "GREY";
    ColorCode[ColorCode["GREEN"] = 32768] = "GREEN";
    ColorCode[ColorCode["GREEN_YELLOW"] = 11403055] = "GREEN_YELLOW";
    ColorCode[ColorCode["HONEYDEW"] = 15794160] = "HONEYDEW";
    ColorCode[ColorCode["HOT_PINK"] = 16738740] = "HOT_PINK";
    ColorCode[ColorCode["INDIAN_RED"] = 13458524] = "INDIAN_RED";
    ColorCode[ColorCode["INDIGO"] = 4915330] = "INDIGO";
    ColorCode[ColorCode["IVORY"] = 16777200] = "IVORY";
    ColorCode[ColorCode["KHAKI"] = 15787660] = "KHAKI";
    ColorCode[ColorCode["LAVENDER"] = 15132410] = "LAVENDER";
    ColorCode[ColorCode["LAVENDER_BLUSH"] = 16773365] = "LAVENDER_BLUSH";
    ColorCode[ColorCode["LAWN_GREEN"] = 8190976] = "LAWN_GREEN";
    ColorCode[ColorCode["LEMON_CHIFFON"] = 16775885] = "LEMON_CHIFFON";
    ColorCode[ColorCode["LIGHT_BLUE"] = 11393254] = "LIGHT_BLUE";
    ColorCode[ColorCode["LIGHT_CORAL"] = 14745599] = "LIGHT_CORAL";
    ColorCode[ColorCode["LIGHT_CYAN"] = 14745599] = "LIGHT_CYAN";
    ColorCode[ColorCode["LIGHT_GOLDENROD_YELLOW"] = 16448210] = "LIGHT_GOLDENROD_YELLOW";
    ColorCode[ColorCode["LIGHT_GREEN"] = 9498256] = "LIGHT_GREEN";
    ColorCode[ColorCode["LIGHT_GRAY"] = 13882323] = "LIGHT_GRAY";
    ColorCode[ColorCode["LIGHT_GREY"] = 13882323] = "LIGHT_GREY";
    ColorCode[ColorCode["LIGHT_PINK"] = 16758465] = "LIGHT_PINK";
    ColorCode[ColorCode["LIGHT_SALMON"] = 16752762] = "LIGHT_SALMON";
    ColorCode[ColorCode["LIGHT_SEA_GREEN"] = 2142890] = "LIGHT_SEA_GREEN";
    ColorCode[ColorCode["LIGHT_SKY_BLUE"] = 8900346] = "LIGHT_SKY_BLUE";
    ColorCode[ColorCode["LIGHT_SLATE_GRAY"] = 7833753] = "LIGHT_SLATE_GRAY";
    ColorCode[ColorCode["LIGHT_SLATE_GREY"] = 7833753] = "LIGHT_SLATE_GREY";
    ColorCode[ColorCode["LIGHT_STEEL_BLUE"] = 11584734] = "LIGHT_STEEL_BLUE";
    ColorCode[ColorCode["LIGHT_YELLOW"] = 16777184] = "LIGHT_YELLOW";
    ColorCode[ColorCode["LIME"] = 65280] = "LIME";
    ColorCode[ColorCode["LIME_GREEN"] = 3329330] = "LIME_GREEN";
    ColorCode[ColorCode["LINEN"] = 16445670] = "LINEN";
    ColorCode[ColorCode["MAGENTA"] = 16711935] = "MAGENTA";
    ColorCode[ColorCode["MAROON"] = 8388608] = "MAROON";
    ColorCode[ColorCode["MEDIUM_AQUAMARINE"] = 6737322] = "MEDIUM_AQUAMARINE";
    ColorCode[ColorCode["MEDIUM_BLUE"] = 205] = "MEDIUM_BLUE";
    ColorCode[ColorCode["MEDIUM_ORCHID"] = 12211667] = "MEDIUM_ORCHID";
    ColorCode[ColorCode["MEDIUM_PURPLE"] = 9662683] = "MEDIUM_PURPLE";
    ColorCode[ColorCode["MEDIUM_SEA_GREEN"] = 3978097] = "MEDIUM_SEA_GREEN";
    ColorCode[ColorCode["MEDIUM_SLATE_BLUE"] = 8087790] = "MEDIUM_SLATE_BLUE";
    ColorCode[ColorCode["MEDIUM_SPRING_GREEN"] = 64154] = "MEDIUM_SPRING_GREEN";
    ColorCode[ColorCode["MEDIUM_TURQUOISE"] = 4772300] = "MEDIUM_TURQUOISE";
    ColorCode[ColorCode["MEDIUM_VIOLET_RED"] = 13047173] = "MEDIUM_VIOLET_RED";
    ColorCode[ColorCode["MIDNIGHT_BLUE"] = 1644912] = "MIDNIGHT_BLUE";
    ColorCode[ColorCode["MINT_CREAM"] = 16121850] = "MINT_CREAM";
    ColorCode[ColorCode["MISTY_ROSE"] = 16770273] = "MISTY_ROSE";
    ColorCode[ColorCode["MOCCASIN"] = 16770229] = "MOCCASIN";
    ColorCode[ColorCode["NAVAJO_WHITE"] = 16768685] = "NAVAJO_WHITE";
    ColorCode[ColorCode["NAVY"] = 128] = "NAVY";
    ColorCode[ColorCode["OLD_LACE"] = 16643558] = "OLD_LACE";
    ColorCode[ColorCode["OLIVE"] = 8421376] = "OLIVE";
    ColorCode[ColorCode["OLIVE_DRAB"] = 7048739] = "OLIVE_DRAB";
    ColorCode[ColorCode["ORANGE"] = 16753920] = "ORANGE";
    ColorCode[ColorCode["ORANGE_RED"] = 16729344] = "ORANGE_RED";
    ColorCode[ColorCode["ORCHID"] = 14315734] = "ORCHID";
    ColorCode[ColorCode["PALE_GOLDENROD"] = 15657130] = "PALE_GOLDENROD";
    ColorCode[ColorCode["PALE_GREEN"] = 10025880] = "PALE_GREEN";
    ColorCode[ColorCode["PALE_TURQUOISE"] = 11529966] = "PALE_TURQUOISE";
    ColorCode[ColorCode["PALE_VIOLET_RED"] = 14381203] = "PALE_VIOLET_RED";
    ColorCode[ColorCode["PAPAYA_WHIP"] = 16773077] = "PAPAYA_WHIP";
    ColorCode[ColorCode["PEACH_PUFF"] = 16767673] = "PEACH_PUFF";
    ColorCode[ColorCode["PERU"] = 13468991] = "PERU";
    ColorCode[ColorCode["PINK"] = 16761035] = "PINK";
    ColorCode[ColorCode["PLUM"] = 14524637] = "PLUM";
    ColorCode[ColorCode["POWDER_BLUE"] = 11591910] = "POWDER_BLUE";
    ColorCode[ColorCode["PURPLE"] = 8388736] = "PURPLE";
    ColorCode[ColorCode["RED"] = 16711680] = "RED";
    ColorCode[ColorCode["ROSY_BROWN"] = 12357519] = "ROSY_BROWN";
    ColorCode[ColorCode["ROYAL_BLUE"] = 4286945] = "ROYAL_BLUE";
    ColorCode[ColorCode["SADDLE_BROWN"] = 9127187] = "SADDLE_BROWN";
    ColorCode[ColorCode["SALMON"] = 16416882] = "SALMON";
    ColorCode[ColorCode["SANDY_BROWN"] = 16426080] = "SANDY_BROWN";
    ColorCode[ColorCode["SEA_GREEN"] = 3050327] = "SEA_GREEN";
    ColorCode[ColorCode["SEA_SHELL"] = 16774638] = "SEA_SHELL";
    ColorCode[ColorCode["SIENNA"] = 10506797] = "SIENNA";
    ColorCode[ColorCode["SILVER"] = 12632256] = "SILVER";
    ColorCode[ColorCode["SKY_BLUE"] = 8900331] = "SKY_BLUE";
    ColorCode[ColorCode["SLATE_BLUE"] = 6970061] = "SLATE_BLUE";
    ColorCode[ColorCode["SLATE_GRAY"] = 7372944] = "SLATE_GRAY";
    ColorCode[ColorCode["SLATE_GREY"] = 7372944] = "SLATE_GREY";
    ColorCode[ColorCode["SNOW"] = 16775930] = "SNOW";
    ColorCode[ColorCode["SPRING_GREEN"] = 65407] = "SPRING_GREEN";
    ColorCode[ColorCode["STEEL_BLUE"] = 4620980] = "STEEL_BLUE";
    ColorCode[ColorCode["TAN"] = 13808780] = "TAN";
    ColorCode[ColorCode["TEAL"] = 32896] = "TEAL";
    ColorCode[ColorCode["THISTLE"] = 14204888] = "THISTLE";
    ColorCode[ColorCode["TOMATO"] = 16737095] = "TOMATO";
    ColorCode[ColorCode["TURQUOISE"] = 4251856] = "TURQUOISE";
    ColorCode[ColorCode["VIOLET"] = 15631086] = "VIOLET";
    ColorCode[ColorCode["WHEAT"] = 16113331] = "WHEAT";
    ColorCode[ColorCode["WHITE"] = 16777215] = "WHITE";
    ColorCode[ColorCode["WHITE_SMOKE"] = 16119285] = "WHITE_SMOKE";
    ColorCode[ColorCode["YELLOW"] = 16776960] = "YELLOW";
    ColorCode[ColorCode["YELLOW_GREEN"] = 10145074] = "YELLOW_GREEN";
})(ColorCode = exports.ColorCode || (exports.ColorCode = {}));
exports.ColorMap = {
    "aliceblue": ColorCode.ALICE_BLUE,
    "antiquewhite": ColorCode.ANTIQUE_WHITE,
    "aqua": ColorCode.AQUA,
    "aquamarine": ColorCode.AQUAMARINE,
    "azure": ColorCode.AZURE,
    "beige": ColorCode.BEIGE,
    "bisque": ColorCode.BISQUE,
    "black": ColorCode.BLACK,
    "blanchedalmond": ColorCode.BLANCHED_ALMOND,
    "blue": ColorCode.BLUE,
    "blueviolet": ColorCode.BLUE_VIOLET,
    "brown": ColorCode.BROWN,
    "burlywood": ColorCode.BURLY_WOOD,
    "cadetblue": ColorCode.CADET_BLUE,
    "chartreuse": ColorCode.CHART_REUSE,
    "chocolate": ColorCode.CHOCOLATE,
    "coral": ColorCode.CORAL,
    "cornflowerblue": ColorCode.CORNFLOWER_BLUE,
    "cornsilk": ColorCode.CORN_SILK,
    "crimson": ColorCode.CRIMSON,
    "cyan": ColorCode.CYAN,
    "darkblue": ColorCode.DARK_BLUE,
    "darkcyan": ColorCode.DARK_CYAN,
    "darkgoldenrod": ColorCode.DARK_GOLDENROD,
    "darkgray": ColorCode.DARK_GRAY,
    "darkgrey": ColorCode.DARK_GREY,
    "darkgreen": ColorCode.DARK_GREEN,
    "darkkhaki": ColorCode.DARK_KHAKI,
    "darkmagenta": ColorCode.DARK_MAGENTA,
    "darkolivegreen": ColorCode.DARK_OLIVE_GREEN,
    "darkorange": ColorCode.DARK_ORANGE,
    "darkorchid": ColorCode.DARK_ORCHID,
    "darkred": ColorCode.DARK_RED,
    "darksalmon": ColorCode.DARK_SALMON,
    "darkseagreen": ColorCode.DARK_SEA_GREEN,
    "darkslateblue": ColorCode.DARK_SLATE_BLUE,
    "darkslategray": ColorCode.DARK_SLATE_GRAY,
    "darkslategrey": ColorCode.DARK_SLATE_GREY,
    "darktorquoise": ColorCode.DARK_TORQUOISE,
    "darkviolet": ColorCode.DARK_VIOLET,
    "deeppink": ColorCode.DEEP_PINK,
    "deepskyblue": ColorCode.DEEP_SKY_BLUE,
    "dimgray": ColorCode.DIM_GRAY,
    "dimgrey": ColorCode.DIM_GREY,
    "dodgerblue": ColorCode.DODGER_BLUE,
    "firebrick": ColorCode.FIRE_BRICK,
    "floralwhite": ColorCode.FLORAL_WHITE,
    "forestgreen": ColorCode.FOREST_GREEN,
    "fuchsia": ColorCode.FUCHSIA,
    "gainsboro": ColorCode.GAINSBORO,
    "ghostwhite": ColorCode.GHOST_WHITE,
    "gold": ColorCode.GOLD,
    "goldenrod": ColorCode.GOLDENROD,
    "gray": ColorCode.GRAY,
    "grey": ColorCode.GREY,
    "green": ColorCode.GREEN,
    "greenyellow": ColorCode.GREEN_YELLOW,
    "honeydew": ColorCode.HONEYDEW,
    "hotpink": ColorCode.HOT_PINK,
    "indianred": ColorCode.INDIAN_RED,
    "indigo": ColorCode.INDIGO,
    "ivory": ColorCode.IVORY,
    "khaki": ColorCode.KHAKI,
    "lavender": ColorCode.LAVENDER,
    "lavenderblush": ColorCode.LAVENDER_BLUSH,
    "lawngreen": ColorCode.LAWN_GREEN,
    "lemonchiffon": ColorCode.LEMON_CHIFFON,
    "lightblue": ColorCode.LIGHT_BLUE,
    "lightcoral": ColorCode.LIGHT_CORAL,
    "lightcyan": ColorCode.LIGHT_CYAN,
    "lightgoldenrodyellow": ColorCode.LIGHT_GOLDENROD_YELLOW,
    "lightgreen": ColorCode.LIGHT_GREEN,
    "lightgray": ColorCode.LIGHT_GRAY,
    "lightgrey": ColorCode.LIGHT_GREY,
    "lightpink": ColorCode.LIGHT_PINK,
    "lightsalmon": ColorCode.LIGHT_SALMON,
    "lightseagreen": ColorCode.LIGHT_SEA_GREEN,
    "lightskyblue": ColorCode.LIGHT_SKY_BLUE,
    "lightslategray": ColorCode.LIGHT_SLATE_GRAY,
    "lightslategrey": ColorCode.LIGHT_SLATE_GREY,
    "lightsteelblue": ColorCode.LIGHT_STEEL_BLUE,
    "lightyellow": ColorCode.LIGHT_YELLOW,
    "lime": ColorCode.LIME,
    "limegreen": ColorCode.LIME_GREEN,
    "linen": ColorCode.LINEN,
    "magenta": ColorCode.MAGENTA,
    "maroon": ColorCode.MAROON,
    "mediumaquamarine": ColorCode.MEDIUM_AQUAMARINE,
    "mediumblue": ColorCode.MEDIUM_BLUE,
    "mediumorchid": ColorCode.MEDIUM_ORCHID,
    "mediumpurple": ColorCode.MEDIUM_PURPLE,
    "mediumseagreen": ColorCode.MEDIUM_SEA_GREEN,
    "mediumslateblue": ColorCode.MEDIUM_SLATE_BLUE,
    "mediumspringgreen": ColorCode.MEDIUM_SPRING_GREEN,
    "mediumturquoise": ColorCode.MEDIUM_TURQUOISE,
    "mediumvioletred": ColorCode.MEDIUM_VIOLET_RED,
    "midnightblue": ColorCode.MIDNIGHT_BLUE,
    "mintcream": ColorCode.MINT_CREAM,
    "mistyrose": ColorCode.MISTY_ROSE,
    "moccasin": ColorCode.MOCCASIN,
    "navajowhite": ColorCode.NAVAJO_WHITE,
    "navy": ColorCode.NAVY,
    "oldlace": ColorCode.OLD_LACE,
    "olive": ColorCode.OLIVE,
    "olivedrab": ColorCode.OLIVE_DRAB,
    "orange": ColorCode.ORANGE,
    "orangered": ColorCode.ORANGE_RED,
    "orchid": ColorCode.ORCHID,
    "palegoldenrod": ColorCode.PALE_GOLDENROD,
    "palegreen": ColorCode.PALE_GREEN,
    "paleturquoise": ColorCode.PALE_TURQUOISE,
    "palevioletred": ColorCode.PALE_VIOLET_RED,
    "papayawhip": ColorCode.PAPAYA_WHIP,
    "peachpuff": ColorCode.PEACH_PUFF,
    "peru": ColorCode.PERU,
    "pink": ColorCode.PINK,
    "plum": ColorCode.PLUM,
    "powderblue": ColorCode.POWDER_BLUE,
    "purple": ColorCode.PURPLE,
    "red": ColorCode.RED,
    "rosybrown": ColorCode.ROSY_BROWN,
    "royalblue": ColorCode.ROYAL_BLUE,
    "saddlebrown": ColorCode.SADDLE_BROWN,
    "salmon": ColorCode.SALMON,
    "sandybrown": ColorCode.SANDY_BROWN,
    "seagreen": ColorCode.SEA_GREEN,
    "seashell": ColorCode.SEA_SHELL,
    "sienna": ColorCode.SIENNA,
    "silver": ColorCode.SILVER,
    "skyblue": ColorCode.SKY_BLUE,
    "slateblue": ColorCode.SLATE_BLUE,
    "slategray": ColorCode.SLATE_GRAY,
    "slategrey": ColorCode.SLATE_GREY,
    "snow": ColorCode.SNOW,
    "springgreen": ColorCode.SPRING_GREEN,
    "steelblue": ColorCode.STEEL_BLUE,
    "tan": ColorCode.TAN,
    "teal": ColorCode.TEAL,
    "thistle": ColorCode.THISTLE,
    "tomato": ColorCode.TOMATO,
    "turquoise": ColorCode.TURQUOISE,
    "violet": ColorCode.VIOLET,
    "wheat": ColorCode.WHEAT,
    "white": ColorCode.WHITE,
    "whitesmoke": ColorCode.WHITE_SMOKE,
    "yellow": ColorCode.YELLOW,
    "yellowgreen": ColorCode.YELLOW_GREEN
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const assets_1 = __webpack_require__(0);
var assetFactory = assets_1.AssetFactory.getSingleton();
class AudioEngine {
    constructor() {
        this._audioMap = {};
        this._logManager = utils_1.LogManager.getSingleton();
    }
    addAudio(name, audio, channels) {
        if (audio.getType() !== assets_1.AssetType.AUDIO) {
            throw 'AudioEngine.addAudio: Invalid Asset Type.';
        }
        this._setAudio(name, audio, channels);
    }
    hasAudio(name) {
        var audio = this._getAudio(name);
        return (audio !== null);
    }
    removeAudio(name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._stopAudio(audio);
        }
        delete this._audioMap[name];
    }
    releaseAssets() {
        var keys = Object.keys(this._audioMap);
        for (var i = 0, len = keys.length; i < len; i++) {
            this.removeAudio(keys[i]);
        }
    }
    playAudio(name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._playAudio(audio);
            audio.setAttribute('playing', true);
        }
    }
    pauseAudio(name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._pauseAudio(audio);
            audio.setAttribute('playing', false);
        }
    }
    stopAudio(name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._stopAudio(audio);
            audio.setAttribute('playing', false);
        }
    }
    isAudioLooping(name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._isAudioLooping(audio);
        }
        return false;
    }
    loopAudio(name, state) {
        var audio = this._getAudio(name);
        if (audio) {
            this._loopAudio(audio, state);
        }
    }
    isAudioMuted(name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._isAudioMuted(audio);
        }
        return false;
    }
    muteAudio(name, state) {
        var audio = this._getAudio(name);
        if (audio) {
            this._muteAudio(audio, state);
        }
    }
    getAudioDuration(name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getAudioDuration(audio);
        }
        return 0;
    }
    setTimeCursor(name, seconds) {
        var audio = this._getAudio(name);
        if (audio) {
            this._setTimeCursor(audio, seconds);
        }
    }
    getTimeCursor(name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getTimeCursor(audio);
        }
        return 0;
    }
    setVolume(name, volume) {
        var audio = this._getAudio(name);
        if (audio) {
            this._setVolume(audio, volume);
        }
    }
    getVolume(name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getVolume(audio);
        }
        else {
            return 0;
        }
    }
    _setAudio(name, audio, channels) {
        if (!audio) {
            this.removeAudio(name);
        }
        else {
            var channelArr = [audio];
            if (channels > 1) {
                var clone;
                for (var i = 1; i < channels; i++) {
                    clone = assetFactory.build(audio.getType(), audio.getSource());
                    channelArr.push(clone);
                }
            }
            this._audioMap[name] = channelArr;
            this._registerEvents(channelArr);
        }
    }
    _warnMissingAudio(name) {
        this._logManager.log(utils_1.SeverityEnum.WARNING, 'Audio ' + name + ' is missing from Audio Engine.');
    }
    _getAudio(name, justGiveChannel1) {
        if (this._audioMap[name]) {
            var channels = this._audioMap[name];
            if (justGiveChannel1) {
                return channels[0];
            }
            else {
                var channel;
                var asset;
                for (var i = 0, len = channels.length; i < len; i++) {
                    channel = channels[i];
                    if (!channel.getAttribute('playing')) {
                        return channel;
                    }
                }
            }
            return channels[0];
        }
        else {
            this._warnMissingAudio(name);
            return null;
        }
    }
    _getData(audio) {
        return audio.getData();
    }
    _attachStartEvent(asset) {
        if (!asset.getAttribute('startEvent')) {
            this._registerStartEvent(asset);
            asset.setAttribute('startEvent', true);
        }
    }
    _attachEndEvent(asset) {
        if (!asset.getAttribute('endEvent')) {
            this._registerEndEvent(asset);
            asset.setAttribute('endEvent', true);
        }
    }
    _registerEvents(channelArray) {
        var channel;
        for (var i = 0, len = channelArray.length; i < len; i++) {
            channel = channelArray[i];
            this._attachStartEvent(channel);
            this._attachEndEvent(channel);
        }
    }
}
exports.AudioEngine = AudioEngine;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetState;
(function (AssetState) {
    AssetState[AssetState["NOT_LOADED"] = 0] = "NOT_LOADED";
    AssetState[AssetState["LOADING"] = 1] = "LOADING";
    AssetState[AssetState["LOADED"] = 2] = "LOADED";
    AssetState[AssetState["UNLOADING"] = 3] = "UNLOADING";
})(AssetState = exports.AssetState || (exports.AssetState = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AssetState_1 = __webpack_require__(10);
const Instance_1 = __webpack_require__(3);
class AssetGroup {
    constructor(assetMap = {}) {
        this._assets = assetMap;
    }
    addAsset(name, asset) {
        if (this._assets[name]) {
            Instance_1.getInstance().getLogManager().warn(`Asset "${name}" already exists in Asset Group.`);
            return;
        }
        this._assets[name] = asset;
    }
    removeAsset(name) {
        var asset = this._assets[name];
        if (!asset) {
            return;
        }
        if (asset.getState() === AssetState_1.AssetState.LOADED) {
            asset.unload();
        }
        delete this._assets[name];
    }
    getAsset(name) {
        return this._assets[name];
    }
    load() {
        var promises = [];
        for (var name in this._assets) {
            var asset = this._assets[name];
            if (asset.getState() === AssetState_1.AssetState.NOT_LOADED) {
                promises.push(asset.load());
            }
        }
        if (promises.length === 0) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve();
            }).catch(reject);
        });
    }
    unload() {
        var promises = [];
        for (var name in this._assets) {
            var asset = this._assets[name];
            if (asset.getState() === AssetState_1.AssetState.LOADED) {
                promises.push(asset.unload());
            }
        }
        if (promises.length === 0) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve();
            }).catch(reject);
        });
    }
}
exports.AssetGroup = AssetGroup;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __webpack_require__(13);
exports.Entity = Entity_1.Entity;
const EntityModel_1 = __webpack_require__(41);
exports.EntityModel = EntityModel_1.EntityModel;
const EntityView_1 = __webpack_require__(14);
exports.EntityView = EntityView_1.EntityView;
const EntityView2D_1 = __webpack_require__(42);
exports.EntityView2D = EntityView2D_1.EntityView2D;
const GridMap_1 = __webpack_require__(43);
exports.GridMap = GridMap_1.GridMap;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Events = __webpack_require__(2);
const assets_1 = __webpack_require__(0);
const _1 = __webpack_require__(12);
const utils_1 = __webpack_require__(1);
class Entity extends Events.EventEmitter {
    constructor(model) {
        super();
        var useDefaults = false;
        this._modelCB = (attribute, value, oldValue) => {
            if (this._notifierKeys.indexOf(attribute) > -1) {
                this._setModified(true);
            }
            else if (this._parent && this._parentNotifierKeys.indexOf(attribute) > -1) {
                this._parent._setModified(true);
            }
        };
        if (!model) {
            model = new _1.EntityModel();
            useDefaults = true;
        }
        this._view = new _1.EntityView(model);
        this._model = model;
        this._children = new Array();
        this._regions = [];
        this._regionDimension;
        this._regionList = {};
        this._collisionable = false;
        this._parent = null;
        this._modified = false;
        this._notifierKeys = ['width', 'height', 'color', 'texture', 'textures'];
        this._parentNotifierKeys = ['x', 'y'];
        if (useDefaults) {
            this._setDefaults();
        }
    }
    getID() {
        return this._model.getID();
    }
    getParent() {
        return this._parent;
    }
    setParent(parent) {
        this._parent = parent;
    }
    getRegions() {
        return this._regions;
    }
    getRegionDimension() {
        return this._regionDimension;
    }
    getType() {
        return this._model.getType();
    }
    setType(type) {
        this._model.setType(type);
    }
    setCollisionable(collisionable) {
        this._collisionable = collisionable;
    }
    isCollisionable() {
        return this._collisionable;
    }
    getModel() {
        return this._model;
    }
    setModel(model) {
        var view = this._view;
        var oldModel = this._model;
        if (oldModel) {
            oldModel.removeListener(1..toString(), this._modelCB);
        }
        this._model = model;
        model.on(1..toString(), this._modelCB);
    }
    getHeight() {
        return this._model.getAttribute('height');
    }
    setHeight(height) {
        this._model.setAttribute('height', height);
        this._generateRegions();
    }
    getWidth() {
        return this._model.getAttribute('width');
    }
    setWidth(width) {
        this._model.setAttribute('width', width);
        this._generateRegions();
    }
    getX() {
        return this._model.getAttribute('x');
    }
    setX(x) {
        let oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('x', x);
        let newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        let eventData = {
            type: 0..toString(),
            oldCoordinates,
            newCoordinates,
            source: this
        };
        if (!this._eventEmitted) {
            this._eventEmitted = true;
            this.emit(0..toString(), eventData);
            this._eventEmitted = false;
        }
    }
    setCoordinate(coordinate) {
        let oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('x', coordinate.x);
        this._model.setAttribute('y', coordinate.y);
        let newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        let eventData = {
            type: 0..toString(),
            oldCoordinates,
            newCoordinates,
            source: this
        };
        this.emit(0..toString(), eventData);
    }
    getX2() {
        return this.getX() + this.getWidth();
    }
    getY() {
        return this._model.getAttribute('y');
    }
    setY(y) {
        let oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('y', y);
        let newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        let eventData = {
            type: 0..toString(),
            oldCoordinates,
            newCoordinates,
            source: this
        };
        if (!this._eventEmitted) {
            this._eventEmitted = true;
            this.emit(0..toString(), eventData);
            this._eventEmitted = false;
        }
    }
    getY2() {
        return this.getY() + this.getHeight();
    }
    getZ() {
        return this._model.getAttribute('z');
    }
    setZ(z) {
        this._model.setAttribute('z', z);
    }
    getVisible() {
        return this._model.getAttribute('visible');
    }
    setVisible(state) {
        this._model.setAttribute('visible', state);
    }
    getColor() {
        return this._model.getAttribute('color');
    }
    setColor(color) {
        this._model.setAttribute('color', color);
    }
    getTexture() {
        return this._model.getTexture();
    }
    setTexture(asset) {
        if (asset.getType() !== assets_1.AssetType.IMAGE) {
            throw new Error('Texture asset must be of type IMAGE.');
        }
        this._model.setTexture(asset);
        this._setModified(true);
    }
    isModified() {
        return this._modified;
    }
    addChild(child) {
        var parent = child._parent;
        if (parent) {
            parent.removeChild(child);
        }
        this._children.push(child);
        child._parent = this;
        this._putChildInRegion(child);
    }
    removeChild(child) {
        if (this.isChild(child)) {
            var idx = this.indexOf(child);
            this._children.splice(idx, 1);
        }
        this._removeChildFromRegions(child);
        delete this._regionList[child.getID()];
    }
    removeAllChildren() {
        var child;
        while (child = this.getChildAt(0)) {
            this.removeChild(child);
        }
    }
    isChild(child) {
        return (this.indexOf(child) > -1);
    }
    indexOf(child) {
        return this._children.indexOf(child);
    }
    childCount() {
        return this._children.length;
    }
    getChildAt(index) {
        return this._children[index];
    }
    _setModified(state) {
        this._modified = state;
        if (this._parent) {
            this._parent._setModified(state);
        }
    }
    iterator() {
        return new utils_1.Iterator(this._children);
    }
    getChildren(startCoordinate, endCoordinate) {
        if (startCoordinate && endCoordinate) {
            var startRegion = this._coordinateToRegion(startCoordinate);
            var endRegion = this._coordinateToRegion(endCoordinate);
            var children = [];
            for (var x = startRegion.x; x <= endRegion.x; x++) {
                for (var y = startRegion.y; y <= endRegion.y; y++) {
                    children = children.concat(this._getChildrenInRegion({ x, y }));
                }
            }
            return new utils_1.Iterator(children);
        }
        else if (startCoordinate) {
            var region = this._coordinateToRegion(startCoordinate);
            var children = [];
            var childrenIterator = new utils_1.Iterator(this._getChildrenInRegion({ x: region.x, y: region.y }));
            while (childrenIterator.hasNext()) {
                var child = childrenIterator.next();
                var childCoordinate = child.getCoordinate();
                var childOuterCoordinate = child.getOuterCoordinate();
                if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
                    && childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
                    children.push(child);
                }
            }
            return new utils_1.Iterator(children);
        }
        else {
            return new utils_1.Iterator(this._children);
        }
    }
    findChildren(startCoordinate, endCoordinate) {
        var children = [];
        if (this._children.length > 0) {
            if (startCoordinate && !endCoordinate) {
                var region = this._coordinateToRegion(startCoordinate);
                var regionChildren = this._getChildrenInRegion({ x: region.x, y: region.y });
                if (regionChildren.length > 0) {
                    var childrenIterator = new utils_1.Iterator(regionChildren);
                    while (childrenIterator.hasNext()) {
                        var iterChild = childrenIterator.next();
                        let childCoordinate = iterChild.getCoordinate();
                        let childOuterCoordinate = iterChild.getOuterCoordinate();
                        if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
                            && childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
                            children.push(iterChild);
                            let deeperChildren = iterChild.findChildren({ x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y });
                            if (deeperChildren) {
                                children = children.concat(deeperChildren);
                            }
                        }
                    }
                }
            }
            else if (startCoordinate && endCoordinate) {
                var startRegion = this._coordinateToRegion(startCoordinate);
                var endRegion = this._coordinateToRegion(endCoordinate);
                var childrenVisited = [];
                for (var x = startRegion.x; x <= endRegion.x; x++) {
                    for (var y = startRegion.y; y <= endRegion.y; y++) {
                        var regionChildren = this._getChildrenInRegion({ x, y });
                        for (var regionChildI in regionChildren) {
                            var regionChild = regionChildren[regionChildI];
                            if (childrenVisited.indexOf(regionChild) === -1) {
                                childrenVisited.push(regionChild);
                                let childCoordinate = regionChild.getCoordinate();
                                let childOuterCoordinate = regionChild.getOuterCoordinate();
                                var xCollission = false;
                                var yCollision = false;
                                if ((startCoordinate.x < childOuterCoordinate.x && endCoordinate.x > childCoordinate.x)
                                    || (endCoordinate.x > childCoordinate.x && startCoordinate.x < childOuterCoordinate.x)) {
                                    xCollission = true;
                                }
                                if ((startCoordinate.y < childOuterCoordinate.y && endCoordinate.y > childCoordinate.y)
                                    || (endCoordinate.y > childCoordinate.y && startCoordinate.y < childOuterCoordinate.y)) {
                                    yCollision = true;
                                }
                                if (xCollission && yCollision) {
                                    children.push(regionChild);
                                    let deeperChildren = regionChild.findChildren({ x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y }, { x: endCoordinate.x - childOuterCoordinate.x, y: endCoordinate.y - childOuterCoordinate.y });
                                    if (deeperChildren) {
                                        children = children.concat(deeperChildren);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return children;
    }
    findTopChildAt(coordinate) {
        var child = false;
        var region = this._coordinateToRegion(coordinate);
        var regionChildren = this._getChildrenInRegion({ x: region.x, y: region.y });
        var childrenIterator = new utils_1.Iterator(regionChildren);
        childrenIterator.setToEnd();
        while (childrenIterator.hasPrev() && !child) {
            var iterChild = childrenIterator.prev();
            var childCoordinate = iterChild.getCoordinate();
            var childOuterCoordinate = iterChild.getOuterCoordinate();
            if (childCoordinate.x <= coordinate.x && childCoordinate.y <= coordinate.y
                && childOuterCoordinate.x >= coordinate.x && childOuterCoordinate.y >= coordinate.y) {
                child = iterChild;
                var deeperChild = iterChild.findTopChildAt({ x: coordinate.x - childCoordinate.x, y: coordinate.y - childCoordinate.y });
                if (deeperChild) {
                    child = deeperChild;
                }
            }
        }
        return child || false;
    }
    getCoordinate() {
        return { x: this.getX(), y: this.getY() };
    }
    getOuterCoordinate() {
        return { x: this.getX2(), y: this.getY2() };
    }
    getAbsoluteY() {
        var entity = this;
        var y = 0;
        while (entity) {
            y += entity.getY();
            entity = entity._parent;
        }
        return y;
    }
    getAbsoluteY2() {
        return this.getAbsoluteY() + this.getHeight();
    }
    getAbsoluteX() {
        var entity = this;
        var x = 0;
        while (entity) {
            x += entity.getX();
            entity = entity._parent;
        }
        return x;
    }
    getAbsoluteX2() {
        return this.getAbsoluteX() + this.getWidth();
    }
    setLocation(coordinate) {
        this.setX(coordinate.x);
        this.setY(coordinate.y);
    }
    getLocation() {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }
    setSize(dimension) {
        this._setModified(true);
        this.setWidth(dimension.width);
        this.setHeight(dimension.height);
    }
    getSize() {
        return { width: this.getWidth(), height: this.getHeight() };
    }
    _setDefaults() {
        this.setLocation({ x: 0, y: 0 });
        this.setSize({ width: 0, height: 0 });
        this.setVisible(true);
    }
    _generateRegions() {
        this._regions = [];
        this._regionList = {};
        if (this.getWidth() <= 100) {
            var regionWidth = this.getWidth() / 2;
        }
        else {
            var regionWidth = 50;
        }
        if (this.getHeight() <= 100) {
            var regionHeight = this.getHeight() / 2;
        }
        else {
            var regionHeight = 50;
        }
        this._regionDimension = { width: regionWidth, height: regionHeight };
        var xCount = Math.ceil(this.getWidth() / regionWidth);
        var yCount = Math.ceil(this.getHeight() / regionHeight);
        for (var x = 0; x < xCount; x++) {
            this._regions[x] = [];
            for (var y = 0; y < yCount; y++) {
                this._regions[x][y] = [];
            }
        }
        var childrenIterator = this.iterator();
        while (childrenIterator.hasNext()) {
            this._putChildInRegion(childrenIterator.next());
        }
    }
    _putChildInRegion(child) {
        var startRegion = this._coordinateToRegion({ x: child.getX(), y: child.getY() });
        var endRegion = this._coordinateToRegion({ x: child.getX2(), y: child.getY2() });
        this._regionList[child.getID()] = [];
        if (!isNaN(startRegion.x) && !isNaN(startRegion.y) && !isNaN(endRegion.x) && !isNaN(endRegion.y)) {
            for (var x = startRegion.x; x <= endRegion.x; x++) {
                if (this._regions[x]) {
                    for (var y = startRegion.y; y <= endRegion.y; y++) {
                        if (this._regions[x][y]) {
                            this._regions[x][y].push(child);
                            this._regionList[child.getID()].push({ x, y });
                        }
                    }
                }
            }
        }
        else {
        }
    }
    _getChildrenInRegion(regionCoordinate) {
        if (this._regions[regionCoordinate.x] && this._regions[regionCoordinate.x][regionCoordinate.y]) {
            return this._regions[regionCoordinate.x][regionCoordinate.y];
        }
        else {
            return [];
        }
    }
    _removeChildFromRegions(child) {
        if (this._regionList[child.getID()]) {
            for (var i in this._regionList[child.getID()]) {
                var coord = this._regionList[child.getID()][i];
                this._regions[coord.x][coord.y].splice(this._regions[coord.x][coord.y].indexOf(child), 1);
            }
        }
    }
    _updateChildsRegion(child) {
        this._removeChildFromRegions(child);
        this._putChildInRegion(child);
    }
    _coordinateToRegion(coordinate) {
        var x = Math.floor(coordinate.x / this._regionDimension.width);
        var y = Math.floor(coordinate.y / this._regionDimension.height);
        return { x, y };
    }
}
exports.Entity = Entity;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Events = __webpack_require__(2);
class EntityView extends Events.EventEmitter {
    constructor(model) {
        super();
        this._visible = true;
        this._model = model;
        this._bindedFuncs = {};
        this._attachEvents();
    }
    setVisible(visible) {
        this._visible = visible;
    }
    getVisible() {
        return this._visible;
    }
    setModel(model) {
        if (this._model) {
            this._detachEvents();
        }
        this._model = model;
        this._attachEvents();
    }
    _handleAttrChange(e) {
    }
    _attachEvents() {
        this._model.on(1..toString(), (this._bindedFuncs[1..toString()] = this._handleAttrChange.bind(this)));
    }
    _detachEvents() {
        this._model.removeListener(1..toString(), this._bindedFuncs[1..toString()]);
    }
}
exports.EntityView = EntityView;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(16);
const engines_1 = __webpack_require__(5);
const entities_1 = __webpack_require__(12);
const utils_1 = __webpack_require__(1);
const assets_1 = __webpack_require__(0);
const resources_1 = __webpack_require__(44);
class CameraDemo extends core_1.Engine {
    constructor() {
        super();
        this._mouseIsIn = false;
        this.setRenderingEngine(new engines_1.TwoDimensionalRenderingEngine());
        this.setLogicEngine(new engines_1.GroupLogicEngine());
        this._blocks = [];
        this._blockConfigs = {};
        this._container = new entities_1.Entity();
        this._container.setColor(new utils_1.Color(0, 0, 0));
        this._container.setWidth(1000);
        this._container.setHeight(1000);
        this._camera = new utils_1.Camera(this._container, null, { width: this._container.getWidth(), height: this._container.getHeight() }, null, { height: this._container.getHeight(), width: this._container.getWidth() });
        this.getRenderingEngine().addCamera(this._camera);
        this._smallCamera = new utils_1.Camera(this._container, { x: 450, y: 450 }, { width: 75, height: 75 }, { x: 35, y: 35 }, { width: 100, height: 100 });
        this.getRenderingEngine().addCamera(this._smallCamera);
        this.getRenderingEngine().debugCamera = true;
        this.getViewPort().on(0..toString(), this._viewPortUpdated.bind(this));
        this.getViewPort().fillPage(true);
        let resourcesLoaded = () => {
            this._container.setTexture(this._assetGroup.getAsset('background'));
            for (var i = 0; i < 200; i++) {
                console.log("Generate Pikachus");
                this._generatePikachu();
            }
            this.getLogicEngine().addLogic("collision", this._moveBlocks.bind(this), 25);
            this.getViewPort().getCanvas().addEventListener('mouseover', () => {
                console.log("OVER");
                this._mouseIsIn = true;
            });
            this.getViewPort().getCanvas().addEventListener('mouseout', () => {
                console.log("OUT");
                this._mouseIsIn = false;
            });
            this.getViewPort().getCanvas().addEventListener('mousemove', (e) => {
                var fov = this._smallCamera.getFOV();
                this._smallCamera.setViewPoint({ x: e.clientX - this.getViewPort().getCanvas().offsetLeft - (fov.width / 2), y: e.clientY - this.getViewPort().getCanvas().offsetTop - (fov.height / 2) });
            });
            this.getViewPort().getCanvas().addEventListener('mousewheel', (e) => {
                var fov = this._smallCamera.getFOV();
                if (e.wheelDelta > 0) {
                    this._smallCamera.setFOV({ width: fov.width - 10, height: fov.height - 10 });
                }
                else {
                    this._smallCamera.setFOV({ width: fov.width + 10, height: fov.height + 10 });
                }
            });
        };
        var loader = new assets_1.AssetGroupLoader();
        this._assetGroup = loader.loadFromMemory(resources_1.resources);
        this._assetGroup.load().then(() => {
            resourcesLoaded();
        }).catch((e) => {
            console.log(e);
        });
    }
    _generatePikachu() {
        var block = new entities_1.Entity();
        this._blocks.push(block);
        block.setWidth(50);
        block.setHeight(50);
        block.setTexture(this._assetGroup.getAsset('pikachu'));
        block.setX(Math.floor((Math.random() * this._container.getWidth()) + 1));
        block.setY(Math.floor((Math.random() * this._container.getHeight()) + 1));
        this._blockConfigs[block.getID()] = {};
        this._blockConfigs[block.getID()]["x_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "right" : "left";
        this._blockConfigs[block.getID()]["y_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "up" : "down";
        this._blockConfigs[block.getID()]["speed"] = Math.floor((Math.random() * 2) + 1) / 1.5;
        this._container.addChild(block);
    }
    _viewPortUpdated(event) {
        this._container.setWidth(event.newDimensions.width);
        this._container.setHeight(event.newDimensions.height);
        this._camera.setFOV({ width: event.newDimensions.width, height: event.newDimensions.height });
        this._camera.setRenderDimension({ width: event.newDimensions.width, height: event.newDimensions.height });
    }
    _moveBlocks() {
        for (var i in this._blocks) {
            let block = this._blocks[i];
            let x;
            let y;
            let x2;
            let y2;
            if (this._blockConfigs[block.getID()]["x_dir"] === "right") {
                x = block.getX() + this._blockConfigs[block.getID()]["speed"];
                x2 = x + block.getWidth();
                if (x2 >= this._container.getWidth()) {
                    x = this._container.getWidth() - block.getWidth();
                    this._blockConfigs[block.getID()]["x_dir"] = "left";
                }
            }
            else if (this._blockConfigs[block.getID()]["x_dir"] === "left") {
                x = block.getX() - this._blockConfigs[block.getID()]["speed"];
                x2 = x + block.getWidth();
                if (x <= 0) {
                    x = 0;
                    this._blockConfigs[block.getID()]["x_dir"] = "right";
                }
            }
            if (this._blockConfigs[block.getID()]["y_dir"] === "down") {
                y = block.getY() + this._blockConfigs[block.getID()]["speed"];
                y2 = y + block.getHeight();
                if (y2 >= this._container.getHeight()) {
                    y = this._container.getHeight() - block.getHeight();
                    this._blockConfigs[block.getID()]["y_dir"] = "up";
                }
            }
            else if (this._blockConfigs[block.getID()]["y_dir"] === "up") {
                y = block.getY() - this._blockConfigs[block.getID()]["speed"];
                y2 = y + block.getHeight();
                if (block.getY() <= 0) {
                    y = 0;
                    this._blockConfigs[block.getID()]["y_dir"] = "down";
                }
            }
            block.setCoordinate({ x, y });
        }
        if (!this._mouseIsIn && this._blocks.length > 0) {
            var picka = this._blocks[1];
            var fov = this._smallCamera.getFOV();
            this._smallCamera.setViewPoint({ x: picka.getX() + ((picka.getWidth() - fov.width) / 2), y: picka.getY() + ((picka.getHeight() - fov.height) / 2) });
        }
    }
    unload() {
        this._assetGroup.unload();
    }
}
window._CameraDemo = new CameraDemo();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = __webpack_require__(17);
exports.Engine = Engine_1.Engine;
const Instance_1 = __webpack_require__(3);
exports.getInstance = Instance_1.getInstance;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const audio_1 = __webpack_require__(24);
const assets_1 = __webpack_require__(0);
const Instance_1 = __webpack_require__(3);
class Engine {
    constructor() {
        Instance_1.setInstance(this);
        this._debugMode = false;
        this._logManager = utils_1.LogManager.getSingleton();
        this._assetFactory = assets_1.AssetFactory.getSingleton();
        this._audioEngine = new audio_1.HTML5AudioEngine();
        this._viewPort = new utils_1.ViewPort();
        this._logManager.log(utils_1.SeverityEnum.INFO, 'Engine has started.');
    }
    isDebugEnabled() {
        return this._debugMode;
    }
    setRenderingEngine(renderingEngine) {
        if (this._renderingEngine) {
        }
        this._renderingEngine = renderingEngine;
        this._renderingEngine.setViewPort(this._viewPort);
        this._renderingEngine.startRendering();
    }
    getRenderingEngine() {
        return this._renderingEngine;
    }
    setLogManager(logManager) {
        this._logManager = logManager;
    }
    getLogManager() {
        return this._logManager;
    }
    setAssetFactory(assetFactory) {
        this._assetFactory = assetFactory;
    }
    getAssetFactory() {
        return this._assetFactory;
    }
    getViewPort() {
        return this._viewPort;
    }
    setAudioEngine(audioEngine) {
        this._audioEngine = audioEngine;
    }
    getAudioEngine() {
        return this._audioEngine;
    }
    setLogicEngine(logicEngine) {
        this._logicEngine = logicEngine;
    }
    getLogicEngine() {
        return this._logicEngine;
    }
}
exports.default = Engine;
exports.Engine = Engine;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_VIEWPOINT = { x: 0, y: 0 };
const DEFAULT_FOV = { width: 100, height: 100 };
const DEFAULT_RENDER_ORIGIN = { x: 0, y: 0 };
const DEFAULT_RENDER_DIMENSION = { width: 100, height: 100 };
class Camera {
    constructor(scene, viewPoint, fov, renderOrigin, renderDimension) {
        this.setScene(scene);
        this.setViewPoint(viewPoint || DEFAULT_VIEWPOINT);
        this.setFOV(fov || DEFAULT_FOV);
        this.setRenderOrigin(renderOrigin || DEFAULT_RENDER_ORIGIN);
        this.setRenderDimension(renderDimension || DEFAULT_RENDER_DIMENSION);
    }
    setScene(scene) {
        this._scene = scene;
    }
    getScene() {
        return this._scene;
    }
    setViewPoint(viewPoint) {
        this._viewPoint = viewPoint;
    }
    getViewPoint() {
        return this._viewPoint;
    }
    setFOV(fov) {
        this._fov = fov;
    }
    getFOV() {
        return this._fov;
    }
    setRenderOrigin(origin) {
        this._renderOrigin = origin;
    }
    getRenderOrigin() {
        return this._renderOrigin;
    }
    setRenderDimension(dim) {
        this._renderDimension = dim;
    }
    getRenderDimension() {
        return this._renderDimension;
    }
}
exports.Camera = Camera;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(1);
class IDGenerator {
    constructor() { }
    generate() {
        return IDGenerator.generate();
    }
    static generate() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static getSingleton() {
        _1.LogManager.getSingleton().deprecate('IDGenerator should no longer be used as a singleton anymore. Instead use IDGenerator.generate().');
        if (!IDGenerator._instance) {
            IDGenerator._instance = new IDGenerator();
        }
        return IDGenerator._instance;
    }
}
exports.IDGenerator = IDGenerator;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SeverityEnum_1 = __webpack_require__(6);
class LogManager {
    constructor() {
        this._logLevel = SeverityEnum_1.SeverityEnum.WARNING | SeverityEnum_1.SeverityEnum.ERROR;
        this._logLevel = this._logLevel | SeverityEnum_1.SeverityEnum.DEBUG | SeverityEnum_1.SeverityEnum.INFO;
    }
    log(severity, message) {
        if (this.getLogLevel() & severity) {
            switch (severity) {
                case SeverityEnum_1.SeverityEnum.DEBUG:
                    console.debug(`[DEBUG] ${message}`);
                    break;
                case SeverityEnum_1.SeverityEnum.INFO:
                    console.info(`[INFO] ${message}`);
                    break;
                case SeverityEnum_1.SeverityEnum.WARNING:
                    console.warn(`[WARN] ${message}`);
                    break;
                case SeverityEnum_1.SeverityEnum.ERROR:
                    console.error(`[ERROR] ${message}`);
                    break;
                case SeverityEnum_1.SeverityEnum.DEPRECATE:
                    console.error(`[DEPRECATE] ${message}`);
            }
        }
    }
    debug(message) {
        this.log(SeverityEnum_1.SeverityEnum.DEBUG, message);
    }
    info(message) {
        this.log(SeverityEnum_1.SeverityEnum.INFO, message);
    }
    warn(message) {
        this.log(SeverityEnum_1.SeverityEnum.WARNING, message);
    }
    error(message) {
        this.log(SeverityEnum_1.SeverityEnum.ERROR, message);
    }
    deprecate(message) {
        this.log(SeverityEnum_1.SeverityEnum.DEPRECATE, message);
    }
    setLogLevel(severity) {
        this._logLevel = severity;
        this._logLevel = severity;
    }
    getLogLevel() {
        return this._logLevel;
    }
    static getSingleton() {
        if (!LogManager._instance) {
            LogManager._instance = new LogManager();
        }
        return LogManager._instance;
    }
}
LogManager._instance = new LogManager();
exports.LogManager = LogManager;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Events = __webpack_require__(2);
class ViewPort extends Events.EventEmitter {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._resizable = false;
        this._dimension = { width: 0, height: 0 };
        this._filledPage = false;
    }
    getCanvas() {
        return this._canvas;
    }
    getContext() {
        return this._context;
    }
    setResizable(resizable) {
        this._resizable = resizable;
    }
    isResizable() {
        return this._resizable;
    }
    setScale(dimension) {
        this._context.scale(dimension.width, dimension.height);
    }
    fillPage(state) {
        console.log("Test, ", state);
        this._filledPage = state;
        if (state) {
            this._canvas.style.position = "fixed";
            this._canvas.style.top = "0px";
            this._canvas.style.left = "0px";
            this._fillPage();
            this._resizeListener = this._fillPage.bind(this);
            window.addEventListener("resize", this._resizeListener);
        }
        else {
            this._canvas.style.position = "";
            window.removeEventListener("reisze", this._resizeListener);
        }
    }
    isFilledPage() {
        return this._filledPage;
    }
    getSize() {
        return { width: this._canvas.offsetWidth, height: this._canvas.offsetHeight };
    }
    setSize(dimension) {
        this._dimension = dimension;
        this._canvas.setAttribute('width', dimension.width + "px");
        this._canvas.setAttribute('height', dimension.height + "px");
        this.emit('resize', dimension);
    }
    clear() {
        this._context.clearRect(0, 0, this._dimension.width, this._dimension.height);
    }
    drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height) {
        this._context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
    }
    setFont(font) {
        this._context.font = font;
    }
    setColor(color) {
        this._context.fillStyle = color.toString();
    }
    measureText(text) {
        return this._context.measureText(text);
    }
    setTextBaseline(baseline) {
        this._context.textBaseline = baseline;
    }
    drawText(text, x, y, maxWidth) {
        this._context.fillText(text, x, y, maxWidth);
    }
    setHidden() {
        this._canvas.style.position = "absolute";
        this._canvas.style.left = '110001px';
    }
    getImage() {
        var image = document.createElement('img');
        image.src = this._canvas.toDataURL("image/png");
        return image;
    }
    _fillPage() {
        var newSize = { width: window.innerWidth, height: window.innerHeight };
        let eventData = {
            type: 0..toString(),
            oldDimensions: this.getSize(),
            newDimensions: newSize,
            source: this
        };
        this.setSize(newSize);
        this.emit(0..toString(), eventData);
    }
}
exports.ViewPort = ViewPort;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CollisionEmitter {
    constructor() {
        this._cbs = {};
        this._entities = [];
        this._entitiesListeners = {};
        this._listeners = [];
        this._cbs[0] = this._onEntityLocationUpdate.bind(this);
    }
    addEntity(entity) {
        if (!this.hasEntity(entity)) {
            this._entities.push(entity);
            this._entitiesListeners[entity.getID()] = [];
            entity.on(0..toString(), this._cbs[0]);
        }
    }
    removeEntity(entity) {
        if (this.hasEntity(entity)) {
            this._entities.splice(this._entities.indexOf(entity), 1);
            delete this._entitiesListeners[entity.getID()];
        }
    }
    hasEntity(entity) {
        return this._entitiesListeners.hasOwnProperty(entity.getID());
    }
    addEntityCollisionListener(entity, callback) {
        if (!this.hasEntity(entity)) {
            this.addEntity(entity);
        }
        this._entitiesListeners[entity.getID()].push(callback);
    }
    removeEntityCollisionListener(entity, callback) {
        if (this._entitiesListeners[entity.getID()].indexOf(callback) > -1) {
            this._entitiesListeners[entity.getID()].splice(this._entitiesListeners[entity.getID()].indexOf(callback), 1);
        }
    }
    addCollisionListener(callback) {
        this._listeners.push(callback);
    }
    removeCollisionListener(callback) {
        if (this._listeners.indexOf(callback) > -1) {
            this._listeners.splice(this._listeners.indexOf(callback), 1);
        }
    }
    _onEntityLocationUpdate(event) {
        let entity = event.source;
        if (entity.getParent()) {
            var potCollisions = entity.getParent().findChildren({ x: entity.getX(), y: entity.getY() }, { x: entity.getX2(), y: entity.getY2() });
            var collisions = [];
            for (let i in potCollisions) {
                let potEntity = potCollisions[i];
                if (potEntity != entity && this.hasEntity(potEntity)) {
                    collisions.push(potEntity);
                }
            }
            if (collisions.length > 0) {
                for (let i in this._listeners) {
                    let listener = this._listeners[i];
                    listener(entity, collisions[0], event);
                }
            }
        }
    }
}
exports.CollisionEmitter = CollisionEmitter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ColorCode_1 = __webpack_require__(8);
class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
        this.setAlpha(a);
    }
    setRed(r) {
        this._r = r;
    }
    setGreen(g) {
        this._g = g;
    }
    setBlue(b) {
        this._b = b;
    }
    setAlpha(a) {
        this._a = a * 255;
    }
    getRed() {
        return this._r;
    }
    getGreen() {
        return this._g;
    }
    getBlue() {
        return this._b;
    }
    getAlpha() {
        return this._a / 255;
    }
    toRGB() {
        return `rgb(${this.getRed()},${this.getGreen()},${this.getBlue()})`;
    }
    toRGBA() {
        return `rgba(${this.getRed()},${this.getGreen()},${this.getBlue()},${this.getAlpha()})`;
    }
    toHex() {
        return (this.getRed() << 16) + (this.getGreen() << 8) + this.getBlue();
    }
    toHexString() {
        var hex = `#`;
        hex += this._toHexString(this.getRed());
        hex += this._toHexString(this.getGreen());
        hex += this._toHexString(this.getBlue());
        return hex.toUpperCase();
    }
    valueOf() {
        return this.toString();
    }
    toString() {
        return this.toRGBA();
    }
    _toHexString(value) {
        var hex = value.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        return hex;
    }
    static _parseHexString(color) {
        var colorCodes = [];
        color = color.replace('#', '');
        switch (color.length) {
            case 3:
                color = `${color.charAt(0)}${color.charAt(0)}${color.charAt(1)}${color.charAt(1)}${color.charAt(2)}${color.charAt(2)}`;
                break;
            case 6:
                break;
            default:
                throw new Error(`Malformed hex code "#${color}". Expecting hex length of 3 or 6.`);
        }
        var rHex = color.slice(0, 2);
        var gHex = color.slice(2, 4);
        var bHex = color.slice(4, 6);
        colorCodes[0] = parseInt(rHex, 16);
        colorCodes[1] = parseInt(gHex, 16);
        colorCodes[2] = parseInt(bHex, 16);
        colorCodes[3] = 255;
        for (var i = 0; i < colorCodes.length; i++) {
            if (isNaN(colorCodes[i])) {
                throw new Error('Invalid hex code.');
            }
        }
        return colorCodes;
    }
    static _parseRGB(color) {
        var colorCodes = [];
        color = color.toLowerCase();
        if (color.indexOf('rgba(') > -1) {
            color = color.replace('rgba(', '');
            color = color.replace(')', '');
            var parts = color.split(',');
            colorCodes[0] = parseInt(parts[0]);
            colorCodes[1] = parseInt(parts[1]);
            colorCodes[2] = parseInt(parts[2]);
            colorCodes[3] = parseInt(parts[3]);
        }
        else if (color.indexOf('rgb(') > -1) {
            color = color.replace('rgb(', '');
            color = color.replace(')', '');
            var parts = color.split(',');
            colorCodes[0] = parseInt(parts[0]);
            colorCodes[1] = parseInt(parts[1]);
            colorCodes[2] = parseInt(parts[2]);
            colorCodes[3] = 255;
        }
        else {
            throw new Error(`Malformed RGB structure "${color}". Expecting rgb(#,#,#) or rgba(#,#,#,#)`);
        }
        for (var i = 0; i < colorCodes.length; i++) {
            var code = colorCodes[i];
            if (isNaN(code) || (code < 0 || code > 255)) {
                throw new Error('Invalid code value in RGB');
            }
        }
        return colorCodes;
    }
    static _parseColorName(color) {
        if (ColorCode_1.ColorMap[color] !== undefined) {
            var colorCode = ColorCode_1.ColorMap[color];
            var rgb = Color._parseHex(colorCode);
            return [rgb.r, rgb.g, rgb.b, 255];
        }
        else {
            throw new Error(`Invalid color "${color}"`);
        }
    }
    static fromString(color) {
        var colorCodes;
        if (color.charAt(0) === '#') {
            colorCodes = Color._parseHexString(color);
        }
        else if (/rgba?/.test(color)) {
            colorCodes = Color._parseRGB(color);
        }
        else {
            colorCodes = Color._parseColorName(color);
        }
        var r = colorCodes[0];
        var g = colorCodes[1];
        var b = colorCodes[2];
        var a = colorCodes[3];
        return new Color(r, g, b, a / 255);
    }
    static fromHex(hex) {
        var rgb = Color._parseHex(hex);
        return new Color(rgb.r, rgb.g, rgb.b);
    }
    static fromColorCode(code) {
        return Color.fromHex(code);
    }
    static _parseHex(hex) {
        var r = hex >> 16;
        var g = hex >> 8 & 0xFF;
        var b = hex & 0xFF;
        return { r, g, b };
    }
}
exports.Color = Color;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AudioEngine_1 = __webpack_require__(9);
exports.AudioEngine = AudioEngine_1.AudioEngine;
const HTML5AudioEngine_1 = __webpack_require__(36);
exports.HTML5AudioEngine = HTML5AudioEngine_1.HTML5AudioEngine;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const assets_1 = __webpack_require__(0);
const events_1 = __webpack_require__(2);
class Asset extends events_1.EventEmitter {
    constructor(type, url) {
        super();
        this._id = utils_1.IDGenerator.getSingleton().generate();
        this._type = type;
        this._data = null;
        this.setSource(url);
        this._attributes = {};
    }
    setSource(source) {
        if (source !== this.getSource()) {
            this._url = source;
            this.setData(null);
            this.setState(assets_1.AssetState.NOT_LOADED);
        }
    }
    getSource() {
        return this._url;
    }
    setState(state) {
        if (this._state !== state) {
            this._state = state;
            this.onStateChange(this._state);
            this.emit("state_change", this._state);
        }
    }
    getState() {
        return this._state;
    }
    setData(data) {
        this._data = data;
        this.onDataChange(this._data);
        this.emit("data_change", this._data);
    }
    getData() {
        return this._data;
    }
    getType() {
        return this._type;
    }
    setLoadStrategy(loadStrategy) {
        this._loadStrategy = loadStrategy;
    }
    getLoadStrategy() {
        return this._loadStrategy;
    }
    load() {
        return this._loadStrategy.load(this);
    }
    unload() {
        return this._loadStrategy.unload(this);
    }
    isReady() {
        return (this.getState() === assets_1.AssetState.LOADED);
    }
    setAttribute(key, value) {
        this._attributes[key] = value;
    }
    getAttribute(key) {
        return this._attributes[key];
    }
    isAttribute(key) {
        return !!this._attributes[key];
    }
    removeAttribute(key) {
        delete this._attributes[key];
    }
    onStateChange(state) { }
    onDataChange(data) { }
    onError(error) {
        this.emit("error", error);
    }
}
exports.Asset = Asset;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __webpack_require__(0);
class AssetFactory {
    constructor() {
        this._assetLoader = new assets_1.AssetLoader();
        this._audioLoader = new assets_1.AudioLoader();
        this._imageLoader = new assets_1.ImageLoader();
        this._jsonLoader = new assets_1.JSONLoader();
        this._cache = {};
    }
    static getSingleton() {
        if (!AssetFactory._instance) {
            AssetFactory._instance = new AssetFactory();
        }
        return AssetFactory._instance;
    }
    build(type, url) {
        var asset;
        var cache = this._cache[url];
        if (cache) {
            asset = this._clone(cache);
        }
        else {
            asset = new assets_1.Asset(type, url);
        }
        if (!cache) {
            switch (type) {
                default:
                    break;
                case assets_1.AssetType.RAW:
                    asset.setLoadStrategy(this._assetLoader);
                    this._configureRawAsset(asset, url);
                    break;
                case assets_1.AssetType.IMAGE:
                    asset.setLoadStrategy(this._imageLoader);
                    this._configureImageAsset(asset, url);
                    break;
                case assets_1.AssetType.AUDIO:
                    asset.setLoadStrategy(this._audioLoader);
                    this._configureAudioAsset(asset, url);
                    break;
                case assets_1.AssetType.JSON:
                    asset.setLoadStrategy(this._jsonLoader);
                    this._configureJSONAsset(asset, url);
                    break;
            }
            this._cache[url] = asset;
        }
        return asset;
    }
    _configureRawAsset(asset, url) { }
    _configureImageAsset(asset, url) {
        var img = document.createElement('img');
        img.addEventListener('load', function () {
            asset.setState(assets_1.AssetState.LOADED);
        });
        asset.setData(img);
    }
    _configureJSONAsset(asset, url) { }
    _configureAudioAsset(asset, url) {
        var audio = document.createElement('audio');
        audio.addEventListener('canplaythrough', function () {
            asset.setState(assets_1.AssetState.LOADED);
        });
        asset.setData(audio);
    }
    _clone(asset) {
        var type = asset.getType();
        var clone = new assets_1.Asset(type, asset.getSource());
        this._cloneAssetData(clone, asset, type);
        return clone;
    }
    _cloneAssetData(clone, asset, type) {
        var data = null;
        switch (type) {
            default:
                data = asset.getData();
                break;
            case assets_1.AssetType.IMAGE:
                data = this._cloneNode(asset.getData());
                break;
            case assets_1.AssetType.AUDIO:
                data = this._cloneNode(asset.getData());
                break;
        }
        clone.setLoadStrategy(asset.getLoadStrategy());
        clone.setData(data);
    }
    _cloneNode(node) {
        if (node) {
            return node.cloneNode(true);
        }
        else {
            return null;
        }
    }
}
exports.AssetFactory = AssetFactory;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AssetType_1 = __webpack_require__(4);
const AssetGroup_1 = __webpack_require__(11);
const Instance_1 = __webpack_require__(3);
const Iterator_1 = __webpack_require__(7);
class AssetGroupLoader {
    constructor() {
        this._assetFactory = Instance_1.getInstance().getAssetFactory();
    }
    load(path) {
        return new Promise((resolve, reject) => {
            var json = this._assetFactory.build(AssetType_1.AssetType.JSON, path);
            json.load().then((assetGroupDefs) => {
                var data = assetGroupDefs.getData();
                resolve(this._createGroup(data));
            }).catch(reject);
        });
    }
    loadFromAsset(asset) {
        if (asset.getType() !== AssetType_1.AssetType.JSON) {
            throw new Error('loadFromAsset expects a JSON asset.');
        }
        return this._createGroup(asset.getData());
    }
    loadFromMemory(data) {
        return this._createGroup(data);
    }
    _createGroup(data) {
        var iterator = new Iterator_1.Iterator(data.assets);
        var group = new AssetGroup_1.AssetGroup();
        while (iterator.hasNext()) {
            var assetDef = iterator.next();
            var asset = this._assetFactory.build(assetDef.type, assetDef.source);
            group.addAsset(assetDef.name, asset);
        }
        return group;
    }
}
exports.AssetGroupLoader = AssetGroupLoader;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __webpack_require__(0);
class AssetLoader {
    constructor() { }
    load(asset) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            var source = asset.getSource();
            if (this._validateURL(source)) {
                request.open(this._getMethod(), asset.getSource());
                asset.setState(assets_1.AssetState.LOADING);
                request.onreadystatechange = (e) => {
                    if (request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200) {
                            this._onSuccess(asset, request.responseText, resolve);
                        }
                        else {
                            this._onFail(asset, request, reject);
                            reject(asset);
                        }
                    }
                    this._postRequest();
                };
                this._preRequest();
                request.send();
            }
            else {
                this._onSuccess(asset, source, resolve);
            }
        });
    }
    unload(asset) {
        return new Promise((resolve, reject) => {
            asset.setState(assets_1.AssetState.UNLOADING);
            process.nextTick(() => {
                asset.setData(null);
                asset.setState(assets_1.AssetState.NOT_LOADED);
                resolve(asset);
            });
        });
    }
    clone(asset, clone) {
        clone.setData(asset.getData());
    }
    _validateURL(url) {
        url = url.trim();
        var type = url.substring(0, 5);
        if (type === 'data:') {
            return false;
        }
        return true;
    }
    _getMethod() {
        return 'GET';
    }
    _preRequest() { }
    _postRequest() { }
    _onSuccess(asset, data, resolve) {
        asset.setData(data);
        asset.setState(assets_1.AssetState.LOADED);
        resolve(asset);
    }
    _onFail(asset, error, reject) {
        reject({
            detailed: error,
            message: 'Generic Error Message',
            asset: asset
        });
    }
}
exports.AssetLoader = AssetLoader;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __webpack_require__(0);
class AudioLoader extends assets_1.AssetLoader {
    constructor() {
        super();
    }
    load(asset) {
        asset.setState(assets_1.AssetState.LOADING);
        return new Promise((resolve, reject) => {
            var audio = asset.getData();
            audio.setAttribute('preload', 'auto');
            this._assignEvents(asset, audio, resolve, reject);
            audio.src = asset.getSource();
        });
    }
    unload(asset) {
        asset.setState(assets_1.AssetState.UNLOADING);
        return new Promise((resolve, reject) => {
            var audio = asset.getData();
            audio.oncanplaythrough = null;
            audio.onerror = null;
            audio.onplaying = null;
            audio.onended = null;
            asset.setData(null);
            asset.setState(assets_1.AssetState.NOT_LOADED);
            resolve(asset);
        });
    }
    _assignEvents(asset, audio, resolve, reject) {
        var canPlay = (e) => {
            audio.oncanplaythrough = null;
            this._onSuccess(asset, audio, resolve);
        };
        audio.oncanplaythrough = canPlay;
        audio.onerror = (e) => {
            this._onFail(asset, e, reject);
        };
        audio.onplaying = (e) => {
            asset.setAttribute('playing', true);
        };
        audio.onended = (e) => {
            audio.currentTime = 0;
            asset.setAttribute('playing', false);
        };
    }
}
exports.AudioLoader = AudioLoader;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __webpack_require__(0);
class ImageLoader extends assets_1.AssetLoader {
    constructor() {
        super();
    }
    load(asset) {
        asset.setState(assets_1.AssetState.LOADING);
        return new Promise((resolve, reject) => {
            var image = asset.getData();
            image.onload = (e) => {
                this._onSuccess(asset, image, resolve);
            };
            image.onerror = (e) => {
                this._onFail(asset, e, reject);
            };
            image.src = asset.getSource();
        });
    }
    unload(asset) {
        asset.setState(assets_1.AssetState.UNLOADING);
        return new Promise((resolve, reject) => {
            var image = asset.getData();
            image.onload = null;
            image.onerror = null;
            image.src = null;
            asset.setData(null);
            asset.setState(assets_1.AssetState.NOT_LOADED);
            resolve(asset);
        });
    }
}
exports.ImageLoader = ImageLoader;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __webpack_require__(0);
class JSONLoader extends assets_1.AssetLoader {
    constructor() {
        super();
    }
    _onSuccess(asset, data, resolve) {
        var json = data;
        asset.setData(JSON.parse(json));
        resolve(asset);
    }
}
exports.JSONLoader = JSONLoader;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const assets_1 = __webpack_require__(0);
class TextAssetBuilder {
    constructor() { }
    build(font, text, maxWidth, height, color) {
        var textViewPort = new utils_1.ViewPort();
        var textAsset = new assets_1.Asset(assets_1.AssetType.IMAGE);
        textViewPort.setFont(font);
        textViewPort.setColor(color || utils_1.Color.fromString("green"));
        textViewPort.setTextBaseline("hanging");
        if (!maxWidth) {
            maxWidth = textViewPort.measureText(text).width;
        }
        textViewPort.setSize({ width: maxWidth, height });
        textViewPort.setTextBaseline("hanging");
        textViewPort.drawText(text, 0, 0, maxWidth);
        textAsset.setData(textViewPort.getImage());
        return textAsset;
    }
}
exports.TextAssetBuilder = TextAssetBuilder;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const assets_1 = __webpack_require__(0);
class Spritesheet {
    constructor(spritesheetAsset, spritesheetDefinition) {
        this._spritesheetAsset = spritesheetAsset;
        this._spritesheetDefinition = spritesheetDefinition;
        this._spriteCache = {};
    }
    getSprite(id) {
        if (this._spriteCache[id]) {
            return this._spriteCache[id];
        }
        else if (this._spritesheetDefinition[id]) {
            var def = this._spritesheetDefinition[id];
            var spriteViewPort = new utils_1.ViewPort();
            this._spriteCache[id] = new assets_1.Asset(assets_1.AssetType.IMAGE);
            spriteViewPort.setSize({ width: def.width, height: def.height });
            spriteViewPort.getContext().translate(def.flipX === true ? def.width : 0, def.flipY === true ? def.height : 0);
            spriteViewPort.setScale({ width: def.flipX === true ? -1 : 1, height: def.flipY === true ? -1 : 1 });
            spriteViewPort.drawImage(this._spritesheetAsset.getData(), def.x, def.y, def.width, def.height, 0, 0, def.width, def.height);
            this._spriteCache[id].setData(spriteViewPort.getImage());
            return this._spriteCache[id];
        }
        else {
            return false;
        }
    }
}
exports.Spritesheet = Spritesheet;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Animation {
    constructor(entity, animationDefinitions) {
        this._entity = entity;
        this._animationDefinition = animationDefinitions;
        this.loop = true;
        this._timeout = false;
        this.reverseLoop = false;
        this._animating = false;
        this._animation_index = -1;
    }
    isAnimating() {
        return this._animating;
    }
    start() {
        if (!this._timeout) {
            this._direction = "forward";
            this._loadStep(0);
            this._animating = true;
        }
    }
    stop() {
        clearTimeout(this._timeout);
        this._timeout = false;
        this._animating = false;
    }
    _loadStep(stepIndex) {
        var step = this._animationDefinition[stepIndex];
        var sprite = step.asset;
        this._entity.setTexture(sprite);
        this._entity.setWidth(sprite.getData().width);
        this._entity.setHeight(sprite.getData().height);
        var offset = 0;
        if (step.moveX || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX)) {
            if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX) {
                offset = 0 - this._animationDefinition[stepIndex + 1].moveX;
                this._entity.setX(this._entity.getX() - this._animationDefinition[stepIndex + 1].moveX);
            }
            else {
                offset = 0 + step.moveX;
                this._entity.setX(this._entity.getX() + step.moveX);
            }
        }
        if (step.moveY || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY)) {
            if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY) {
                this._entity.setY(this._entity.getY() - this._animationDefinition[stepIndex + 1].moveY);
            }
            else {
                this._entity.setY(this._entity.getY() + step.moveY);
            }
        }
        var nextStepIndex;
        if (this._direction === "reverse") {
            nextStepIndex = stepIndex - 1;
        }
        else {
            nextStepIndex = stepIndex + 1;
        }
        if (this._animationDefinition[nextStepIndex]) {
            this._timeout = setTimeout(() => {
                this._loadStep(nextStepIndex);
            }, step.delay);
        }
        else if (this.reverseLoop) {
            this._timeout = setTimeout(() => {
                if (this._direction === "forward") {
                    this._direction = "reverse";
                    this._loadStep(stepIndex - 1);
                }
                else if (this._direction === "reverse") {
                    this._direction = "forward";
                    this._loadStep(stepIndex + 1);
                }
            }, step.delay);
        }
        else if (this.loop) {
            this._timeout = setTimeout(() => {
                this._loadStep(0);
            }, step.delay);
        }
        else {
            this.stop();
        }
    }
}
exports.Animation = Animation;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AudioEngine_1 = __webpack_require__(9);
class HTML5AudioEngine extends AudioEngine_1.AudioEngine {
    constructor() {
        super();
        this._backgroundVolume = 1.0;
        this._soundEffectVolume = 1.0;
        this._backgroundAudios = [];
        this._soundEffects = [];
    }
    addBackgroundMusic(name, audio) {
        this.addAudio(name, audio);
        this._backgroundAudios.push(audio);
    }
    addSoundEffect(name, audio) {
        this.addAudio(name, audio);
        this._soundEffects.push(audio);
    }
    setBackgroundVolume(volume) {
        this._backgroundVolume = volume;
        for (var i = 0, len = this._backgroundAudios.length; i < len; i++) {
            this._setVolume(this._backgroundAudios[i], this._backgroundVolume);
        }
    }
    setSoundEffectVolume(volume) {
        this._soundEffectVolume = volume;
        for (var i = 0, len = this._soundEffects.length; i < len; i++) {
            this._setVolume(this._soundEffects[i], this._soundEffectVolume);
        }
    }
    isBackgroundMusic(audio) {
        return (this._backgroundAudios.indexOf(audio) > -1);
    }
    isSoundEffect(audio) {
        return (this._soundEffects.indexOf(audio) > -1);
    }
    _playAudio(audio) {
        this._updateVolume(audio);
        var data = this._getData(audio);
        data.play();
    }
    _updateVolume(audio) {
        if (this.isSoundEffect(audio)) {
            this._setVolume(audio, this._soundEffectVolume);
        }
        else if (this.isBackgroundMusic(audio)) {
            this._setVolume(audio, this._backgroundVolume);
        }
    }
    _pauseAudio(audio) {
        var data = this._getData(audio);
        data.pause();
    }
    _stopAudio(audio) {
        var data = this._getData(audio);
        data.pause();
        this._setTimeCursor(audio, 0);
    }
    _isAudioLooping(audio) {
        var data = this._getData(audio);
        return data.loop;
    }
    _loopAudio(audio, state) {
        var data = this._getData(audio);
        data.loop = state;
    }
    _isAudioMuted(audio) {
        var data = this._getData(audio);
        return data.muted;
    }
    _muteAudio(audio, state) {
        var data = this._getData(audio);
        data.muted = state;
    }
    _getAudioDuration(audio) {
        var data = this._getData(audio);
        return data.duration;
    }
    _setTimeCursor(audio, seconds) {
        var data = this._getData(audio);
        data.currentTime = seconds;
    }
    _getTimeCursor(audio) {
        var data = this._getData(audio);
        return data.currentTime;
    }
    _setVolume(audio, volume) {
        var data = this._getData(audio);
        data.volume = volume;
    }
    _getVolume(audio) {
        var data = this._getData(audio);
        return data.volume;
    }
    _registerStartEvent(audio) {
        var data = audio.getData();
        data.addEventListener('playing', function (e) {
            audio.setAttribute('playing', true);
        });
    }
    _registerEndEvent(audio) {
        var data = audio.getData();
        data.addEventListener('ended', function (e) {
            audio.setAttribute('playing', false);
        });
    }
}
exports.HTML5AudioEngine = HTML5AudioEngine;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LogicEngine {
}
exports.LogicEngine = LogicEngine;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
class GroupLogicEngine extends _1.LogicEngine {
    constructor() {
        super();
        this._logicCalls = {};
        this._intervals = {};
        this._interval = 10;
    }
    addLogic(id, logicMethod, interval) {
        this._logicCalls[id] = {
            'method': logicMethod,
            'interval': interval
        };
        if (!this._hasInterval(interval)) {
            this._createInterval(interval);
        }
        this._addToInterval(id);
    }
    pauseLogic(id) {
        this._removeFromInterval(id);
    }
    resumeLogic(id) {
        this._addToInterval(id);
    }
    removeLogic(id) {
        if (this._logicCalls[id]) {
            this._removeFromInterval(id);
            delete this._logicCalls[id];
        }
    }
    _createInterval(interval) {
        var self = this;
        var methods = [];
        this._intervals[interval] = {
            'methods': methods,
            'interval_id': setInterval(() => {
                this._processInterval(interval);
            }, interval)
        };
    }
    _hasInterval(interval) {
        return this._intervals[interval] != undefined;
    }
    _removeInterval(interval) {
        clearInterval(this._intervals[interval].interval_id);
        delete this._intervals[interval];
    }
    _addToInterval(id) {
        this._intervals[this._logicCalls[id].interval].methods.push(this._logicCalls[id].method);
    }
    _removeFromInterval(id) {
        var interval = this._logicCalls[id].interval;
        this._intervals[interval].methods.splice(this._intervals[interval].methods.indexOf(this._logicCalls[id].method), 1);
        if (this._intervals[interval].methods.length === 0) {
            this._removeInterval(interval);
        }
    }
    _processInterval(interval) {
        for (var i in this._intervals[interval].methods) {
            this._intervals[interval].methods[i]();
        }
    }
}
exports.GroupLogicEngine = GroupLogicEngine;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
class RenderingEngine {
    constructor() {
        this._prerenderViewPort = new utils_1.ViewPort();
        this._rendering = false;
        this._fps = 0;
        this._frames = 0;
        this._showFPS = true;
        this._cameras = [];
    }
    setViewPort(viewPort) {
        this._viewPort = viewPort;
    }
    getViewPort() {
        return this._viewPort;
    }
    setHUD(hud) {
        this._HUDEntity = hud;
    }
    getHUD() {
        return this._HUDEntity;
    }
    addCamera(camera) {
        this._cameras.push(camera);
    }
    removeCamera(camera) {
        delete this._cameras[this._cameras.indexOf(camera)];
    }
    startRendering() {
        if (this._viewPort) {
            var self = this;
            this._rendering = true;
            this._requestFrame();
            return true;
        }
        else {
            console.warn('Unable to begin rendering, no view port assigned to rendering engine.');
            return false;
        }
    }
    stopRendering() {
        window.cancelAnimationFrame(this._animationFrameID);
        this._animationFrameID = null;
        this._rendering = false;
    }
    _requestFrame() {
        if (this._rendering) {
            this._animationFrameID = window.requestAnimationFrame(() => {
                this._render();
                this._postRender();
            });
        }
    }
    _render() {
        this._viewPort.clear();
    }
    _calculateFPS() {
        var date = new Date();
        if (this._lastRender) {
            if (this._lastRender.getSeconds() != date.getSeconds()) {
                this._fps = this._frames;
                this._frames = 1;
            }
            else {
                this._frames += 1;
            }
        }
        this._lastRender = date;
    }
    _postRender() {
        if (this._showFPS) {
            this._calculateFPS();
            var ctx = this._viewPort.getContext();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 100, 35);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'white';
            ctx.font = "20px Georgia";
            ctx.fillText(this._fps + " FPS", 20, 25);
        }
        this._requestFrame();
    }
}
exports.RenderingEngine = RenderingEngine;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
class TwoDimensionalRenderingEngine extends _1.RenderingEngine {
    _render() {
        super._render();
        var context = this.getViewPort().getContext();
        for (var i in this._cameras) {
            this._renderCamera(this._cameras[i]);
        }
        if (this.getHUD()) {
            this._renderEntity(this.getHUD(), null);
        }
    }
    _renderCamera(camera) {
        var scene = camera.getScene();
        var context = this.getViewPort().getContext();
        if (this.debugCamera) {
            var viewPoint = camera.getViewPoint();
            var fov = camera.getFOV();
            var renderOrigin = camera.getRenderOrigin();
            var renderDimension = camera.getRenderDimension();
            context.beginPath();
            context.rect(viewPoint.x, viewPoint.y, fov.width, fov.height);
            context.lineWidth = 7;
            context.strokeStyle = 'red';
            context.stroke();
            context.beginPath();
            context.rect(renderOrigin.x, renderOrigin.y, renderDimension.width, renderDimension.height);
            context.lineWidth = 7;
            context.fillStyle = 'black';
            context.fill();
            context.strokeStyle = 'green';
            context.stroke();
        }
        this._renderEntity(scene, camera);
    }
    _renderEntity(entity, camera) {
        if (camera) {
            var viewPoint = camera.getViewPoint();
            var fov = camera.getFOV();
            var renderOrigin = camera.getRenderOrigin();
            var renderDimension = camera.getRenderDimension();
            var collidesYAxis = false;
            var collidesXAxis = false;
            var cameraBounds = {
                x: viewPoint.x,
                y: viewPoint.y,
                x2: viewPoint.x + fov.width,
                y2: viewPoint.y + fov.height
            };
            var entityBounds = {
                x: entity.getAbsoluteX(),
                y: entity.getAbsoluteY(),
                x2: entity.getAbsoluteX2(),
                y2: entity.getAbsoluteY2()
            };
            if ((entityBounds.x < cameraBounds.x2 && entityBounds.x2 > cameraBounds.x)
                || (entityBounds.x2 > cameraBounds.x && entityBounds.x < cameraBounds.x2)) {
                collidesXAxis = true;
            }
            if ((entityBounds.y < cameraBounds.y2 && entityBounds.y2 > cameraBounds.y)
                || (entityBounds.y2 > cameraBounds.y && entityBounds.y < cameraBounds.y2)) {
                collidesYAxis = true;
            }
            if (!collidesYAxis || !collidesXAxis) {
                return false;
            }
            var leftClip = 0;
            if (entity.getAbsoluteX() < viewPoint.x) {
                leftClip = viewPoint.x - entity.getAbsoluteX();
            }
            var rightClip = 0;
            if (entity.getAbsoluteX2() > (viewPoint.x + fov.width)) {
                rightClip = entity.getAbsoluteX2() - (viewPoint.x + fov.width);
            }
            var topClip = 0;
            if (entity.getAbsoluteY() < viewPoint.y) {
                topClip = viewPoint.y - entity.getAbsoluteY();
            }
            var bottomClip = 0;
            if (entity.getAbsoluteY2() > (viewPoint.y + fov.height)) {
                bottomClip = entity.getAbsoluteY2() - (viewPoint.y + fov.height);
            }
            var xModifier = fov.width / renderDimension.width;
            var yModifier = fov.height / renderDimension.height;
            var cameraRelativeY = (entityBounds.y - cameraBounds.y) / yModifier;
            if (cameraRelativeY < 0) {
                cameraRelativeY = 0;
            }
            var cameraRelativeX = (entityBounds.x - cameraBounds.x) / xModifier;
            if (cameraRelativeX < 0) {
                cameraRelativeX = 0;
            }
            var clippedEntityHeight = (entity.getHeight() - topClip - bottomClip);
            var clippedEntityWidth = (entity.getWidth() - rightClip - leftClip);
            var x = renderOrigin.x + cameraRelativeX;
            var y = renderOrigin.y + cameraRelativeY;
            var w = clippedEntityWidth / xModifier;
            var h = clippedEntityHeight / yModifier;
            if (entity.getColor()) {
                var color = entity.getColor();
                this.getViewPort().getContext().fillStyle = color.toString();
                this.getViewPort().getContext().fillRect(x, y, w, h);
            }
            if (this.debugRegions) {
                var regions = entity.getRegions();
                for (var x_i in regions) {
                    for (var y_i in regions[x]) {
                        if (regions[x_i][y_i].length > 0) {
                            this.getViewPort().getContext().strokeStyle = "red";
                            this.getViewPort().getContext().strokeRect(entity.getAbsoluteX() + entity.getRegionDimension().width * parseInt(x_i), entity.getAbsoluteY() + entity.getRegionDimension().height * parseInt(y_i), entity.getRegionDimension().width, entity.getRegionDimension().height);
                        }
                    }
                }
            }
            if (entity.getTexture()) {
                var imageData = entity.getTexture().getData();
                var entityToImageYModifier = imageData.height / entity.getHeight();
                var entityToImageXModifier = imageData.width / entity.getWidth();
                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
                this.getViewPort().getContext().drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h);
            }
        }
        else {
            var x = entity.getX();
            var y = entity.getY();
            var w = entity.getWidth();
            var h = entity.getHeight();
            if (entity.getColor()) {
                var color = entity.getColor();
                this.getViewPort().getContext().fillStyle = color.toString();
                this.getViewPort().getContext().fillRect(x, y, w, h);
            }
            if (entity.getTexture()) {
                var imageData = entity.getTexture().getData();
                var entityToImageYModifier = imageData.height / entity.getHeight();
                var entityToImageXModifier = imageData.width / entity.getWidth();
                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
                this.getViewPort().getContext().drawImage(imageData, x, y, w, h);
            }
        }
        var children = entity.getChildren();
        while (children.hasNext()) {
            this._renderEntity(children.next(), camera);
        }
        return true;
    }
}
exports.TwoDimensionalRenderingEngine = TwoDimensionalRenderingEngine;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Events = __webpack_require__(2);
const utils_1 = __webpack_require__(1);
class EntityModel extends Events.EventEmitter {
    constructor() {
        super();
        this._attributes = {};
        this._id = utils_1.IDGenerator.getSingleton().generate();
        this._type = 'generic';
    }
    getID() {
        return this._id;
    }
    setType(type) {
        this._type = type;
    }
    getType() {
        return this._type;
    }
    setTexture(asset) {
        this._texture = asset;
        this.emit(3..toString(), {
            attribute: 'texture',
            name: name,
            value: asset
        });
    }
    getTexture() {
        return this._texture;
    }
    setAttribute(key, value) {
        var oldValue = this.getAttribute(key);
        this._attributes[key] = value;
        this.emit(1..toString(), {
            attribute: key,
            oldValue: oldValue,
            value: value
        });
    }
    removeAttribute(key) {
        var value = this.getAttribute(key);
        delete this._attributes[key];
        var data = {
            type: 2..toString(),
            attribute: key,
            value: value,
            source: this
        };
        this.emit(2..toString(), data);
    }
    getAttribute(key) {
        return this._attributes[key];
    }
    hasAttribute(key) {
        if (this._attributes[key]) {
            return true;
        }
        else {
            return false;
        }
    }
    sync(listener) {
    }
}
exports.EntityModel = EntityModel;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EntityView_1 = __webpack_require__(14);
class EntityView2D extends EntityView_1.EntityView {
}
exports.EntityView2D = EntityView2D;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __webpack_require__(13);
class GridMap extends Entity_1.Entity {
    constructor(tileSize, tileCount) {
        super();
        this.tileSize = tileSize;
        this.tileCount = tileCount;
        this._tiles = [];
        this.setWidth(this.tileSize.width * this.tileCount.x);
        this.setHeight(this.tileSize.height * this.tileCount.y);
        for (var x = 0; x < this.tileCount.x; x++) {
            for (var y = 0; y < this.tileCount.y; y++) {
                var tile = new Entity_1.Entity();
                tile.setWidth(this.tileSize.width);
                tile.setHeight(this.tileSize.height);
                tile.setX((x + 1) * this.tileSize.width);
                tile.setY((y + 1) * this.tileSize.height);
                this.addChild(tile);
                if (!this._tiles[x]) {
                    this._tiles[x] = [];
                }
                this._tiles[x][y] = tile;
            }
        }
    }
    getTile(coordinate) {
        return this._tiles[coordinate.x][coordinate.y];
    }
    getTiles() {
        return this._children;
    }
}
exports.GridMap = GridMap;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AssetType_1 = __webpack_require__(4);
const pikachuSmall = __webpack_require__(45);
const background = __webpack_require__(46);
var resources = {
    assets: [
        {
            name: "pikachu",
            type: AssetType_1.AssetType.IMAGE,
            source: pikachuSmall
        },
        {
            name: "background",
            type: AssetType_1.AssetType.IMAGE,
            source: background
        }
    ]
};
exports.resources = resources;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ })
/******/ ]);
//# sourceMappingURL=App.js.map