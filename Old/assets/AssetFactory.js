/**
 * private AssetFactory Constructor
 *
 *	This class is a singleton, therefore use the static public method, getSingleton
 *	to retrieve this object.
 * 
 */
zen.assets.AssetFactory = function() {
	this.assetLoader = new zen.assets.AssetLoader();
	this.audioLoader = new zen.assets.AudioLoader();
	this.jsonLoader  = new zen.assets.JSONLoader();
	this.imageLoader = new zen.assets.ImageLoader();
	this.cache = {};
};

/**
 * public static getSingleton
 *
 *	Gets the singleton instance of AssetFactory.
 * 
 * @return {AssetFactory} 
 */
zen.assets.AssetFactory.getSingleton = function() {
	if (!zen.assets.AssetFactory.prototype._instance) {
		zen.assets.AssetFactory.prototype._instance = new zen.assets.AssetFactory();
	}
	return zen.assets.AssetFactory.prototype._instance;
};

zen.extends(null, zen.assets.AssetFactory, {
	_instance : null,

	/**
	 * public build
	 *
	 *	Builds an asset of the given type.
	 *	See zen.assets.AssetFactory.TYPES enumeration.
	 * 
	 * @param  {zen.assets.AssetFactory.TYPES} type 
	 * @param  {String} url  
	 * @return {zen.assets.Asset}      
	 */
	build : function(type, url) {
		var types = zen.assets.AssetFactory.TYPES;

		var isValidType = false;
		for (var i in types) {
			if (types[i] === type) {
				isValidType = true;
				break;
			}
		}
		if (!isValidType) {
			throw 'AssetFactory.build(): Unknown Asset Type.';
		}

		var asset;
		var cache = this.cache[url];
		if (cache) {
			asset = this._clone(cache);
		}
		else {
			asset = new zen.assets.Asset(type, url);
		}

		if (!cache) {
			switch(type) {
				default:
					break;
				case types.RAW:
					asset.setLoadStrategy(this.assetLoader);
					this._configureRawAsset(asset, url);
					break;
				case types.IMAGE:
					asset.setLoadStrategy(this.imageLoader);
					this._configureImageAsset(asset, url);
					break;
				case types.AUDIO:
					asset.setLoadStrategy(this.audioLoader);
					this._configureAudioAsset(asset, url);
					break;
				case types.JSON:
					asset.setLoadStrategy(this.jsonLoader);
					this._configureJSONAsset(asset, url);
					break;
			}
			this.cache[url] = asset;
		}

		return asset;
	},

	/**
	 * protected _configureRawAsset
	 *
	 *	Sets up specific asset details for Raw type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	_configureRawAsset : function(asset, url) {},

	/**
	 * protected _configureImageAsset
	 *
	 *	Sets up specific asset details for Image type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	_configureImageAsset : function(asset, url) {
		var img = document.createElement('img');
		img.addEventListener('load', function() {
			asset.setState(zen.assets.Asset.LOADED);
		});
		asset.setData(img);
	},
	
	/**
	 * protected _configureAudioAsset
	 *
	 *	Sets up specific asset details for Audio type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	_configureAudioAsset : function(asset, url) {
		var audio = document.createElement('audio');
		audio.addEventListener('canplaythrough', function() {
			asset.setState(zen.assets.Asset.LOADED);
		});
		asset.setData(audio);
	},

	/**
	 * protected _configureJSONAsset
	 *
	 *	Sets up specific asset details for JSON type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	_configureJSONAsset : function(asset, url) {},

	/**
	 * protected _clone
	 *
	 *	Clones a given asset.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	_clone : function(asset) {
		var type = asset.getType();
		var clone = new zen.assets.Asset(type, asset.getSource());
		this._cloneAssetData(clone, asset, type);
		return clone;
	},

	/**
	 * protected _cloneAssetData
	 *
	 *	Can be overridden, but subclasses should always call this as a super
	 *	method. Provides implementation to cloning each specific type of asset.
	 * 
	 * @param  {zen.assets.Asset} clone The clone
	 * @param  {zen.assets.Asset} asset The original
	 * @param  {Enumeration} type  
	 * @return {void}       
	 */
	_cloneAssetData : function(clone, asset, type) {
		var data = null;
		switch(type) {
			default:
				data = asset.getData();
				break;
			case zen.assets.AssetFactory.TYPES.IMAGE:
				data = this._cloneNode(asset.getData());
				break;
			case zen.assets.AssetFactory.TYPES.AUDIO:
				data = this._cloneNode(asset.getData());
				break;
		}

		clone.setLoadStrategy(asset.getLoadStrategy());
		clone.setData(data);
	},

	/**
	 * protected _cloneNode
	 *
	 *	Clones a node style asset.
	 * 
	 * @param  {HTMLDomElement} node 
	 * @return {HTMLDomElement}      a clone
	 */
	_cloneNode : function(node) {
		if (node) {
			return node.cloneNode(true);
		}
		else {
			return null;
		}
	}
},
{
	TYPES : {
		RAW 		: 1,
		IMAGE 		: 2,
		AUDIO 		: 3,
		JSON 		: 4
	}
});
