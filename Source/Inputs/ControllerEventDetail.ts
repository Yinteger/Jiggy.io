import { Controller } from './';

export interface ControllerEventDetail {
	controller?: string; //This is injected
	altKey: boolean;
	shiftKey: boolean;
	superKey: boolean;
}
