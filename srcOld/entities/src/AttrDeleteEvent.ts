import {Event} from "@jiggy/interfaces";

export interface AttrDeleteEvent extends Event  {
	attribute : string,
	value : any
}