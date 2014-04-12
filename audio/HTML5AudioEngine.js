
/**
 * public constructor HTML5AudioEngine
 *
 * Creates a concrete HTML5 Audio implementation for playing HTML5 Audio.
 */
zen.audio.HTML5AudioEngine = function() {
	zen.audio.AudioEngine.call(this);
	this.backgroundAudios = new Array();
	this.soundEffects = new Array();
	this.backgroundVolume = 1.0;
	this.soundEffectVolume = 1.0;
};

zen.extends(zen.audio.AudioEngine, zen.audio.HTML5AudioEngine, {
	addBackgroundMusic : function(name, audio) {
		this.addAudio(name, audio);
		this.backgroundAudios.push(audio);
	},

	addSoundEFfect : function(name, audio) {
		this.addAudio(name, audio);
		this.soundEffects.push(audio);
	},

	setBackgroundVolume : function(volume) {
		this.backgroundVolume = volume;
		for (var i = 0, len = this.backgroundAudios.length; i < len; i++) {
			this._setVolume(this.backgroundAudios[i]);
		}
	},

	setSoundEffectVolume : function(volume) {
		this.soundEffectVolume = volume;
		for (var i = 0, len = this.soundEffects.length; i < len; i++) {
			this._setVolume(this.soundEffects[i]);
		}
	},

	isBackgroundMusic : function(audio) {
		return (this.backgroundAudios.indexOf(audio) > -1);
	},

	isSoundEffect : function(audio) {
		return (this.soundEffects.indexOf(audio) > -1);
	},

	_playAudio : function(audio) {
		this._updateVolume(audio);	
		var data = this._getData(audio);
		data.play();
	},

	_updateVolume : function(audio) {
		if (this.isSoundEffect(audio)) {
			this._setVolume(audio, this.soundEffectVolume);
		}
		else if (this.isBackgroundMusic(audio)) {
			this._setVolume(audio, this.backgroundVolume);
		}
	},

	_pauseAudio : function(audio) {
		var data = this._getData(audio);
		data.pause();
	},

	_stopAudio : function(audio) {
		var data = this._getData(audio);
		data.pause();
		this._setTimeCursor(audio, 0);
	},

	_isAudioLooping : function(audio) {
		var data = this._getData(audio);
		return data.loop;
	},

	_loopAudio : function(audio, state) {
		var data = this._getData(audio);
		data.loop = state;
	},

	_isAudioMuted : function(audio) {
		var data = this._getData(audio);
		return data.muted;
	},

	_muteAudio : function(audio, state) {
		var data = this._getData(audio);
		data.muted = state;
	},

	_getAudioDuration : function(audio) {
		var data = this._getData(audio);
		return data.duration;
	},

	_setTimeCursor : function(audio, seconds) {
		var data = this._getData(audio);
		data.currentTime = seconds;
	},

	_getTimeCursor : function(audio) {
		var data = this._getData(audio);
		return data.currentTime;
	},

	_setVolume : function(audio, volume) {
		var data = this._getData(audio);
		data.volume = volume;
	},

	_getVolume : function(audio) {
		var data = this._getData(audio);
		return data.volume;
	},

	_registerStartEvent : function(audio) {
		var data = audio.getData();
		data.addEventListener('playing', function(e) {
			audio.setAttribute('playing', true);
		});
	},

	_registerEndEvent : function(audio) {
		var data = audio.getData();
		data.addEventListener('ended', function(e) {
			audio.setAttribute('playing', false);
			//console.warn('ending', audio.id);
		});
	}
});