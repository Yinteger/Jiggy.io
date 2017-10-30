import Engine from "../../src/core/src/Engine";
import { TwoDimensionalRenderingEngine, GroupLogicEngine } from "../../src/engines/src";
import { Entity, LocationUpdateEvent } from "../../src/entities/src";
import { Camera, ViewPortEventTypes, DimensionUpdateEvent, CollisionEmitter } from "../../src/utils/src";
import { TouchListener, TouchListenerEvents, Touch, TouchEvents, TouchMoveEvent } from "../../src/inputs/src/";

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
        this.renderingEngine = new TwoDimensionalRenderingEngine();
        this.logicEngine = new GroupLogicEngine();

        this._container = new Entity();
        this._container.color = { r: 0, g: 0, b: 0 };
        console.log(this.viewPort.canvas.offsetWidth);
        this._container.width = 1000;
        this._container.height = 1000;

        this._camera = new Camera(this._container, null, { width: this._container.width, height: this._container.height }, null, { height: this._container.height, width: this._container.width });
        this.renderingEngine.addCamera(this._camera);


        this.viewPort.on(ViewPortEventTypes.DIMENSION_UPDATE.toString(), this._viewPortUpdated.bind(this));
        this.viewPort.fillPage(true);
        this.logicEngine.addLogic("touch", this._touch.bind(this), 25);

        var touchListener = TouchListener.getInstance();
        touchListener.on(TouchListenerEvents.TouchAdded, (touch: Touch) => {
            console.log("New Touch added with an ID of ", touch.getID());
            var block = new Entity();
            block.x = touch.getX() - 25;
            block.y = touch.getY() - 25;
            block.color = { r: Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b: Math.floor((Math.random() * 255) + 1) };
            block.width = 50;
            block.height = 50;
            this._container.addChild(block);

            touch.on(TouchEvents.TouchMoved, (e: TouchMoveEvent) => {
                //Move Block related to this touch object
                console.log("Touch moved");
                var position = e.position;
                //console.log(position);
                block.x = position.x - 25;
                block.y = position.y -25;
            });

            touch.on(TouchEvents.TouchRemoved, (touch: Touch) => {
                //Remove block related to this touch object
                console.log("Touch removed");
                this._container.removeChild(block);
            });
        });
    }

    private _viewPortUpdated(event: DimensionUpdateEvent): void {
        this._container.width = event.newDimensions.width;
        this._container.height = event.newDimensions.height;
        this._camera.fov = { width: event.newDimensions.width, height: event.newDimensions.height };
        this._camera.renderDimension = { width: event.newDimensions.width, height: event.newDimensions.height };
    }

    private _touch() {
        
    }

}

(<any>window).TouchDemo = new TouchDemo();
