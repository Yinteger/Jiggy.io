import {Entity} from "./Entity";
import {
	Dimension,
	Coordinate
} from './.';

export class GridMap extends Entity {
	public tileSize : Dimension;
	public tileCount : Coordinate;
	private _tiles : Entity[][];

	constructor (tileSize: Dimension, tileCount: Coordinate) {
		super();

		this.tileSize = tileSize;
		this.tileCount = tileCount;
		this._tiles = [];

		this.width = (this.tileSize.width * this.tileCount.x);
		this.height = (this.tileSize.height * this.tileCount.y);

		for (var x = 0; x < this.tileCount.x; x ++) {
			for (var y = 0; y < this.tileCount.y; y ++) {
				var tile = new Entity();
				tile.width = this.tileSize.width;
				tile.height = this.tileSize.height;
				tile.x = ((x + 1) * this.tileSize.width);
				tile.y = ((y + 1) * this.tileSize.height);

				this.addChild(tile);

				if (!this._tiles[x]) {
					this._tiles[x] = [];
				}

				this._tiles[x][y] = tile;
			}
		}
	}

	public getTile (coordinate: Coordinate) : Entity {
		return this._tiles[coordinate.x][coordinate.y];
	}

	public getTiles () : Entity[] {
		return this._children;
	}
}