import {Event} from "../interfaces";

export interface ShortAttrChangeEvent extends Event {
	attribute : string,
	value : any
}