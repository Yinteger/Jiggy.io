/**
 * EntityModel
 *
 * A class to represent the data of an Entity.
 * All generic data is stored an attributes hash table for easy serialization.
 * Uses the classical observer pattern.
 */
zen.entities.EntityModel = function() {
	this.attributes = {};
	this.id = zen.generateID();
	this.type = 'generic';
	this.textureMap = {};
	this.observer = new zen.util.Observer(this);
};

zen.entities.EntityModel.static = {
	ATTR_CHANGE : 'ATTR_CHANGE',
	ATTR_DELETE : 'ATTR_DELETE',
	TEXTURE_CHANGE : 'TEXTURE_CHANGE',
	TEXTURE_DELETE : 'TEXTURE_DELETE'
};

zen.extends(null, zen.entities.EntityModel, {
	/**
	 * public getID
	 *
	 *	Gets the GUID of this model.
	 * 
	 * @return {String} Global Unique Idenifier (GUID)
	 */
	getID : function() {
		return this.id;
	},

	/**
	 * public setType
	 *
	 *	Sets the type of this model.
	 * 
	 * @param {String} type 
	 */
	setType : function(type) {
		this.type = type;
	},

	/**
	 * public getType
	 *
	 *	Gets the type of this model.
	 * 
	 * @return {String} 
	 */
	getType : function() {
		return this.type;
	},

	/**
	 * public setAttribute
	 *
	 * 	Sets the key/value pair. Fires ATTR_CHANGE event.
	 * 
	 * @param {String} key   
	 * @param {Mixed} value 
	 * @return {void} 
	 */
	setAttribute : function(key, value) {
		var oldValue = this.getAttribute(key);
		this.attributes[key] = value;
		this._fireEvent(zen.entities.EntityModel.static.ATTR_CHANGE, {
			attribute : key,
			oldValue : oldValue,
			value : value
		});
	},

	/**
	 * public getAttribute
	 *
	 *	Returns an attribute value from given key.
	 * 
	 * @param  {String} key 
	 * @return {Mixed}     
	 */
	getAttribute : function(key) {
		return this.attributes[key];
	},

	/**
	 * public hasAttribute
	 *
	 * 	Checks to see if the key exists.
	 * 
	 * @param  {String}  key 
	 * @return {Boolean}     
	 */
	hasAttribute : function(key) {
		if (this.attributes[key]) {
			return true;
		}
		else {
			return false;
		}
	},

	/**
	 * public removeAttribute
	 * @param  {String} key 
	 *
	 *	Removes the existance of key in this model.
	 *	Fires ATTR_DELETE event.
	 * 
	 * @return {void}     
	 */
	removeAttribute : function(key) {
		var value = this.getAttribute(key);
		delete this.attributes[key];
		if (this.isNotifierKey(key)) {
			this._fireEvent(zen.entities.EntityModel.static.ATTR_DELETE, {
				attribute : key,
				value : value
			});
		}
	},

	//observer
	
	/**
	 * public addListener
	 *
	 *	Adds a listener to this model.
	 *	listener requires to have a notify method.
	 * 
	 * @param {zen.entities.EntityView} listener
	 */
	addListener : function(listener) {
		this.observer.addListener(listener);
	},

	/**
	 * public isListener
	 *
	 *	Checks to see if the listener is listening onto this model.
	 * 
	 * @param  {zen.entities.EntityView}  listener 
	 * @return {Boolean}          
	 */
	isListener : function(listener) {
		return this.observer.isListener(listener);
	},

	/**
	 * public removeListener
	 *
	 *	Removes the listener from this model.
	 * 
	 * @param  {zen.entities.EntityView} listener 
	 * @return {void}          
	 */
	removeListener : function(listener) {
		this.observer.removeListener(listener);
	},

	/**
	 * private _fireEvent
	 * @param  {Enumeration} event 
	 * @param  {Object} data	Keys : attribute, oldValue, value.
	 *                       	Some keys may be undefined depending
	 *                       	on context.  
	 * @return {void}       
	 */
	_fireEvent : function(event, data) {
		this.observer.fireEvent(event, data);
	},

	/**
	 * public iterator
	 *
	 *	Creates an iterator to iterate through all
	 *	generic attribute properties.
	 * 
	 * @return {Iterator} 
	 */
	iterator : function() {
		var keys = Object.keys(this.attributes);
		var i = -1;
		var self = this;
		return {
			hasNext : function() {
				return self.hasAttribute(keys[i + 1]);/*{
					key: keys[i + 1],
					value: self.hasAttribute(keys[i + 1])
				};*/
			},

			next : function() {
				i++;
				return {
					key : keys[i],
					value : self.getAttribute(keys[i])
				};
			},

			hasPrevious : function() {
				return self.hasAttribute(keys[i]);/*{
					key : keys[i],
					value : self.hasAttribute(keys[i])
				};*/
			},

			previous : function() {
				var v = this.getAttribute(keys[i]);
				var k = keys[i];
				i--;
				return {
					key : k,
					value : v
				};
			}
		};
	},

	/**
	 * public addTexture
	 *
	 *	Adds the texture asset to the model.
	 *
	 * Fires a TEXTURE_CHANGE event.
	 * 
	 * @param {String} name  
	 * @param {zen.assets.Asset} asset 
	 */
	addTexture : function(name, asset) {
		this.textureMap[name] = asset;
		this._fireEvent(zen.entities.EntityModel.static.TEXTURE_CHANGE, {
			attribute : 'texture',
			name : name,
			value : asset
		});
	},

	/**
	 * public hasTexture
	 *
	 *	Checks to see if a given texture by name is in the model.
	 * 
	 * @param  {String}  name 
	 * @return {Boolean}      
	 */
	hasTexture : function(name) {
		var v = this.textureMap[name];
		return !(v === undefined || v === null);
	},

	/**
	 * public getTexture
	 *
	 *	Retrieves a texture asset from the model.
	 * 
	 * @param  {String} name 
	 * @return {zen.assets.Asset}      
	 */
	getTexture : function(name) {
		return this.textureMap[name];
	},

	/**
	 * public removeTexture
	 *
	 *	Deletes an texture asset by the given name from the model.
	 *	And fires a TEXTURE_DELETE event.
	 * 
	 * @param  {String} name 
	 * @return {void}      
	 */
	removeTexture : function(name) {
		var asset = this.getTexture(name);
		delete this.textureMap[name];
		if (asset) {
			this._fireEvent(zen.entities.EntityModel.static.TEXTURE_DELETE, {
				attribute : 'texture',
				name : name,
				value : asset
			});
		}
	},

	/**
	 * public collectTextures
	 *
	 *	Gathers all the textures assets into an array.
	 * 
	 * @return {Array(Of zen.assets.Asset)} 
	 */
	collectTextures : function() {
		var arr = [];
		var keys = Object.keys(this.textureMap);
		for (var i = 0, len = keys.length; i < len; i++) {
			arr.push(this.getTexture(keys[i]));
		}
		return arr;
	},

	/**
	 * public sync
	 *
	 *	Syncs the given listener with this model.
	 * 
	 * @param  {Object} listener Must have a notify observer method.
	 * @return {void}          
	 */
	sync : function(listener) {
		var evt = zen.entities.EntityModel.static.ATTR_CHANGE;
		var iter = this.iterator();
		var item;
		while (iter.hasNext()) {
			item = iter.next();
			listener.notify(evt, {
				attribute 	: item.key,
				value 		: item.value
			});
		}
		listener.notify(evt, {
			attribute 	: 'textures',
			value 		: this.collectTextures()
		});
	},
});