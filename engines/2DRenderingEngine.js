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
		this._viewPort.context.drawImage(this.prerenderEntity(this.balls[i]), this.balls[i].getX(), this.balls[i].getY());
	}
};


/**
 * prerenderEntity 
 *
 * Prerenders the Entity creating a Image object representing it.  
 * This method recursively calls itself with each entities children
 *
 * @param Entity, Entity, Entity, Entity, Entity
 * @return void
 */
zen.engines.TwoDRenderingEngine.prototype.prerenderEntity = function (entity) {
	//Now begin prerendering of this entity by rendering it
	if (entity.isModified() || !this.cache[entity.getID()]) {
		//First loop through children and prerender them so they are ready us to prerender
		var childIterator = entity.iterator();

		while (childIterator.hasNext()) {
			var child = childIterator.next();
			if (child.isModified()) {
				this.prerenderEntity(child);
			}
		};

		//Set the Entity isModified to False so we don't re-create the pre-render next time
		entity.setModified(false);

		//Create a ImageData Object from the PixelData Array
		var imageData = this._prerenderViewPort.context.createImageData(entity.getWidth(), entity.getHeight());

		//Loop through each Pixel in the Pixel Data
		//TODO: Update EntitityViews to use ImageData Objects so this step won't be neccassary anymore
		for (var x in entity.view._pixelData) {
			for (var y in entity.view._pixelData[x]) {
				var index = (y * (entity.getWidth() * 4)) + (x * 4);
				imageData.data[index] = entity.view._pixelData[x][y][0];
				imageData.data[index + 1] = entity.view._pixelData[x][y][1];
				imageData.data[index + 2] = entity.view._pixelData[x][y][2];
				imageData.data[index + 3] = 255; //Temp: Set the Alpha to 255 to prevent Transparencty
			}
		}

		//Put the Entity in the Prerender View Port
		this._prerenderViewPort.setSize(entity.getWidth(), entity.getHeight());
		this._prerenderViewPort.context.putImageData(imageData, 
			0, 0);

		//Now put in all the children into the Prerender View Port
		var child2Iterator = entity.iterator();
		while (child2Iterator.hasNext()) {
			var child = child2Iterator.next();
			this._prerenderViewPort.context.drawImage(this.cache[child.getID()], 
				child.getX(), child.getY());
		};

		//Grab a Image representation of the Entity from the Pre-render view port
		var entityImage = this._prerenderViewPort.getImage();

		//Add the Entity Image to the Cache
		this.cache[entity.getID()] = entityImage;

		//Return the newly created Image 
		return entityImage;
	} else {
		//Return the cached copy
		return this.cache[entity.getID()];
	}
},

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