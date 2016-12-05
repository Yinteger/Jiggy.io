import {Event, Dimension} from "./.";

export interface DimensionUpdateEvent extends Event {
	oldDimensions: Dimension;
	newDimensions: Dimension;
}