 import {RenderingEngine} from "./";
import {Camera, Iterator, Color, Coordinate} from "../utils";
import {Entity} from "../entities";
import {
	Dimension
} from '../interfaces';

export class TwoDimensionalRenderingEngine extends RenderingEngine {
	public debugRegions : boolean;

	protected _renderEntity (entity: Entity, camera? : Camera) : boolean {
		//Render this

		//First, make sure it's in the camera...  Don't want to waste our time on things that are not..
		//TODO: CLean up this Camera stuff a bit so _renderEntity isn't aware of cameras...
		if (camera) {
			var viewPoint: Coordinate = camera.getViewPoint();
			var fov: Dimension = camera.getFOV();
			var renderOrigin: Coordinate = camera.getRenderOrigin();
			var renderDimension: Dimension = camera.getRenderDimension();

			var collidesYAxis = false;
			var collidesXAxis = false;

			var cameraBounds = {
				x: viewPoint.getX(),
				y: viewPoint.getY(),
				x2: viewPoint.getX() + fov.width,
				y2: viewPoint.getY() + fov.height
			};

			var entityBounds = {
				x: entity.getAbsoluteX(),
				y: entity.getAbsoluteY(),
				x2: entity.getAbsoluteX2(),
				y2: entity.getAbsoluteY2()
			};

		    //if ((entityBounds.x < cameraBounds.x2 && entityBounds.x2 > cameraBounds.x)
		    //    || (entityBounds.x2 > cameraBounds.x && entityBounds.x < cameraBounds.x2)) {
		    //    collidesXAxis = true;
		    //}

		    //if ((entityBounds.y < cameraBounds.y2 && entityBounds.y2 > cameraBounds.y)
		    //    || (entityBounds.y2 > cameraBounds.y && entityBounds.y < cameraBounds.y2)) {
		    //     collidesYAxis = true;
		    // }


			////We'll check to see if the entity collides in the cameras x and y axis, if both, it's visible.
			//if (!collidesYAxis || !collidesXAxis) {
			//	// console.log("Found an entity outside the cameras view, ignoring!", entity);
			//	//Not visible in the camera, do not continue rendering this entity or it's children
			//	return false;
			//}

            if (!this._entityInCamera(entity, camera)) {
                return false;
            }

			// if (entity.collectTextures().length > 0) {
			
			//Next, we figure out what parts of it are in the camera, so we can clip it if need be
			//Check for Left Clip
			var leftClip = 0;
			if (entity.getAbsoluteX() < viewPoint.getX()) {
				leftClip = viewPoint.getX() - entity.getAbsoluteX();
			}
			// console.log("Left Clip", leftClip);

			//Check for Right Clip
			var rightClip = 0;
			if (entity.getAbsoluteX2() > (viewPoint.getX() + fov.width)) {
				rightClip = entity.getAbsoluteX2() - (viewPoint.getX() + fov.width);
			}
			// console.log("Right Clip", rightClip);

			//Check for Top Clip
			var topClip = 0;
			if (entity.getAbsoluteY() < viewPoint.getY()) {
				topClip = viewPoint.getY() - entity.getAbsoluteY();
			}
			// console.log("Top Clip", topClip);


			//Check for Bottom Clip
			var bottomClip = 0;
			if (entity.getAbsoluteY2() > (viewPoint.getY() + fov.height)) {
				bottomClip = entity.getAbsoluteY2() - (viewPoint.getY() + fov.height);
			}
			// console.log("Bottom Clip", bottomClip);

			//Now we figure out how to skew the rendering, since the render dimensions of the camera may not match it's fov
			var xModifier = fov.width / renderDimension.width;
			var yModifier = fov.height / renderDimension.height;

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

			var x = renderOrigin.getX() + cameraRelativeX;
			var y = renderOrigin.getY() + cameraRelativeY;
			var w = clippedEntityWidth / xModifier;
			var h = clippedEntityHeight / yModifier;

			//Rendering time!
			if (entity.getColor()) {
				//Draw a rect in its place...
				var color: Color = entity.getColor();
				this.getViewPort().getContext().fillStyle = color.toString();
				this.getViewPort().getContext().fillRect(x, y, w, h);
			}

			//Debug Flag
			if (this.debugRegions) {
				var regions: Entity[][][] = entity.getRegions();
				for (var x_i in regions) {
					for (var y_i in regions[x]) {
						if (regions[x_i][y_i].length > 0) { 
							// this._viewPort.context.fillStyle = "rgb(" + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + "," + Math.floor((Math.random() * 255) + 1) + ")";
							this.getViewPort().getContext().strokeStyle = "red";
							this.getViewPort().getContext().strokeRect(entity.getAbsoluteX() + entity.getRegionDimension().width * parseInt(x_i), entity.getAbsoluteY() + entity.getRegionDimension().height * parseInt(y_i), entity.getRegionDimension().width, entity.getRegionDimension().height);
						}
					}
				}
				// Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)
			}

			if (entity.getTexture()) {
				//TODO: Grab the Cached version of it if available, 
				var imageData = entity.getTexture().getData();

				var entityToImageYModifier = imageData.height / entity.getHeight();
				var entityToImageXModifier = imageData.width / entity.getWidth();

				var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

				var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

				this.getViewPort().getContext().drawImage(imageData, leftClip * entityToImageXModifier , topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h)
			}

		} else {
			//TODO: Split up code so 2d rendering code isn't copied for HUD Entities
			//No camera, static entities relative to the canvas
			var x = entity.getX();
			var y = entity.getY();
			var w = entity.getWidth();
			var h = entity.getHeight();

			//Rendering time!
			if (entity.getColor()) {
				//Draw a rect in its place...
				var color: Color = entity.getColor();
				this.getViewPort().getContext().fillStyle = color.toString();
				this.getViewPort().getContext().fillRect(x, y, w, h);
			}

			if (entity.getTexture()) {
				//TODO: Grab the Cached version of it if available, 
				var imageData = entity.getTexture().getData();

				var entityToImageYModifier = imageData.height / entity.getHeight();
				var entityToImageXModifier = imageData.width / entity.getWidth();

				var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

				var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

				this.getViewPort().getContext().drawImage(imageData, x, y, w, h)
			}
		}


		//TODO: Update this to render entities top-down
		//TODO: Only navigate if isModified
		var children = entity.getChildren();

		while (children.hasNext()) {
			this._renderEntity(children.next(), camera);
		}
		return true;
    }

