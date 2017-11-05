import {Event} from "../interfaces";

export interface AttrDeleteEvent extends Event  {
	attribute : string,
	value : any
}