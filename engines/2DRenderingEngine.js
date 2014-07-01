/**
 *
 * 2DRenderingEngine.js
 *
 * Concrete Rendering Engine for 2D Grahpics
 */

zen.engines.TwoDRenderingEngine = function () {
	zen.engines.RenderingEngine.call(this);

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
	// for (var i = 0; i < this.balls.length; i ++) {
	// 	this._viewPort.context.drawImage(this.prerenderEntity(this.balls[i]), this.balls[i].getX(), this.balls[i].getY());
	// }
	// 
	//Loop through the Cameras & Render them
	//TODO: Render Cameras in proper order
	for (var i in this.cameras) {
		var camera = this.cameras[i].camera;
		var cameraMeta = this.cameras[i];
		var scene = camera.getScene();

		this._cameraPrerenderViewPort.setSize(camera.getFOV().w, camera.getFOV().h);
		this._cameraPrerenderViewPort.clear();

		this._cameraPrerenderViewPort.context.drawImage(this.prerenderEntity(scene), (0 - camera.getViewPoint().y), (0 - camera.getViewPoint().x));

		this._viewPort.context.drawImage(this._cameraPrerenderViewPort.getImage(), cameraMeta.x, cameraMeta.y, cameraMeta.width, cameraMeta.height);
	}

	//Loop through the Static Entities & Render them
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

		var foundTexture = false;

		//Create a ImageData Object from the PixelData Array
		if (entity.collectTextures().length > 0) {
			var imageData = entity.collectTextures()[0].getData();
			foundTexture = true;
		} else {
			var imageData = this._prerenderViewPort.context.createImageData(entity.getWidth(), entity.getHeight());			
		}

		//Put the Entity in the Prerender View Port
		this._prerenderViewPort.setSize(entity.getWidth(), entity.getHeight());
		if (foundTexture) {
			this._prerenderViewPort.context.drawImage(imageData, 
				0, 0);
		} else {
			this._prerenderViewPort.context.putImageData(imageData, 
				0, 0);
		}

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