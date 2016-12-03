/**
 * public GridMap
 *
 * 
 */
zen.entities.GridMap = function(tileSize, tileCount) {
	zen.entities.Entity.call(this);

	this.tileSize = tileSize;
	this.tileCount = tileCount;
	this.tiles = [];
	this.setWidth(tileSize.width * tileCount.x);
	this.setHeight(tileSize.height * tileCount.y);

	for (var x = 0; x < this.tileCount.x; x ++) {
		for (var y = 0; y < this.tileCount.y; y ++) {
			var tile = new zen.entities.Entity();
			tile.setWidth(tileSize.width);
			tile.setHeight(tileSize.height);
			tile.setX((x + 1) * tileSize.width);
			tile.setY((y + 1) * tileSize.height);

			this.addChild(tile);

			if (!this.tiles[x]) {
				this.tiles[x] = [];
			}

			this.tiles[x][y] = tile;
		}
	}
};

zen.extends(zen.entities.Entity, zen.entities.GridMap, {
	getTile: function (x, y) {
		return this.tiles[x][y];
	},
	getTiles : function () {
		return this.children;
	}
});