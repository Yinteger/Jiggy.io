import {
	LogManager,
	SeverityEnum
} from '../utils';
import {
	Asset,
	AssetFactory,
	AssetType
} from '../assets';
import {EventEmitter} from 'events';

var assetFactory: AssetFactory = AssetFactory.getSingleton();

interface AudioMap {
	[key: string]: Asset[]
}

/**
 * public constructor AudioEngine
 *
 *	Creates an AudioEngine to manage and play different
 *	audio assets.
 *
 * 	This class is abstract and must be subclassed, with
 * 	an implementation to the abstract methods.
 *
 * TODO: Make a way to mute/unmute All Audio
 */

export abstract class AudioEngine extends EventEmitter {
	private _logManager: LogManager;
	private _audioMap: AudioMap;

	public constructor() {
		super();
		this._audioMap = {};
		this._logManager = LogManager.getSingleton();
	}

	/**
	 * public addAudio
	 *
	 *	Adds an audio asset to this audio engine.
	 * 	
	 * @param {String} name  		User Friendly  name
	 * @param {Integer} channels 	Optional
	 * @param {Asset} 	audio 
	 */
	public addAudio(name: string, audio: Asset, channels?: number): void {
		if (audio.getType() !== AssetType.AUDIO) {
			throw 'AudioEngine.addAudio: Invalid Asset Type.';
		}
		this._setAudio(name, audio, channels);
	}

	/**
	 * public hasAudio
	 *
	 *	Returns true, if an audio asset by name exists.
	 * 
	 * @param  {String}  name User friendly name.
	 * @return {Boolean}      
	 */
	public hasAudio(name: string): boolean {
		var audio: Asset = this._getAudio(name);
		return (audio !== null);
	}

	/**
	 * public removeAudio
	 *
	 *	Removes an audio asset from this audio engine.
	 *	Will stop the audio if playing.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	public removeAudio(name: string): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._stopAudio(audio);
		}
		delete this._audioMap[name];
	}

	/**
	 * public releaseAssets
	 *
	 *	Removes all audio assets from the audio engine.
	 * 
	 * @return {void} 
	 */
	public releaseAssets(): void {
		var keys = Object.keys(this._audioMap);
		for (var i = 0, len = keys.length; i < len; i++) {
			this.removeAudio(keys[i]);
		}
	}

