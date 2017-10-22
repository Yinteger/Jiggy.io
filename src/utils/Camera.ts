import {Entity} from "../entities/Entity";
import {
	Coordinate,
	Dimension
} from '../interfaces/';

export class Camera {
	public scene : Entity;
	public viewPoint : Coordinate;
	public fov : Dimension;
	public renderOrigin : Coordinate;
	public renderDimension : Dimension;

	public constructor (scene : Entity, viewPoint : Coordinate, fov : Dimension, renderOrigin: Coordinate, renderDimension: Dimension) {
		this.scene = scene;

		this.viewPoint = viewPoint || {x:  0, y: 0};

		this.fov = fov || {width: 100, height: 100};

		this.renderOrigin = renderOrigin || {x: 0, y: 0};

		this.renderDimension = renderDimension || {width: 100, height: 100};
	}
}