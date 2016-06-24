import {Event, Coordinate} from "../Interfaces";

export interface LocationUpdateEvent extends Event {
	oldCoordinates: Coordinate;
	newCoordinates: Coordinate;
}