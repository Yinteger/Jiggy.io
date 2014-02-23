/**
 *
 * RenderingEngine.js
 *
 * Abstract rendering engine class for concrete engines to extend
 */

 zen.engines.RenderingEngine = function () {
 	this._viewPort = null;
 	this.animationFrameID;
 	this.rendering = false;
 };

/**
 * setViewPort 
 *
 * Sets the View Port for this engine to render into
 *
 * @param viewPort, ViewPort
 * @return void
 */
zen.engines.RenderingEngine.prototype.setViewPort = function (viewPort) {
	this._viewPort = viewPort;
};

/**
 * startRendering 
 *
 * Starts the Rendering Timer
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype.startRendering = function () {
	if (this._viewPort) {
		var self = this;
		this.rendering = true;
		this._render();
	} else {
		console.warn('Unable to begin rendering, no view port assigned to rendering engine.');
	}
};

/**
 * stopRendering 
 *
 * Stop the Rendering Timer
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype.stopRendering = function () {
	window.cancelRequestAnimationFrame(this.animationFrameID);
	this.animationFrameID = null;
	this.rendering = false;
};

/**
 * _render 
 *
 * Abstract Method which renders the into the ViewPort.  Overwritten by each concerete class but should still call the parent method.
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype._render = function () {
	var self = this;

	//Clear Canvas
	this._viewPort.clear();

	//Request Animation Frame for next animation
	if (this.rendering) {
		this.animationFameID = window.requestAnimationFrame(function () {
			self._render();
		});
	}
};