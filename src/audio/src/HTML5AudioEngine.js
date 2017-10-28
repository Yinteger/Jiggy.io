"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AudioEngine_1 = require("./AudioEngine");
var HTML5AudioEngine = (function (_super) {
    __extends(HTML5AudioEngine, _super);
    function HTML5AudioEngine() {
        var _this = _super.call(this) || this;
        _this._backgroundVolume = 1.0;
        _this._soundEffectVolume = 1.0;
        _this._backgroundAudios = [];
        _this._soundEffects = [];
        return _this;
    }
    HTML5AudioEngine.prototype.addBackgroundMusic = function (name, audio) {
        this.addAudio(name, audio);
        this._backgroundAudios.push(audio);
    };
    HTML5AudioEngine.prototype.addSoundEffect = function (name, audio) {
        this.addAudio(name, audio);
        this._soundEffects.push(audio);
    };
    HTML5AudioEngine.prototype.setBackgroundVolume = function (volume) {
        this._backgroundVolume = volume;
        for (var i = 0, len = this._backgroundAudios.length; i < len; i++) {
            this._setVolume(this._backgroundAudios[i], this._backgroundVolume);
        }
    };
    HTML5AudioEngine.prototype.setSoundEffectVolume = function (volume) {
        this._soundEffectVolume = volume;
        for (var i = 0, len = this._soundEffects.length; i < len; i++) {
            this._setVolume(this._soundEffects[i], this._soundEffectVolume);
        }
    };
    HTML5AudioEngine.prototype.isBackgroundMusic = function (audio) {
        return (this._backgroundAudios.indexOf(audio) > -1);
    };
    HTML5AudioEngine.prototype.isSoundEffect = function (audio) {
        return (this._soundEffects.indexOf(audio) > -1);
    };
    HTML5AudioEngine.prototype._playAudio = function (audio) {
        this._updateVolume(audio);
        var data = this._getData(audio);
        data.play();
    };
    HTML5AudioEngine.prototype._updateVolume = function (audio) {
        if (this.isSoundEffect(audio)) {
            this._setVolume(audio, this._soundEffectVolume);
        }
        else if (this.isBackgroundMusic(audio)) {
            this._setVolume(audio, this._backgroundVolume);
        }
    };
    HTML5AudioEngine.prototype._pauseAudio = function (audio) {
        var data = this._getData(audio);
        data.pause();
    };
    HTML5AudioEngine.prototype._stopAudio = function (audio) {
        var data = this._getData(audio);
        data.pause();
        this._setTimeCursor(audio, 0);
    };
    HTML5AudioEngine.prototype._isAudioLooping = function (audio) {
        var data = this._getData(audio);
        return data.loop;
    };
    HTML5AudioEngine.prototype._loopAudio = function (audio, state) {
        var data = this._getData(audio);
        data.loop = state;
    };
    HTML5AudioEngine.prototype._isAudioMuted = function (audio) {
        var data = this._getData(audio);
        return data.muted;
    };
    HTML5AudioEngine.prototype._muteAudio = function (audio, state) {
        var data = this._getData(audio);
        data.muted = state;
    };
    HTML5AudioEngine.prototype._getAudioDuration = function (audio) {
        var data = this._getData(audio);
        return data.duration;
    };
    HTML5AudioEngine.prototype._setTimeCursor = function (audio, seconds) {
        var data = this._getData(audio);
        data.currentTime = seconds;
    };
    HTML5AudioEngine.prototype._getTimeCursor = function (audio) {
        var data = this._getData(audio);
        return data.currentTime;
    };
    HTML5AudioEngine.prototype._setVolume = function (audio, volume) {
        var data = this._getData(audio);
        data.volume = volume;
    };
    HTML5AudioEngine.prototype._getVolume = function (audio) {
        var data = this._getData(audio);
        return data.volume;
    };
    HTML5AudioEngine.prototype._registerStartEvent = function (audio) {
        var data = audio.getData();
        data.addEventListener('playing', function (e) {
            audio.setAttribute('playing', true);
        });
    };
    HTML5AudioEngine.prototype._registerEndEvent = function (audio) {
        var data = audio.getData();
        data.addEventListener('ended', function (e) {
            audio.setAttribute('playing', false);
        });
    };
    return HTML5AudioEngine;
}(AudioEngine_1.AudioEngine));
exports.HTML5AudioEngine = HTML5AudioEngine;
//# sourceMappingURL=HTML5AudioEngine.js.map