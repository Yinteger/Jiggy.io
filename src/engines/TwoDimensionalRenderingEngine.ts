 import {RenderingEngine} from "./";
import {Camera, Iterator, Color, Coordinate} from "../utils";
import { Entity} from "../entities";
import {
	Dimension
} from '../interfaces';

interface entityClippings {
    leftClip: number,
    rightClip: number,
    topClip: number,
    bottomClip: number
}

export class TwoDimensionalRenderingEngine extends RenderingEngine {
    public debugRegions: boolean;
    private _isometricRendering: boolean = false;
    private _rotation = 0;

	protected _renderEntity (entity: Entity, camera? : Camera) : boolean {
        //Positions & Dimensions to work with for the render
        var renderOrigin: Coordinate = camera.getRenderOrigin(); //The origin coordinates in the canvas to render this camera from
        var renderDimension: Dimension = camera.getRenderDimension(); //The origin dimensions in the canvas to render the canvas to
        var cameraFOV = camera.getFOV(); //The current field of view of the Camera
        var entityPosition = this._getEntityCoordinates(entity);
        var entityAbsolutePosition = entityPosition.inner;
        var entityAbsoluteOuterPosition = entityPosition.outer;
        var cameraPosition: Coordinate = camera.getViewPoint(); //The camera's absolute position in the game
        if (this._isometricRendering) {
            cameraPosition = cameraPosition.toIsometric();
        }
        var cameraOuterPosition: Coordinate = new Coordinate(cameraPosition.getX() + camera.getFOV().width, cameraPosition.getY() + camera.getFOV().height);

        //Check if Entity is in the camera's view to continue rendering or discontinue here
        if (!this._isEntityInCamera(entityAbsolutePosition, entityAbsoluteOuterPosition, cameraPosition, cameraOuterPosition)) {
            return false;
        }

		//Calculate the entities clipping
        var entityClippings: entityClippings = this._calculateEntityClipping(entityAbsolutePosition, entityAbsoluteOuterPosition, cameraPosition, cameraOuterPosition);

		//Calculate how much we must skew the render based on the camera's FOV
        var xModifier = cameraFOV.width / renderDimension.width;
        var yModifier = cameraFOV.height / renderDimension.height;
        var zModifier = (xModifier + yModifier) / 2;

        //Calculate the x & y of the entity relative to the camera's view point & fov
        var cameraRelativeY = (entityAbsolutePosition.getY() - cameraPosition.getY()) / yModifier;
		if (cameraRelativeY < 0) {
			cameraRelativeY = 0;
		}

        var cameraRelativeX = (entityAbsolutePosition.getX() - cameraPosition.getX()) / xModifier;
		if (cameraRelativeX < 0) {
			cameraRelativeX = 0;
		}

        //Calculate the Clipped Dimensions of the Entity based on how much of it is outside the camera
        var clippedEntityHeight = (entity.getHeight() - entityClippings.topClip - entityClippings.bottomClip);
        var clippedEntityWidth = (entity.getWidth() - entityClippings.rightClip - entityClippings.leftClip);

        //Calculate the x, y, w, and h to render the entity onto the canvas
        var x = renderOrigin.getX() + cameraRelativeX;
        //if (this._isometricRendering && entity.getParent()) {
        //    x += ((entity.getParent().getWidth()) - entity.getWidth()) / xModifier;
        //}
        var y = renderOrigin.getY() + cameraRelativeY;
        var z = entityAbsolutePosition.getZ() / yModifier;

		var w = clippedEntityWidth / xModifier;
		var h = clippedEntityHeight / yModifier;

        if (this._isometricRendering) {
            w = w * 2;
            y -= z;
            //if (entity.getParent()) {
            //    x += (entity.getParent().getWidth() / 2) * xModifier;
            //}
        }

		//Begin rendering the Entity
        //if (this._isometricRendering) {
        //    if (entity instanceof IsometricTile) {
        //        var tileX = x - (w / 2);
        //        var y2 = y + h;
        //        var x2 = tileX + (w * 2);
        //        //console.log(isoX, isoY, isoX2, isoY2);
        //        //this.viewPort.context.strokeRect(isoX, isoY, isoX2 - isoX, isoY2 - isoY);
        //        //Draw Isometric Layout
        //        this.getViewPort().getContext().beginPath();
        //        //Left Middle
        //        this.getViewPort().getContext().moveTo(tileX + (w / 2), y + ((y2 - y) / 2));
        //        //Top middle
        //        this.getViewPort().getContext().lineTo(tileX + ((x2 - tileX) / 2), y);
        //        //Right Middle
        //        this.getViewPort().getContext().lineTo(x2 - (w / 2), y + ((y2 - y) / 2));
        //        //Bottom Middle
        //        this.getViewPort().getContext().lineTo(tileX + ((x2 - tileX) / 2), y2);
        //        //Left Middle
        //        this.getViewPort().getContext().closePath();
        //        this.getViewPort().getContext().stroke();
        //    }
        //}

        //If the Entity has a 'Color', render it
        //@todo: Rendering should always be simply rendering an 'asset', which may have been a generated asset of a color
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
			var imageData = entity.getTexture().getData();

			var entityToImageYModifier = imageData.height / entity.getHeight();
			var entityToImageXModifier = imageData.width / entity.getWidth();

			var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

			var clippedImageWidth =  clippedEntityWidth * entityToImageXModifier;

            this.getViewPort().getContext().drawImage(imageData, entityClippings.leftClip * entityToImageXModifier, entityClippings.topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h)
        }



