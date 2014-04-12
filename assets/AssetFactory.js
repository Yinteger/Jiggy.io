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
	this.jsonLoader = new zen.assets.JSONLoader();
	this.imageLoader = new zen.assets.ImageLoader();
	this.cache = {};
};

/**
 * static public TYPES enumeration
 */
zen.assets.AssetFactory.TYPES = {
	RAW 		: 1,
	IMAGE		: 2,
	AUDIO		: 3,
	JSON		: 4
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

	_configureRawAsset : function(asset, url) {},

	_configureImageAsset : function(asset, url) {
		var img = document.createElement('img');
		img.addEventListener('load', function() {
			asset.setState(zen.assets.Asset.LOADED);
		});
		asset.setData(img);
	},
	
	_configureAudioAsset : function(asset, url) {
		var audio = document.createElement('audio');
		audio.addEventListener('canplaythrough', function() {
			asset.setState(zen.assets.Asset.LOADED);
		});
		asset.setData(audio);
	},

	_configureJSONAsset : function(asset, url) {},

	_clone : function(asset) {
		var type = asset.getType();
		var clone = new zen.assets.Asset(type, asset.getSource());
		this._cloneAssetData(clone, asset, type);
		return clone;
	},

	_cloneAssetData : function(clone, asset, type) {
		var data = null;
		switch(type) {
			default:
				data = asset.getData();
				break;
			case zen.assets.AssetFactory.TYPES.IMAGE:
				var adata = asset.getData();
				if (adata) {
					data = adata.cloneNode(true);
				}
				break;
			case zen.assets.AssetFactory.TYPES.AUDIO:
				var adata = asset.getData();
				if (adata) {
					data = adata.cloneNode(true);
				}
				break;
		}

		clone.setLoadStrategy(asset.getLoadStrategy());
		clone.setData(data);
	}
});