/// <reference path="../../src/assets/WebpackAssetSupport.d.ts" />

import {AssetType} from '../../src/assets/AssetType';
import {AssetGroupDefinition} from '../../src/assets/AssetGroupLoader';
import * as startGameTexture from './resources/StartView.png';
import * as gameWonTexture from './resources/gameWon.png';
import * as gameLostTexture from './resources/gameLost.png';
import * as bgm1 from './resources/TechLive.mp3';
import * as bgm2 from './resources/TheLift.mp3';
import * as bgm3 from './resources/Rhinoceros.mp3';
import * as boopSound from './resources/boop.mp3';

// import * as map from './Resources/61816.png';
// import * as character from './Resources/3698.png';
// import * as music from './Resources/music.mp3';

var resources: AssetGroupDefinition = {
    assets : [
        {
            name: "startGameTexture",
            type : AssetType.IMAGE,
            source : startGameTexture
        },
        {
            name: "gameWonTexture",
            type : AssetType.IMAGE,
            source : gameWonTexture
        },
        {
            name: "gameLostTexture",
            type : AssetType.IMAGE,
            source : gameLostTexture
        },
        {
            name : "bgm1",
            type : AssetType.AUDIO,
            source : bgm1
        },
        {
            name : "bgm2",
            type : AssetType.AUDIO,
            source : bgm2
        },
        {
            name : "bgm3",
            type : AssetType.AUDIO,
            source : bgm3
        },
        {
            name : "boop",
            type : AssetType.AUDIO,
            source : boopSound
        }
    ]
}

export = resources;