        //Render Entities from Lowest Z & Y upwards
        //@todo: This index should be built outside the engine and not recreated every render
        //@todo: Don't continue traversing children if 'cached' and not dirty
        var index: any = [];

        var children = entity.getChildren();

        while (children.hasNext()) {
            var child = children.next();
            var childCoords = this._getEntityCoordinates(child);
            var inner = childCoords.inner;
            var outer = childCoords.outer;


                var added = false;
                for (var i in index) {
                    var otherChild = index[i];
                    var otherChildCoords = this._getEntityCoordinates(otherChild);
                    if (!added && child.id && otherChild.id) {
   
                        //Checks if the Child has less Y, or if it has more Y, if it has less y2 and on the left side of the other child
                        //or if it has more y but is on the right half of other child but the y is less then other childs middle y
                        //inner.incrementY(inner.getZ());
                        //outer.incrementY(outer.getZ());
                        //otherChildCoords.inner.incrementY(otherChildCoords.inner.getZ());
                        //otherChildCoords.outer.incrementY(otherChildCoords.outer.getZ());

                        var myTotal = (inner.getZ() + (inner.getX() / 2) + inner.getY());
                        var theirTotal = (otherChildCoords.inner.getZ() + (otherChildCoords.inner.getX() / 2) + otherChildCoords.inner.getY());

                        var myOuterTotal = (inner.getZ() + (outer.getX() / 2) + outer.getY());
                        var theirOuterTotal = (otherChildCoords.inner.getZ() + (otherChildCoords.outer.getX() / 2) + otherChildCoords.outer.getY());

                        //if (child.id === "player" && otherChild.id === "Block12") {
                        //        console.log(myTotal, theirTotal);
                        //}

                        if (myTotal < theirTotal) {
                            if (myOuterTotal < theirOuterTotal) {
                                index.splice(i, 0, child);
                                added = true;
                            }
                        } else if (myTotal === theirTotal && inner.getY() < otherChildCoords.inner.getY()) {
                            index.splice(i, 0, child);
                            added = true;
                        }

                        //if (inner.getZ() < otherChildCoords.outer.getZ()) {
                        //    index.splice(i, 0, child);
                        //    added = true;
                        //} else if (inner.getY() < otherChildCoords.inner.getY() ||
                        //    (inner.getY() > otherChildCoords.inner.getY() &&
                        //        outer.getY() < otherChildCoords.outer.getY() &&
                        //        inner.getX() < otherChildCoords.inner.getX() + ((otherChildCoords.outer.getX() - otherChildCoords.inner.getX()) / 2))
                        //    || (inner.getY() > otherChildCoords.inner.getY() &&
                        //        outer.getY() < otherChildCoords.outer.getY() &&
                        //        inner.getX() > otherChildCoords.inner.getX() + ((otherChildCoords.outer.getX() - otherChildCoords.inner.getX()) / 2)
                        //        && inner.getY() < (otherChildCoords.inner.getY() + (otherChildCoords.outer.getY() - otherChildCoords.inner.getY()) / 2))) {
                        //    index.splice(i, 0, child);
                        //    added = true;
                        //}

                        //if (
                        //    inner.getY() < otherChildCoords.inner.getY() ||
                        //    (inner.getY() > otherChildCoords.inner.getY() &&
                        //        outer.getY() < otherChildCoords.outer.getY() &&
                        //        inner.getX() < otherChildCoords.inner.getX() + ((otherChildCoords.outer.getX() - otherChildCoords.inner.getX()) / 2))
                        //    || (inner.getY() > otherChildCoords.inner.getY() &&
                        //        outer.getY() < otherChildCoords.outer.getY() &&
                        //        inner.getX() > otherChildCoords.inner.getX() + ((otherChildCoords.outer.getX() - otherChildCoords.inner.getX()) / 2)
                        //        && inner.getY() < (otherChildCoords.inner.getY() + (otherChildCoords.outer.getY() - otherChildCoords.inner.getY()) / 2))) {
                        //    index.splice(i, 0, child);
                        //    added = true;
                        //    if (child.id === "player") {
                        //        console.log(i);
                        //    }
                        //}
                    }
                }

                if (!added && child.id) {
                    added = true;
                    index.push(child);
                }
            }

