import { Asset } from '../Assets';

export interface TextureChangeEvent {
	attribute: string,
	name: string,
	value: Asset
}