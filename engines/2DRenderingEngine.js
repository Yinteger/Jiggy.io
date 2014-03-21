/**
 *
 * 2DRenderingEngine.js
 *
 * Concrete Rendering Engine for 2D Grahpics
 */

zen.engines.TwoDRenderingEngine = function () {
	zen.engines.RenderingEngine.call(this);
	this.balls = [];
	//The cache is a collection of imageData Objects for each Entity that has been created
	//from previous renders.  We store the imageData so we don't need to re-create it each render
	// unless the entity has changed in some way.;
	this.cache = {};
};

zen.extends(zen.engines.RenderingEngine, zen.engines.TwoDRenderingEngine);

zen.engines.TwoDRenderingEngine.prototype._render = function () {
	var context = this._viewPort.context;

	zen.engines.RenderingEngine.prototype._render.call(this);

	//Loop through entities and render them
	//TODO: Once Camera is Ready, get Entities from Camera and don't store them in the engine
	for (var i = 0; i < this.balls.length; i ++) {
		if (this.balls[i].isModified() || !this.cache[this.balls[i].getID()]) {
			this.balls[i].setModified(false);
			var ball = context.createImageData(this.balls[i].getWidth(), this.balls[i].getHeight());
			for (var x in this.balls[i].view._pixelData) {
				for (var y in this.balls[i].view._pixelData[x]) {
					var index = (y * (this.balls[i].getWidth() * 4)) + (x * 4);
					ball.data[index] = this.balls[i].view._pixelData[x][y][0];
					ball.data[index + 1] = this.balls[i].view._pixelData[x][y][1];
					ball.data[index + 2] = this.balls[i].view._pixelData[x][y][2];
					ball.data[index + 3] = 255; //Temp: Set the Alpha to 255 to prevent Transparencty
				}

			}
			// this.cache[this.balls[i].getID()] = ball;
		}

		// context.putImageData(this.cache[this.balls[i].getID()], 
		// 	this.balls[i].getX(), this.balls[i].getY());
		if (!this.cache[this.balls[i].getID()]) {
			this._prerenderViewPort.setSize(this.balls[i].getWidth(), this.balls[i].getHeight());
			this._prerenderViewPort.context.putImageData(ball, 
				0, 0);
			var entityImage = this._prerenderViewPort.getImage();
			this.cache[this.balls[i].getID()] = entityImage;
		} else {
			var entityImage = this.cache[this.balls[i].getID()];
		}
		this._viewPort.context.drawImage(entityImage, this.balls[i].getX(), this.balls[i].getY());
	}
};

/**
 * addBall 
 *
 * Hacked testing code for engine until we have Cameras and Entities
 *
 * @param none
 * @return void
 */
zen.engines.TwoDRenderingEngine.prototype.addBall = function (ball) {
	this.balls.push(ball);
};

zen.engines.TwoDRenderingEngine.prototype.removeBall = function (ball) {
	this.balls.splice(this.balls.indexOf(ball), 1);
}