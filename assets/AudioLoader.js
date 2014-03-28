
zen.assets.AudioLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.AudioLoader, {
	load : function(asset) {
		asset.setState(zen.assets.Asset.LOADING);
		var audio = new Audio();
		audio.onload = function() {
			asset.setData(audio);
		};
		audio.onerror = function() {
			asset.onError();
		};
		audio.src = asset.getSource();
	}
});