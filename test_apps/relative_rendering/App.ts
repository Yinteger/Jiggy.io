import {Engine} from "../../src/core";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines";
import {HTML5AudioEngine} from "../../src/audio";
import {Entity, LocationUpdateEvent} from "../../src/entities";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, ColorCode, Coordinate} from "../../src/utils";
import {Asset, AssetState, AssetFactory, AssetType} from "../../src/assets";

class RelativeDemo extends Engine {
    private _blocks : Entity[];
    private _blockConfigs : {[key: string] : {[key: string]: any}};
    private _container : Entity;
    private _collisionEmitter : CollisionEmitter;
    private _camera : Camera;

    constructor () {
        super();
        this.setRenderingEngine(new TwoDimensionalRenderingEngine());
        // this.audioEngine = new HTML5AudioEngine();
        this.setLogicEngine(new GroupLogicEngine());
        // this._collisionEmitter = new CollisionEmitter();

        this._blocks = [];
        this._blockConfigs = {};

        this._container = new Entity();

        this._container.setColor(Color.fromColorCode(ColorCode.BLACK));
        this._container.setWidth(1000);
        this._container.setHeight(1000);

        this._camera = new Camera(this._container, null, {width: this._container.getWidth(), height: this._container.getHeight()}, null, {height: this._container.getHeight(), width: this._container.getWidth()});
        this.getRenderingEngine().addCamera(this._camera);

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

        this.getViewPort().on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        this.getViewPort().fillPage(true);
        // this._collisionEmitter.addCollisionListener(this._blockCollision.bind(this));
        this.getLogicEngine().addLogic("collision", this._moveBlocks.bind(this), 25);
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
        block.setWidth(dimension);
        block.setHeight(dimension);

        block.setX(Math.floor((Math.random() * parent.getWidth()) + 1));
        block.setY(Math.floor((Math.random() * parent.getHeight()) + 1));

        block.setColor(new Color(Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)));

        this._blockConfigs[block.getID()] = {};
        this._blockConfigs[block.getID()]["x_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "right" : "left";
        this._blockConfigs[block.getID()]["y_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "up" : "down";
        this._blockConfigs[block.getID()]["speed"] = Math.floor((Math.random()*2)+1) / 1.5;

        // this._container.addChild(block);
        return block;
    }

    private _viewPortUpdated (event: DimensionUpdateEvent) : void {
        this._container.setWidth(event.newDimensions.width);
        this._container.setHeight(event.newDimensions.height);
        this._camera.setFOV({width: event.newDimensions.width, height: event.newDimensions.height});
        this._camera.setRenderDimension({width: event.newDimensions.width, height: event.newDimensions.height});

    }

    private _moveBlocks () : void {
        for (var i in this._blocks) {
            let block = this._blocks[i];
            let x : number;
            let y : number;
            let x2 : number;
            let y2 : number;

            if (this._blockConfigs[block.getID()]["x_dir"] === "right") {
                x = block.getX() + this._blockConfigs[block.getID()]["speed"];
                x2 = x + block.getWidth();

                if (x2 >= block.getParent().getWidth()) {
                    x = block.getParent().getWidth() - block.getWidth();
                    this._blockConfigs[block.getID()]["x_dir"] = "left";
                }
            } else if (this._blockConfigs[block.getID()]["x_dir"] === "left") {
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

                if (y2 >= block.getParent().getHeight()) {
                    y = block.getParent().getHeight() - block.getHeight();
                    this._blockConfigs[block.getID()]["y_dir"] = "up";
                }
            } else if (this._blockConfigs[block.getID()]["y_dir"] === "up") {
                y = block.getY() - this._blockConfigs[block.getID()]["speed"];
                y2 = y + block.getHeight();

                if (block.getY() <= 0) {
                    y = 0;
                    this._blockConfigs[block.getID()]["y_dir"] = "down";
                }
            }

            block.setPosition(new Coordinate(x, y));
        }
    }
}

(<any>window)._RelativeDemo = new RelativeDemo();
