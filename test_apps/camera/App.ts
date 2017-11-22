/// <reference path="../../src/assets/WebpackAssetSupport.d.ts" />

import {Engine} from "../../src/core";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines";
import {HTML5AudioEngine} from "../../src/audio";
import {Entity, LocationUpdateEvent} from "../../src/entities";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color, Coordinate} from "../../src/utils";
import { Asset, AssetState, AssetFactory, AssetType, AssetGroupLoader, AssetGroup, AssetGroupDefinition } from "../../src/assets";
import { resources } from './resources';

class CameraDemo extends Engine {
    private _blocks : Entity[];
    private _blockConfigs : {[key: string] : {[key: string]: any}};
    private _container : Entity;
    private _collisionEmitter : CollisionEmitter;
    private _camera : Camera;
    private _smallCamera : Camera;
    // private _pikachuTexture : Asset;
    private _mouseIsIn : boolean;
    private _assetGroup: AssetGroup;

    constructor () {
        super();
        this._mouseIsIn = false;

        this.setRenderingEngine(new TwoDimensionalRenderingEngine());
        this.setLogicEngine(new GroupLogicEngine());

        this._blocks = [];
        this._blockConfigs = {};

        this._container = new Entity();
        this._container.setColor(new Color(0,0,0));
        this._container.setWidth(1000);
        this._container.setHeight(1000);

        this._camera = new Camera(this._container, null, {width: this._container.getWidth(), height: this._container.getHeight()}, null, {height: this._container.getHeight(), width: this._container.getWidth()});
        this.getRenderingEngine().addCamera(this._camera);

        this._smallCamera = new Camera(this._container, new Coordinate(450, 450), {width: 75, height: 75}, new Coordinate(35, 35), {width: 100, height: 100});
        this.getRenderingEngine().addCamera(this._smallCamera);

        this.getRenderingEngine().debugCamera = true;

        // let backgroundLoaded : boolean = false;
        // let pikachuLoaded : boolean = false;

        this.getViewPort().on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        this.getViewPort().fillPage(true);
        // var background : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'resources/poke_background.jpg');
        // var pikachu : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'resources/pikachu_small.png');

        let resourcesLoaded = () => {
            this._container.setTexture(this._assetGroup.getAsset('background'));

            for (var i : number = 0; i < 200; i ++) {
                console.log("Generate Pikachus");
                this._generatePikachu();
            }
            this.getLogicEngine().addLogic("collision", this._moveBlocks.bind(this), 25);
            // let smallCameraBG : Entity = new Entity();
            // smallCameraBG.width = 120;
            // smallCameraBG.height = 120;
            // smallCameraBG.x = 25;
            // smallCameraBG.y = 25;
            // smallCameraBG.color = {r: 255, g: 0, b: 0};
            // // this.renderingEngine.HUDEntity = smallCameraBG;
            // this._container.addChild(smallCameraBG);

            //Add Event listeners for demo...
            this.getViewPort().getCanvas().addEventListener('mouseover', () => {
                console.log("OVER");
                this._mouseIsIn = true;
            });

            this.getViewPort().getCanvas().addEventListener('mouseout', () => {
                console.log("OUT");
                this._mouseIsIn = false;
            });

            this.getViewPort().getCanvas().addEventListener('mousemove', (e: MouseEvent) => {
                var fov = this._smallCamera.getFOV();
                this._smallCamera.setViewPoint(new Coordinate(e.clientX - this.getViewPort().getCanvas().offsetLeft - (fov.width / 2), e.clientY - this.getViewPort().getCanvas().offsetTop - (fov.height / 2)));
            });

            this.getViewPort().getCanvas().addEventListener('mousewheel', (e: MouseWheelEvent) => {
                // console.warn(e);
                var fov = this._smallCamera.getFOV();
                if (e.wheelDelta > 0) {
                    //Mouse wheel went up, zoom in by decreasing FOV
                    this._smallCamera.setFOV({width: fov.width - 10, height: fov.height - 10});
                } else {
                    //Zoom out
                    this._smallCamera.setFOV({width: fov.width + 10, height: fov.height + 10});
                }
            });
        };

        var loader: AssetGroupLoader = new AssetGroupLoader();
        this._assetGroup = loader.loadFromMemory(resources);
        this._assetGroup.load().then(() => {
            resourcesLoaded();
        }).catch((e: any) => {
            console.log(e);
        });
        // loader.load('resources.json').then((ag: AssetGroup) => {
        //     this._assetGroup = ag;
        //     return this._assetGroup.load();
        // }).then(() => {
        //     resourcesLoaded();
        // }).catch((error: any) => {
        //     console.error(error);
        // });

        // this._pikachuTexture = pikachu;
        // background.onStateChange = (state : AssetState) => {
        //     if (state === AssetState.LOADED) {
        //         backgroundLoaded = true;
        //         this._container.setTexture(background);
        //         if (backgroundLoaded && pikachuLoaded) {
        //             resourcesLoaded();
        //         }
        //     }
        // };

        // pikachu.onStateChange = (state: AssetState) => {
        //     if (state === AssetState.LOADED) {
        //         pikachuLoaded = true;
        //         if (backgroundLoaded && pikachuLoaded) {
        //             resourcesLoaded();
        //         }
        //     }
        // };

        // background.load();
        // pikachu.load();
    }

    private _generatePikachu () : void {
        var block : Entity = new Entity();
        this._blocks.push(block);
        // this._collisionEmitter.addEntity(block);


        block.setWidth(50);
        block.setHeight(50);

        block.setTexture(this._assetGroup.getAsset('pikachu'));

        block.setX(Math.floor((Math.random() * this._container.getWidth()) + 1));
        block.setY(Math.floor((Math.random() * this._container.getHeight()) + 1));

        // block.color = {r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1)};

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

        if (!this._mouseIsIn && this._blocks.length > 0) {
            //Follow the first pikachu!
            var picka = this._blocks[1];
            var fov = this._smallCamera.getFOV();

            this._smallCamera.setViewPoint(new Coordinate(picka.getX() + ((picka.getWidth() - fov.width) / 2), picka.getY() + ((picka.getHeight() - fov.height) / 2)));
        }
    }

    public unload(): void {
        // THis is a test method
        this._assetGroup.unload();
    }
}


(<any>window)._CameraDemo = new CameraDemo();
