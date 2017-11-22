import Engine from "../../src/core/Engine";
import { TwoDimensionalRenderingEngine, GroupLogicEngine } from "../../src/engines";
import { GridMap } from "../../src/entities";
import { Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, Coordinate } from "../../src/utils";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs/";
import { Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState } from "../../src/assets/";
import {
    Mouse, MouseEvents, MouseMoveEvent, MouseClickEvent, ScrollWheelMove,
    Keyboard, KeyboardEvents, KeyDown, KeyUp, KeyboardKeys,
    GamePadListener, GamePadListenerEvents, GamePad, GamePadEvents, ValueChangeEvent
} from "../../src/inputs";
import { Entity, EntityEventTypes } from "../../src/entities";

class IsoDemo extends Engine {
    _characterSpritesheet: Spritesheet;
    player: Entity;
    _mainCamera: Camera;
    _direction: string;
    _playerJumping: boolean;

    constructor() {
        super();
        this.setLogicEngine(new GroupLogicEngine());
        this.getViewPort().setSize({ width: 300, height: 300 });
        this.getViewPort().fillPage(true);
        var engine: TwoDimensionalRenderingEngine = new TwoDimensionalRenderingEngine();
        engine.setIsometricRendering(true);
        this.setRenderingEngine(engine);

        var map = new Entity();
        map.setWidth(320);
        map.setHeight(320);
        var layer1: GridMap = new GridMap({ width: 32, height: 32 }, { x: 10, y: 10 });
        var layer1: GridMap = new GridMap({ width: 32, height: 32 }, { x: 10, y: 10 });
        //layer1.id = "layer1";
        layer1.setX(160 - 16);
        layer1.setY(-160 + 16);
        //layer1.setX(160 - 16);
        //layer1.setY(-160 + 16);
        //layer1.setZ(64)
        map.addChild(layer1);
        //map.setColor(new Color(255, 255, 0));
        //map.addChild(layer1);
        //layer1.setColor(new Color(255, 0, 0));
        var camera = new Camera(map, new Coordinate(0, 0), { width: 500, height: 500 }, new Coordinate(0, 0), { width: 300, height: 300 });
        this._mainCamera = camera;
        camera.setRenderDimension(this.getViewPort().getSize());
        this.getRenderingEngine().addCamera(camera);

        this.getViewPort().on("resize", (dimension) => {
            console.log(dimension);
            camera.setRenderDimension(dimension);
        });

        var map_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'grass_18x18_zps343999e6.png');
        var block_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'isometric_00142.png');
        var bg_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'Sky.jpg');

        map_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                console.log("Asset loaded");
                var tiles = layer1.getTiles();
                var count = 1;
                for (var tile of tiles) {                    
                    //tile.setColor(new Color((222 / count), (222/count), (222/count)));
                    //tile.setTexture(map_asset);
                    count += .25;
                    //tile.y -= Math.floor((Math.random() * 30) + 1);
                    //tile.depth = Math.floor((Math.random() * 30) + 1);
                    console.log(count);
                    //tile.tile = true;
                }
                console.log(tiles);
                this._loadCharacterSpriteSheet(() => {
                    var player: Entity = new Entity();
                    player.setHeight(16);
                    player.setWidth(8);
                    //player.setTexture(this._characterSpritesheet.getSprite("player_left"));
                    layer1.addChild(player);

                    let tile = layer1.getTile({ x: 6, y: 6 })
                    //tile.color = { r: 250, g: 0, b: 0 };
                    //player.id = "player";
                    player.setX(tile.getX() + (tile.getWidth() / 2) - (player.getHeight() / 2));
                    player.setY(tile.getY() - (tile.getHeight() / 2));
                    player.setZ(32 + player.getHeight());
                    this.player = player;
                    player.setColor(new Color(Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)));

                    player.on(EntityEventTypes.LOCATION_UPDATE.toString(), () => {
                        var fov = camera.getFOV();
                        //camera.setViewPoint(new Coordinate(this.player.getAbsoluteX() + ((this.player.getWidth() - fov.width) / 4), this.player.getY() + ((this.player.getHeight() - fov.height) / 2)));
                    });
                });
            }
        };

        bg_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                map.setTexture(bg_asset);
                //layer1.setTexture(bg_asset);
                //layer1.setTexture(bg_asset);
            }
        };

        block_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {

                var tiles = layer1.getTiles();
                var count = 1;
                var blocks : any= [];
                for (var tile of tiles) {
                    //tile.setColor(new Color((222 / count), (222/count), (222/count)));
                    //tile.setTexture(map_asset);
                    count += .25;
                    //tile.y -= Math.floor((Math.random() * 30) + 1);
                    //tile.depth = Math.floor((Math.random() * 30) + 1);
                    console.log(count);
                    //tile.tile = true;
                    var block = new Entity();
                    block.setTexture(block_asset);
                    block.setX(tile.getX());
                    //block.id = "Block1";
                    block.setY(tile.getY());
                    block.setZ(tile.getHeight());
                    block.setWidth(tile.getWidth());
                    block.setHeight(tile.getHeight() * 2);
                    blocks.push(block);
                }

                for (var i in blocks) {
                    layer1.addChild(blocks[i]);
                }

                var tile = layer1.getTile({ x: 2, y: 2 });
                var tile2 = layer1.getTile({ x: 2, y: 3 });
                var tile3 = layer1.getTile({ x: 2, y: 4 });
                var tile4 = layer1.getTile({ x: 3, y: 2 });
                var tile5 = layer1.getTile({ x: 4, y: 2 });
                var tile6 = layer1.getTile({ x: 5, y: 2 });
                var tile7 = layer1.getTile({ x: 5, y: 3 });
                var tile8 = layer1.getTile({ x: 5, y: 4 });

                console.log("Block loaded");
                var block = new Entity();
                block.setTexture(block_asset);
                block.setX(tile.getX());
                block.setZ(tile4.getHeight() * 2);
                //block.id = "Block1";
                block.setY(tile.getY());
                block.setWidth(tile.getWidth());
                block.setHeight(tile.getHeight() * 2);
                layer1.addChild(block);

                var block2 = new Entity();
                block2.setTexture(block_asset);
                block2.setX(tile.getX());
                block2.setY(tile.getY());
                //block2.id = "Block2";
                block2.setZ(tile.getHeight() * 3);
                block2.setWidth(tile.getWidth());
                block2.setHeight(tile.getHeight() * 2);
                layer1.addChild(block2);

                var block3 = new Entity();
                block3.setTexture(block_asset);
                block3.setX(tile2.getX());
                block3.setY(tile2.getY());
                //block3.id = "Block3";
                block3.setZ(tile2.getHeight() * 3);
                block3.setWidth(tile2.getWidth());
                block3.setHeight(tile2.getHeight() * 2);
                layer1.addChild(block3);

                var block4 = new Entity();
                block4.setTexture(block_asset);
                block4.setX(tile3.getX());
                block4.setY(tile3.getY());
                block4.setZ(tile4.getHeight() * 2);
                //block4.id = "Block4";
                block4.setWidth(tile3.getWidth());
                block4.setHeight(tile3.getHeight() * 2);
                layer1.addChild(block4);

                var block5 = new Entity();
                block5.setTexture(block_asset);
                block5.setX(tile3.getX());
                block5.setY(tile3.getY());
                block5.setZ(tile3.getHeight() * 3);
                block5.setWidth(tile3.getWidth());
                block5.setHeight(tile3.getHeight() * 2);
                layer1.addChild(block5);
                //block5.id = "Block5";

                var block6 = new Entity();
                block6.setTexture(block_asset);
                block6.setX(tile4.getX());
                block6.setY(tile4.getY());
                block6.setZ(tile4.getHeight() * 3);
                block6.setWidth(tile4.getWidth());
                block6.setHeight(tile4.getHeight() * 2);
                layer1.addChild(block6);
                //block6.id = "Block6";

                var block10 = new Entity();
                block10.setTexture(block_asset);
                block10.setX(tile7.getX());
                block10.setY(tile7.getY());
                block10.setZ(tile7.getHeight() * 3);
                block10.setWidth(tile7.getWidth());
                block10.setHeight(tile7.getHeight() * 2);
                layer1.addChild(block10);
                //block10.id = "Block10";

                var block7 = new Entity();
                block7.setTexture(block_asset);
                block7.setX(tile5.getX());
                block7.setY(tile5.getY());
                block7.setZ(tile5.getHeight() * 3);
                block7.setWidth(tile5.getWidth());
                block7.setHeight(tile5.getHeight() * 2);
                layer1.addChild(block7);
                //block7.id = "Block7";

                var block8 = new Entity();
                block8.setTexture(block_asset);
                block8.setX(tile6.getX());
                block8.setY(tile6.getY());
                block8.setZ(tile6.getHeight() * 3);
                block8.setWidth(tile6.getWidth());
                block8.setHeight(tile6.getHeight() * 2);
                layer1.addChild(block8);
                //block8.id = "Block8";



                var block11 = new Entity();
                block11.setTexture(block_asset);
                block11.setX(tile8.getX());
                block11.setY(tile8.getY());
                block11.setZ(tile8.getHeight() * 3);
                block11.setWidth(tile8.getWidth());
                block11.setHeight(tile8.getHeight() * 2);
                layer1.addChild(block11);
                //block11.id = "Block11";


                var block9 = new Entity();
                block9.setTexture(block_asset);
                block9.setX(tile6.getX() + 32);
                block9.setY(tile6.getY() + 32);
                block9.setZ(tile4.getHeight() * 2);
                //block9.id = "Block9";
                block9.setWidth(tile6.getWidth());
                block9.setHeight(tile6.getHeight() * 2);
                layer1.addChild(block9);

                var block12 = new Entity();
                block12.setTexture(block_asset);
                block12.setX(tile8.getX());
                block12.setY(tile8.getY());
                block12.setZ(tile4.getHeight() * 2);
                //block12.id = "Block12";
                block12.setWidth(tile8.getWidth());
                block12.setHeight(tile8.getHeight() * 2);
                layer1.addChild(block12);

                var direction = "up";
                this.getLogicEngine().addLogic('blockmove', () => {
                    if (block9.getZ() >= 96) {
                        direction = "down";
                    } else if (block9.getZ() <= 64) {
                        direction = "up";
                    }
                    if (direction === "down") {
                        block9.setZ(block9.getZ() - 2);
                    } else {
                        block9.setZ(block9.getZ() + 2);
                    }
                    if (this.player) {
                        //this.player.setX(block9.getX() + (block9.getWidth()) - (this.player.getWidth() / 2));
                        //this.player.setZ(block9.getZ() + this.player.getHeight());
                        //this.player.setY(block9.getY());
                    }
                }, 50);

                this.getLogicEngine().addLogic('gravity', () => {
                    if (!this._playerJumping) {
                        //Check if player can fall...
                    }
                }, 25);
            }
        };

        map_asset.load();
        block_asset.load();
        bg_asset.load();

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

        var mouse = Mouse.getInstance();

        mouse.on(MouseEvents.ScrollWheelMove, (e: ScrollWheelMove) => {
            // console.warn(e);
            var fov = camera.getFOV();
            var viewPoint = camera.getViewPoint();
            if (e.yDelta > 0) {
                //Mouse wheel went up, zoom in by decreasing FOV
                camera.setViewPoint(new Coordinate(viewPoint.getX() + 5, viewPoint.getY() + 5 ));
                camera.setFOV({ width: fov.width - 10, height: fov.height - 10 });
            } else {
                //Zoom out
                camera.setViewPoint(new Coordinate(viewPoint.getX() - 5, viewPoint.getY() - 5));
                camera.setFOV({ width: fov.width + 10, height: fov.height + 10 });
            }
        });

        this.getLogicEngine().addLogic('moveLogic', () => {
            switch (this._direction) {
                case 'left':
                    this.player.setX(this.player.getX() - 1);
                    break;
                case 'up':
                    this.player.setY(this.player.getY() - 1);
                    break;
                case 'down':
                    this.player.setY(this.player.getY() + 1);
                    break;
                case 'right':
                    this.player.setX(this.player.getX() + 1);
                    break;
            }
        }, 1);

        var keyboard = Keyboard.getInstance();
        keyboard.on(KeyboardEvents.KeyDown, (e: KeyDown) => {
            switch (e.key) {
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
                case KeyboardKeys.SPACEBAR:
                    if (!this._playerJumping) {
                        this._playerJumping = true;
                        var distance = 0;
                        var interval = window.setInterval(() => {
                            if (distance >= 50) {
                                //Stop the jump!
                                this._playerJumping = false;
                                window.clearInterval(interval);
                            } else {
                                var newDistance = Math.ceil((50 - distance) / 5);
                                this.player.setZ(this.player.getZ() + newDistance);
                                distance += newDistance;
                            }
                        }, 20);
                    }
                    break;
            }
        });

        keyboard.on(KeyboardEvents.KeyUp, (e: KeyUp) => {
            switch (e.key) {
                case KeyboardKeys.W:
                case KeyboardKeys.A:
                case KeyboardKeys.S:
                case KeyboardKeys.D:
                    this._direction = null;
                    break;
            }
        });
    }
    _loadCharacterSpriteSheet(cb: any) {
        var character_spritesheet: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'zombie_0.png');

        character_spritesheet.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                this._characterSpritesheet = new Spritesheet(character_spritesheet, {
                    "player_left": { x: 54, y: 46, width: 15, height: 55 },
                });

                cb();
            }
        }

        character_spritesheet.load();
    }
    private attachGamepad(gamePad: GamePad): void {
        gamePad.on(GamePadEvents.AxisValueChange, (e: ValueChangeEvent) => {
            //console.log("Updating controller movement", gamePad.getAxis(0), gamePad.getAxis(1), axisId, newValue);
            if (gamePad.getAxis(0) < -.1 || gamePad.getAxis(0) > .1) {
                this.player.setX(this.player.getX() + Math.floor(gamePad.getAxis(0) * 2));
            }

            if (gamePad.getAxis(1) < -.1 || gamePad.getAxis(1) > .1) {
                this.player.setY(this.player.getY() + Math.floor(gamePad.getAxis(1) * 2));
            }
            if (gamePad.getAxis(2) < -.1 || gamePad.getAxis(2) > .1) {
                this._mainCamera.getViewPoint().setX(this._mainCamera.getViewPoint().getX() + Math.floor(gamePad.getAxis(2) * 10));
            }

            if (gamePad.getAxis(3) < -.1 || gamePad.getAxis(3) > .1) {
                this._mainCamera.getViewPoint().setY(this._mainCamera.getViewPoint().getY() + Math.floor(gamePad.getAxis(3) * 10));
            }
        });
    }
}

(<any>window).IsoDemo = new IsoDemo();
