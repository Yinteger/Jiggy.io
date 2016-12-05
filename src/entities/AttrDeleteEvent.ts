import {Event} from "./.";

export interface AttrDeleteEvent extends Event  {
	attribute : string,
	value : any
}