/**
 * public constructor AudioEngine
 *
 *	Creates an AudioEngine to manage and play different
 *	audio assets.
 *
 * 	This class is abstract and must be subclassed, with
 * 	an implementation to the abstract methods.
 */
zen.audio.AudioEngine = function() {
	this.audioMap = {};
};

zen.extends(null, zen.audio.AudioEngine, {
	/**
	 * public addAudio
	 *
	 *	Adds an audio asset to this audio engine.
	 * 	
	 * @param {String} name  		User Friendly  name
	 * @param {Integer} channels 	Optional
	 * @param {zen.assets.Asset} 	audio 
	 */
	addAudio : function(name, audio, channels) {
		if (audio.getType() !== zen.assets.AssetFactory.TYPES.AUDIO) {
			throw 'AudioEngine.addAudio: Invalid Asset Type.';
		}
		this._setAudio(name, audio, channels);
	},

	/**
	 * public hasAudio
	 *
	 *	Returns true, if an audio asset by name exists.
	 * 
	 * @param  {String}  name User friendly name.
	 * @return {Boolean}      
	 */
	hasAudio : function(name) {
		var audio = this._getAudio(name);
		return (audio !== null);
	},

	/**
	 * public removeAudio
	 *
	 *	Removes an audio asset from this audio engine.
	 *	Will stop the audio if playing.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	removeAudio : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			this._stopAudio(audio);
		}
		delete this.audioMap[name];
	},

	/**
	 * public releaseAssets
	 *
	 *	Removes all audio assets from the audio engine.
	 * 
	 * @return {void} 
	 */
	releaseAssets : function() {
		var keys = Object.keys(this.audioMap);
		for (var i = 0, len = keys.length; i < len; i++) {
			this.removeAudio(keys[i]);
		}
	},

	/**
	 * public playAudio
	 *
	 *	Plays an audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	playAudio : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			this._playAudio(audio);
			audio.setAttribute('playing', true);
		}
	},

	/**
	 * public pauseAudio
	 *
	 *	Pauses an audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	pauseAudio : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			this._pauseAudio(audio);
			audio.setAttribute('playing', false);
		}
	},

	/**
	 * public stopAudio
	 *
	 *	Stops an audio asset. (Resets time cursor back to 0 seconds).
	 * 
	 * @param  {String} name User friendly name
	 * @return {void}      
	 */
	stopAudio : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			this._stopAudio(audio);
			audio.setAttribute('playing', false);
		}
	},

	/**
	 * public isAudioLooping
	 *
	 *	Returns true, if audio asset will loop.
	 * 
	 * @param  {String}  name User friendly name
	 * @return {Boolean}      
	 */
	isAudioLooping : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			return this._isAudioLooping(audio);
		}
	},

	/**
	 * public loopAudio
	 *
	 *	Enables looping of an audio asset.
	 * 
	 * @param  {String} name  User friendly name
	 * @param  {Boolean} state Should the audio asset loop?
	 * @return {void}
	 */
	loopAudio : function(name, state) {
		var audio = this._getAudio(name);
		if (audio) {
			this._loopAudio(audio, state);
		}
	},

	/**
	 * public isAudioMuted
	 *
	 *	Returns true if the audio asset is muted.
	 * 
	 * @param  {String}  name User friendly name
	 * @return {Boolean}      
	 */
	isAudioMuted : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			return this._isAudioMuted(audio);
		}
	},

	/**
	 * public muteAudio
	 *
	 *	Mutes an audio asset.
	 * 
	 * @param  {String} name  
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	muteAudio : function(name, state) {
		var audio = this._getAudio(name);
		if (audio) {
			this._muteAudio(audio, state);
		}
	},

	/**
	 * public getAudioDuration
	 *
	 *	Gets the duration of the audio asset (in seconds).
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float} 
	 */
	getAudioDuration : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			return this._getAudioDuration(audio);
		}
	},

	/**
	 * public setTimeCursor
	 *
	 *	Sets the current time to be played on the audio asset,
	 *	in seconds.
	 * 
	 * @param {String} name    User friendly name
	 * @param {Float} seconds 
	 */
	setTimeCursor : function(name, seconds) {
		var audio = this._getAudio(name);
		if (audio) {
			this._setTimeCursor(audio, seconds);
		}
	},

	/**
	 * public getTimeCursor
	 *
	 *	Gets the current time being played on the audio asset,
	 *	in seconds.
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float}      
	 */
	getTimeCursor : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			return this._getTimeCursor(audio);
		}
	},

	/**
	 * public setVolume
	 *
	 *	Sets the volume of the audio asset.
	 * 
	 * @param {String} name   User friendly name
	 * @param {Float} volume
	 */
	setVolume : function(name, volume) {
		var audio = this._getAudio(name);
		if (audio) {
			this._setVolume(audio, volume);
		}
	},

	/**
	 * public getVolume
	 *
	 *	Gets the volume of the audio asset.
	 * 
	 * @param  {String} name User friendly name
	 * @return {Float}      
	 */
	getVolume : function(name) {
		var audio = this._getAudio(name);
		if (audio) {
			return this._getVolume(audio);
		}
	},

	/**
	 * protected _setAudio
	 *
	 *	Adds an audio asset to the audio hash map.
	 *	If audio is null, then the key is deleted.
	 * 
	 * @param {String} name  User friendly reference
	 * @param {zen.assets.Asset} audio 
	 * @param {Integer} channels 
	 */
	_setAudio : function(name, audio, channels) {
		if (!audio) {
			this.removeAudio(name);
		}
		else {
			var channelArr = [audio];
			if (channels > 1) {
				var clone;
				for (var i = 1; i < channels; i++) {
					clone = zen.app.assetFactory.build(audio.getType(), audio.getSource());
					//clone = zen.app.assetFactory.clone(audio);
					channelArr.push(clone);
				}
			}
			this.audioMap[name] = channelArr;
			this._registerEvents(channelArr);
		}
	},

	/**
	 * protected _warnMissingAudio
	 *
	 *	Reports an audio missing warning.
	 * 
	 * @param  {String} name User friendly reference.
	 * @return {void}      
	 */
	_warnMissingAudio : function(name) {
		console.warn('Audio ' + name + ' is missing from Audio Engine.');
	},

	/**
	 * protected _getAudio
	 *
	 *	Gets an audio asset from the audio hash map.
	 * 
	 * @param  {String} name User friendly reference
	 * @param  {Boolean} justGiveChannel1 If true, does NOT search for an available channel
	 * @return {zen.assets.Asset}   
	 */
	_getAudio : function(name, justGiveChannel1) {
		if (this.audioMap[name]) {
			var channels = this.audioMap[name];
			if (justGiveChannel1) {
				return channels[0];
			}
			else {
				var channel;
				var asset;
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
	},

	/**
	 * protected _getData
	 *
	 *	Gets the asset's data.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {Object}       
	 */
	_getData : function(audio) {
		return audio.getData();
	},

	/**
	 * protected _attachStartEvent
	 *
	 * 	Attaches the start event on an asset.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	_attachStartEvent : function(asset) {
		if (!asset.getAttribute('startEvent')) {
			this._registerStartEvent(asset);
			asset.setAttribute('startEvent', true);
		}
	},

	/**
	 * protected _attachEndEvent
	 *
	 *	Attaches the end event on an asset.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	_attachEndEvent : function(asset) {
		if (!asset.getAttribute('endEvent')) {
			this._registerEndEvent(asset);
			asset.setAttribute('endEvent', true);
		}
	},

	/**
	 * protected _registerEvents
	 *
	 *	Attaches all mandatory events on each channel.
	 * 
	 * @param  {Array(Of zen.assets.Asset)} channelArray 
	 * @return {void}              
	 */
	_registerEvents : function(channelArray) {
		var channel;
		for (var i = 0, len = channelArray.length; i < len; i++) {
			channel = channelArray[i];
			this._attachStartEvent(channel);
			this._attachEndEvent(channel);
		}
	},

	/**
	 * protected abstract _playAudio
	 *
	 *	The logic to play audio. Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {void}       
	 */
	_playAudio : function(audio) {
		throw 'AudioEngine._playAudio is abstract!';
	},

	/**
	 * protected abstract _pauseAudio
	 *
	 *	The logic to pause audio. Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {void}       
	 */
	_pauseAudio : function(audio) {
		throw 'AudioEngine._pauseAudio is abstract!';
	},

	/**
	 * protected abstract _stopAudio
	 *
	 *	The logic to stop audio. Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {void}       
	 */
	_stopAudio : function(audio) {
		throw 'AudioEngine._stopAudio is abstract!';
	},

	/**
	 * protected abstract _isAudioLooping
	 *
	 *	The logic to check for audio looping.
	 *	Return true, if audio is looping.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset}  audio 
	 * @return {Boolean}       
	 */
	_isAudioLooping : function(audio) {
		throw 'AudioEngine._isAudioLooping is abstract!';
	},

	/**
	 * protected abstract _loopAudio
	 *
	 *	The logic to enable audio looping.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	_loopAudio : function(audio, state) {
		throw 'AudioEngine._loopAudio is abstract!';
	},

	/**
	 * protected abstract _isAudioMuted
	 *
	 *	The logic to check for muted audio.
	 *	Returns true if audio is muted.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset}  audio 
	 * @return {Boolean}       
	 */
	_isAudioMuted : function(audio) {
		throw 'AudioEngine._isAudioMuted is abstract!';
	},

	/**
	 * protected abstract _muteAudio
	 *
	 *	The logic to mute audio.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @param  {Boolean} state 
	 * @return {void}       
	 */
	_muteAudio : function(audio, state) {
		throw 'AudioEngine._muteAudio is abstract!';
	},

	/**
	 * protected abstract _getAudioDuration
	 *
	 *	The logic to get the total duration of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {Float}       
	 */
	_getAudioDuration : function(audio) {
		throw 'AudioEngine._getAudioDuration is abstract!';
	},

	/**
	 * protected abstract _setTimeCursor
	 *
	 *	The logic to set the current time played of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param {zen.assets.Asset} audio   
	 * @param {Float} seconds 
	 */
	_setTimeCursor : function(audio, seconds) {
		throw 'AudioEngine._setTimeCursor is abstract!';
	},

	/**
	 * protected abstract _getTimeCursor
	 *
	 *	The logic to get the current time playing of an audio asset,
	 *	in seconds.
	 *	Must be implemented by subclasses.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {Float}       
	 */
	_getTimeCursor : function(audio) {
		throw 'AudioEngine._getTimeCursor is abstract!';
	},

	/**
	 * protected abstract _setVolume
	 *
	 *	The logic to set the volume of an audio asset.
	 *	Must be implemented by subclasses.
	 * 
	 * @param {zen.assets.Asset} audio  
	 * @param {Float} volume 
	 */
	_setVolume : function(audio, volume) {
		throw 'AudioEngine._setVolume is abstract!';
	},

	/**
	 * protected abstract _getVolume
	 *
	 *	The logic to get the volume of an audio asset.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {Float}       
	 */
	_getVolume : function(audio) {
		throw 'AudioEngine._getVolume is abstract!';
	},

	/**
	 * protected abstract _registerStartEvent
	 *
	 *	The logic for registering a callback mechanism for when audio
	 *	begins playing. This callback should set tehe playing attribute
	 *	on the asset to true.
	 * 
	 * @param  {zen.assets.Asset} audio 
	 * @return {void}       
	 */
	_registerStartEvent : function(audio) {
		throw 'AudioEngine._registerStartEvent is abstract!';
	},

	/**
	 * protected abstract _registerEndEvent
	 *
	 *	The logic for registering a callback mechanism for when audio
	 *	stops playing. This callback should reset the playing attribute 
	 *	on the asset to false.
	 * 
	 * @param  {zen.assets.Asset} audio
	 * @return {void}       
	 */
	_registerEndEvent : function(audio) {
		throw 'AudioEngine._registerEndEvent is abstract!';
	}
});