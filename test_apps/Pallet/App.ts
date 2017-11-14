import {Engine} from "../../src/core";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines";
import {HTML5AudioEngine} from "../../src/audio";
import {Entity, GridMap, EntityEventTypes, LocationUpdateEvent} from "../../src/entities";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, Iterator, Coordinate} from "../../src/utils";
import { Asset, AssetState, AssetFactory, AssetType, Animation, TextAssetBuilder, Spritesheet, AssetGroup, AssetGroupLoader, AssetGroupDefinition } from "../../src/assets";
import Character from "./Character";
import {
    Mouse, MouseEvents, MouseMoveEvent, MouseClickEvent, ScrollWheelMove,
    Keyboard, KeyboardEvents, KeyDown, KeyUp, KeyboardKeys,
    GamePadListener, GamePadListenerEvents, GamePad, GamePadEvents, ValueChangeEvent
} from "../../src/inputs";

class PalletDemo extends Engine {
	private _mapSpritesheet : Spritesheet;
	// private _bgMusic : Asset;
	private _characterSpritesheet : Spritesheet;
    public player: Character;
    private _mainCamera: Camera;
	private _direction : String = "";
	private _assetGroup: AssetGroup;

	constructor () {
		super();
		this._assetGroup = new AssetGroup();
        this.getViewPort().setSize({ width: 500, height: 500 });
		this.setRenderingEngine(new TwoDimensionalRenderingEngine());
		this.setLogicEngine(new GroupLogicEngine());

		this.getRenderingEngine().setHUD(this._createLoadingScreen());
		this._loadResources();
	}

