import Engine from "../../src/core/src/Engine";
import { IsometricRenderingEngineCool, TwoDimensionalRenderingEngine, GroupLogicEngine } from "../../src/engines/src";
import { IsometricGridMap } from "../../src/entities/src/";
import { Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter } from "../../src/utils/src";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs/src/";
import { Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState } from "../../src/assets/src/";
import {
    Mouse, MouseEvents, MouseMoveEvent, MouseClickEvent, ScrollWheelMove,
    Keyboard, KeyboardEvents, KeyDown, KeyUp, KeyboardKeys,
    GamePadListener, GamePadListenerEvents, GamePad, GamePadEvents, ValueChangeEvent
} from "../../src/inputs/src/";
import { Entity, IsometricTile } from "@jiggy/entities";

class IsoDemo extends Engine {
    _characterSpritesheet: Spritesheet;
    player: Entity;
    _mainCamera: Camera;
    constructor() {
        super();
        this.viewPort.size = ({ width: 500, height: 500 });
        this.renderingEngine = new IsometricRenderingEngineCool();


        var layer1: IsometricGridMap = new IsometricGridMap({ width: 32, height: 32 }, { x: 10, y: 10 });
        layer1.x = 0;
        layer1.y = 0;
        var camera = new Camera(layer1, { x: -150, y: 0 }, { width: 500, height: 500 }, { x: 0, y: 0 }, { width: 500, height: 500 });
        this._mainCamera = camera;
        this.renderingEngine.addCamera(camera);

        var map_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'grass_18x18_zps343999e6.png');

        map_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                console.log("Asset loaded");
                var tiles = layer1.getTiles();
                var count = 1;
                for (var tile of tiles) {                    
                    //tile.color = { r: (222 / count), g: (222/count), b: (222/count) };
                    tile.texture = map_asset;
                    count += .25;
                    //tile.y -= Math.floor((Math.random() * 30) + 1);
                    tile.depth = Math.floor((Math.random() * 30) + 1);
                    console.log(count);
                    tile.tile = true;
                }
                console.log(tiles);
                this._loadCharacterSpriteSheet(() => {
                    var player: Entity = new Entity();
                    player.height = 16;
                    player.width = 16;
                    //player.texture = this._characterSpritesheet.getSprite("player_left");
                    //layer1.addChild(player);

                    let tile = layer1.getTile({ x: 2, y: 2 })
                    //tile.color = { r: 250, g: 0, b: 0 };
                    player.x = tile.x + (tile.width / 2) - (player.width / 2)
                    player.y = tile.y + (tile.height / 2) - (player.height / 2);
                    this.player = player;
                    player.color = { r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1) };
                });
            }
        };

        map_asset.load();

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
            var fov = camera.fov;
            var viewPoint = camera.viewPoint;
            if (e.yDelta > 0) {
                //Mouse wheel went up, zoom in by decreasing FOV
                camera.viewPoint = ({ x: viewPoint.x + 5, y: viewPoint.y + 5 });
                camera.fov = ({ width: fov.width - 10, height: fov.height - 10 });
            } else {
                //Zoom out
                camera.viewPoint = ({ x: viewPoint.x - 5, y: viewPoint.y - 5 });
                camera.fov = ({ width: fov.width + 10, height: fov.height + 10 });
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
                this.player.x += Math.floor(gamePad.getAxis(0) * 2);
            }

            if (gamePad.getAxis(1) < -.1 || gamePad.getAxis(1) > .1) {
                this.player.y += Math.floor(gamePad.getAxis(1) * 2);
            }
            if (gamePad.getAxis(2) < -.1 || gamePad.getAxis(2) > .1) {
                this._mainCamera.viewPoint.x += Math.floor(gamePad.getAxis(2) * 10);
            }

            if (gamePad.getAxis(3) < -.1 || gamePad.getAxis(3) > .1) {
                this._mainCamera.viewPoint.y += Math.floor(gamePad.getAxis(3) * 10);
            }
        });
    }
}

(<any>window).IsoDemo = new IsoDemo();
