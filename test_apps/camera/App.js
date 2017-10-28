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
var engines_1 = require("../../src/engines");
var entities_1 = require("../../src/entities");
var utils_1 = require("../../src/utils");
var assets_1 = require("../../src/assets");
var CameraDemo = (function (_super) {
    __extends(CameraDemo, _super);
    function CameraDemo() {
        var _this = _super.call(this) || this;
        _this._mouseIsIn = false;
        _this.viewPort.autoSize = true;
        _this.renderingEngine = new engines_1.TwoDimensionalRenderingEngine();
        _this.logicEngine = new engines_1.GroupLogicEngine();
        _this._blocks = [];
        _this._blockConfigs = {};
        _this._container = new entities_1.Entity();
        _this._container.color = { r: 0, g: 0, b: 0 };
        _this._container.width = 1000;
        _this._container.height = 1000;
        _this._camera = new utils_1.Camera(_this._container, null, { width: _this._container.width, height: _this._container.height }, null, { height: _this._container.height, width: _this._container.width });
        _this.renderingEngine.addCamera(_this._camera);
        _this._smallCamera = new utils_1.Camera(_this._container, { x: 450, y: 450 }, { width: 75, height: 75 }, { x: 35, y: 35 }, { width: 100, height: 100 });
        _this.renderingEngine.addCamera(_this._smallCamera);
        _this.renderingEngine.debugCamera = true;
        var backgroundLoaded = false;
        var pikachuLoaded = false;
        _this.viewPort.on(utils_1.ViewPortEventTypes.DIMENSION_UPDATE.toString(), _this._viewPortUpdated.bind(_this));
        var background = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.IMAGE, 'resources/poke_background.jpg');
        var pikachu = assets_1.AssetFactory.getSingleton().build(assets_1.AssetType.IMAGE, 'resources/pikachu_small.png');
        var resourcesLoaded = function () {
            for (var i = 0; i < 200; i++) {
                console.log("Generate Pikachus");
                _this._generatePikachu();
            }
            _this.logicEngine.addLogic("collision", _this._moveBlocks.bind(_this), 25);
            _this.viewPort.canvas.addEventListener('mouseover', function () {
                console.log("OVER");
                _this._mouseIsIn = true;
            });
            _this.viewPort.canvas.addEventListener('mouseout', function () {
                console.log("OUT");
                _this._mouseIsIn = false;
            });
            _this.viewPort.canvas.addEventListener('mousemove', function (e) {
                var fov = _this._smallCamera.fov;
                _this._smallCamera.viewPoint = { x: e.clientX - _this.viewPort.canvas.offsetLeft - (fov.width / 2), y: e.clientY - _this.viewPort.canvas.offsetTop - (fov.height / 2) };
            });
            _this.viewPort.canvas.addEventListener('mousewheel', function (e) {
                var fov = _this._smallCamera.fov;
                if (e.wheelDelta > 0) {
                    _this._smallCamera.fov = { width: fov.width - 10, height: fov.height - 10 };
                }
                else {
                    _this._smallCamera.fov = { width: fov.width + 10, height: fov.height + 10 };
                }
            });
        };
        _this._pikachuTexture = pikachu;
        background.onStateChange = function (state) {
            if (state === assets_1.AssetState.LOADED) {
                backgroundLoaded = true;
                _this._container.texture = background;
                if (backgroundLoaded && pikachuLoaded) {
                    resourcesLoaded();
                }
            }
        };
        pikachu.onStateChange = function (state) {
            if (state === assets_1.AssetState.LOADED) {
                pikachuLoaded = true;
                if (backgroundLoaded && pikachuLoaded) {
                    resourcesLoaded();
                }
            }
        };
        background.load();
        pikachu.load();
        return _this;
    }
    CameraDemo.prototype._generatePikachu = function () {
        var block = new entities_1.Entity();
        this._blocks.push(block);
        block.width = 50;
        block.height = 50;
        block.texture = this._pikachuTexture;
        block.x = Math.floor((Math.random() * this._container.width) + 1);
        block.y = Math.floor((Math.random() * this._container.height) + 1);
        this._blockConfigs[block.ID] = {};
        this._blockConfigs[block.ID]["x_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "right" : "left";
        this._blockConfigs[block.ID]["y_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "up" : "down";
        this._blockConfigs[block.ID]["speed"] = Math.floor((Math.random() * 2) + 1) / 1.5;
        this._container.addChild(block);
    };
    CameraDemo.prototype._viewPortUpdated = function (event) {
        this._container.width = event.newDimensions.width;
        this._container.height = event.newDimensions.height;
        this._camera.fov = { width: event.newDimensions.width, height: event.newDimensions.height };
        this._camera.renderDimension = { width: event.newDimensions.width, height: event.newDimensions.height };
    };
    CameraDemo.prototype._moveBlocks = function () {
        for (var i in this._blocks) {
            var block = this._blocks[i];
            var x = void 0;
            var y = void 0;
            var x2 = void 0;
            var y2 = void 0;
            if (this._blockConfigs[block.ID]["x_dir"] === "right") {
                x = block.x + this._blockConfigs[block.ID]["speed"];
                x2 = x + block.width;
                if (x2 >= this._container.width) {
                    x = this._container.width - block.width;
                    this._blockConfigs[block.ID]["x_dir"] = "left";
                }
            }
            else if (this._blockConfigs[block.ID]["x_dir"] === "left") {
                x = block.x - this._blockConfigs[block.ID]["speed"];
                x2 = x + block.width;
                if (x <= 0) {
                    x = 0;
                    this._blockConfigs[block.ID]["x_dir"] = "right";
                }
            }
            if (this._blockConfigs[block.ID]["y_dir"] === "down") {
                y = block.y + this._blockConfigs[block.ID]["speed"];
                y2 = y + block.height;
                if (y2 >= this._container.height) {
                    y = this._container.height - block.height;
                    this._blockConfigs[block.ID]["y_dir"] = "up";
                }
            }
            else if (this._blockConfigs[block.ID]["y_dir"] === "up") {
                y = block.y - this._blockConfigs[block.ID]["speed"];
                y2 = y + block.height;
                if (block.y <= 0) {
                    y = 0;
                    this._blockConfigs[block.ID]["y_dir"] = "down";
                }
            }
            block.coordinate = { x: x, y: y };
        }
        if (!this._mouseIsIn && this._blocks.length > 0) {
            var picka = this._blocks[1];
            var fov = this._smallCamera.fov;
            this._smallCamera.viewPoint = { x: picka.x + ((picka.width - fov.width) / 2), y: picka.y + ((picka.height - fov.height) / 2) };
        }
    };
    return CameraDemo;
}(Engine_1.default));
window._CameraDemo = new CameraDemo();
//# sourceMappingURL=App.js.map