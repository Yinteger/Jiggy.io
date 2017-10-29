import Engine from "../../src/core/src/Engine";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines/src/";
import {HTML5AudioEngine} from "../../src/audio/src/";
import {Entity, GridMap} from "../../src/entities/src/";
import {Iterator, Camera} from "../../src/utils/src/";
import {InputManager, ControllerType, InputEvent, KeyboardEventDetail, KeyCode} from '../../src/inputs/src/';
import {Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState} from "../../src/assets/src/";
import Character from "./Character";
import {EntityEventTypes, LocationUpdateEvent} from "../../src/entities/src/";

class PalletDemo extends Engine {
	private _mapSpritesheet : Spritesheet;
	private _bgMusic : Asset;
	private _characterSpritesheet : Spritesheet;
	public player : Character;

	constructor () {
		super();
		this.viewPort.size = ({width: 500, height: 500});
		this.renderingEngine = new TwoDimensionalRenderingEngine();
		this.audioEngine = new HTML5AudioEngine();
		this.logicEngine = new GroupLogicEngine();

		this.renderingEngine.HUDEntity = (this._createLoadingScreen());
		this._loadResources();
	}

	private _createLoadingScreen () : Entity {
		var textAssetBuilder : TextAssetBuilder = new TextAssetBuilder();

		var hud : Entity = new Entity();
		hud.width = 500;
		hud.height = 500;

		var loadingText : Entity = new Entity();
		loadingText.width = 165;
		loadingText.height = 50;
		loadingText.x = (500 / 2) - 100;
		loadingText.y = (500 / 2) - 25;
		hud.addChild(loadingText);

		var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, "black");
		var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, "black");
		var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, "black");
		var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, "black");

		var loadingAnim : Animation = new Animation(loadingText, [
			{'asset': loading0,'delay': 250},
			{'asset': loading1, 'delay': 250},
			{'asset': loading2, 'delay': 250},
			{'asset': loading3, 'delay': 250}
		]);

		loadingAnim.start();


		return hud;
	}

	private _createMainMap () : Entity {
		var mapContainer : Entity = new Entity();

		var layer1 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer2 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer3 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});

		mapContainer.width = layer1.width;
		mapContainer.height = layer1.height;

		mapContainer.addChild(layer1);		
		mapContainer.addChild(layer2);		
		mapContainer.addChild(layer3);

		//TODO: Framework Level Data Driven Map Generation

		//Set Grass Trails & Background Tiles
		var layer1Iterator : Iterator = layer1.iterator();
		while(layer1Iterator.hasNext()) {
			var tile : Entity = layer1Iterator.next();
			tile.texture = (this._mapSpritesheet.getSprite('grass'));
		}

		layer3.getTile({x:10, y: 10}).texture = this._mapSpritesheet.getSprite('house_1_roof_11');
		layer3.getTile({x:11, y: 10}).texture = this._mapSpritesheet.getSprite('house_1_roof_12');
		layer3.getTile({x:12, y: 10}).texture = this._mapSpritesheet.getSprite('house_1_roof_13');

		layer2.getTile({x:10, y: 11}).texture = this._mapSpritesheet.getSprite('house_1_roof_21');
		layer2.getTile({x:11, y: 11}).texture = this._mapSpritesheet.getSprite('house_1_roof_22');
		layer2.getTile({x:12, y: 11}).texture = this._mapSpritesheet.getSprite('house_1_roof_23');

		layer2.getTile({x:10, y: 11}).collisionable = true;
		layer2.getTile({x:11, y: 11}).collisionable = true;
		layer2.getTile({x:12, y: 11}).collisionable = true;

		layer2.getTile({x:10, y: 12}).texture = this._mapSpritesheet.getSprite('house_1_roof_31');
		layer2.getTile({x:11, y: 12}).texture = this._mapSpritesheet.getSprite('house_1_roof_32');
		layer2.getTile({x:12, y: 12}).texture = this._mapSpritesheet.getSprite('house_1_roof_33');

		layer2.getTile({x:10, y: 12}).collisionable = true;
		layer2.getTile({x:11, y: 12}).collisionable = true;
		layer2.getTile({x:12, y: 12}).collisionable = true;

		layer2.getTile({x:10, y: 13}).texture = this._mapSpritesheet.getSprite('house_1_roof_41');
		layer2.getTile({x:11, y: 13}).texture = this._mapSpritesheet.getSprite('house_1_roof_42');
		layer2.getTile({x:12, y: 13}).texture = this._mapSpritesheet.getSprite('house_1_roof_43');

		layer2.getTile({x:10, y: 13}).collisionable = true;
		layer2.getTile({x:11, y: 13}).collisionable = true;
		layer2.getTile({x:12, y: 13}).collisionable = true;

		return mapContainer;
	}

	private _loadResources () : void {
		this._loadMapSpritesheet();
		this._loadBackgroundMusic();
		this._loadCharacterSpritesheet();
	}

	private _resourceLoaded () : void {
		if (this._mapSpritesheet && this._bgMusic && this._characterSpritesheet) {
			console.log("Resources all loaded");

			//Artifical Delay to show loading animation
			setTimeout(() => {
				//Remove Loading Screen
				delete this.renderingEngine.HUDEntity;

				//TODO: Stop Loading Animation

				//Load Map
				var map = this._createMainMap();
				var camera = new Camera(map, null, {width: 250, height: 250}, null, {width: 500, height: 500});
				this.renderingEngine.addCamera(camera);

				this.viewPort.canvas.addEventListener('mousewheel', function (e: MouseWheelEvent) {
					// console.warn(e);
					var fov = camera.fov;
					var viewPoint = camera.viewPoint;
					if (e.wheelDelta > 0) {
						//Mouse wheel went up, zoom in by decreasing FOV
						camera.viewPoint = ({x: viewPoint.x + 5, y: viewPoint.y + 5});
						camera.fov = ({width: fov.width - 10, height: fov.height - 10});
					} else {
						//Zoom out
						camera.viewPoint = ({x: viewPoint.x - 5, y: viewPoint.y - 5});
						camera.fov = ({width: fov.width + 10, height: fov.height + 10});
					}
				});


				//Load Character
				this.player = new Character(this._characterSpritesheet);
				this.player.texture = this._characterSpritesheet.getSprite("player_down");
				let layer = <GridMap> map.getChildAt(1);	
				let tile = layer.getTile({x: 5, y: 5})
				layer.addChild(this.player);
				this.player.tileX = 5;
				this.player.tileY = 5;
				this.player.x = tile.x;
				this.player.y = tile.y - this.player.height - tile.height;

				this.player.on(EntityEventTypes.LOCATION_UPDATE.toString(), () => {
					var fov = camera.fov;
					camera.viewPoint = {x: this.player.x + ((this.player.width - fov.width) / 2), y: this.player.y + ((this.player.height - fov.height) / 2)};
				});

				//Load NPC's

				//Play Background Music
				this.audioEngine.addAudio('bg', this._bgMusic);
				this.audioEngine.loopAudio('bg', true);
				this.audioEngine.playAudio('bg');

				//Enable Input
				//Add Inputs to move Character around

				var direction: string = null;
				this.logicEngine.addLogic('moveLogic', () => {
					switch(direction) {
						case 'left':
							this.player.moveLeft();
							break;
						case 'up':
							this.player.moveUp();
							break;
						case 'down':
							this.player.moveDown();
							break;
						case 'right':
							this.player.moveRight();
							break;
					}
				}, 1);

				var inputManager: InputManager = InputManager.getSingleton();
				inputManager.createController('player', ControllerType.KEYBOARD);
				inputManager.on(InputEvent.BUTTON_DOWN.toString(), (data: KeyboardEventDetail) => {
					switch(data.keyCode) {
						case KeyCode.W:
							direction = 'up';
							break;
						case KeyCode.A:
							direction = 'left';
							break;
						case KeyCode.S:
							direction = 'down';
							break;
						case KeyCode.D:
							direction = 'right';
							break;
					}
				});
				inputManager.on(InputEvent.BUTTON_UP.toString(), (data: KeyboardEventDetail) => {
					switch(data.keyCode) {
						case KeyCode.W:
						case KeyCode.A:
						case KeyCode.S:
						case KeyCode.D:
							direction = null;
							break;
					}
				});
			}, 1000);			
		}
	}

	private _loadMapSpritesheet () : void {
		var map_asset : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'Resources/61816.png');

		map_asset.onStateChange = (state : AssetState) => {
			if (state === AssetState.LOADED) {
				this._mapSpritesheet =  new Spritesheet(map_asset, 
				{
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
				}});
				this._resourceLoaded();
			}
		}

		map_asset.load();
	}

	private _loadCharacterSpritesheet () : void {
		var character_spritesheet : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'Resources/3698.png');

		character_spritesheet.onStateChange = (state : AssetState) => {
			if (state === AssetState.LOADED) {
				this._characterSpritesheet = new Spritesheet(character_spritesheet, {
				"player_up": {x: 21, y: 10, width: 14, height: 20},
				"player_up_step1": {x: 66, y: 10, width: 14, height: 20},
				"player_up_step2": {x: 66, y: 10, width: 14, height: 20, "flipX": true},
				"player_left": {x: 36, y: 10, width: 14, height: 20},
				"player_left_step1": {x: 81, y: 10, width: 14, height: 20},
				"player_left_step2": {x: 95, y: 10, width: 14, height: 20},
				"player_right": {x: 36, y: 10, width: 14, height: 20, "flipX": true},
				"player_right_step1": {x: 81, y: 10, width: 14, height: 20, "flipX": true},
				"player_right_step2": {x: 95, y: 10, width: 14, height: 20, "flipX": true},
				"player_down": {x: 6, y: 10, width: 14, height: 20},
				"player_down_step1": {x: 51, y: 10, width: 14, height: 20},
				"player_down_step2": {x: 51, y: 10, width: 14, height: 20, "flipX": true}
				});

				this._resourceLoaded();
			}
		}

		character_spritesheet.load();
	}

	private _loadBackgroundMusic () : void {
		var bg_music : Asset = AssetFactory.getSingleton().build(AssetType.AUDIO,  'Resources/music.mp3');

		bg_music.onStateChange = (state: AssetState) => {
			if (state === AssetState.LOADED) {
				this._bgMusic  = bg_music;
				this._resourceLoaded();
			}
		}

		bg_music.load();
	}
}

(<any>window)._PalletDemo = new PalletDemo();
