import {Event, Coordinate} from "@jiggy/interfaces";

export interface LocationUpdateEvent extends Event {
	oldCoordinates: Coordinate;
	newCoordinates: Coordinate;
}