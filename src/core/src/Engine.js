"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var audio_1 = require("@jiggy/audio");
var Engine = (function () {
    function Engine() {
        this.debugMode = false;
        this.audioEngine = new audio_1.HTML5AudioEngine();
    }
    return Engine;
}());
exports.Engine = Engine;
exports.default = Engine;
//# sourceMappingURL=Engine.js.map