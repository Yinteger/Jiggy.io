'use strict';

var dts = require('dts-bundle');

dts.bundle({
    name: "@jiggy/entities",
    main : "../../dist/lib/entities/index.d.ts",
    baseDir : "../../dist/lib/",
    out : "../declarations/entities.d.ts"
});
