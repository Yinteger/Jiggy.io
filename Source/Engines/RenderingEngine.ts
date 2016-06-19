import ViewPort from "../Utils/ViewPort";
import Entity from "../Entities/Entity";

export default class RenderingEngine {
	protected _viewPort : ViewPort;
	protected _prerenderViewPort : ViewPort;
	protected _rendering  : boolean;
	protected _fps : number;
	protected _HUDEntity : Entity;
	protected _cameras : Camera[];
	private _animationFrameID : number;
	private _frames : number;
	private _lastRender : Date;
	private _showFPS : boolean;

	public addCamera (camera : Camera) : void {
		this._cameras.push(camera);
	}

	public removeCamera (camera : Camera) : void {
		delete this._cameras[this._cameras.indexOf(camera)];
	}

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

	public stopRendering () : void {
		window.cancelAnimationFrame(this._animationFrameID);
		this._animationFrameID = null;
		this._rendering = false;
	}

	private _requestFrame () : void {
		if (this._rendering) {
			this._animationFrameID = window.requestAnimationFrame(() => {
				this._render();
				this._postRender();
			});
		}
	}

	protected _render () : void {
		this._viewPort.clear();
	}

	private _calculateFPS () : void {
		var date = new Date(); //Get current Date/Time

		if (this._lastRender) { //If we have a store Date/Time from last rendering

			if (this._lastRender.getSeconds() != date.getSeconds()) { //This is a new second, calculate the average FPS for the last second and display it
				// var avg : number = 0;
				// var i : any;
				// for (i in this._frames) {
				// 	avg += this._frames[i];
				// }
				// this._fps = this._frames;
				// this._frames = 1;
			} else { //It's the same second as last render, just add the FPS to an array so we can calculate the Average later
				this._frames += 1;
			}
		}

		this._lastRender = date;
	}

	private _postRender () : void {
		//TODO: Call PostProcessors here

		if (this._showFPS) {
			//Calculate the FPS
			this._calculateFPS();

			//Draw the FPS on the screen
			var ctx = this._viewPort.context;
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
