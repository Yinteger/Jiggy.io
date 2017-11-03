'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/audio",
    main : "../../dist/lib/audio/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/audio.d.ts"
});
