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
var _1 = require("../../src/entities/");
var _2 = require("../../src/assets/");
var Engine_1 = require("../../src/Engine");
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
//# sourceMappingURL=Character.js.map