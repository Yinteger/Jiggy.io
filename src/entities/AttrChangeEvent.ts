import {Event} from "./.";

export interface AttrChangeEvent extends Event{
	attribute : string,
	oldValue : any,
	value : any
}