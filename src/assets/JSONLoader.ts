import {
	Asset,
	AssetLoader
} from './';

export class JSONLoader extends AssetLoader {
	constructor() {
		super();
	}

	/**
	 * protected _onSuccess
	 *
	 *	See zen.assets.AssetLoader._onSuccess for more details.
	 * 
	 * @param  {Asset} asset 
	 * @param  {Stringified JSON} data  
	 * @return {void}       
	 */
	protected _onSuccess(asset: Asset, data: Object): void {
		var json: string = <string>data;
		asset.setData(JSON.parse(json));
	}
}