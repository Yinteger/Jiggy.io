import {Asset} from './Asset';
import {AssetLoader} from './AssetLoader';
import {AssetState} from './AssetState';

export class JSONLoader extends AssetLoader {
	public constructor() {
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
