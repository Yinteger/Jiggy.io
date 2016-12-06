import Engine from "../../src/Engine";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines/";
import {HTML5AudioEngine} from "../../src/audio/";
import {Entity, LocationUpdateEvent} from "../../src/entities/";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter} from "../../src/utils/";

class RelativeDemo extends Engine {
    private _blocks : Entity[];
    private _blockConfigs : {[key: string] : {[key: string]: any}};
    private _container : Entity;
    private _collisionEmitter : CollisionEmitter;
    private _camera : Camera;

    constructor () {
        super();
        this.viewPort.autoSize = true;
        this.renderingEngine = new TwoDimensionalRenderingEngine();
        this.audioEngine = new HTML5AudioEngine();
        this.logicEngine = new GroupLogicEngine();
        // this._collisionEmitter = new CollisionEmitter();

        this._blocks = [];
        this._blockConfigs = {};

        this._container = new Entity();
        this._container.color = {r: 0, g: 0, b: 0};
        console.log(this.viewPort.canvas.offsetWidth);
        this._container.width = 1000;
        this._container.height = 1000;

        this._camera = new Camera(this._container, null, {width: this._container.width, height: this._container.height}, null, {height: this._container.height, width: this._container.width});
        this.renderingEngine.addCamera(this._camera);

        for (var i : number = 0; i < 50; i ++) {
            var block = this._generateBlock(0, this._container);
            this._container.addChild(block);

            var block2 = this._generateBlock(1, block);
            block.addChild(block2);

            var block21 = this._generateBlock(2, block2);
            block2.addChild(block21);

            var block22 = this._generateBlock(2, block2);
            block2.addChild(block22);

            var block3 = this._generateBlock(1, block);
            block.addChild(block3);

            var block31 = this._generateBlock(2, block3);
            block3.addChild(block31);

            var block32 = this._generateBlock(2, block3);
            block3.addChild(block32);
        }

        this.viewPort.on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        // this._collisionEmitter.addCollisionListener(this._blockCollision.bind(this));
        this.logicEngine.addLogic("collision", this._moveBlocks.bind(this), 25);
    }

    private _generateBlock (level: number, parent:Entity) : Entity {
        var block : Entity = new Entity();
        this._blocks.push(block);

        let dimension : number;
        if (level === 0) {
            dimension = 100;
        } else if (level === 1) {
            dimension = 40;
        } else if (level === 2) {
            dimension =  15;
        }
        block.width = dimension;
        block.height = dimension;

        block.x = Math.floor((Math.random() * parent.width) + 1);
        block.y = Math.floor((Math.random() * parent.height) + 1);

        block.color = {r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1)};

        this._blockConfigs[block.ID] = {};
        this._blockConfigs[block.ID]["x_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "right" : "left";
        this._blockConfigs[block.ID]["y_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "up" : "down";
        this._blockConfigs[block.ID]["speed"] = Math.floor((Math.random()*2)+1) / 1.5;

        // this._container.addChild(block);
        return block;
    }

    private _viewPortUpdated (event: DimensionUpdateEvent) : void {
        this._container.width = event.newDimensions.width;
        this._container.height = event.newDimensions.height;
        this._camera.fov = {width: event.newDimensions.width, height: event.newDimensions.height};
        this._camera.renderDimension = {width: event.newDimensions.width, height: event.newDimensions.height};

    }

    private _moveBlocks () : void {
        for (var i in this._blocks) {
            let block = this._blocks[i];
            let x : number;
            let y : number;
            let x2 : number;
            let y2 : number;

            if (this._blockConfigs[block.ID]["x_dir"] === "right") {
                x = block.x + this._blockConfigs[block.ID]["speed"];
                x2 = x + block.width;

                if (x2 >= block.parent.width) {
                    x = block.parent.width - block.width;
                    this._blockConfigs[block.ID]["x_dir"] = "left";
                }
            } else if (this._blockConfigs[block.ID]["x_dir"] === "left") {
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
            } else if (this._blockConfigs[block.ID]["y_dir"] === "up") {
                y = block.y - this._blockConfigs[block.ID]["speed"];
                y2 = y + block.height;

                if (block.y <= 0) {
                    y = 0;
                    this._blockConfigs[block.ID]["y_dir"] = "down";
                }
            }

            block.coordinate = {x, y};
        }
    }
}



declare var window._RelativeDemo : RelativeDemo;
window._RelativeDemo = new RelativeDemo();