import {
	Asset,
	AssetLoader,
	AssetState
} from '../assets';

export class ImageLoader extends AssetLoader {
	public constructor() {
		super();
	}

	/**
	 * public load
	 *
	 *	See AssetLoader.load for more details.
	 * 
	 * @param  {Asset} asset 
	 * @return {void}       
	 */
	public load(asset: Asset): Promise<Asset> {
		asset.setState(AssetState.LOADING);

		return new Promise<Asset>((resolve, reject) => {	
			var image: HTMLImageElement = <HTMLImageElement>asset.getData();
			image.onload = (e: Event) => {
				this._onSuccess(asset, image, resolve);
			};
			image.onerror = (e: Event) => {
				this._onFail(asset, e, reject);
			};
			image.src = asset.getSource();
		});
	}

	/**
	 * Destroys the image asset.
	 * 
	 * @param asset 
	 */
	public unload(asset: Asset): Promise<Asset> {
		asset.setState(AssetState.UNLOADING);

		return new Promise<Asset>((resolve, reject) => {
			var image: HTMLImageElement = <HTMLImageElement>asset.getData();
			image.onload = null;
			image.onerror = null;
			image.src = null;
			asset.setData(null);
			asset.setState(AssetState.NOT_LOADED);
			resolve(asset);
		});
	}
}
