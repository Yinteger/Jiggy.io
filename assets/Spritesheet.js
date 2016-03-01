/**
 * public Spritesheet
 *
 * This class represents a spritesheet and creates a key-value mapping to regions of an asset
 */
zen.assets.Spritesheet = function(spritesheetAsset, spritesheetDefinition) {
	this.spritesheetAsset = spritesheetAsset; //The asset for the entire spritesheet
	this.spritesheetDefinition = spritesheetDefinition || {}; //Definitions for sprites to coordinates
	this.spriteCache = {}; //A cache of sprites images
};

zen.extends(null, zen.assets.Spritesheet, {
	getSprite : function (id) {
		if (this.spriteCache[id]) {
			return this.spriteCache[id];
		} else if (this.spritesheetDefinition[id]) {
			var def = this.spritesheetDefinition[id];

			//Create an Image for this Sprite


			var spriteViewPort = new zen.ViewPort();
			this.spriteCache[id] = new zen.assets.Asset(zen.assets.AssetFactory.TYPES.IMAGE);
			spriteViewPort.setSize(def.w, def.h);
			spriteViewPort.context.translate(def['flip-x'] === true ? def.w : 0, def['flip-y'] === true ? def.h : 0)
			spriteViewPort.setScale(def['flip-x'] === true ? -1 : 1, def['flip-y'] === true ? -1 : 1);
			spriteViewPort.drawImage(this.spritesheetAsset.getData(), def.x, def.y, def.w, def.h, 0, 0, def.w, def.h);
			this.spriteCache[id].setData(spriteViewPort.getImage());

			return this.spriteCache[id];
		} else {
			return false;
		}
	},
	addSprite : function (id, asset) {
		this.spriteCache[id] = asset;
	}
});