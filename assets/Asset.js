/**
 * public constructor Asset
 *
 *	Represents an asset to a game.
 * 
 * @param {zen.assets.AssetFactory.TYPES} type Enumeration
 * @param {String} url  Location path.
 */
zen.assets.Asset = function(type, url) {
	this.id = zen.generateID();
	this.type = type;
	this.loadStrategy = null;
	this.data = null;
	this.setSource(url);
	this.attributes = {};
};

/**
 * public static Enumeration
 * NOT_LOADED 		The state where an asset is not available to be used,
 * 					and the loading process has not started for this asset.
 * 					
 * LOADING 			The state where an asset is not available to be used,
 * 					but it is in the loading process.
 *
 * LOADED 			The state where this asset is ready and available to be
 * 					used.
 */
zen.assets.Asset.NOT_LOADED = 0;
zen.assets.Asset.LOADING = 1;
zen.assets.Asset.LOADED = 2;

zen.extends(null, zen.assets.Asset, {
	/**
	 * public setSource
	 *
	 *	Sets the source location path of this asset.
	 *	This will clear the associated data, and set this asset in the
	 *	NOT_LOADED state.
	 * 
	 * @param {String} source 
	 */
	setSource : function(source) {
		if (source !== this.getSource()) {
			this.url = source;
			this.setData(null);
			this.setState(zen.assets.Asset.NOT_LOADED);
		}
	},

	/**
	 * public getSource
	 *
	 *	Returns the source location path of this asset.
	 * 
	 * @return {String} 
	 */
	getSource : function() {
		return this.url;
	},

	/**
	 * public setState
	 *
	 *	Sets the state of this asset.
	 *
	 * 	To be used internally only.
	 * 
	 * @param {zen.assets.Asset Enumeration} state 
	 */
	setState : function(state) {
		this.state = state;
		this.onStateChange(this.state);
	},

	/**
	 * public getState
	 *
	 *	Returns the state of this asset.
	 * 	
	 * @return {zen.assets.Asset Enumeration}
	 */
	getState : function() {
		return this.state;
	},

	/**
	 * public setData
	 *
	 * 	Sets the data for this asset.
	 * 
	 * @param {Mixed} data 
	 */
	setData : function(data) {
		this.data = data;
		//this.setState(zen.assets.Asset.LOADED);
		this.onDataChange(this.data);
	},

	/**
	 * public getData
	 *
	 *	Gets the asset data.
	 * 
	 * @return {Mixed} 
	 */
	getData : function() {
		return this.data;
	},

	/**
	 * public getType
	 *
	 *	Get the type of this asset.
	 * 
	 * @return {zen.assets.AssetFactory.TYPES} Enumeration
	 */
	getType : function() {
		return this.type;
	},

	/**
	 * public setLoadStrategy
	 *
	 *	Sets the strategy class to be used for loading
	 * 
	 * @param {zen.assets.AssetLoader} loadStrategy 
	 */
	setLoadStrategy : function(loadStrategy) {
		this.loadStrategy = loadStrategy;
	},

	getLoadStrategy : function() {
		return this.loadStrategy;
	},

	/**
	 * public load
	 *
	 *	Loads the asset data.
	 *
	 * 	Use onDataChange hook method to get notified when data has
	 * 	finished loading.
	 * 
	 * @return {void} 
	 */
	load : function() {
		this.loadStrategy.load(this);
	},

	/*
	clone : function() {
		var clone = new zen.asset.Asset(this.getType(), this.getSource());
		clone.setLoadStrategy(this.loadStrategy);	
	},*/

	/**
	 * public isReady
	 *
	 *	Checks to see if the data has been loaded on this asset.
	 * 
	 * @return {Boolean}
	 */
	isReady : function() {
		return (this.getState() === zen.assets.Asset.LOADED);
	},

	setAttribute : function(key, value) {
		this.attributes[key] = value;
	},

	getAttribute : function(key) {
		return this.attributes[key];
	},

	isAttribute : function(key) {
		if (this.attributes[key]) {
			return true;
		}
		else {
			return false;
		}
	},

	removeAttribute : function(key) {
		delete this.attributes[key];
	},

	/**
	 * public hook onStateChange
	 *
	 * 	Invoked when state changes.
	 * 
	 * @param  {zen.assets.Asset Enumeration} state Possible values:
	 *                                        			zen.assets.Asset.NOT_LOADED
	 *                                        			zen.assets.Asset.LOADING
	 *                                        			zen.assets.Asset.LOADED
	 * @return {void}       
	 */
	onStateChange: function(state) {},
	
	/**
	 * public onDataChange
	 *
	 *	Invoked when data changes.
	 * 
	 * @param  {Mixed} data Must be prepared to handle null.
	 * @return {void}      
	 */
	onDataChange : function(data) {},

	/**
	 * public onError
	 *
	 *	Invoked when there was an error while loading asset data.
	 * 
	 * @param  {Object} error 
	 * @return {void}       
	 */
	onError : function(error) {}
});