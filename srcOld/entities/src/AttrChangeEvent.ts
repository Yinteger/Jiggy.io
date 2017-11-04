import {Event} from "@jiggy/interfaces";

export interface AttrChangeEvent extends Event{
	attribute : string,
	oldValue : any,
	value : any
}