	/**
	 * public playAudio
	 *
	 *	Plays an audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	public playAudio(name: string): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._playAudio(audio);
			audio.setAttribute('playing', true);
		}
	}

	/**
	 * public pauseAudio
	 *
	 *	Pauses an audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	public pauseAudio(name: string): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._pauseAudio(audio);
			audio.setAttribute('playing', false);
		}
	}

	/**
	 * public stopAudio
	 *
	 *	Stops an audio asset. (Resets time cursor back to 0 seconds).
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	public stopAudio(name: string): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._stopAudio(audio);
			audio.setAttribute('playing', false);
		}
	}

	/**
	 * public isAudioLooping
	 *
	 *	Returns true, if audio asset will loop.
	 * 
	 * @param  {String}  name User friendly name
	 * @return {Boolean}      
	 */
	public isAudioLooping(name: string): boolean {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			return this._isAudioLooping(audio);
		}
		return false;
	}

	/**
	 * public loopAudio
	 *
	 *	Enables looping of an audio asset.
	 * 
	 * @param  {String} name  User friendly name
	 * @param  {Boolean} state Should the audio asset loop?
	 * @return {void}
	 */
	public loopAudio(name: string, state: boolean): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._loopAudio(audio, state);
		}
	}

	/**
	 * public isAudioMuted
	 *
	 *	Returns true if the audio asset is muted.
	 * 
	 * @param  {String}  name User friendly name
	 * @return {Boolean}      
	 */
	public isAudioMuted(name: string): boolean {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			return this._isAudioMuted(audio);
		}
		return false;
	}

	/**
	 * public muteAudio
	 *
	 *	Mutes an audio asset.
	 * 
	 * @param  {String} name  
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	public muteAudio(name: string, state: boolean): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._muteAudio(audio, state);
		}
	}

	/**
	 * public getAudioDuration
	 *
	 *	Gets the duration of the audio asset (in seconds).
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float} 
	 */
	public getAudioDuration(name: string): number {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			return this._getAudioDuration(audio);
		}
		return 0;
	}

	/**
	 * public setTimeCursor
	 *
	 *	Sets the current time to be played on the audio asset,
	 *	in seconds.
	 * 
	 * @param {String} name    User friendly name
	 * @param {Float} seconds 
	 */
	public setTimeCursor(name: string, seconds: number): void {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._setTimeCursor(audio, seconds);
		}
	}

	/**
	 * public getTimeCursor
	 *
	 *	Gets the current time being played on the audio asset,
	 *	in seconds.
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float}      
	 */
	public getTimeCursor(name: string): number {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			return this._getTimeCursor(audio);
		}
		return 0;
	}

	/**
	 * public setVolume
	 *
	 *	Sets the volume of the audio asset.
	 * 
	 * @param {String} name   User friendly name
	 * @param {Float} volume
	 */
	public setVolume(name: string, volume: number) {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			this._setVolume(audio, volume);
		}
	}

	/**
	 * public getVolume
	 *
	 *	Gets the volume of the audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float}      
	 */
	public getVolume(name: string): number {
		var audio: Asset = this._getAudio(name);
		if (audio) {
			return this._getVolume(audio);
		} else {
			return 0;
		}
	}

	/**
	 * protected _setAudio
	 *
	 *	Adds an audio asset to the audio hash map.
	 *	If audio is null, then the key is deleted.
	 * 
	 * @param {String} name  User friendly reference
	 * @param {Asset} audio 
	 * @param {Integer} channels 
	 */
	protected _setAudio(name: string, audio: Asset, channels: number): void {
	 	if (!audio) {
			this.removeAudio(name);
		}
		else {
			var channelArr: Asset[] = [audio];
			if (channels > 1) {
				var clone: Asset;
				for (var i = 1; i < channels; i++) {
					clone = assetFactory.build(audio.getType(), audio.getSource());
					channelArr.push(clone);
				}
			}
			this._audioMap[name] = channelArr;
			this._registerEvents(channelArr, name, audio);
		}
	}

	/**
	 * protected _warnMissingAudio
	 *
	 *	Reports an audio missing warning.
	 * 
	 * @param  {String} name User friendly reference.
	 * @return {void}      
	 */
	protected _warnMissingAudio(name: string): void {
		this._logManager.log(SeverityEnum.WARNING, 'Audio ' + name + ' is missing from Audio Engine.');
	}

	/**
	 * protected _getAudio
	 *
	 *	Gets an audio asset from the audio hash map.
	 * 
	 * @param  {String} name User friendly reference
	 * @param  {Boolean} justGiveChannel1 If true, does NOT search for an available channel
	 * @return {Asset}   
	 */
	protected _getAudio(name: string, justGiveChannel1?: boolean): Asset {
		if (this._audioMap[name]) {
			var channels: Asset[] = this._audioMap[name];
			if (justGiveChannel1) {
				return channels[0];
			}
			else {
				var channel: Asset;
				var asset: Asset;
				for (var i = 0, len = channels.length; i < len; i++) {
					channel = channels[i];
					if (!channel.getAttribute('playing')) {
						return channel;
					}
				}
			}
			//If we reach here, then all channels are already in use..
			//just return the main channel.
			return channels[0];
		}
		else {
			this._warnMissingAudio(name);
			return null;
		}
	}

	/**
	 * protected _getData
	 *
	 *	Gets the asset's data.
	 * 
	 * @param  {Asset} audio 
	 * @return {Object}       
	 */
	protected _getData(audio: Asset): Object /* TODO, Fix return type */ {
		return audio.getData();
	}

	/**
	 * protected _attachStartEvent
	 *
	 * 	Attaches the start event on an asset.
	 * 
	 * @param  {Asset} asset 
	 * @return {void}       
	 */
	protected _attachStartEvent(asset: Asset, name: string, audio: Asset): void {
		if (!asset.getAttribute('startEvent')) {
			this._registerStartEvent(asset, name, audio);
			asset.setAttribute('startEvent', true);
		}
	}

	/**
	 * protected _attachEndEvent
	 *
	 *	Attaches the end event on an asset.
	 * 
	 * @param  {Asset} asset 
	 * @return {void}       
	 */
	protected _attachEndEvent(asset: Asset, name: string, audio: Asset): void {
		if (!asset.getAttribute('endEvent')) {
			this._registerEndEvent(asset, name, audio);
			asset.setAttribute('endEvent', true);
		}
	}

	/**
	 * protected _registerEvents
	 *
	 *	Attaches all mandatory events on each channel.
	 * 
	 * @param  {Array(Of Asset)} channelArray 
	 * @return {void}              
	 */
	protected _registerEvents(channelArray: Asset[], name: string, audio: Asset): void {
		var channel: Asset;
		for (var i = 0, len = channelArray.length; i < len; i++) {
			channel = channelArray[i];
			this._attachStartEvent(channel, name, audio);
			this._attachEndEvent(channel, name, audio);
		}
	}

	/**
	 * protected abstract _playAudio
	 *
	 *	The logic to play audio. Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @return {void}       
	 */
	protected abstract _playAudio(audio: Asset): void;
	
	/**
	 * protected abstract _pauseAudio
	 *
	 *	The logic to pause audio. Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @return {void}       
	 */
	protected abstract _pauseAudio(audio: Asset): void;
	
	/**
	 * protected abstract _stopAudio
	 *
	 *	The logic to stop audio. Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @return {void}       
	 */
	protected abstract _stopAudio(audio: Asset): void;

	/**
	 * protected abstract _isAudioLooping
	 *
	 *	The logic to check for audio looping.
	 *	Return true, if audio is looping.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset}  audio 
	 * @return {Boolean}       
	 */
	protected abstract _isAudioLooping(audio: Asset): boolean;

	/**
	 * protected abstract _loopAudio
	 *
	 *	The logic to enable audio looping.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	protected abstract _loopAudio(audio: Asset, state: boolean): void;

	/**
	 * protected abstract _isAudioMuted
	 *
	 *	The logic to check for muted audio.
	 *	Returns true if audio is muted.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset}  audio 
	 * @return {Boolean}       
	 */
	protected abstract _isAudioMuted(audio: Asset): boolean;

	/**
	 * protected abstract _muteAudio
	 *
	 *	The logic to mute audio.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	protected abstract _muteAudio(audio: Asset, state: boolean): void;

	/**
	 * protected abstract _getAudioDuration
	 *
	 *	The logic to get the total duration of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @return {Float}       
	 */
	protected abstract _getAudioDuration(audio: Asset): number;

	/**
	 * protected abstract _setTimeCursor
	 *
	 *	The logic to set the current time played of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param {Asset} audio   
	 * @param {Float} seconds 
	 */
	protected abstract _setTimeCursor(audio: Asset, seconds: number): void;

	/**
	 * protected abstract _getTimeCursor
	 *
	 *	The logic to get the current time playing of an audio asset,
	 *	in seconds.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {Asset} audio 
	 * @return {Float}       
	 */
	protected abstract _getTimeCursor(audio: Asset): number;

	/**
	 * protected abstract _setVolume
	 *
	 *	The logic to set the volume of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param {Asset} audio  
	 * @param {Float} volume 
	 */
	protected abstract _setVolume(audio: Asset, volume: number): void;

	/**
	 * protected abstract _getVolume
	 *
	 *	The logic to get the volume of an audio asset.
	 * 
	 * @param  {Asset} audio 
	 * @return {Float}       
	 */
	protected abstract _getVolume(audio: Asset): number;

	/**
	 * protected abstract _registerStartEvent
	 *
	 *	The logic for registering a callback mechanism for when audio
	 *	begins playing. This callback should set tehe playing attribute
	 *	on the asset to true.
	 *
	 * Name & audio fields are for event reporting.
	 * 
	 * @param  {Asset} audio 
	 * @return {void}       
	 */
	protected abstract _registerStartEvent(asset: Asset, name: string, audio: Asset): void;

	/**
	 * protected abstract _registerEndEvent
	 *
	 *	The logic for registering a callback mechanism for when audio
	 *	stops playing. This callback should reset the playing attribute 
	 *	on the asset to false.
	 *
	 * Name & audio fields are for event reporting.
	 * 
	 * @param  {Asset} audio
	 * @return {void}       
	 */
	protected abstract _registerEndEvent(asset: Asset, name: string, audio: Asset): void;
}
	