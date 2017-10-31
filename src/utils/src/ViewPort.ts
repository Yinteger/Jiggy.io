import * as Events from 'events';
import {Dimension} from "@jiggy/interfaces";
import {ViewPortEventTypes, DimensionUpdateEvent} from "./";

export class ViewPort extends Events.EventEmitter {
	private _canvas : HTMLCanvasElement;
	private _context : CanvasRenderingContext2D;
	private _resizable : boolean;
    private _filledPage : boolean;
    private _dimension: Dimension;
    private _resizeListener: () => void;

	public constructor () {
		super();
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('2d');
		this._resizable = false;
		this._dimension = {width: 0, height: 0};
        this._filledPage = false;
	}

	public getCanvas(): HTMLCanvasElement {
		return this._canvas;
	}

	public getContext(): CanvasRenderingContext2D {
		return this._context;
	}

	public setResizable(resizable: boolean): void {
		this._resizable = resizable;
	}

	public isResizable(): boolean {
		return this._resizable;
	}

	public setScale (dimension : Dimension) : void {
		this._context.scale(dimension.width, dimension.height);
	}

    public fillPage (state: boolean) {
        console.log("Test, ", state);
        this._filledPage = state;
        if (state) {
            this._canvas.style.position = "fixed";
            this._canvas.style.top = "0px";
            this._canvas.style.left = "0px";

            this._fillPage();

            this._resizeListener = this._fillPage.bind(this);
            window.addEventListener("resize", this._resizeListener);
        } else {
            //Remove listener if one
            this._canvas.style.position = "";
            window.removeEventListener("reisze", this._resizeListener);
        }
	}

	public isFilledPage () : boolean {
        return this._filledPage;
	}

	public getSize () : Dimension {
		return {width: this._canvas.offsetWidth, height: this._canvas.offsetHeight};
	}

	public setSize (dimension : Dimension) {
		//First, set the variables for reference
		this._dimension = dimension;

		//Update the Canvas dimensions
		this._canvas.setAttribute('width', dimension.width + "px");
		this._canvas.setAttribute('height', dimension.height + "px");

		this.emit('resize', dimension);
	}

	public clear () : void {
		this._context.clearRect(0, 0, this._dimension.width, this._dimension.height);
	}

	public drawImage (img: HTMLImageElement, clip_x : number, clip_y : number, clip_width : number, clip_height : number, x: number, y : number, width : number, height : number) {
		this._context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
	}

	public setFont (font : string) : void {
		this._context.font = font;
	}

	public setColor (color : string) : void {
		this._context.fillStyle = color;
	}

	public measureText (text : string) : TextMetrics {
		return this._context.measureText(text);
	}

	public setTextBaseline (baseline : string) : void {
		this._context.textBaseline = baseline;
	}

	public drawText (text : string, x : number, y : number, maxWidth : number) : void {
		this._context.fillText(text, x, y, maxWidth);
	}

	public setHidden () : void {
		this._canvas.style.position = "absolute";
		this._canvas.style.left = '110001px';
	}
 
	public getImage () : HTMLImageElement {
		var image =  <HTMLImageElement> document.createElement('img');
		image.src = this._canvas.toDataURL("image/png");
		return image;
		// return this.context.getImageData(0, 0, this.width, this.height);
    }

    private _fillPage() {
        var newSize = { width: window.innerWidth, height: window.innerHeight };
        let eventData: DimensionUpdateEvent = {
            type: ViewPortEventTypes.DIMENSION_UPDATE.toString(),
            oldDimensions: this.getSize(),
            newDimensions: newSize,
            source: this
		};
		this.setSize(newSize);
        this.emit(ViewPortEventTypes.DIMENSION_UPDATE.toString(), eventData);
    }
}