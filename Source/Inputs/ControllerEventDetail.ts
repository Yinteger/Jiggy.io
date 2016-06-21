import { Controller } from './';

export interface ControllerEventDetail {
	controller?: Controller; //This is injected
	altKey: boolean;
	shiftKey: boolean;
	superKey: boolean;
}
