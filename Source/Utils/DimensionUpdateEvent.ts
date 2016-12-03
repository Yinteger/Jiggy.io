import {Event, Dimension} from "../Interfaces";

export interface DimensionUpdateEvent extends Event {
	oldDimensions: Dimension;
	newDimensions: Dimension;
}