/**
 * public EntityView
 *
 *	The view representation of an Entity. Generates a collection of pixel data based
 *	on the data in the given model.
 *
 * EntityView should only be used by the Entity class. 
 */
zen.entities.EntityView = function() {
	//this._pixelData = [];
	this._visible = true;
	//this._color = this._createPixel(0, 0, 0, 0);
	//this._height = 0;
	//this._width = 0;
};

zen.extends(null, zen.entities.EntityView, {
	/**
	 * public attachListener
	 *
	 *	Registers this view with the given model.
	 * 
	 * @param  {zen.entities.EntityModel} model 
	 * @return {void}       
	 */
	attachListener : function(model) {
		model.addListener(this);
		model.sync(this);
	},

	/**
	 * public deattachListener
	 *
	 *	Unregisters this view with the given model.
	 *
	 * This will clear all pixel data.
	 * 
	 * @param  {zen.entities.EntityModel} model 
	 * @return {void}       
	 */
	deattachListener : function(model) {
		model.removeListener(this);
		this._clear();
	},

	/**
	 * protected _clear
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 *	Clears the pixel data array.
	 * 
	 * @return {void} 
	 */
	/*_clear : function() {
		this._pixelData = [];
	},*/

	/**
	 * protected _setColor
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 *	Sets the entity fill color.
	 *
	 * Concrete class MUST implement this method.
	 * Don't forget to set the this._color property.
	 * 
	 * @param {Integer} r
	 * @param {Integer} g 
	 * @param {Integer} b
	 * @param {Integer} a  
	 */
	/*_setColor : function(r,g,b,a) {
		throw new Error('zen.entities.EntityView._setColor is abstract.');
	},*/

	/**
	 * protected _getColor
	 * 
	 * @deprecated Pixel arrays are going away...
	 * 
	 *	Gets the current color data used to create pixels.
	 * 
	 * @return {Array(Of Integer)} [ R , G , B , A ] format.
	 */
	/*_getColor : function() {
		return this._color;
	},*/

	/**
	 * protected _setVisible
	 *
	 *	Concrete class MUST implement this method.
	 *
	 * 	Sets the entity visible or invisible.
	 *
	 * Don't forget to set the this._visible property.
	 * 
	 * @param {Boolean} state
	 * @return {void}
	 */
	_setVisible : function(state) {
		this._visible = state;
		//throw new Error('zen.entities.EntityView._setVisible is abstract.');
	},

	/**
	 * protected _isVisible
	 *
	 * Returns whether this EntityView is considered visible.
	 * 
	 * @return {Boolean} [description]
	 */
	_isVisible : function() {
		return this._visible;
	},

	/**
	 * protected abstract _setWidth
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 *	Sets the width of the entity view.
	 *
	 * Concrete class MUST implement this method.
	 * Don't forget to set the this._width property.
	 * 	
	 * @param {Integer} value
	 * @return {void} 
	 */
	/*_setWidth : function(value) {
		throw new Error('zen.entities.EntityView._setWidth is abstract.');
	},*/

	/**
	 * protected _getWidth
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 *	Gets the width of the view.
	 * 
	 * @return {Integer} 
	 */
	/*_getWidth : function() {
		return this._width;
	},*/

	/**
	 * protected abstract _setHeight
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 *	Sets the height of the entity view.
	 *
	 * Concrete class MUST implement this method.
	 * Don't forget to set this._height property.
	 * 	
	 * @param {Integer} value
	 * @return {void} 
	 */
	/*_setHeight : function(height) {
		throw new Error('zen.entities.EntityView._setHeight is abstract.');
	},*/

	/**
	 * protected _getHeight
	 *
	 * @deprecated Pixel arrays are going away...
	 *
	 * Gets the height of the view
	 * 
	 * @return {Integer} 
	 */
	/*_getHeight : function() {
		return this._height;
	},*/

	/**
	 * public overridable notify
	 *
	 *	This method is invoked by EntityMode observer indicating view data has changed, and that
	 *	the pixel collection should be updated.
	 * 
	 * @param  {String} event
	 * @param  {Object} data
	 * @return {void}       
	 */
	notify : function(event, data) {
		switch(data.attribute) {
			case 'visible':
				this._setVisible(data.value);
				break;
			/*case 'x':
				break;
			case 'y':
				break;
			case 'width':
				this._setWidth(data.value);
				break;
			case 'height':
				this._setHeight(data.value);
				break;
			case 'color':
				var c = data.value;
				this._setColor(
					c[zen.entities.EntityView.static.R], 
					c[zen.entities.EntityView.static.G], 
					c[zen.entities.EntityView.static.B], 
					c[zen.entities.EntityView.static.A]
				);
				break;*/
		}
	},

	/**
	 * protected _createPixel
	 *  @deprecated Pixel Arrays are going away.
	 *  
	 *	Creates a pixel array in the RGBA format.
	 *	[ R , G , B , A ]
	 * 
	 * @param  {Integer} r 0-255
	 * @param  {Integer} g 0-255
	 * @param  {Integer} b 0-255
	 * @param  {Integer} a 0-100
	 * @return {Array(Of Integer)}   
	 */
	/*_createPixel : function(r,g,b,a) {
		if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 100) {
			throw new Error('Invalid RGBA Pixel Data.');
		}
		return [r,g,b,a];
	}*/
});