import RenderingEngine from "./RenderingEngine";
import Camera from "../Utils/Camera";
import Entity from "../Entities/Entity";
import Iterator from "../Utils/Iterator";


export default class TwoDRenderingEngine extends RenderingEngine {
	public debugRegions : boolean;
	public debugCamera : boolean;

	protected _render () : void {
		super._render();

		var context = this.viewPort.context;

		//TODO: Render Cameras in proper order
		for (var i in this._cameras) {
			this._renderCamera(this._cameras[i])
		}

		//Render HUD Entity
		if (this.HUDEntity) {
			this._renderEntity(this.HUDEntity, null);
		}
	}

	private _renderCamera (camera : Camera) : void {
		var scene = camera.scene;
		var context = this.viewPort.context;

		if (this.debugCamera) {
			//For Debugging purposes.. Draw a rect where each camera should be
			context.beginPath();
			context.rect(camera.viewPoint.x, camera.viewPoint.y, camera.fov.width, camera.fov.height);
			context.lineWidth = 7;
			context.strokeStyle = 'red';
			context.stroke();

			context.beginPath();
			context.rect(camera.renderOrigin.x, camera.renderOrigin.y, camera.renderDimension.width, camera.renderDimension.height);
			context.lineWidth = 7;
			context.fillStyle = 'black';
			context.fill();
			context.strokeStyle = 'green';
			context.stroke();
		}

		this._renderEntity(scene, camera);	
	}

	private _renderEntity (entity: Entity, camera? : Camera) : boolean {
		//Render this

		//First, make sure it's in the camera...  Don't want to waste our time on things that are not..
		//TODO: CLean up this Camera stuff a bit so _renderEntity isn't aware of cameras...
		if (camera) {
			var collidesYAxis = false;
			var collidesXAxis = false;

			var cameraBounds = {
				x: camera.viewPoint.x,
				y: camera.viewPoint.y,
				x2: camera.viewPoint.x + camera.fov.width,
				y2: camera.viewPoint.y + camera.fov.height
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
			if (entity.getAbsoluteX() < camera.viewPoint.x) {
				leftClip = camera.viewPoint.x - entity.getAbsoluteX();
			}
			// console.log("Left Clip", leftClip);

			//Check for Right Clip
			var rightClip = 0;
			if (entity.getAbsoluteX2() > (camera.viewPoint.x + camera.fov.width)) {
				rightClip = entity.getAbsoluteX2() - (camera.viewPoint.x + camera.fov.width);
			}
			// console.log("Right Clip", rightClip);

			//Check for Top Clip
			var topClip = 0;
			if (entity.getAbsoluteY() < camera.viewPoint.y) {
				topClip = camera.viewPoint.y - entity.getAbsoluteY();
			}
			// console.log("Top Clip", topClip);


			//Check for Bottom Clip
			var bottomClip = 0;
			if (entity.getAbsoluteY2() > (camera.viewPoint.y + camera.fov.height)) {
				bottomClip = entity.getAbsoluteY2() - (camera.viewPoint.y + camera.fov.height);
			}
			// console.log("Bottom Clip", bottomClip);

			//Now we figure out how to skew the rendering, since the render dimensions of the camera may not match it's fov
			var xModifier = camera.fov.width / camera.renderDimension.width;
			var yModifier = camera.fov.height / camera.renderDimension.height;

			var cameraRelativeY = (entityBounds.y - cameraBounds.y) / yModifier;
			if (cameraRelativeY < 0) {
				cameraRelativeY = 0;
			}

			var cameraRelativeX = (entityBounds.x - cameraBounds.x) / xModifier;
			if (cameraRelativeX < 0) {
				cameraRelativeX = 0;
			}

			var clippedEntityHeight = (entity.height - topClip - bottomClip);
			var clippedEntityWidth = (entity.width - rightClip - leftClip);

			var x = camera.renderOrigin.x + cameraRelativeX;
			var y = camera.renderOrigin.y + cameraRelativeY;
			var w = clippedEntityWidth / xModifier;
			var h = clippedEntityHeight / yModifier;

			//Rendering time!  What a work out
			if (entity.color){
				//Draw a rect in its place...
				var color = entity.color;
				this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
				this.viewPort.context.fillRect(x, y, w, h);
			}

			//Debug Flag
			if (this.debugRegions) {
				for (var x_i in entity.regions) {
					for (var y_i in entity.regions[x]) {
						if (entity.regions[x_i][y_i].length > 0) { 
							// this._viewPort.context.fillStyle = "rgb(" + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + ")";
							this.viewPort.context.strokeStyle = "red";
							this.viewPort.context.strokeRect(entity.getAbsoluteX() + entity.regionDimension.width * parseInt(x_i), entity.getAbsoluteY() + entity.regionDimension.height * parseInt(y_i), entity.regionDimension.width, entity.regionDimension.height);
						}
					}
				}
				// Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)
			}

			if (entity.texture) {
				//TODO: Grab the Cached version of it if available, 
				var imageData = entity.texture.getData();

				var entityToImageYModifier = imageData.height / entity.height;
				var entityToImageXModifier = imageData.width / entity.width;

				var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

				var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

				this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier , topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h)
			}

		} else {
			var x = entity.x;
			var y = entity.y;
			var w = entity.width;
			var h = entity.height;


			if (entity.texture) {
				//TODO: Grab the Cached version of it if available, 
				var imageData = entity.texture.getData();

				var entityToImageYModifier = imageData.height / entity.height;
				var entityToImageXModifier = imageData.width / entity.width;

				var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

				var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

				this.viewPort.context.drawImage(imageData, x, y, w, h)
			}
		}


		//TODO: Update this to render entities top-down
		//TODO: Only navigate if isModified
		var children = entity.getChildren();
		// for (var i in entity.children) { //TODO : Update this to not loop through all children, just ones in the visible regions of this entity (Efficency)
		// 	this._renderEntity(entity.children[i], camera);
		// }
		while (children.hasNext()) {
			this._renderEntity(children.next(), camera);
		}
		return true;
	}


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
}
