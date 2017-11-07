/// <reference path="../../src/assets/WebpackAssetSupport.d.ts" />

import {AssetType} from '../../src/assets/AssetType';
import {AssetGroupDefinition} from '../../src/assets/AssetGroupLoader';
import * as pikachuSmall from './resources/pikachu_small.png';
import * as background from './resources/poke_background.jpg';

var resources: AssetGroupDefinition = {
    assets : [
        {
            name: "pikachu",
            type : AssetType.IMAGE,
            source : pikachuSmall
        },
        {
           name : "background",
           type : AssetType.IMAGE,
           source : background 
        }
    ]
}

export {resources};
