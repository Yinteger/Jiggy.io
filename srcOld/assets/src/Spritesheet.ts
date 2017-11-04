import {ViewPort} from "@jiggy/utils";
// import {
// 	Asset,
// 	AssetType,
// 	SpritesheetDefinition
// } from './';

import {
	Asset,
	AssetLoader,
	AssetState,
	AssetType,
	SpritesheetDefinition
} from '@jiggy/assets';

export class Spritesheet {
	private _spritesheetAsset : Asset;
	private _spritesheetDefinition : {[key: string] : SpritesheetDefinition};
	private _spriteCache : {[key: string] : Asset};

	public constructor (spritesheetAsset: Asset, spritesheetDefinition: {[key: string] : SpritesheetDefinition}) {
		this._spritesheetAsset = spritesheetAsset; //The asset for the entire spritesheet
		this._spritesheetDefinition = spritesheetDefinition; //Definitions for sprites to coordinates
		this._spriteCache = {}; //A cache of sprites images
	}

	getSprite (id: string) : any {
		if (this._spriteCache[id]) {
			return this._spriteCache[id];
		} else if (this._spritesheetDefinition[id]) {
			var def = this._spritesheetDefinition[id];

			//Create an Image for this Sprite


			var spriteViewPort = new ViewPort();
			this._spriteCache[id] = new Asset(AssetType.IMAGE);
			spriteViewPort.setSize({width: def.width, height: def.height});
			spriteViewPort.getContext().translate(def.flipX === true ? def.width : 0, def.flipY === true ? def.height : 0)
			spriteViewPort.setScale({width: def.flipX === true ? -1 : 1, height: def.flipY === true ? -1 : 1});
			spriteViewPort.drawImage(this._spritesheetAsset.getData(), def.x, def.y, def.width, def.height, 0, 0, def.width, def.height);
			this._spriteCache[id].setData(spriteViewPort.getImage());

			return this._spriteCache[id];
		} else {
			return false;
		}
	}
}