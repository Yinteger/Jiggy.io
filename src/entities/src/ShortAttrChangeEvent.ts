import {Event} from "@jiggy/interfaces";

export interface ShortAttrChangeEvent extends Event {
	attribute : string,
	value : any
}