        for (var i in index) {
                this._renderEntity(index[i], camera);
        }

        return true;
    }

    public setIsometricRendering(state: boolean) {
        this._isometricRendering = state;
    }

    private _getEntityCoordinates(entity: Entity) : any {
        var entityAbsolutePosition = new Coordinate(entity.getAbsoluteX(), entity.getAbsoluteY(), entity.getZ()); //The absolute position of the entity in the game
        if (this._isometricRendering && entity.getParent()) {
            //Recenter coordinates inside isometric parent so it isn't overflowing inside render
            //entityAbsolutePosition.incrementY(0 - (entity.getParent().getHeight() / 2));
            //entityAbsolutePosition.incrementX((entity.getParent().getWidth() / 2));
        }
        var entityAbsoluteOuterPosition = new Coordinate(entityAbsolutePosition.getX() + entity.getWidth(), entityAbsolutePosition.getY() + entity.getHeight());

        if (this._isometricRendering) {
            //Convert to Iso Coordinates
            //We stretch isometric entities to x2 width, so add to the outer positions x
            entityAbsoluteOuterPosition.incrementX(entity.getWidth());
            entityAbsoluteOuterPosition.incrementY(0 - entity.getHeight());

            entityAbsolutePosition = entityAbsolutePosition.toIsometric();
            entityAbsoluteOuterPosition = entityAbsoluteOuterPosition.toIsometric();

        }

        return { inner: entityAbsolutePosition, outer: entityAbsoluteOuterPosition };
    }

    protected _isEntityInCamera(entityAbsolutePosition: Coordinate, entityAbsoluteOuterPosition: Coordinate, cameraPosition: Coordinate, cameraOuterPosition: Coordinate) {
        //Check if Entity is even in view for this camera
        var collidesXAxis: boolean = false;
        var collidesYAxis: boolean = false;

        if ((entityAbsolutePosition.getX() < cameraOuterPosition.getX() && entityAbsoluteOuterPosition.getX() > cameraPosition.getX())
            || (entityAbsoluteOuterPosition.getX() > cameraPosition.getX() && entityAbsolutePosition.getX() < cameraOuterPosition.getX())) {
            collidesXAxis = true;
        }

        if ((entityAbsolutePosition.getY() < cameraOuterPosition.getY() && entityAbsoluteOuterPosition.getY() > cameraPosition.getY())
            || (entityAbsoluteOuterPosition.getY() > cameraPosition.getY() && entityAbsolutePosition.getY() < cameraOuterPosition.getY())) {
            collidesYAxis = true;
        }


        //If it doesn't collide in both axises, it's not in the camera, so do not continue rendering it or it's children
        return collidesXAxis && collidesYAxis;
    }

    protected _calculateEntityClipping(entityAbsolutePosition: Coordinate, entityAbsoluteOuterPosition: Coordinate, cameraPosition: Coordinate, cameraOuterPosition: Coordinate): entityClippings {
        //Calculate which parts of the image to render
        //Check for Left Clipping
        var leftClip = 0;
        if (entityAbsolutePosition.getX() < cameraPosition.getX()) {
            leftClip = cameraPosition.getX() - entityAbsolutePosition.getX();
        }

        //Check for Right Clipping
        var rightClip = 0;
        if (entityAbsoluteOuterPosition.getX() > cameraOuterPosition.getX()) {
            rightClip = entityAbsoluteOuterPosition.getX() - cameraOuterPosition.getX();
        }

        if (this._isometricRendering) {
            leftClip = leftClip / 2;
            rightClip = rightClip / 2;
        }

        //Check for Top Clipping
        var topClip = 0;
        if ((entityAbsolutePosition.getY()) < cameraPosition.getY()) {
            topClip = (cameraPosition.getY()) - (entityAbsolutePosition.getY());
        }

        //Check for Bottom Clipping
        var bottomClip = 0;
        if ((entityAbsoluteOuterPosition.getY()) > cameraOuterPosition.getY()) {
            bottomClip = (entityAbsoluteOuterPosition.getY()) - cameraOuterPosition.getY();
        }

        return { leftClip, rightClip, topClip, bottomClip };
    }

    public rotate() {
        this._rotation += 1;
        if (this._rotation > 3) {
            this._rotation = 0;
        }
    }
}
