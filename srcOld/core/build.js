'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/core",
    main : "../../dist/lib/core/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/core.d.ts"
});
