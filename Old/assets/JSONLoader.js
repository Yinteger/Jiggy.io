/**
 * public constructor JSONLoader
 *
 *	Creates a strategy to load JSON object assets.
 * 
 */
zen.assets.JSONLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.JSONLoader, {
	/**
	 * protected _onSuccess
	 *
	 *	See zen.assets.AssetLoader._onSuccess for more details.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {Stringified JSON} data  
	 * @return {void}       
	 */
	_onSuccess : function(asset, data) {
		asset.setData(JSON.parse(data));
	}
});