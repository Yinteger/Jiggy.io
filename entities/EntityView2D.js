/**
 * public class EntityView2D
 *
 *	A concrete class that holds a 2D visual representation of an Entity.
 * 
 */
zen.entities.EntityView2D = function() {
	zen.entities.EntityView.call(this);
};

zen.extends(zen.entities.EntityView, zen.entities.EntityView2D, {
	/**
	 * public notify
	 *
	 *	Notifies this EntityView of any data changes.
	 * 
	 * @param  {String} evt  
	 * @param  {Object} data 
	 * @return {void}      
	 */
	notify : function(evt, data) {
		switch(data.attribute) {
			default:
				zen.entities.EntityView.prototype.notify.call(this, evt, data);
				break;
		}
	},

	/**
	 * protected _setVisible
	 *
	 *	If true, sets all pixels transparent, otherwise set back to its original color value
	 * 
	 * @param {Boolean} state 
	 */
	_setVisible : function(state) {
		this._visible = state;
		var color = this._getColor();
		var pixel = this._createPixel(
			color[zen.entities.EntityView.static.R], 
			color[zen.entities.EntityView.static.G], 
			color[zen.entities.EntityView.static.B], 
			color[zen.entities.EntityView.static.A]
		);
		if (!state) {
			pixel[zen.entities.EntityView.static.A] = 0;
		}
		this._changeAllPixels(pixel);
	},

	/**
	 * private _getCurrentColor
	 *
	 *	Gets the current displayed color.
	 * 
	 * @return {Array(Of Integer)} 
	 */
	_getCurrentColor : function() {
		var color = this._getColor();
		if (!this._isVisible()) {
			color[zen.entities.EntityView.static.A] = 0;
		}
		return color;
	},

	/**
	 * protected _setColor
	 * @param {Integer} r 
	 * @param {Integer} g 
	 * @param {Integer} b 
	 * @param {Integer} a 
	 */
	_setColor : function(r,g,b,a) {
		var pixel = this._createPixel(r,g,b,a);
		this._color = pixel.slice(0); //a copy
		
		if (!this._isVisible()) {
			pixel[zen.entities.EntityView.static.A] = 0;
		}

		this._changeAllPixels(pixel);
	},

	/**
	 * protected _setHeight
	 *
	 *	Sets the Height
	 * 
	 * @param {Integer} value
	 */
	_setHeight : function(value) {
		var row;
		var pixel = this._getCurrentColor();
		this._height = value;
		for (var i = 0, len = this._pixelData.length; i < len; i++) {
			row = this._pixelData[i];
			if (row.length < value) {
				while (row.length < value) {
					row.push(pixel.slice(0));
				}
			}
			else if (row.length > value) {
				row.splice(value, (row.length - value));
			}
		}
	},

	/**
	 * protected _setWidth
	 *
	 *	Sets the width.
	 * 
	 * @param {Integer} value 
	 */
	_setWidth : function(value) {
		var row, col;
		var pixel = this._getCurrentColor();
		this._width = value;
		var height = this._getHeight();
		if (this._pixelData.length < value) {
			while (this._pixelData.length < value) {
				var arr = [];
				for (i = 0; i < height; i++) {
					arr.push(pixel.slice(0));
				}
				this._pixelData.push(arr);
			}
		}
		else if (this._pixelData.length > value) {
			this._pixelData.splice(value, (this._pixelData.length - value));
		}
	},

	/**
	 * private _changeAllPixels
	 *
	 *	Changes all pixels to the given pixel.
	 * 
	 * @param  {Array(Of Integer)} pixel 
	 * @return {void}       
	 */
	_changeAllPixels : function(pixel) {
		var row, col;
		var p;
		for (var i = 0, len = this._pixelData.length; i < len; i++) {
			row = this._pixelData[i];
			for (var j = 0, jlen = row.length; j < jlen; j++) {
				row[j] = pixel.slice();
			}
		}
	}
});