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
		var source = asset.getSource();
		if (this._validateURL(source)) {
			request.open(this._getMethod(), asset.getSource());
			asset.setState(zen.assets.Asset.LOADING);
			request.onreadystatechange = function(e) {
				if (request.readyState === self.readyStates.DONE) {
					if (request.status === 200) {
						self._onSuccess(asset, request.responseText);
					}
					else {
						self._onFail(asset, request);
					}
				}
				self._postRequest();
			};
			this._preRequest();
			request.send();
		}
		else {
			this._onSuccess(asset, source);
		}
	},

	_validateURL : function(url) {
		//check the first 5 non-whitespace characters.
		//for a data url.
		url = url.trim();
		var type = url.substring(0, 5);
		if (type === 'data:') {
			return false;
		}
		return true;
	},

	_getMethod : function() {
		return 'GET';
	},

	_preRequest : function() {},
	_postRequest : function() {},

	_onSuccess : function(asset, data) {
		asset.setData(data);
	},

	_onFail : function(asset, request) {
		asset.onError({
			code : request.status,
			message : 'Generic Error Message'
		});
	}
});
