import {Entity, EntityEventTypes, LocationUpdateEvent} from "../Entities";
import {Event, Coordinate} from "../Interfaces";

export class CollisionEmitter {
	private _entities : Entity[];
	private _entitiesListeners : {[key: string] : {(entity1: Entity, entity2: Entity, event: LocationUpdateEvent) : void}[]};
	private _listeners : {(entity1: Entity, entity2: Entity, event: LocationUpdateEvent) : void}[];
	private _cbs : {[key: string]: {(eventType: string): void}};

	constructor () {
		this._cbs = {};
		this._entities = [];
		this._entitiesListeners = {};
		this._listeners = [];
		this._cbs[EntityEventTypes.LOCATION_UPDATE] = this._onEntityLocationUpdate.bind(this)
	}

	public addEntity (entity: Entity) : void {
		if (!this.hasEntity(entity)) {
			this._entities.push(entity);
			this._entitiesListeners[entity.ID] = [];

			entity.on(EntityEventTypes.LOCATION_UPDATE.toString(), this._cbs[EntityEventTypes.LOCATION_UPDATE]);
			// entity.on("dimension_update", this._onEntityUpgrade.bind(this));
		}
	}

	public removeEntity (entity: Entity) : void {
		if (this.hasEntity(entity)) {
			this._entities.splice(this._entities.indexOf(entity), 1);
			delete this._entitiesListeners[entity.ID];
		}
	}

	public hasEntity (entity: Entity) : boolean {
		return this._entitiesListeners.hasOwnProperty(entity.ID);
	}

	public addEntityCollisionListener (entity: Entity, callback: (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) => void) : void {
		if (!this.hasEntity(entity)) {
			this.addEntity(entity);
		}

		this._entitiesListeners[entity.ID].push(callback);
	}

	public removeEntityCollisionListener (entity: Entity, callback: (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) => void) : void {
		if (this._entitiesListeners[entity.ID].indexOf(callback) > -1) {
			this._entitiesListeners[entity.ID].splice(this._entitiesListeners[entity.ID].indexOf(callback), 1);
		}
	}

	public addCollisionListener (callback: (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) => void) : void {
		this._listeners.push(callback);
	}

	public removeCollisionListener (callback: (entity1: Entity, entity2: Entity, event: LocationUpdateEvent) => void) : void {
		if (this._listeners.indexOf(callback) > -1) {
			this._listeners.splice(this._listeners.indexOf(callback), 1);
		}
	}

	private _onEntityLocationUpdate (event: LocationUpdateEvent) : void {
		//Check for possible collisions
		let entity : Entity = event.source;

		if (entity.parent) {
			var potCollisions : Entity[] = entity.parent.findChildren({x: entity.x, y: entity.y}, {x: entity.x2, y: entity.y2});
			var collisions : Entity[] = [];

			for (let i in potCollisions) {
				let potEntity = potCollisions[i];

				if (potEntity != entity && this.hasEntity(potEntity)) {
					collisions.push(potEntity);
				}
			}

			if (collisions.length > 0) {
				//ALERT THE TROOPS!!
				for (let i in this._listeners) {
					let listener = this._listeners[i];
					listener(entity, collisions[0], event);
				}
			}
		}
	}
}