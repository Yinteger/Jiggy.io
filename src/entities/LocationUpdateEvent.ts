import {Event, Coordinate} from "./.";

export interface LocationUpdateEvent extends Event {
	oldCoordinates: Coordinate;
	newCoordinates: Coordinate;
}