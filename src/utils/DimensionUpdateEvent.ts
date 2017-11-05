import {Event, Dimension} from "../interfaces";

export interface DimensionUpdateEvent extends Event {
	oldDimensions: Dimension;
	newDimensions: Dimension;
}