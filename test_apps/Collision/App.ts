import {Engine} from "../../src/core";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines";
import {HTML5AudioEngine} from "../../src/audio";
import {Entity, LocationUpdateEvent} from "../../src/entities";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, Coordinate} from "../../src/utils";
import {Asset, AssetState, AssetFactory, AssetType} from "../../src/assets";

class CollisionDemo extends Engine {
	private _minDimension : number;
	private _maxDimension : number;
	private _blocks : Entity[];
	private _blockConfigs : {[key: string] : {[key: string]: any}};
	private _container : Entity;
	private _collisionEmitter : CollisionEmitter;
	private _camera : Camera;

	constructor () {
		super();
		this.setRenderingEngine(new TwoDimensionalRenderingEngine());
		// this.setAudioEngine = new HTML5AudioEngine();
		this.setLogicEngine(new GroupLogicEngine());
		this._collisionEmitter = new CollisionEmitter();

		this._minDimension = 5;
		this._maxDimension = 15;
		this._blocks = [];
		this._blockConfigs = {};

		this._container = new Entity();
		this._container.setColor(new Color(0,0,0));
		this._container.setWidth(1000);
		this._container.setHeight(1000);

		this._camera = new Camera(this._container, null, {width: this._container.getWidth(), height: this._container.getHeight()}, null, {height: this._container.getHeight(), width: this._container.getWidth()});
		this.getRenderingEngine().addCamera(this._camera);

		for (var i : number = 0; i < 750; i ++) {
			this._generateBlock();
		}

        this.getViewPort().on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        this.getViewPort().fillPage(true);
    
		this._collisionEmitter.addCollisionListener(this._blockCollision.bind(this));
		this.getLogicEngine().addLogic("collision", this._moveBlocks.bind(this), 25);
	}

	private _generateBlock () : void {
		var block : Entity = new Entity();
		this._blocks.push(block);
		this._collisionEmitter.addEntity(block);

		let dimension = (Math.random() * this._maxDimension) + this._minDimension;
		block.setWidth(dimension);
		block.setHeight(dimension);

		block.setX(Math.floor((Math.random() * this._container.getWidth()) + 1));
		block.setY(Math.floor((Math.random() * this._container.getHeight()) + 1));

		var collision : Entity[] = this._container.findChildren(new Coordinate(block.getX(), block.getY()), new Coordinate(block.getX2(), block.getY2()));

		while (collision.length > 0) {
			block.setY(Math.floor((Math.random()*this._container.getHeight())+1));
			block.setX(Math.floor((Math.random()*this._container.getWidth())+1));
			collision = this._container.findChildren(new Coordinate(block.getX(), block.getY()), new Coordinate(block.getX2(), block.getY2()));
		}

		block.setColor(new Color(Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)));

		this._blockConfigs[block.getID()] = {};
		this._blockConfigs[block.getID()]["x_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "right" : "left";
		this._blockConfigs[block.getID()]["y_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "up" : "down";
		this._blockConfigs[block.getID()]["speed"] = Math.floor((Math.random()*2)+1) / 1.5;

		this._container.addChild(block);
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

				if (x2 >= this._container.getWidth()) {
					x = this._container.getWidth() - block.getWidth();
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

				if (y2 >= this._container.getHeight()) {
					y = this._container.getHeight() - block.getHeight();
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

	private _blockCollision (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) : void {
		let leftDif = entity1.getX() - entity2.getX2();
		if (leftDif < 0) {
			leftDif = leftDif * -1;
		}

		let rightDif = entity1.getX2() - entity2.getX();
		if (rightDif < 0) {
			rightDif = rightDif * -1;
		}

		let topDif = entity1.getY() - entity2.getY2();
		if (topDif < 0) {
			topDif = topDif * -1;
		}

		let bottomDif = entity1.getY2() - entity2.getY();
		if (bottomDif < 0) {
			bottomDif = bottomDif * -1;
		}

		if (leftDif <= rightDif && leftDif <= topDif && leftDif <= bottomDif) {
			this._blockConfigs[entity1.getID()]["x_dir"] = "right";
			this._blockConfigs[entity2.getID()]["x_dir"] = "left";
			entity1.setX(entity2.getX2());
		}

		if (rightDif <= leftDif && rightDif <= topDif && rightDif <= bottomDif) {
			this._blockConfigs[entity1.getID()]["x_dir"] = "left";
			this._blockConfigs[entity2.getID()]["x_dir"] = "right";
			entity1.setX(entity2.getX() - entity1.getWidth());
		}

		if (topDif <= bottomDif && topDif <= leftDif && topDif <= rightDif) {
			this._blockConfigs[entity1.getID()]["y_dir"] = "down";
			this._blockConfigs[entity2.getID()]["y_dir"] = "up";
			entity1.setY(entity2.getY2());
		}

		if (bottomDif <= topDif && bottomDif <= leftDif && bottomDif <= rightDif) {
			this._blockConfigs[entity1.getID()]["y_dir"] = "up";
			this._blockConfigs[entity2.getID()]["y_dir"] = "down";
			entity1.setY((entity2.getY() - entity1.getHeight()));
		}
	}

}

(<any>window).CollisionDemo = new CollisionDemo();
