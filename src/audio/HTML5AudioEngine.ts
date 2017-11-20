import {AudioEngine} from './AudioEngine';
import {Asset} from '../assets';
import {AudioEvents} from './AudioEvents';

export class HTML5AudioEngine extends AudioEngine {
	private _backgroundAudios: Asset[];
	private _soundEffects: Asset[];
	private _backgroundVolume: number;
	private _soundEffectVolume: number;

	public constructor() {
		super();
		this._backgroundVolume = 1.0;
		this._soundEffectVolume = 1.0;
		this._backgroundAudios = []
		this._soundEffects = []
	}

	public addBackgroundMusic(name: string, audio: Asset): void {
		this.addAudio(name, audio);
		this._backgroundAudios.push(audio);
	}

	public addSoundEffect(name: string, audio: Asset): void {
		this.addAudio(name, audio);
		this._soundEffects.push(audio);
	}

	public setBackgroundVolume(volume: number): void {
		this._backgroundVolume = volume;
		for (var i: number = 0, len: number = this._backgroundAudios.length; i < len; i++) {
			this._setVolume(this._backgroundAudios[i], this._backgroundVolume);
		}
	}

	public setSoundEffectVolume(volume: number): void {
		this._soundEffectVolume = volume;
		for (var i: number = 0, len: number = this._soundEffects.length; i < len; i++) {
			this._setVolume(this._soundEffects[i], this._soundEffectVolume);
		}
	}

	public isBackgroundMusic(audio: Asset): boolean {
		return (this._backgroundAudios.indexOf(audio) > -1);
	}

	public isSoundEffect(audio: Asset): boolean {
		return (this._soundEffects.indexOf(audio) > -1);
	}

	protected _playAudio(audio: Asset): void {
		this._updateVolume(audio);	
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.play();	
	}

	private _updateVolume(audio: Asset): void {
		if (this.isSoundEffect(audio)) {
			this._setVolume(audio, this._soundEffectVolume);
		}
		else if (this.isBackgroundMusic(audio)) {
			this._setVolume(audio, this._backgroundVolume);
		}
	}

	protected _pauseAudio(audio: Asset): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.pause();
	}

	protected _stopAudio(audio: Asset): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.pause();
		this._setTimeCursor(audio, 0);
	}

	protected _isAudioLooping(audio: Asset): boolean {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		return data.loop;
	}

	protected _loopAudio(audio: Asset, state: boolean): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.loop = state;
	}

	protected _isAudioMuted(audio: Asset): boolean {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		return data.muted;
	}

	protected _muteAudio(audio: Asset, state: boolean): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.muted = state;
	}

	protected _getAudioDuration(audio: Asset): number {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		return data.duration;
	}

	protected _setTimeCursor(audio: Asset, seconds: number): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.currentTime = seconds;
	}

	protected _getTimeCursor(audio: Asset): number {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		return data.currentTime;
	}

	protected _setVolume(audio: Asset, volume: number): void {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		data.volume = volume;
	}

	protected _getVolume(audio: Asset): number {
		var data: HTMLAudioElement = <HTMLAudioElement>this._getData(audio);
		return data.volume;
	}

	protected _registerStartEvent(asset: Asset, name: string, audio: Asset): void {
		var data: HTMLAudioElement = <HTMLAudioElement>asset.getData();
		data.addEventListener('playing', (e: Event) => {
			asset.setAttribute('playing', true);
			this.emit(AudioEvents.STARTED, name, audio);
		});
	}

	protected _registerEndEvent(asset: Asset, name: string, audio: Asset): void {
		var data: HTMLAudioElement = <HTMLAudioElement>asset.getData();
		data.addEventListener('ended', (e: Event) => {
			asset.setAttribute('playing', false);
			this.emit(AudioEvents.ENDED, name, audio);
		});
	}
}
