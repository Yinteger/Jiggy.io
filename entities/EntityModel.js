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
	this.observer = new zen.util.Observer(this);
};

zen.entities.EntityModel.static = {
	ATTR_CHANGE : 'ATTR_CHANGE',
	ATTR_DELETE : 'ATTR_DELETE'
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
			/*this._fireEvent(evt, {
				attribute : item.key,
				value : item.value
			});*/
		}
	},
});