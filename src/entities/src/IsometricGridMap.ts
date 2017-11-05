import {GridMap, IsometricTile} from "./";

export class IsometricGridMap extends GridMap {
    protected _buildTile(x: number, y: number): IsometricTile {
        var tile = new IsometricTile();
        tile.width = this.tileSize.width;
        tile.height = this.tileSize.height;
        tile.x = ((x) * this.tileSize.width);
        tile.y = ((y) * this.tileSize.height);
        return tile;
	}
}