    protected _entityInCamera(entity: Entity, camera: Camera): boolean {
        var viewPoint: Coordinate = camera.getViewPoint();
        var fov: Dimension = camera.getFOV();
        var entityPosition : Coordinate = entity.getPosition();
        var entityOuterPosition: Coordinate = entity.getOuterPosition();
        var cameraBounds = {
            x: viewPoint.getX(),
            y: viewPoint.getY(),
            x2: viewPoint.getX() + fov.width,
            y2: viewPoint.getY() + fov.height
        };
        var collidesXAxis: boolean = false;
        var collidesYAxis: boolean = false;

        if ((entityPosition.getX() < cameraBounds.x2 && entityOuterPosition.getX() > cameraBounds.x)
            || (entityOuterPosition.getX() > cameraBounds.x && entityPosition.getX() < cameraBounds.x2)) {
		    collidesXAxis = true;
	    }

        if ((entityPosition.getY() < cameraBounds.y2 && entityOuterPosition.getY() > cameraBounds.y)
            || (entityOuterPosition.getY() > cameraBounds.y && entityPosition.getY() < cameraBounds.y2)) {
		        collidesYAxis = true;
		    }


	    //We'll check to see if the entity collides in the cameras x and y axis, if both, it's visible.
        return collidesYAxis && collidesXAxis;
    }
}
