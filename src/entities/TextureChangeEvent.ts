import { Asset } from '../assets';
import {Event} from "../interfaces";

export interface TextureChangeEvent extends Event {
	attribute: string,
	name: string,
	value: Asset
}