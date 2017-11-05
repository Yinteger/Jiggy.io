import {Event} from "../interfaces";

export interface AttrChangeEvent extends Event{
	attribute : string,
	oldValue : any,
	value : any
}