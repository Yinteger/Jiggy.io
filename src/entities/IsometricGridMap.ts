import {GridMap, IsometricTile} from "./";

export class IsometricGridMap extends GridMap {
    protected _buildTile(x: number, y: number): IsometricTile {
        var tile = new IsometricTile();
        tile.setWidth(this.tileSize.width);
        tile.setHeight(this.tileSize.height);
        tile.setX((x) * this.tileSize.width);
        tile.setY((y) * this.tileSize.height);
        return tile;
	}
}