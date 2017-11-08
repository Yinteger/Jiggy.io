import { RenderingEngine, TwoDimensionalRenderingEngine } from "./";
import { Camera, Iterator } from "@jiggy/utils";
import { Entity, IsometricTile } from "@jiggy/entities";

export class IsometricRenderingEngine extends TwoDimensionalRenderingEngine {
    public debugRegions: boolean;

    protected _render(): void {
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

    protected _renderCamera(camera: Camera): void {
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

    private _renderEntity(entity: Entity, camera?: Camera): boolean {
        //Render this
        //TwoDimensionalRenderingEngine.prototype._renderEntity.call(this, entity, camera);
        //First, make sure it's in the camera...  Don't want to waste our time on things that are not..
        //TODO: CLean up this Camera stuff a bit so _renderEntity isn't aware of cameras...
        if (camera) {
            var collidesYAxis = true;
            var collidesXAxis = true;

            var cameraBounds = {
                x: camera.viewPoint.x - camera.viewPoint.y,
                y: (camera.viewPoint.x + camera.viewPoint.y)/2,
                x2: (camera.viewPoint.x - camera.viewPoint.y) + camera.fov.width,
                y2: ((camera.viewPoint.x + camera.viewPoint.y) / 2) + camera.fov.height
            };


            var entityBounds = {
                x: entity.getAbsoluteX() - entity.getAbsoluteY(),
                y: (entity.getAbsoluteX() + entity.getAbsoluteY()) /2,
                x2: (entity.getAbsoluteX() - entity.getAbsoluteY()) + entity.width,
                y2: ((entity.getAbsoluteX() + entity.getAbsoluteY()) / 2) + entity.height
            };



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
            // console.log("Left Clip", leftClip);

            //Check for Right Clip
            var rightClip = 0;

            // console.log("Right Clip", rightClip);

            //Check for Top Clip
            var topClip = 0;
            // console.log("Top Clip", topClip);


            //Check for Bottom Clip
            var bottomClip = 0;
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

            var x = entityBounds.x;
            var y = entityBounds.y;
            var w = entity.width;
            var h = entity.height;

            //Rendering time!
            if (entity.color) {
                //Draw a rect in its place...
                //this.viewPort.context.setTransform();
                //Translate from Caritisen to Iso
                var isoX = x - y;
                var isoY = (x + y) / 2;
                //console.log("Cart coordinates translated from ", x, y, " to ", isoX, isoY);
                var color = entity.color;
                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
                
                if (!entity.tile) {
                    var heroHeight = (64 / 2) + (entity.height - 64);//adjustments to make the legs hit the middle of the tile for initial load
                    var heroWidth = (128 / 2) - (entity.width / 2);//for placing hero at the middle of the tile
                    x += heroWidth;
                    y -= heroHeight;
                    x -= entity.width / 2;
                    y -= entity.height;
                    this.viewPort.context.fillRect(x, y, w, h);
                } else {
                       
                    //this.viewPort.context.fillRect(x, y, w * 2, h);
                }
                

            }

			//Debug Flag

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

            var isoX = x -y;
            var isoY = (x+y) /2;
            var isoX2 = (x+w) - (y+h);
            var isoY2 = (x+w+y+h)/2;

            if (entity instanceof IsometricTile) {
                console.log("Drawing Iso Tiles");
                //Draw Isometric Layout
                this.viewPort.context.beginPath();
                this.viewPort.context.moveTo(isoX, isoY);
                this.viewPort.context.lineTo(isoX2, isoY);
                this.viewPort.context.lineTo(isoX2, isoY2);
                this.viewPort.context.lineTo(isoX, isoY2);
                this.viewPort.context.stroke();
            }

            if (entity.texture) {
                //TODO: Grab the Cached version of it if available, 
                var imageData = entity.texture.getData();

                var entityToImageYModifier = imageData.height / entity.height;
                var entityToImageXModifier = imageData.width / entity.width;

                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;
                var isoX = x - y;
                var isoY = ((x + y) / 2);

                //this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h)

                if (entity.tile) {
                    w = w * 2;
                    h = h * 2;
                    //x -= Math.floor((Math.random() * 30) + 1);
                    //y -= entity.depth;
                    if (entity.depth) {
                        y -= entity.depth;
                        this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y + entity.depth, w, h);
                    }

                } else {
                    x += ((64) - (entity.width / 2));
                    y += (64 / 2) + (entity.height - 64) + 6;
                }
                this.viewPort.context.drawImage(imageData, leftClip * entityToImageXModifier, topClip * entityToImageYModifier, clippedImageWidth, clippedImageHeight, x, y, w, h);
            }

        } else {
            //TODO: Split up code so 2d rendering code isn't copied for HUD Entities
            //No camera, static entities relative to the canvas
            var x = entity.x;
            var y = entity.y;
            var w = entity.width;
            var h = entity.height;

            //Rendering time!
            if (entity.color) {
                //Draw a rect in its place...
                var color = entity.color;
                this.viewPort.context.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
                this.viewPort.context.fillRect(x, y, w, h);
            }

            if (entity.texture) {
                //TODO: Grab the Cached version of it if available, 
                var imageData = entity.texture.getData();

                var entityToImageYModifier = imageData.height / entity.height;
                var entityToImageXModifier = imageData.width / entity.width;

                var clippedImageHeight = clippedEntityHeight * entityToImageYModifier;

                var clippedImageWidth = clippedEntityWidth * entityToImageXModifier;

                this.viewPort.context.drawImage(imageData, x, y, w, h)
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
}
