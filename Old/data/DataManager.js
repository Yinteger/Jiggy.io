/**
 * public DataManager
 *
 * DataManager is a singleton and is an interface to some type
 * of data storage. The DataManager is configured in a way that allows
 * for an asynchronous nature using the Observer util class to notify
 * listeners when data has been changed or removed.
 *
 * The base class itself is synchronous, but still uses an async workflow.
 * The base class uses the HTML5 local storage to store data that is 
 * available between sessions.
 *
 * One important limitation you should know, which applies to the
 * base class and may or may not apply to subclasses, is that data must be
 * of type "string". If any other type of object is passed then, the toString method
 * will be invoked for serialization.
 */
zen.data.DataManager = function() {
	if (zen.data.DataManager.prototype._instance) {
		return zen.data.DataManager.prototype._instance;
	}
	this._observer = new zen.util.Observer(this);
};

zen.extends(null, zen.data.DataManager, {
	_instance : null,
	_observer : null,

	/**
	 * public addListener
	 *
	 *	Proxy method to zen.util.Observer.addListener.
	 * 
	 * @param {Object} listener see zen.util.Observer.addListener
	 */
	addListener : function(listener) {
		this._observer.addListener(listener);
	},

	/**
	 * public isListener
	 *
	 *	Proxy method to zen.util.Observer.isListener.
	 * 
	 * @param {Object} listener see zen.util.Observer.isListener
	 */
	isListener : function(listener) {
		return this._observer.isListener(listener);
	},

	/**
	 * public removeListener
	 *
	 *	Proxy method to zen.util.Observer.removeListener.
	 * 
	 * @param {Object} listener see zen.util.Observer.removeListener
	 */
	removeListener : function(listener) {
		this._observer.removeListener(listener);
	},

	/**
	 * private _fireEvent
	 *
	 *	Proxy method to zen.util.Observer.fireEvent
	 *
	 * 	Fires :
	 * 		DATA_SET
	 * 		DATA_REMOVE
	 * 		DATA_ERROR
	 * 
	 * @param  {DataManager Enumeration} evt  
	 * @param  {Object} data 
	 * @return {void}      
	 */
	_fireEvent : function(evt, data) {
		this._observer.fireEvent(evt, data);
	},

	/**
	 * public setData
	 *
	 *	Sets data to the storage facility.
	 *	Fires DATA_SET event.
	 * 
	 * @param {String} path  
	 * @param {String} value 
	 */
	setData : function(path, value) {
		window.localStorage.setItem(path, value);
		this._fireEvent(zen.data.DataManager.DATA_SET, {
			path : path,
			value: value
		});
	},

	/**
	 * public hasData
	 *
	 *	Checks to see if data path exists.
	 * 
	 * @param  {String}  path 
	 * @return {Boolean}      
	 */
	hasData : function(path) {
		return !(window.localStorage.getItem(path) === null);
	},

	/**
	 * public getData
	 *
	 *	Gets data from the given path.
	 * 
	 * @param  {String} path 
	 * @return {String}      
	 */
	getData : function(path) {
		return window.localStorage.getItem(path);
	},

	/**
	 * public removeData
	 *
	 *	Deletes data at the given path.
	 * 	Fires DATA_REMOVE event.
	 * 
	 * @param  {String} path 
	 * @return {void}      
	 */
	removeData : function(path) {
		var data = this.getData(path);
		window.localStorage.removeItem(path);
		this._fireEvent(zen.data.DataManager.DATA_REMOVE, {
			path : path,
			value : data
		});
	}
},
{
	/**
	 * public static getSingleton
	 *
	 *	Gets the runtime instance.
	 * 
	 * @return {zen.data.DataManager} 
	 */
	getSingleton : function() {
		if (!zen.data.DataManager.prototype._instance) {
			zen.data.DataManager.prototype._instance = new zen.data.DataManager();
		}
		return zen.data.DataManager.prototype._instance;
	},

	DATA_SET    	: 'data_set',
	DATA_REMOVE 	: 'data_remove',
	DATA_ERROR		: 'data_error'
});