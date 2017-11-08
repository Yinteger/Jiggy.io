import Engine from "../../src/core/Engine";
import { TwoDimensionalRenderingEngine, GroupLogicEngine, IsometricRenderingEngine } from "../../src/engines";
import { IsometricGridMap } from "../../src/entities";
import { Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, Coordinate } from "../../src/utils";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs/";
import { Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState } from "../../src/assets/";
import {
    Mouse, MouseEvents, MouseMoveEvent, MouseClickEvent, ScrollWheelMove,
    Keyboard, KeyboardEvents, KeyDown, KeyUp, KeyboardKeys,
    GamePadListener, GamePadListenerEvents, GamePad, GamePadEvents, ValueChangeEvent
} from "../../src/inputs";
import { Entity, IsometricTile } from "../../src/entities";

class IsoDemo extends Engine {
    _characterSpritesheet: Spritesheet;
    player: Entity;
    _mainCamera: Camera;
    constructor() {
        super();
        this.getViewPort().setSize({ width: 500, height: 500 });
        this.getViewPort().fillPage(true);
        this.setRenderingEngine(new IsometricRenderingEngine());


        var layer1: IsometricGridMap = new IsometricGridMap({ width: 32, height: 32 }, { x: 10, y: 10 });
        layer1.setX(0);
        layer1.setY(0);
        var camera = new Camera(layer1, new Coordinate(-150, 0 ), { width: 500, height: 500 }, new Coordinate(0, 0), { width: 1000, height: 1000 });
        this._mainCamera = camera;
        this.getRenderingEngine().addCamera(camera);

        var map_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'grass_18x18_zps343999e6.png');
        var block_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'isometric_00142.png');

        map_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                console.log("Asset loaded");
                var tiles = layer1.getTiles();
                var count = 1;
                for (var tile of tiles) {                    
                    //tile.setColor(new Color((222 / count), (222/count), (222/count)));
                    tile.setTexture(map_asset);
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
                    player.setWidth(16);
                    player.setZ(1);
                    //player.texture = this._characterSpritesheet.getSprite("player_left");
                    layer1.addChild(player);

                    let tile = layer1.getTile({ x: 2, y: 2 })
                    //tile.color = { r: 250, g: 0, b: 0 };
                    player.setX(tile.getX() + (tile.getWidth() / 2) - (player.getWidth() / 2));
                    player.setY(tile.getY() + (tile.getHeight() / 2) - (player.getHeight() / 2));
                    this.player = player;
                    player.setColor(new Color(Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)));
                });
            }
        };

        block_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
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
                block.setZ(1);
                block.setY(tile.getY());
                block.setWidth(tile.getWidth());
                block.setHeight(tile.getHeight() * 2);
                layer1.addChild(block);

                var block2 = new Entity();
                block2.setTexture(block_asset);
                block2.setX(tile.getX());
                block2.setY(tile.getY());
                block2.setZ(tile.getHeight());
                block2.setWidth(tile.getWidth());
                block2.setHeight(tile.getHeight() * 2);
                layer1.addChild(block2);

                var block3 = new Entity();
                block3.setTexture(block_asset);
                block3.setX(tile2.getX());
                block3.setY(tile2.getY());
                block3.setZ(tile2.getHeight());
                block3.setWidth(tile2.getWidth());
                block3.setHeight(tile2.getHeight() * 2);
                layer1.addChild(block3);

                var block4 = new Entity();
                block4.setTexture(block_asset);
                block4.setX(tile3.getX());
                block4.setY(tile3.getY());
                block4.setZ(1);
                block4.setWidth(tile3.getWidth());
                block4.setHeight(tile3.getHeight() * 2);
                layer1.addChild(block4);

                var block5 = new Entity();
                block5.setTexture(block_asset);
                block5.setX(tile3.getX());
                block5.setY(tile3.getY());
                block5.setZ(tile3.getHeight());
                block5.setWidth(tile3.getWidth());
                block5.setHeight(tile3.getHeight() * 2);
                layer1.addChild(block5);

                var block6 = new Entity();
                block6.setTexture(block_asset);
                block6.setX(tile4.getX());
                block6.setY(tile4.getY());
                block6.setZ(tile4.getHeight());
                block6.setWidth(tile4.getWidth());
                block6.setHeight(tile4.getHeight() * 2);
                layer1.addChild(block6);

                var block7 = new Entity();
                block7.setTexture(block_asset);
                block7.setX(tile5.getX());
                block7.setY(tile5.getY());
                block7.setZ(tile5.getHeight());
                block7.setWidth(tile5.getWidth());
                block7.setHeight(tile5.getHeight() * 2);
                layer1.addChild(block7);

                var block8 = new Entity();
                block8.setTexture(block_asset);
                block8.setX(tile6.getX());
                block8.setY(tile6.getY());
                block8.setZ(tile6.getHeight());
                block8.setWidth(tile6.getWidth());
                block8.setHeight(tile6.getHeight() * 2);
                layer1.addChild(block8);

                var block9 = new Entity();
                block9.setTexture(block_asset);
                block9.setX(tile6.getX());
                block9.setY(tile6.getY());
                block9.setZ(1);
                block9.setWidth(tile6.getWidth());
                block9.setHeight(tile6.getHeight() * 2);
                layer1.addChild(block9);

                var block10 = new Entity();
                block10.setTexture(block_asset);
                block10.setX(tile7.getX());
                block10.setY(tile7.getY());
                block10.setZ(tile7.getHeight());
                block10.setWidth(tile7.getWidth());
                block10.setHeight(tile7.getHeight() * 2);
                layer1.addChild(block10);

                var block11 = new Entity();
                block11.setTexture(block_asset);
                block11.setX(tile8.getX());
                block11.setY(tile8.getY());
                block11.setZ(tile8.getHeight());
                block11.setWidth(tile8.getWidth());
                block11.setHeight(tile8.getHeight() * 2);
                layer1.addChild(block11);

                var block12 = new Entity();
                block12.setTexture(block_asset);
                block12.setX(tile8.getX());
                block12.setY(tile8.getY());
                block12.setZ(1);
                block12.setWidth(tile8.getWidth());
                block12.setHeight(tile8.getHeight() * 2);
                layer1.addChild(block12);
            }
        };

        map_asset.load();
        block_asset.load();

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
    }
    _loadCharacterSpriteSheet(cb: any) {
        var character_spritesheet: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'zombie_0.png');

        character_spritesheet.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                this._characterSpritesheet = new Spritesheet(character_spritesheet, {
                    "player_left": { x: 54, y: 46, width: 25, height: 55 },
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
