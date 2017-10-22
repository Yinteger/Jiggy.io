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
<<<<<<< HEAD
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Engine_1 = __webpack_require__(1);
	var _1 = __webpack_require__(26);
	var _2 = __webpack_require__(11);
	var _3 = __webpack_require__(31);
	var _4 = __webpack_require__(2);
	var Keyboard_1 = __webpack_require__(37);
	var Mouse_1 = __webpack_require__(39);
	var _5 = __webpack_require__(13);
	var Character_1 = __webpack_require__(40);
	var PalletDemo = (function (_super) {
	    __extends(PalletDemo, _super);
	    function PalletDemo() {
	        _super.call(this);
	        this.viewPort.size = ({ width: 500, height: 500 });
	        this.renderingEngine = new _1.TwoDimensionalRenderingEngine();
	        this.audioEngine = new _2.HTML5AudioEngine();
	        this.logicEngine = new _1.GroupLogicEngine();
	        this.renderingEngine.HUDEntity = (this._createLoadingScreen());
	        this._loadResources();
	    }
	    PalletDemo.prototype._createLoadingScreen = function () {
	        var textAssetBuilder = new _5.TextAssetBuilder();
	        var hud = new _3.Entity();
	        hud.width = 500;
	        hud.height = 500;
	        var loadingText = new _3.Entity();
	        loadingText.width = 165;
	        loadingText.height = 50;
	        loadingText.x = (500 / 2) - 100;
	        loadingText.y = (500 / 2) - 25;
	        hud.addChild(loadingText);
	        var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, "black");
	        var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, "black");
	        var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, "black");
	        var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, "black");
	        var loadingAnim = new _5.Animation(loadingText, [
	            { 'asset': loading0, 'delay': 250 },
	            { 'asset': loading1, 'delay': 250 },
	            { 'asset': loading2, 'delay': 250 },
	            { 'asset': loading3, 'delay': 250 }
	        ]);
	        loadingAnim.start();
	        return hud;
	    };
	    PalletDemo.prototype._createMainMap = function () {
	        var mapContainer = new _3.Entity();
	        var layer1 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
	        var layer2 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
	        var layer3 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
	        mapContainer.width = layer1.width;
	        mapContainer.height = layer1.height;
	        mapContainer.addChild(layer1);
	        mapContainer.addChild(layer2);
	        mapContainer.addChild(layer3);
	        var layer1Iterator = layer1.iterator();
	        while (layer1Iterator.hasNext()) {
	            var tile = layer1Iterator.next();
	            tile.texture = (this._mapSpritesheet.getSprite('grass'));
	        }
	        layer3.getTile({ x: 10, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_11');
	        layer3.getTile({ x: 11, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_12');
	        layer3.getTile({ x: 12, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_13');
	        layer2.getTile({ x: 10, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_21');
	        layer2.getTile({ x: 11, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_22');
	        layer2.getTile({ x: 12, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_23');
	        layer2.getTile({ x: 10, y: 11 }).collisionable = true;
	        layer2.getTile({ x: 11, y: 11 }).collisionable = true;
	        layer2.getTile({ x: 12, y: 11 }).collisionable = true;
	        layer2.getTile({ x: 10, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_31');
	        layer2.getTile({ x: 11, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_32');
	        layer2.getTile({ x: 12, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_33');
	        layer2.getTile({ x: 10, y: 12 }).collisionable = true;
	        layer2.getTile({ x: 11, y: 12 }).collisionable = true;
	        layer2.getTile({ x: 12, y: 12 }).collisionable = true;
	        layer2.getTile({ x: 10, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_41');
	        layer2.getTile({ x: 11, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_42');
	        layer2.getTile({ x: 12, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_43');
	        layer2.getTile({ x: 10, y: 13 }).collisionable = true;
	        layer2.getTile({ x: 11, y: 13 }).collisionable = true;
	        layer2.getTile({ x: 12, y: 13 }).collisionable = true;
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
	                delete _this.renderingEngine.HUDEntity;
	                var map = _this._createMainMap();
	                var camera = new _4.Camera(map, null, { width: 250, height: 250 }, null, { width: 500, height: 500 });
	                _this.renderingEngine.addCamera(camera);
	                Mouse_1.mouse.on(7 .toString(), function (e) {
	                    var fov = camera.fov;
	                    var viewPoint = camera.viewPoint;
	                    if (e.yDelta > 0) {
	                        camera.viewPoint = ({ x: viewPoint.x + 5, y: viewPoint.y + 5 });
	                        camera.fov = ({ width: fov.width - 10, height: fov.height - 10 });
	                    }
	                    else {
	                        camera.viewPoint = ({ x: viewPoint.x - 5, y: viewPoint.y - 5 });
	                        camera.fov = ({ width: fov.width + 10, height: fov.height + 10 });
	                    }
	                });
	                _this.player = new Character_1.default(_this._characterSpritesheet);
	                _this.player.texture = _this._characterSpritesheet.getSprite("player_down");
	                var layer = map.getChildAt(1);
	                var tile = layer.getTile({ x: 5, y: 5 });
	                layer.addChild(_this.player);
	                _this.player.tileX = 5;
	                _this.player.tileY = 5;
	                _this.player.x = tile.x;
	                _this.player.y = tile.y - _this.player.height - tile.height;
	                var pokeball = new _3.Entity();
	                pokeball.width = 25;
	                pokeball.height = 25;
	                var pokeball_asset = _5.AssetFactory.getSingleton().build(_5.AssetType.IMAGE, 'Resources/pokeball.png');
	                pokeball_asset.onStateChange = function (state) {
	                    if (state === _5.AssetState.LOADED) {
	                        pokeball.texture = pokeball_asset;
	                        _this.renderingEngine.HUDEntity = pokeball;
	                    }
	                };
	                pokeball_asset.load();
	                Mouse_1.mouse.on(4 .toString(), function (e) {
	                    pokeball.x = e.x - _this.renderingEngine.viewPort.canvas.offsetLeft - 14;
	                    pokeball.y = e.y - _this.renderingEngine.viewPort.canvas.offsetTop - 14;
	                });
	                _this.player.on(0 .toString(), function () {
	                    var fov = camera.fov;
	                    camera.viewPoint = { x: _this.player.x + ((_this.player.width - fov.width) / 2), y: _this.player.y + ((_this.player.height - fov.height) / 2) };
	                });
	                _this.audioEngine.addAudio('bg', _this._bgMusic);
	                _this.audioEngine.loopAudio('bg', true);
	                _this.audioEngine.playAudio('bg');
	                var direction = null;
	                _this.logicEngine.addLogic('moveLogic', function () {
	                    switch (direction) {
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
	                Keyboard_1.keyboard.on(1 .toString(), function (e) {
	                    switch (e.key) {
	                        case Keyboard_1.KeyboardKeys.W:
	                            direction = 'up';
	                            break;
	                        case Keyboard_1.KeyboardKeys.A:
	                            direction = "left";
	                            break;
	                        case Keyboard_1.KeyboardKeys.S:
	                            direction = "down";
	                            break;
	                        case Keyboard_1.KeyboardKeys.D:
	                            direction = "right";
	                            break;
	                    }
	                });
	                Keyboard_1.keyboard.on(0 .toString(), function (e) {
	                    switch (e.key) {
	                        case Keyboard_1.KeyboardKeys.W:
	                        case Keyboard_1.KeyboardKeys.A:
	                        case Keyboard_1.KeyboardKeys.S:
	                        case Keyboard_1.KeyboardKeys.D:
	                            direction = null;
	                            break;
	                    }
	                });
	            }, 1000);
	        }
	    };
	    PalletDemo.prototype._loadMapSpritesheet = function () {
	        var _this = this;
	        var map_asset = _5.AssetFactory.getSingleton().build(_5.AssetType.IMAGE, 'Resources/61816.png');
	        map_asset.onStateChange = function (state) {
	            if (state === _5.AssetState.LOADED) {
	                _this._mapSpritesheet = new _5.Spritesheet(map_asset, {
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
	                    } });
	                _this._resourceLoaded();
	            }
	        };
	        map_asset.load();
	    };
	    PalletDemo.prototype._loadCharacterSpritesheet = function () {
	        var _this = this;
	        var character_spritesheet = _5.AssetFactory.getSingleton().build(_5.AssetType.IMAGE, 'Resources/3698.png');
	        character_spritesheet.onStateChange = function (state) {
	            if (state === _5.AssetState.LOADED) {
	                _this._characterSpritesheet = new _5.Spritesheet(character_spritesheet, {
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
	        var bg_music = _5.AssetFactory.getSingleton().build(_5.AssetType.AUDIO, 'Resources/music.mp3');
	        bg_music.onStateChange = function (state) {
	            if (state === _5.AssetState.LOADED) {
	                _this._bgMusic = bg_music;
	                _this._resourceLoaded();
	            }
	        };
	        bg_music.load();
	    };
	    return PalletDemo;
	}(Engine_1.default));
	window._PalletDemo = new PalletDemo();


/***/ },
=======
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Asset_1 = __webpack_require__(19);
exports.Asset = Asset_1.Asset;
var AssetType_1 = __webpack_require__(20);
exports.AssetType = AssetType_1.AssetType;
var AssetState_1 = __webpack_require__(21);
exports.AssetState = AssetState_1.AssetState;
var AssetFactory_1 = __webpack_require__(22);
exports.AssetFactory = AssetFactory_1.AssetFactory;
var AssetLoader_1 = __webpack_require__(23);
exports.AssetLoader = AssetLoader_1.AssetLoader;
var AudioLoader_1 = __webpack_require__(24);
exports.AudioLoader = AudioLoader_1.AudioLoader;
var ImageLoader_1 = __webpack_require__(25);
exports.ImageLoader = ImageLoader_1.ImageLoader;
var JSONLoader_1 = __webpack_require__(26);
exports.JSONLoader = JSONLoader_1.JSONLoader;
var TextAssetBuilder_1 = __webpack_require__(27);
exports.TextAssetBuilder = TextAssetBuilder_1.TextAssetBuilder;
var Spritesheet_1 = __webpack_require__(28);
exports.Spritesheet = Spritesheet_1.Spritesheet;
var Animation_1 = __webpack_require__(29);
exports.Animation = Animation_1.Animation;


/***/ }),
>>>>>>> master
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum_1 = __webpack_require__(9);
exports.SeverityEnum = SeverityEnum_1.SeverityEnum;
var Camera_1 = __webpack_require__(15);
exports.Camera = Camera_1.Camera;
var IDGenerator_1 = __webpack_require__(10);
exports.IDGenerator = IDGenerator_1.IDGenerator;
var Iterator_1 = __webpack_require__(11);
exports.Iterator = Iterator_1.Iterator;
var LogManager_1 = __webpack_require__(16);
exports.LogManager = LogManager_1.LogManager;
var ViewPort_1 = __webpack_require__(4);
exports.ViewPort = ViewPort_1.ViewPort;
var CollisionEmitter_1 = __webpack_require__(17);
exports.CollisionEmitter = CollisionEmitter_1.CollisionEmitter;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ControllerType_1 = __webpack_require__(38);
exports.ControllerType = ControllerType_1.ControllerType;
var Controller_1 = __webpack_require__(39);
exports.Controller = Controller_1.Controller;
var MouseController_1 = __webpack_require__(40);
exports.MouseController = MouseController_1.MouseController;
var KeyboardController_1 = __webpack_require__(41);
exports.KeyboardController = KeyboardController_1.KeyboardController;
var InputEvent_1 = __webpack_require__(42);
exports.InputEvent = InputEvent_1.InputEvent;
var KeyCode_1 = __webpack_require__(43);
exports.KeyCode = KeyCode_1.KeyCode;
var MouseButton_1 = __webpack_require__(44);
exports.MouseButton = MouseButton_1.MouseButton;
var ControllerFactory_1 = __webpack_require__(45);
exports.ControllerFactory = ControllerFactory_1.ControllerFactory;
var InputManager_1 = __webpack_require__(46);
exports.InputManager = InputManager_1.InputManager;


/***/ }),
/* 4 */
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
var Events = __webpack_require__(1);
var ViewPort = (function (_super) {
    __extends(ViewPort, _super);
    function ViewPort() {
        var _this = _super.call(this) || this;
        _this.canvas = document.createElement('canvas');
        _this.context = _this.canvas.getContext('2d');
        _this.resizable = false;
        _this._dimension = { width: 0, height: 0 };
        _this.autoSize = false;
        return _this;
    }
    ViewPort.prototype.setScale = function (dimension) {
        this.context.scale(dimension.width, dimension.height);
    };
    Object.defineProperty(ViewPort.prototype, "autoSize", {
        get: function () {
            return this._autoSize;
        },
        set: function (state) {
            var _this = this;
            if (this._autoSizeTimer) {
                clearInterval(this._autoSizeTimer);
            }
            if (state) {
                this._checkForParentSizeChange();
                this._autoSizeTimer = setInterval(function () {
                    _this._checkForParentSizeChange();
                }, 100);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPort.prototype, "size", {
        get: function () {
            return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight };
        },
        set: function (dimension) {
            this._dimension = dimension;
            this.canvas.setAttribute('width', dimension.width + "px");
            this.canvas.setAttribute('height', dimension.height + "px");
            this.emit('resize', dimension);
        },
        enumerable: true,
        configurable: true
    });
    ViewPort.prototype.clear = function () {
        this.context.clearRect(0, 0, this._dimension.width, this._dimension.height);
    };
    ViewPort.prototype.drawImage = function (img, clip_x, clip_y, clip_width, clip_height, x, y, width, height) {
        this.context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
    };
    ViewPort.prototype.setFont = function (font) {
        this.context.font = font;
    };
    ViewPort.prototype.setColor = function (color) {
        this.context.fillStyle = color;
    };
    ViewPort.prototype.measureText = function (text) {
        return this.context.measureText(text);
    };
    ViewPort.prototype.setTextBaseline = function (baseline) {
        this.context.textBaseline = baseline;
    };
    ViewPort.prototype.drawText = function (text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth);
    };
    ViewPort.prototype.setHidden = function () {
        this.canvas.style.position = "absolute";
        this.canvas.style.left = '110001px';
    };
    ViewPort.prototype.getImage = function () {
        var image = document.createElement('img');
        image.src = this.canvas.toDataURL("image/png");
        return image;
    };
    ViewPort.prototype._checkForParentSizeChange = function () {
        if (this.canvas.parentNode) {
            var size = this.size;
            var parent = this.canvas.parentNode;
            var parent_size = { width: parent.offsetWidth, height: parent.offsetHeight - 2 };
            if (size.width != parent_size.width || size.height != parent_size.height) {
                this.size = { width: parent_size.width, height: parent_size.height };
                var eventData = {
                    type: 0..toString(),
                    oldDimensions: size,
                    newDimensions: parent_size,
                    source: this
                };
                this.emit(0..toString(), eventData);
            }
        }
    };
    return ViewPort;
}(Events.EventEmitter));
exports.ViewPort = ViewPort;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AudioEngine_1 = __webpack_require__(18);
exports.AudioEngine = AudioEngine_1.AudioEngine;
var HTML5AudioEngine_1 = __webpack_require__(30);
exports.HTML5AudioEngine = HTML5AudioEngine_1.HTML5AudioEngine;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogicEngine_1 = __webpack_require__(31);
exports.LogicEngine = LogicEngine_1.LogicEngine;
var GroupLogicEngine_1 = __webpack_require__(32);
exports.GroupLogicEngine = GroupLogicEngine_1.GroupLogicEngine;
var RenderingEngine_1 = __webpack_require__(33);
exports.RenderingEngine = RenderingEngine_1.RenderingEngine;
var TwoDimensionalRenderingEngine_1 = __webpack_require__(34);
exports.TwoDimensionalRenderingEngine = TwoDimensionalRenderingEngine_1.TwoDimensionalRenderingEngine;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = __webpack_require__(12);
exports.Entity = Entity_1.Entity;
var EntityModel_1 = __webpack_require__(35);
exports.EntityModel = EntityModel_1.EntityModel;
var EntityView_1 = __webpack_require__(13);
exports.EntityView = EntityView_1.EntityView;
var EntityView2D_1 = __webpack_require__(36);
exports.EntityView2D = EntityView2D_1.EntityView2D;
var GridMap_1 = __webpack_require__(37);
exports.GridMap = GridMap_1.GridMap;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(2);
var audio_1 = __webpack_require__(5);
var assets_1 = __webpack_require__(0);
var Engine = (function () {
    function Engine() {
        if (Engine._instance) {
            throw new Error('Engine is a singleton');
        }
        Engine._instance = this;
        this.debugMode = false;
        this.logManager = utils_1.LogManager.getSingleton();
        this.assetFactory = assets_1.AssetFactory.getSingleton();
        this.audioEngine = new audio_1.HTML5AudioEngine();
        this.viewPort = new utils_1.ViewPort();
        this.logManager.log(utils_1.SeverityEnum.INFO, 'Engine has started.');
    }
    Engine.getSingleton = function () {
        if (!Engine._instance) {
            new Engine();
        }
        return Engine._instance;
    };
    Object.defineProperty(Engine.prototype, "renderingEngine", {
        get: function () {
            return this._renderingEngine;
        },
        set: function (renderingEngine) {
            if (this.renderingEngine) {
            }
            this._renderingEngine = renderingEngine;
            this._renderingEngine.viewPort = this.viewPort;
            this._renderingEngine.startRendering();
        },
        enumerable: true,
        configurable: true
    });
    return Engine;
}());
exports.default = Engine;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum;
(function (SeverityEnum) {
    SeverityEnum[SeverityEnum["DEBUG"] = 0] = "DEBUG";
    SeverityEnum[SeverityEnum["INFO"] = 1] = "INFO";
    SeverityEnum[SeverityEnum["WARNING"] = 2] = "WARNING";
    SeverityEnum[SeverityEnum["ERROR"] = 3] = "ERROR";
})(SeverityEnum = exports.SeverityEnum || (exports.SeverityEnum = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IDGenerator = (function () {
    function IDGenerator() {
    }
    IDGenerator.prototype.generate = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    IDGenerator.getSingleton = function () {
        if (!IDGenerator._instance) {
            IDGenerator._instance = new IDGenerator();
        }
        return IDGenerator._instance;
    };
    return IDGenerator;
}());
exports.IDGenerator = IDGenerator;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = (function () {
    function Iterator(array) {
        this._array = array;
        this._index = -1;
        this._length = array.length;
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
        if (this._array[this._index - 1]) {
            return true;
        }
        else {
            return false;
        }
    };
    Iterator.prototype.prev = function () {
        this._index -= 1;
        return this._array[this._index];
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
var Events = __webpack_require__(1);
var _1 = __webpack_require__(0);
var _2 = __webpack_require__(7);
var Iterator_1 = __webpack_require__(11);
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
            model = new _2.EntityModel();
            useDefaults = true;
        }
        _this.view = new _2.EntityView(model);
        _this.model = model;
        _this._children = new Array();
        _this._regions = [];
        _this._regionDimension;
        _this._regionList = {};
        _this.collisionable = false;
        _this._parent = null;
        _this._modified = false;
        _this._notifierKeys = ['width', 'height', 'color', 'texture', 'textures'];
        _this._parentNotifierKeys = ['x', 'y'];
        if (useDefaults) {
            _this._setDefaults();
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "ID", {
        get: function () {
            return this._model.ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (parent) {
            this._parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "regions", {
        get: function () {
            return this._regions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "regionDimension", {
        get: function () {
            return this._regionDimension;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "type", {
        get: function () {
            return this._model.type;
        },
        set: function (type) {
            this._model.type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (model) {
            var view = this.view;
            var oldModel = this.model;
            if (oldModel) {
                oldModel.removeListener(1..toString(), this._modelCB);
            }
            this._model = model;
            model.on(1..toString(), this._modelCB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "height", {
        get: function () {
            return this.model.getAttribute('height');
        },
        set: function (height) {
            this.model.setAttribute('height', height);
            this._generateRegions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "width", {
        get: function () {
            return this.model.getAttribute('width');
        },
        set: function (width) {
            this.model.setAttribute('width', width);
            this._generateRegions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "x", {
        get: function () {
            return this.model.getAttribute('x');
        },
        set: function (x) {
            var oldCoordinates = { x: this.x, y: this.y };
            this.model.setAttribute('x', x);
            var newCoordinates = { x: this.x, y: this.y };
            if (this.parent) {
                this.parent._updateChildsRegion(this);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "coordinate", {
        set: function (coordinate) {
            var oldCoordinates = { x: this.x, y: this.y };
            this.model.setAttribute('x', coordinate.x);
            this.model.setAttribute('y', coordinate.y);
            var newCoordinates = { x: this.x, y: this.y };
            if (this.parent) {
                this.parent._updateChildsRegion(this);
            }
            var eventData = {
                type: 0..toString(),
                oldCoordinates: oldCoordinates,
                newCoordinates: newCoordinates,
                source: this
            };
            this.emit(0..toString(), eventData);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "x2", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "y", {
        get: function () {
            return this.model.getAttribute('y');
        },
        set: function (y) {
            var oldCoordinates = { x: this.x, y: this.y };
            this.model.setAttribute('y', y);
            var newCoordinates = { x: this.x, y: this.y };
            if (this.parent) {
                this.parent._updateChildsRegion(this);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "y2", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "z", {
        get: function () {
            return this.model.getAttribute('z');
        },
        set: function (z) {
            this.model.setAttribute('z', z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "visible", {
        get: function () {
            return this.model.getAttribute('visible');
        },
        set: function (state) {
            this.model.setAttribute('visible', state);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "color", {
        get: function () {
            var data = this.model.getAttribute('color');
            return data;
        },
        set: function (color) {
            this.model.setAttribute('color', color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "texture", {
        get: function () {
            return this.model.texture;
        },
        set: function (asset) {
            if (asset.getType() !== _1.AssetType.IMAGE) {
                throw new Error('Texture asset must be of type IMAGE.');
            }
            this.model.texture = asset;
            this._setModified(true);
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.isModified = function () {
        return this._modified;
    };
    Entity.prototype.addChild = function (child) {
        var parent = child.parent;
        if (parent) {
            parent.removeChild(child);
        }
        this._children.push(child);
        child.parent = this;
        this._putChildInRegion(child);
    };
    Entity.prototype.removeChild = function (child) {
        if (this.isChild(child)) {
            var idx = this.indexOf(child);
            this._children.splice(idx, 1);
        }
        this._removeChildFromRegions(child);
        delete this._regionList[child.ID];
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
        return new Iterator_1.Iterator(this._children);
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
            return new Iterator_1.Iterator(children);
        }
        else if (startCoordinate) {
            var region = this._coordinateToRegion(startCoordinate);
            var children = [];
            var childrenIterator = new Iterator_1.Iterator(this._getChildrenInRegion({ x: region.x, y: region.y }));
            while (childrenIterator.hasNext()) {
                var child = childrenIterator.next();
                var childCoordinate = child.getCoordinate();
                var childOuterCoordinate = child.getOuterCoordinate();
                if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
                    && childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
                    children.push(child);
                }
            }
            return new Iterator_1.Iterator(children);
        }
        else {
            return new Iterator_1.Iterator(this._children);
        }
    };
    Entity.prototype.findChildren = function (startCoordinate, endCoordinate) {
        var children = [];
        if (this._children.length > 0) {
            if (startCoordinate && !endCoordinate) {
                var region = this._coordinateToRegion(startCoordinate);
                var regionChildren = this._getChildrenInRegion({ x: region.x, y: region.y });
                if (regionChildren.length > 0) {
                    var childrenIterator = new Iterator_1.Iterator(regionChildren);
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
        var childrenIterator = new Iterator_1.Iterator(regionChildren);
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
        return child;
    };
    Entity.prototype.getCoordinate = function () {
        return { x: this.x, y: this.y };
    };
    Entity.prototype.getOuterCoordinate = function () {
        return { x: this.x2, y: this.y2 };
    };
    Entity.prototype.getAbsoluteY = function () {
        var entity = this;
        var y = 0;
        while (entity) {
            y += entity.y;
            entity = entity.parent;
        }
        return y;
    };
    Entity.prototype.getAbsoluteY2 = function () {
        return this.getAbsoluteY() + this.height;
    };
    Entity.prototype.getAbsoluteX = function () {
        var entity = this;
        var x = 0;
        while (entity) {
            x += entity.x;
            entity = entity.parent;
        }
        return x;
    };
    Entity.prototype.getAbsoluteX2 = function () {
        return this.getAbsoluteX() + this.width;
    };
    Entity.prototype.setLocation = function (coordinate) {
        this.x = coordinate.x;
        this.y = coordinate.y;
    };
    Entity.prototype.getLocation = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Entity.prototype.setSize = function (dimension) {
        this._setModified(true);
        this.width = dimension.width;
        this.height = dimension.height;
    };
    Entity.prototype.getSize = function () {
        return { width: this.width, height: this.height };
    };
    Entity.prototype._setDefaults = function () {
        this.setLocation({ x: 0, y: 0 });
        this.setSize({ width: 0, height: 0 });
        this.visible = true;
    };
    Entity.prototype._generateRegions = function () {
        this._regions = [];
        this._regionList = {};
        if (this.width <= 100) {
            var regionWidth = this.width / 2;
        }
        else {
            var regionWidth = 50;
        }
        if (this.height <= 100) {
            var regionHeight = this.height / 2;
        }
        else {
            var regionHeight = 50;
        }
        this._regionDimension = { width: regionWidth, height: regionHeight };
        var xCount = Math.ceil(this.width / regionWidth);
        var yCount = Math.ceil(this.height / regionHeight);
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
        var startRegion = this._coordinateToRegion({ x: child.x, y: child.y });
        var endRegion = this._coordinateToRegion({ x: child.x2, y: child.y2 });
        this._regionList[child.ID] = [];
        if (!isNaN(startRegion.x) && !isNaN(startRegion.y) && !isNaN(endRegion.x) && !isNaN(endRegion.y)) {
            for (var x = startRegion.x; x <= endRegion.x; x++) {
                if (this._regions[x]) {
                    for (var y = startRegion.y; y <= endRegion.y; y++) {
                        if (this._regions[x][y]) {
                            this._regions[x][y].push(child);
                            this._regionList[child.ID].push({ x: x, y: y });
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
        if (this._regionList[child.ID]) {
            for (var i in this._regionList[child.ID]) {
                var coord = this._regionList[child.ID][i];
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
var Events = __webpack_require__(1);
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
    Object.defineProperty(EntityView.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (visible) {
            this._visible = visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityView.prototype, "model", {
        set: function (model) {
            if (this._model) {
                this._detachEvents();
            }
            this._model = model;
            this._attachEvents();
        },
        enumerable: true,
        configurable: true
    });
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
var Engine_1 = __webpack_require__(8);
var _1 = __webpack_require__(6);
var _2 = __webpack_require__(5);
var _3 = __webpack_require__(7);
var _4 = __webpack_require__(2);
var _5 = __webpack_require__(3);
var _6 = __webpack_require__(0);
var Character_1 = __webpack_require__(47);
var PalletDemo = (function (_super) {
    __extends(PalletDemo, _super);
    function PalletDemo() {
        var _this = _super.call(this) || this;
        _this.viewPort.size = ({ width: 500, height: 500 });
        _this.renderingEngine = new _1.TwoDimensionalRenderingEngine();
        _this.audioEngine = new _2.HTML5AudioEngine();
        _this.logicEngine = new _1.GroupLogicEngine();
        _this.renderingEngine.HUDEntity = (_this._createLoadingScreen());
        _this._loadResources();
        return _this;
    }
    PalletDemo.prototype._createLoadingScreen = function () {
        var textAssetBuilder = new _6.TextAssetBuilder();
        var hud = new _3.Entity();
        hud.width = 500;
        hud.height = 500;
        var loadingText = new _3.Entity();
        loadingText.width = 165;
        loadingText.height = 50;
        loadingText.x = (500 / 2) - 100;
        loadingText.y = (500 / 2) - 25;
        hud.addChild(loadingText);
        var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, "black");
        var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, "black");
        var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, "black");
        var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, "black");
        var loadingAnim = new _6.Animation(loadingText, [
            { 'asset': loading0, 'delay': 250 },
            { 'asset': loading1, 'delay': 250 },
            { 'asset': loading2, 'delay': 250 },
            { 'asset': loading3, 'delay': 250 }
        ]);
        loadingAnim.start();
        return hud;
    };
    PalletDemo.prototype._createMainMap = function () {
        var mapContainer = new _3.Entity();
        var layer1 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        var layer2 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        var layer3 = new _3.GridMap({ width: 16, height: 16 }, { x: 50, y: 50 });
        mapContainer.width = layer1.width;
        mapContainer.height = layer1.height;
        mapContainer.addChild(layer1);
        mapContainer.addChild(layer2);
        mapContainer.addChild(layer3);
        var layer1Iterator = layer1.iterator();
        while (layer1Iterator.hasNext()) {
            var tile = layer1Iterator.next();
            tile.texture = (this._mapSpritesheet.getSprite('grass'));
        }
        layer3.getTile({ x: 10, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_11');
        layer3.getTile({ x: 11, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_12');
        layer3.getTile({ x: 12, y: 10 }).texture = this._mapSpritesheet.getSprite('house_1_roof_13');
        layer2.getTile({ x: 10, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_21');
        layer2.getTile({ x: 11, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_22');
        layer2.getTile({ x: 12, y: 11 }).texture = this._mapSpritesheet.getSprite('house_1_roof_23');
        layer2.getTile({ x: 10, y: 11 }).collisionable = true;
        layer2.getTile({ x: 11, y: 11 }).collisionable = true;
        layer2.getTile({ x: 12, y: 11 }).collisionable = true;
        layer2.getTile({ x: 10, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_31');
        layer2.getTile({ x: 11, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_32');
        layer2.getTile({ x: 12, y: 12 }).texture = this._mapSpritesheet.getSprite('house_1_roof_33');
        layer2.getTile({ x: 10, y: 12 }).collisionable = true;
        layer2.getTile({ x: 11, y: 12 }).collisionable = true;
        layer2.getTile({ x: 12, y: 12 }).collisionable = true;
        layer2.getTile({ x: 10, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_41');
        layer2.getTile({ x: 11, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_42');
        layer2.getTile({ x: 12, y: 13 }).texture = this._mapSpritesheet.getSprite('house_1_roof_43');
        layer2.getTile({ x: 10, y: 13 }).collisionable = true;
        layer2.getTile({ x: 11, y: 13 }).collisionable = true;
        layer2.getTile({ x: 12, y: 13 }).collisionable = true;
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
                delete _this.renderingEngine.HUDEntity;
                var map = _this._createMainMap();
                var camera = new _4.Camera(map, null, { width: 250, height: 250 }, null, { width: 500, height: 500 });
                _this.renderingEngine.addCamera(camera);
                _this.viewPort.canvas.addEventListener('mousewheel', function (e) {
                    var fov = camera.fov;
                    var viewPoint = camera.viewPoint;
                    if (e.wheelDelta > 0) {
                        camera.viewPoint = ({ x: viewPoint.x + 5, y: viewPoint.y + 5 });
                        camera.fov = ({ width: fov.width - 10, height: fov.height - 10 });
                    }
                    else {
                        camera.viewPoint = ({ x: viewPoint.x - 5, y: viewPoint.y - 5 });
                        camera.fov = ({ width: fov.width + 10, height: fov.height + 10 });
                    }
                });
                _this.player = new Character_1.default(_this._characterSpritesheet);
                _this.player.texture = _this._characterSpritesheet.getSprite("player_down");
                var layer = map.getChildAt(1);
                var tile = layer.getTile({ x: 5, y: 5 });
                layer.addChild(_this.player);
                _this.player.tileX = 5;
                _this.player.tileY = 5;
                _this.player.x = tile.x;
                _this.player.y = tile.y - _this.player.height - tile.height;
                _this.player.on(0..toString(), function () {
                    var fov = camera.fov;
                    camera.viewPoint = { x: _this.player.x + ((_this.player.width - fov.width) / 2), y: _this.player.y + ((_this.player.height - fov.height) / 2) };
                });
                _this.audioEngine.addAudio('bg', _this._bgMusic);
                _this.audioEngine.loopAudio('bg', true);
                _this.audioEngine.playAudio('bg');
                var direction = null;
                _this.logicEngine.addLogic('moveLogic', function () {
                    switch (direction) {
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
                var inputManager = _5.InputManager.getSingleton();
                inputManager.createController('player', _5.ControllerType.KEYBOARD);
                inputManager.on(_5.InputEvent.BUTTON_DOWN.toString(), function (data) {
                    switch (data.keyCode) {
                        case _5.KeyCode.W:
                            direction = 'up';
                            break;
                        case _5.KeyCode.A:
                            direction = 'left';
                            break;
                        case _5.KeyCode.S:
                            direction = 'down';
                            break;
                        case _5.KeyCode.D:
                            direction = 'right';
                            break;
                    }
                });
                inputManager.on(_5.InputEvent.BUTTON_UP.toString(), function (data) {
                    switch (data.keyCode) {
                        case _5.KeyCode.W:
                        case _5.KeyCode.A:
                        case _5.KeyCode.S:
                        case _5.KeyCode.D:
                            direction = null;
                            break;
                    }
                });
            }, 1000);
        }
    };
    PalletDemo.prototype._loadMapSpritesheet = function () {
        var _this = this;
        var map_asset = _6.AssetFactory.getSingleton().build(_6.AssetType.IMAGE, 'Resources/61816.png');
        map_asset.onStateChange = function (state) {
            if (state === _6.AssetState.LOADED) {
                _this._mapSpritesheet = new _6.Spritesheet(map_asset, {
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
        var character_spritesheet = _6.AssetFactory.getSingleton().build(_6.AssetType.IMAGE, 'Resources/3698.png');
        character_spritesheet.onStateChange = function (state) {
            if (state === _6.AssetState.LOADED) {
                _this._characterSpritesheet = new _6.Spritesheet(character_spritesheet, {
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
        var bg_music = _6.AssetFactory.getSingleton().build(_6.AssetType.AUDIO, 'Resources/music.mp3');
        bg_music.onStateChange = function (state) {
            if (state === _6.AssetState.LOADED) {
                _this._bgMusic = bg_music;
                _this._resourceLoaded();
            }
        };
        bg_music.load();
    };
    return PalletDemo;
}(Engine_1.default));
window._PalletDemo = new PalletDemo();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Camera = (function () {
    function Camera(scene, viewPoint, fov, renderOrigin, renderDimension) {
        this.scene = scene;
        this.viewPoint = viewPoint || { x: 0, y: 0 };
        this.fov = fov || { width: 100, height: 100 };
        this.renderOrigin = renderOrigin || { x: 0, y: 0 };
        this.renderDimension = renderDimension || { width: 100, height: 100 };
    }
    return Camera;
}());
exports.Camera = Camera;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SeverityEnum_1 = __webpack_require__(9);
var LogManager = (function () {
    function LogManager() {
        this._logLevel = SeverityEnum_1.SeverityEnum.WARNING | SeverityEnum_1.SeverityEnum.ERROR;
        this._logLevel = this._logLevel | SeverityEnum_1.SeverityEnum.DEBUG | SeverityEnum_1.SeverityEnum.INFO;
    }
    LogManager.prototype.log = function (severity, message) {
        if (this.getLogLevel() & severity) {
            switch (severity) {
                case SeverityEnum_1.SeverityEnum.DEBUG:
                    console.debug(message);
                    break;
                case SeverityEnum_1.SeverityEnum.INFO:
                    console.info(message);
                    break;
                case SeverityEnum_1.SeverityEnum.WARNING:
                    console.warn(message);
                    break;
                case SeverityEnum_1.SeverityEnum.ERROR:
                    console.error(message);
                    break;
            }
        }
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
/* 17 */
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
            this._entitiesListeners[entity.ID] = [];
            entity.on(0..toString(), this._cbs[0]);
        }
    };
    CollisionEmitter.prototype.removeEntity = function (entity) {
        if (this.hasEntity(entity)) {
            this._entities.splice(this._entities.indexOf(entity), 1);
            delete this._entitiesListeners[entity.ID];
        }
    };
    CollisionEmitter.prototype.hasEntity = function (entity) {
        return this._entitiesListeners.hasOwnProperty(entity.ID);
    };
    CollisionEmitter.prototype.addEntityCollisionListener = function (entity, callback) {
        if (!this.hasEntity(entity)) {
            this.addEntity(entity);
        }
        this._entitiesListeners[entity.ID].push(callback);
    };
    CollisionEmitter.prototype.removeEntityCollisionListener = function (entity, callback) {
        if (this._entitiesListeners[entity.ID].indexOf(callback) > -1) {
            this._entitiesListeners[entity.ID].splice(this._entitiesListeners[entity.ID].indexOf(callback), 1);
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
        if (entity.parent) {
            var potCollisions = entity.parent.findChildren({ x: entity.x, y: entity.y }, { x: entity.x2, y: entity.y2 });
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(2);
var _2 = __webpack_require__(0);
var assetFactory = _2.AssetFactory.getSingleton();
var AudioEngine = (function () {
    function AudioEngine() {
        this._audioMap = {};
        this.logManager = _1.LogManager.getSingleton();
    }
    AudioEngine.prototype.addAudio = function (name, audio, channels) {
        if (audio.getType() !== _2.AssetType.AUDIO) {
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
        this.logManager.log(_1.SeverityEnum.WARNING, 'Audio ' + name + ' is missing from Audio Engine.');
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IDGenerator_1 = __webpack_require__(10);
var _1 = __webpack_require__(0);
var Asset = (function () {
    function Asset(type, url) {
        this._id = IDGenerator_1.IDGenerator.getSingleton().generate();
        this._type = type;
        this._data = null;
        this.setSource(url);
        this._attributes = {};
    }
    Asset.prototype.setSource = function (source) {
        if (source !== this.getSource()) {
            this._url = source;
            this.setData(null);
            this.setState(_1.AssetState.NOT_LOADED);
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
        return (this.getState() === _1.AssetState.LOADED);
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var AssetFactory = (function () {
    function AssetFactory() {
        this._assetLoader = new _1.AssetLoader();
        this._audioLoader = new _1.AudioLoader();
        this._imageLoader = new _1.ImageLoader();
        this._jsonLoader = new _1.JSONLoader();
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
            asset = new _1.Asset(type, url);
        }
        if (!cache) {
            switch (type) {
                default:
                    break;
                case _1.AssetType.RAW:
                    asset.setLoadStrategy(this._assetLoader);
                    this._configureRawAsset(asset, url);
                    break;
                case _1.AssetType.IMAGE:
                    asset.setLoadStrategy(this._imageLoader);
                    this._configureImageAsset(asset, url);
                    break;
                case _1.AssetType.AUDIO:
                    asset.setLoadStrategy(this._audioLoader);
                    this._configureAudioAsset(asset, url);
                    break;
                case _1.AssetType.JSON:
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
            asset.setState(_1.AssetState.LOADED);
        });
        asset.setData(img);
    };
    AssetFactory.prototype._configureJSONAsset = function (asset, url) { };
    AssetFactory.prototype._configureAudioAsset = function (asset, url) {
        var audio = document.createElement('audio');
        audio.addEventListener('canplaythrough', function () {
            asset.setState(_1.AssetState.LOADED);
        });
        asset.setData(audio);
    };
    AssetFactory.prototype._clone = function (asset) {
        var type = asset.getType();
        var clone = new _1.Asset(type, asset.getSource());
        this._cloneAssetData(clone, asset, type);
        return clone;
    };
    AssetFactory.prototype._cloneAssetData = function (clone, asset, type) {
        var data = null;
        switch (type) {
            default:
                data = asset.getData();
                break;
            case _1.AssetType.IMAGE:
                data = this._cloneNode(asset.getData());
                break;
            case _1.AssetType.AUDIO:
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var AssetLoader = (function () {
    function AssetLoader() {
    }
    AssetLoader.prototype.load = function (asset) {
        var _this = this;
        var request = new XMLHttpRequest();
        var source = asset.getSource();
        if (this._validateURL(source)) {
            request.open(this._getMethod(), asset.getSource());
            asset.setState(_1.AssetState.LOADING);
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
/* 24 */
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
var _1 = __webpack_require__(0);
var AudioLoader = (function (_super) {
    __extends(AudioLoader, _super);
    function AudioLoader() {
        return _super.call(this) || this;
    }
    AudioLoader.prototype.load = function (asset) {
        asset.setState(_1.AssetState.LOADING);
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
}(_1.AssetLoader));
exports.AudioLoader = AudioLoader;


/***/ }),
/* 25 */
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
var _1 = __webpack_require__(0);
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader() {
        return _super.call(this) || this;
    }
    ImageLoader.prototype.load = function (asset) {
        asset.setState(_1.AssetState.LOADING);
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
}(_1.AssetLoader));
exports.ImageLoader = ImageLoader;


/***/ }),
/* 26 */
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
var _1 = __webpack_require__(0);
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
}(_1.AssetLoader));
exports.JSONLoader = JSONLoader;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var _2 = __webpack_require__(2);
var TextAssetBuilder = (function () {
    function TextAssetBuilder() {
    }
    TextAssetBuilder.prototype.build = function (font, text, maxWidth, height, color) {
        var textViewPort = new _2.ViewPort();
        var textAsset = new _1.Asset(_1.AssetType.IMAGE);
        textViewPort.setFont(font);
        textViewPort.setColor(color || "green");
        textViewPort.setTextBaseline("hanging");
        if (!maxWidth) {
            maxWidth = textViewPort.measureText(text).width;
        }
        textViewPort.size = ({ width: maxWidth, height: height });
        textViewPort.setFont(font);
        textViewPort.setColor(color);
        textViewPort.setTextBaseline("hanging");
        textViewPort.drawText(text, 0, 0, maxWidth);
        textAsset.setData(textViewPort.getImage());
        return textAsset;
    };
    return TextAssetBuilder;
}());
exports.TextAssetBuilder = TextAssetBuilder;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViewPort_1 = __webpack_require__(4);
var _1 = __webpack_require__(0);
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
            var spriteViewPort = new ViewPort_1.ViewPort();
            this._spriteCache[id] = new _1.Asset(_1.AssetType.IMAGE);
            spriteViewPort.size = { width: def.width, height: def.height };
            spriteViewPort.context.translate(def.flipX === true ? def.width : 0, def.flipY === true ? def.height : 0);
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animation = (function () {
    function Animation(entity, animationDefinitions) {
        this._entity = entity;
        this._animationDefinition = animationDefinitions;
        this.loop = true;
        this.timeout = false;
        this.reverseLoop = false;
        this._animating = false;
        this._animation_index = -1;
    }
    Animation.prototype.isAnimating = function () {
        return this._animating;
    };
    Animation.prototype.start = function () {
        if (!this.timeout) {
            this._direction = "forward";
            this._loadStep(0);
            this._animating = true;
        }
    };
    Animation.prototype.stop = function () {
        clearTimeout(this.timeout);
        this.timeout = false;
        this._animating = false;
    };
    Animation.prototype._loadStep = function (stepIndex) {
        var _this = this;
        var step = this._animationDefinition[stepIndex];
        var sprite = step.asset;
        this._entity.texture = sprite;
        this._entity.width = sprite.getData().width;
        this._entity.height = sprite.getData().height;
        var offset = 0;
        if (step.moveX || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX)) {
            if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX) {
                offset = 0 - this._animationDefinition[stepIndex + 1].moveX;
                this._entity.x = (this._entity.x - this._animationDefinition[stepIndex + 1].moveX);
            }
            else {
                offset = 0 + step.moveX;
                this._entity.x = (this._entity.x + step.moveX);
            }
        }
        if (step.moveY || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY)) {
            if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY) {
                this._entity.y = (this._entity.y - this._animationDefinition[stepIndex + 1].moveY);
            }
            else {
                this._entity.y = (this._entity.y + step.moveY);
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
            this.timeout = setTimeout(function () {
                _this._loadStep(nextStepIndex);
            }, step.delay);
        }
        else if (this.reverseLoop) {
            this.timeout = setTimeout(function () {
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
            this.timeout = setTimeout(function () {
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
/* 30 */
<<<<<<< HEAD
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(26);
	var TwoDimensionalRenderingEngine = (function (_super) {
	    __extends(TwoDimensionalRenderingEngine, _super);
	    function TwoDimensionalRenderingEngine() {
	        _super.apply(this, arguments);
	    }
	    TwoDimensionalRenderingEngine.prototype._render = function () {
	        _super.prototype._render.call(this);
	        var context = this.viewPort.context;
	        for (var i in this._cameras) {
	            this._renderCamera(this._cameras[i]);
	        }
	        if (this.HUDEntity) {
	            this._renderEntity(this.HUDEntity, null);
	        }
	    };
	    TwoDimensionalRenderingEngine.prototype._renderCamera = function (camera) {
	        var scene = camera.scene;
	        var context = this.viewPort.context;
	        if (this.debugCamera) {
	            context.beginPath();
	            context.rect(camera.viewPoint.x, camera.viewPoint.y, camera.fov.width, camera.fov.height);
	            context.lineWidth = 7;
	            context.strokeStyle = 'red';
	            context.stroke();
	            context.beginPath();
	            context.rect(camera.renderOrigin.x, camera.renderOrigin.y, camera.renderDimension.width, camera.renderDimension.height);
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
	            var collidesYAxis = false;
	            var collidesXAxis = false;
	            var cameraBounds = {
	                x: camera.viewPoint.x,
	                y: camera.viewPoint.y,
	                x2: camera.viewPoint.x + camera.fov.width,
	                y2: camera.viewPoint.y + camera.fov.height
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
	            if (entity.getAbsoluteX() < camera.viewPoint.x) {
	                leftClip = camera.viewPoint.x - entity.getAbsoluteX();
	            }
	            var rightClip = 0;
	            if (entity.getAbsoluteX2() > (camera.viewPoint.x + camera.fov.width)) {
	                rightClip = entity.getAbsoluteX2() - (camera.viewPoint.x + camera.fov.width);
	            }
	            var topClip = 0;
	            if (entity.getAbsoluteY() < camera.viewPoint.y) {
	                topClip = camera.viewPoint.y - entity.getAbsoluteY();
	            }
	            var bottomClip = 0;
	            if (entity.getAbsoluteY2() > (camera.viewPoint.y + camera.fov.height)) {
	                bottomClip = entity.getAbsoluteY2() - (camera.viewPoint.y + camera.fov.height);
	            }
	            var xModifier = camera.fov.width / camera.renderDimension.width;
	            var yModifier = camera.fov.height / camera.renderDimension.height;
	            var cameraRelativeY = (entityBounds.y - cameraBounds.y) / yModifier;
	            if (cameraRelativeY < 0) {
	                cameraRelativeY = 0;
	            }
	            var cameraRelativeX = (entityBounds.x - cameraBounds.x) / xModifier;
	            if (cameraRelativeX < 0) {
	                cameraRelativeX = 0;
	            }
	            var clippedEntityHeight = (entity.height - topClip - bottomClip);
	            var clippedEntityWidth = (entity.width - rightClip - leftClip);
	            var x = camera.renderOrigin.x + cameraRelativeX;
	            var y = camera.renderOrigin.y + cameraRelativeY;
	            var w = clippedEntityWidth / xModifier;
	            var h = clippedEntityHeight / yModifier;
	            if (entity.color) {
	                var color = entity.color;
	                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
	                this.viewPort.context.fillRect(x, y, w, h);
	            }
	            if (this.debugRegions) {
	                for (var x_i in entity.regions) {
	                    for (var y_i in entity.regions[x]) {
	                        if (entity.regions[x_i][y_i].length > 0) {
	                            this.viewPort.context.strokeStyle = "red";
	                            this.viewPort.context.strokeRect(entity.getAbsoluteX() + entity.regionDimension.width * parseInt(x_i), entity.getAbsoluteY() + entity.regionDimension.height * parseInt(y_i), entity.regionDimension.width, entity.regionDimension.height);
	                        }
	                    }
	                }
	            }
	            if (entity.texture) {
	                var imageData = entity.texture.getData();
	                var entityToImageYModifier = imageData.height / entity.height;
	                var entityToImageXModifier = imageData.width / entity.width;
	                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
	                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
	                this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h);
	            }
	        }
	        else {
	            var x = entity.x;
	            var y = entity.y;
	            var w = entity.width;
	            var h = entity.height;
	            if (entity.color) {
	                var color = entity.color;
	                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
	                this.viewPort.context.fillRect(x, y, w, h);
	            }
	            if (entity.texture) {
	                var imageData = entity.texture.getData();
	                var entityToImageYModifier = imageData.height / entity.height;
	                var entityToImageXModifier = imageData.width / entity.width;
	                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
	                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
	                this.viewPort.context.drawImage(imageData, x, y, w, h);
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


/***/ },
=======
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
var _1 = __webpack_require__(5);
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
}(_1.AudioEngine));
exports.HTML5AudioEngine = HTML5AudioEngine;


/***/ }),
>>>>>>> master
/* 31 */
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
/* 32 */
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
var _1 = __webpack_require__(6);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViewPort_1 = __webpack_require__(4);
var RenderingEngine = (function () {
    function RenderingEngine() {
        this._prerenderViewPort = new ViewPort_1.ViewPort();
        this._rendering = false;
        this._fps = 0;
        this._frames = 0;
        this._showFPS = true;
        this._cameras = [];
    }
    RenderingEngine.prototype.addCamera = function (camera) {
        this._cameras.push(camera);
    };
    RenderingEngine.prototype.removeCamera = function (camera) {
        delete this._cameras[this._cameras.indexOf(camera)];
    };
    RenderingEngine.prototype.startRendering = function () {
        if (this.viewPort) {
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
        this.viewPort.clear();
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
            var ctx = this.viewPort.context;
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
/* 34 */
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
var _1 = __webpack_require__(6);
var TwoDimensionalRenderingEngine = (function (_super) {
    __extends(TwoDimensionalRenderingEngine, _super);
    function TwoDimensionalRenderingEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TwoDimensionalRenderingEngine.prototype._render = function () {
        _super.prototype._render.call(this);
        var context = this.viewPort.context;
        for (var i in this._cameras) {
            this._renderCamera(this._cameras[i]);
        }
        if (this.HUDEntity) {
            this._renderEntity(this.HUDEntity, null);
        }
    };
    TwoDimensionalRenderingEngine.prototype._renderCamera = function (camera) {
        var scene = camera.scene;
        var context = this.viewPort.context;
        if (this.debugCamera) {
            context.beginPath();
            context.rect(camera.viewPoint.x, camera.viewPoint.y, camera.fov.width, camera.fov.height);
            context.lineWidth = 7;
            context.strokeStyle = 'red';
            context.stroke();
            context.beginPath();
            context.rect(camera.renderOrigin.x, camera.renderOrigin.y, camera.renderDimension.width, camera.renderDimension.height);
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
            var collidesYAxis = false;
            var collidesXAxis = false;
            var cameraBounds = {
                x: camera.viewPoint.x,
                y: camera.viewPoint.y,
                x2: camera.viewPoint.x + camera.fov.width,
                y2: camera.viewPoint.y + camera.fov.height
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
            if (entity.getAbsoluteX() < camera.viewPoint.x) {
                leftClip = camera.viewPoint.x - entity.getAbsoluteX();
            }
            var rightClip = 0;
            if (entity.getAbsoluteX2() > (camera.viewPoint.x + camera.fov.width)) {
                rightClip = entity.getAbsoluteX2() - (camera.viewPoint.x + camera.fov.width);
            }
            var topClip = 0;
            if (entity.getAbsoluteY() < camera.viewPoint.y) {
                topClip = camera.viewPoint.y - entity.getAbsoluteY();
            }
            var bottomClip = 0;
            if (entity.getAbsoluteY2() > (camera.viewPoint.y + camera.fov.height)) {
                bottomClip = entity.getAbsoluteY2() - (camera.viewPoint.y + camera.fov.height);
            }
            var xModifier = camera.fov.width / camera.renderDimension.width;
            var yModifier = camera.fov.height / camera.renderDimension.height;
            var cameraRelativeY = (entityBounds.y - cameraBounds.y) / yModifier;
            if (cameraRelativeY < 0) {
                cameraRelativeY = 0;
            }
            var cameraRelativeX = (entityBounds.x - cameraBounds.x) / xModifier;
            if (cameraRelativeX < 0) {
                cameraRelativeX = 0;
            }
            var clippedEntityHeight = (entity.height - topClip - bottomClip);
            var clippedEntityWidth = (entity.width - rightClip - leftClip);
            var x = camera.renderOrigin.x + cameraRelativeX;
            var y = camera.renderOrigin.y + cameraRelativeY;
            var w = clippedEntityWidth / xModifier;
            var h = clippedEntityHeight / yModifier;
            if (entity.color) {
                var color = entity.color;
                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
                this.viewPort.context.fillRect(x, y, w, h);
            }
            if (this.debugRegions) {
                for (var x_i in entity.regions) {
                    for (var y_i in entity.regions[x]) {
                        if (entity.regions[x_i][y_i].length > 0) {
                            this.viewPort.context.strokeStyle = "red";
                            this.viewPort.context.strokeRect(entity.getAbsoluteX() + entity.regionDimension.width * parseInt(x_i), entity.getAbsoluteY() + entity.regionDimension.height * parseInt(y_i), entity.regionDimension.width, entity.regionDimension.height);
                        }
                    }
                }
            }
            if (entity.texture) {
                var imageData = entity.texture.getData();
                var entityToImageYModifier = imageData.height / entity.height;
                var entityToImageXModifier = imageData.width / entity.width;
                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
                this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h);
            }
        }
        else {
            var x = entity.x;
            var y = entity.y;
            var w = entity.width;
            var h = entity.height;
            if (entity.color) {
                var color = entity.color;
                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
                this.viewPort.context.fillRect(x, y, w, h);
            }
            if (entity.texture) {
                var imageData = entity.texture.getData();
                var entityToImageYModifier = imageData.height / entity.height;
                var entityToImageXModifier = imageData.width / entity.width;
                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;
                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
                this.viewPort.context.drawImage(imageData, x, y, w, h);
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
var Events = __webpack_require__(1);
var _1 = __webpack_require__(2);
var EntityModel = (function (_super) {
    __extends(EntityModel, _super);
    function EntityModel() {
        var _this = _super.call(this) || this;
        _this._attributes = {};
        _this._id = _1.IDGenerator.getSingleton().generate();
        _this.type = 'generic';
        return _this;
    }
    Object.defineProperty(EntityModel.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        set: function (asset) {
            this._texture = asset;
            this.emit(3..toString(), {
                attribute: 'texture',
                name: name,
                value: asset
            });
        },
        enumerable: true,
        configurable: true
    });
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
/* 36 */
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
var EntityView_1 = __webpack_require__(13);
var EntityView2D = (function (_super) {
    __extends(EntityView2D, _super);
    function EntityView2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EntityView2D;
}(EntityView_1.EntityView));
exports.EntityView2D = EntityView2D;


/***/ }),
/* 37 */
<<<<<<< HEAD
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var InputDevice_ts_1 = __webpack_require__(38);
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
	    "NUMPERIOUD": 108,
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
	        var _this = this;
	        _super.call(this);
	        this._buttonMap = {};
	        this._buttonsActive = {};
	        window.addEventListener("keydown", function (e) {
	            if (!_this.isButtonActive(e.which)) {
	                _this._setButtonActive(e.which, true);
	                _this._setButtonValue(e.which, true);
	                var event_1 = {
	                    type: 1 .toString(),
	                    source: _this,
	                    key: e.which
	                };
	                _this.emit(1 .toString(), event_1);
	            }
	        }, true);
	        window.addEventListener("keyup", function (e) {
	            _this._setButtonActive(e.which, false);
	            _this._setButtonValue(e.which, false);
	            var event = {
	                type: 0 .toString(),
	                source: _this,
	                key: e.which
	            };
	            _this.emit(0 .toString(), event);
	        }, true);
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
	    return Keyboard;
	}(InputDevice_ts_1.default));
	exports.keyboard = new Keyboard();


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Events = __webpack_require__(9);
	var InputDevice = (function (_super) {
	    __extends(InputDevice, _super);
	    function InputDevice() {
	        _super.apply(this, arguments);
	    }
	    return InputDevice;
	}(Events.EventEmitter));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = InputDevice;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var InputDevice_ts_1 = __webpack_require__(38);
	var Mouse = (function (_super) {
	    __extends(Mouse, _super);
	    function Mouse() {
	        var _this = this;
	        _super.call(this);
	        this._leftButtonDown = false;
	        this._rightButtonDown = false;
	        this._scrollWheelDown = false;
	        this._mouseCoords = { x: 0, y: 0 };
	        window.addEventListener("mousedown", function (e) {
	            if (e.button === 0) {
	                _this._leftButtonDown = true;
	                var event_1 = {
	                    type: 0 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(0 .toString(), event_1);
	            }
	            else if (e.button === 1) {
	                _this._scrollWheelDown = true;
	                var event_2 = {
	                    type: 5 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(5 .toString(), event_2);
	            }
	            else if (e.button === 2) {
	                _this._rightButtonDown = true;
	                var event_3 = {
	                    type: 2 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(2 .toString(), event_3);
	            }
	        }, true);
	        window.addEventListener("mouseup", function (e) {
	            if (e.button === 0) {
	                _this._leftButtonDown = false;
	                var event_4 = {
	                    type: 1 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(1 .toString(), event_4);
	            }
	            else if (e.button === 1) {
	                _this._scrollWheelDown = false;
	                var event_5 = {
	                    type: 6 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(6 .toString(), event_5);
	            }
	            else if (e.button === 2) {
	                _this._rightButtonDown = false;
	                var event_6 = {
	                    type: 3 .toString(),
	                    source: _this,
	                    x: e.clientX,
	                    y: e.clientY
	                };
	                _this.emit(3 .toString(), event_6);
	            }
	        }, true);
	        window.addEventListener("mousemove", function (e) {
	            _this._mouseCoords = { x: e.clientX, y: e.clientY };
	            var event = {
	                type: 4 .toString(),
	                source: _this,
	                x: e.clientX,
	                y: e.clientY
	            };
	            _this.emit(4 .toString(), event);
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
	                type: 7 .toString(),
	                source: _this,
	                x: e.clientX,
	                y: e.clientY,
	                yDelta: yDelta,
	                xDelta: xDelta
	            };
	            _this.emit(7 .toString(), event);
	        }, true);
	    }
	    return Mouse;
	}(InputDevice_ts_1.default));
	exports.mouse = new Mouse();


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(31);
	var _2 = __webpack_require__(13);
	var Engine_1 = __webpack_require__(1);
	var Character = (function (_super) {
	    __extends(Character, _super);
	    function Character(character_spritesheet) {
	        _super.call(this);
	        this.width = 14;
	        this.height = 21;
	        this._characterSpritesheet = character_spritesheet;
	        this._upAnim = new _2.Animation(this, [
	            { "asset": character_spritesheet.getSprite('player_up_step1'), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_up_step2"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 }]);
	        this._downAnim = new _2.Animation(this, [
	            { "asset": character_spritesheet.getSprite("player_down_step1"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_down_step2"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 }]);
	        this._leftAnim = new _2.Animation(this, [
	            { "asset": character_spritesheet.getSprite("player_left_step2"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_left_step1"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 }]);
	        this._rightAnim = new _2.Animation(this, [
	            { "asset": character_spritesheet.getSprite("player_right_step2"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_right_step1"), "delay": 250 },
	            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 }]);
	    }
	    Character.prototype._move = function (coordinates) {
	        var _this = this;
	        Engine_1.default.getSingleton().logicEngine.removeLogic(this.ID + "_endmove");
	        var collision = false;
	        var updatedCoordinates = false;
	        var x = coordinates.x;
	        var y = coordinates.y;
	        var potCollisions = this.parent.findChildren({ x: x + 1, y: y + 16 });
	        for (var i in potCollisions) {
	            if (potCollisions[i] != this && potCollisions[i].collisionable) {
	                collision = true;
	            }
	        }
	        if (!collision) {
	            Engine_1.default.getSingleton().logicEngine.addLogic(this.ID + "_move", function () {
	                if (_this.x != x) {
	                    if (_this.x > x) {
	                        _this.x = (_this.x - 2);
	                        if (!updatedCoordinates) {
	                            _this.tileX -= 1;
	                            updatedCoordinates = true;
	                        }
	                    }
	                    else {
	                        _this.x = (_this.x + 2);
	                        if (!updatedCoordinates) {
	                            _this.tileX += 1;
	                            updatedCoordinates = true;
	                        }
	                    }
	                }
	                if (_this.y != y) {
	                    if (_this.y > y) {
	                        _this.y = (_this.y - 2);
	                        if (!updatedCoordinates) {
	                            _this.tileY -= 1;
	                            updatedCoordinates = true;
	                        }
	                    }
	                    else {
	                        _this.y = (_this.y) + 2;
	                        if (!updatedCoordinates) {
	                            _this.tileY += 1;
	                            updatedCoordinates = true;
	                        }
	                    }
	                }
	                ;
	                if (_this.x == x && _this.y == y || collision) {
	                    Engine_1.default.getSingleton().logicEngine.removeLogic(_this.ID + "_move");
	                    _this.moving = false;
	                    Engine_1.default.getSingleton().logicEngine.addLogic(_this.ID + "_endmove", function () {
	                        _this._activeAnim.stop();
	                        delete _this._activeAnim;
	                        _this.texture = _this._endTexture;
	                        Engine_1.default.getSingleton().logicEngine.removeLogic(_this.ID + "_endmove");
	                    }, 50);
	                }
	            }, 50);
	        }
	        else {
	            this.moving = false;
	            this._activeAnim.stop();
	            delete this._activeAnim;
	            this.texture = (this._endTexture);
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
	            this._move({ x: this.x - 16, y: this.y });
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
	            this._move({ x: this.x, y: this.y - 16 });
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
	            this._move({ x: this.x + 16, y: this.y });
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
	            this._move({ x: this.x, y: this.y + 16 });
	        }
	    };
	    return Character;
	}(_1.Entity));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Character;


/***/ }
=======
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
var Entity_1 = __webpack_require__(12);
var GridMap = (function (_super) {
    __extends(GridMap, _super);
    function GridMap(tileSize, tileCount) {
        var _this = _super.call(this) || this;
        _this.tileSize = tileSize;
        _this.tileCount = tileCount;
        _this._tiles = [];
        _this.width = (_this.tileSize.width * _this.tileCount.x);
        _this.height = (_this.tileSize.height * _this.tileCount.y);
        for (var x = 0; x < _this.tileCount.x; x++) {
            for (var y = 0; y < _this.tileCount.y; y++) {
                var tile = new Entity_1.Entity();
                tile.width = _this.tileSize.width;
                tile.height = _this.tileSize.height;
                tile.x = ((x + 1) * _this.tileSize.width);
                tile.y = ((y + 1) * _this.tileSize.height);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ControllerType;
(function (ControllerType) {
    ControllerType[ControllerType["MOUSE"] = 0] = "MOUSE";
    ControllerType[ControllerType["KEYBOARD"] = 1] = "KEYBOARD";
})(ControllerType = exports.ControllerType || (exports.ControllerType = {}));


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
var events_1 = __webpack_require__(1);
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super.call(this) || this;
        _this._attachEvents();
        return _this;
    }
    Controller.prototype._fireEvent = function (event, data) {
        this.emit(event.toString(), data);
    };
    return Controller;
}(events_1.EventEmitter));
exports.Controller = Controller;


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
var _1 = __webpack_require__(3);
var MouseController = (function (_super) {
    __extends(MouseController, _super);
    function MouseController() {
        var _this = _super.call(this) || this;
        _this._eventDetails = {
            altKey: false,
            shiftKey: false,
            superKey: false,
            x: -1,
            y: -1,
            buttons: [],
            button: null
        };
        _this._x = -1;
        _this._y = -1;
        return _this;
    }
    MouseController.prototype.destroy = function () {
        document.body.removeEventListener('mousedown', this._mouseDownHandler);
        document.body.removeEventListener('mouseup', this._mouseUpHandler);
        document.body.removeEventListener('mousemove', this._mouseMoveHandler);
        window.removeEventListener('contextmenu', this._contextMenuHandler);
        window.removeEventListener('wheel', this._wheelHandler);
    };
    MouseController.prototype._getMouseButton = function (e) {
        switch (e.button) {
            case 0:
                return _1.MouseButton.BUTTON_LEFT;
            case 1:
                return _1.MouseButton.BUTTON_MIDDLE;
            case 2:
                return _1.MouseButton.BUTTON_RIGHT;
        }
        throw new Error('Unrecognized Mouse Button.');
    };
    MouseController.prototype._mouseDownHandler = function (e) {
        var mouseButton = this._getMouseButton(e);
        if (this._eventDetails.buttons.indexOf(mouseButton) === -1) {
            this._updateEventDetail(e);
            this._onMouseDown();
        }
    };
    MouseController.prototype._mouseUpHandler = function (e) {
        this._updateEventDetail(e);
        this._onMouseUp();
    };
    MouseController.prototype._mouseMoveHandler = function (e) {
        this._updateEventDetail(e);
        if (this._eventDetails.x !== this._x || this._eventDetails.y !== this._y) {
            this._x = this._eventDetails.x;
            this._y = this._eventDetails.y;
            this._onMouseMove();
        }
    };
    MouseController.prototype._contextMenuHandler = function (e) {
        e.preventDefault();
    };
    MouseController.prototype._wheelHandler = function (e) {
        e.preventDefault();
        this._updateEventDetail(e);
        this._onMouseWheel();
    };
    MouseController.prototype._attachEvents = function () {
        window.addEventListener('wheel', this._wheelHandler);
        document.body.addEventListener('contextmenu', this._contextMenuHandler);
        document.body.addEventListener('mousedown', this._mouseDownHandler);
        document.body.addEventListener('mouseup', this._mouseUpHandler);
        document.body.addEventListener('mousemove', this._mouseMoveHandler);
    };
    MouseController.prototype._onMouseDown = function () {
        this._fireEvent(_1.InputEvent.BUTTON_DOWN, this._eventDetails);
    };
    MouseController.prototype._onMouseUp = function () {
        this._fireEvent(_1.InputEvent.BUTTON_UP, this._eventDetails);
    };
    MouseController.prototype._onMouseMove = function () {
        this._fireEvent(_1.InputEvent.POINTER_MOVE, this._eventDetails);
    };
    MouseController.prototype._onMouseWheel = function () {
        this._fireEvent(_1.InputEvent.WHEEL, this._eventDetails);
    };
    MouseController.prototype._updateEventDetail = function (e) {
        var mouseButton = this._getMouseButton(e);
        this._eventDetails.altKey = e.altKey;
        this._eventDetails.shiftKey = e.shiftKey;
        this._eventDetails.superKey = e.metaKey;
        this._eventDetails.button = e.button;
        this._eventDetails.x = e.x;
        this._eventDetails.y = e.y;
        if (e.type === 'mousedown') {
            if (this._eventDetails.buttons.indexOf(mouseButton) === -1) {
                this._eventDetails.buttons.push(mouseButton);
            }
        }
        else if (e.type === 'mouseup') {
            if (this._eventDetails.buttons.indexOf(mouseButton) > -1) {
                this._eventDetails.buttons.splice(this._eventDetails.buttons.indexOf(mouseButton), 1);
            }
        }
    };
    MouseController.prototype.initialize = function (inputManager) {
        var _this = this;
        this.on(_1.InputEvent.BUTTON_DOWN.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.BUTTON_DOWN, data);
        });
        this.on(_1.InputEvent.BUTTON_UP.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.BUTTON_UP, data);
        });
        this.on(_1.InputEvent.POINTER_MOVE.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.POINTER_MOVE, data);
        });
        this.on(_1.InputEvent.WHEEL.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.WHEEL, data);
        });
    };
    return MouseController;
}(_1.Controller));
exports.MouseController = MouseController;


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
var _1 = __webpack_require__(3);
var KeyboardController = (function (_super) {
    __extends(KeyboardController, _super);
    function KeyboardController() {
        var _this = _super.call(this) || this;
        _this._eventDetail = {
            keyCodes: [],
            keyCode: null,
            altKey: false,
            shiftKey: false,
            superKey: false
        };
        return _this;
    }
    KeyboardController.prototype.destroy = function () {
        window.removeEventListener('keyup', this._keyUpHandler);
        window.removeEventListener('keydown', this._keyDownHandler);
    };
    KeyboardController.prototype._keyDownHandler = function (e) {
        e.preventDefault();
        if (this._eventDetail.keyCodes.indexOf(e.keyCode) === -1) {
            this._updateEventDetail(e);
            this._onKeyDown();
        }
    };
    KeyboardController.prototype._keyUpHandler = function (e) {
        e.preventDefault();
        this._updateEventDetail(e);
        this._onKeyUp();
    };
    KeyboardController.prototype._attachEvents = function () {
        this._keyUpHandler = this._keyUpHandler.bind(this);
        this._keyDownHandler = this._keyDownHandler.bind(this);
        window.document.addEventListener('keydown', this._keyDownHandler);
        window.addEventListener('keyup', this._keyUpHandler);
    };
    KeyboardController.prototype._onKeyDown = function () {
        this._fireEvent(_1.InputEvent.BUTTON_DOWN, this._eventDetail);
    };
    KeyboardController.prototype._onKeyUp = function () {
        this._fireEvent(_1.InputEvent.BUTTON_UP, this._eventDetail);
    };
    KeyboardController.prototype._updateEventDetail = function (e) {
        this._eventDetail.altKey = e.altKey;
        this._eventDetail.shiftKey = e.shiftKey;
        this._eventDetail.superKey = e.metaKey;
        this._eventDetail.keyCode = e.keyCode;
        if (e.type === 'keydown') {
            if (this._eventDetail.keyCodes.indexOf(e.keyCode) === -1) {
                this._eventDetail.keyCodes.push(e.keyCode);
            }
        }
        else if (e.type === 'keyup') {
            if (this._eventDetail.keyCodes.indexOf(e.keyCode) > -1) {
                this._eventDetail.keyCodes.splice(this._eventDetail.keyCodes.indexOf(e.keyCode), 1);
            }
        }
    };
    KeyboardController.prototype.initialize = function (inputManager) {
        var _this = this;
        this.on(_1.InputEvent.BUTTON_DOWN.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.BUTTON_DOWN, data);
        });
        this.on(_1.InputEvent.BUTTON_UP.toString(), function (data) {
            inputManager.onInputReceived(_this, _1.InputEvent.BUTTON_UP, data);
        });
    };
    return KeyboardController;
}(_1.Controller));
exports.KeyboardController = KeyboardController;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputEvent;
(function (InputEvent) {
    InputEvent[InputEvent["BUTTON_DOWN"] = 0] = "BUTTON_DOWN";
    InputEvent[InputEvent["BUTTON_UP"] = 1] = "BUTTON_UP";
    InputEvent[InputEvent["POINTER_MOVE"] = 2] = "POINTER_MOVE";
    InputEvent[InputEvent["WHEEL"] = 3] = "WHEEL";
})(InputEvent = exports.InputEvent || (exports.InputEvent = {}));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCode[KeyCode["TAB"] = 9] = "TAB";
    KeyCode[KeyCode["NP_5_UNLOCKED"] = 12] = "NP_5_UNLOCKED";
    KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
    KeyCode[KeyCode["SHIFT"] = 16] = "SHIFT";
    KeyCode[KeyCode["CONTROL"] = 17] = "CONTROL";
    KeyCode[KeyCode["ALT"] = 18] = "ALT";
    KeyCode[KeyCode["PAUSE"] = 19] = "PAUSE";
    KeyCode[KeyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
    KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
    KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    KeyCode[KeyCode["END"] = 35] = "END";
    KeyCode[KeyCode["HOME"] = 36] = "HOME";
    KeyCode[KeyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCode[KeyCode["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCode[KeyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCode[KeyCode["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyCode[KeyCode["PRINT_SCREEN"] = 44] = "PRINT_SCREEN";
    KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
    KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
    KeyCode[KeyCode["ZERO"] = 48] = "ZERO";
    KeyCode[KeyCode["ONE"] = 49] = "ONE";
    KeyCode[KeyCode["TWO"] = 50] = "TWO";
    KeyCode[KeyCode["THREE"] = 51] = "THREE";
    KeyCode[KeyCode["FOUR"] = 52] = "FOUR";
    KeyCode[KeyCode["FIVE"] = 53] = "FIVE";
    KeyCode[KeyCode["SIX"] = 54] = "SIX";
    KeyCode[KeyCode["SEVEN"] = 55] = "SEVEN";
    KeyCode[KeyCode["EIGHT"] = 56] = "EIGHT";
    KeyCode[KeyCode["NINE"] = 57] = "NINE";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["B"] = 66] = "B";
    KeyCode[KeyCode["C"] = 67] = "C";
    KeyCode[KeyCode["D"] = 68] = "D";
    KeyCode[KeyCode["E"] = 69] = "E";
    KeyCode[KeyCode["F"] = 70] = "F";
    KeyCode[KeyCode["G"] = 71] = "G";
    KeyCode[KeyCode["H"] = 72] = "H";
    KeyCode[KeyCode["I"] = 73] = "I";
    KeyCode[KeyCode["J"] = 74] = "J";
    KeyCode[KeyCode["K"] = 75] = "K";
    KeyCode[KeyCode["L"] = 76] = "L";
    KeyCode[KeyCode["M"] = 77] = "M";
    KeyCode[KeyCode["N"] = 78] = "N";
    KeyCode[KeyCode["O"] = 79] = "O";
    KeyCode[KeyCode["P"] = 80] = "P";
    KeyCode[KeyCode["Q"] = 81] = "Q";
    KeyCode[KeyCode["R"] = 82] = "R";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["T"] = 84] = "T";
    KeyCode[KeyCode["U"] = 85] = "U";
    KeyCode[KeyCode["V"] = 86] = "V";
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["X"] = 88] = "X";
    KeyCode[KeyCode["Y"] = 89] = "Y";
    KeyCode[KeyCode["Z"] = 90] = "Z";
    KeyCode[KeyCode["SUPER"] = 91] = "SUPER";
    KeyCode[KeyCode["CONTEXT"] = 93] = "CONTEXT";
    KeyCode[KeyCode["NP_0"] = 96] = "NP_0";
    KeyCode[KeyCode["NP_1"] = 97] = "NP_1";
    KeyCode[KeyCode["NP_2"] = 98] = "NP_2";
    KeyCode[KeyCode["NP_3"] = 99] = "NP_3";
    KeyCode[KeyCode["NP_4"] = 100] = "NP_4";
    KeyCode[KeyCode["NP_5"] = 101] = "NP_5";
    KeyCode[KeyCode["NP_6"] = 102] = "NP_6";
    KeyCode[KeyCode["NP_7"] = 103] = "NP_7";
    KeyCode[KeyCode["NP_8"] = 104] = "NP_8";
    KeyCode[KeyCode["NP_9"] = 105] = "NP_9";
    KeyCode[KeyCode["NP_ASTERIK"] = 106] = "NP_ASTERIK";
    KeyCode[KeyCode["NP_PLUS"] = 107] = "NP_PLUS";
    KeyCode[KeyCode["NP_HYPHEN"] = 109] = "NP_HYPHEN";
    KeyCode[KeyCode["NP_DOT"] = 110] = "NP_DOT";
    KeyCode[KeyCode["NP_SLASH"] = 111] = "NP_SLASH";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NUM_LOCK"] = 144] = "NUM_LOCK";
    KeyCode[KeyCode["SCREEN_LOCK"] = 145] = "SCREEN_LOCK";
    KeyCode[KeyCode["SEMICOLON"] = 186] = "SEMICOLON";
    KeyCode[KeyCode["EQUALS"] = 187] = "EQUALS";
    KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
    KeyCode[KeyCode["HYPHEN"] = 189] = "HYPHEN";
    KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
    KeyCode[KeyCode["SLASH"] = 191] = "SLASH";
    KeyCode[KeyCode["TILDE"] = 192] = "TILDE";
    KeyCode[KeyCode["OPEN_SQUARE_BRACKET"] = 219] = "OPEN_SQUARE_BRACKET";
    KeyCode[KeyCode["BACKSLASH"] = 220] = "BACKSLASH";
    KeyCode[KeyCode["CLOSE_SQUARE_BRACKET"] = 221] = "CLOSE_SQUARE_BRACKET";
    KeyCode[KeyCode["APOSTROPHE"] = 222] = "APOSTROPHE";
    KeyCode[KeyCode["FUNCTION"] = 255] = "FUNCTION";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["BUTTON_LEFT"] = 0] = "BUTTON_LEFT";
    MouseButton[MouseButton["BUTTON_MIDDLE"] = 1] = "BUTTON_MIDDLE";
    MouseButton[MouseButton["BUTTON_RIGHT"] = 2] = "BUTTON_RIGHT";
})(MouseButton = exports.MouseButton || (exports.MouseButton = {}));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(3);
var ControllerFactory = (function () {
    function ControllerFactory() {
    }
    ControllerFactory.getSingleton = function () {
        if (!ControllerFactory._instance) {
            ControllerFactory._instance = new ControllerFactory();
        }
        return ControllerFactory._instance;
    };
    ControllerFactory.prototype.create = function (type) {
        switch (type) {
            default:
                throw new Error('Controller Type is not supported.');
            case _1.ControllerType.MOUSE:
                return new _1.MouseController();
            case _1.ControllerType.KEYBOARD:
                return new _1.KeyboardController();
        }
    };
    return ControllerFactory;
}());
exports.ControllerFactory = ControllerFactory;


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
var events_1 = __webpack_require__(1);
var _1 = __webpack_require__(3);
var InputManager = (function (_super) {
    __extends(InputManager, _super);
    function InputManager() {
        var _this = _super.call(this) || this;
        _this._controllers = {};
        _this._factory = _this._createControllerFactory();
        return _this;
    }
    InputManager.getSingleton = function () {
        if (!InputManager._instance) {
            InputManager._instance = new InputManager();
        }
        return InputManager._instance;
    };
    InputManager.prototype.createController = function (name, type) {
        var controller = this._factory.create(type);
        this._controllers[name] = controller;
        controller.initialize(this);
    };
    InputManager.prototype.removeController = function (name) {
        if (!this.hasController(name)) {
            return;
        }
        var controller = this._getController(name);
        controller.destroy();
        delete this._controllers[name];
    };
    InputManager.prototype.hasController = function (name) {
        return !!(this._controllers[name]);
    };
    InputManager.prototype._getController = function (name) {
        if (!this.hasController(name)) {
            return null;
        }
        return this._controllers[name];
    };
    InputManager.prototype._getControllerName = function (controller) {
        for (var i in this._controllers) {
            if (this._controllers[i] === controller) {
                return i;
            }
        }
        return null;
    };
    InputManager.prototype._createControllerFactory = function () {
        return _1.ControllerFactory.getSingleton();
    };
    InputManager.prototype.onInputReceived = function (controller, inputEvent, data) {
        data.controller = this._getControllerName(controller);
        this.emit(inputEvent.toString(), data);
    };
    return InputManager;
}(events_1.EventEmitter));
exports.InputManager = InputManager;


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
var _1 = __webpack_require__(7);
var _2 = __webpack_require__(0);
var Engine_1 = __webpack_require__(8);
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(character_spritesheet) {
        var _this = _super.call(this) || this;
        _this.width = 14;
        _this.height = 21;
        _this._characterSpritesheet = character_spritesheet;
        _this._upAnim = new _2.Animation(_this, [
            { "asset": character_spritesheet.getSprite('player_up_step1'), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_up"), "delay": 250 }
        ]);
        _this._downAnim = new _2.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_down_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_down"), "delay": 250 }
        ]);
        _this._leftAnim = new _2.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_left_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_left"), "delay": 250 }
        ]);
        _this._rightAnim = new _2.Animation(_this, [
            { "asset": character_spritesheet.getSprite("player_right_step2"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right_step1"), "delay": 250 },
            { "asset": character_spritesheet.getSprite("player_right"), "delay": 250 }
        ]);
        return _this;
    }
    Character.prototype._move = function (coordinates) {
        var _this = this;
        Engine_1.default.getSingleton().logicEngine.removeLogic(this.ID + "_endmove");
        var collision = false;
        var updatedCoordinates = false;
        var x = coordinates.x;
        var y = coordinates.y;
        var potCollisions = this.parent.findChildren({ x: x + 1, y: y + 16 });
        for (var i in potCollisions) {
            if (potCollisions[i] != this && potCollisions[i].collisionable) {
                collision = true;
            }
        }
        if (!collision) {
            Engine_1.default.getSingleton().logicEngine.addLogic(this.ID + "_move", function () {
                if (_this.x != x) {
                    if (_this.x > x) {
                        _this.x = (_this.x - 2);
                        if (!updatedCoordinates) {
                            _this.tileX -= 1;
                            updatedCoordinates = true;
                        }
                    }
                    else {
                        _this.x = (_this.x + 2);
                        if (!updatedCoordinates) {
                            _this.tileX += 1;
                            updatedCoordinates = true;
                        }
                    }
                }
                if (_this.y != y) {
                    if (_this.y > y) {
                        _this.y = (_this.y - 2);
                        if (!updatedCoordinates) {
                            _this.tileY -= 1;
                            updatedCoordinates = true;
                        }
                    }
                    else {
                        _this.y = (_this.y) + 2;
                        if (!updatedCoordinates) {
                            _this.tileY += 1;
                            updatedCoordinates = true;
                        }
                    }
                }
                ;
                if (_this.x == x && _this.y == y || collision) {
                    Engine_1.default.getSingleton().logicEngine.removeLogic(_this.ID + "_move");
                    _this.moving = false;
                    Engine_1.default.getSingleton().logicEngine.addLogic(_this.ID + "_endmove", function () {
                        _this._activeAnim.stop();
                        delete _this._activeAnim;
                        _this.texture = _this._endTexture;
                        Engine_1.default.getSingleton().logicEngine.removeLogic(_this.ID + "_endmove");
                    }, 50);
                }
            }, 50);
        }
        else {
            this.moving = false;
            this._activeAnim.stop();
            delete this._activeAnim;
            this.texture = (this._endTexture);
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
            this._move({ x: this.x - 16, y: this.y });
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
            this._move({ x: this.x, y: this.y - 16 });
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
            this._move({ x: this.x + 16, y: this.y });
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
            this._move({ x: this.x, y: this.y + 16 });
        }
    };
    return Character;
}(_1.Entity));
exports.default = Character;


/***/ })
>>>>>>> master
/******/ ]);
//# sourceMappingURL=App.js.map