import {Engine} from './Engine';
import {SeverityEnum} from '../utils';

// Provides a way for other classes to reference the running
// instance of the engine using:
//
// import {instance} from '../core';
//

var instance: Engine = null;

// This is invoked by the Engine base class during construction.
// Note that this API is not exposed to the public API. Other packages outside of ../core cannot use setInstance.
var setInstance = (game: Engine): void => {
    if (instance) {
        instance.getLogManager().log(SeverityEnum.WARNING, 'Instance has already been set! Are you instantiating more than one game?');
    }

    instance = game;
}

var getInstance = (): Engine => {
    return instance;
}

export {
    setInstance,
    getInstance
};
