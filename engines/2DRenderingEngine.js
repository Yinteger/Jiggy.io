/**
 *
 * 2DRenderingEngine.js
 *
 * Concrete Rendering Engine for 2D Grahpics
 */

zen.engines.TwoDRenderingEngine = function () {
	zen.engines.RenderingEngine.call(this);
	this.balls = [];
};

zen.extends(zen.engines.RenderingEngine, zen.engines.TwoDRenderingEngine);

zen.engines.TwoDRenderingEngine.prototype._render = function () {
	var context = this._viewPort.context;

	zen.engines.RenderingEngine.prototype._render.call(this);
	for (var i in this.balls) {
		var ball = this.balls[i];
		var radius = 10;
		context.beginPath();
		context.arc(ball.x, ball.y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = ball.color;
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = 'black';
		context.stroke();	}
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