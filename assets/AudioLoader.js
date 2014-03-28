
zen.assets.AudioLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.AudioLoader, {
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