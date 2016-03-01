/**
 *
 * 2DRenderingEngine.js
 *
 * Concrete Rendering Engine for 2D Grahpics
 */

zen.engines.TwoDRenderingEngine = function () {
	zen.engines.RenderingEngine.call(this);
	this.debugRegions = false;
	this.debugCamera = false;;

	//The cache is a collection of imageData Objects for each Entity that has been created
	//from previous renders.  We store the imageData so we don't need to re-create it each render
	// unless the entity has changed in some way.;
	this.cache = {};
};

zen.extends(zen.engines.RenderingEngine, zen.engines.TwoDRenderingEngine);

zen.engines.TwoDRenderingEngine.prototype._render = function () {
	var context = this._viewPort.context;

	zen.engines.RenderingEngine.prototype._render.call(this);

	//TODO: Render Cameras in proper order
	for (var i in this.cameras) {
		this._renderCamera(this.cameras[i])
	}

	//Render HUD Entity
	if (this.HUDEntity) {
		this._renderEntity(this.HUDEntity, null);
	}
};

zen.engines.TwoDRenderingEngine.prototype._renderCamera = function (camera) {
	var scene = camera.getScene();
	var context = this._viewPort.context;

	if (this.debugCamera) {
		//For Debugging purposes.. Draw a rect where each camera should be
		context.beginPath();
		context.rect(camera.getViewPoint().x, camera.getViewPoint().y, camera.getFOV().width, camera.getFOV().height);
		context.lineWidth = 7;
		context.strokeStyle = 'red';
		context.stroke();

		context.beginPath();
		context.rect(camera.getRenderOrigin().x, camera.getRenderOrigin().y, camera.getRenderDimension().width, camera.getRenderDimension().height);
		context.lineWidth = 7;
		context.fillStyle = 'black';
		context.fill();
		context.strokeStyle = 'green';
		context.stroke();
	}

	this._renderEntity(scene, camera);		
};

