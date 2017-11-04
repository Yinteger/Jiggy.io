'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/assets",
    main : "../../dist/lib/assets/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/assets.d.ts"
});
