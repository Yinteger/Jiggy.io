import { Asset } from '../Assets';
import {Event} from "../Interfaces";

export interface TextureChangeEvent extends Event {
	attribute: string,
	name: string,
	value: Asset
}