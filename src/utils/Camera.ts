import { Entity } from "../entities";
import { Coordinate } from "./Coordinate";
import {
	Dimension
} from '../interfaces';

const DEFAULT_VIEWPOINT: Coordinate = new Coordinate(0, 0);
const DEFAULT_FOV: Dimension = {width:100,height:100};
const DEFAULT_RENDER_ORIGIN: Coordinate = new Coordinate(0, 0);
const DEFAULT_RENDER_DIMENSION: Dimension = {width:100,height:100};

export class Camera {
	private _scene : Entity;
	private _viewPoint : Coordinate;
	private _fov : Dimension;
	private _renderOrigin : Coordinate;
	private _renderDimension : Dimension;

	public constructor (scene : Entity, viewPoint : Coordinate, fov : Dimension, renderOrigin: Coordinate, renderDimension: Dimension) {
		// this._scene = scene;
		// this._viewPoint = viewPoint || {x:  0, y: 0};
		// this._fov = fov || {width: 100, height: 100};
		// this._renderOrigin = renderOrigin || {x: 0, y: 0};
		// this._renderDimension = renderDimension || {width: 100, height: 100};

		this.setScene(scene);
		this.setViewPoint(viewPoint || DEFAULT_VIEWPOINT);
		this.setFOV(fov || DEFAULT_FOV);
		this.setRenderOrigin(renderOrigin || DEFAULT_RENDER_ORIGIN);
		this.setRenderDimension(renderDimension || DEFAULT_RENDER_DIMENSION);
	}

	public setScene(scene: Entity): void {
		this._scene = scene;
	}

	public getScene(): Entity {
		return this._scene;
	}

	public setViewPoint(viewPoint: Coordinate): void {
		this._viewPoint = viewPoint;
	}

	public getViewPoint(): Coordinate {
		return this._viewPoint;
	}

	public setFOV(fov: Dimension): void {
		this._fov = fov;
	}

	public getFOV(): Dimension {
		return this._fov;
	}

	public setRenderOrigin(origin: Coordinate): void {
		this._renderOrigin = origin;
	}

	public getRenderOrigin(): Coordinate {
		return this._renderOrigin;
	}

	public setRenderDimension(dim: Dimension): void {
		this._renderDimension = dim;
	}

	public getRenderDimension(): Dimension {
		return this._renderDimension;
	}
}
