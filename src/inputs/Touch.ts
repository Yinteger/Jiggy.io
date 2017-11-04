import * as Events from 'events';
import { NativeTouch, TouchList, TouchEvent } from "./NativeTouchEvent";
import { Event, Coordinate } from "../interfaces";

export const enum TouchEvents {
    TouchMoved = "TOUCHMOVED",
    TouchRemoved = "TOUCHREMOVED"
};

export interface TouchMoveEvent extends Event {
    position: Coordinate
};

/**
 * Represents a single touch or 'finger' of the screen touching the screen
 */
export class Touch extends Events.EventEmitter {
    private _id: number;
    private _x: number;
    private _y: number;
    private _touchMoveListener: (touchEvent: TouchEvent) => void;
    private _touchEndListener: (touchEvent: TouchEvent) => void;

    constructor(nTouch: NativeTouch) {
        super();
        this._id = nTouch.identifier;
        this._x = nTouch.pageX;
        this._y = nTouch.pageY;

        window.addEventListener("touchmove", this._touchMoveListener = this._onTouchMove.bind(this));
        window.addEventListener("touchend", this._touchEndListener = this._onTouchEnd.bind(this));
    }
    public getID(): number {
        return this._id;
    }
    public getX(): number {
        return this._x;
    }
    public getY(): number {
        return this._y;
    }

    private _onTouchEnd(e: TouchEvent) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var nTouch = e.changedTouches.item(i);
            if (nTouch.identifier === this._id) {
                this._disconnect();
            }
        }
    }

    private _onTouchMove(e: TouchEvent) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var nTouch = e.changedTouches.item(i);
            if (nTouch.identifier === this._id && (nTouch.pageX != this._x || nTouch.pageY != this._y)) {
                this._x = nTouch.pageX;
                this._y = nTouch.pageY;

                let e: TouchMoveEvent = {
                    type: TouchEvents.TouchMoved,
                    source: this,
                    position: {
                        x: this._x,
                        y: this._y
                    }
                }

                this.emit(TouchEvents.TouchMoved, e);
            }
        }
    }

    private _disconnect() {
        let e: Event = {
            source: this,
            type: TouchEvents.TouchRemoved
        }
        this.emit(TouchEvents.TouchRemoved, e);
        window.removeEventListener("touchmove", this._touchMoveListener);
        window.removeEventListener("touchend", this._touchEndListener);
    }
}