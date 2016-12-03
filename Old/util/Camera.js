
/**
 * Camera Classes is used to define a specific location of an Entity(Our Scene) for rendering.
 *
 * How it works:  The camera has a Scene, a View Point, and a Field of View.
 * The Scene is a top-level entity the Camera looks at.
 * The ViewPoint is the origin coordinates from where the camera begins to look at (x1, y1)
 * The Field of View is the dimensions from the ViewPoint the Camera can see (x2, y2)
 * 
 * The Camera does not handle any rendering, it is simply a data object for the rendering engine to use
 * for rendering.  The rendering engine will look at each of it's cameras, and render them into the canvas
 * at a specific coordinates and dimensions. 
 *
 * So what you can do is set the Camera to see 1000px, but at the rendering level, it may render the view of the camera at 500px, thus you have 'zoomed out'.  Or the Camera can see 500px
 * but rendered at 1000px, thus a zoomed in view.  
 */

/**
 * Constructor
 * 
 * @param {[Entity]} scene, entity the Camera looks at
 * @param {[Coordinate]} viewPoint, where the camera sees from in the scene
 * @param {[Dimension]} fov, How much the camera sees from the viewPoint
 * @param {[Coordinate]} renderOrigin, Where the camera should be rendered in the ViewPort
 * @param {[Dimension]} renderDimension, Where dimension in which the camera is rendered in the ViewPort from the renderOrigin
 */
zen.util.Camera = function(scene, viewPoint, fov, renderOrigin, renderDimension) {

	this.scene = scene;

	this.viewpoint = viewPoint || new zen.data.Coordinate(0, 0);

	this.fov = fov || new zen.data.Dimension(100, 100);

	this.renderOrigin = renderOrigin || new zen.data.Coordinate(0, 0);

	this.renderDimension = renderDimension || new zen.data.Dimension(100, 100);
};

zen.extends(null, zen.util.Camera, {
	/**
	 * Sets the Scene in which the camera is viewing.
	 * The Scene is just an Entity, usually a top-level entity with many children.
	 * 
	 * @param {[Entity]} scene, entity the Camera looks at
	 */
	setScene : function (scene) {
		this.scene = scene;
	},

	/**
	 * Gets the Scene in which this Camera sees
	 * 
	 * @return {[Entity]} scene, entity the Camera looks at
	 */
	getScene : function () {
		return this.scene;
	},

	/**
	 * Sets the location of the Scene in which the cameras view begins at
	 * 
	 * @param {[Coordinate]} viewPoint, where the camera sees from in the scene
	 */
	setViewPoint : function (viewPoint) {
		this.viewpoint = viewPoint;
	},

	/**
	 * Returns the View Point of this Camera (Location)
	 * 
	 * @return {[Coordinate ]} where the camera sees from in the scene
	 */
	getViewPoint : function () {
		return this.viewpoint;	
	},

	/**
	 * Sets the size of the area in which the camera can see
	 * 
	 * @param {[Dimension]} fov, How much the camera sees from the viewPoint
	 */
	setFOV : function (fov) {
		this.fov = fov;
	},

	/**
	 * Gets the Field of View of the camera, which is how much it sees
	 * 
	 * @return {[Dimension]} How much the camera sees from the viewPoint
	 */
	getFOV : function () {
		return this.fov;
	},

	/**
	 * Sets the origin of where in the ViewPort the Camera view will be rendered
	 * 
	 * @param {[Dimension]} renderOrigin, Where the camera should be rendered in the ViewPort
	 */
	setRenderOrigin : function (renderOrigin) {
		this.renderOrigin = renderOrigin;
	},

	/**
	 * Gets the origin of where in the ViewPort the Camera view will be rendered
	 * 
	 * @return {[Dimension]} Where the camera should be rendered in the ViewPort
	 */
	getRenderOrigin : function () {
		return this.renderOrigin;
	},

	/**
	 * Sets the dimensions in which the camera will be rendered from the render origin
	 * 
	 * @param {[Dimension]} renderDimension, Where dimension in which the camera is rendered in the ViewPort from the renderOrigin
	 */
	setRenderDimension : function (renderDimension) {
		this.renderDimension = renderDimension;
	},

	/**
	 * Gets the origin of where in the ViewPort the Camera view will be rendered
	 * 
	 * @return {[Dimension]} Where dimension in which the camera is rendered in the ViewPort from the renderOrigin
	 */
	getRenderDimension : function () {
		return this.renderDimension;
	},
});