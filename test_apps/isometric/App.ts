import Engine from "../../src/core/src/Engine";
import { IsometricRenderingEngine, TwoDimensionalRenderingEngine, GroupLogicEngine } from "../../src/engines/src";
import { Entity, GridMap } from "../../src/entities/src/";
import { Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter } from "../../src/utils/src";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs/src/";
import { Animation, TextAssetBuilder, Spritesheet, Asset, AssetType, AssetFactory, AssetState } from "../../src/assets/src/";
import {
    Mouse, MouseEvents, MouseMoveEvent, MouseClickEvent, ScrollWheelMove,
    Keyboard, KeyboardEvents, KeyDown, KeyUp, KeyboardKeys,
    GamePadListener, GamePadListenerEvents, GamePad, GamePadEvents, ValueChangeEvent
} from "../../src/inputs/src/";

class IsoDemo extends Engine {
    constructor() {
        super();
        this.viewPort.size = ({ width: 500, height: 500 });
        this.renderingEngine = new TwoDimensionalRenderingEngine();
        var layer1: GridMap = new GridMap({ width: 16, height: 16 }, { x: 4, y: 4 });
        layer1.x = 100;
        layer1.y = 0;
        var camera = new Camera(layer1, null, { width: 200, height:200 }, null, { width: 500, height: 500 });
        
        this.renderingEngine.addCamera(camera);

        var map_asset: Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'grass_18x18_zps343999e6.png');

        map_asset.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                console.log("Asset loaded");
                var tiles = layer1.getTiles();
                for (var tile of tiles) {
                    tile.texture = map_asset;
                    tile.color = { r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1) };
                }
            }
        };

        map_asset.load();

        setTimeout(() => {
            //this.renderingEngine.stopRendering();
        }, 2500);

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

}

(<any>window).IsoDemo = new IsoDemo();
