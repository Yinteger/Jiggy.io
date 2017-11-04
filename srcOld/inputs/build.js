'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/inputs",
    main : "../../dist/lib/inputs/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/inputs.d.ts"
});
