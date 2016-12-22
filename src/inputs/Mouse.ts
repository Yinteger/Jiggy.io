import InputDevice from "./InputDevice.ts";
import {Event, Coordinate} from "../interfaces";

export const enum MouseEvents {
    LeftButtonDown,
    LeftButtonUp,
    RightButtonDown,
    RightButtonUp,
    MouseMove,
    ScrollWheelDown,
    ScrollWheelUp,
    ScrollWheelMove
}

export interface LeftButtonDown extends Event {
    x: number,
    y: number
}

export interface LeftButtonUp extends Event {
    x: number,
    y: number
}

export interface RightButtonDown extends Event {
    x: number,
    y: number
}

export interface RightButtonUp extends Event {
    x: number,
    y: number
}

export interface MouseMove extends Event {
    x: number,
    y: number
}

export interface ScrollWheelDown extends Event {
    x: number,
    y: number
}

export interface ScrollWheelUp extends Event {
    x: number,
    y: number
}

export interface ScrollWheelMove extends Event {
    x: number,
    y: number,
    yDelta: number,
    xDelta: number
}

class Mouse extends InputDevice {
    private _leftButtonDown : boolean = false;
    private _rightButtonDown : boolean = false;
    private _scrollWheelDown : boolean = false;
    private _mouseCoords : Coordinate = {x: 0, y: 0};

    constructor () {
        super();

        window.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button === 0) {
                this._leftButtonDown = true;
                let event : LeftButtonDown = {
                    type: MouseEvents.LeftButtonDown.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.LeftButtonDown.toString(), event);
            } else if (e.button === 1) {
                this._scrollWheelDown = true;
                let event : ScrollWheelDown = {
                    type: MouseEvents.ScrollWheelDown.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.ScrollWheelDown.toString(), event);
            } else if (e.button === 2) {
                this._rightButtonDown = true;
                let event : RightButtonDown = {
                    type: MouseEvents.RightButtonDown.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.RightButtonDown.toString(), event);
            }
        }, true);

        window.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                this._leftButtonDown = false;
                let event : LeftButtonUp = {
                    type: MouseEvents.LeftButtonUp.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.LeftButtonUp.toString(), event);
            } else if (e.button === 1) {
                this._scrollWheelDown = false;
                let event : ScrollWheelUp = {
                    type: MouseEvents.ScrollWheelUp.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.ScrollWheelUp.toString(), event);
            } else if (e.button === 2) {
                this._rightButtonDown = false;
                let event : RightButtonUp = {
                    type: MouseEvents.RightButtonUp.toString(),
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.RightButtonUp.toString(), event);
            }
        }, true);

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this._mouseCoords = {x: e.clientX, y: e.clientY};
            let event : MouseMove = {
                type: MouseEvents.MouseMove.toString(),
                source: this,
                x: e.clientX,
                y: e.clientY
            };
            this.emit(MouseEvents.MouseMove.toString(), event);
        }, true);

        window.addEventListener("wheel", (e: MouseWheelEvent) => {
            let yDelta : number = 0;
            let xDelta : number = 0;

            if (e.wheelDeltaY > 0) {
                yDelta = 1;
            } else if (e.wheelDeltaY < 0) {
                yDelta = -1;
            }

            if (e.wheelDeltaX > 0) {
                xDelta = 1;
            } else if (e.wheelDeltaX < 0) {
                xDelta = -1;
            }

            let event : ScrollWheelMove = {
                type: MouseEvents.ScrollWheelMove.toString(),
                source: this,
                x: e.clientX,
                y: e.clientY,
                yDelta: yDelta,
                xDelta: xDelta
            };
            this.emit(MouseEvents.ScrollWheelMove.toString(), event);
        }, true);
    }
}

export let mouse = new Mouse();