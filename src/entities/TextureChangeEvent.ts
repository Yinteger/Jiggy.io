import { Asset } from './.';
import {Event} from "./.";

export interface TextureChangeEvent extends Event {
	attribute: string,
	name: string,
	value: Asset
}