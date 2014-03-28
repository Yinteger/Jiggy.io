
zen.assets.JSONLoader = function() {
	zen.assets.AssetLoader.call(this);
};

zen.extends(zen.assets.AssetLoader, zen.assets.JSONLoader, {
	load : function(asset) {
		asset.setState(zen.assets.Asset.LOADING);
		var self = this;
		var request = new XMLHttpRequest();
		request.open('GET', asset.getSource());
		request.onreadystatechange = function(e) {
			if (request.readyState === self.readyStates.DONE) {
				if (request.status === 200) {
					asset.setData(JSON.stringify(request.responseText));
				}
				else {
					asset.onError({
						code : request.status,
						message : 'Generic Error Message'
					});
				}
			}
			request.send();
		};
	}
});