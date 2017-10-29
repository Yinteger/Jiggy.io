import {Engine} from "@jiggy/core";

import {
    TwoDimensionalRenderingEngine,
    GroupLogicEngine
} from '@jiggy/engines';

import {HTML5AudioEngine} from '@jiggy/audio';

import {
    Entity,
    LocationUpdateEvent
} from '@jiggy/entities';

import {
    Camera,
    ViewPortEventTypes,
    DimensionUpdateEvent,
    CollisionEmitter
} from '@jiggy/utils';

import {
    Asset,
    AssetState,
    AssetFactory,
    AssetType
} from '@jiggy/assets';

class CameraDemo extends Engine {
    private _blocks : Entity[];
    private _blockConfigs : {[key: string] : {[key: string]: any}};
    private _container : Entity;
    private _collisionEmitter : CollisionEmitter;
    private _camera : Camera;
    private _smallCamera : Camera;
    private _pikachuTexture : Asset;
    private _mouseIsIn : boolean;

    constructor () {
        super();
        this._mouseIsIn = false;

        this.viewPort.autoSize = true;
        this.renderingEngine = new TwoDimensionalRenderingEngine();
        this.logicEngine = new GroupLogicEngine();

        this._blocks = [];
        this._blockConfigs = {};

        this._container = new Entity();
        this._container.color = {r: 0, g: 0, b: 0};
        this._container.width = 1000;
        this._container.height = 1000;

        this._camera = new Camera(this._container, null, {width: this._container.width, height: this._container.height}, null, {height: this._container.height, width: this._container.width});
        this.renderingEngine.addCamera(this._camera);

        this._smallCamera = new Camera(this._container, {x: 450, y: 450}, {width: 75, height: 75}, {x: 35, y: 35}, {width: 100, height: 100});
        this.renderingEngine.addCamera(this._smallCamera);

        this.renderingEngine.debugCamera = true;

        let backgroundLoaded : boolean = false;
        let pikachuLoaded : boolean = false;

        this.viewPort.on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));

        var background : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE,  'resources/poke_background.jpg');
        var pikachu : Asset = AssetFactory.getSingleton().build(AssetType.IMAGE, 'resources/pikachu_small.png');

        let resourcesLoaded = () => {
            for (var i : number = 0; i < 200; i ++) {
                console.log("Generate Pikachus");
                this._generatePikachu();
            }
            this.logicEngine.addLogic("collision", this._moveBlocks.bind(this), 25);
            // let smallCameraBG : Entity = new Entity();
            // smallCameraBG.width = 120;
            // smallCameraBG.height = 120;
            // smallCameraBG.x = 25;
            // smallCameraBG.y = 25;
            // smallCameraBG.color = {r: 255, g: 0, b: 0};
            // // this.renderingEngine.HUDEntity = smallCameraBG;
            // this._container.addChild(smallCameraBG);

            //Add Event listeners for demo...
            this.viewPort.canvas.addEventListener('mouseover', () => {
                console.log("OVER");
                this._mouseIsIn = true;
            });

            this.viewPort.canvas.addEventListener('mouseout', () => {
                console.log("OUT");
                this._mouseIsIn = false;
            });

            this.viewPort.canvas.addEventListener('mousemove', (e: MouseEvent) => {
                var fov = this._smallCamera.fov;
                this._smallCamera.viewPoint = {x: e.clientX - this.viewPort.canvas.offsetLeft - (fov.width / 2), y: e.clientY - this.viewPort.canvas.offsetTop - (fov.height / 2)};
            });

            this.viewPort.canvas.addEventListener('mousewheel', (e: MouseWheelEvent) => {
                // console.warn(e);
                var fov = this._smallCamera.fov;
                if (e.wheelDelta > 0) {
                    //Mouse wheel went up, zoom in by decreasing FOV
                    this._smallCamera.fov = {width: fov.width - 10, height: fov.height - 10};
                } else {
                    //Zoom out
                    this._smallCamera.fov = {width: fov.width + 10, height: fov.height + 10};
                }
            });
        };

        this._pikachuTexture = pikachu;
        background.onStateChange = (state : AssetState) => {
            if (state === AssetState.LOADED) {
                backgroundLoaded = true;
                this._container.texture = background;
                if (backgroundLoaded && pikachuLoaded) {
                    resourcesLoaded();
                }
            }
        };

        pikachu.onStateChange = (state: AssetState) => {
            if (state === AssetState.LOADED) {
                pikachuLoaded = true;
                if (backgroundLoaded && pikachuLoaded) {
                    resourcesLoaded();
                }
            }
        };

        background.load();
        pikachu.load();
    }

    private _generatePikachu () : void {
        var block : Entity = new Entity();
        this._blocks.push(block);
        // this._collisionEmitter.addEntity(block);


        block.width = 50;
        block.height = 50;

        block.texture = this._pikachuTexture;

        block.x = Math.floor((Math.random() * this._container.width) + 1);
        block.y = Math.floor((Math.random() * this._container.height) + 1);

        // block.color = {r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1)};

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

        if (!this._mouseIsIn && this._blocks.length > 0) {
            //Follow the first pikachu!
            var picka = this._blocks[1];
            var fov = this._smallCamera.fov;

            this._smallCamera.viewPoint = {x: picka.x + ((picka.width - fov.width) / 2), y: picka.y + ((picka.height - fov.height) / 2)};
        }
    }
}

(<any>window)._CameraDemo = new CameraDemo();
