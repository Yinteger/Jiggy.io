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
var CollisionDemo = (function (_super) {
    __extends(CollisionDemo, _super);
    function CollisionDemo() {
        var _this = _super.call(this) || this;
        _this.viewPort.autoSize = true;
        _this.renderingEngine = new _1.TwoDimensionalRenderingEngine();
        _this.audioEngine = new _2.HTML5AudioEngine();
        _this.logicEngine = new _1.GroupLogicEngine();
        _this._collisionEmitter = new _4.CollisionEmitter();
        _this._minDimension = 5;
        _this._maxDimension = 15;
        _this._blocks = [];
        _this._blockConfigs = {};
        _this._container = new _3.Entity();
        _this._container.color = { r: 0, g: 0, b: 0 };
        console.log(_this.viewPort.canvas.offsetWidth);
        _this._container.width = 1000;
        _this._container.height = 1000;
        _this._camera = new _4.Camera(_this._container, null, { width: _this._container.width, height: _this._container.height }, null, { height: _this._container.height, width: _this._container.width });
        _this.renderingEngine.addCamera(_this._camera);
        for (var i = 0; i < 750; i++) {
            _this._generateBlock();
        }
        _this.viewPort.on(_4.ViewPortEventTypes.DIMENSION_UPDATE.toString(), _this._viewPortUpdated.bind(_this));
        _this._collisionEmitter.addCollisionListener(_this._blockCollision.bind(_this));
        _this.logicEngine.addLogic("collision", _this._moveBlocks.bind(_this), 25);
        return _this;
    }
    CollisionDemo.prototype._generateBlock = function () {
        var block = new _3.Entity();
        this._blocks.push(block);
        this._collisionEmitter.addEntity(block);
        var dimension = (Math.random() * this._maxDimension) + this._minDimension;
        block.width = dimension;
        block.height = dimension;
        block.x = Math.floor((Math.random() * this._container.width) + 1);
        block.y = Math.floor((Math.random() * this._container.height) + 1);
        var collision = this._container.findChildren({ x: block.x, y: block.y }, { x: block.x2, y: block.y2 });
        while (collision.length > 0) {
            block.y = (Math.floor((Math.random() * this._container.height) + 1));
            block.x = (Math.floor((Math.random() * this._container.width) + 1));
            collision = this._container.findChildren({ x: block.x, y: block.y }, { x: block.x2, y: block.y2 });
        }
        block.color = { r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1) };
        this._blockConfigs[block.ID] = {};
        this._blockConfigs[block.ID]["x_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "right" : "left";
        this._blockConfigs[block.ID]["y_dir"] = Math.floor((Math.random() * 2) + 1) === 2 ? "up" : "down";
        this._blockConfigs[block.ID]["speed"] = Math.floor((Math.random() * 2) + 1) / 1.5;
        this._container.addChild(block);
    };
    CollisionDemo.prototype._viewPortUpdated = function (event) {
        this._container.width = event.newDimensions.width;
        this._container.height = event.newDimensions.height;
        this._camera.fov = { width: event.newDimensions.width, height: event.newDimensions.height };
        this._camera.renderDimension = { width: event.newDimensions.width, height: event.newDimensions.height };
    };
    CollisionDemo.prototype._moveBlocks = function () {
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
    };
    CollisionDemo.prototype._blockCollision = function (entity1, entity2, event) {
        var leftDif = entity1.x - entity2.x2;
        if (leftDif < 0) {
            leftDif = leftDif * -1;
        }
        var rightDif = entity1.x2 - entity2.x;
        if (rightDif < 0) {
            rightDif = rightDif * -1;
        }
        var topDif = entity1.y - entity2.y2;
        if (topDif < 0) {
            topDif = topDif * -1;
        }
        var bottomDif = entity1.y2 - entity2.y;
        if (bottomDif < 0) {
            bottomDif = bottomDif * -1;
        }
        if (leftDif <= rightDif && leftDif <= topDif && leftDif <= bottomDif) {
            this._blockConfigs[entity1.ID]["x_dir"] = "right";
            this._blockConfigs[entity2.ID]["x_dir"] = "left";
            entity1.x = entity2.x2;
        }
        if (rightDif <= leftDif && rightDif <= topDif && rightDif <= bottomDif) {
            this._blockConfigs[entity1.ID]["x_dir"] = "left";
            this._blockConfigs[entity2.ID]["x_dir"] = "right";
            entity1.x = (entity2.x - entity1.width);
        }
        if (topDif <= bottomDif && topDif <= leftDif && topDif <= rightDif) {
            this._blockConfigs[entity1.ID]["y_dir"] = "down";
            this._blockConfigs[entity2.ID]["y_dir"] = "up";
            entity1.y = entity2.y2;
        }
        if (bottomDif <= topDif && bottomDif <= leftDif && bottomDif <= rightDif) {
            this._blockConfigs[entity1.ID]["y_dir"] = "up";
            this._blockConfigs[entity2.ID]["y_dir"] = "down";
            entity1.y = (entity2.y - entity1.height);
        }
    };
    return CollisionDemo;
}(Engine_1.default));
window.CollisionDemo = new CollisionDemo();
//# sourceMappingURL=App.js.map