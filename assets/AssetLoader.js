/**
 * public constructor AssetLoader
 *
 *	Loads raw asset data.
 * 
 */
zen.assets.AssetLoader = function() {
	this.readyStates = {
		UNSENT	: 0,
		OPENED	: 1,
		HEADERS_RECEIVED : 2,
		LOADING : 3,
		DONE	: 4
	};
};

zen.extends(null, zen.assets.AssetLoader, {
	
	load : function(asset) {
		var self = this;
		var request = new XMLHttpRequest();
		request.open('GET', asset.getSource());
		asset.setState(zen.assets.Asset.LOADING);
		request.onreadystatechange = function(e) {
			if (request.readyState === self.readyStates.DONE) {
				if (request.status === 200) {
					asset.setData(request.responseText);
				}
				else {
					asset.onError({
						code : request.status,
						message : 'Generic Error Message...'
					});
				}
			}
		};
		request.send();
	}
});
