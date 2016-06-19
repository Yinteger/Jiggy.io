import { 
	ControllerEventDetail,
	MouseButton
 } from './';

export interface MouseEventDetail extends ControllerEventDetail {
	x: number;
	y: number;
	buttons: MouseButton[];
	button: MouseButton
}