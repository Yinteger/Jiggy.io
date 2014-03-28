/**
 * public constructor AudioLoader
 *
 *	Creates a strategy for loading audio assets.
 * 
 */
zen.assets.AudioLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.AudioLoader, {
	/**
	 * public load
	 *
	 * See zen.assets.AssetLoader for more details.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	load : function(asset) {
		asset.setState(zen.assets.Asset.LOADING);
		var audio = new Audio();
		audio.setAttribute('preload', 'auto');
		audio.addEventListener('canplaythrough', function() {
			asset.setData(audio);
		});
		audio.addEventListener('error', function() {
			asset.onError();
		});
		audio.src = asset.getSource();
	}
});