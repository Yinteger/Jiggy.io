/// <reference path="../utils/Promise.d.ts" />

import {
	Asset,
	AssetLoader,
	AssetState
} from '../assets';

export class JSONLoader extends AssetLoader {
	public constructor() {
		super();
	}

	/**
	 * protected _onSuccess
	 *
	 *	See AssetLoader._onSuccess for more details.
	 * 
	 * @param  {Asset} asset 
	 * @param  {Stringified JSON} data  
	 * @return {void}       
	 */
	protected _onSuccess(asset: Asset, data: Object, resolve: ResolveFunction<Asset>): void {
		var json: string = <string>data;
		asset.setData(JSON.parse(json));
		resolve(asset);
	}
}
