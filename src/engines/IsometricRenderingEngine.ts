import { TwoDimensionalRenderingEngine } from "./";
import { Camera, Iterator, Color, Coordinate } from "../utils";
import { Entity, IsometricTile } from "../entities";
import {
    Dimension
} from '../interfaces';

export class IsometricRenderingEngine extends TwoDimensionalRenderingEngine {
    public debugRegions: boolean;

    protected _renderCamera(camera: Camera): void {
        var scene = camera.getScene();
        var context = this.getViewPort().getContext();

        if (this.debugCamera || 1==1) {
            //For Debugging purposes.. Draw a rect where each camera should be
            var viewPoint: Coordinate = camera.getViewPoint();
            var fov: Dimension = camera.getFOV();
            var renderOrigin: Coordinate = camera.getRenderOrigin();
            var renderDimension: Dimension = camera.getRenderDimension();

            context.beginPath();
            context.rect(viewPoint.getX(), viewPoint.getY(), fov.width, fov.height);
            context.lineWidth = 7;
            context.strokeStyle = 'red';
            context.stroke();

            context.beginPath();
            context.rect(renderOrigin.getX(), renderOrigin.getY(), renderDimension.width, renderDimension.height);
            context.lineWidth = 7;
            context.fillStyle = 'black';
            context.fill();
            context.strokeStyle = 'green';
            context.stroke();
        }

        this._renderEntity(scene, camera);
    }

    protected _renderEntity(entity: Entity, camera?: Camera): boolean {
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

            var cartEntityBounds = {
                x: entity.getAbsoluteX(),
                y: entity.getAbsoluteY(),
                x2: entity.getAbsoluteX(),
                y2: entity.getAbsoluteY2()
            };

            var topLeftCoord = new Coordinate(cartEntityBounds.x, cartEntityBounds.y);
            var topLeftCoordIso = topLeftCoord.toIsometric();
            var bottomRightCoord = new Coordinate(cartEntityBounds.x2, cartEntityBounds.y2);
            var bottomRightCoordIso = bottomRightCoord.toIsometric();

            var entityBounds = {
                x: topLeftCoordIso.getX() - (entity.getWidth()),
                y: topLeftCoordIso.getY() - (entity.getHeight()),
                x2: bottomRightCoordIso.getX() + (entity.getWidth()  * 2),
                y2: bottomRightCoordIso.getY() + entity.getHeight()
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
                //this.getViewPort().getContext().fillStyle = new Color(255, 0, 0).toString();
                //this.getViewPort().getContext().fillRect(entityBounds.x + 500, entityBounds.y, entity.getWidth() * 2, entity.getHeight());
                return false;
            }

            // if (entity.collectTextures().length > 0) {

            //Next, we figure out what parts of it are in the camera, so we can clip it if need be
            //Check for Left Clip
            var leftClip = 0;
            if (entityBounds.x < viewPoint.getX()) {
                leftClip = (viewPoint.getX() - entityBounds.x) / 2;
            }
            // console.log("Left Clip", leftClip);

            //Check for Right Clip
            var rightClip = 0;
            if (entityBounds.x2 > (viewPoint.getX() + fov.width)) {
                rightClip = (entityBounds.x2 - (viewPoint.getX() + fov.width)) / 2;
            }
            // console.log("Right Clip", rightClip);

            //Check for Top Clip
            var topClip = 0;
            if (entityBounds.y < viewPoint.getY()) {
                topClip = viewPoint.getY() - entityBounds.y;
            }
            // console.log("Top Clip", topClip);


            //Check for Bottom Clip
            var bottomClip = 0;
            if (entityBounds.y2 > (viewPoint.getY() + fov.height)) {
                bottomClip = entityBounds.y2 - (viewPoint.getY() + fov.height);
            }
            // console.log("Bottom Clip", bottomClip);

            //Now we figure out how to skew the rendering, since the render dimensions of the camera may not match it's fov
            var xModifier = fov.width / renderDimension.width;
            var yModifier = fov.height / renderDimension.height;
            var zModifier = (xModifier + yModifier) / 2;

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
            var z = entity.getZ() / zModifier;
            var w = clippedEntityWidth / xModifier;
            var h = clippedEntityHeight / yModifier;
            var x2 = x + (w * 2);
            var y2 = y + h;
            var cartCoords = Coordinate.fromIsometric(x, y);

            //Rendering time!
            if (entity.getColor()) {
                //Draw a rect in its place...
                var color: Color = entity.getColor();
                this.getViewPort().getContext().fillStyle = color.toString();
                this.getViewPort().getContext().fillRect(entity.getAbsoluteX(), entity.getAbsoluteY(), entity.getWidth(), entity.getHeight());
                this.getViewPort().getContext().fillRect(x, y + z, w * 2, h);
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

                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;

                

                this.getViewPort().getContext().drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, entity.getAbsoluteX(), entity.getAbsoluteY(), entity.getWidth(), entity.getHeight())
                this.getViewPort().getContext().drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y - z, w * 2, h)
            }


            if (entity instanceof IsometricTile) {

                //console.log(isoX, isoY, isoX2, isoY2);
                //this.viewPort.context.strokeRect(isoX, isoY, isoX2 - isoX, isoY2 - isoY);
                //Draw Isometric Layout
                this.getViewPort().getContext().beginPath();
                this.getViewPort().getContext().moveTo(x, y + ((y2 - y) / 2));
                this.getViewPort().getContext().lineTo(x + ((x2 - x) / 2), y);
                this.getViewPort().getContext().lineTo(x2, y + ((y2 - y) / 2));
                this.getViewPort().getContext().lineTo(x + ((x2 - x) / 2), y2);
                this.getViewPort().getContext().closePath();
                this.getViewPort().getContext().stroke();
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

                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;

                //this.getViewPort().getContext().drawImage(imageData, x, y, w, h)
            }
        }


        //TODO: Update this to render entities top-down
        //TODO: Only navigate if isModified
        var index : any = {
            
        };

        var children = entity.getChildren();

        while (children.hasNext()) {
            var child = children.next();
            if (!index[child.getZ()]) {
                index[child.getZ()] = {};
            }
            if (!index[child.getZ()][child.getY()]) {
                index[child.getZ()][child.getY()] = [];
            }

            index[child.getZ()][child.getY()].push(child);
            //this._renderEntity(children.next(), camera);
        }

        for (var i in index) {
            for (var i2 in index[i]) {
                for (var i3 in index[i][i2]) {
                    this._renderEntity(index[i][i2][i3], camera);
                }
            }
        }
        return true;
    }
}