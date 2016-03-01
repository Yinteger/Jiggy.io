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
	this.autoSize = false; //Auto sizes View
	this.autoSizeTimer; //Timer to check to see if parent size has changed
	this.observer = new zen.util.Observer();
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

zen.ViewPort.prototype.setScale = function (w, h) {
	this.context.scale(w, h);
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

	this.observer.fireEvent('resize', {
		newSize: new zen.data.Dimension(width, height)
	});
};

/**
 * setAutoSize 
 *
 * Sets the ViewPort to automatically resize to the parents dimensions
 * And watches for when the parents dimensions change, to resize itself.
 *
 * @param state, boolean, to auto size or not.
 * @return void
 */
zen.ViewPort.prototype.getSize = function () {
	return new zen.data.Dimension(this.canvas.offsetWidth, this.canvas.offsetHeight);
};

/**
 * setAutoSize 
 *
 * Sets the ViewPort to automatically resize to the parents dimensions
 * And watches for when the parents dimensions change, to resize itself.
 *
 * @param state, boolean, to auto size or not.
 * @return void
 */
zen.ViewPort.prototype.setAutoSize = function (state) {
	var self = this;

	if (this.autoSizeTimer) {
		clearInterval(this.autoSizeTimer);
	}

	if (state) {
		self._checkForParentSizeChange();
		this.autoSizeTimer = setInterval(function () {
			self._checkForParentSizeChange();
		}, 100);
	}
};

zen.ViewPort.prototype._checkForParentSizeChange = function (state) {
	if (this.canvas.parentNode) {
		var size = this.getSize();
		var parent_size = new zen.data.Dimension(this.canvas.parentNode.offsetWidth, this.canvas.parentNode.offsetHeight);
		if (size.width != parent_size.width || size.height != parent_size.height) {
			this.setSize(parent_size.width, parent_size.height);
		}
	}
};

zen.ViewPort.prototype.addEventListener = function (event, func) {
	this.observer.addHandler(event, func);
};

zen.ViewPort.prototype.removeEventListener = function (event, func) {
	this.observer.addHandler(event, func);
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

zen.ViewPort.prototype.drawImage = function (img, clip_x, clip_y, clip_width, clip_height, x, y, width, height) {
	this.context.drawImage(img, clip_x, clip_y, clip_width, clip_height, x, y, width, height);
};

zen.ViewPort.prototype.setFont = function (font) {
	this.context.font = font;
};

zen.ViewPort.prototype.setColor = function (color) {
	this.context.fillStyle = color;
};

zen.ViewPort.prototype.measureText = function (text) {
	return this.context.measureText(text);
};

zen.ViewPort.prototype.setTextBaseline = function (baseline) {
	this.context.textBaseline = baseline;
};

zen.ViewPort.prototype.drawText = function (text, x, y, maxWidth) {
	this.context.fillText(text, x, y, maxWidth);
};

zen.ViewPort.prototype.setHidden = function () {
	this.canvas.style.position = "absolute";
	this.canvas.style.left = '110001px';
};

/**
 * getImage 
 *
 * Gets a Image Object representing what the ViewPort currently looks like
 *
 * @param none
 * @return Image
 */
zen.ViewPort.prototype.getImage = function () {
	var image = new Image();
	image.src = this.canvas.toDataURL("image/png");
	return image;
	// return this.context.getImageData(0, 0, this.width, this.height);
};