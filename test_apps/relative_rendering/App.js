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
var RelativeDemo = (function (_super) {
    __extends(RelativeDemo, _super);
    function RelativeDemo() {
        var _this = _super.call(this) || this;
        _this.viewPort.autoSize = true;
        _this.renderingEngine = new _1.TwoDimensionalRenderingEngine();
        _this.audioEngine = new _2.HTML5AudioEngine();
        _this.logicEngine = new _1.GroupLogicEngine();
        _this._blocks = [];
        _this._blockConfigs = {};
        _this._container = new _3.Entity();
        _this._container.color = { r: 0, g: 0, b: 0 };
        console.log(_this.viewPort.canvas.offsetWidth);
        _this._container.width = 1000;
        _this._container.height = 1000;
        _this._camera = new _4.Camera(_this._container, null, { width: _this._container.width, height: _this._container.height }, null, { height: _this._container.height, width: _this._container.width });
        _this.renderingEngine.addCamera(_this._camera);
        for (var i = 0; i < 50; i++) {
            var block = _this._generateBlock(0, _this._container);
            _this._container.addChild(block);
            var block2 = _this._generateBlock(1, block);
            block.addChild(block2);
            var block21 = _this._generateBlock(2, block2);
            block2.addChild(block21);
            var block22 = _this._generateBlock(2, block2);
            block2.addChild(block22);
            var block3 = _this._generateBlock(1, block);
            block.addChild(block3);
            var block31 = _this._generateBlock(2, block3);
            block3.addChild(block31);
            var block32 = _this._generateBlock(2, block3);
            block3.addChild(block32);
        }
        _this.viewPort.on(_4.ViewPortEventTypes.DIMENSION_UPDATE.toString(), _this._viewPortUpdated.bind(_this));
        _this.logicEngine.addLogic("collision", _this._moveBlocks.bind(_this), 25);
        return _this;
    }
    RelativeDemo.prototype._generateBlock = function (level, parent) {
        var block = new _3.Entity();
        this._blocks.push(block);
        var dimension;
        if (level === 0) {
            dimension = 100;
        }
        else if (level === 1) {
            dimension = 40;
        }
        else if (level === 2) {
            dimension = 15;
        }
        block.width = dimension;
        block.height = dimension;
        block.x = Math.floor((Math.random() * parent.width) + 1);
        block.y = Math.floor((Math.random() * parent.height) + 1);
        block.color = { r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1) };
        this._blockConfigs[block.ID] = {};
        this._blockConfigs[block.ID]["x_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "right" : "left";
        this._blockConfigs[block.ID]["y_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "up" : "down";
        this._blockConfigs[block.ID]["speed"] = Math.floor((Math.random() * 2) + 1) / 1.5;
        return block;
    };
    RelativeDemo.prototype._viewPortUpdated = function (event) {
        this._container.width = event.newDimensions.width;
        this._container.height = event.newDimensions.height;
        this._camera.fov = { width: event.newDimensions.width, height: event.newDimensions.height };
        this._camera.renderDimension = { width: event.newDimensions.width, height: event.newDimensions.height };
    };
    RelativeDemo.prototype._moveBlocks = function () {
        for (var i in this._blocks) {
            var block = this._blocks[i];
            var x = void 0;
            var y = void 0;
            var x2 = void 0;
            var y2 = void 0;
            if (this._blockConfigs[block.ID]["x_dir"] === "right") {
                x = block.x + this._blockConfigs[block.ID]["speed"];
                x2 = x + block.width;
                if (x2 >= block.parent.width) {
                    x = block.parent.width - block.width;
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
                if (y2 >= block.parent.height) {
                    y = block.parent.height - block.height;
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
    };
    return RelativeDemo;
}(Engine_1.default));
window._RelativeDemo = new RelativeDemo();
//# sourceMappingURL=App.js.map