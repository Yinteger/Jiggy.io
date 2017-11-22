import { Event } from "../interfaces";
import { Coordinate } from "../utils";

export interface LocationUpdateEvent extends Event {
	oldCoordinates: Coordinate;
	newCoordinates: Coordinate;
}