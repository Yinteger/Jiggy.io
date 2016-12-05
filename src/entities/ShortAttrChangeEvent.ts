import {Event} from "./.";

export interface ShortAttrChangeEvent extends Event {
	attribute : string,
	value : any
}