import {Event} from "../Interfaces";

export interface ShortAttrChangeEvent extends Event {
	attribute : string,
	value : any
}