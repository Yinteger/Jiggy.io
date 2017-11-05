
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
	load(asset: Asset): void {
		asset.setState(AssetState.LOADING);
		var audio: HTMLAudioElement = <HTMLAudioElement>asset.getData();
		audio.setAttribute('preload', 'auto');
		this._assignEvents(asset, audio);
		audio.src = asset.getSource();
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
	private _assignEvents(asset: Asset, audio: HTMLAudioElement): void {
		var canPlay = (e: Event) => {
			asset.setData(audio);
			audio.removeEventListener('canplaythrough', canPlay);
		};
		audio.addEventListener('canplaythrough', canPlay);
		audio.addEventListener('error', () => {
			asset.onError();
		});
		audio.addEventListener('playing', () => {
			asset.setAttribute('playing', true);
		});
		audio.addEventListener('ended', () => {
			audio.currentTime = 0;
			asset.setAttribute('playing', false);
		});
	}
}