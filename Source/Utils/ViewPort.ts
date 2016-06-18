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

	public setSize (dimension : Dimension) : void {
		//First, set the variables for reference
		this._dimension = dimension;

		//Update the Canvas dimensions
		this.canvas.setAttribute('width', dimension.width + "px");
		this.canvas.setAttribute('height', dimension.height + "px");

		this.emit('resize', dimension);
	}
}