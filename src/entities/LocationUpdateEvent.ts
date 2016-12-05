import {Event, Coordinate} from "../interfaces";

export interface LocationUpdateEvent extends Event {
	oldCoordinates: Coordinate;
	newCoordinates: Coordinate;
}