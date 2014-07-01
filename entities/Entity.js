/**
 * public class Entity
 *
 *	An entity controller class.
 *
 * 	Entity manipulates the EntityModel which will fire events that the
 * 	EntityView(a listener) will receive, and react upon.
 *
 * All Entity objects must have a model. If no model is given during construction
 * Then a new model is created.
 * 
 * @param {zen.entities.EntityModel} model If null/undefined, then Entity will create a new one.
 */
zen.entities.Entity = function(model) {
	var useDefaults = false;

	//Check to see if a model was passed in
	if (!model) {
		//No model was passed in, so create the default model for an Entity
		model = new zen.entities.EntityModel();
		useDefaults = true;
	}
	
	//TODO figure out how to decide what EntityView class we should use...
	this.view = new zen.entities.EntityView();
	this.setModel(model);
	
	this.children = new Array(); //Array to store all the children entities
	this.parent = null; //Parent is the entity that contains this one
	this.modified = false; //Whether or not this Entity has been modified
	this._observer = null;  //Observer Utility Object for other objects to listen to this entity
	this.notifierKeys = ['width', 'height',  'color']; //Model attributes in which we should change isModified for
	this.parentNotifierKeys = ['x', 'y']; //Array of attributes to flag the parent as modified, anything in notifierKeys will do so by default, this list is for keys that don't mark this entity as isMOdified but should mark the parents

	if (useDefaults) {
		this._setDefaults();
	}
};

