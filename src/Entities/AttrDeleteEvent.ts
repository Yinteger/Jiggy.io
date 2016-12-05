import {Event} from "../Interfaces";

export interface AttrDeleteEvent extends Event  {
	attribute : string,
	value : any
}