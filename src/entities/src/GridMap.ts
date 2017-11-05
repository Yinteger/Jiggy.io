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

		this.width = (this.tileSize.width * this.tileCount.x);
		this.height = (this.tileSize.height * this.tileCount.y);

		for (var x = 0; x < this.tileCount.x; x ++) {
            for (var y = 0; y < this.tileCount.y; y++) {
                var tile = this._buildTile(x, y);

                this.addChild(tile);

                if (!this._tiles[x]) {
                    this._tiles[x] = [];
                }

                this._tiles[x][y] = tile;
			}
		}
    }

    protected _buildTile(x: number, y: number) : Entity {
        var tile = new Entity();
        tile.width = this.tileSize.width;
        tile.height = this.tileSize.height;
        tile.x = ((x) * this.tileSize.width);
        tile.y = ((y) * this.tileSize.height);
        return tile;
    }

	public getTile (coordinate: Coordinate) : Entity {
		return this._tiles[coordinate.x][coordinate.y];
	}

	public getTiles () : Entity[] {
		return this._children;
	}
}