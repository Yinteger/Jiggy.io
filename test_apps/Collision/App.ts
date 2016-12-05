import Engine from "../../src/Engine";
import {TwoDRenderingEngine, GroupLogicEngine} from "../../src/Engines";
import {HTML5AudioEngine} from "../../src/Audio";
import {Entity, GridMap, LocationUpdateEvent} from "../../src/Entities";
import {Iterator, Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter} from "../../src/Utils";
import {InputManager, ControllerType, InputEvent, KeyboardEventDetail, KeyCode} from '../../src/Inputs';
import {Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState} from "../../src/Assets";

class CollisionDemo extends Engine {
	private _minDimension : number;
	private _maxDimension : number;
	private _blocks : Entity[];
	private _blockConfigs : {[key: string] : {[key: string]: any}};
	private _container : Entity;
	private _collisionEmitter : CollisionEmitter;
	private _lastCollision : Entity;
	private _camera : Camera;

	constructor () {
		super();
		this.viewPort.autoSize = true;
		this.renderingEngine = new TwoDRenderingEngine();
		this.audioEngine = new HTML5AudioEngine();
		this.logicEngine = new GroupLogicEngine();
		this._collisionEmitter = new CollisionEmitter();

		this._minDimension = 5;
		this._maxDimension = 15;
		this._blocks = [];
		this._blockConfigs = {};

		this._container = new Entity();
		this._container.color = {r: 0, g: 0, b: 0};
		console.log(this.viewPort.canvas.offsetWidth);
		this._container.width = 1000;
		this._container.height = 1000;;

		this._camera = new Camera(this._container, null, {width: this._container.width, height: this._container.height}, null, {height: this._container.height, width: this._container.width});
		this.renderingEngine.addCamera(this._camera);

		for (var i : number = 0; i < 750; i ++) {
			this._generateBlock();
		}

		this.viewPort.on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
		this._collisionEmitter.addCollisionListener(this._blockCollision.bind(this));
		this.logicEngine.addLogic("collision", this._moveBlocks.bind(this), 25);
	}

	private _generateBlock () : void {
		var block : Entity = new Entity();
		this._blocks.push(block);
		this._collisionEmitter.addEntity(block);

		let dimension = (Math.random() * this._maxDimension) + this._minDimension;
		block.width = dimension;
		block.height = dimension;

		block.x = Math.floor((Math.random() * this._container.width) + 1);
		block.y = Math.floor((Math.random() * this._container.height) + 1);

		var collision : Entity[] = this._container.findChildren({x: block.x, y: block.y}, {x: block.x2, y: block.y2});

		while (collision.length > 0) {
			block.y = (Math.floor((Math.random()*this._container.height)+1));
			block.x = (Math.floor((Math.random()*this._container.width)+1));
			collision = this._container.findChildren({x: block.x, y: block.y}, {x: block.x2, y: block.y2});
		}

		block.color = {r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1)};

		this._blockConfigs[block.ID] = {};
		this._blockConfigs[block.ID]["x_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "right" : "left";
		this._blockConfigs[block.ID]["y_dir"] = Math.floor((Math.random()*2)+1) === 2 ? "up" : "down";
		this._blockConfigs[block.ID]["speed"] = Math.floor((Math.random()*2)+1) / 1.5;

		this._container.addChild(block);
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

				if (x2 >= this._container.width) {
					x = this._container.width - block.width;
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

				if (y2 >= this._container.height) {
					y = this._container.height - block.height;
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

	private _blockCollision (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) : void {
		// console.log(entity1, entity2, event);

		// entity1.coordinate = event.oldCoordinates;

		let leftDif = entity1.x - entity2.x2;
		if (leftDif < 0) {
			leftDif = leftDif * -1;
		}

		let rightDif = entity1.x2 - entity2.x;
		if (rightDif < 0) {
			rightDif = rightDif * -1;
		}

		let topDif = entity1.y - entity2.y2;
		if (topDif < 0) {
			topDif = topDif * -1;
		}

		let bottomDif = entity1.y2 - entity2.y;
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



		// this._blockConfigs[entity1.ID]["y_dir"] = this._blockConfigs[entity1.ID]["y_dir"] === "up" ?  "down" : "up";
		// this._blockConfigs[entity1.ID]["x_dir"] = this._blockConfigs[entity1.ID]["x_dir"] === "left" ?  "right" : "left";
		//
		// this._blockConfigs[entity2.ID]["y_dir"] = this._blockConfigs[entity2.ID]["y_dir"] === "up" ?  "down" : "up";
		// this._blockConfigs[entity2.ID]["x_dir"] = this._blockConfigs[entity2.ID]["x_dir"] === "left" ?  "right" : "left";

	}

}



declare var window._CollisionDemo : CollisionDemo;
window._CollisionDemo = new CollisionDemo();