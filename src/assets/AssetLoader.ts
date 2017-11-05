/// <reference path="../utils/Promise.d.ts" />

import {
	Asset,
	AssetState
} from '../assets';
import {
	LogManager
} from '../utils/LogManager'

export class AssetLoader {

	public constructor() {}

	/**
	 * public load
	 *
	 *	Loads the given asset's data.
	 * 
	 * @param  {Asset} asset 
	 * @return {void}       
	 */
	public load(asset: Asset): Promise<Asset> {
		return new Promise<Asset>((resolve, reject) => {
			var request: XMLHttpRequest = new XMLHttpRequest();
			var source = asset.getSource();
			if (this._validateURL(source)) {
				request.open(this._getMethod(), asset.getSource());
				asset.setState(AssetState.LOADING);
				request.onreadystatechange = (e: Event) => {
					if (request.readyState === XMLHttpRequest.DONE) {
						if (request.status === 200) {
							this._onSuccess(asset, request.responseText, resolve);
						}
						else {
							this._onFail(asset, request, reject);
							reject(asset);
						}
					}
					this._postRequest();
				};
				this._preRequest();
				request.send();
			}
			else {
				this._onSuccess(asset, source, resolve);
			}
		});
	}

	/**
	 * Unloads the given asset, making it no longer usable.
	 * 
	 * @param asset 
	 */
	public unload(asset: Asset): Promise<Asset> {
		return new Promise<Asset>((resolve, reject) => {
			asset.setState(AssetState.UNLOADING);

			// While the API supports asynchronous methods, this particular implementation does require calling any
			// asynchronous methods. However, we still want the API to behave like an asynchronous method.
			process.nextTick(() => {
				asset.setData(null);
				asset.setState(AssetState.NOT_LOADED);
				resolve(asset);
			});
		});
	}

	/**
		Clones the asset data to another asset.
	*/
	public clone(asset: Asset, clone: Asset): void {
		clone.setData(asset.getData());
	}

	/**
	 * protected _validateURL
	 *
	 *	Checks to see if the URL is valid to be used
	 *	in a request. Returns true if valid, false otherwise.
	 * 
	 * @param  {String} url
	 * @return {Boolean}  
	 */
	protected _validateURL(url: string): boolean {
		//check the first 5 non-whitespace characters.
		//for a data url.
		url = url.trim();
		var type: string = url.substring(0, 5);
		if (type === 'data:') {
			return false;
		}
		return true;
	}

	/**
	 * protected _getMethod
	 *
	 *	Returns the method type to be used in a HTTP
	 *	request. May be overrided.
	 * 
	 * @return {String}
	 */
	protected _getMethod(): string {
		return 'GET';
	}

	/**
	 * protected _preRequest
	 *
	 *	Invoked just before the request has been sent.
	 * 
	 * @return {void} 
	 */
	protected _preRequest(): void {}

	/**
	 * _postRequest
	 * 
	 * Invoked when the request has been completed,
	 * but after the default actions has been executed.
	 * 
	 * @return {void} 
	 */
	protected _postRequest(): void {}

	/**
	 * protected _onSuccess
	 *
	 * 	Invoked when the request has been completed
	 * 	successfully.
	 * 
	 * @param  {Asset} asset 
	 * @param  {Mixed} data  
	 * @return {void}       
	 */
	protected _onSuccess(asset: Asset, data: Object, resolve: ResolveFunction<Asset>): void {
		asset.setData(data);
		resolve(asset);
	}

	/**
	 * protected _onFail
	 *
	 *	Invoked when the request has returned an error.
	 * 
	 * @param  {Asset} asset   
	 * @param  {XMLHttpRequest} request
	 * @return {void}         
	 */
	protected _onFail(asset: Asset, request: XMLHttpRequest, reject: RejectFunction): void {
		reject({
			code : request.status,
			message : 'Generic Error Message'
		});
		// asset.onError({
		// 	code : request.status,
		// 	message : 'Generic Error Message'
		// });
	}
}
