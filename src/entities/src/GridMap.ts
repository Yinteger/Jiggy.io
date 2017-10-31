import {Entity} from "./Entity";
import {
	Dimension,
	Coordinate
} from '@jiggy/interfaces';

export class GridMap extends Entity {
	public tileSize : Dimension;
	public tileCount : Coordinate;
	private _tiles : Entity[][];

	public constructor (tileSize: Dimension, tileCount: Coordinate) {
		super();

		this.tileSize = tileSize;
		this.tileCount = tileCount;
		this._tiles = [];

		this.setWidth(this.tileSize.width * this.tileCount.x);
		this.setHeight(this.tileSize.height * this.tileCount.y);

		for (var x = 0; x < this.tileCount.x; x ++) {
			for (var y = 0; y < this.tileCount.y; y ++) {
				var tile = new Entity();
				tile.setWidth(this.tileSize.width);
				tile.setHeight(this.tileSize.height);
				tile.setX((x + 1) * this.tileSize.width);
				tile.setY((y + 1) * this.tileSize.height);

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