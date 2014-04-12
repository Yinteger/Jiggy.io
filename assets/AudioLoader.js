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
		var audio = asset.getData();
		audio.setAttribute('preload', 'auto');
		this._assignEvents(asset, audio);
		audio.src = asset.getSource();
	},

	/**
	 * private _assignEvents
	 *
	 *	Initializes all event hooks required to handle
	 *	audio assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {HTMLDomElement} audio 
	 * @return {void}       
	 */
	_assignEvents : function(asset, audio) {
		var canPlay = function() {
			asset.setData(audio);
			audio.removeEventListener('canplaythrough', canPlay);
		};
		audio.addEventListener('canplaythrough', canPlay);
		audio.addEventListener('error', function() {
			asset.onError();
		});
		audio.addEventListener('playing', function() {
			asset.setAttribute('playing', true);
		});
		audio.addEventListener('ended', function() {
			audio.currentTime = 0;
			asset.setAttribute('playing', false);
		});
	}
});