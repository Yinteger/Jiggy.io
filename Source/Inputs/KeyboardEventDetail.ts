import {
	ControllerEventDetail,
	KeyCode
} from './';

export interface KeyboardEventDetail extends ControllerEventDetail {
	keyCodes: KeyCode[];
	keyCode: KeyCode
}