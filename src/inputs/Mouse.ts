import {Event} from "../interfaces";
import {Coordinate} from '../utils';
import * as Events from 'events';

export const enum MouseEvents {
    LeftButtonDown = "LEFTBUTTONDOWN",
    LeftButtonUp = "LEFTBUTTONUP",
    RightButtonDown = "RIGHTBUTTONDOWN",
    RightButtonUp = "RIGHTBUTTONUP",
    MouseMove = "MOUSEMOVE",
    ScrollWheelDown = "SCROLLWHEELDOWN",
    ScrollWheelUp = "SCROLLWHEELUP",
    ScrollWheelMove = "SCROLLWHEELMOVE"
}

export interface MouseClickEvent extends Event {
    x: number,
    y: number
}

export interface MouseMoveEvent extends Event {
    x: number,
    y: number
}

export interface ScrollWheelMove extends Event {
    x: number,
    y: number,
    yDelta: number,
    xDelta: number
}

export class Mouse extends Events.EventEmitter {
    private static _instance: Mouse;
    private _leftButtonDown : boolean = false;
    private _rightButtonDown : boolean = false;
    private _scrollWheelDown : boolean = false;
    private _mouseCoords : Coordinate = new Coordinate(0,0,0);

    private constructor () {
        super();

        window.addEventListener("contextmenu", (e: MouseEvent) => {
            e.preventDefault();
        });

        window.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button === 0) {
                this._leftButtonDown = true;
                let event : MouseClickEvent = {
                    type: MouseEvents.LeftButtonDown,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.LeftButtonDown, event);
            } else if (e.button === 1) {
                this._scrollWheelDown = true;
                let event: MouseClickEvent = {
                    type: MouseEvents.ScrollWheelDown,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.ScrollWheelDown, event);
            } else if (e.button === 2) {
                this._rightButtonDown = true;
                let event: MouseClickEvent = {
                    type: MouseEvents.RightButtonDown,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.RightButtonDown, event);
            }
        }, true);

        window.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                this._leftButtonDown = false;
                let event: MouseClickEvent = {
                    type: MouseEvents.LeftButtonUp,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.LeftButtonUp, event);
            } else if (e.button === 1) {
                this._scrollWheelDown = false;
                let event: MouseClickEvent = {
                    type: MouseEvents.ScrollWheelUp,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.ScrollWheelUp, event);
            } else if (e.button === 2) {
                this._rightButtonDown = false;
                let event: MouseClickEvent = {
                    type: MouseEvents.RightButtonUp,
                    source: this,
                    x: e.clientX,
                    y: e.clientY

                };
                this.emit(MouseEvents.RightButtonUp, event);
            }
        }, true);

        window.addEventListener("mousemove", (e: MouseEvent) => {
            this._mouseCoords = new Coordinate(e.clientX, e.clientY);
            let event: MouseMoveEvent = {
                type: MouseEvents.MouseMove,
                source: this,
                x: e.clientX,
                y: e.clientY
            };
            this.emit(MouseEvents.MouseMove, event);
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

    public getCurrentCoordinates(): Coordinate {
        return this._mouseCoords;
    }

    public isLeftButtonClicked(): boolean {
        return this._leftButtonDown;
    }

    public isMouseWheelClicked(): boolean {
        return this._scrollWheelDown;
    }

    public isRightButtonClicked(): boolean {
        return this._rightButtonDown;
    }

    static getInstance(): Mouse {
        Mouse._instance = Mouse._instance || new Mouse();
        return Mouse._instance;
    }
}