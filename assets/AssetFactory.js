/**
 * private AssetFactory Constructor
 *
 *	This class is a singleton, therefore use the static public method, getSingleton
 *	to retrieve this object.
 * 
 */
zen.assets.AssetFactory = function() {
	this.assetLoader = new zen.assets.AssetLoader();
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
		var asset = new zen.assets.Asset(type, url);
		switch(type) {
			default:
				throw 'AssetFactory.build(): Unknown Asset Type';
				break;
			case types.RAW:
				asset.setLoadStrategy(new zen.assets.AssetLoader());
				break;
			case types.IMAGE:
				asset.setLoadStrategy(new zen.assets.ImageLoader());
				break;
			case types.AUDIO:

				break;
			case types.JSON:

				break;
		}
		return asset;
	}
});