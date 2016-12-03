/**
 * public constructor ImageLoader
 *
 *	Creates a strategy for loading image assets.
 * 
 */
zen.assets.ImageLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.ImageLoader, {
	/**
	 * public load
	 *
	 *	See zen.assets.AssetLoader.load for more details.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	load : function(asset) {
		asset.setState(zen.assets.Asset.LOADING);
		var image = asset.getData();
		image.onload = function() {
			asset.setData(image);
		};
		image.onerror = function() {
			asset.onError();
		};
		image.src = asset.getSource();
	}
});