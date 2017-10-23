//Global interface alias
type NativeGamepadEvent = GamepadEvent;
type NativeGamepad = Gamepad;
type NativeGamepadButton = GamepadButton;

import InputDevice from "./InputDevice";

export const enum GamePadEvents {
    ButtonValueChange = "BUTTONVALUECHANGE",
    AxisValueChange = "AXISVALUECHANGE"
}

export type GamePadButton = NativeGamepadButton;

export class GamePad extends InputDevice {
    private _buttons: GamePadButton[] = [];
    private _axes: number[] = [];

    constructor(index: number) {
        super();
        

        let gamePad: NativeGamepad = navigator.getGamepads()[index];
        console.log(gamePad);

        for (var i = 0; i < gamePad.buttons.length; i++) {
            this._buttons.push(gamePad.buttons[i]);
        }

        for (var i = 0; i < gamePad.axes.length; i++) {
            this._axes.push(gamePad.axes[i]);
        }

        //Query for changes
        setInterval(() => {
            let gamePad: NativeGamepad = navigator.getGamepads()[index];
            this._axes = [];
            for (var i = 0; i < gamePad.axes.length; i++) {
                this._axes.push(gamePad.axes[i]);
            }

            this.emit(GamePadEvents.ButtonValueChange);
            this.emit(GamePadEvents.AxisValueChange);
        }, 15);
    }

    public getAxis(index: number): number {
        return this._axes[index];
    }
}