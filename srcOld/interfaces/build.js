'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/interfaces",
    main : "../../dist/lib/interfaces/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/interfaces.d.ts"
});
