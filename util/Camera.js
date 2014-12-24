
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
zen.util.Camera = function(scene, viewPoint, fov, renderOrigin, renderDimensions) {
	this.scene = scene;
	this.viewpoint = viewPoint || {
		x: 0,
		y: 0
	};

	this.fov = fov || {
		w: 100,
		h: 100
	};

	this.renderOrigin = renderOrigin || {
		x: 0,
		y: 0
	};

	this.renderDimensions = renderDimensions || {
		w: 100,
		h: 100
	}
};

zen.extends(null, zen.util.Camera, {
	/**
	 * Sets the Scene in which the camera is viewing.
	 * The Scene is just an Entity, usually a entity with many children.
	 * 
	 * @param {[Entity]} entity
	 */
	setScene : function (entity) {
		this.scene = entity;
	},

	/**
	 * Gets the Scene in which this Camera sees
	 * @return {[Entity]} [Entity in which this Cameras sees and explores]
	 */
	getScene : function () {
		return this.scene;
	},

	/**
	 * Sets the location of the Scene in which the cameras view begins at
	 * 
	 * @param {[Number]} x
	 * @param {[Number]} y
	 */
	setViewPoint : function (x, y) {
		this.viewpoint.x = x;
		this.viewpoint.y = y;
	},

	/**
	 * Sets the size of the area in which the camera can see
	 * 
	 * @param {[Number]} width
	 * @param {[Number]} height
	 */
	setFOV : function (width, height) {
		this.fov.w = width;
		this.fov.h = height;
	},

	/**
	 * Returns the View Point of this Camera (Location)
	 * @return {[Object ]}
	 */
	getViewPoint : function () {
		return this.viewpoint;	
	},

	/**
	 * Gets the Field of View of the camera, which is how much it sees
	 * @return {[type]} [description]
	 */
	getFOV : function () {
		return this.fov;
	}
});