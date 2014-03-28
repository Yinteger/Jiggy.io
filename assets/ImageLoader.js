
zen.assets.ImageLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.ImageLoader, {
	load : function(asset) {
		asset.setState(zen.assets.Asset.LOADING);
		var image = new Image();
		image.onload = function() {
			asset.setData(image);
		};
		image.onerror = function() {
			asset.onError();
		};
		image.src = asset.getSource();
	}
});