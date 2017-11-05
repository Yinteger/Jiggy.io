import {Engine} from "../../src/core";
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from "../../src/engines";
import {HTML5AudioEngine} from "../../src/audio";
import {Entity, LocationUpdateEvent} from "../../src/entities";
import {Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter, Color} from "../../src/utils";
import {Asset, AssetState, AssetFactory, AssetType} from "../../src/assets";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs";

class TouchDemo extends Engine {
    private _minDimension: number;
    private _maxDimension: number;
    private _blocks: Entity[];
    private _blockConfigs: { [key: string]: { [key: string]: any } };
    private _container: Entity;
    private _collisionEmitter: CollisionEmitter;
    private _camera: Camera;
    private _touches: Touch[];

    constructor() {
        super();
        this.setRenderingEngine(new TwoDimensionalRenderingEngine());
        this.setLogicEngine(new GroupLogicEngine());

        this._container = new Entity();
        this._container.setColor(new Color(0,0,0));
        this._container.setWidth(1000);
        this._container.setHeight(1000);

        this._camera = new Camera(this._container, null, { width: this._container.getWidth(), height: this._container.getHeight() }, null, { height: this._container.getHeight(), width: this._container.getWidth() });
        this.getRenderingEngine().addCamera(this._camera);


        this.getViewPort().on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        this.getViewPort().fillPage(true);
        this.getLogicEngine().addLogic("touch", this._touch.bind(this), 25);

        var touchListener = TouchListener.getInstance();
        touchListener.on(TouchListenerEvents.TouchAdded, (touch: Touch) => {
            console.log("New Touch added with an ID of ", touch.getID());
            var block = new Entity();
            block.setX(touch.getX() - 25);
            block.setY(touch.getY() - 25);
            block.setColor(new Color(Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)));
            block.setWidth(50);
            block.setHeight(50);
            this._container.addChild(block);

            touch.on(TouchEvents.TouchMoved, (e: TouchMoveEvent) => {
                //Move Block related to this touch object
                console.log("Touch moved");
                var position = e.position;
                //console.log(position);
                block.setX(position.x - 25);
                block.setY(position.y -25);
            });

            touch.on(TouchEvents.TouchRemoved, (touch: Touch) => {
                //Remove block related to this touch object
                console.log("Touch removed");
                this._container.removeChild(block);
            });
        });
    }

    private _viewPortUpdated(event: DimensionUpdateEvent): void {
        this._container.setWidth(event.newDimensions.width);
        this._container.setHeight(event.newDimensions.height);
        this._camera.setFOV({ width: event.newDimensions.width, height: event.newDimensions.height });
        this._camera.setRenderDimension({ width: event.newDimensions.width, height: event.newDimensions.height });
    }

    private _touch() {
        
    }

}

(<any>window).TouchDemo = new TouchDemo();
