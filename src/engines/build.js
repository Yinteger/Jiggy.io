'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/engines",
    main : "../../dist/lib/engines/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/engines.d.ts"
});
