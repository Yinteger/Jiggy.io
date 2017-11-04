import { Asset } from '@jiggy/assets';
import {Event} from "@jiggy/interfaces";

export interface TextureChangeEvent extends Event {
	attribute: string,
	name: string,
	value: Asset
}