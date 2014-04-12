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
	/**
	 * public load
	 *
	 *	Loads the given asset's data.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
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

	clone : function(asset, clone) {
		clone.setData(asset.getData());
	},

	/**
	 * protected _validateURL
	 *
	 *	Checks to see if the URL is valid to be used
	 *	in a request. Returns true if valid, false otherwise.
	 * 
	 * @param  {String} url
	 * @return {Boolean}  
	 */
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

	/**
	 * protected _getMethod
	 *
	 *	Returns the method type to be used in a HTTP
	 *	request. May be overrided.
	 * 
	 * @return {String}
	 */
	_getMethod : function() {
		return 'GET';
	},

	/**
	 * protected _preRequest
	 *
	 *	Invoked just before the request has been sent.
	 * 
	 * @return {void} 
	 */
	_preRequest : function() {},

	/**
	 * _postRequest
	 * 
	 * Invoked when the request has been completed,
	 * but after the default actions has been executed.
	 * 
	 * @return {void} 
	 */
	_postRequest : function() {},

	/**
	 * protected _onSuccess
	 *
	 * 	Invoked when the request has been completed
	 * 	successfully.
	 * 
	 * @param  {zen.asset.Asset} asset 
	 * @param  {Mixed} data  
	 * @return {void}       
	 */
	_onSuccess : function(asset, data) {
		asset.setData(data);
	},

	/**
	 * protected _onFail
	 *
	 *	Invoked when the request has returned an error.
	 * 
	 * @param  {zen.assets.Asset} asset   
	 * @param  {XMLHttpRequest} request
	 * @return {void}         
	 */
	_onFail : function(asset, request) {
		asset.onError({
			code : request.status,
			message : 'Generic Error Message'
		});
	}
});
