'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/utils",
    main : "../../dist/lib/utils/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/utils.d.ts"
});
