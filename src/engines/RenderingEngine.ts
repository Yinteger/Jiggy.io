import { ViewPort, Camera, Color, Coordinate } from "../utils";
import { Dimension } from "../interfaces";
import {Entity} from "../entities";

/**
 * Abstract Rendering Engine class which at it's core is simply has a list of cameras to render on the screen, each of which may point to a 'scene' entity.
 */
export abstract class RenderingEngine {
	private _viewPort : ViewPort;
	private _prerenderViewPort : ViewPort;
	private _rendering  : boolean;
	private _fps : number;
	private _HUDEntity : Entity;
	private _cameras : Camera[];
	private _animationFrameID : number;
	private _frames : number;
	private _lastRender : Date;
	private _showFPS : boolean;
	public debugCamera : boolean;

	public constructor () {
		this._prerenderViewPort = new ViewPort();
		this._rendering = false;
		this._fps = 0;
		this._frames = 0;
		this._showFPS = true;
		this._cameras = [];
	}

    /**
     * Sets the View Port to render into
     * @param viewPort
     */
	public setViewPort(viewPort: ViewPort): void {
		this._viewPort = viewPort;
	}

    /**
     * Returns the View Port the rendering engine is rendering into
     */
	public getViewPort(): ViewPort {
		return this._viewPort;
	}

    /**
     * Sets an Entity to be rendered outside of a Camera relative to the view port as a HUD element.  Set a single HUD Entity that may contain your entire HUD.
     * @param hud
     */
	public setHUD(hud: Entity): void {
		this._HUDEntity = hud;
	}

    /**
     * Returns the current HUD Element
     */
	public getHUD(): Entity {
		return this._HUDEntity;
	}

    /**
     * Adds a Camera to the list of Cameras to render every frame
     * @param camera
     */
	public addCamera (camera : Camera) : void {
		this._cameras.push(camera);
	}

    /**
     * Removes a Camera from the Camera rendering list
     * @param camera
     */
	public removeCamera (camera : Camera) : void {
		delete this._cameras[this._cameras.indexOf(camera)];
	}

    /**
     * Set the Engine to begin rendering into it's View Port
     */
	public startRendering () : boolean {
		if (this._viewPort) {
			var self = this;
			this._rendering = true;
			this._requestFrame();
			return true;
		} else {
			console.warn('Unable to begin rendering, no view port assigned to rendering engine.');
			return false;
		}
	}

    /**
     * Stop rendering into the View Port
     */
	public stopRendering () : void {
		window.cancelAnimationFrame(this._animationFrameID);
		this._animationFrameID = null;
		this._rendering = false;
	}

    /**
     * Use the requestAnimationFrame API to create a render loop
     */
	private _requestFrame () : void {
		if (this._rendering) {
			this._animationFrameID = window.requestAnimationFrame(() => {
				this._render();
				this._postRender();
			});
		}
	}

    /**
     * Abstract method to render a frame
     */
	protected _render () : void {
        this._viewPort.clear();

        for (var i in this._cameras) {
            this._renderCamera(this._cameras[i])
        }

        //Render HUD Entity
        if (this.getHUD()) {
            this._renderHUDEntity(this.getHUD());
        }
    }

    /**
     * Render an Entity relative to the View Port to create a 'HUD' or 'Menus'
     * @param hudEntity
     */
    protected _renderHUDEntity(hudEntity: Entity): void {
        var x = hudEntity.getX();
        var y = hudEntity.getY();
        var w = hudEntity.getWidth();
        var h = hudEntity.getHeight();

        //Rendering time!
        if (hudEntity.getColor()) {
            //Draw a rect in its place...
            var color: Color = hudEntity.getColor();
            this.getViewPort().getContext().fillStyle = color.toString();
            this.getViewPort().getContext().fillRect(x, y, w, h);
        }

        if (hudEntity.getTexture()) {
            var imageData = hudEntity.getTexture().getData();
            this.getViewPort().getContext().drawImage(imageData, x, y, w, h)
        }
    }

    /**
     * Render a single camera into the viewport
     */
    protected _renderCamera(camera: Camera): void {
        var scene = camera.getScene();
        var context = this.getViewPort().getContext();

        if (this.debugCamera) {
            //For Debugging purposes.. Draw a rect where each camera should be
            var viewPoint: Coordinate = camera.getViewPoint();
            var fov: Dimension = camera.getFOV();
            var renderOrigin: Coordinate = camera.getRenderOrigin();
            var renderDimension: Dimension = camera.getRenderDimension();

            context.beginPath();
            context.rect(viewPoint.getX(), viewPoint.getY(), fov.width, fov.height);
            context.lineWidth = 7;
            context.strokeStyle = 'red';
            context.stroke();

            context.beginPath();
            context.rect(renderOrigin.getX(), renderOrigin.getY(), renderDimension.width, renderDimension.height);
            context.lineWidth = 7;
            context.fillStyle = 'black';
            context.fill();
            context.strokeStyle = 'green';
            context.stroke();
        }

        var color: Color = new Color(255, 255, 0);
        this.getViewPort().getContext().fillStyle = color.toString();
        this.getViewPort().getContext().fillRect(camera.getRenderOrigin().getX(), camera.getRenderOrigin().getY(), camera.getRenderDimension().width, camera.getRenderDimension().height);

        this._renderEntity(scene, camera);
    }

    protected abstract _renderEntity(entity: Entity, camera: Camera): void;

    /**
     * Count every render loop in a second to show the FPS of the game
     */
	private _calculateFPS () : void {
		var date = new Date(); //Get current Date/Time

		if (this._lastRender) { //If we have a store Date/Time from last rendering
			if (this._lastRender.getSeconds() != date.getSeconds()) { //This is a new second, calculate the average FPS for the last second and display it
				// var avg : number = 0;
				// var i : any;
				// for (i in this._frames) {
				// 	avg += this._frames[i];
				// }
				this._fps = this._frames;
				this._frames = 1;
			} else { //It's the same second as last render, just add the FPS to an array so we can calculate the Average later
				this._frames += 1;
			}
		}

		this._lastRender = date;
	}

    /**
     * PostRender methods to modify the view and request the next animation frame
     */
	private _postRender () : void {
		//TODO: Call PostProcessors here

		if (this._showFPS) {
			//Calculate the FPS
			this._calculateFPS();

			//Draw the FPS on the screen
			var ctx = this._viewPort.getContext();
			ctx.globalAlpha=0.5;
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0,100,35);
			ctx.globalAlpha=1;
			ctx.fillStyle = 'white';
			ctx.font="20px Georgia";
			ctx.fillText(this._fps + " FPS",20,25);
		}

		//Start request for next frame
		this._requestFrame();
	}
}
