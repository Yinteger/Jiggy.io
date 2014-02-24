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
 	this.fps = 0;
 	this.frames = [];
 	this.showFPS = true;
 	this.lastRender; //Variable that stores a Date of the last Render
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
		this._requestFrame();
	} else {
		console.warn('Unable to begin rendering, no view port assigned to rendering engine.');
	}
};

/**
 * _requestFrame 
 *
 * Requests a Animation Frame from the browser
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype._requestFrame = function () {
	var self = this;
	if (this.rendering) {
		this.animationFameID = window.requestAnimationFrame(function () {
			self._render();
			self._postRender();
		});
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
	window.cancelAnimationFrame(this.animationFrameID);
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
};

/**
 * _calculateFPS 
 *
 * Calculates the Frames Per Second by adding to a counter and resetting it each new second
 * since this method will be called after each render.
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype._calculateFPS = function () {
	var date = new Date(); //Get current Date/Time

	if (this.lastRender) { //If we have a store Date/Time from last rendering

		if (this.lastRender.getSeconds() != date.getSeconds()) { //This is a new second, calculate the average FPS for the last second and display it
			var avg = 0;
			for (var i in this.frames) {
				avg += this.frames[i];
			}
			this.fps = this.frames;
			this.frames = 1;
		} else { //It's the same second as last render, just add the FPS to an array so we can calculate the Average later
			this.frames += 1;
		}
	}

	this.lastRender = date;
};

/**
 * _postRender 
 *
 * Do post render tasks like show FPS or call PostProcessors
 *
 * @param none
 * @return void
 */
zen.engines.RenderingEngine.prototype._postRender = function () {
	//TODO: Call PostProcessors here

	if (this.showFPS) {
		//Calculate the FPS
		this._calculateFPS();

		//Draw the FPS on the screen
		var ctx = this._viewPort.context;
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,100,35);
		ctx.fillStyle = 'white';
		ctx.font="20px Georgia";
		ctx.fillText(this.fps + " FPS",20,25);
	}

	//Start request for next frame
	this._requestFrame();
};