import { Touch } from "./Touch";
import { NativeTouch, TouchList, TouchEvent } from "./NativeTouchEvent";
import * as Events from 'events';


export const enum TouchListenerEvents {
    TouchAdded = "TOUCHADDED"
}

/**
 * Listens to the window for new touches, builds Touch objects, and emits them to any listeners
 */
export class TouchListener extends Events.EventEmitter {
    private static _instance: TouchListener;

    private constructor() {
        super();

        window.addEventListener("touchstart", (e: TouchEvent) => {
            //Loop through the new fingers added, build Touch objects, and emit them
            e.preventDefault();
            for (var i = 0; i < e.changedTouches.length; i++) {
                var touch: Touch = new Touch(e.changedTouches.item(i));
                this.emit(TouchListenerEvents.TouchAdded, touch);
            }
        });
    }

    static getInstance(): TouchListener {
        TouchListener._instance = TouchListener._instance || new TouchListener();
        return TouchListener._instance;
    }
}