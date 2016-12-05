import {Event} from "../Interfaces";

export interface AttrChangeEvent extends Event{
	attribute : string,
	oldValue : any,
	value : any
}