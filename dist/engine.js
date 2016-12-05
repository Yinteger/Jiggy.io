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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils_1 = __webpack_require__(1);
	var Audio_1 = __webpack_require__(10);
	var Assets_1 = __webpack_require__(12);
	var Engine = (function () {
	    function Engine() {
	        if (Engine._instance) {
	            throw new Error('Engine is a singleton');
	        }
	        Engine._instance = this;
	        this.debugMode = false;
	        this.logManager = Utils_1.LogManager.getSingleton();
	        this.assetFactory = Assets_1.AssetFactory.getSingleton();
	        this.audioEngine = new Audio_1.HTML5AudioEngine();
	        this.viewPort = new Utils_1.ViewPort();
	        this.logManager.log(Utils_1.SeverityEnum.INFO, 'Engine has started.');
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Engine;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SeverityEnum_1 = __webpack_require__(2);
	exports.SeverityEnum = SeverityEnum_1.SeverityEnum;
	var Camera_1 = __webpack_require__(3);
	exports.Camera = Camera_1.Camera;
	var IDGenerator_1 = __webpack_require__(4);
	exports.IDGenerator = IDGenerator_1.IDGenerator;
	var Iterator_1 = __webpack_require__(5);
	exports.Iterator = Iterator_1.Iterator;
	var LogManager_1 = __webpack_require__(6);
	exports.LogManager = LogManager_1.LogManager;
	var ViewPort_1 = __webpack_require__(7);
	exports.ViewPort = ViewPort_1.ViewPort;
	var CollisionEmitter_1 = __webpack_require__(9);
	exports.CollisionEmitter = CollisionEmitter_1.CollisionEmitter;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	(function (SeverityEnum) {
	    SeverityEnum[SeverityEnum["DEBUG"] = 0] = "DEBUG";
	    SeverityEnum[SeverityEnum["INFO"] = 1] = "INFO";
	    SeverityEnum[SeverityEnum["WARNING"] = 2] = "WARNING";
	    SeverityEnum[SeverityEnum["ERROR"] = 3] = "ERROR";
	})(exports.SeverityEnum || (exports.SeverityEnum = {}));
	var SeverityEnum = exports.SeverityEnum;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var IDGenerator = (function () {
	    function IDGenerator() {
	        if (IDGenerator._instance) {
	            throw new Error('IDGenerator is a singleton.');
	        }
	        IDGenerator._instance = this;
	    }
	    IDGenerator.prototype.generate = function () {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
	            return v.toString(16);
	        });
	    };
	    IDGenerator.getSingleton = function () {
	        if (!IDGenerator._instance) {
	            new IDGenerator();
	        }
	        return IDGenerator._instance;
	    };
	    return IDGenerator;
	}());
	exports.IDGenerator = IDGenerator;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SeverityEnum_1 = __webpack_require__(2);
	var LogManager = (function () {
	    function LogManager() {
	        if (LogManager._instance) {
	            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
	        }
	        LogManager._instance = this;
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
	        return LogManager._instance;
	    };
	    LogManager._instance = new LogManager();
	    return LogManager;
	}());
	exports.LogManager = LogManager;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Events = __webpack_require__(8);
	var ViewPort = (function (_super) {
	    __extends(ViewPort, _super);
	    function ViewPort() {
	        _super.call(this);
	        this.canvas = document.createElement('canvas');
	        this.context = this.canvas.getContext('2d');
	        this.resizable = false;
	        this._dimension = { width: 0, height: 0 };
	        this.autoSize = false;
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
	                    type: 0 .toString(),
	                    oldDimensions: size,
	                    newDimensions: parent_size,
	                    source: this
	                };
	                this.emit(0 .toString(), eventData);
	            }
	        }
	    };
	    return ViewPort;
	}(Events.EventEmitter));
	exports.ViewPort = ViewPort;


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
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
	            entity.on(0 .toString(), this._cbs[0]);
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AudioEngine_1 = __webpack_require__(11);
	exports.AudioEngine = AudioEngine_1.AudioEngine;
	var HTML5AudioEngine_1 = __webpack_require__(24);
	exports.HTML5AudioEngine = HTML5AudioEngine_1.HTML5AudioEngine;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils_1 = __webpack_require__(1);
	var Assets_1 = __webpack_require__(12);
	var assetFactory = Assets_1.AssetFactory.getSingleton();
	var AudioEngine = (function () {
	    function AudioEngine() {
	        this._audioMap = {};
	        this.logManager = Utils_1.LogManager.getSingleton();
	    }
	    AudioEngine.prototype.addAudio = function (name, audio, channels) {
	        if (audio.getType() !== Assets_1.AssetType.AUDIO) {
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
	        this.logManager.log(Utils_1.SeverityEnum.WARNING, 'Audio ' + name + ' is missing from Audio Engine.');
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Asset_1 = __webpack_require__(13);
	exports.Asset = Asset_1.Asset;
	var AssetType_1 = __webpack_require__(14);
	exports.AssetType = AssetType_1.AssetType;
	var AssetState_1 = __webpack_require__(15);
	exports.AssetState = AssetState_1.AssetState;
	var AssetFactory_1 = __webpack_require__(16);
	exports.AssetFactory = AssetFactory_1.AssetFactory;
	var AssetLoader_1 = __webpack_require__(17);
	exports.AssetLoader = AssetLoader_1.AssetLoader;
	var AudioLoader_1 = __webpack_require__(18);
	exports.AudioLoader = AudioLoader_1.AudioLoader;
	var ImageLoader_1 = __webpack_require__(19);
	exports.ImageLoader = ImageLoader_1.ImageLoader;
	var JSONLoader_1 = __webpack_require__(20);
	exports.JSONLoader = JSONLoader_1.JSONLoader;
	var TextAssetBuilder_1 = __webpack_require__(21);
	exports.TextAssetBuilder = TextAssetBuilder_1.TextAssetBuilder;
	var Spritesheet_1 = __webpack_require__(22);
	exports.Spritesheet = Spritesheet_1.Spritesheet;
	var Animation_1 = __webpack_require__(23);
	exports.Animation = Animation_1.Animation;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var IDGenerator_1 = __webpack_require__(4);
	var _1 = __webpack_require__(12);
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


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	(function (AssetType) {
	    AssetType[AssetType["RAW"] = 0] = "RAW";
	    AssetType[AssetType["IMAGE"] = 1] = "IMAGE";
	    AssetType[AssetType["AUDIO"] = 2] = "AUDIO";
	    AssetType[AssetType["JSON"] = 3] = "JSON";
	})(exports.AssetType || (exports.AssetType = {}));
	var AssetType = exports.AssetType;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	(function (AssetState) {
	    AssetState[AssetState["NOT_LOADED"] = 0] = "NOT_LOADED";
	    AssetState[AssetState["LOADING"] = 1] = "LOADING";
	    AssetState[AssetState["LOADED"] = 2] = "LOADED";
	})(exports.AssetState || (exports.AssetState = {}));
	var AssetState = exports.AssetState;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _1 = __webpack_require__(12);
	var AssetFactory = (function () {
	    function AssetFactory() {
	        if (AssetFactory._instance) {
	            throw new Error('AssetFactory is a singleton. Use AssetFactory.getSingleton()');
	        }
	        AssetFactory._instance = this;
	        this._assetLoader = new _1.AssetLoader();
	        this._audioLoader = new _1.AudioLoader();
	        this._imageLoader = new _1.ImageLoader();
	        this._jsonLoader = new _1.JSONLoader();
	        this._cache = {};
	    }
	    AssetFactory.getSingleton = function () {
	        if (!AssetFactory._instance) {
	            new AssetFactory();
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _1 = __webpack_require__(12);
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(12);
	var AudioLoader = (function (_super) {
	    __extends(AudioLoader, _super);
	    function AudioLoader() {
	        _super.call(this);
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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(12);
	var ImageLoader = (function (_super) {
	    __extends(ImageLoader, _super);
	    function ImageLoader() {
	        _super.call(this);
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(12);
	var JSONLoader = (function (_super) {
	    __extends(JSONLoader, _super);
	    function JSONLoader() {
	        _super.call(this);
	    }
	    JSONLoader.prototype._onSuccess = function (asset, data) {
	        var json = data;
	        asset.setData(JSON.parse(json));
	    };
	    return JSONLoader;
	}(_1.AssetLoader));
	exports.JSONLoader = JSONLoader;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _1 = __webpack_require__(12);
	var Utils_1 = __webpack_require__(1);
	var TextAssetBuilder = (function () {
	    function TextAssetBuilder() {
	    }
	    TextAssetBuilder.prototype.build = function (font, text, maxWidth, height, color) {
	        var textViewPort = new Utils_1.ViewPort();
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ViewPort_1 = __webpack_require__(7);
	var _1 = __webpack_require__(12);
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


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
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


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _1 = __webpack_require__(10);
	var HTML5AudioEngine = (function (_super) {
	    __extends(HTML5AudioEngine, _super);
	    function HTML5AudioEngine() {
	        _super.call(this);
	        this._backgroundVolume = 1.0;
	        this._soundEffectVolume = 1.0;
	        this._backgroundAudios = [];
	        this._soundEffects = [];
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


/***/ }
/******/ ]);
//# sourceMappingURL=engine.js.map