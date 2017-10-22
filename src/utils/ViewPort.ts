import * as Events from 'events';
import {Dimension} from "../interfaces/";
import {ViewPortEventTypes, DimensionUpdateEvent} from "./";

export class ViewPort extends Events.EventEmitter {
	public canvas : HTMLCanvasElement;
	public context : CanvasRenderingContext2D;
	public resizable : boolean;
	private _autoSize : boolean;
	private _autoSizeTimer : any;
	private _dimension : Dimension;

	public constructor () {
		super();
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.resizable = false;
		this._dimension = {width: 0, height: 0};
		this.autoSize = false; //Auto sizes View
	}

	public setScale (dimension : Dimension) : void {
		this.context.scale(dimension.width, dimension.height);
	}

	public set autoSize (state: boolean) {
		if (this._autoSizeTimer) {
			clearInterval(this._autoSizeTimer);
		}

		if (state) {
			this._checkForParentSizeChange();
			this._autoSizeTimer = setInterval(() => {
				this._checkForParentSizeChange();
			}, 100);
		}
	}

	public get autoSize () : boolean {
		return this._autoSize;
	}

	get size () : Dimension {
		return {width: this.canvas.offsetWidth, height: this.canvas.offsetHeight};
	}

	set size (dimension : Dimension) {
		//First, set the variables for reference
		this._dimension = dimension;

		//Update the Canvas dimensions
		this.canvas.setAttribute('width', dimension.width + "px");
		this.canvas.setAttribute('height', dimension.height + "px");

		this.emit('resize', dimension);
	}

	public clear () : void {
		this.context.clearRect(0, 0, this._dimension.width, this._dimension.height);
	}

	public drawImage (img: HTMLImageElement, clip_x : number, clip_y : number, clip_width : number, clip_height : number, x: number, y : number, width : number, height : number) {
		this.context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
	}

	public setFont (font : string) : void {
		this.context.font = font;
	}

	public setColor (color : string) : void {
		this.context.fillStyle = color;
	}

	public measureText (text : string) : TextMetrics {
		return this.context.measureText(text);
	}

	public setTextBaseline (baseline : string) : void {
		this.context.textBaseline = baseline;
	}

	public drawText (text : string, x : number, y : number, maxWidth : number) : void {
		this.context.fillText(text, x, y, maxWidth);
	}

	public setHidden () : void {
		this.canvas.style.position = "absolute";
		this.canvas.style.left = '110001px';
	}
 
	public getImage () : HTMLImageElement {
		var image =  <HTMLImageElement> document.createElement('img');
		image.src = this.canvas.toDataURL("image/png");
		return image;
		// return this.context.getImageData(0, 0, this.width, this.height);
	}

	private _checkForParentSizeChange ( ) : void {
		if (this.canvas.parentNode) {
			var size = this.size;
			var parent = <HTMLElement> this.canvas.parentNode;
			//TODO: Fix an issue with incrementing auto size and remove magic number
			var parent_size : Dimension = {width: parent.offsetWidth, height: parent.offsetHeight-2};
			if (size.width != parent_size.width || size.height != parent_size.height) {
				this.size = {width: parent_size.width, height: parent_size.height};

				let eventData : DimensionUpdateEvent = {
					type: ViewPortEventTypes.DIMENSION_UPDATE.toString(),
					oldDimensions: size,
					newDimensions: parent_size,
					source: this
				};

				this.emit(ViewPortEventTypes.DIMENSION_UPDATE.toString(), eventData);
			}
		}
	}
}