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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Asset_1 = __webpack_require__(24);
exports.Asset = Asset_1.Asset;
var AssetType_1 = __webpack_require__(25);
exports.AssetType = AssetType_1.AssetType;
var AssetState_1 = __webpack_require__(26);
exports.AssetState = AssetState_1.AssetState;
var AssetFactory_1 = __webpack_require__(27);
exports.AssetFactory = AssetFactory_1.AssetFactory;
var AssetLoader_1 = __webpack_require__(28);
exports.AssetLoader = AssetLoader_1.AssetLoader;
var AudioLoader_1 = __webpack_require__(29);
exports.AudioLoader = AudioLoader_1.AudioLoader;
var ImageLoader_1 = __webpack_require__(30);
exports.ImageLoader = ImageLoader_1.ImageLoader;
var JSONLoader_1 = __webpack_require__(31);
exports.JSONLoader = JSONLoader_1.JSONLoader;
var TextAssetBuilder_1 = __webpack_require__(32);
exports.TextAssetBuilder = TextAssetBuilder_1.TextAssetBuilder;
var Spritesheet_1 = __webpack_require__(33);
exports.Spritesheet = Spritesheet_1.Spritesheet;
var Animation_1 = __webpack_require__(34);
exports.Animation = Animation_1.Animation;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum_1 = __webpack_require__(6);
exports.SeverityEnum = SeverityEnum_1.SeverityEnum;
var Camera_1 = __webpack_require__(16);
exports.Camera = Camera_1.Camera;
var IDGenerator_1 = __webpack_require__(17);
exports.IDGenerator = IDGenerator_1.IDGenerator;
var Iterator_1 = __webpack_require__(18);
exports.Iterator = Iterator_1.Iterator;
var LogManager_1 = __webpack_require__(19);
exports.LogManager = LogManager_1.LogManager;
var ViewPort_1 = __webpack_require__(20);
exports.ViewPort = ViewPort_1.ViewPort;
var CollisionEmitter_1 = __webpack_require__(21);
exports.CollisionEmitter = CollisionEmitter_1.CollisionEmitter;
var Color_1 = __webpack_require__(22);
exports.Color = Color_1.Color;
var ColorCode_1 = __webpack_require__(7);
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
var LogicEngine_1 = __webpack_require__(36);
exports.LogicEngine = LogicEngine_1.LogicEngine;
var GroupLogicEngine_1 = __webpack_require__(37);
exports.GroupLogicEngine = GroupLogicEngine_1.GroupLogicEngine;
var RenderingEngine_1 = __webpack_require__(38);
exports.RenderingEngine = RenderingEngine_1.RenderingEngine;
var TwoDimensionalRenderingEngine_1 = __webpack_require__(39);
exports.TwoDimensionalRenderingEngine = TwoDimensionalRenderingEngine_1.TwoDimensionalRenderingEngine;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = __webpack_require__(10);
exports.Entity = Entity_1.Entity;
var EntityModel_1 = __webpack_require__(40);
exports.EntityModel = EntityModel_1.EntityModel;
var EntityView_1 = __webpack_require__(11);
exports.EntityView = EntityView_1.EntityView;
var EntityView2D_1 = __webpack_require__(41);
exports.EntityView2D = EntityView2D_1.EntityView2D;
var GridMap_1 = __webpack_require__(42);
exports.GridMap = GridMap_1.GridMap;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = __webpack_require__(15);
exports.Engine = Engine_1.Engine;
var Instance_1 = __webpack_require__(9);
exports.getInstance = Instance_1.getInstance;


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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var assets_1 = __webpack_require__(0);
var assetFactory = assets_1.AssetFactory.getSingleton();
var AudioEngine = (function () {
    function AudioEngine() {
        this._audioMap = {};
        this._logManager = utils_1.LogManager.getSingleton();
    }
    AudioEngine.prototype.addAudio = function (name, audio, channels) {
        if (audio.getType() !== assets_1.AssetType.AUDIO) {
            throw 'AudioEngine.addAudio: Invalid Asset Type.';
        }
        this._setAudio(name, audio, channels);
    };
    AudioEngine.prototype.hasAudio = function (name) {
        var audio = this._getAudio(name);
        return (audio !== null);
    };
    AudioEngine.prototype.removeAudio = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._stopAudio(audio);
        }
        delete this._audioMap[name];
    };
    AudioEngine.prototype.releaseAssets = function () {
        var keys = Object.keys(this._audioMap);
        for (var i = 0, len = keys.length; i < len; i++) {
            this.removeAudio(keys[i]);
        }
    };
    AudioEngine.prototype.playAudio = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._playAudio(audio);
            audio.setAttribute('playing', true);
        }
    };
    AudioEngine.prototype.pauseAudio = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._pauseAudio(audio);
            audio.setAttribute('playing', false);
        }
    };
    AudioEngine.prototype.stopAudio = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            this._stopAudio(audio);
            audio.setAttribute('playing', false);
        }
    };
    AudioEngine.prototype.isAudioLooping = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._isAudioLooping(audio);
        }
        return false;
    };
    AudioEngine.prototype.loopAudio = function (name, state) {
        var audio = this._getAudio(name);
        if (audio) {
            this._loopAudio(audio, state);
        }
    };
    AudioEngine.prototype.isAudioMuted = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._isAudioMuted(audio);
        }
        return false;
    };
    AudioEngine.prototype.muteAudio = function (name, state) {
        var audio = this._getAudio(name);
        if (audio) {
            this._muteAudio(audio, state);
        }
    };
    AudioEngine.prototype.getAudioDuration = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getAudioDuration(audio);
        }
        return 0;
    };
    AudioEngine.prototype.setTimeCursor = function (name, seconds) {
        var audio = this._getAudio(name);
        if (audio) {
            this._setTimeCursor(audio, seconds);
        }
    };
    AudioEngine.prototype.getTimeCursor = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getTimeCursor(audio);
        }
        return 0;
    };
    AudioEngine.prototype.setVolume = function (name, volume) {
        var audio = this._getAudio(name);
        if (audio) {
            this._setVolume(audio, volume);
        }
    };
    AudioEngine.prototype.getVolume = function (name) {
        var audio = this._getAudio(name);
        if (audio) {
            return this._getVolume(audio);
        }
        else {
            return 0;
        }
    };
    AudioEngine.prototype._setAudio = function (name, audio, channels) {
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
    };
    AudioEngine.prototype._warnMissingAudio = function (name) {
        this._logManager.log(utils_1.SeverityEnum.WARNING, 'Audio ' + name + ' is missing from Audio Engine.');
    };
    AudioEngine.prototype._getAudio = function (name, justGiveChannel1) {
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
    };
    AudioEngine.prototype._getData = function (audio) {
        return audio.getData();
    };
    AudioEngine.prototype._attachStartEvent = function (asset) {
        if (!asset.getAttribute('startEvent')) {
            this._registerStartEvent(asset);
            asset.setAttribute('startEvent', true);
        }
    };
    AudioEngine.prototype._attachEndEvent = function (asset) {
        if (!asset.getAttribute('endEvent')) {
            this._registerEndEvent(asset);
            asset.setAttribute('endEvent', true);
        }
    };
    AudioEngine.prototype._registerEvents = function (channelArray) {
        var channel;
        for (var i = 0, len = channelArray.length; i < len; i++) {
            channel = channelArray[i];
            this._attachStartEvent(channel);
            this._attachEndEvent(channel);
        }
    };
    return AudioEngine;
}());
exports.AudioEngine = AudioEngine;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var instance = null;
var setInstance = function (game) {
    if (instance) {
        instance.getLogManager().log(utils_1.SeverityEnum.WARNING, 'Instance has already been set! Are you instantiating more than one game?');
    }
    instance = game;
};
exports.setInstance = setInstance;
var getInstance = function () {
    return instance;
};
exports.getInstance = getInstance;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var assets_1 = __webpack_require__(0);
var _1 = __webpack_require__(4);
var utils_1 = __webpack_require__(1);
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(model) {
        var _this = _super.call(this) || this;
        var useDefaults = false;
        _this._modelCB = function (attribute, value, oldValue) {
            if (_this._notifierKeys.indexOf(attribute) > -1) {
                _this._setModified(true);
            }
            else if (_this._parent && _this._parentNotifierKeys.indexOf(attribute) > -1) {
                _this._parent._setModified(true);
            }
        };
        if (!model) {
            model = new _1.EntityModel();
            useDefaults = true;
        }
        _this._view = new _1.EntityView(model);
        _this._model = model;
        _this._children = new Array();
        _this._regions = [];
        _this._regionDimension;
        _this._regionList = {};
        _this._collisionable = false;
        _this._parent = null;
        _this._modified = false;
        _this._notifierKeys = ['width', 'height', 'color', 'texture', 'textures'];
        _this._parentNotifierKeys = ['x', 'y'];
        if (useDefaults) {
            _this._setDefaults();
        }
        return _this;
    }
    Entity.prototype.getID = function () {
        return this._model.getID();
    };
    Entity.prototype.getParent = function () {
        return this._parent;
    };
    Entity.prototype.setParent = function (parent) {
        this._parent = parent;
    };
    Entity.prototype.getRegions = function () {
        return this._regions;
    };
    Entity.prototype.getRegionDimension = function () {
        return this._regionDimension;
    };
    Entity.prototype.getType = function () {
        return this._model.getType();
    };
    Entity.prototype.setType = function (type) {
        this._model.setType(type);
    };
    Entity.prototype.setCollisionable = function (collisionable) {
        this._collisionable = collisionable;
    };
    Entity.prototype.isCollisionable = function () {
        return this._collisionable;
    };
    Entity.prototype.getModel = function () {
        return this._model;
    };
    Entity.prototype.setModel = function (model) {
        var view = this._view;
        var oldModel = this._model;
        if (oldModel) {
            oldModel.removeListener(1..toString(), this._modelCB);
        }
        this._model = model;
        model.on(1..toString(), this._modelCB);
    };
    Entity.prototype.getHeight = function () {
        return this._model.getAttribute('height');
    };
    Entity.prototype.setHeight = function (height) {
        this._model.setAttribute('height', height);
        this._generateRegions();
    };
    Entity.prototype.getWidth = function () {
        return this._model.getAttribute('width');
    };
    Entity.prototype.setWidth = function (width) {
        this._model.setAttribute('width', width);
        this._generateRegions();
    };
    Entity.prototype.getX = function () {
        return this._model.getAttribute('x');
    };
    Entity.prototype.setX = function (x) {
        var oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('x', x);
        var newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        var eventData = {
            type: 0..toString(),
            oldCoordinates: oldCoordinates,
            newCoordinates: newCoordinates,
            source: this
        };
        if (!this._eventEmitted) {
            this._eventEmitted = true;
            this.emit(0..toString(), eventData);
            this._eventEmitted = false;
        }
    };
    Entity.prototype.setCoordinate = function (coordinate) {
        var oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('x', coordinate.x);
        this._model.setAttribute('y', coordinate.y);
        var newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        var eventData = {
            type: 0..toString(),
            oldCoordinates: oldCoordinates,
            newCoordinates: newCoordinates,
            source: this
        };
        this.emit(0..toString(), eventData);
    };
    Entity.prototype.getX2 = function () {
        return this.getX() + this.getWidth();
    };
    Entity.prototype.getY = function () {
        return this._model.getAttribute('y');
    };
    Entity.prototype.setY = function (y) {
        var oldCoordinates = { x: this.getX(), y: this.getY() };
        this._model.setAttribute('y', y);
        var newCoordinates = { x: this.getX(), y: this.getY() };
        if (this._parent) {
            this._parent._updateChildsRegion(this);
        }
        var eventData = {
            type: 0..toString(),
            oldCoordinates: oldCoordinates,
            newCoordinates: newCoordinates,
            source: this
        };
        if (!this._eventEmitted) {
            this._eventEmitted = true;
            this.emit(0..toString(), eventData);
            this._eventEmitted = false;
        }
    };
    Entity.prototype.getY2 = function () {
        return this.getY() + this.getHeight();
    };
    Entity.prototype.getZ = function () {
        return this._model.getAttribute('z');
    };
    Entity.prototype.setZ = function (z) {
        this._model.setAttribute('z', z);
    };
    Entity.prototype.getVisible = function () {
        return this._model.getAttribute('visible');
    };
    Entity.prototype.setVisible = function (state) {
        this._model.setAttribute('visible', state);
    };
    Entity.prototype.getColor = function () {
        return this._model.getAttribute('color');
    };
    Entity.prototype.setColor = function (color) {
        this._model.setAttribute('color', color);
    };
    Entity.prototype.getTexture = function () {
        return this._model.getTexture();
    };
    Entity.prototype.setTexture = function (asset) {
        if (asset.getType() !== assets_1.AssetType.IMAGE) {
            throw new Error('Texture asset must be of type IMAGE.');
        }
        this._model.setTexture(asset);
        this._setModified(true);
    };
    Entity.prototype.isModified = function () {
        return this._modified;
    };
    Entity.prototype.addChild = function (child) {
        var parent = child._parent;
        if (parent) {
            parent.removeChild(child);
        }
        this._children.push(child);
        child._parent = this;
        this._putChildInRegion(child);
    };
    Entity.prototype.removeChild = function (child) {
        if (this.isChild(child)) {
            var idx = this.indexOf(child);
            this._children.splice(idx, 1);
        }
        this._removeChildFromRegions(child);
        delete this._regionList[child.getID()];
    };
    Entity.prototype.removeAllChildren = function () {
        var child;
        while (child = this.getChildAt(0)) {
            this.removeChild(child);
        }
    };
    Entity.prototype.isChild = function (child) {
        return (this.indexOf(child) > -1);
    };
    Entity.prototype.indexOf = function (child) {
        return this._children.indexOf(child);
    };
    Entity.prototype.childCount = function () {
        return this._children.length;
    };
    Entity.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    Entity.prototype._setModified = function (state) {
        this._modified = state;
        if (this._parent) {
            this._parent._setModified(state);
        }
    };
    Entity.prototype.iterator = function () {
        return new utils_1.Iterator(this._children);
    };
    Entity.prototype.getChildren = function (startCoordinate, endCoordinate) {
        if (startCoordinate && endCoordinate) {
            var startRegion = this._coordinateToRegion(startCoordinate);
            var endRegion = this._coordinateToRegion(endCoordinate);
            var children = [];
            for (var x = startRegion.x; x <= endRegion.x; x++) {
                for (var y = startRegion.y; y <= endRegion.y; y++) {
                    children = children.concat(this._getChildrenInRegion({ x: x, y: y }));
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
    };
    Entity.prototype.findChildren = function (startCoordinate, endCoordinate) {
        var children = [];
        if (this._children.length > 0) {
            if (startCoordinate && !endCoordinate) {
                var region = this._coordinateToRegion(startCoordinate);
                var regionChildren = this._getChildrenInRegion({ x: region.x, y: region.y });
                if (regionChildren.length > 0) {
                    var childrenIterator = new utils_1.Iterator(regionChildren);
                    while (childrenIterator.hasNext()) {
                        var iterChild = childrenIterator.next();
                        var childCoordinate = iterChild.getCoordinate();
                        var childOuterCoordinate = iterChild.getOuterCoordinate();
                        if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
                            && childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
                            children.push(iterChild);
                            var deeperChildren = iterChild.findChildren({ x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y });
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
                        var regionChildren = this._getChildrenInRegion({ x: x, y: y });
                        for (var regionChildI in regionChildren) {
                            var regionChild = regionChildren[regionChildI];
                            if (childrenVisited.indexOf(regionChild) === -1) {
                                childrenVisited.push(regionChild);
                                var childCoordinate = regionChild.getCoordinate();
                                var childOuterCoordinate = regionChild.getOuterCoordinate();
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
                                    var deeperChildren = regionChild.findChildren({ x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y }, { x: endCoordinate.x - childOuterCoordinate.x, y: endCoordinate.y - childOuterCoordinate.y });
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
    };
    Entity.prototype.findTopChildAt = function (coordinate) {
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
    };
    Entity.prototype.getCoordinate = function () {
        return { x: this.getX(), y: this.getY() };
    };
    Entity.prototype.getOuterCoordinate = function () {
        return { x: this.getX2(), y: this.getY2() };
    };
    Entity.prototype.getAbsoluteY = function () {
        var entity = this;
        var y = 0;
        while (entity) {
            y += entity.getY();
            entity = entity._parent;
        }
        return y;
    };
    Entity.prototype.getAbsoluteY2 = function () {
        return this.getAbsoluteY() + this.getHeight();
    };
    Entity.prototype.getAbsoluteX = function () {
        var entity = this;
        var x = 0;
        while (entity) {
            x += entity.getX();
            entity = entity._parent;
        }
        return x;
    };
    Entity.prototype.getAbsoluteX2 = function () {
        return this.getAbsoluteX() + this.getWidth();
    };
    Entity.prototype.setLocation = function (coordinate) {
        this.setX(coordinate.x);
        this.setY(coordinate.y);
    };
    Entity.prototype.getLocation = function () {
        return {
            x: this.getX(),
            y: this.getY()
        };
    };
    Entity.prototype.setSize = function (dimension) {
        this._setModified(true);
        this.setWidth(dimension.width);
        this.setHeight(dimension.height);
    };
    Entity.prototype.getSize = function () {
        return { width: this.getWidth(), height: this.getHeight() };
    };
    Entity.prototype._setDefaults = function () {
        this.setLocation({ x: 0, y: 0 });
        this.setSize({ width: 0, height: 0 });
        this.setVisible(true);
    };
    Entity.prototype._generateRegions = function () {
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
    };
    Entity.prototype._putChildInRegion = function (child) {
        var startRegion = this._coordinateToRegion({ x: child.getX(), y: child.getY() });
        var endRegion = this._coordinateToRegion({ x: child.getX2(), y: child.getY2() });
        this._regionList[child.getID()] = [];
        if (!isNaN(startRegion.x) && !isNaN(startRegion.y) && !isNaN(endRegion.x) && !isNaN(endRegion.y)) {
            for (var x = startRegion.x; x <= endRegion.x; x++) {
                if (this._regions[x]) {
                    for (var y = startRegion.y; y <= endRegion.y; y++) {
                        if (this._regions[x][y]) {
                            this._regions[x][y].push(child);
                            this._regionList[child.getID()].push({ x: x, y: y });
                        }
                    }
                }
            }
        }
        else {
        }
    };
    Entity.prototype._getChildrenInRegion = function (regionCoordinate) {
        if (this._regions[regionCoordinate.x] && this._regions[regionCoordinate.x][regionCoordinate.y]) {
            return this._regions[regionCoordinate.x][regionCoordinate.y];
        }
        else {
            return [];
        }
    };
    Entity.prototype._removeChildFromRegions = function (child) {
        if (this._regionList[child.getID()]) {
            for (var i in this._regionList[child.getID()]) {
                var coord = this._regionList[child.getID()][i];
                this._regions[coord.x][coord.y].splice(this._regions[coord.x][coord.y].indexOf(child), 1);
            }
        }
    };
    Entity.prototype._updateChildsRegion = function (child) {
        this._removeChildFromRegions(child);
        this._putChildInRegion(child);
    };
    Entity.prototype._coordinateToRegion = function (coordinate) {
        var x = Math.floor(coordinate.x / this._regionDimension.width);
        var y = Math.floor(coordinate.y / this._regionDimension.height);
        return { x: x, y: y };
    };
    return Entity;
}(Events.EventEmitter));
exports.Entity = Entity;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var EntityView = (function (_super) {
    __extends(EntityView, _super);
    function EntityView(model) {
        var _this = _super.call(this) || this;
        _this._visible = true;
        _this._model = model;
        _this._bindedFuncs = {};
        _this._attachEvents();
        return _this;
    }
    EntityView.prototype.setVisible = function (visible) {
        this._visible = visible;
    };
    EntityView.prototype.getVisible = function () {
        return this._visible;
    };
    EntityView.prototype.setModel = function (model) {
        if (this._model) {
            this._detachEvents();
        }
        this._model = model;
        this._attachEvents();
    };
    EntityView.prototype._handleAttrChange = function (e) {
    };
    EntityView.prototype._attachEvents = function () {
        this._model.on(1..toString(), (this._bindedFuncs[1..toString()] = this._handleAttrChange.bind(this)));
    };
    EntityView.prototype._detachEvents = function () {
        this._model.removeListener(1..toString(), this._bindedFuncs[1..toString()]);
    };
    return EntityView;
}(Events.EventEmitter));
exports.EntityView = EntityView;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var GamePad = (function (_super) {
    __extends(GamePad, _super);
    function GamePad(id) {
        var _this = _super.call(this) || this;
        _this._pollRate = 15;
        _this._buttons = [];
        _this._axes = [];
        _this._gamePadID = id;
        var gamePad = navigator.getGamepads()[id];
        for (var i = 0; i < gamePad.buttons.length; i++) {
            _this._buttons.push(gamePad.buttons[i].value);
        }
        for (var i = 0; i < gamePad.axes.length; i++) {
            _this._axes.push(gamePad.axes[i]);
        }
        _this._initializePolling();
        return _this;
    }
    GamePad.prototype.getAxis = function (index) {
        return this._axes[index];
    };
    GamePad.prototype.setPollRate = function (pollRate) {
        this._pollRate = pollRate;
        this._initializePolling();
    };
    GamePad.prototype._initializePolling = function () {
        if (this._pollTimer) {
            clearInterval(this._pollTimer);
        }
        this._pollTimer = setInterval(this._poll.bind(this), this._pollRate);
    };
    GamePad.prototype._poll = function () {
        var gamePad = navigator.getGamepads()[this._gamePadID];
        if (!gamePad) {
            this._disconnect();
            return null;
        }
        for (var i = 0; i < gamePad.buttons.length; i++) {
            if (gamePad.buttons[i].value != this._buttons[i]) {
                this._buttons[i] = gamePad.buttons[i].value;
                var e = {
                    source: this,
                    type: "BUTTONVALUECHANGE",
                    value: gamePad.buttons[i].value,
                    id: i
                };
                this.emit("BUTTONVALUECHANGE", e);
            }
        }
        for (var i = 0; i < gamePad.axes.length; i++) {
            if (gamePad.axes[i] != this._axes[i]) {
                this._axes[i] = gamePad.axes[i];
                var e = {
                    source: this,
                    type: "AXISVALUECHANGE",
                    value: gamePad.axes[i],
                    id: i
                };
                this.emit("AXISVALUECHANGE", e);
            }
        }
    };
    GamePad.prototype._disconnect = function () {
        clearInterval(this._pollTimer);
        var e = {
            source: this,
            type: "AXISVALUECHANGE"
        };
        this.emit("DISCONNECT", e);
    };
    return GamePad;
}(Events.EventEmitter));
exports.GamePad = GamePad;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
;
;
var Touch = (function (_super) {
    __extends(Touch, _super);
    function Touch(nTouch) {
        var _this = _super.call(this) || this;
        _this._id = nTouch.identifier;
        _this._x = nTouch.pageX;
        _this._y = nTouch.pageY;
        window.addEventListener("touchmove", _this._touchMoveListener = _this._onTouchMove.bind(_this));
        window.addEventListener("touchend", _this._touchEndListener = _this._onTouchEnd.bind(_this));
        return _this;
    }
    Touch.prototype.getID = function () {
        return this._id;
    };
    Touch.prototype.getX = function () {
        return this._x;
    };
    Touch.prototype.getY = function () {
        return this._y;
    };
    Touch.prototype._onTouchEnd = function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var nTouch = e.changedTouches.item(i);
            if (nTouch.identifier === this._id) {
                this._disconnect();
            }
        }
    };
    Touch.prototype._onTouchMove = function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var nTouch = e.changedTouches.item(i);
            if (nTouch.identifier === this._id && (nTouch.pageX != this._x || nTouch.pageY != this._y)) {
                this._x = nTouch.pageX;
                this._y = nTouch.pageY;
                var e_1 = {
                    type: "TOUCHMOVED",
                    source: this,
                    position: {
                        x: this._x,
                        y: this._y
                    }
                };
                this.emit("TOUCHMOVED", e_1);
            }
        }
    };
    Touch.prototype._disconnect = function () {
        var e = {
            source: this,
            type: "TOUCHREMOVED"
        };
        this.emit("TOUCHREMOVED", e);
        window.removeEventListener("touchmove", this._touchMoveListener);
        window.removeEventListener("touchend", this._touchEndListener);
    };
    return Touch;
}(Events.EventEmitter));
exports.Touch = Touch;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(5);
var engines_1 = __webpack_require__(3);
var entities_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(1);
var assets_1 = __webpack_require__(0);
var Character_1 = __webpack_require__(43);
var inputs_1 = __webpack_require__(44);
var PalletDemo = (function (_super) {
    __extends(PalletDemo, _super);
    function PalletDemo() {
        var _this = _super.call(this) || this;
        _this._direction = "";
        _this.getViewPort().setSize({ width: 500, height: 500 });
        _this.setRenderingEngine(new engines_1.TwoDimensionalRenderingEngine());
        _this.setLogicEngine(new engines_1.GroupLogicEngine());
        _this.getRenderingEngine().setHUD(_this._createLoadingScreen());
        _this._loadResources();
        return _this;
    }
    PalletDemo.prototype._createLoadingScreen = function () {
        var textAssetBuilder = new assets_1.TextAssetBuilder();
        var hud = new entities_1.Entity();
        hud.setWidth(500);
        hud.setHeight(500);
        var loadingText = new entities_1.Entity();
        loadingText.setWidth(165);
        loadingText.setHeight(50);
        loadingText.setX((500 / 2) - 100);
        loadingText.setY((500 / 2) - 25);
        hud.addChild(loadingText);
        var blackColor = utils_1.Color.fromString('black');
        var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, blackColor);
        var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, blackColor);
        var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, blackColor);
        var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, blackColor);
        var loadingAnim = new assets_1.Animation(loadingText, [
            { 'asset': loading0, 'delay': 250 },
            { 'asset': loading1, 'delay': 250 },
            { 'asset': loading2, 'delay': 250 },
            { 'asset': loading3, 'delay': 250 }
        ]);
        loadingAnim.start();
        return hud;
    };
    PalletDemo.prototype._createMainMap = function () {
        var mapContainer = new entities_1.Entity();
        var layer1 = new entities_1.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        var layer2 = new entities_1.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        var layer3 = new entities_1.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        mapContainer.setWidth(layer1.getWidth());
        mapContainer.setHeight(layer1.getHeight());
        mapContainer.addChild(layer1);
        mapContainer.addChild(layer2);
        mapContainer.addChild(layer3);
        var layer1Iterator = layer1.iterator();
        while (layer1Iterator.hasNext()) {
            var tile = layer1Iterator.next();
            tile.setTexture((this._mapSpritesheet.getSprite('grass')));
        }
        layer3.getTile({ x: 10, y: 10 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_11'));
        layer3.getTile({ x: 11, y: 10 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_12'));
        layer3.getTile({ x: 12, y: 10 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_13'));
        layer2.getTile({ x: 10, y: 11 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_21'));
        layer2.getTile({ x: 11, y: 11 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_22'));
        layer2.getTile({ x: 12, y: 11 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_23'));
        layer2.getTile({ x: 10, y: 11 }).setCollisionable(true);
        layer2.getTile({ x: 11, y: 11 }).setCollisionable(true);
        layer2.getTile({ x: 12, y: 11 }).setCollisionable(true);
        layer2.getTile({ x: 10, y: 12 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_31'));
        layer2.getTile({ x: 11, y: 12 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_32'));
        layer2.getTile({ x: 12, y: 12 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_33'));
        layer2.getTile({ x: 10, y: 12 }).setCollisionable(true);
        layer2.getTile({ x: 11, y: 12 }).setCollisionable(true);
        layer2.getTile({ x: 12, y: 12 }).setCollisionable(true);
        layer2.getTile({ x: 10, y: 13 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_41'));
        layer2.getTile({ x: 11, y: 13 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_42'));
        layer2.getTile({ x: 12, y: 13 }).setTexture(this._mapSpritesheet.getSprite('house_1_roof_43'));
        layer2.getTile({ x: 10, y: 13 }).setCollisionable(true);
        layer2.getTile({ x: 11, y: 13 }).setCollisionable(true);
        layer2.getTile({ x: 12, y: 13 }).setCollisionable(true);
        return mapContainer;
    };
    PalletDemo.prototype._loadResources = function () {
        this._loadMapSpritesheet();
        this._loadBackgroundMusic();
        this._loadCharacterSpritesheet();
    };
    PalletDemo.prototype._resourceLoaded = function () {
        var _this = this;
        if (this._mapSpritesheet && this._bgMusic && this._characterSpritesheet) {
            console.log("Resources all loaded");
            setTimeout(function () {
                _this.getRenderingEngine().setHUD(null);
                var map = _this._createMainMap();
                var camera = new utils_1.Camera(map, null, { width: 250, height: 250 }, null, { width: 500, height: 500 });
                _this._mainCamera = camera;
                _this.getRenderingEngine().addCamera(camera);
                var mouse = inputs_1.Mouse.getInstance();
                mouse.on("SCROLLWHEELMOVE", function (e) {
                    var fov = camera.getFOV();
                    var viewPoint = camera.getViewPoint();
                    if (e.yDelta > 0) {
                        camera.setViewPoint({ x: viewPoint.x + 5, y: viewPoint.y + 5 });
                        camera.setFOV({ width: fov.width - 10, height: fov.height - 10 });
                    }
                    else {
                        camera.setViewPoint({ x: viewPoint.x - 5, y: viewPoint.y - 5 });
                        camera.setFOV({ width: fov.width + 10, height: fov.height + 10 });
                    }
                });
                _this.player = new Character_1.default(_this._characterSpritesheet);
                _this.player.setTexture(_this._characterSpritesheet.getSprite("player_down"));
                var layer = map.getChildAt(1);
                var tile = layer.getTile({ x: 5, y: 5 });
                layer.addChild(_this.player);
                _this.player.tileX = 5;
                _this.player.tileY = 5;
                _this.player.setX(tile.getX());
                _this.player.setY(tile.getY() - _this.player.getHeight() - tile.getHeight());
                var pokeball = new entities_1.Entity();
                pokeball.setWidth(25);
                pokeball.setHeight(25);
                var pokeball_asset = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.IMAGE, 'Resources/pokeball.png');
                pokeball_asset.onStateChange = function (state) {
                    if (state === assets_1.AssetState.LOADED) {
                        pokeball.setTexture(pokeball_asset);
                        _this.getRenderingEngine().setHUD(pokeball);
                    }
                };
                pokeball_asset.load();
                mouse.on("MOUSEMOVE", function (e) {
                    pokeball.setX(e.x - _this.getRenderingEngine().getViewPort().getCanvas().offsetLeft - 14);
                    pokeball.setY(e.y - _this.getRenderingEngine().getViewPort().getCanvas().offsetTop - 14);
                });
                mouse.on("LEFTBUTTONDOWN", function (e) {
                    var newPokeball = new entities_1.Entity();
                    console.log(e);
                    console.log(camera);
                    var x_fov = camera.getFOV().width / camera.getRenderDimension().width;
                    var y_fov = camera.getFOV().height / camera.getRenderDimension().height;
                    newPokeball.setWidth(25 * x_fov);
                    newPokeball.setHeight(25 * y_fov);
                    newPokeball.setX(camera.getViewPoint().x + ((e.x * x_fov) - (23 * x_fov)));
                    newPokeball.setY(camera.getViewPoint().y + ((e.y * y_fov) - (23 * y_fov)));
                    newPokeball.setTexture(pokeball_asset);
                    layer.addChild(newPokeball);
                });
                mouse.on("RIGHTBUTTONDOWN", function (e) {
                    alert("YOU SHALL NOT PASS");
                });
                _this.player.on(0..toString(), function () {
                    var fov = camera.getFOV();
                    camera.setViewPoint({ x: _this.player.getX() + ((_this.player.getWidth() - fov.width) / 2), y: _this.player.getY() + ((_this.player.getHeight() - fov.height) / 2) });
                });
                _this.getAudioEngine().addAudio('bg', _this._bgMusic);
                _this.getAudioEngine().loopAudio('bg', true);
                _this.getAudioEngine().playAudio('bg');
                _this.getLogicEngine().addLogic('moveLogic', function () {
                    switch (_this._direction) {
                        case 'left':
                            _this.player.moveLeft();
                            break;
                        case 'up':
                            _this.player.moveUp();
                            break;
                        case 'down':
                            _this.player.moveDown();
                            break;
                        case 'right':
                            _this.player.moveRight();
                            break;
                    }
                }, 1);
                _this.getLogicEngine().addLogic('pokeballLogic', function () {
                    if (mouse.isLeftButtonClicked()) {
                        var newPokeball = new entities_1.Entity();
                        var x_fov = camera.getFOV().width / camera.getRenderDimension().width;
                        var y_fov = camera.getFOV().height / camera.getRenderDimension().height;
                        newPokeball.setWidth(25 * x_fov);
                        newPokeball.setHeight(25 * y_fov);
                        var mouseCoordinates = mouse.getCurrentCoordinates();
                        newPokeball.setX(camera.getViewPoint().x + ((mouseCoordinates.x * x_fov) - (23 * x_fov)));
                        newPokeball.setY(camera.getViewPoint().y + ((mouseCoordinates.y * y_fov) - (23 * y_fov)));
                        newPokeball.setTexture(pokeball_asset);
                        layer.addChild(newPokeball);
                    }
                }, 50);
                var gamepadListener = inputs_1.GamePadListener.getInstance();
                if (gamepadListener.hasGamePads()) {
                    console.log("GamePadConnected");
                    var gamePads = gamepadListener.getGamePads();
                    gamePads.forEach(function (gamePad) {
                        _this.attachGamepad(gamePad);
                    });
                }
                gamepadListener.on("GAMEPADADDED", function (gamePad) {
                    console.log("GamePadConnected");
                    _this.attachGamepad(gamePad);
                });
                gamepadListener.on("GAMEPADREMOVED", function (gamePad) {
                    console.log("GameaPad Disconnected");
                });
                var keyboard = inputs_1.Keyboard.getInstance();
                keyboard.on("KEYDOWN", function (e) {
                    switch (e.key) {
                        case inputs_1.KeyboardKeys.W:
                        case inputs_1.KeyboardKeys[0]:
                            _this._direction = 'up';
                            break;
                        case inputs_1.KeyboardKeys.A:
                        case inputs_1.KeyboardKeys[1]:
                            _this._direction = "left";
                            break;
                        case inputs_1.KeyboardKeys.S:
                        case inputs_1.KeyboardKeys[2]:
                            _this._direction = "down";
                            break;
                        case inputs_1.KeyboardKeys.D:
                        case inputs_1.KeyboardKeys[3]:
                            _this._direction = "right";
                            break;
                    }
                });
                keyboard.on("KEYUP", function (e) {
                    switch (e.key) {
                        case inputs_1.KeyboardKeys.W:
                        case inputs_1.KeyboardKeys.A:
                        case inputs_1.KeyboardKeys.S:
                        case inputs_1.KeyboardKeys.D:
                            _this._direction = null;
                            break;
                    }
                });
            }, 1000);
        }
    };
    PalletDemo.prototype.attachGamepad = function (gamePad) {
        var _this = this;
        gamePad.on("AXISVALUECHANGE", function (e) {
            if (gamePad.getAxis(0) < -.1 || gamePad.getAxis(0) > .1) {
                _this.player.setX(_this.player.getX() + Math.floor(gamePad.getAxis(0) * 10));
            }
            if (gamePad.getAxis(1) < -.1 || gamePad.getAxis(1) > .1) {
                _this.player.setY(_this.player.getY() + Math.floor(gamePad.getAxis(1) * 10));
            }
            if (gamePad.getAxis(2) < -.1 || gamePad.getAxis(2) > .1) {
                _this._mainCamera.getViewPoint().x += Math.floor(gamePad.getAxis(2) * 10);
            }
            if (gamePad.getAxis(3) < -.1 || gamePad.getAxis(3) > .1) {
                _this._mainCamera.getViewPoint().y += Math.floor(gamePad.getAxis(3) * 10);
            }
        });
        gamePad.on("BUTTONVALUECHANGE", function (e) {
            var buttonId = e.id;
            var newValue = e.value;
            console.log(buttonId);
            console.log(newValue);
            if (buttonId === 12) {
                if (newValue === 0 && _this._direction === "up") {
                    _this._direction = "";
                }
                else {
                    _this._direction = "up";
                }
            }
            if (buttonId === 13) {
                if (newValue === 0 && _this._direction === "down") {
                    _this._direction = "";
                }
                else {
                    _this._direction = "down";
                }
            }
            if (buttonId === 14) {
                if (newValue === 0 && _this._direction === "left") {
                    _this._direction = "";
                }
                else {
                    _this._direction = "left";
                }
            }
            if (buttonId === 15) {
                if (newValue === 0 && _this._direction === "right") {
                    _this._direction = "";
                }
                else {
                    _this._direction = "right";
                }
            }
        });
    };
    PalletDemo.prototype.detachGamePad = function (gamepad) {
    };
    PalletDemo.prototype._loadMapSpritesheet = function () {
        var _this = this;
        var map_asset = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.IMAGE, 'Resources/61816.png');
        map_asset.onStateChange = function (state) {
            if (state === assets_1.AssetState.LOADED) {
                _this._mapSpritesheet = new assets_1.Spritesheet(map_asset, {
                    "grass": {
                        x: 16,
                        y: 0,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_11": {
                        x: 0,
                        y: 16,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_12": {
                        x: 16,
                        y: 16,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_13": {
                        x: 32,
                        y: 16,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_21": {
                        x: 0,
                        y: 32,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_22": {
                        x: 16,
                        y: 32,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_23": {
                        x: 32,
                        y: 32,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_31": {
                        x: 0,
                        y: 48,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_32": {
                        x: 16,
                        y: 48,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_33": {
                        x: 32,
                        y: 48,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_41": {
                        x: 0,
                        y: 64,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_42": {
                        x: 16,
                        y: 64,
                        width: 16,
                        height: 16
                    },
                    "house_1_roof_43": {
                        x: 32,
                        y: 64,
                        width: 16,
                        height: 16
                    }
                });
                _this._resourceLoaded();
            }
        };
        map_asset.load();
    };
    PalletDemo.prototype._loadCharacterSpritesheet = function () {
        var _this = this;
        var character_spritesheet = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.IMAGE, 'Resources/3698.png');
        character_spritesheet.onStateChange = function (state) {
            if (state === assets_1.AssetState.LOADED) {
                _this._characterSpritesheet = new assets_1.Spritesheet(character_spritesheet, {
                    "player_up": { x: 21, y: 10, width: 14, height: 20 },
                    "player_up_step1": { x: 66, y: 10, width: 14, height: 20 },
                    "player_up_step2": { x: 66, y: 10, width: 14, height: 20, "flipX": true },
                    "player_left": { x: 36, y: 10, width: 14, height: 20 },
                    "player_left_step1": { x: 81, y: 10, width: 14, height: 20 },
                    "player_left_step2": { x: 95, y: 10, width: 14, height: 20 },
                    "player_right": { x: 36, y: 10, width: 14, height: 20, "flipX": true },
                    "player_right_step1": { x: 81, y: 10, width: 14, height: 20, "flipX": true },
                    "player_right_step2": { x: 95, y: 10, width: 14, height: 20, "flipX": true },
                    "player_down": { x: 6, y: 10, width: 14, height: 20 },
                    "player_down_step1": { x: 51, y: 10, width: 14, height: 20 },
                    "player_down_step2": { x: 51, y: 10, width: 14, height: 20, "flipX": true }
                });
                _this._resourceLoaded();
            }
        };
        character_spritesheet.load();
    };
    PalletDemo.prototype._loadBackgroundMusic = function () {
        var _this = this;
        var bg_music = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.AUDIO, 'Resources/music.mp3');
        bg_music.onStateChange = function (state) {
            if (state === assets_1.AssetState.LOADED) {
                _this._bgMusic = bg_music;
                _this._resourceLoaded();
            }
        };
        bg_music.load();
    };
    return PalletDemo;
}(core_1.Engine));
window._PalletDemo = new PalletDemo();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var audio_1 = __webpack_require__(23);
var assets_1 = __webpack_require__(0);
var Instance_1 = __webpack_require__(9);
var Engine = (function () {
    function Engine() {
        Instance_1.setInstance(this);
        this._debugMode = false;
        this._logManager = utils_1.LogManager.getSingleton();
        this._assetFactory = assets_1.AssetFactory.getSingleton();
        this._audioEngine = new audio_1.HTML5AudioEngine();
        this._viewPort = new utils_1.ViewPort();
        this._logManager.log(utils_1.SeverityEnum.INFO, 'Engine has started.');
    }
    Engine.prototype.isDebugEnabled = function () {
        return this._debugMode;
    };
    Engine.prototype.setRenderingEngine = function (renderingEngine) {
        if (this._renderingEngine) {
        }
        this._renderingEngine = renderingEngine;
        this._renderingEngine.setViewPort(this._viewPort);
        this._renderingEngine.startRendering();
    };
    Engine.prototype.getRenderingEngine = function () {
        return this._renderingEngine;
    };
    Engine.prototype.setLogManager = function (logManager) {
        this._logManager = logManager;
    };
    Engine.prototype.getLogManager = function () {
        return this._logManager;
    };
    Engine.prototype.setAssetFactory = function (assetFactory) {
        this._assetFactory = assetFactory;
    };
    Engine.prototype.getAssetFactory = function () {
        return this._assetFactory;
    };
    Engine.prototype.getViewPort = function () {
        return this._viewPort;
    };
    Engine.prototype.setAudioEngine = function (audioEngine) {
        this._audioEngine = audioEngine;
    };
    Engine.prototype.getAudioEngine = function () {
        return this._audioEngine;
    };
    Engine.prototype.setLogicEngine = function (logicEngine) {
        this._logicEngine = logicEngine;
    };
    Engine.prototype.getLogicEngine = function () {
        return this._logicEngine;
    };
    return Engine;
}());
exports.Engine = Engine;
exports.default = Engine;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_VIEWPOINT = { x: 0, y: 0 };
var DEFAULT_FOV = { width: 100, height: 100 };
var DEFAULT_RENDER_ORIGIN = { x: 0, y: 0 };
var DEFAULT_RENDER_DIMENSION = { width: 100, height: 100 };
var Camera = (function () {
    function Camera(scene, viewPoint, fov, renderOrigin, renderDimension) {
        this.setScene(scene);
        this.setViewPoint(viewPoint || DEFAULT_VIEWPOINT);
        this.setFOV(fov || DEFAULT_FOV);
        this.setRenderOrigin(renderOrigin || DEFAULT_RENDER_ORIGIN);
        this.setRenderDimension(renderDimension || DEFAULT_RENDER_DIMENSION);
    }
    Camera.prototype.setScene = function (scene) {
        this._scene = scene;
    };
    Camera.prototype.getScene = function () {
        return this._scene;
    };
    Camera.prototype.setViewPoint = function (viewPoint) {
        this._viewPoint = viewPoint;
    };
    Camera.prototype.getViewPoint = function () {
        return this._viewPoint;
    };
    Camera.prototype.setFOV = function (fov) {
        this._fov = fov;
    };
    Camera.prototype.getFOV = function () {
        return this._fov;
    };
    Camera.prototype.setRenderOrigin = function (origin) {
        this._renderOrigin = origin;
    };
    Camera.prototype.getRenderOrigin = function () {
        return this._renderOrigin;
    };
    Camera.prototype.setRenderDimension = function (dim) {
        this._renderDimension = dim;
    };
    Camera.prototype.getRenderDimension = function () {
        return this._renderDimension;
    };
    return Camera;
}());
exports.Camera = Camera;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(1);
var IDGenerator = (function () {
    function IDGenerator() {
    }
    IDGenerator.prototype.generate = function () {
        return IDGenerator.generate();
    };
    IDGenerator.generate = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    IDGenerator.getSingleton = function () {
        _1.LogManager.getSingleton().deprecate('IDGenerator should no longer be used as a singleton anymore. Instead use IDGenerator.generate().');
        if (!IDGenerator._instance) {
            IDGenerator._instance = new IDGenerator();
        }
        return IDGenerator._instance;
    };
    return IDGenerator;
}());
exports.IDGenerator = IDGenerator;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = (function () {
    function Iterator(array) {
        this._array = array;
        this._index = -1;
    }
    Iterator.prototype.hasNext = function () {
        if (this._array[this._index + 1]) {
            return true;
        }
        else {
            return false;
        }
    };
    Iterator.prototype.next = function () {
        this._index += 1;
        return this._array[this._index];
    };
    Iterator.prototype.hasPrev = function () {
        if (this._array[this._index]) {
            return true;
        }
        else {
            return false;
        }
    };
    Iterator.prototype.prev = function () {
        return this._array[this._index--];
    };
    Iterator.prototype.setToBeginning = function () {
        this._index = -1;
    };
    Iterator.prototype.setToEnd = function () {
        this._index = this._array.length;
    };
    Iterator.prototype.getFirst = function () {
        return this._array[0];
    };
    Iterator.prototype.getLast = function () {
        return this._array[this._array.length - 1];
    };
    return Iterator;
}());
exports.Iterator = Iterator;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum_1 = __webpack_require__(6);
var LogManager = (function () {
    function LogManager() {
        this._logLevel = SeverityEnum_1.SeverityEnum.WARNING | SeverityEnum_1.SeverityEnum.ERROR;
        this._logLevel = this._logLevel | SeverityEnum_1.SeverityEnum.DEBUG | SeverityEnum_1.SeverityEnum.INFO;
    }
    LogManager.prototype.log = function (severity, message) {
        if (this.getLogLevel() & severity) {
            switch (severity) {
                case SeverityEnum_1.SeverityEnum.DEBUG:
                    console.debug("[DEBUG] " + message);
                    break;
                case SeverityEnum_1.SeverityEnum.INFO:
                    console.info("[INFO] " + message);
                    break;
                case SeverityEnum_1.SeverityEnum.WARNING:
                    console.warn("[WARN] " + message);
                    break;
                case SeverityEnum_1.SeverityEnum.ERROR:
                    console.error("[ERROR] " + message);
                    break;
                case SeverityEnum_1.SeverityEnum.DEPRECATE:
                    console.error("[DEPRECATE] " + message);
            }
        }
    };
    LogManager.prototype.debug = function (message) {
        this.log(SeverityEnum_1.SeverityEnum.DEBUG, message);
    };
    LogManager.prototype.info = function (message) {
        this.log(SeverityEnum_1.SeverityEnum.INFO, message);
    };
    LogManager.prototype.warn = function (message) {
        this.log(SeverityEnum_1.SeverityEnum.WARNING, message);
    };
    LogManager.prototype.error = function (message) {
        this.log(SeverityEnum_1.SeverityEnum.ERROR, message);
    };
    LogManager.prototype.deprecate = function (message) {
        this.log(SeverityEnum_1.SeverityEnum.DEPRECATE, message);
    };
    LogManager.prototype.setLogLevel = function (severity) {
        this._logLevel = severity;
        this._logLevel = severity;
    };
    LogManager.prototype.getLogLevel = function () {
        return this._logLevel;
    };
    LogManager.getSingleton = function () {
        if (!LogManager._instance) {
            LogManager._instance = new LogManager();
        }
        return LogManager._instance;
    };
    LogManager._instance = new LogManager();
    return LogManager;
}());
exports.LogManager = LogManager;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var ViewPort = (function (_super) {
    __extends(ViewPort, _super);
    function ViewPort() {
        var _this = _super.call(this) || this;
        _this._canvas = document.createElement('canvas');
        _this._context = _this._canvas.getContext('2d');
        _this._resizable = false;
        _this._dimension = { width: 0, height: 0 };
        _this._filledPage = false;
        return _this;
    }
    ViewPort.prototype.getCanvas = function () {
        return this._canvas;
    };
    ViewPort.prototype.getContext = function () {
        return this._context;
    };
    ViewPort.prototype.setResizable = function (resizable) {
        this._resizable = resizable;
    };
    ViewPort.prototype.isResizable = function () {
        return this._resizable;
    };
    ViewPort.prototype.setScale = function (dimension) {
        this._context.scale(dimension.width, dimension.height);
    };
    ViewPort.prototype.fillPage = function (state) {
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
    };
    ViewPort.prototype.isFilledPage = function () {
        return this._filledPage;
    };
    ViewPort.prototype.getSize = function () {
        return { width: this._canvas.offsetWidth, height: this._canvas.offsetHeight };
    };
    ViewPort.prototype.setSize = function (dimension) {
        this._dimension = dimension;
        this._canvas.setAttribute('width', dimension.width + "px");
        this._canvas.setAttribute('height', dimension.height + "px");
        this.emit('resize', dimension);
    };
    ViewPort.prototype.clear = function () {
        this._context.clearRect(0, 0, this._dimension.width, this._dimension.height);
    };
    ViewPort.prototype.drawImage = function (img, clip_x, clip_y, clip_width, clip_height, x, y, width, height) {
        this._context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
    };
    ViewPort.prototype.setFont = function (font) {
        this._context.font = font;
    };
    ViewPort.prototype.setColor = function (color) {
        this._context.fillStyle = color.toString();
    };
    ViewPort.prototype.measureText = function (text) {
        return this._context.measureText(text);
    };
    ViewPort.prototype.setTextBaseline = function (baseline) {
        this._context.textBaseline = baseline;
    };
    ViewPort.prototype.drawText = function (text, x, y, maxWidth) {
        this._context.fillText(text, x, y, maxWidth);
    };
    ViewPort.prototype.setHidden = function () {
        this._canvas.style.position = "absolute";
        this._canvas.style.left = '110001px';
    };
    ViewPort.prototype.getImage = function () {
        var image = document.createElement('img');
        image.src = this._canvas.toDataURL("image/png");
        return image;
    };
    ViewPort.prototype._fillPage = function () {
        var newSize = { width: window.innerWidth, height: window.innerHeight };
        var eventData = {
            type: 0..toString(),
            oldDimensions: this.getSize(),
            newDimensions: newSize,
            source: this
        };
        this.setSize(newSize);
        this.emit(0..toString(), eventData);
    };
    return ViewPort;
}(Events.EventEmitter));
exports.ViewPort = ViewPort;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollisionEmitter = (function () {
    function CollisionEmitter() {
        this._cbs = {};
        this._entities = [];
        this._entitiesListeners = {};
        this._listeners = [];
        this._cbs[0] = this._onEntityLocationUpdate.bind(this);
    }
    CollisionEmitter.prototype.addEntity = function (entity) {
        if (!this.hasEntity(entity)) {
            this._entities.push(entity);
            this._entitiesListeners[entity.getID()] = [];
            entity.on(0..toString(), this._cbs[0]);
        }
    };
    CollisionEmitter.prototype.removeEntity = function (entity) {
        if (this.hasEntity(entity)) {
            this._entities.splice(this._entities.indexOf(entity), 1);
            delete this._entitiesListeners[entity.getID()];
        }
    };
    CollisionEmitter.prototype.hasEntity = function (entity) {
        return this._entitiesListeners.hasOwnProperty(entity.getID());
    };
    CollisionEmitter.prototype.addEntityCollisionListener = function (entity, callback) {
        if (!this.hasEntity(entity)) {
            this.addEntity(entity);
        }
        this._entitiesListeners[entity.getID()].push(callback);
    };
    CollisionEmitter.prototype.removeEntityCollisionListener = function (entity, callback) {
        if (this._entitiesListeners[entity.getID()].indexOf(callback) > -1) {
            this._entitiesListeners[entity.getID()].splice(this._entitiesListeners[entity.getID()].indexOf(callback), 1);
        }
    };
    CollisionEmitter.prototype.addCollisionListener = function (callback) {
        this._listeners.push(callback);
    };
    CollisionEmitter.prototype.removeCollisionListener = function (callback) {
        if (this._listeners.indexOf(callback) > -1) {
            this._listeners.splice(this._listeners.indexOf(callback), 1);
        }
    };
    CollisionEmitter.prototype._onEntityLocationUpdate = function (event) {
        var entity = event.source;
        if (entity.getParent()) {
            var potCollisions = entity.getParent().findChildren({ x: entity.getX(), y: entity.getY() }, { x: entity.getX2(), y: entity.getY2() });
            var collisions = [];
            for (var i in potCollisions) {
                var potEntity = potCollisions[i];
                if (potEntity != entity && this.hasEntity(potEntity)) {
                    collisions.push(potEntity);
                }
            }
            if (collisions.length > 0) {
                for (var i in this._listeners) {
                    var listener = this._listeners[i];
                    listener(entity, collisions[0], event);
                }
            }
        }
    };
    return CollisionEmitter;
}());
exports.CollisionEmitter = CollisionEmitter;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorCode_1 = __webpack_require__(7);
var Color = (function () {
    function Color(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (a === void 0) { a = 1; }
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
        this.setAlpha(a);
    }
    Color.prototype.setRed = function (r) {
        this._r = r;
    };
    Color.prototype.setGreen = function (g) {
        this._g = g;
    };
    Color.prototype.setBlue = function (b) {
        this._b = b;
    };
    Color.prototype.setAlpha = function (a) {
        this._a = a * 255;
    };
    Color.prototype.getRed = function () {
        return this._r;
    };
    Color.prototype.getGreen = function () {
        return this._g;
    };
    Color.prototype.getBlue = function () {
        return this._b;
    };
    Color.prototype.getAlpha = function () {
        return this._a / 255;
    };
    Color.prototype.toRGB = function () {
        return "rgb(" + this.getRed() + "," + this.getGreen() + "," + this.getBlue() + ")";
    };
    Color.prototype.toRGBA = function () {
        return "rgba(" + this.getRed() + "," + this.getGreen() + "," + this.getBlue() + "," + this.getAlpha() + ")";
    };
    Color.prototype.toHex = function () {
        return (this.getRed() << 16) + (this.getGreen() << 8) + this.getBlue();
    };
    Color.prototype.toHexString = function () {
        var hex = "#";
        hex += this._toHexString(this.getRed());
        hex += this._toHexString(this.getGreen());
        hex += this._toHexString(this.getBlue());
        return hex.toUpperCase();
    };
    Color.prototype.valueOf = function () {
        return this.toString();
    };
    Color.prototype.toString = function () {
        return this.toRGBA();
    };
    Color.prototype._toHexString = function (value) {
        var hex = value.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        return hex;
    };
    Color._parseHexString = function (color) {
        var colorCodes = [];
        color = color.replace('#', '');
        switch (color.length) {
            case 3:
                color = "" + color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
                break;
            case 6:
                break;
            default:
                throw new Error("Malformed hex code \"#" + color + "\". Expecting hex length of 3 or 6.");
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
    };
    Color._parseRGB = function (color) {
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
            throw new Error("Malformed RGB structure \"" + color + "\". Expecting rgb(#,#,#) or rgba(#,#,#,#)");
        }
        for (var i = 0; i < colorCodes.length; i++) {
            var code = colorCodes[i];
            if (isNaN(code) || (code < 0 || code > 255)) {
                throw new Error('Invalid code value in RGB');
            }
        }
        return colorCodes;
    };
    Color._parseColorName = function (color) {
        if (ColorCode_1.ColorMap[color] !== undefined) {
            var colorCode = ColorCode_1.ColorMap[color];
            var rgb = Color._parseHex(colorCode);
            return [rgb.r, rgb.g, rgb.b, 255];
        }
        else {
            throw new Error("Invalid color \"" + color + "\"");
        }
    };
    Color.fromString = function (color) {
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
    };
    Color.fromHex = function (hex) {
        var rgb = Color._parseHex(hex);
        return new Color(rgb.r, rgb.g, rgb.b);
    };
    Color.fromColorCode = function (code) {
        return Color.fromHex(code);
    };
    Color._parseHex = function (hex) {
        var r = hex >> 16;
        var g = hex >> 8 & 0xFF;
        var b = hex & 0xFF;
        return { r: r, g: g, b: b };
    };
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AudioEngine_1 = __webpack_require__(8);
exports.AudioEngine = AudioEngine_1.AudioEngine;
var HTML5AudioEngine_1 = __webpack_require__(35);
exports.HTML5AudioEngine = HTML5AudioEngine_1.HTML5AudioEngine;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var assets_1 = __webpack_require__(0);
var Asset = (function () {
    function Asset(type, url) {
        this._id = utils_1.IDGenerator.getSingleton().generate();
        this._type = type;
        this._data = null;
        this.setSource(url);
        this._attributes = {};
    }
    Asset.prototype.setSource = function (source) {
        if (source !== this.getSource()) {
            this._url = source;
            this.setData(null);
            this.setState(assets_1.AssetState.NOT_LOADED);
        }
    };
    Asset.prototype.getSource = function () {
        return this._url;
    };
    Asset.prototype.setState = function (state) {
        if (this._state !== state) {
            this._state = state;
            this.onStateChange(this._state);
        }
    };
    Asset.prototype.getState = function () {
        return this._state;
    };
    Asset.prototype.setData = function (data) {
        this._data = data;
        this.onDataChange(this._data);
    };
    Asset.prototype.getData = function () {
        return this._data;
    };
    Asset.prototype.getType = function () {
        return this._type;
    };
    Asset.prototype.setLoadStrategy = function (loadStrategy) {
        this._loadStrategy = loadStrategy;
    };
    Asset.prototype.getLoadStrategy = function () {
        return this._loadStrategy;
    };
    Asset.prototype.load = function () {
        this._loadStrategy.load(this);
    };
    Asset.prototype.isReady = function () {
        return (this.getState() === assets_1.AssetState.LOADED);
    };
    Asset.prototype.setAttribute = function (key, value) {
        this._attributes[key] = value;
    };
    Asset.prototype.getAttribute = function (key) {
        return this._attributes[key];
    };
    Asset.prototype.isAttribute = function (key) {
        return !!this._attributes[key];
    };
    Asset.prototype.removeAttribute = function (key) {
        delete this._attributes[key];
    };
    Asset.prototype.onStateChange = function (state) { };
    Asset.prototype.onDataChange = function (data) { };
    Asset.prototype.onError = function (error) { };
    return Asset;
}());
exports.Asset = Asset;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetType;
(function (AssetType) {
    AssetType[AssetType["RAW"] = 0] = "RAW";
    AssetType[AssetType["IMAGE"] = 1] = "IMAGE";
    AssetType[AssetType["AUDIO"] = 2] = "AUDIO";
    AssetType[AssetType["JSON"] = 3] = "JSON";
})(AssetType = exports.AssetType || (exports.AssetType = {}));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetState;
(function (AssetState) {
    AssetState[AssetState["NOT_LOADED"] = 0] = "NOT_LOADED";
    AssetState[AssetState["LOADING"] = 1] = "LOADING";
    AssetState[AssetState["LOADED"] = 2] = "LOADED";
})(AssetState = exports.AssetState || (exports.AssetState = {}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(0);
var AssetFactory = (function () {
    function AssetFactory() {
        this._assetLoader = new assets_1.AssetLoader();
        this._audioLoader = new assets_1.AudioLoader();
        this._imageLoader = new assets_1.ImageLoader();
        this._jsonLoader = new assets_1.JSONLoader();
        this._cache = {};
    }
    AssetFactory.getSingleton = function () {
        if (!AssetFactory._instance) {
            AssetFactory._instance = new AssetFactory();
        }
        return AssetFactory._instance;
    };
    AssetFactory.prototype.build = function (type, url) {
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
    };
    AssetFactory.prototype._configureRawAsset = function (asset, url) { };
    AssetFactory.prototype._configureImageAsset = function (asset, url) {
        var img = document.createElement('img');
        img.addEventListener('load', function () {
            asset.setState(assets_1.AssetState.LOADED);
        });
        asset.setData(img);
    };
    AssetFactory.prototype._configureJSONAsset = function (asset, url) { };
    AssetFactory.prototype._configureAudioAsset = function (asset, url) {
        var audio = document.createElement('audio');
        audio.addEventListener('canplaythrough', function () {
            asset.setState(assets_1.AssetState.LOADED);
        });
        asset.setData(audio);
    };
    AssetFactory.prototype._clone = function (asset) {
        var type = asset.getType();
        var clone = new assets_1.Asset(type, asset.getSource());
        this._cloneAssetData(clone, asset, type);
        return clone;
    };
    AssetFactory.prototype._cloneAssetData = function (clone, asset, type) {
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
    };
    AssetFactory.prototype._cloneNode = function (node) {
        if (node) {
            return node.cloneNode(true);
        }
        else {
            return null;
        }
    };
    return AssetFactory;
}());
exports.AssetFactory = AssetFactory;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(0);
var AssetLoader = (function () {
    function AssetLoader() {
    }
    AssetLoader.prototype.load = function (asset) {
        var _this = this;
        var request = new XMLHttpRequest();
        var source = asset.getSource();
        if (this._validateURL(source)) {
            request.open(this._getMethod(), asset.getSource());
            asset.setState(assets_1.AssetState.LOADING);
            request.onreadystatechange = function (e) {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        _this._onSuccess(asset, request.responseText);
                    }
                    else {
                        _this._onFail(asset, request);
                    }
                }
                _this._postRequest();
            };
            this._preRequest();
            request.send();
        }
        else {
            this._onSuccess(asset, source);
        }
    };
    AssetLoader.prototype.clone = function (asset, clone) {
        clone.setData(asset.getData());
    };
    AssetLoader.prototype._validateURL = function (url) {
        url = url.trim();
        var type = url.substring(0, 5);
        if (type === 'data:') {
            return false;
        }
        return true;
    };
    AssetLoader.prototype._getMethod = function () {
        return 'GET';
    };
    AssetLoader.prototype._preRequest = function () { };
    AssetLoader.prototype._postRequest = function () { };
    AssetLoader.prototype._onSuccess = function (asset, data) {
        asset.setData(data);
    };
    AssetLoader.prototype._onFail = function (asset, request) {
        asset.onError({
            code: request.status,
            message: 'Generic Error Message'
        });
    };
    return AssetLoader;
}());
exports.AssetLoader = AssetLoader;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(0);
var AudioLoader = (function (_super) {
    __extends(AudioLoader, _super);
    function AudioLoader() {
        return _super.call(this) || this;
    }
    AudioLoader.prototype.load = function (asset) {
        asset.setState(assets_1.AssetState.LOADING);
        var audio = asset.getData();
        audio.setAttribute('preload', 'auto');
        this._assignEvents(asset, audio);
        audio.src = asset.getSource();
    };
    AudioLoader.prototype._assignEvents = function (asset, audio) {
        var canPlay = function (e) {
            asset.setData(audio);
            audio.removeEventListener('canplaythrough', canPlay);
        };
        audio.addEventListener('canplaythrough', canPlay);
        audio.addEventListener('error', function () {
            asset.onError();
        });
        audio.addEventListener('playing', function () {
            asset.setAttribute('playing', true);
        });
        audio.addEventListener('ended', function () {
            audio.currentTime = 0;
            asset.setAttribute('playing', false);
        });
    };
    return AudioLoader;
}(assets_1.AssetLoader));
exports.AudioLoader = AudioLoader;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(0);
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader() {
        return _super.call(this) || this;
    }
    ImageLoader.prototype.load = function (asset) {
        asset.setState(assets_1.AssetState.LOADING);
        var image = asset.getData();
        image.onload = function (e) {
            asset.setData(image);
        };
        image.onerror = function (e) {
            asset.onError();
        };
        image.src = asset.getSource();
    };
    return ImageLoader;
}(assets_1.AssetLoader));
exports.ImageLoader = ImageLoader;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(0);
var JSONLoader = (function (_super) {
    __extends(JSONLoader, _super);
    function JSONLoader() {
        return _super.call(this) || this;
    }
    JSONLoader.prototype._onSuccess = function (asset, data) {
        var json = data;
        asset.setData(JSON.parse(json));
    };
    return JSONLoader;
}(assets_1.AssetLoader));
exports.JSONLoader = JSONLoader;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var assets_1 = __webpack_require__(0);
var TextAssetBuilder = (function () {
    function TextAssetBuilder() {
    }
    TextAssetBuilder.prototype.build = function (font, text, maxWidth, height, color) {
        var textViewPort = new utils_1.ViewPort();
        var textAsset = new assets_1.Asset(assets_1.AssetType.IMAGE);
        textViewPort.setFont(font);
        textViewPort.setColor(color || utils_1.Color.fromString("green"));
        textViewPort.setTextBaseline("hanging");
        if (!maxWidth) {
            maxWidth = textViewPort.measureText(text).width;
        }
        textViewPort.setSize({ width: maxWidth, height: height });
        textViewPort.setTextBaseline("hanging");
        textViewPort.drawText(text, 0, 0, maxWidth);
        textAsset.setData(textViewPort.getImage());
        return textAsset;
    };
    return TextAssetBuilder;
}());
exports.TextAssetBuilder = TextAssetBuilder;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var assets_1 = __webpack_require__(0);
var Spritesheet = (function () {
    function Spritesheet(spritesheetAsset, spritesheetDefinition) {
        this._spritesheetAsset = spritesheetAsset;
        this._spritesheetDefinition = spritesheetDefinition;
        this._spriteCache = {};
    }
    Spritesheet.prototype.getSprite = function (id) {
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
    };
    return Spritesheet;
}());
exports.Spritesheet = Spritesheet;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animation = (function () {
    function Animation(entity, animationDefinitions) {
        this._entity = entity;
        this._animationDefinition = animationDefinitions;
        this.loop = true;
        this._timeout = false;
        this.reverseLoop = false;
        this._animating = false;
        this._animation_index = -1;
    }
    Animation.prototype.isAnimating = function () {
        return this._animating;
    };
    Animation.prototype.start = function () {
        if (!this._timeout) {
            this._direction = "forward";
            this._loadStep(0);
            this._animating = true;
        }
    };
    Animation.prototype.stop = function () {
        clearTimeout(this._timeout);
        this._timeout = false;
        this._animating = false;
    };
    Animation.prototype._loadStep = function (stepIndex) {
        var _this = this;
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
            this._timeout = setTimeout(function () {
                _this._loadStep(nextStepIndex);
            }, step.delay);
        }
        else if (this.reverseLoop) {
            this._timeout = setTimeout(function () {
                if (_this._direction === "forward") {
                    _this._direction = "reverse";
                    _this._loadStep(stepIndex - 1);
                }
                else if (_this._direction === "reverse") {
                    _this._direction = "forward";
                    _this._loadStep(stepIndex + 1);
                }
            }, step.delay);
        }
        else if (this.loop) {
            this._timeout = setTimeout(function () {
                _this._loadStep(0);
            }, step.delay);
        }
        else {
            this.stop();
        }
    };
    return Animation;
}());
exports.Animation = Animation;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AudioEngine_1 = __webpack_require__(8);
var HTML5AudioEngine = (function (_super) {
    __extends(HTML5AudioEngine, _super);
    function HTML5AudioEngine() {
        var _this = _super.call(this) || this;
        _this._backgroundVolume = 1.0;
        _this._soundEffectVolume = 1.0;
        _this._backgroundAudios = [];
        _this._soundEffects = [];
        return _this;
    }
    HTML5AudioEngine.prototype.addBackgroundMusic = function (name, audio) {
        this.addAudio(name, audio);
        this._backgroundAudios.push(audio);
    };
    HTML5AudioEngine.prototype.addSoundEffect = function (name, audio) {
        this.addAudio(name, audio);
        this._soundEffects.push(audio);
    };
    HTML5AudioEngine.prototype.setBackgroundVolume = function (volume) {
        this._backgroundVolume = volume;
        for (var i = 0, len = this._backgroundAudios.length; i < len; i++) {
            this._setVolume(this._backgroundAudios[i], this._backgroundVolume);
        }
    };
    HTML5AudioEngine.prototype.setSoundEffectVolume = function (volume) {
        this._soundEffectVolume = volume;
        for (var i = 0, len = this._soundEffects.length; i < len; i++) {
            this._setVolume(this._soundEffects[i], this._soundEffectVolume);
        }
    };
    HTML5AudioEngine.prototype.isBackgroundMusic = function (audio) {
        return (this._backgroundAudios.indexOf(audio) > -1);
    };
    HTML5AudioEngine.prototype.isSoundEffect = function (audio) {
        return (this._soundEffects.indexOf(audio) > -1);
    };
    HTML5AudioEngine.prototype._playAudio = function (audio) {
        this._updateVolume(audio);
        var data = this._getData(audio);
        data.play();
    };
    HTML5AudioEngine.prototype._updateVolume = function (audio) {
        if (this.isSoundEffect(audio)) {
            this._setVolume(audio, this._soundEffectVolume);
        }
        else if (this.isBackgroundMusic(audio)) {
            this._setVolume(audio, this._backgroundVolume);
        }
    };
    HTML5AudioEngine.prototype._pauseAudio = function (audio) {
        var data = this._getData(audio);
        data.pause();
    };
    HTML5AudioEngine.prototype._stopAudio = function (audio) {
        var data = this._getData(audio);
        data.pause();
        this._setTimeCursor(audio, 0);
    };
    HTML5AudioEngine.prototype._isAudioLooping = function (audio) {
        var data = this._getData(audio);
        return data.loop;
    };
    HTML5AudioEngine.prototype._loopAudio = function (audio, state) {
        var data = this._getData(audio);
        data.loop = state;
    };
    HTML5AudioEngine.prototype._isAudioMuted = function (audio) {
        var data = this._getData(audio);
        return data.muted;
    };
    HTML5AudioEngine.prototype._muteAudio = function (audio, state) {
        var data = this._getData(audio);
        data.muted = state;
    };
    HTML5AudioEngine.prototype._getAudioDuration = function (audio) {
        var data = this._getData(audio);
        return data.duration;
    };
    HTML5AudioEngine.prototype._setTimeCursor = function (audio, seconds) {
        var data = this._getData(audio);
        data.currentTime = seconds;
    };
    HTML5AudioEngine.prototype._getTimeCursor = function (audio) {
        var data = this._getData(audio);
        return data.currentTime;
    };
    HTML5AudioEngine.prototype._setVolume = function (audio, volume) {
        var data = this._getData(audio);
        data.volume = volume;
    };
    HTML5AudioEngine.prototype._getVolume = function (audio) {
        var data = this._getData(audio);
        return data.volume;
    };
    HTML5AudioEngine.prototype._registerStartEvent = function (audio) {
        var data = audio.getData();
        data.addEventListener('playing', function (e) {
            audio.setAttribute('playing', true);
        });
    };
    HTML5AudioEngine.prototype._registerEndEvent = function (audio) {
        var data = audio.getData();
        data.addEventListener('ended', function (e) {
            audio.setAttribute('playing', false);
        });
    };
    return HTML5AudioEngine;
}(AudioEngine_1.AudioEngine));
exports.HTML5AudioEngine = HTML5AudioEngine;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogicEngine = (function () {
    function LogicEngine() {
    }
    return LogicEngine;
}());
exports.LogicEngine = LogicEngine;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(3);
var GroupLogicEngine = (function (_super) {
    __extends(GroupLogicEngine, _super);
    function GroupLogicEngine() {
        var _this = _super.call(this) || this;
        _this._logicCalls = {};
        _this._intervals = {};
        _this._interval = 10;
        return _this;
    }
    GroupLogicEngine.prototype.addLogic = function (id, logicMethod, interval) {
        this._logicCalls[id] = {
            'method': logicMethod,
            'interval': interval
        };
        if (!this._hasInterval(interval)) {
            this._createInterval(interval);
        }
        this._addToInterval(id);
    };
    GroupLogicEngine.prototype.pauseLogic = function (id) {
        this._removeFromInterval(id);
    };
    GroupLogicEngine.prototype.resumeLogic = function (id) {
        this._addToInterval(id);
    };
    GroupLogicEngine.prototype.removeLogic = function (id) {
        if (this._logicCalls[id]) {
            this._removeFromInterval(id);
            delete this._logicCalls[id];
        }
    };
    GroupLogicEngine.prototype._createInterval = function (interval) {
        var _this = this;
        var self = this;
        var methods = [];
        this._intervals[interval] = {
            'methods': methods,
            'interval_id': setInterval(function () {
                _this._processInterval(interval);
            }, interval)
        };
    };
    GroupLogicEngine.prototype._hasInterval = function (interval) {
        return this._intervals[interval] != undefined;
    };
    GroupLogicEngine.prototype._removeInterval = function (interval) {
        clearInterval(this._intervals[interval].interval_id);
        delete this._intervals[interval];
    };
    GroupLogicEngine.prototype._addToInterval = function (id) {
        this._intervals[this._logicCalls[id].interval].methods.push(this._logicCalls[id].method);
    };
    GroupLogicEngine.prototype._removeFromInterval = function (id) {
        var interval = this._logicCalls[id].interval;
        this._intervals[interval].methods.splice(this._intervals[interval].methods.indexOf(this._logicCalls[id].method), 1);
        if (this._intervals[interval].methods.length === 0) {
            this._removeInterval(interval);
        }
    };
    GroupLogicEngine.prototype._processInterval = function (interval) {
        for (var i in this._intervals[interval].methods) {
            this._intervals[interval].methods[i]();
        }
    };
    return GroupLogicEngine;
}(_1.LogicEngine));
exports.GroupLogicEngine = GroupLogicEngine;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var RenderingEngine = (function () {
    function RenderingEngine() {
        this._prerenderViewPort = new utils_1.ViewPort();
        this._rendering = false;
        this._fps = 0;
        this._frames = 0;
        this._showFPS = true;
        this._cameras = [];
    }
    RenderingEngine.prototype.setViewPort = function (viewPort) {
        this._viewPort = viewPort;
    };
    RenderingEngine.prototype.getViewPort = function () {
        return this._viewPort;
    };
    RenderingEngine.prototype.setHUD = function (hud) {
        this._HUDEntity = hud;
    };
    RenderingEngine.prototype.getHUD = function () {
        return this._HUDEntity;
    };
    RenderingEngine.prototype.addCamera = function (camera) {
        this._cameras.push(camera);
    };
    RenderingEngine.prototype.removeCamera = function (camera) {
        delete this._cameras[this._cameras.indexOf(camera)];
    };
    RenderingEngine.prototype.startRendering = function () {
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
    };
    RenderingEngine.prototype.stopRendering = function () {
        window.cancelAnimationFrame(this._animationFrameID);
        this._animationFrameID = null;
        this._rendering = false;
    };
    RenderingEngine.prototype._requestFrame = function () {
        var _this = this;
        if (this._rendering) {
            this._animationFrameID = window.requestAnimationFrame(function () {
                _this._render();
                _this._postRender();
            });
        }
    };
    RenderingEngine.prototype._render = function () {
        this._viewPort.clear();
    };
    RenderingEngine.prototype._calculateFPS = function () {
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
    };
    RenderingEngine.prototype._postRender = function () {
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
    };
    return RenderingEngine;
}());
exports.RenderingEngine = RenderingEngine;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(3);
var TwoDimensionalRenderingEngine = (function (_super) {
    __extends(TwoDimensionalRenderingEngine, _super);
    function TwoDimensionalRenderingEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TwoDimensionalRenderingEngine.prototype._render = function () {
        _super.prototype._render.call(this);
        var context = this.getViewPort().getContext();
        for (var i in this._cameras) {
            this._renderCamera(this._cameras[i]);
        }
        if (this.getHUD()) {
            this._renderEntity(this.getHUD(), null);
        }
    };
    TwoDimensionalRenderingEngine.prototype._renderCamera = function (camera) {
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
    };
    TwoDimensionalRenderingEngine.prototype._renderEntity = function (entity, camera) {
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
    };
    return TwoDimensionalRenderingEngine;
}(_1.RenderingEngine));
exports.TwoDimensionalRenderingEngine = TwoDimensionalRenderingEngine;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var utils_1 = __webpack_require__(1);
var EntityModel = (function (_super) {
    __extends(EntityModel, _super);
    function EntityModel() {
        var _this = _super.call(this) || this;
        _this._attributes = {};
        _this._id = utils_1.IDGenerator.getSingleton().generate();
        _this._type = 'generic';
        return _this;
    }
    EntityModel.prototype.getID = function () {
        return this._id;
    };
    EntityModel.prototype.setType = function (type) {
        this._type = type;
    };
    EntityModel.prototype.getType = function () {
        return this._type;
    };
    EntityModel.prototype.setTexture = function (asset) {
        this._texture = asset;
        this.emit(3..toString(), {
            attribute: 'texture',
            name: name,
            value: asset
        });
    };
    EntityModel.prototype.getTexture = function () {
        return this._texture;
    };
    EntityModel.prototype.setAttribute = function (key, value) {
        var oldValue = this.getAttribute(key);
        this._attributes[key] = value;
        this.emit(1..toString(), {
            attribute: key,
            oldValue: oldValue,
            value: value
        });
    };
    EntityModel.prototype.removeAttribute = function (key) {
        var value = this.getAttribute(key);
        delete this._attributes[key];
        var data = {
            type: 2..toString(),
            attribute: key,
            value: value,
            source: this
        };
        this.emit(2..toString(), data);
    };
    EntityModel.prototype.getAttribute = function (key) {
        return this._attributes[key];
    };
    EntityModel.prototype.hasAttribute = function (key) {
        if (this._attributes[key]) {
            return true;
        }
        else {
            return false;
        }
    };
    EntityModel.prototype.sync = function (listener) {
    };
    return EntityModel;
}(Events.EventEmitter));
exports.EntityModel = EntityModel;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntityView_1 = __webpack_require__(11);
var EntityView2D = (function (_super) {
    __extends(EntityView2D, _super);
    function EntityView2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EntityView2D;
}(EntityView_1.EntityView));
exports.EntityView2D = EntityView2D;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = __webpack_require__(10);
var GridMap = (function (_super) {
    __extends(GridMap, _super);
    function GridMap(tileSize, tileCount) {
        var _this = _super.call(this) || this;
        _this.tileSize = tileSize;
        _this.tileCount = tileCount;
        _this._tiles = [];
        _this.setWidth(_this.tileSize.width * _this.tileCount.x);
        _this.setHeight(_this.tileSize.height * _this.tileCount.y);
        for (var x = 0; x < _this.tileCount.x; x++) {
            for (var y = 0; y < _this.tileCount.y; y++) {
                var tile = new Entity_1.Entity();
                tile.setWidth(_this.tileSize.width);
                tile.setHeight(_this.tileSize.height);
                tile.setX((x + 1) * _this.tileSize.width);
                tile.setY((y + 1) * _this.tileSize.height);
                _this.addChild(tile);
                if (!_this._tiles[x]) {
                    _this._tiles[x] = [];
                }
                _this._tiles[x][y] = tile;
            }
        }
        return _this;
    }
    GridMap.prototype.getTile = function (coordinate) {
        return this._tiles[coordinate.x][coordinate.y];
    };
    GridMap.prototype.getTiles = function () {
        return this._children;
    };
    return GridMap;
}(Entity_1.Entity));
exports.GridMap = GridMap;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var entities_1 = __webpack_require__(4);
var assets_1 = __webpack_require__(0);
var core_1 = __webpack_require__(5);
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(character_spritesheet) {
        var _this = _super.call(this) || this;
        _this.setWidth(14);
        _this.setHeight(21);
        _this._characterSpritesheet = character_spritesheet;
        _this._upAnim = new assets_1.Animation(_this, [
            { "asset": character_spritesheet.getSprite('player_up_step1'), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 }
        ]);
        _this._downAnim = new assets_1.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_down_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 }
        ]);
        _this._leftAnim = new assets_1.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_left_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 }
        ]);
        _this._rightAnim = new assets_1.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_right_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 }
        ]);
        return _this;
    }
    Character.prototype._move = function (coordinates) {
        var _this = this;
        var game = core_1.getInstance();
        game.getLogicEngine().removeLogic(this.getID() + "_endmove");
        var collision = false;
        var updatedCoordinates = false;
        var x = coordinates.x;
        var y = coordinates.y;
        var potCollisions = this.getParent().findChildren({ x: x + 1, y: y + 16 });
        for (var i in potCollisions) {
            if (potCollisions[i] != this && potCollisions[i].isCollisionable()) {
                collision = true;
            }
        }
        if (!collision) {
            game.getLogicEngine().addLogic(this.getID() + "_move", function () {
                if (_this.getX() != x) {
                    if (_this.getX() > x) {
                        _this.setX(_this.getX() - 2);
                        if (!updatedCoordinates) {
                            _this.tileX -= 1;
                            updatedCoordinates = true;
                        }
                    }
                    else {
                        _this.setX(_this.getX() + 2);
                        if (!updatedCoordinates) {
                            _this.tileX += 1;
                            updatedCoordinates = true;
                        }
                    }
                }
                if (_this.getY() != y) {
                    if (_this.getY() > y) {
                        _this.setY(_this.getY() - 2);
                        if (!updatedCoordinates) {
                            _this.tileY -= 1;
                            updatedCoordinates = true;
                        }
                    }
                    else {
                        _this.setY((_this.getY()) + 2);
                        if (!updatedCoordinates) {
                            _this.tileY += 1;
                            updatedCoordinates = true;
                        }
                    }
                }
                ;
                if (_this.getX() == x && _this.getY() == y || collision) {
                    game.getLogicEngine().removeLogic(_this.getID() + "_move");
                    _this.moving = false;
                    game.getLogicEngine().addLogic(_this.getID() + "_endmove", function () {
                        _this._activeAnim.stop();
                        delete _this._activeAnim;
                        _this.setTexture(_this._endTexture);
                        game.getLogicEngine().removeLogic(_this.getID() + "_endmove");
                    }, 50);
                }
            }, 50);
        }
        else {
            this.moving = false;
            this._activeAnim.stop();
            delete this._activeAnim;
            this.setTexture(this._endTexture);
        }
    };
    Character.prototype.moveLeft = function () {
        if (!this.moving) {
            if (this._activeAnim && this._activeAnim != this._leftAnim) {
                this._activeAnim.stop();
            }
            this._endTexture = this._characterSpritesheet.getSprite("player_left");
            this._leftAnim.start();
            this._activeAnim = this._leftAnim;
            this.moving = true;
            this._move({ x: this.getX() - 16, y: this.getY() });
        }
    };
    Character.prototype.moveUp = function () {
        if (!this.moving) {
            if (this._activeAnim && this._activeAnim != this._upAnim) {
                this._activeAnim.stop();
            }
            this._endTexture = this._characterSpritesheet.getSprite("player_up");
            this._upAnim.start();
            this._activeAnim = this._upAnim;
            this.moving = true;
            this._move({ x: this.getX(), y: this.getY() - 16 });
        }
    };
    Character.prototype.moveRight = function () {
        if (!this.moving) {
            if (this._activeAnim && this._activeAnim != this._rightAnim) {
                this._activeAnim.stop();
            }
            this._endTexture = this._characterSpritesheet.getSprite("player_right");
            this._rightAnim.start();
            this._activeAnim = this._rightAnim;
            this.moving = true;
            this._move({ x: this.getX() + 16, y: this.getY() });
        }
    };
    Character.prototype.moveDown = function () {
        if (!this.moving) {
            if (this._activeAnim && this._activeAnim != this._downAnim) {
                this._activeAnim.stop();
            }
            this._endTexture = this._characterSpritesheet.getSprite("player_down");
            this._downAnim.start();
            this._activeAnim = this._downAnim;
            this.moving = true;
            this._move({ x: this.getX(), y: this.getY() + 16 });
        }
    };
    return Character;
}(entities_1.Entity));
exports.default = Character;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GamePadListener_1 = __webpack_require__(45);
exports.GamePadListener = GamePadListener_1.GamePadListener;
var GamePad_1 = __webpack_require__(12);
exports.GamePad = GamePad_1.GamePad;
var Keyboard_1 = __webpack_require__(46);
exports.Keyboard = Keyboard_1.Keyboard;
exports.KeyboardKeys = Keyboard_1.KeyboardKeys;
var Mouse_1 = __webpack_require__(47);
exports.Mouse = Mouse_1.Mouse;
var Touch_1 = __webpack_require__(13);
exports.Touch = Touch_1.Touch;
var TouchListener_1 = __webpack_require__(48);
exports.TouchListener = TouchListener_1.TouchListener;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GamePad_1 = __webpack_require__(12);
var Events = __webpack_require__(2);
var GamePadListener = (function (_super) {
    __extends(GamePadListener, _super);
    function GamePadListener() {
        var _this = _super.call(this) || this;
        if (navigator.getGamepads) {
            _this._buildGamePads();
            _this._gamePadPollTimer = window.setInterval(function () {
                var gamePads = navigator.getGamepads();
                for (var i = 0; i < gamePads.length; i++) {
                    if (gamePads[i] && !_this._activeGamePads[i]) {
                        var gamePad = _this._buildGamePad(i);
                        _this.emit("GAMEPADADDED", gamePad);
                    }
                    else if (!gamePads[i] && _this._activeGamePads[i]) {
                        var gamePad = _this._activeGamePads[i];
                        delete _this._activeGamePads[i];
                        _this.emit("GAMEPADREMOVED", gamePad);
                    }
                }
            }, 15);
        }
        else {
            console.log("Browser does not support GamePad API");
        }
        return _this;
    }
    GamePadListener.prototype._buildGamePads = function () {
        var gamePads = navigator.getGamepads();
        this._activeGamePads = [];
        for (var i = 0; i < gamePads.length; i++) {
            if (gamePads[i]) {
                this._buildGamePad(i);
            }
        }
    };
    GamePadListener.prototype._buildGamePad = function (index) {
        var gamePad = new GamePad_1.GamePad(index);
        this._activeGamePads[index] = gamePad;
        return gamePad;
    };
    GamePadListener.getInstance = function () {
        GamePadListener._instance = GamePadListener._instance || new GamePadListener();
        return GamePadListener._instance;
    };
    GamePadListener.prototype.hasGamePads = function () {
        return this._activeGamePads.length > 0;
    };
    GamePadListener.prototype.getGamePads = function () {
        return this._activeGamePads;
    };
    return GamePadListener;
}(Events.EventEmitter));
exports.GamePadListener = GamePadListener;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
exports.KeyboardKeys = {
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    "BREAK": 3,
    "BACKSPACE": 8,
    "TAB": 9,
    "CLEAR": 12,
    "ENTER": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "PAUSE": 19,
    "CAPSLOCK": 20,
    "ESCAPE": 27,
    "SPACEBAR": 32,
    "PAGEUP": 33,
    "PAGEDOWN": 34,
    "END": 35,
    "HOME": 36,
    "LEFTARROW": 37,
    "UPARROW": 38,
    "RIGHTARROW": 39,
    "DOWNARROW": 40,
    "SELECT": 41,
    "PRINT": 42,
    "EXECUTE": 43,
    "PRINTSCREEN": 44,
    "INSERT": 45,
    "DELETE": 46,
    "COLON": 58,
    "SEMICOLON": 59,
    "LESSTHAN": 60,
    "EQUALS": 61,
    "AMPERSAT": 64,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "WINDOWSKEY": 91,
    "RIGHTWINDOWSKEY": 92,
    "WINDOWSMENU": 93,
    "NUM0": 96,
    "NUM1": 97,
    "NUM2": 98,
    "NUM3": 99,
    "NUM4": 100,
    "NUM5": 101,
    "NUM6": 102,
    "NUM7": 103,
    "NUM8": 104,
    "NUM9": 105,
    "NUMMULTIPLY": 106,
    "NUMADD": 107,
    "NUMPERIOD": 108,
    "NUMSUBTRACT": 109,
    "DECIMALPOINT": 110,
    "NUMDIVIDE": 111,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123,
    "F13": 124,
    "F14": 125,
    "F15": 126,
    "F16": 127,
    "F17": 128,
    "F18": 129,
    "F19": 130,
    "F20": 131,
    "F21": 132,
    "F22": 133,
    "F23": 134,
    "F24": 135,
    "NUMLOCK": 144,
    "SCROLLLOCK": 145,
    "CARET": 160,
    "EXCLAMATION": 161,
    "POUND": 163,
    "MONEYSIGN": 164,
};
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        var _this = _super.call(this) || this;
        _this._buttonMap = {};
        _this._buttonsActive = {};
        window.addEventListener("keydown", function (e) {
            if (!_this.isButtonActive(e.which)) {
                _this._setButtonActive(e.which, true);
                _this._setButtonValue(e.which, true);
                var event_1 = {
                    type: "KEYDOWN",
                    source: _this,
                    key: e.which
                };
                _this.emit("KEYDOWN", event_1);
            }
        }, true);
        window.addEventListener("keyup", function (e) {
            _this._setButtonActive(e.which, false);
            _this._setButtonValue(e.which, false);
            var event = {
                type: "KEYUP",
                source: _this,
                key: e.which
            };
            _this.emit("KEYUP", event);
        }, true);
        return _this;
    }
    Keyboard.prototype._setButtonActive = function (id, active) {
        this._buttonsActive[id] = active;
    };
    Keyboard.prototype.isButtonActive = function (id) {
        return this._buttonsActive[id] === true;
    };
    Keyboard.prototype.getButtonValue = function (id) {
        return this._buttonMap[id];
    };
    Keyboard.prototype._setButtonValue = function (id, value) {
        this._buttonMap[id] = value;
    };
    Keyboard.getInstance = function () {
        Keyboard._instance = Keyboard._instance || new Keyboard();
        return Keyboard._instance;
    };
    return Keyboard;
}(Events.EventEmitter));
exports.Keyboard = Keyboard;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(2);
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        var _this = _super.call(this) || this;
        _this._leftButtonDown = false;
        _this._rightButtonDown = false;
        _this._scrollWheelDown = false;
        _this._mouseCoords = { x: 0, y: 0 };
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        window.addEventListener("mousedown", function (e) {
            if (e.button === 0) {
                _this._leftButtonDown = true;
                var event_1 = {
                    type: "LEFTBUTTONDOWN",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("LEFTBUTTONDOWN", event_1);
            }
            else if (e.button === 1) {
                _this._scrollWheelDown = true;
                var event_2 = {
                    type: "SCROLLWHEELDOWN",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("SCROLLWHEELDOWN", event_2);
            }
            else if (e.button === 2) {
                _this._rightButtonDown = true;
                var event_3 = {
                    type: "RIGHTBUTTONDOWN",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("RIGHTBUTTONDOWN", event_3);
            }
        }, true);
        window.addEventListener("mouseup", function (e) {
            if (e.button === 0) {
                _this._leftButtonDown = false;
                var event_4 = {
                    type: "LEFTBUTTONUP",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("LEFTBUTTONUP", event_4);
            }
            else if (e.button === 1) {
                _this._scrollWheelDown = false;
                var event_5 = {
                    type: "SCROLLWHEELUP",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("SCROLLWHEELUP", event_5);
            }
            else if (e.button === 2) {
                _this._rightButtonDown = false;
                var event_6 = {
                    type: "RIGHTBUTTONUP",
                    source: _this,
                    x: e.clientX,
                    y: e.clientY
                };
                _this.emit("RIGHTBUTTONUP", event_6);
            }
        }, true);
        window.addEventListener("mousemove", function (e) {
            _this._mouseCoords = { x: e.clientX, y: e.clientY };
            var event = {
                type: "MOUSEMOVE",
                source: _this,
                x: e.clientX,
                y: e.clientY
            };
            _this.emit("MOUSEMOVE", event);
        }, true);
        window.addEventListener("wheel", function (e) {
            var yDelta = 0;
            var xDelta = 0;
            if (e.wheelDeltaY > 0) {
                yDelta = 1;
            }
            else if (e.wheelDeltaY < 0) {
                yDelta = -1;
            }
            if (e.wheelDeltaX > 0) {
                xDelta = 1;
            }
            else if (e.wheelDeltaX < 0) {
                xDelta = -1;
            }
            var event = {
                type: "SCROLLWHEELMOVE".toString(),
                source: _this,
                x: e.clientX,
                y: e.clientY,
                yDelta: yDelta,
                xDelta: xDelta
            };
            _this.emit("SCROLLWHEELMOVE".toString(), event);
        }, true);
        return _this;
    }
    Mouse.prototype.getCurrentCoordinates = function () {
        return this._mouseCoords;
    };
    Mouse.prototype.isLeftButtonClicked = function () {
        return this._leftButtonDown;
    };
    Mouse.prototype.isMouseWheelClicked = function () {
        return this._scrollWheelDown;
    };
    Mouse.prototype.isRightButtonClicked = function () {
        return this._rightButtonDown;
    };
    Mouse.getInstance = function () {
        Mouse._instance = Mouse._instance || new Mouse();
        return Mouse._instance;
    };
    return Mouse;
}(Events.EventEmitter));
exports.Mouse = Mouse;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Touch_1 = __webpack_require__(13);
var Events = __webpack_require__(2);
var TouchListener = (function (_super) {
    __extends(TouchListener, _super);
    function TouchListener() {
        var _this = _super.call(this) || this;
        window.addEventListener("touchstart", function (e) {
            e.preventDefault();
            for (var i = 0; i < e.changedTouches.length; i++) {
                var touch = new Touch_1.Touch(e.changedTouches.item(i));
                _this.emit("TOUCHADDED", touch);
            }
        });
        return _this;
    }
    TouchListener.getInstance = function () {
        TouchListener._instance = TouchListener._instance || new TouchListener();
        return TouchListener._instance;
    };
    return TouchListener;
}(Events.EventEmitter));
exports.TouchListener = TouchListener;


/***/ })
/******/ ]);
//# sourceMappingURL=App.js.map