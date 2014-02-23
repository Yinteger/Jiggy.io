
zen.util.Observer = function(source) {
	this.source = source;
	this.listeners = new Array();
	this.handlers = {};
};

zen.extends(null, zen.util.Observer, {
	//MODERN JS OBSERVER
	/**
	 * public addHandler
	 *
	 *	Adds a handler to the observer.
	 *	Does not allow duplicate handlers.
	 * 
	 * @param {String} eventName 
	 * @param {Function} handler   
	 */
	addHandler : function(eventName, handler) {
		if (!this.handlers[eventName]) {
			this.handlers[eventName] = new Array();
		}
		if (!this.hasHandler(eventName, handler)) {
			this.handlers[eventName].push(handler);
		}
	},

	/**
	 * public hasHandler
	 *
	 *	Checks to see if the observer has the given handler.
	 * 
	 * @param  {String}  eventName 
	 * @param  {Function}  handler   
	 * @return {Boolean}           
	 */
	hasHander : function(eventName, handler) {
		if (!this.handlers[eventName]) {
			return false;
		}
		return (this.handlers[eventName].indexOf(handler) > -1);
	},

	/**
	 * public removeHandler
	 *
	 * Removes a handler from the observer.
	 * 
	 * @param  {String} eventName 
	 * @param  {Function} handler   
	 * @return {void}           
	 */
	removeHandler : function(eventName, handler) {
		if (this.handlers[eventName]) {
			var idx = this.handlers[eventName].indexOf(handler);
			this.handlers[eventName].splice(idx, 1);
		}
	},

	//CLAsSICAL OBSERVER

	/**
	 * public addListener
	 *
	 *	Adds a listener to this model.
	 *	listener requires to have a notify method.
	 * 
	 * @param {Objec} listener 		Object must have a notify method.
	 */
	addListener : function(listener) {
		if (!this.isListener(listener)) {
			this.listeners.push(listener);
		}
	},

	/**
	 * public isListener
	 *
	 *	Checks to see if the listener is listening onto this model.
	 * 
	 * @param  {Object}  listener 
	 * @return {Boolean}          
	 */
	isListener : function(listener) {
		return (this.listeners.indexOf(listener) > -1);
	},

	/**
	 * public removeListener
	 *
	 *	Removes the listener from this model.
	 * 
	 * @param  {Object} listener 
	 * @return {void}          
	 */
	removeListener : function(listener) {
		var idx;
		if (this.isListener(listener)) {
			idx = this.listeners.indexOf(listener);
			this.listeners.splice(idx, 1);
		}
	},

	/**
	 * public fireEvent
	 * @param  {String]} event 
	 * @param  {Object} data	Keys : attribute, oldValue, value.
	 *                       	Some keys may be undefined depending
	 *                       	on context.  
	 * @return {void}       
	 */
	fireEvent : function(event, data) {
		var listener;
		for (var i = 0, len = this.listeners.length; i < len; i++) {
			listener = this.listeners[i];
			listener.notify(event, data);
		}
		var e = this.handlers[event];
		if (e) {
			for (var i = 0, len = e.length; i < len; i++) {
				listener = e[i];
				listener(event, data);
			}
		}
	}
});