//Renders an entity into the canvas based on the camera it's visible in
zen.engines.TwoDRenderingEngine.prototype._renderEntity = function (entity, camera) {
	//Render this

	//First, make sure it's in the camera...  Don't want to waste our time on things that are not..
	//TODO: CLean up this Camera stuff a bit so _renderEntity isn't aware of cameras...
	if (camera) {
		var collidesYAxis = false;
		var collidesXAxis = false;

		var cameraBounds = {
			x: camera.getViewPoint().x,
			y: camera.getViewPoint().y,
			x2: camera.getViewPoint().x + camera.getFOV().width,
			y2: camera.getViewPoint().y + camera.getFOV().height
		};

		var entityBounds = {
			x: entity.getAbsoluteX(),
			y: entity.getAbsoluteY(),
			x2: entity.getAbsoluteX2(),
			y2: entity.getAbsoluteY2()
		};

	    if ((entityBounds.x < cameraBounds.x2 && entityBounds.x2 > cameraBounds.x)
	        || (entityBounds.x2 > cameraBounds.x && entityBounds.x < cameraBounds.x2)) {
	        collidesXAxis = true;
	    }

	    if ((entityBounds.y < cameraBounds.y2 && entityBounds.y2 > cameraBounds.y)
	        || (entityBounds.y2 > cameraBounds.y && entityBounds.y < cameraBounds.y2)) {
	         collidesYAxis = true;
	     }


		//We'll check to see if the entity collides in the cameras x and y axis, if both, it's visible.
		if (!collidesYAxis || !collidesXAxis) {
			// console.log("Found an entity outside the cameras view, ignoring!", entity);
			//Not visible in the camera, do not continue rendering this entity or it's children
			return false;
		}

		// if (entity.collectTextures().length > 0) {
		
		//Next, we figure out what parts of it are in the camera, so we can clip it if need be
		//Check for Left Clip
		var leftClip = 0;
		if (entity.getAbsoluteX() < camera.getViewPoint().x) {
			leftClip = camera.getViewPoint().x - entity.getAbsoluteX();
		}
		// console.log("Left Clip", leftClip);

		//Check for Right Clip
		var rightClip = 0;
		if (entity.getAbsoluteX2() > (camera.getViewPoint().x + camera.getFOV().width)) {
			rightClip = entity.getAbsoluteX2() - (camera.getViewPoint().x + camera.getFOV().width);
		}
		// console.log("Right Clip", rightClip);

		//Check for Top Clip
		var topClip = 0;
		if (entity.getAbsoluteY() < camera.getViewPoint().y) {
			topClip = camera.getViewPoint().y - entity.getAbsoluteY();
		}
		// console.log("Top Clip", topClip);


		//Check for Bottom Clip
		var bottomClip = 0;
		if (entity.getAbsoluteY2() > (camera.getViewPoint().y + camera.getFOV().height)) {
			bottomClip = entity.getAbsoluteY2() - (camera.getViewPoint().y + camera.getFOV().height);
		}
		// console.log("Bottom Clip", bottomClip);

		//Now we figure out how to skew the rendering, since the render dimensions of the camera may not match it's fov
		var xModifier = camera.getFOV().width / camera.getRenderDimension().width;
		var yModifier = camera.getFOV().height / camera.getRenderDimension().height;

		var cameraRelativeY = (entityBounds.y - cameraBounds.y) / yModifier;
		if (cameraRelativeY < 0) {
			cameraRelativeY = 0;
		}

		var cameraRelativeX = (entityBounds.x - cameraBounds.x) / xModifier;
		if (cameraRelativeX < 0) {
			cameraRelativeX = 0;
		}

		var clippedEntityHeight = (entity.getHeight() - topClip - bottomClip);
		var clippedEntityWidth = (entity.getWidth() - rightClip - leftClip);

		var x = camera.getRenderOrigin().x + cameraRelativeX;
		var y = camera.getRenderOrigin().y + cameraRelativeY;
		var w = clippedEntityWidth / xModifier;
		var h = clippedEntityHeight / yModifier;

		//Rendering time!  What a work out
		if (entity.getColor()){
			//Draw a rect in its place...
			var color = entity.getColor();
			this._viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
			this._viewPort.context.fillRect(x, y, w, h);
		}

		//Debug Flag
		if (this.debugRegions) {
			for (var x in entity.regions) {
				for (var y in entity.regions[x]) {
					if (entity.regions[x][y].length > 0) { 
						// this._viewPort.context.fillStyle = "rgb(" + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + ")";
						this._viewPort.context.strokeStyle = "red";
						this._viewPort.context.strokeRect(entity.getAbsoluteX() + entity.regionDimension.width * x, entity.getAbsoluteY() + entity.regionDimension.height * y, entity.regionDimension.width, entity.regionDimension.height);
					}
				}
			}
			// Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)
		}

		if (entity.hasTexture()) {
			//TODO: Grab the Cached version of it if available, 
			var imageData = entity.getTexture().getData();

			var entityToImageYModifier = imageData.height / entity.getHeight();
			var entityToImageXModifier = imageData.width / entity.getWidth();

			var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

			var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

			this._viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier , topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h)
		}

	} else {
		var x = entity.getX();
		var y = entity.getY();
		var w = entity.getWidth();
		var h = entity.getHeight();


		if (entity.hasTexture()) {
			//TODO: Grab the Cached version of it if available, 
			var imageData = entity.getTexture().getData();

			var entityToImageYModifier = imageData.height / entity.getHeight();
			var entityToImageXModifier = imageData.width / entity.getWidth();

			var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

			var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

			this._viewPort.context.drawImage(imageData, x, y, w, h)
		}
	}


	//TODO: Update this to render entities top-down
	//TODO: Only navigate if isModified
	for (var i in entity.children) { //TODO : Update this to not loop through all children, just ones in the visible regions of this entity (Efficency)
		this._renderEntity(entity.children[i], camera);
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
// zen.engines.TwoDRenderingEngine.prototype.prerenderEntity = function (entity) {
// 	//Now begin prerendering of this entity by rendering it
// 	if (entity.isModified() || !this.cache[entity.getID()]) {
// 		//First loop through children and prerender them so they are ready us to prerender
// 		var childIterator = entity.iterator();

// 		// console.warn(entity);

// 		while (childIterator.hasNext()) {
// 			var child = childIterator.next();
// 			if (child.isModified()) {
// 				this.prerenderEntity(child);
// 			}
// 		};

// 		//Set the Entity isModified to False so we don't re-create the pre-render next time
// 		entity.setModified(false);

// 		var foundTexture = false;

// 		//Create a ImageData Object from the PixelData Array
// 		if (entity.collectTextures().length > 0) {
// 			var imageData = entity.collectTextures()[0].getData();
// 			foundTexture = true;
// 		} else {
// 			var imageData = this._prerenderViewPort.context.createImageData(entity.getWidth(), entity.getHeight());			
// 		}

// 		//Put the Entity in the Prerender View Port
// 		this._prerenderViewPort.setSize(entity.getWidth(), entity.getHeight());
// 		if (foundTexture) {
// 			this._prerenderViewPort.context.drawImage(imageData, 
// 				0, 0);
// 		} else {
// 			this._prerenderViewPort.context.putImageData(imageData, 
// 				0, 0);
// 		}

// 		//Now put in all the children into the Prerender View Port
// 		var child2Iterator = entity.iterator();
// 		while (child2Iterator.hasNext()) {
// 			var child = child2Iterator.next();
// 			this._prerenderViewPort.context.drawImage(this.cache[child.getID()], 
// 				child.getX(), child.getY());
// 		};

// 		//Grab a Image representation of the Entity from the Pre-render view port
// 		var entityImage = this._prerenderViewPort.getImage();

// 		//Add the Entity Image to the Cache
// 		this.cache[entity.getID()] = entityImage;

// 		//Return the newly created Image 
// 		return entityImage;
// 	} else {
// 		//Return the cached copy
// 		return this.cache[entity.getID()];
// 	}
// };