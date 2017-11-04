import {Event, Dimension} from "@jiggy/interfaces";

export interface DimensionUpdateEvent extends Event {
	oldDimensions: Dimension;
	newDimensions: Dimension;
}