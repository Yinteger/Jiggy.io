export interface NativeTouch {
    identifier: number;
    screenX: number;
    screenY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    radiusX: number;
    radiusY: number;
    rotationAngle: number;
};

export interface TouchList {
    length: number;
    item(index: number): NativeTouch;
    identifiedTouch(identifier: number): NativeTouch;
};

export interface TouchEvent extends UIEvent {
    touches: TouchList;
    targetTouches: TouchList;
    changedTouches: TouchList;
};