	private _createLoadingScreen () : Entity {
		var textAssetBuilder : TextAssetBuilder = new TextAssetBuilder();

		var hud : Entity = new Entity();
		hud.setWidth(500);
		hud.setHeight(500);

		var loadingText : Entity = new Entity();
		loadingText.setWidth(165);
		loadingText.setHeight(50);
		loadingText.setX((500 / 2) - 100);
		loadingText.setY((500 / 2) - 25);
		hud.addChild(loadingText);

		var blackColor = Color.fromString('black');

		var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, blackColor);
		var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, blackColor);
		var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, blackColor);
		var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, blackColor);

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

		var layer1 : GridMap = new GridMap({width: 16, height: 16}, {x: 15, y: 15});
		var layer2 : GridMap = new GridMap({width: 16, height: 16}, {x: 15, y: 15});
		var layer3 : GridMap = new GridMap({width: 16, height: 16}, {x: 15, y: 15});

		mapContainer.setWidth(layer1.getWidth());
		mapContainer.setHeight(layer1.getHeight());

		mapContainer.addChild(layer1);		
		mapContainer.addChild(layer2);		
		mapContainer.addChild(layer3);

		//TODO: Framework Level Data Driven Map Generation

		// var mapSpritesheet: Asset = this._assetGroup.getAsset('map');

		//Set Grass Trails & Background Tiles
		var layer1Iterator : Iterator<Entity> = layer1.iterator();
		while(layer1Iterator.hasNext()) {
			var tile : Entity = layer1Iterator.next();
			tile.setTexture((this._mapSpritesheet.getSprite('grass')));
		}

		layer3.getTile({x:10, y: 10}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_11'));
		layer3.getTile({x:11, y: 10}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_12'));
		layer3.getTile({x:12, y: 10}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_13'));

		layer2.getTile({x:10, y: 11}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_21'));
		layer2.getTile({x:11, y: 11}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_22'));
		layer2.getTile({x:12, y: 11}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_23'));

		layer2.getTile({x:10, y: 11}).setCollisionable(true);
		layer2.getTile({x:11, y: 11}).setCollisionable(true);
		layer2.getTile({x:12, y: 11}).setCollisionable(true);

		layer2.getTile({x:10, y: 12}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_31'));
		layer2.getTile({x:11, y: 12}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_32'));
		layer2.getTile({x:12, y: 12}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_33'));

		layer2.getTile({x:10, y: 12}).setCollisionable(true);
		layer2.getTile({x:11, y: 12}).setCollisionable(true);
		layer2.getTile({x:12, y: 12}).setCollisionable(true);

		layer2.getTile({x:10, y: 13}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_41'));
		layer2.getTile({x:11, y: 13}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_42'));
		layer2.getTile({x:12, y: 13}).setTexture(this._mapSpritesheet.getSprite('house_1_roof_43'));

		layer2.getTile({x:10, y: 13}).setCollisionable(true);
		layer2.getTile({x:11, y: 13}).setCollisionable(true);
		layer2.getTile({x:12, y: 13}).setCollisionable(true);

		return mapContainer;
	}

	private _loadResources () : void {
		
		// This is the manual way.
		// var map_asset : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'Resources/61816.png');
		// this._assetGroup.addAsset('map', map_asset);

		// var bg_music : Asset = AssetFactory.getSingleton().build(AssetType.AUDIO,  'Resources/music.mp3');
		// this._assetGroup.addAsset('bgMusic', bg_music);

		// var character_spritesheet : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'Resources/3698.png');
		// this._assetGroup.addAsset('character', character_spritesheet);

		// this._assetGroup.load().then(() => {
		// 	this._loadMapSpritesheet();
		// 	this._loadBackgroundMusic();
		// 	this._loadCharacterSpritesheet();
		// 	this._resourceLoaded();
		// });

		// This is data-driven way
		var assetGroupLoader: AssetGroupLoader = new AssetGroupLoader();
		// assetGroupLoader.load('./resources.json').then((ag: AssetGroup) => {
		// 	this._assetGroup = ag;
		// 	return this._assetGroup.load();
		// }).then(() => {
		// 	this._loadMapSpritesheet();
		// 	this._loadBackgroundMusic();
		// 	this._loadCharacterSpritesheet();
		// 	this._resourceLoaded();	
		// }).catch((error) => {
		// 	console.error(error);
		// });

		// Or from memory (resources is the already loaded JSON file)
		// this._assetGroup = assetGroupLoader.loadFromMemory(resources);
		// this._assetGroup.load().then(() => {
		// 	this._loadMapSpritesheet();
		// 	this._loadBackgroundMusic();
		// 	this._loadCharacterSpritesheet();
		// 	this._resourceLoaded();	
		// }).catch((error) => {
		// 	console.log(error);
		// });

		// Or from code-splitted bundle
		require.ensure(['./resources.ts'], (require) => {
			var resources: AssetGroupDefinition = require('./resources.ts');
			console.log(resources);
			this._assetGroup = assetGroupLoader.loadFromMemory(resources);
			this._assetGroup.load().then(() => {
				this._loadMapSpritesheet();
				this._loadBackgroundMusic();
				this._loadCharacterSpritesheet();
				this._resourceLoaded();
			});
		});
	}

	private _resourceLoaded () : void {
		// if (this._mapSpritesheet && this._bgMusic && this._characterSpritesheet) {
			console.log("Resources all loaded");

			//Artifical Delay to show loading animation
			setTimeout(() => {
				//Remove Loading Screen
				this.getRenderingEngine().setHUD(null);

				//TODO: Stop Loading Animation

				//Load Map
				var map = this._createMainMap();
                var camera = new Camera(map, null, { width: 250, height: 250 }, null, { width: 500, height: 500 });
                this._mainCamera = camera;
                this.getRenderingEngine().addCamera(camera);
                var mouse = Mouse.getInstance();

				mouse.on(MouseEvents.ScrollWheelMove, (e: ScrollWheelMove) => {
					var fov = camera.getFOV();
					var viewPoint = camera.getViewPoint();
					if (e.yDelta > 0) {
						//Mouse wheel went up, zoom in by decreasing FOV
						camera.setViewPoint(new Coordinate(viewPoint.getX() + 5, viewPoint.getY() + 5));
						camera.setFOV({width: fov.width - 10, height: fov.height - 10});
					} else {
						//Zoom out
						camera.setViewPoint(new Coordinate(viewPoint.getX() - 5, viewPoint.getY() - 5));
						camera.setFOV({width: fov.width + 10, height: fov.height + 10});
					}
                });

				//Load Character
				this.player = new Character(this._characterSpritesheet);
				this.player.setTexture(this._characterSpritesheet.getSprite("player_down"));
				let layer = <GridMap> map.getChildAt(1);	
				let tile = layer.getTile({x: 5, y: 5})
				layer.addChild(this.player);
				this.player.tileX = 5;
				this.player.tileY = 5;
				this.player.setX(tile.getX());
				this.player.setY(tile.getY() - this.player.getHeight() - tile.getHeight());

				var pokeball = new Entity();
				pokeball.setWidth(25);
				pokeball.setHeight(25);
				// layer.addChild(pokeball);
				var pokeball_asset : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'Resources/pokeball.png');

				pokeball_asset.onStateChange = (state : AssetState) => {
					if (state === AssetState.LOADED) {
						pokeball.setTexture(pokeball_asset);
						this.getRenderingEngine().setHUD(pokeball);
					}
				};

				pokeball_asset.load();


				mouse.on(MouseEvents.MouseMove, (e: MouseMoveEvent) => {
					pokeball.setX(e.x - this.getRenderingEngine().getViewPort().getCanvas().offsetLeft - 14);
					pokeball.setY(e.y - this.getRenderingEngine().getViewPort().getCanvas().offsetTop - 14);
                });

                mouse.on(MouseEvents.LeftButtonDown, (e: MouseClickEvent) => {
                    var newPokeball = new Entity();
                    console.log(e);
                    console.log(camera);
                    var x_fov = camera.getFOV().width / camera.getRenderDimension().width;
                    var y_fov = camera.getFOV().height / camera.getRenderDimension().height;
                    newPokeball.setWidth(25 * x_fov);
                    newPokeball.setHeight(25 * y_fov);
                    //23 is a magic number, this demo seems to be rendering at an offset...
                    newPokeball.setX(camera.getViewPoint().getX() + ((e.x * x_fov) - (23 * x_fov)));
                    newPokeball.setY(camera.getViewPoint().getY() + ((e.y * y_fov) - (23 * y_fov)));
                    newPokeball.setTexture(pokeball_asset);
                    layer.addChild(newPokeball);
                });

                mouse.on(MouseEvents.RightButtonDown, (e: MouseClickEvent) => {
                    alert("YOU SHALL NOT PASS");
                });

				this.player.on(EntityEventTypes.LOCATION_UPDATE.toString(), () => {
					var fov = camera.getFOV();
					camera.setViewPoint(new Coordinate(this.player.getX() + ((this.player.getWidth() - fov.width) / 2), this.player.getY() + ((this.player.getHeight() - fov.height) / 2)));
				});

				//Load NPC's

				//Play Background Music
				this.getAudioEngine().addAudio('bg', this._assetGroup.getAsset('bgMusic'));
				this.getAudioEngine().loopAudio('bg', true);
				this.getAudioEngine().playAudio('bg');

				//Enable Input
				//Add Inputs to move Character around

				//var direction: string = null;
				this.getLogicEngine().addLogic('moveLogic', () => {
					switch(this._direction) {
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

                this.getLogicEngine().addLogic('pokeballLogic', () => {
                    if (mouse.isLeftButtonClicked()) {
                        var newPokeball = new Entity();
                        var x_fov = camera.getFOV().width / camera.getRenderDimension().width;
                        var y_fov = camera.getFOV().height / camera.getRenderDimension().height;
                        newPokeball.setWidth(25 * x_fov);
                        newPokeball.setHeight(25 * y_fov);
                        var mouseCoordinates = mouse.getCurrentCoordinates();
                        //23 is a magic number, this demo seems to be rendering at an offset...
                        newPokeball.setX(camera.getViewPoint().getX() + ((mouseCoordinates.x * x_fov) - (23 * x_fov)));
                        newPokeball.setY(camera.getViewPoint().getY() + ((mouseCoordinates.y * y_fov) - (23 * y_fov)));
                        newPokeball.setTexture(pokeball_asset);
                        layer.addChild(newPokeball);
                    }
                }, 50);

                let gamepadListener: GamePadListener = GamePadListener.getInstance();
                if (gamepadListener.hasGamePads()) {
                    //Grab First GamePad
                    console.log("GamePadConnected");
                    var gamePads: GamePad[] = gamepadListener.getGamePads();
                    gamePads.forEach((gamePad: GamePad) => {
                        this.attachGamepad(gamePad);
                    });
                }

                //Listen for GamePad Connections
                gamepadListener.on(GamePadListenerEvents.GamePadAdded, (gamePad: GamePad) => {
                    console.log("GamePadConnected");
                    this.attachGamepad(gamePad);
                });


                //Global GamePad Disconnect event
                gamepadListener.on(GamePadListenerEvents.GamePadRemoved, (gamePad: GamePad) => {
                    console.log("GameaPad Disconnected");
                });

                var keyboard = Keyboard.getInstance();
				keyboard.on(KeyboardEvents.KeyDown, (e: KeyDown) => {
					switch(e.key) {
                        case KeyboardKeys.W:
                        case KeyboardKeys[0]:
							this._direction = 'up';
							break;
                        case KeyboardKeys.A:
                        case KeyboardKeys[1]:
							this._direction = "left";
							break;
                        case KeyboardKeys.S:
                        case KeyboardKeys[2]:
							this._direction = "down"
							break;
                        case KeyboardKeys.D:
                        case KeyboardKeys[3]:
							this._direction = "right";
							break;
					}
				});

				keyboard.on(KeyboardEvents.KeyUp, (e: KeyUp) => {
					switch(e.key) {
						case KeyboardKeys.W:
						case KeyboardKeys.A:
						case KeyboardKeys.S:
						case KeyboardKeys.D:
							this._direction = null;
							break;
					}
				});
			}, 1000);			
		// }
    }

    private attachGamepad(gamePad: GamePad): void {
        gamePad.on(GamePadEvents.AxisValueChange, (e: ValueChangeEvent) => {
            //console.log("Updating controller movement", gamePad.getAxis(0), gamePad.getAxis(1), axisId, newValue);
            if (gamePad.getAxis(0) < -.1 || gamePad.getAxis(0) > .1) {
                this.player.setX(this.player.getX() + Math.floor(gamePad.getAxis(0) * 10));
            }

            if (gamePad.getAxis(1) < -.1 || gamePad.getAxis(1) > .1) {
                this.player.setY(this.player.getY() + Math.floor(gamePad.getAxis(1) * 10));
            }

            if (gamePad.getAxis(2) < -.1 || gamePad.getAxis(2) > .1) {
                this._mainCamera.getViewPoint().setX(this._mainCamera.getViewPoint().getX() + Math.floor(gamePad.getAxis(2) * 10));
            }

            if (gamePad.getAxis(3) < -.1 || gamePad.getAxis(3) > .1) {
                this._mainCamera.getViewPoint().setY(this._mainCamera.getViewPoint().getY() + Math.floor(gamePad.getAxis(3) * 10));
            }
        });

        gamePad.on(GamePadEvents.ButtonValueChange, (e: ValueChangeEvent) => {
            var buttonId = e.id;
            var newValue = e.value;
            console.log(buttonId);
            console.log(newValue);
            if (buttonId === 12) {
                if (newValue === 0 && this._direction === "up") {
                    this._direction = "";
                } else {
                    this._direction = "up";
                }
            }

            if (buttonId === 13) {
                if (newValue === 0 && this._direction === "down") {
                    this._direction = "";
                } else {
                    this._direction = "down";
                }
            }

            if (buttonId === 14) {
                if (newValue === 0 && this._direction === "left") {
                    this._direction = "";
                } else {
                    this._direction = "left";
                }
            }

            if (buttonId === 15) {
                if (newValue === 0 && this._direction === "right") {
                    this._direction = "";
                } else {
                    this._direction = "right";
                }
            }
        });
    }

    private detachGamePad(gamepad: GamePad): void {
        //Don't need to do anything really...Destroy the anon func maybe for performance...
    }

	private _loadMapSpritesheet () : void {
		var map_asset: Asset = this._assetGroup.getAsset('map');

		this._mapSpritesheet =  new Spritesheet(map_asset, {
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

		// var map_asset : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'Resources/61816.png');

		// map_asset.onStateChange = (state : AssetState) => {
		// 	if (state === AssetState.LOADED) {
		// 		this._mapSpritesheet =  new Spritesheet(map_asset, 
		// 		{
		// 		"grass": {
		// 			x: 16,
		// 			y: 0,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_11": {
		// 			x: 0,
		// 			y: 16,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_12": {
		// 			x: 16,
		// 			y: 16,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_13": {
		// 			x: 32,
		// 			y: 16,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_21": {
		// 			x: 0,
		// 			y: 32,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_22": {
		// 			x: 16,
		// 			y: 32,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_23": {
		// 			x: 32,
		// 			y: 32,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_31": {
		// 			x: 0,
		// 			y: 48,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_32": {
		// 			x: 16,
		// 			y: 48,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_33": {
		// 			x: 32,
		// 			y: 48,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_41": {
		// 			x: 0,
		// 			y: 64,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_42": {
		// 			x: 16,
		// 			y: 64,
		// 			width: 16,
		// 			height: 16
		// 		},
		// 		"house_1_roof_43": {
		// 			x: 32,
		// 			y: 64,
		// 			width: 16,
		// 			height: 16
		// 		}});
		// 		this._resourceLoaded();
		// 	}
		// }

		// map_asset.load();
	}

	private _loadCharacterSpritesheet () : void {
		var character_spritesheet: Asset = this._assetGroup.getAsset('character');

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

		// var character_spritesheet : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'Resources/3698.png');

		// character_spritesheet.onStateChange = (state : AssetState) => {
		// 	if (state === AssetState.LOADED) {
		// 		this._characterSpritesheet = new Spritesheet(character_spritesheet, {
		// 		"player_up": {x: 21, y: 10, width: 14, height: 20},
		// 		"player_up_step1": {x: 66, y: 10, width: 14, height: 20},
		// 		"player_up_step2": {x: 66, y: 10, width: 14, height: 20, "flipX": true},
		// 		"player_left": {x: 36, y: 10, width: 14, height: 20},
		// 		"player_left_step1": {x: 81, y: 10, width: 14, height: 20},
		// 		"player_left_step2": {x: 95, y: 10, width: 14, height: 20},
		// 		"player_right": {x: 36, y: 10, width: 14, height: 20, "flipX": true},
		// 		"player_right_step1": {x: 81, y: 10, width: 14, height: 20, "flipX": true},
		// 		"player_right_step2": {x: 95, y: 10, width: 14, height: 20, "flipX": true},
		// 		"player_down": {x: 6, y: 10, width: 14, height: 20},
		// 		"player_down_step1": {x: 51, y: 10, width: 14, height: 20},
		// 		"player_down_step2": {x: 51, y: 10, width: 14, height: 20, "flipX": true}
		// 		});

		// 		this._resourceLoaded();
		// 	}
		// }

		// character_spritesheet.load();
	}

	private _loadBackgroundMusic () : void {
		// var music: Asset = this._assetGroup.getAsset('bgMusic');

		// music.

		// var bg_music : Asset = AssetFactory.getSingleton().build(AssetType.AUDIO,  'Resources/music.mp3');

		// bg_music.onStateChange = (state: AssetState) => {
		// 	if (state === AssetState.LOADED) {
		// 		this._bgMusic  = bg_music;
		// 		this._resourceLoaded();
		// 	}
		// }

		// bg_music.load();
	}
}

(<any>window)._PalletDemo = new PalletDemo();
