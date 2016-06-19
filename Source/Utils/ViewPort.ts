import * as Events from 'events';
import {Dimension} from "../Interfaces/Dimension";

export default class ViewPort extends Events.EventEmitter {
	public canvas : HTMLCanvasElement;
	public context : CanvasRenderingContext2D;
	public resizable : boolean;
	public autoSize : boolean;
	private _autoSizeTimer : number;
	private _dimension : Dimension;

	public setScale (dimension : Dimension) : void {
		this.context.scale(dimension.width, dimension.height);
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
		var image = new HTMLImageElement();
		image.src = this.canvas.toDataURL("image/png");
		return image;
		// return this.context.getImageData(0, 0, this.width, this.height);
	}

	private _checkForParentSizeChange ( state: boolean ) : void {
		if (this.canvas.parentNode) {
			var size = this.size;
			var parent_size = {width: this.canvas.parentNode.offsetWidth, height: this.canvas.parentNode.offsetHeight};
			if (size.width != parent_size.width || size.height != parent_size.height) {
				this.size ={width: parent_size.width, height: parent_size.height};
			}
		}
	}
}