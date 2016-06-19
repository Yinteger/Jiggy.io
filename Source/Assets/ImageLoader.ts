import AssetLoader from './AssetLoader';
import {Asset, AssetState} from './Asset';

export default class ImageLoader extends AssetLoader {
	constructor() {
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
	public load(asset: Asset): void {
		asset.setState(AssetState.LOADING);
		var image: HTMLImageElement = <HTMLImageElement>asset.getData();
		image.onload = (e: Event) => {
			asset.setData(image);
		};
		image.onerror = (e: Event) => {
			asset.onError();
		};
		image.src = asset.getSource();
	}
}