zen.extends(null, zen.entities.Entity, {

	//MODEL / VIEW / IDENTITY BASE

	/**
	 * public setModel
	 *
	 *	Sets the model that this Entity manipulates.
	 * 
	 * @param {zen.entities.EntityModel} model 
	 * @return {void} 
	 */
	setModel : function(model) {
		if (!model) {
			throw new Error('undefined/null EntityModel');
		}
		var view = this.getView();
		var oldModel = this.getModel();
		if (oldModel) {
			view.deattachListener(oldModel);
			oldModel.removeListener(this);
		}
		this.model = model;
		view.attachListener(model);
		model.addListener(this);
	},

	/**
	 * public getModel
	 *
	 *	Gets the EntityModel that this Entity manipulates.
	 * 
	 * @return {zen.entities.EntityModel} 
	 */
	getModel : function() {
		return this.model;
	},

	/**
	 * public notify
	 *
	 *	Notifies for when the model changes.
	 * 
	 * @param  {String} event 
	 * @param  {Object} data  
	 * @return {void}       
	 */
	notify : function(event, data) {
		if (this.notifierKeys.indexOf(data.attribute) > -1) {
			this.setModified(true);
		} else if (this.getParent() && this.parentNotifierKeys.indexOf(data.attribute) > -1) {
			this.getParent().setModified(true);
		}
	},

	/**
	 * public setModified
	 *
	 *	Sets whether this Entity has been modified since the last render
	 *	frame.
	 * 
	 * @param {Boolean} state
	 */
	setModified : function(state) {
		this.modified = state;
		if (this.getParent()) {
			this.getParent().setModified(state);
		}
	},

	/**
	 * public isModified
	 *
	 *	Indicates whether this Entity has been modified since the last render frame.
	 * 
	 * @return {Boolean}
	 */
	isModified : function() {
		return this.modified;
	},

	/**
	 * public getID
	 *
	 *	Gets the GUID of the entity that this is manipulating.
	 * 
	 * @return {String}
	 */
	getID : function() {
		return this.model.getID();
	},

	/**
	 * public setType
	 *
	 *	Sets the type of this entity.
	 * 
	 * @param {String} type 
	 */
	setType : function(type) {
		this.model.setType(type);
	},

	/**
	 * public getType
	 *
	 *	Gets the type of this entity.
	 * 
	 * @return {String} 
	 */
	getType : function() {
		return this.model.getType();
	},

	/**
	 * public getView
	 *
	 *	Gets the EntityView.
	 * 
	 * @return {zen.entities.EntityView} 
	 */
	getView : function() {
		return this.view;
	},

	//COMPOSITE 

	/**
	 * public addChild
	 *
	 *	Adds a child entity node to this entity.
	 * 
	 * @param {zen.entities.Entity} child 
	 * @return {void}  
	 */
	addChild : function(child) {
		var parent = child.getParent();
		if (parent) {
			parent.removeChild(child);
		}
		this.children.push(child);
		child.setParent(this);
	},

	/**
	 * public removeChild
	 *
	 *	Removes a child entity node from this entity.
	 * 
	 * @param  {zen.entities.Entity} child 
	 * @return {void}       
	 */
	removeChild : function(child) {
		if (this.isChild(child)) {
			var idx = this.indexOf(child);
			this.children.splice(idx, 1);
		}
	},

	/**
	 * public removeAllChildren
	 *
	 *	Removes all child nodes of this entity.
	 * 
	 * @return {void} 
	 */
	removeAllChildren : function() {
		var child;
		while (child = this.getChildAt(0)) {
			this.removeChild(child);	
		}
	},

	/**
	 * public isChild
	 *
	 *	Checks to see if the given entity is a child of
	 *	this entity.
	 * 
	 * @param  {zen.entities.Entity}  child 
	 * @return {Boolean}       
	 */
	isChild : function(child) {
		return (this.indexOf(child) > -1);
	},

	/**
	 * public indexOf
	 *
	 *	Finds the index of the given entity.
	 * 
	 * @param  {zen.entities.Entity} child 
	 * @return {Integer}       
	 */
	indexOf : function(child) {
		return this.children.indexOf(child);
	},

	/**
	 * public childCount
	 *
	 *	Counts the number of child nodes inside this entity.
	 * 
	 * @return {Integer} 
	 */
	childCount : function() {
		return this.children.length;
	},

	/**
	 * public getChildAt
	 *
	 *	Gets a child entity at the given index.
	 * 
	 * @param  {Integer} index 
	 * @return {zen.entities.Entity}       
	 */
	getChildAt : function(index) {
		return this.children[index];
	},

	/**
	 * public setParent
	 *
	 * Sets the parent entity of this entity.
	 * Even though this is public, it should only be used internally.
	 * 
	 * @param {zen.entities.Entity} parent 
	 * @return {void}
	 */
	setParent : function(parent) {
		this.parent = parent;
	},

	/**
	 * public getParent
	 *
	 *	Gets the parent entity node.
	 *	Be prepared to handle undefined or null.
	 * 
	 * @return {zen.entities.Entity} May be undefined or null.
	 */
	getParent : function() {
		return this.parent;
	},

	/**
	 * public iterator
	 *
	 *	Creates a child node iterator for this entity.
	 * 
	 * @return {Object} {
	 *         hasNext : function()
	 *         next : function()
	 *         hasPrevious : function()
	 *         previous : function()
	 * }
	 */
	iterator : function() {
		var i = -1;
		var self = this;
		return {
			hasNext : function() {
				var child = self.getChildAt(i + 1);
				return !(child === undefined || child === null);
			},

			next : function() {
				i++;
				return self.getChildAt(i);
			},

			hasPrevious : function() {
				var child = self.getChildAt(i);
				return !(child === undefined || child === null);
			},

			previous : function() {
				var v = self.getChildAt(i);
				i--;
				return v;
			}
		};
	},

	//GEOMETRY
	
	/*
			ALL COORDINATES ARE RELATIVE TO THE ENTITIES DIRECT
			PARENT.
	 */
	
	/**
	 * public setX
	 *
	 *	Sets the x coordinate of this entity.
	 * 
	 * @param {Integer} x 
	 */
	setX : function(x) {
		this.model.setAttribute('x', x);
	},

	/**
	 * public getX
	 *
	 *	Gets the x coordinate of this entity.
	 * 
	 * @return {Integer}
	 */
	getX : function() {
		return this.model.getAttribute('x');
	},

	/**
	 * public setY
	 *
	 *	Sets the y coordinate of this entity.
	 * 
	 * @param {Integer} y 
	 */
	setY : function(y) {
		this.model.setAttribute('y', y);
	},

	/**
	 * public getY
	 *
	 *	Gets the y coordinate of this entity.
	 * 
	 * @return {Integer} 
	 */
	getY : function() {
		return this.model.getAttribute('y');
	},

	/**
	 * public setZ
	 *
	 *	Sets the z coordinate of this entity.
	 * 
	 * @param {Integer} z 
	 */
	setZ : function(z) {
		this.model.setAttribute('z', z);
	},

	/**
	 * public getZ
	 *
	 *	Gets the z coordinate of this entity.
	 * 
	 * @return {Integer} 
	 */
	getZ : function() {
		return this.model.getAttribute('z');
	},

	/**
	 * public setLocation
	 *
	 *	Sets the coordinates of this entity. All arguments are optional.
	 * 
	 * @param {Integer} x 
	 * @param {Integer} y 
	 * @param {Integer} z 
	 */
	setLocation : function(x, y, z) {
		if (x !== null && x !== undefined) {
			this.setX(x);
		}
		if (y !== null && y !== undefined) {
			this.setY(y);
		}
		if (z !== null && z !== undefined) {
			this.setZ(z);
		}
	},

	/**
	 * public getLocation
	 *
	 *	Gets the coordinates of this entity.
	 * 
	 * @return {Object} {
	 *         x : integer,
	 *         y : integer,
	 *         z : integer
	 * }
	 */
	getLocation : function() {
		return {
			x : this.getX(),
			y : this.getY(),
			z : this.getZ()
		};
	},

	/**
	 * public setHeight
	 *
	 * 	Sets the height of this entity.
	 * 
	 * @param {Integer} height 
	 */
	setHeight : function(height) {
		this.model.setAttribute('height', height);
	},

	/**
	 * public getHeight
	 *
	 *	Gets the height of this entity.
	 * 
	 * @return {Integer} 
	 */
	getHeight : function() {
		return this.model.getAttribute('height');
	},

	/**
	 * public setWidth
	 *
	 *	Sets the width of this entity
	 * 
	 * @param {Integer} width 
	 */
	setWidth : function(width) {
		this.model.setAttribute('width', width);
	},

	/**
	 * public getWidth
	 *
	 *	Ges the width of this entity.
	 * 
	 * @return {Integer} 
	 */
	getWidth : function() {
		return this.model.getAttribute('width');
	},

	/**
	 * public setSize
	 *
	 *	Sets the width and height of this entity.
	 *	All arguments are optional.
	 * 
	 * @param {Integer} width  
	 * @param {Integer} height 
	 */
	setSize : function(width, height) {
		this.setModified(true);
		if (width !== null && width !== undefined) {
			this.setWidth(width);
		}
		if (height !== null && height !== undefined) {
			this.setHeight(height);
		}
	},

	/**
	 * public getSize
	 *
	 *	Gets the width and height of this entity.
	 * 
	 * @return {Object} {
	 *         width 	: integer,
	 *         height 	: integer
	 * }
	 */
	getSize : function() {
		return {
			width: this.getWidth(),
			height : this.getHeight()
		};
	},

	/**
	 * public setVisible
	 *
	 *	Sets whether this entity should be visible or not.
	 * 
	 * @param {Boolean} state 
	 */
	setVisible : function(state) {
		this.model.setAttribute('visible', state);
	},

	/**
	 * public isVisible
	 *
	 *	Checks to see if this entity is visible.
	 * 
	 * @return {Boolean} 
	 */
	isVisible : function() {
		return this.model.getAttribute('visible');
	},

	/**
	 * public setColor
	 *
	 *	Sets the color of this entity.
	 * 
	 * @param {Integer} r 
	 * @param {Integer} g 
	 * @param {Integer} b 
	 * @param {Integer} a 
	 */
	setColor : function(r,g,b,a) {
		this.model.setAttribute('color', [r, g, b, a]);
	},

	/**
	 * public getColor
	 *
	 *	Gets the color of this entity.
	 *
	 * 	[0] = R
	 * 	[1] = G
	 * 	[2] = B
	 * 	[3] = A
	 * 
	 * @return {Array(Of Integer)} 
	 */
	getColor : function() {
		var data = this.model.getAttribute('color');
		return [data.r, data.g, data.b, data.r];
	},

	/**
	 * public addListener 
	 *
	 * Adds a listener to this Entity that gets
	 * notified of things and stuff and yah
	 * Listener must have a notify method
	 *
	 * @param Object
	 * @return void
	 */
	addListener : function (listener) {
		if (!this.observer) {
			this.observer = new zen.util.Observer(this);
		}

		this.observer.addListener(listener);
	},

	/**
	 * public removeListener 
	 *
	 * Removes a Listener from Listening to this awesome Entity
	 *
	 * @param Object
	 * @return void
	 */
	removeListener : function (listener) {
		if (this.observer) {
			this.observer.removeListener(listener);
		}
	},

	/**
	 * public addTexture
	 *
	 *	Adds a texture asset to the model.
	 * 
	 * @param {String} name  Unique name for the texture for future reference.
	 * @param {zen.assets.Asset} asset Must be type zen.assets.AssetFactory.TYPES.IMAGE
	 */
	addTexture : function(name, asset) {
		if (asset.getType() !== zen.assets.AssetFactory.TYPES.IMAGE) {
			throw new Error('Texture asset must be of type IMAGE.');
		}

		this.model.addTexture(name, asset);
	},

	/**
	 * public hasTexture
	 *
	 *	Checks to see if a texture asset with the given name exists.
	 * 
	 * @param  {String}  name 
	 * @return {Boolean}      
	 */
	hasTexture : function(name) {
		return this.model.hasTexture(name);
	},

	/**
	 * public getTexture
	 *
	 *	Gets a texture asset by the given name.
	 * 
	 * @param  {String} name 
	 * @return {zen.assets.Asset}      
	 */
	getTexture : function(name) {
		if (this.hasTexture(name)) {
			return this.model.getTexture(name);
		}
	},

	/**
	 * public removeTexture
	 *
	 *	Removes a texture asset.
	 * 
	 * @param  {String} name 
	 * @return {void}      
	 */
	removeTexture : function(name) {
		this.model.removeTexture(name);
	},

	/**
	 * public collectTextures
	 *
	 *	Gets all the textures in this entity.
	 * 
	 * @return {Array(Of zen.assets.Asset)} 
	 */
	collectTextures : function() {
		return this.model.collectTextures();
	},

	/**
	 * private _setDefaults
	 *
	 *	Sets the default attributes for this entity.
	 * 
	 * @return {void} 
	 */
	_setDefaults : function() {
		this.setLocation(0, 0, 0);
		this.setSize(0, 0);
		this.setVisible(true);
		this.setColor(0,0,0,0);
	}
});