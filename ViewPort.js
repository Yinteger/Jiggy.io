/**
 *
 * ViewPort.js
 *
 * Creates and acts as a interface to a DOM Canvas object.
 */

zen.ViewPort = function () {
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.resizable = false;
	this.width = 0;
	this.height = 0;
};

/**
 * getCanvas 
 *
 * Gets the HTML Canvas DOM Object that this ViewPort is a interface to.
 * This method should only be called to add the Canvas to the dom.
 *
 * @param none
 * @return Canvas DOM
 */
zen.ViewPort.prototype.getCanvas = function () {
	return this.canvas;
};

/**
 * setSize 
 *
 * Sets the size of the canvas in pixels
 *
 * @param width, Number, pixels for Width
 * @param height, Number, pixels for Height
 * @return void
 */
zen.ViewPort.prototype.setSize = function (width, height) {
	//First, set the variables for reference
	this.width = width === undefined ? this.width : width;
	this.height = height === undefined ?  this.height : height;

	//Update the Canvas dimensions
	this.canvas.setAttribute('width', this.width + "px");
	this.canvas.setAttribute('height', this.height + "px");
};

/**
 * clear 
 *
 * Clears the Canvas to prepare for a redraw
 *
 * @param none
 * @return void
 */
zen.ViewPort.prototype.clear = function () {
	this.context.clearRect(0, 0, this.width, this.height);
};