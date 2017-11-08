/// <reference path="../utils/Promise.d.ts" />

import {
	Asset,
	AssetLoader,
	AssetState
} from '../assets';

export class AudioLoader extends AssetLoader {
	public constructor() {
		super();
	}

	/**
	 * public load
	 *
	 * See AssetLoader for more details.
	 * 
	 * @param  {Asset} asset 
	 * @return {void}       
	 */
	public load(asset: Asset): Promise<Asset> {
		asset.setState(AssetState.LOADING);

		return new Promise<Asset>((resolve, reject) => {
			var audio: HTMLAudioElement = <HTMLAudioElement>asset.getData();
			audio.setAttribute('preload', 'auto');
			this._assignEvents(asset, audio, resolve, reject);
			audio.src = asset.getSource();
		});	
	}

	/**
	 * Destroys the audio asset.
	 * 
	 * @param asset 
	 */
	public unload(asset: Asset): Promise<Asset> {
		asset.setState(AssetState.UNLOADING);

		return new Promise<Asset>((resolve, reject) => {
			var audio: HTMLAudioElement = <HTMLAudioElement>asset.getData();
			audio.oncanplaythrough = null;
			audio.onerror = null;
			audio.onplaying = null;
			audio.onended = null;
			asset.setData(null);
			asset.setState(AssetState.NOT_LOADED);
			resolve(asset);
		});
	}

	/**
	 * private _assignEvents
	 *
	 *	Initializes all event hooks required to handle
	 *	audio assets.
	 * 
	 * @param  {Asset} asset 
	 * @param  {HTMLAudioElement} audio 
	 * @return {void}       
	 */
	private _assignEvents(asset: Asset, audio: HTMLAudioElement, resolve: ResolveFunction<Asset>, reject: RejectFunction): void {
		var canPlay = (e: Event) => {
			audio.oncanplaythrough = null;
			this._onSuccess(asset, audio, resolve);
			// asset.setData(audio);
			
		};
		audio.oncanplaythrough = canPlay;
		audio.onerror = (e: Event) => {
			this._onFail(asset, e, reject);
			// asset.onError();
		};
		audio.onplaying = (e: Event) => {
			asset.setAttribute('playing', true);
		};
		audio.onended = (e: Event) => {
			audio.currentTime = 0;
			asset.setAttribute('playing', false);
		};
	}
}