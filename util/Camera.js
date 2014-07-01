
/**
 * Camera Classes is used to define a specific location of an Entity(Our Scene) for rendering
 */
zen.util.Camera = function() {
	this.scene = null;
	this.viewpoint = {
		x: 0,
		y: 0
	};

	this.fov = {
		w: 100,
		h: 100
	};
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