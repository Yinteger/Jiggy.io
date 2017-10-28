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
var Engine_1 = require("../../src/Engine");
var _1 = require("../../src/engines/");
var _2 = require("../../src/audio/");
var _3 = require("../../src/entities/");
var _4 = require("../../src/utils/");
var _5 = require("../../src/inputs/");
var _6 = require("../../src/assets/");
var Character_1 = require("./Character");
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
//# sourceMappingURL=App.js.map